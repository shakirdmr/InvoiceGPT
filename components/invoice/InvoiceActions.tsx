"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, CheckCircle, Loader2, Send } from "lucide-react";
import { toast } from "sonner";

interface InvoiceActionsProps {
  invoice: {
    id: string;
    invoiceNumber: string;
    status: string;
  };
}

export function InvoiceActions({ invoice }: InvoiceActionsProps) {
  const [downloading, setDownloading] = useState(false);
  const [markingPaid, setMarkingPaid] = useState(false);

  async function handleDownload() {
    setDownloading(true);
    try {
      const res = await fetch(`/api/invoices/${invoice.id}/pdf`);
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error((body as { error?: string }).error ?? `HTTP ${res.status}`);
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${invoice.invoiceNumber}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success("PDF downloaded!");
    } catch (err) {
      console.error("[PDF download]", err);
      toast.error("Failed to download PDF");
    } finally {
      setDownloading(false);
    }
  }

  async function handleMarkPaid() {
    setMarkingPaid(true);
    try {
      const res = await fetch(`/api/invoices/${invoice.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "paid" }),
      });
      if (!res.ok) throw new Error();
      toast.success("Invoice marked as paid!");
      window.location.reload();
    } catch {
      toast.error("Failed to update status");
    } finally {
      setMarkingPaid(false);
    }
  }

  return (
    <div className="flex gap-3 mb-4">
      <Button
        onClick={handleDownload}
        className="flex-1 gap-2"
        disabled={downloading}
      >
        {downloading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Download className="w-4 h-4" />
        )}
        Download PDF
      </Button>

      {invoice.status !== "paid" && (
        <Button
          onClick={handleMarkPaid}
          variant="outline"
          className="gap-2"
          disabled={markingPaid}
        >
          {markingPaid ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <CheckCircle className="w-4 h-4 text-green-600" />
          )}
          <span className="hidden sm:inline">Mark Paid</span>
        </Button>
      )}

      <Button variant="outline" size="icon" className="shrink-0">
        <Send className="w-4 h-4" />
      </Button>
    </div>
  );
}
