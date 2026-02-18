import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { createSubscription } from "@/lib/razorpay";

export async function POST() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const subscription = await createSubscription(session.user.id);
    return NextResponse.json({ subscriptionId: subscription.id });
  } catch (err) {
    console.error("Razorpay subscription error:", err);
    return NextResponse.json(
      { error: "Failed to create subscription" },
      { status: 500 }
    );
  }
}
