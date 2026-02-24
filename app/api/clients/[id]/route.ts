import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
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

  const business = await prisma.business.findFirst({
    where: { userId: session.user.id },
  });
  if (!business) {
    return NextResponse.json({ error: "Business not found" }, { status: 404 });
  }

  // Verify the client belongs to this business
  const existing = await prisma.client.findFirst({
    where: { id, businessId: business.id },
  });
  if (!existing) {
    return NextResponse.json({ error: "Client not found" }, { status: 404 });
  }

  const body = await req.json();
  const { name, gstin, phone, email, address, city, state, pincode } = body;

  if (!name?.trim()) {
    return NextResponse.json({ error: "Client name required" }, { status: 400 });
  }

  const client = await prisma.client.update({
    where: { id },
    data: {
      name: name.trim(),
      gstin: gstin?.trim() || null,
      phone: phone?.trim() || null,
      email: email?.trim() || null,
      address: address?.trim() || null,
      city: city?.trim() || null,
      state: state?.trim() || null,
      pincode: pincode?.trim() || null,
    },
    include: { _count: { select: { invoices: true } } },
  });

  revalidateTag(cacheTags.clients(business.id));

  return NextResponse.json(client);
}
