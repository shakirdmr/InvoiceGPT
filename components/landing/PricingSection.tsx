"use client";

import Link from "next/link";
import { CheckCircle2, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { StaggerChildren, StaggerItem } from "@/components/motion/StaggerChildren";
import { TiltCard } from "@/components/motion/TiltCard";
import { freeFeatures, proFeatures } from "./data";

export function PricingSection() {
  return (
    <section className="py-20 px-4 bg-white" id="pricing">
      <div className="max-w-4xl mx-auto text-center">
        <ScrollReveal>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            One plan. Unlimited invoices.
          </h2>
          <p className="text-gray-500 mb-10">
            Start free. Upgrade when you&apos;re ready.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* Free Trial */}
          <ScrollReveal delay={0.1}>
            <TiltCard className="bg-gray-50 rounded-3xl p-8 border border-gray-200 flex flex-col text-left h-full">
              <div className="text-sm font-semibold text-gray-500 mb-1 uppercase tracking-wide">
                Free Trial
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-1">₹0</div>
              <div className="text-sm text-gray-500 mb-6">No credit card required</div>
              <StaggerChildren className="space-y-3 flex-1 mb-8">
                {freeFeatures.map((f, i) => (
                  <StaggerItem key={f} index={i}>
                    <li className="flex items-center gap-3 text-sm text-gray-700 list-none">
                      <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                      {f}
                    </li>
                  </StaggerItem>
                ))}
              </StaggerChildren>
              <Link href="/login">
                <Button variant="outline" size="lg" className="w-full">
                  Start Free
                </Button>
              </Link>
            </TiltCard>
          </ScrollReveal>

          {/* Pro Plan */}
          <ScrollReveal delay={0.2}>
            <TiltCard className="relative overflow-hidden rounded-3xl h-full">
              {/* Animated border gradient */}
              <div
                className="absolute inset-0 rounded-3xl p-[2px]"
                style={{
                  background: "conic-gradient(from 0deg, #eab308, #f59e0b, #fbbf24, #eab308)",
                  animation: "spin 4s linear infinite",
                }}
              >
                <div className="bg-gray-900 rounded-3xl w-full h-full" />
              </div>

              <div className="relative bg-gray-900 rounded-3xl p-8 flex flex-col text-left">
                <div className="absolute top-4 right-4">
                  <span className="bg-yellow-400 text-gray-900 text-xs font-bold px-2.5 py-1 rounded-full inline-block">
                    MOST POPULAR
                  </span>
                </div>
                <div className="text-sm font-semibold text-gray-400 mb-1 uppercase tracking-wide">
                  Pro
                </div>
                <div className="flex items-end gap-1 mb-1">
                  <span className="text-4xl font-bold text-white">₹399</span>
                  <span className="text-gray-400 mb-1">/month</span>
                </div>
                <div className="text-sm text-gray-400 mb-6">
                  ₹13/day — less than chai ☕
                </div>
                <StaggerChildren className="space-y-3 flex-1 mb-8">
                  {proFeatures.map((f, i) => (
                    <StaggerItem key={f} index={i}>
                      <li className="flex items-center gap-3 text-sm text-gray-200 list-none">
                        <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                        {f}
                      </li>
                    </StaggerItem>
                  ))}
                </StaggerChildren>
                <Link href="/login">
                  <Button size="lg" className="w-full bg-white text-gray-900 hover:bg-gray-100">
                    Start Free — Upgrade Anytime
                  </Button>
                </Link>
                <p className="text-xs text-gray-500 text-center mt-3">
                  7-day money-back guarantee. No questions.
                </p>
              </div>
            </TiltCard>
          </ScrollReveal>
        </div>

        {/* Guarantee badge */}
        <ScrollReveal delay={0.3}>
          <div className="mt-8 inline-flex items-center gap-3 bg-green-50 border border-green-200 rounded-2xl px-6 py-4">
            <Shield className="w-6 h-6 text-green-600 shrink-0" />
            <p className="text-sm text-green-800 text-left">
              <strong>7-Day Money-Back Guarantee.</strong> Not happy? We&apos;ll refund
              every rupee. No questions asked.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
