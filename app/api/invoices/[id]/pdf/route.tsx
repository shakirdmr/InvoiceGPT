import { NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { generateInvoicePDF } from "@/lib/generate-pdf";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { id } = await params;

  const business = await prisma.business.findFirst({
    where: { userId: session.user.id },
  });
  if (!business) {
    return new Response("Business not found", { status: 404 });
  }

  const invoice = await prisma.invoice.findFirst({
    where: { id, businessId: business.id },
    include: { client: true, items: true },
  });
  if (!invoice) {
    return new Response("Not found", { status: 404 });
  }

  const invoiceData = {
    invoiceNumber: invoice.invoiceNumber,
    date: invoice.date.toISOString(),
    dueDate: invoice.dueDate?.toISOString() ?? null,
    notes: invoice.notes,
    subtotal: invoice.subtotal,
    cgstTotal: invoice.cgstTotal,
    sgstTotal: invoice.sgstTotal,
    total: invoice.total,
    items: invoice.items.map((item: typeof invoice.items[number]) => ({
      description: item.description,
      quantity: item.quantity,
      rate: item.rate,
      gstRate: item.gstRate,
      amount: item.amount,
      cgst: item.cgst,
      sgst: item.sgst,
    })),
    client: invoice.client
      ? {
          name: invoice.client.name,
          gstin: invoice.client.gstin,
          phone: invoice.client.phone,
          address: invoice.client.address,
          city: invoice.client.city,
          state: invoice.client.state,
        }
      : null,
  };

  try {
    const buffer = await generateInvoicePDF(invoiceData, {
      name: business.name,
      gstin: business.gstin,
      address: business.address,
      city: business.city,
      state: business.state,
      phone: business.phone,
      email: business.email,
      logoUrl: business.logoUrl,
    });

    return new Response(new Uint8Array(buffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${invoice.invoiceNumber}.pdf"`,
      },
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[PDF route] generateInvoicePDF failed:", err);
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
