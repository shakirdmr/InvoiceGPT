import Link from "next/link";
import Image from "next/image";

export function FooterSection() {
  return (
    <footer className="py-8 px-4 border-t border-gray-100 bg-white">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="InvoiceGPT"
            width={20}
            height={20}
            className="rounded"
          />
          <span className="font-medium text-gray-900">InvoiceGPT</span>
        </div>
        <p>© 2025 InvoiceGPT. Made with ❤️ for Indian shopkeepers.</p>
        <div className="flex gap-4 text-xs">
          <Link href="/about" className="hover:text-gray-700">
            About
          </Link>
          <Link href="/privacy" className="hover:text-gray-700">
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  );
}
