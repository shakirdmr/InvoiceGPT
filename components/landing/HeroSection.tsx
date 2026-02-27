"use client";

import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { StaggerChildren, StaggerItem } from "@/components/motion/StaggerChildren";
import { GradientBackground } from "@/components/3d/GradientBackground";
import { useInView } from "@/components/motion/useInView";
import { heroBullets } from "./data";

function PhoneMockup3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 15;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 10;
    setOffset({ x, y });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setOffset({ x: 0, y: 0 });
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="perspective-800 relative"
      style={{ height: 420 }}
    >
      {/* Floating invoice behind phone */}
      <div
        className="absolute top-8 -left-8 w-48 h-64 bg-white/70 rounded-xl border border-gray-200/50 shadow-lg"
        style={{
          transform: `perspective(800px) rotateY(15deg) rotateX(-5deg) translateZ(-40px) translate(${offset.x * 0.3}px, ${offset.y * 0.3}px)`,
          transition: "transform 0.3s ease",
        }}
      >
        <div className="p-3 space-y-2 opacity-50">
          <div className="h-2 bg-gray-300 rounded w-20" />
          <div className="h-1.5 bg-gray-200 rounded w-full" />
          <div className="h-1.5 bg-gray-200 rounded w-3/4" />
          <div className="h-1.5 bg-gray-200 rounded w-full" />
          <div className="h-1.5 bg-gray-200 rounded w-1/2" />
          <div className="mt-3 pt-2 border-t border-dashed border-gray-200">
            <div className="h-2 bg-gray-300 rounded w-16" />
          </div>
        </div>
      </div>

      {/* Shadow plane */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-8 bg-black/10 rounded-full blur-xl"
        style={{
          transform: `translateX(-50%) translateZ(-30px) scaleX(${1 + Math.abs(offset.x) * 0.01})`,
        }}
      />

      {/* Main phone */}
      <div
        className="preserve-3d mx-auto"
        style={{
          width: 200,
          transform: `rotateY(${offset.x}deg) rotateX(${-offset.y}deg)`,
          transition: "transform 0.4s ease",
          animation: "phone-float 6s ease-in-out infinite",
        }}
      >
        <div className="bg-gray-900 rounded-[2.5rem] p-3 shadow-2xl" style={{ transform: "translateZ(10px)" }}>
          <div className="bg-white rounded-[2rem] overflow-hidden">
            <div className="bg-gray-50 px-4 pt-6 pb-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="h-3 bg-gray-800 rounded w-24 mb-1" />
                  <div className="h-2 bg-gray-300 rounded w-16" />
                </div>
                <div className="w-8 h-8 bg-black rounded-lg" />
              </div>
              <div className="bg-white rounded-xl p-3 shadow-sm" style={{ transform: "translateZ(5px)" }}>
                <div className="text-xs font-bold text-gray-400 mb-2">TAX INVOICE</div>
                <div className="space-y-2">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="flex justify-between items-center">
                      <div>
                        <div className="h-2 bg-gray-700 rounded w-20 mb-1" />
                        <div className="text-[10px] text-gray-400">GST 5%</div>
                      </div>
                      <div className="h-2 bg-gray-400 rounded w-12" />
                    </div>
                  ))}
                </div>
                <div className="mt-3 pt-3 border-t border-dashed">
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>CGST (2.5%)</span><span>₹28.75</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>SGST (2.5%)</span><span>₹28.75</span>
                  </div>
                  <div className="flex justify-between font-bold mt-1">
                    <div className="h-2.5 bg-gray-800 rounded w-10" />
                    <div className="h-2.5 bg-gray-800 rounded w-16" />
                  </div>
                </div>
              </div>
              <button className="w-full mt-3 bg-black text-white text-xs py-2.5 rounded-xl font-medium">
                Download PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function HeroSection() {
  const { ref: underlineRef, isInView: underlineVisible } = useInView();

  return (
    <section className="relative pt-16 pb-16 px-4 overflow-hidden">
      <GradientBackground />

      {/* Floating background blobs for depth */}
      <div className="absolute top-20 -left-20 w-72 h-72 bg-yellow-200/20 rounded-full blur-3xl" style={{ animation: "blob-float-1 12s ease-in-out infinite" }} />
      <div className="absolute bottom-10 -right-16 w-56 h-56 bg-green-200/20 rounded-full blur-3xl" style={{ animation: "blob-float-2 10s ease-in-out infinite" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-64 h-64 bg-blue-200/10 rounded-full blur-3xl" style={{ animation: "blob-float-1 15s ease-in-out infinite reverse" }} />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <ScrollReveal>
          <Badge
            variant="secondary"
            className="mb-5 text-xs px-3 py-1 bg-green-50 text-green-700 border-green-200"
          >
            🇮🇳 Built for Indian Shopkeepers
          </Badge>
        </ScrollReveal>

        <div className="text-3d-flip-container">
          <ScrollReveal delay={0.1}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-5">
              Make a GST Invoice{" "}
              <span className="relative inline-block" ref={underlineRef}>
                <span className="relative z-10">in 60 Seconds</span>
                <span
                  className={`absolute bottom-1 left-0 right-0 h-3 bg-yellow-200 -z-0 rounded underline-grow ${underlineVisible ? "visible" : ""}`}
                  style={{ transformOrigin: "left" }}
                />
              </span>{" "}
              — From Your Phone
            </h1>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.2}>
          <p className="text-xl text-gray-500 mb-8 max-w-2xl mx-auto leading-relaxed">
            No accountant needed. No complex software. Just type, tap, done.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <Link href="/login">
            <span className="inline-block btn-hover">
              <Button size="xl" className="gap-2 text-base px-8 py-4 h-auto">
                Start Free — No Credit Card Needed
                <ArrowRight className="w-5 h-5" />
              </Button>
            </span>
          </Link>
        </ScrollReveal>

        <StaggerChildren className="mt-8 flex flex-col sm:flex-row flex-wrap justify-center gap-3 text-sm text-gray-600">
          {heroBullets.map((point, i) => (
            <StaggerItem key={point} index={i}>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                {point}
              </span>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>

      {/* 3D Phone Mockup with depth */}
      <div className="max-w-xs mx-auto mt-14 px-4 relative z-10">
        <PhoneMockup3D />
      </div>
    </section>
  );
}
