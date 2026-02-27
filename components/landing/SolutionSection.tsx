"use client";

import { Badge } from "@/components/ui/badge";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { StaggerChildren, StaggerItem } from "@/components/motion/StaggerChildren";
import { TiltCard } from "@/components/motion/TiltCard";
import { solutionPoints } from "./data";

export function SolutionSection() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-3xl mx-auto text-center">
        <ScrollReveal>
          <Badge variant="secondary" className="mb-4 text-xs">
            The Solution
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Meet InvoiceGPT — The Fastest GST Billing App in India
          </h2>
          <p className="text-gray-500 text-lg mb-10">
            Built for shopkeepers, not accountants.
          </p>
        </ScrollReveal>

        <StaggerChildren className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {solutionPoints.map((s, i) => (
            <StaggerItem key={s.title} index={i}>
              <TiltCard className="flex flex-col items-center text-center p-6 rounded-2xl bg-gray-50 border border-gray-100 h-full">
                <div className="text-3xl mb-3">{s.emoji}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
              </TiltCard>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
