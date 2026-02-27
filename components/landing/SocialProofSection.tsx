"use client";

import { Star } from "lucide-react";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { StaggerChildren, StaggerItem } from "@/components/motion/StaggerChildren";
import { TiltCard } from "@/components/motion/TiltCard";
import { AnimatedCounter } from "@/components/motion/AnimatedCounter";
import { testimonials } from "./data";

export function SocialProofSection() {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-10">
            <StaggerChildren className="flex justify-center gap-1 mb-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <StaggerItem key={i} index={i}>
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                </StaggerItem>
              ))}
            </StaggerChildren>
            <h2 className="text-2xl font-bold text-gray-900">
              <AnimatedCounter target={500} suffix="+" /> shopkeepers. Real results.
            </h2>
          </div>
        </ScrollReveal>

        <StaggerChildren className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <StaggerItem key={t.name} index={i}>
              <TiltCard className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col h-full">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-700 mb-4 italic leading-relaxed flex-1">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-gray-900 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0">
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">{t.name}</div>
                    <div className="text-xs text-gray-500">{t.shop}</div>
                  </div>
                </div>
              </TiltCard>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
