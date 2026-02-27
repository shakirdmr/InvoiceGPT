"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { AnimatedCounter } from "@/components/motion/AnimatedCounter";
import { useInView } from "@/components/motion/useInView";
import { steps } from "./data";

export function HowItWorksSection() {
  const { ref: lineRef, isInView: lineVisible } = useInView();

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-3xl mx-auto text-center">
        <ScrollReveal>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            3 steps. 60 seconds. Done.
          </h2>
          <p className="text-gray-500 mb-12">It&apos;s really this simple.</p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 relative" ref={lineRef}>
          {/* Connecting line (desktop only) */}
          <div
            className={`hidden sm:block absolute top-8 left-[20%] right-[20%] h-0.5 bg-gray-200 -z-0 line-grow ${lineVisible ? "visible" : ""}`}
            style={{ transformOrigin: "left" }}
          />

          {steps.map((s, i) => (
            <ScrollReveal key={s.title} delay={i * 0.15}>
              <div className="flex flex-col items-center text-center relative">
                <div className="w-16 h-16 bg-gray-900 text-white rounded-2xl flex items-center justify-center text-2xl font-bold mb-4 shadow-lg">
                  <AnimatedCounter target={i + 1} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.5}>
          <div className="mt-12">
            <Link href="/login">
              <span className="inline-block btn-hover">
                <Button size="lg" className="gap-2">
                  Try It Now — Free <ArrowRight className="w-4 h-4" />
                </Button>
              </span>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
