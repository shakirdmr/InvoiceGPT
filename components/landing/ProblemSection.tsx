"use client";

import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { StaggerChildren, StaggerItem } from "@/components/motion/StaggerChildren";
import { TiltCard } from "@/components/motion/TiltCard";
import { problems } from "./data";

export function ProblemSection() {
  return (
    <section className="py-16 px-4 bg-red-50">
      <div className="max-w-3xl mx-auto text-center">
        <ScrollReveal>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Billing shouldn&apos;t take 20 minutes.
          </h2>
          <p className="text-gray-600 mb-10 text-lg">
            But for most shopkeepers in India, it does. Sound familiar?
          </p>
        </ScrollReveal>

        <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
          {problems.map((p, i) => (
            <StaggerItem key={p.text} index={i}>
              <TiltCard className="flex items-start gap-3 bg-white rounded-2xl p-4 border border-red-100 shadow-sm h-full">
                <span className="text-2xl shrink-0">{p.emoji}</span>
                <p className="text-sm text-gray-700 leading-relaxed">{p.text}</p>
              </TiltCard>
            </StaggerItem>
          ))}
        </StaggerChildren>

        <ScrollReveal delay={0.4}>
          <p className="mt-10 text-gray-900 font-semibold text-lg">
            There is a better way. And it fits in your pocket.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
