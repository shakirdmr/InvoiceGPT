"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GradientBackground } from "@/components/3d/GradientBackground";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

const particles = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  left: `${10 + (i * 7) % 80}%`,
  top: `${5 + (i * 13) % 90}%`,
  size: 2 + (i % 4),
  delay: (i * 0.7) % 4,
  duration: 4 + (i % 3),
}));

export function FinalCtaSection() {
  return (
    <section className="relative py-20 px-4 overflow-hidden">
      <GradientBackground variant="dark" />

      {/* Floating particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-white/20"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            animation: `float-particle ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}

      <div className="max-w-2xl mx-auto text-center relative z-10">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Your first 6 invoices are free.
          </h2>
          <p className="text-gray-400 text-lg mb-3">
            Start now. No credit card. No downloads. No accountant.
          </p>
          <p className="text-gray-500 text-sm mb-8">
            Join 500+ shopkeepers saving time every single day.
          </p>
        </ScrollReveal>
        <Link href="/login">
          <span className="inline-block btn-hover">
            <div className="relative">
              <div className="absolute inset-0 rounded-xl bg-white/20 blur-xl pulse-glow" />
              <Button
                size="xl"
                className="relative bg-white text-gray-900 hover:bg-gray-100 gap-2 text-base px-8 py-4 h-auto"
              >
                Get Started Free →
              </Button>
            </div>
          </span>
        </Link>
        <p className="text-gray-600 text-xs mt-4">
          6 free invoices · No credit card · Cancel anytime
        </p>
      </div>
    </section>
  );
}
