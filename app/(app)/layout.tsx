import Link from "next/link";
import { Plus } from "lucide-react";
import Image from "next/image";
import { AppNav } from "@/components/dashboard/AppNav";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:fixed lg:inset-y-0 lg:left-0 lg:w-60 lg:flex-col bg-white border-r border-gray-100 z-30">
        <div className="flex items-center gap-2 px-6 h-16 border-b border-gray-100">
          <Image src="/logo.png" alt="InvoiceGPT" width={28} height={28} className="rounded-lg" />
          <span className="font-bold text-gray-900">InvoiceGPT</span>
        </div>
        <AppNav orientation="sidebar" />
        <div className="p-4 border-t border-gray-100">
          <Link href="/invoices/new">
            <button className="w-full flex items-center justify-center gap-2 bg-black text-white rounded-xl py-2.5 text-sm font-medium hover:bg-gray-800 transition-colors">
              <Plus className="w-4 h-4" />
              New Invoice
            </button>
          </Link>
        </div>
      </aside>

      {/* Mobile top bar */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-30 bg-white border-b border-gray-100 h-14 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="InvoiceGPT" width={28} height={28} className="rounded-lg" />
          <span className="font-bold text-gray-900">InvoiceGPT</span>
        </div>
        <Link href="/invoices/new">
          <button className="flex items-center gap-1.5 bg-black text-white rounded-xl px-3 py-1.5 text-sm font-medium">
            <Plus className="w-4 h-4" />
            New
          </button>
        </Link>
      </header>

      {/* Main content */}
      <main className="lg:pl-60 pb-20 lg:pb-0">
        <div className="pt-14 lg:pt-0 min-h-screen">
          {children}
        </div>
      </main>

      {/* Mobile bottom nav */}
      <AppNav orientation="bottom" />
    </div>
  );
}
