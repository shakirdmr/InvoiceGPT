import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

/**
 * Shared layout for all marketing / programmatic SEO pages.
 * Includes a lightweight nav and footer optimised for conversions.
 * Auth is NOT required for any route in this group.
 */
export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* ── NAV ── */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="InvoiceGPT"
              width={28}
              height={28}
              className="rounded-lg"
              priority
            />
            <span className="font-bold text-gray-900">InvoiceGPT</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/about" className="hidden sm:block text-sm text-gray-600 hover:text-gray-900">
              About
            </Link>
            <Link href="/guides" className="hidden sm:block text-sm text-gray-600 hover:text-gray-900">
              Guides
            </Link>
            <Link href="/gst-invoice" className="hidden sm:block text-sm text-gray-600 hover:text-gray-900">
              Industries
            </Link>
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

      {/* ── CONTENT ── */}
      <main className="flex-1">{children}</main>

      {/* ── FOOTER ── */}
      <footer className="py-10 px-4 border-t border-gray-100 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Image src="/logo.png" alt="InvoiceGPT" width={20} height={20} className="rounded" />
                <span className="font-bold text-gray-900 text-sm">InvoiceGPT</span>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                GST invoices in 60 seconds. Built for Indian shopkeepers.
              </p>
            </div>
            <div>
              <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wide mb-3">Product</h3>
              <ul className="space-y-2 text-xs text-gray-500">
                <li><Link href="/#pricing" className="hover:text-gray-700">Pricing</Link></li>
                <li><Link href="/login" className="hover:text-gray-700">Start Free</Link></li>
                <li><Link href="/login" className="hover:text-gray-700">Sign In</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wide mb-3">Learn</h3>
              <ul className="space-y-2 text-xs text-gray-500">
                <li><Link href="/guides" className="hover:text-gray-700">GST Guides</Link></li>
                <li><Link href="/guides/how-to-create-gst-invoice" className="hover:text-gray-700">Create GST Invoice</Link></li>
                <li><Link href="/guides/gst-rates-in-india" className="hover:text-gray-700">GST Rate List</Link></li>
                <li><Link href="/guides/what-is-gstin" className="hover:text-gray-700">What is GSTIN?</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wide mb-3">Popular</h3>
              <ul className="space-y-2 text-xs text-gray-500">
                <li><Link href="/gst-invoice/medical-store" className="hover:text-gray-700">Medical Store Invoice</Link></li>
                <li><Link href="/gst-invoice/restaurant" className="hover:text-gray-700">Restaurant Invoice</Link></li>
                <li><Link href="/gst-invoice/kirana-store" className="hover:text-gray-700">Kirana Store Invoice</Link></li>
                <li><Link href="/gst-invoice/freelancer" className="hover:text-gray-700">Freelancer Invoice</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
            <p>© {new Date().getFullYear()} InvoiceGPT. Made with ❤️ for Indian shopkeepers.</p>
            <div className="flex gap-4">
              <Link href="/about" className="hover:text-gray-700">About</Link>
              <Link href="/privacy" className="hover:text-gray-700">Privacy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
