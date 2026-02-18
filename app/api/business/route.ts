import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidateTag } from "next/cache";
import { cacheTags } from "@/lib/cache";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { name, gstin, address, city, state, pincode, phone, email, logoUrl } = body;

  if (!name?.trim()) {
    return NextResponse.json({ error: "Name required" }, { status: 400 });
  }

  // Upsert business (one per user for now)
  const existing = await prisma.business.findFirst({
    where: { userId: session.user.id },
  });

  const business = existing
    ? await prisma.business.update({
        where: { id: existing.id },
        data: { name, gstin, address, city, state, pincode, phone, email, logoUrl },
      })
    : await prisma.business.create({
        data: {
          userId: session.user.id,
          name,
          gstin,
          address,
          city,
          state,
          pincode,
          phone,
          email,
          logoUrl,
        },
      });

  revalidateTag(cacheTags.business(session.user.id));

  return NextResponse.json(business);
}

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const business = await prisma.business.findFirst({
    where: { userId: session.user.id },
  });

  return NextResponse.json(business);
}
