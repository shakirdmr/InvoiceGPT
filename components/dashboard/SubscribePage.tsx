"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Loader2, FileText, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

const features = [
  "Unlimited GST invoices",
  "CGST + SGST auto-calculation",
  "PDF download & sharing",
  "Unlimited clients",
  "Revenue dashboard",
  "Business logo on invoices",
  "Priority support",
];

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Razorpay: new (options: any) => { open: () => void };
  }
}

export function SubscribePage() {
  const [loading, setLoading] = useState(false);

  async function handleSubscribe() {
    setLoading(true);
    try {
      // Load Razorpay script
      await new Promise<void>((resolve, reject) => {
        if (window.Razorpay) return resolve();
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => resolve();
        script.onerror = reject;
        document.body.appendChild(script);
      });

      const res = await fetch("/api/razorpay/create-subscription", {
        method: "POST",
      });

      if (!res.ok) throw new Error("Failed to create subscription");

      const { subscriptionId } = await res.json();

      const rzp = new window.Razorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        subscription_id: subscriptionId,
        name: "InvoiceGPT",
        description: "Monthly subscription · ₹399/month",
        handler: function () {
          toast.success("Payment successful! Welcome to InvoiceGPT Pro!");
          window.location.href = "/dashboard";
        },
        prefill: {},
        theme: { color: "#111827" },
        modal: {
          ondismiss: function () {
            toast.info("Payment cancelled");
          },
        },
      });

      rzp.open();
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-10">
      <div className="flex items-center gap-2 mb-8">
        <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
          <FileText className="w-4 h-4 text-white" />
        </div>
        <span className="font-bold text-gray-900 text-lg">InvoiceGPT</span>
      </div>

      <Card className="w-full max-w-md shadow-xl border-gray-100">
        <CardContent className="pt-8 pb-8 px-8">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-1.5 bg-yellow-100 text-yellow-800 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
              🔒 Trial limit reached
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Upgrade to Pro
            </h1>
            <p className="text-gray-500 text-sm">
              You&apos;ve used all 6 free invoices. Upgrade to create unlimited invoices.
            </p>
          </div>

          <div className="text-center mb-6">
            <div className="flex items-end justify-center gap-1">
              <span className="text-4xl font-bold text-gray-900">₹399</span>
              <span className="text-gray-500 mb-1">/month</span>
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Just ₹13/day · Less than a cup of chai
            </p>
          </div>

          <ul className="space-y-2.5 mb-8">
            {features.map((f) => (
              <li key={f} className="flex items-center gap-2.5 text-sm text-gray-700">
                <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                {f}
              </li>
            ))}
          </ul>

          <Button
            onClick={handleSubscribe}
            className="w-full h-12 text-base gap-2"
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              "Subscribe · ₹399/month"
            )}
          </Button>

          <p className="text-xs text-gray-400 text-center mt-3">
            UPI · Cards · Netbanking · Cancel anytime
          </p>

          <div className="mt-6 pt-5 border-t border-gray-100 text-center">
            <Link
              href="/dashboard"
              className="flex items-center justify-center gap-1.5 text-sm text-gray-400 hover:text-gray-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to dashboard
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
