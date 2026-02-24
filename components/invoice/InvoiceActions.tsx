"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Download, CheckCircle, Loader2, Send, Pencil } from "lucide-react";
import { toast } from "sonner";
import { DownloadNameDialog } from "@/components/invoice/DownloadNameDialog";

interface InvoiceActionsProps {
  invoice: {
    id: string;
    invoiceNumber: string;
    status: string;
    clientName?: string | null;
  };
}

export function InvoiceActions({ invoice }: InvoiceActionsProps) {
  const [showDownloadDialog, setShowDownloadDialog] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [markingPaid, setMarkingPaid] = useState(false);

  const suggestedName = `${invoice.invoiceNumber}${invoice.clientName ? ` - ${invoice.clientName}` : ""}.pdf`;

  async function doDownload(filename: string) {
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
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
      toast.success("PDF downloaded!");
    } catch (err) {
      console.error("[PDF download]", err);
      toast.error("Failed to download PDF");
    } finally {
      setDownloading(false);
      setShowDownloadDialog(false);
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
    <>
      <div className="flex gap-3 mb-4">
        <Button
          onClick={() => setShowDownloadDialog(true)}
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

        <Link href={`/invoices/${invoice.id}/edit`}>
          <Button variant="outline" className="gap-2">
            <Pencil className="w-4 h-4" />
            <span className="hidden sm:inline">Edit</span>
          </Button>
        </Link>

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

      <DownloadNameDialog
        open={showDownloadDialog}
        defaultName={suggestedName}
        loading={downloading}
        onConfirm={doDownload}
        onCancel={() => setShowDownloadDialog(false)}
      />
    </>
  );
}
