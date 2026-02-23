import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { team } from "@/lib/team";
import { ArrowRight, Github, Linkedin, Twitter } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us — InvoiceGPT",
  description:
    "Meet the team behind InvoiceGPT — building the fastest GST invoice generator for Indian shopkeepers and small businesses.",
  openGraph: {
    title: "About Us — InvoiceGPT",
    description:
      "Meet the team behind InvoiceGPT — building the fastest GST invoice generator for Indian shopkeepers and small businesses.",
    url: "https://invoicegpt.org/about",
  },
};

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* ── HERO ── */}
      <section className="pt-20 pb-16 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto text-center">
          <Badge
            variant="secondary"
            className="mb-5 text-xs px-3 py-1 bg-green-50 text-green-700 border-green-200"
          >
            Our Story
          </Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-5">
            Making GST billing{" "}
            <span className="relative inline-block">
              <span className="relative z-10">simple for everyone</span>
              <span className="absolute bottom-1 left-0 right-0 h-3 bg-yellow-200 -z-0 rounded" />
            </span>
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed max-w-2xl mx-auto">
            InvoiceGPT was born from a simple observation — millions of Indian
            shopkeepers still write invoices by hand or struggle with complex
            accounting software. We&apos;re on a mission to change that.
          </p>
        </div>
      </section>

      {/* ── MISSION ── */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Why we built InvoiceGPT
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  India has over 60 million small businesses — kirana stores,
                  medical shops, restaurants, and freelancers. Most of them
                  still rely on handwritten bills or expensive software built
                  for accountants.
                </p>
                <p>
                  We believe every shopkeeper deserves a tool that&apos;s as
                  simple as WhatsApp and as powerful as the best billing
                  software. That&apos;s why InvoiceGPT works right from your
                  phone browser — no downloads, no training, no accountant
                  needed.
                </p>
                <p>
                  Our goal is simple: help every Indian business owner create
                  professional, GST-compliant invoices in under 60 seconds.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="bg-gray-50 rounded-2xl p-5 border border-gray-100 text-center"
                >
                  <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
                    {s.value}
                  </div>
                  <div className="text-xs text-gray-500">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              What we stand for
            </h2>
            <p className="text-gray-500">
              The principles that guide everything we build.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {values.map((v) => (
              <div
                key={v.title}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center"
              >
                <div className="text-3xl mb-3">{v.emoji}</div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {v.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              Meet the team
            </h2>
            <p className="text-gray-500">
              A small, passionate crew building for millions.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {team.map((member) => (
              <div
                key={member.username}
                className="bg-gray-50 rounded-2xl p-6 border border-gray-100 text-center flex flex-col items-center"
              >
                {/* Photo or initials fallback */}
                <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4 bg-gray-900 flex items-center justify-center shadow-lg">
                  {member.photo ? (
                    <Image
                      src={member.photo}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  ) : null}
                  {/* Initials fallback — always rendered, image overlays it */}
                  <span className="text-2xl font-bold text-white absolute inset-0 flex items-center justify-center -z-0">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>

                <h3 className="font-semibold text-gray-900 text-lg">
                  {member.name}
                </h3>
                <p className="text-sm font-medium text-gray-500 mb-3">
                  {member.role}
                </p>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">
                  {member.bio}
                </p>

                {/* Social links */}
                {member.links && (
                  <div className="flex items-center gap-3">
                    {member.links.github && (
                      <a
                        href={member.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-gray-700 transition-colors"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {member.links.linkedin && (
                      <a
                        href={member.links.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-gray-700 transition-colors"
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                    )}
                    {member.links.twitter && (
                      <a
                        href={member.links.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-gray-700 transition-colors"
                      >
                        <Twitter className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-4 bg-gray-900">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to simplify your billing?
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            Join 500+ shopkeepers already creating professional GST invoices in
            seconds.
          </p>
          <Link href="/login">
            <Button
              size="xl"
              className="bg-white text-gray-900 hover:bg-gray-100 gap-2 text-base px-8 py-4 h-auto"
            >
              Get Started Free <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
          <p className="text-gray-600 text-xs mt-4">
            6 free invoices · No credit card · Cancel anytime
          </p>
        </div>
      </section>
    </div>
  );
}

// ── DATA ──

const stats = [
  { value: "500+", label: "Shopkeepers" },
  { value: "60s", label: "Per Invoice" },
  { value: "₹399/mo", label: "Simple Pricing" },
];

const values = [
  {
    emoji: "⚡",
    title: "Simplicity First",
    desc: "If your grandma can't use it, we haven't made it simple enough. Every feature must earn its place.",
  },
  {
    emoji: "🇮🇳",
    title: "Built for India",
    desc: "Designed for Indian shopkeepers, Indian GST rules, Indian phones, and Indian internet speeds.",
  },
  {
    emoji: "🔒",
    title: "Trust & Privacy",
    desc: "Your business data is yours. We encrypt everything, share nothing, and give you full control.",
  },
];
