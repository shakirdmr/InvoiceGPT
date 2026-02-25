import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  organizationSchema,
  softwareApplicationSchema,
  faqSchema,
  breadcrumbSchema,
  graphSchema,
} from "@/lib/seo/structured-data";
import { BASE_URL } from "@/lib/seo/config";
import {
  CheckCircle2,
  ArrowRight,
  Star,
  Clock,
  Smartphone,
  Shield,
  Zap,
  Users,
  FileText,
  Download,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <JsonLd
        data={graphSchema([
          organizationSchema(),
          softwareApplicationSchema(),
          breadcrumbSchema([{ name: "Home", url: BASE_URL }]),
          faqSchema(faqs),
        ])}
      />

      {/* ── URGENCY BANNER ── */}
      <div className="bg-gray-900 text-white text-center py-2.5 px-4 text-sm font-medium">
        🔥 Early Access Pricing — Lock in{" "}
        <strong>₹399/mo</strong> before the price increases
      </div>

      {/* ── NAV ── */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="InvoiceGPT" width={28} height={28} className="rounded-lg" />
            <span className="font-bold text-gray-900">InvoiceGPT</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
                Sign In
              </Button>
            </Link>
            <Link href="/login">
              <Button size="sm">Start Free</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* ── 1. HERO ── */}
      <section className="pt-16 pb-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <Badge
            variant="secondary"
            className="mb-5 text-xs px-3 py-1 bg-green-50 text-green-700 border-green-200"
          >
            🇮🇳 Built for Indian Shopkeepers
          </Badge>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-5">
            Make a GST Invoice{" "}
            <span className="relative inline-block">
              <span className="relative z-10">in 60 Seconds</span>
              <span className="absolute bottom-1 left-0 right-0 h-3 bg-yellow-200 -z-0 rounded" />
            </span>{" "}
            — From Your Phone
          </h1>

          <p className="text-xl text-gray-500 mb-8 max-w-2xl mx-auto leading-relaxed">
            No accountant needed. No complex software. Just type, tap, done.
          </p>

          <Link href="/login">
            <Button size="xl" className="gap-2 text-base px-8 py-4 h-auto">
              Start Free — No Credit Card Needed
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>

          {/* Proof bullets */}
          <div className="mt-8 flex flex-col sm:flex-row flex-wrap justify-center gap-3 text-sm text-gray-600">
            {heroBullets.map((point) => (
              <span key={point} className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                {point}
              </span>
            ))}
          </div>
        </div>

        {/* Phone mockup */}
        <div className="max-w-xs mx-auto mt-14 px-4">
          <div className="bg-gray-900 rounded-[2.5rem] p-3 shadow-2xl">
            <div className="bg-white rounded-[2rem] overflow-hidden">
              <div className="bg-gray-50 px-4 pt-6 pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="h-3 bg-gray-800 rounded w-24 mb-1" />
                    <div className="h-2 bg-gray-300 rounded w-16" />
                  </div>
                  <div className="w-8 h-8 bg-black rounded-lg" />
                </div>
                <div className="bg-white rounded-xl p-3 shadow-sm">
                  <div className="text-xs font-bold text-gray-400 mb-2">TAX INVOICE</div>
                  <div className="space-y-2">
                    {["Rice (5kg)", "Dal (2kg)", "Oil (1L)"].map((_, i) => (
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
                      <span>CGST (2.5%)</span>
                      <span>₹28.75</span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>SGST (2.5%)</span>
                      <span>₹28.75</span>
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
      </section>

      {/* ── 2. PROBLEM ── */}
      <section className="py-16 px-4 bg-red-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Billing shouldn&apos;t take 20 minutes.
          </h2>
          <p className="text-gray-600 mb-10 text-lg">
            But for most shopkeepers in India, it does. Sound familiar?
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
            {problems.map((p) => (
              <div
                key={p.text}
                className="flex items-start gap-3 bg-white rounded-2xl p-4 border border-red-100 shadow-sm"
              >
                <span className="text-2xl shrink-0">{p.emoji}</span>
                <p className="text-sm text-gray-700 leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 text-gray-900 font-semibold text-lg">
            There is a better way. And it fits in your pocket.
          </p>
        </div>
      </section>

      {/* ── 3. SOLUTION ── */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <Badge variant="secondary" className="mb-4 text-xs">
            The Solution
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Meet InvoiceGPT — The Fastest GST Billing App in India
          </h2>
          <p className="text-gray-500 text-lg mb-10">
            Built for shopkeepers, not accountants.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {solutionPoints.map((s) => (
              <div
                key={s.title}
                className="flex flex-col items-center text-center p-6 rounded-2xl bg-gray-50 border border-gray-100"
              >
                <div className="text-3xl mb-3">{s.emoji}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. BENEFITS ── */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              What you actually get
            </h2>
            <p className="text-gray-500">Real outcomes. Not empty promises.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="flex items-start gap-4 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm"
              >
                <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center shrink-0">
                  <b.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{b.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. HOW IT WORKS ── */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            3 steps. 60 seconds. Done.
          </h2>
          <p className="text-gray-500 mb-12">It&apos;s really this simple.</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {steps.map((s, i) => (
              <div key={s.title} className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-gray-900 text-white rounded-2xl flex items-center justify-center text-2xl font-bold mb-4 shadow-lg">
                  {i + 1}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-12">
            <Link href="/login">
              <Button size="lg" className="gap-2">
                Try It Now — Free <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── 6. SOCIAL PROOF ── */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <div className="flex justify-center gap-1 mb-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              500+ shopkeepers. Real results.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. PRICING / OFFER ── */}
      <section className="py-20 px-4 bg-white" id="pricing">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            One plan. Unlimited invoices.
          </h2>
          <p className="text-gray-500 mb-10">
            Start free. Upgrade when you&apos;re ready.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* Free Trial */}
            <div className="bg-gray-50 rounded-3xl p-8 border border-gray-200 flex flex-col text-left">
              <div className="text-sm font-semibold text-gray-500 mb-1 uppercase tracking-wide">
                Free Trial
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-1">₹0</div>
              <div className="text-sm text-gray-500 mb-6">No credit card required</div>
              <ul className="space-y-3 flex-1 mb-8">
                {freeFeatures.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/login">
                <Button variant="outline" size="lg" className="w-full">
                  Start Free
                </Button>
              </Link>
            </div>

            {/* Pro Plan */}
            <div className="bg-gray-900 rounded-3xl p-8 flex flex-col text-left relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <span className="bg-yellow-400 text-gray-900 text-xs font-bold px-2.5 py-1 rounded-full">
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
              <div className="text-sm text-gray-400 mb-6">₹13/day — less than chai ☕</div>
              <ul className="space-y-3 flex-1 mb-8">
                {proFeatures.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-gray-200">
                    <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/login">
                <Button
                  size="lg"
                  className="w-full bg-white text-gray-900 hover:bg-gray-100"
                >
                  Start Free — Upgrade Anytime
                </Button>
              </Link>
              <p className="text-xs text-gray-500 text-center mt-3">
                7-day money-back guarantee. No questions.
              </p>
            </div>
          </div>

          {/* Guarantee badge */}
          <div className="mt-8 inline-flex items-center gap-3 bg-green-50 border border-green-200 rounded-2xl px-6 py-4">
            <Shield className="w-6 h-6 text-green-600 shrink-0" />
            <p className="text-sm text-green-800 text-left">
              <strong>7-Day Money-Back Guarantee.</strong> Not happy? We&apos;ll refund every
              rupee. No questions asked.
            </p>
          </div>
        </div>
      </section>

      {/* ── 9. FAQ ── */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">
            Questions? We have answers.
          </h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.q}
                className="bg-white rounded-2xl border border-gray-100 p-5"
              >
                <p className="font-semibold text-gray-900 mb-2">{faq.q}</p>
                <p className="text-sm text-gray-500 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 10. FINAL CTA ── */}
      <section className="py-20 px-4 bg-gray-900">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Your first 6 invoices are free.
          </h2>
          <p className="text-gray-400 text-lg mb-3">
            Start now. No credit card. No downloads. No accountant.
          </p>
          <p className="text-gray-500 text-sm mb-8">
            Join 500+ shopkeepers saving time every single day.
          </p>
          <Link href="/login">
            <Button
              size="xl"
              className="bg-white text-gray-900 hover:bg-gray-100 gap-2 text-base px-8 py-4 h-auto"
            >
              Get Started Free →
            </Button>
          </Link>
          <p className="text-gray-600 text-xs mt-4">
            6 free invoices · No credit card · Cancel anytime
          </p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-8 px-4 border-t border-gray-100 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="InvoiceGPT" width={20} height={20} className="rounded" />
            <span className="font-medium text-gray-900">InvoiceGPT</span>
          </div>
          <p>© 2025 InvoiceGPT. Made with ❤️ for Indian shopkeepers.</p>
          <div className="flex gap-4 text-xs">
            <Link href="/about" className="hover:text-gray-700">About</Link>
            <Link href="/privacy" className="hover:text-gray-700">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ── DATA ──

const heroBullets = [
  "Works on any phone",
  "Auto GST calculation",
  "PDF in one tap",
  "6 free invoices",
  "500+ shopkeepers trust us",
];

const problems = [
  {
    emoji: "✍️",
    text: "Writing invoices by hand — and still making calculation mistakes that cost you money.",
  },
  {
    emoji: "🖥️",
    text: "Complex billing software with 50 buttons — designed for accountants, not shopkeepers.",
  },
  {
    emoji: "📸",
    text: "Sending blurry WhatsApp photos of handwritten bills — looks unprofessional to customers.",
  },
  {
    emoji: "💸",
    text: "Paying your accountant extra every month just to make basic invoices for you.",
  },
];

const solutionPoints = [
  {
    emoji: "📱",
    title: "Works on your phone",
    desc: "Open your browser. No app install. No PC needed. Works on any Android or iPhone.",
  },
  {
    emoji: "⚡",
    title: "Auto GST calculation",
    desc: "Pick the GST rate. We calculate CGST, SGST, totals — instantly. Zero mistakes.",
  },
  {
    emoji: "📄",
    title: "Professional PDF",
    desc: "Download a clean, printed-quality invoice. Share on WhatsApp in one tap.",
  },
];

const benefits = [
  {
    icon: Clock,
    title: "Save 15+ minutes per invoice",
    desc: "What used to take 20 minutes now takes 60 seconds. That's real time back in your day.",
  },
  {
    icon: FileText,
    title: "Look professional instantly",
    desc: "Your customers get clean, printed-quality GST bills — not a photo of a notebook.",
  },
  {
    icon: Zap,
    title: "Zero GST calculation mistakes",
    desc: "CGST & SGST auto-calculated for every rate: 0%, 5%, 12%, 18%, 28%. Always correct.",
  },
  {
    icon: Smartphone,
    title: "Works on any phone, anywhere",
    desc: "Just open the browser. Android or iPhone. No app to install, no PC needed.",
  },
  {
    icon: Users,
    title: "Remember your customers",
    desc: "Save client details once. Next time, just select their name — everything fills in.",
  },
  {
    icon: Download,
    title: "PDF on WhatsApp in one tap",
    desc: "Download and share your invoice instantly. Customers get it before they leave your shop.",
  },
];

const steps = [
  {
    title: "Sign in with Google",
    desc: "10 seconds. No forms, no passwords to remember. Just one click.",
  },
  {
    title: "Add items & customer",
    desc: "Type item name, price, GST rate. We handle all the tax calculations automatically.",
  },
  {
    title: "Download & Share",
    desc: "Get a professional PDF. Share on WhatsApp or download and print.",
  },
];

const testimonials = [
  {
    quote:
      "Pehle haath se likhta tha, galtiyan bhi hoti thi. Ab 1 minute mein perfect invoice milti hai. Bhai ne bola 'yeh kya jadoo hai?'",
    name: "Farooq Ahmed",
    shop: "General Store, Srinagar",
  },
  {
    quote:
      "Maine soch bhi nahi sakta tha ki mobile se itni achhi invoice ban sakti hai. Customer bhi impress ho gaya. Ab professional lagta hoon.",
    name: "Bashir Ahmad",
    shop: "Electronics Shop, Anantnag",
  },
  {
    quote:
      "Accountant ko 500 rupaye deta tha sirf invoices ke liye. Ab khud bana leta hoon 399 mein — aur unlimited. Bahut faida hua.",
    name: "Mushtaq Wani",
    shop: "Medical Store, Baramulla",
  },
];

const freeFeatures = [
  "6 full GST invoices",
  "PDF download",
  "Client saving",
  "CGST + SGST auto-calc",
];

const proFeatures = [
  "Unlimited GST invoices",
  "Business logo on every invoice",
  "Unlimited clients saved",
  "PDF download & WhatsApp share",
  "CGST + SGST auto-calculation",
  "All GST rates (0%, 5%, 12%, 18%, 28%)",
  "Priority support",
];

const faqs = [
  {
    q: "Do I need to know about GST to use this?",
    a: "No. You just pick the GST rate (5%, 12%, 18%, or 28%) for each item, and we calculate CGST, SGST, and the final total automatically. Zero knowledge required.",
  },
  {
    q: "I'm not good with technology. Will I manage?",
    a: "If you can use WhatsApp, you can use InvoiceGPT. It's that simple. Most shopkeepers make their first invoice in under 2 minutes — with zero training.",
  },
  {
    q: "Is my business data safe?",
    a: "Yes. All your data is encrypted and stored securely. Nobody else can see your invoices or customer details. We use the same security standards as major Indian banking apps.",
  },
  {
    q: "What if I don't like it after subscribing?",
    a: "We offer a 7-day money-back guarantee. If you subscribe and aren't happy for any reason, just email us and we'll refund every rupee. No questions asked.",
  },
  {
    q: "Do I need to download or install anything?",
    a: "No. InvoiceGPT runs right in your phone's browser — Chrome, Safari, whatever you use. Nothing to install. Just open the website and start.",
  },
];
