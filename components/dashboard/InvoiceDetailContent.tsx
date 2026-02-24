"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { formatCurrency, formatDate } from "@/lib/utils";
import { InvoiceActions } from "@/components/invoice/InvoiceActions";
import { ArrowLeft, FileText } from "lucide-react";
import { useInvoice, useBusiness } from "@/lib/hooks";

const STATUS_BADGE: Record<string, "secondary" | "warning" | "success"> = {
  draft: "secondary",
  sent: "warning",
  paid: "success",
};

function Skeleton({ className }: { className?: string }) {
  return <div className={`bg-gray-200 rounded animate-pulse ${className ?? ""}`} />;
}

export function InvoiceDetailContent() {
  const { id } = useParams<{ id: string }>();
  const { data: invoice, isLoading: invLoading } = useInvoice(id);
  const { data: business, isLoading: bizLoading } = useBusiness();

  const loading = invLoading || bizLoading;

  if (loading) {
    return (
      <div className="p-4 sm:p-6 max-w-2xl mx-auto animate-pulse">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 bg-gray-200 rounded-xl" />
          <div>
            <Skeleton className="h-6 w-36 mb-1" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
        <div className="flex gap-3 mb-4">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 w-28" />
        </div>
        <Skeleton className="h-32 w-full rounded-2xl mb-4" />
        <Skeleton className="h-48 w-full rounded-2xl mb-4" />
        <Skeleton className="h-32 w-full rounded-2xl" />
      </div>
    );
  }

  if (!invoice || !business) {
    return (
      <div className="p-4 sm:p-6 max-w-2xl mx-auto text-center py-16">
        <FileText className="w-10 h-10 text-gray-300 mx-auto mb-3" />
        <p className="text-gray-500">Invoice not found</p>
        <Link href="/invoices" className="text-sm text-gray-400 underline mt-2 block">
          Back to invoices
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 max-w-2xl mx-auto">
      {/* Back + title */}
      <div className="flex items-center gap-3 mb-6">
        <Link href="/invoices">
          <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
        </Link>
        <div>
          <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <FileText className="w-5 h-5" />
            {invoice.invoiceNumber}
          </h1>
          <div className="flex items-center gap-2 mt-0.5">
            <Badge
              variant={STATUS_BADGE[invoice.status] ?? "secondary"}
              className="text-xs capitalize"
            >
              {invoice.status}
            </Badge>
            <span className="text-xs text-gray-400">
              {formatDate(invoice.date)}
            </span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <InvoiceActions invoice={{ ...invoice, clientName: invoice.client?.name }} />

      {/* Client */}
      {invoice.client && (
        <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-4">
          <div className="text-xs text-gray-400 font-medium mb-2 uppercase tracking-wide">
            Bill To
          </div>
          <div className="font-semibold text-gray-900">{invoice.client.name}</div>
          {invoice.client.gstin && (
            <div className="text-sm text-gray-500">GSTIN: {invoice.client.gstin}</div>
          )}
          {invoice.client.phone && (
            <div className="text-sm text-gray-500">📞 {invoice.client.phone}</div>
          )}
          {invoice.client.address && (
            <div className="text-sm text-gray-500">{invoice.client.address}</div>
          )}
        </div>
      )}

      {/* Items */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden mb-4">
        <div className="px-4 py-3 border-b border-gray-50 text-xs font-semibold text-gray-400 uppercase tracking-wide">
          Items
        </div>
        <div className="divide-y divide-gray-50">
          {invoice.items.map((item, i) => (
            <div key={i} className="px-4 py-3">
              <div className="flex justify-between items-start">
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-900 text-sm">
                    {item.description}
                  </div>
                  <div className="text-xs text-gray-400 mt-0.5">
                    {item.quantity} × {formatCurrency(item.rate)} · GST {item.gstRate}%
                  </div>
                  <div className="text-xs text-gray-400">
                    CGST: {formatCurrency(item.cgst)} · SGST: {formatCurrency(item.sgst)}
                  </div>
                </div>
                <div className="font-semibold text-gray-900 text-sm shrink-0 ml-3">
                  {formatCurrency(item.amount + item.cgst + item.sgst)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Totals */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-6">
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Subtotal</span>
            <span>{formatCurrency(invoice.subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>CGST</span>
            <span>{formatCurrency(invoice.cgstTotal)}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>SGST</span>
            <span>{formatCurrency(invoice.sgstTotal)}</span>
          </div>
          <Separator />
          <div className="flex justify-between font-bold text-gray-900">
            <span>Total</span>
            <span className="text-lg">{formatCurrency(invoice.total)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
