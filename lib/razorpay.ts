import Razorpay from "razorpay";

export const PLAN_AMOUNT = 39900; // ₹399 in paise
export const TRIAL_INVOICE_LIMIT = 6;

function getRazorpay() {
  return new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
  });
}

export async function createSubscription(userId: string) {
  const razorpay = getRazorpay();
  const subscription = await razorpay.subscriptions.create({
    plan_id: process.env.RAZORPAY_PLAN_ID!,
    customer_notify: 1,
    quantity: 1,
    total_count: 120, // 10 years max
    notes: {
      userId,
    },
  });
  return subscription;
}
