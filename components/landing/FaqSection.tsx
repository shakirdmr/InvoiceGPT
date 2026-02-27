"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { StaggerChildren, StaggerItem } from "@/components/motion/StaggerChildren";
import { faqs } from "./data";

function FaqItem({ q, a }: { q: string; a: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="bg-white rounded-2xl border border-gray-100 overflow-hidden cursor-pointer"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex items-center justify-between p-5">
        <p className="font-semibold text-gray-900 pr-4">{q}</p>
        <div
          className="shrink-0 transition-transform duration-200"
          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          <ChevronDown className="w-5 h-5 text-gray-400" />
        </div>
      </div>
      <div className={`accordion-content ${isOpen ? "open" : ""}`}>
        <p className="text-sm text-gray-500 leading-relaxed px-5 pb-5">
          {a}
        </p>
      </div>
    </div>
  );
}

export function FaqSection() {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-2xl mx-auto">
        <ScrollReveal>
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">
            Questions? We have answers.
          </h2>
        </ScrollReveal>

        <StaggerChildren className="space-y-4">
          {faqs.map((faq, i) => (
            <StaggerItem key={faq.q} index={i}>
              <FaqItem q={faq.q} a={faq.a} />
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
