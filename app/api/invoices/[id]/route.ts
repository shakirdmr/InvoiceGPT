import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { calcLineItem, calcInvoiceTotals } from "@/lib/gst";
import { revalidateTag } from "next/cache";
import { cacheTags } from "@/lib/cache";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await req.json();
  const { status } = body;

  const validStatuses = ["draft", "sent", "paid"];
  if (!validStatuses.includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  const business = await prisma.business.findFirst({
    where: { userId: session.user.id },
  });
  if (!business) {
    return NextResponse.json({ error: "Business not found" }, { status: 404 });
  }

  const invoice = await prisma.invoice.findFirst({
    where: { id, businessId: business.id },
  });
  if (!invoice) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const updated = await prisma.invoice.update({
    where: { id },
    data: { status },
  });

  revalidateTag(cacheTags.invoices(business.id));

  return NextResponse.json(updated);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const business = await prisma.business.findFirst({
    where: { userId: session.user.id },
  });
  if (!business) {
    return NextResponse.json({ error: "Business not found" }, { status: 404 });
  }

  const existing = await prisma.invoice.findFirst({
    where: { id, businessId: business.id },
  });
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const body = await req.json();
  const { clientId, invoiceNumber, date, dueDate, notes, items } = body;

  if (!items || items.length === 0) {
    return NextResponse.json({ error: "Items required" }, { status: 400 });
  }

  const calculatedItems = items.map(
    (item: { description: string; quantity: number; rate: number; gstRate: number }) => {
      const calc = calcLineItem(item.quantity, item.rate, item.gstRate);
      return { ...item, ...calc };
    }
  );

  const totals = calcInvoiceTotals(calculatedItems);

  const invoice = await prisma.invoice.update({
    where: { id },
    data: {
      clientId: clientId || null,
      invoiceNumber,
      date: date ? new Date(date) : existing.date,
      dueDate: dueDate ? new Date(dueDate) : null,
      notes,
      subtotal: totals.subtotal,
      cgstTotal: totals.cgstTotal,
      sgstTotal: totals.sgstTotal,
      total: totals.grandTotal,
      items: {
        deleteMany: {},
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

  revalidateTag(cacheTags.invoices(business.id));

  return NextResponse.json(invoice);
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const business = await prisma.business.findFirst({
    where: { userId: session.user.id },
  });
  if (!business) {
    return NextResponse.json({ error: "Business not found" }, { status: 404 });
  }

  const invoice = await prisma.invoice.findFirst({
    where: { id, businessId: business.id },
    include: { client: true, items: true },
  });
  if (!invoice) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(invoice);
}
