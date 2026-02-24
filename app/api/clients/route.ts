import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
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

  const clients = await prisma.client.findMany({
    where: { businessId: business.id },
    include: { _count: { select: { invoices: true } } },
    orderBy: { name: "asc" },
  });

  return NextResponse.json(clients);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const business = await prisma.business.findFirst({
    where: { userId: session.user.id },
  });
  if (!business) {
    return NextResponse.json({ error: "Business not found" }, { status: 404 });
  }

  const body = await req.json();
  const { name, gstin, phone, email, address, city, state, pincode } = body;

  if (!name?.trim()) {
    return NextResponse.json({ error: "Client name required" }, { status: 400 });
  }

  const client = await prisma.client.create({
    data: {
      businessId: business.id,
      name,
      gstin,
      phone,
      email,
      address,
      city,
      state,
      pincode,
    },
    include: { _count: { select: { invoices: true } } },
  });

  revalidateTag(cacheTags.clients(business.id));

  return NextResponse.json(client, { status: 201 });
}
