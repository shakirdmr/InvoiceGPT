"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatDate } from "@/lib/utils";
import { FileText, Plus, ArrowRight } from "lucide-react";
import { useInvoices } from "@/lib/hooks";

const STATUS_BADGE: Record<string, "secondary" | "warning" | "success"> = {
  draft: "secondary",
  sent: "warning",
  paid: "success",
};

export function InvoicesContent() {
  const { data: invoices, isLoading } = useInvoices();

  return (
    <div className="p-4 sm:p-6 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
            Invoices
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {isLoading ? (
              <span className="inline-block h-3.5 w-12 bg-gray-200 rounded animate-pulse" />
            ) : (
              `${invoices?.length ?? 0} total`
            )}
          </p>
        </div>
        <Link href="/invoices/new">
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">New Invoice</span>
            <span className="sm:hidden">New</span>
          </Button>
        </Link>
      </div>

      {isLoading ? (
        <div className="space-y-3 animate-pulse">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-xl" />
                  <div>
                    <div className="h-3.5 w-28 bg-gray-200 rounded" />
                    <div className="h-3 w-20 bg-gray-100 rounded mt-1.5" />
                  </div>
                </div>
                <div className="text-right">
                  <div className="h-4 w-16 bg-gray-200 rounded" />
                  <div className="h-3 w-10 bg-gray-100 rounded mt-1.5 ml-auto" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : invoices?.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-gray-400" />
          </div>
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            No invoices yet
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Create your first GST invoice in 60 seconds
          </p>
          <Link href="/invoices/new">
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Create Invoice
            </Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {invoices?.map((inv) => (
            <Link key={inv.id} href={`/invoices/${inv.id}`}>
              <div className="bg-white rounded-2xl border border-gray-100 p-4 hover:border-gray-200 hover:shadow-sm transition-all cursor-pointer active:scale-[0.99]">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5 text-gray-500" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-semibold text-gray-900 text-sm">
                        {inv.invoiceNumber}
                      </div>
                      <div className="text-sm text-gray-500 truncate">
                        {inv.client?.name ?? "Walk-in Customer"}
                      </div>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-bold text-gray-900">
                      {formatCurrency(inv.total)}
                    </div>
                    <Badge
                      variant={STATUS_BADGE[inv.status] ?? "secondary"}
                      className="text-xs capitalize mt-1"
                    >
                      {inv.status}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
                  <span className="text-xs text-gray-400">
                    {formatDate(inv.date)}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    View <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
