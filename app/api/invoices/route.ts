import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { calcLineItem, calcInvoiceTotals } from "@/lib/gst";
import { generateInvoiceNumber } from "@/lib/utils";
import { TRIAL_INVOICE_LIMIT } from "@/lib/razorpay";
import { revalidateTag } from "next/cache";
import { cacheTags } from "@/lib/cache";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const business = await prisma.business.findFirst({
    where: { userId: session.user.id },
  });
  if (!business) return NextResponse.json([]);

  const invoices = await prisma.invoice.findMany({
    where: { businessId: business.id },
    include: { client: true, items: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(invoices);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Check subscription / trial limit
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  if (
    user.subscriptionStatus === "trial" &&
    user.trialInvoicesUsed >= TRIAL_INVOICE_LIMIT
  ) {
    return NextResponse.json(
      { error: "trial_limit_reached" },
      { status: 402 }
    );
  }

  const business = await prisma.business.findFirst({
    where: { userId: session.user.id },
  });
  if (!business) {
    return NextResponse.json({ error: "Business not found" }, { status: 404 });
  }

  const body = await req.json();
  const { clientId, date, dueDate, notes, items, invoiceNumber } = body;

  if (!items || items.length === 0) {
    return NextResponse.json({ error: "Items required" }, { status: 400 });
  }

  // Calculate GST for each item
  const calculatedItems = items.map(
    (item: {
      description: string;
      quantity: number;
      rate: number;
      gstRate: number;
    }) => {
      const calc = calcLineItem(item.quantity, item.rate, item.gstRate);
      return { ...item, ...calc };
    }
  );

  const totals = calcInvoiceTotals(calculatedItems);

  // Generate invoice number if not provided
  const invoiceCount = await prisma.invoice.count({
    where: { businessId: business.id },
  });
  const finalInvoiceNumber = invoiceNumber || generateInvoiceNumber(invoiceCount);

  const invoice = await prisma.invoice.create({
    data: {
      businessId: business.id,
      clientId: clientId || null,
      invoiceNumber: finalInvoiceNumber,
      date: date ? new Date(date) : new Date(),
      dueDate: dueDate ? new Date(dueDate) : null,
      notes,
      subtotal: totals.subtotal,
      cgstTotal: totals.cgstTotal,
      sgstTotal: totals.sgstTotal,
      total: totals.grandTotal,
      status: "draft",
      items: {
        create: calculatedItems.map(
          (item: {
            description: string;
            quantity: number;
            rate: number;
            gstRate: number;
            amount: number;
            cgst: number;
            sgst: number;
          }) => ({
            description: item.description,
            quantity: item.quantity,
            rate: item.rate,
            gstRate: item.gstRate,
            amount: item.amount,
            cgst: item.cgst,
            sgst: item.sgst,
          })
        ),
      },
    },
    include: { items: true, client: true },
  });

  // Update trial counter
  if (user.subscriptionStatus === "trial") {
    await prisma.user.update({
      where: { id: user.id },
      data: { trialInvoicesUsed: { increment: 1 } },
    });
    revalidateTag(cacheTags.user(session.user.id));
  }

  revalidateTag(cacheTags.invoices(business.id));

  return NextResponse.json(invoice, { status: 201 });
}
