import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("x-razorpay-signature") ?? "";

  // Verify webhook signature
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
    .update(body)
    .digest("hex");

  if (signature !== expectedSignature) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const event = JSON.parse(body);
  const { event: eventName, payload } = event;

  if (eventName === "subscription.activated" || eventName === "subscription.charged") {
    const subscription = payload?.subscription?.entity;
    const userId = subscription?.notes?.userId;

    if (userId) {
      await prisma.user.update({
        where: { id: userId },
        data: {
          subscriptionStatus: "active",
          razorpaySubId: subscription.id,
        },
      });
    }
  }

  if (eventName === "subscription.cancelled" || eventName === "subscription.expired") {
    const subscription = payload?.subscription?.entity;
    const userId = subscription?.notes?.userId;

    if (userId) {
      await prisma.user.update({
        where: { id: userId },
        data: { subscriptionStatus: "expired" },
      });
    }
  }

  return NextResponse.json({ received: true });
}
