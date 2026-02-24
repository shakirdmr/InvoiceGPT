"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Plus,
  Trash2,
  Download,
  Loader2,
  ArrowLeft,
  FileText,
} from "lucide-react";
import { toast } from "sonner";
import { calcLineItem, calcInvoiceTotals, GST_RATES, numberToWords } from "@/lib/gst";
import { formatCurrency } from "@/lib/utils";
import { useInvoice, useClients, useBusiness } from "@/lib/hooks";
import { DownloadNameDialog } from "@/components/invoice/DownloadNameDialog";

interface LineItem {
  description: string;
  quantity: number;
  rate: number;
  gstRate: number;
}

const EMPTY_ITEM: LineItem = { description: "", quantity: 1, rate: 0, gstRate: 18 };

export function EditInvoiceForm() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const { data: invoice, isLoading: invoiceLoading } = useInvoice(id);
  const { data: clientsData } = useClients();
  const { data: business } = useBusiness();

  const clients = clientsData ?? [];

  const [initialized, setInitialized] = useState(false);
  const [saving, setSaving] = useState(false);
  const [generatingPdf, setGeneratingPdf] = useState(false);
  const [pendingDownload, setPendingDownload] = useState<{
    invoiceId: string;
    suggestedName: string;
  } | null>(null);

  const [selectedClientId, setSelectedClientId] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [dueDate, setDueDate] = useState("");
  const [notes, setNotes] = useState("");
  const [items, setItems] = useState<LineItem[]>([{ ...EMPTY_ITEM }]);

  useEffect(() => {
    if (invoice && !initialized) {
      setInvoiceNumber(invoice.invoiceNumber);
      setDate(invoice.date.split("T")[0]);
      setDueDate(invoice.dueDate ? invoice.dueDate.split("T")[0] : "");
      setNotes(invoice.notes ?? "");
      setSelectedClientId(invoice.client?.id ?? "");
      setItems(
        invoice.items.map((item) => ({
          description: item.description,
          quantity: item.quantity,
          rate: item.rate,
          gstRate: item.gstRate,
        }))
      );
      setInitialized(true);
    }
  }, [invoice, initialized]);

  function addItem() {
    setItems((prev) => [...prev, { ...EMPTY_ITEM }]);
  }

  function removeItem(index: number) {
    setItems((prev) => prev.filter((_, i) => i !== index));
  }

  function updateItem(index: number, field: keyof LineItem, value: string | number) {
    setItems((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  }

  const calculatedItems = items.map((item) =>
    calcLineItem(item.quantity, item.rate, item.gstRate)
  );
  const totals = calcInvoiceTotals(calculatedItems);
  const selectedClient = clients.find((c) => c.id === selectedClientId);

  async function doDownloadPDF(invoiceId: string, filename: string) {
    setGeneratingPdf(true);
    try {
      const res = await fetch(`/api/invoices/${invoiceId}/pdf`);
      if (!res.ok) throw new Error("Failed to generate PDF");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
      toast.success("PDF downloaded!");
    } catch {
      toast.error("Failed to download PDF");
    } finally {
      setGeneratingPdf(false);
    }
  }

  async function handleSave() {
    if (items.some((i) => !i.description.trim())) {
      toast.error("All items need a description");
      return;
    }
    if (items.some((i) => i.quantity <= 0 || i.rate < 0)) {
      toast.error("Check item quantities and rates");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch(`/api/invoices/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientId: selectedClientId || null,
          invoiceNumber,
          date,
          dueDate: dueDate || null,
          notes,
          items,
        }),
      });

      if (!res.ok) throw new Error("Failed to update invoice");

      const clientName = selectedClient?.name ?? invoice?.client?.name;
      setPendingDownload({
        invoiceId: id,
        suggestedName: `${invoiceNumber}${clientName ? ` - ${clientName}` : ""}.pdf`,
      });
    } catch {
      toast.error("Failed to update invoice. Try again.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDownloadConfirm(filename: string) {
    if (!pendingDownload) return;
    await doDownloadPDF(pendingDownload.invoiceId, filename);
    setPendingDownload(null);
    router.push(`/invoices/${pendingDownload.invoiceId}`);
  }

  function handleDownloadCancel() {
    const invoiceId = pendingDownload?.invoiceId ?? id;
    setPendingDownload(null);
    router.push(`/invoices/${invoiceId}`);
  }

  const fieldCls =
    "bg-transparent border-b border-dashed border-gray-300 hover:border-gray-400 focus:border-gray-900 focus:outline-none pb-0.5 min-w-0";

  if (invoiceLoading || !initialized) {
    return (
      <div className="p-4 sm:p-6 max-w-3xl mx-auto animate-pulse space-y-4">
        <div className="h-8 w-48 bg-gray-200 rounded" />
        <div className="h-64 bg-gray-100 rounded-2xl" />
        <div className="h-48 bg-gray-100 rounded-2xl" />
      </div>
    );
  }

  if (!invoice) {
    return (
      <div className="p-4 sm:p-6 max-w-3xl mx-auto text-center py-16">
        <FileText className="w-10 h-10 text-gray-300 mx-auto mb-3" />
        <p className="text-gray-500">Invoice not found</p>
        <Link href="/invoices" className="text-sm text-gray-400 underline mt-2 block">
          Back to invoices
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 pb-10">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Link href={`/invoices/${id}`}>
            <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
          </Link>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Edit Invoice</h1>
            <p className="text-sm text-gray-400">{invoice.invoiceNumber}</p>
          </div>
        </div>

        {/* Invoice Paper */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">

          {/* Business Header */}
          <div className="px-6 sm:px-8 pt-7 pb-6 border-b border-gray-100">
            {business ? (
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xl font-bold text-gray-900">{business.name}</div>
                  {business.gstin && (
                    <div className="text-sm font-medium text-gray-500 mt-0.5">
                      GSTIN: {business.gstin}
                    </div>
                  )}
                  {business.address && (
                    <div className="text-sm text-gray-400 mt-1">{business.address}</div>
                  )}
                  {(business.city || business.state) && (
                    <div className="text-sm text-gray-400">
                      {[business.city, business.state].filter(Boolean).join(", ")}
                    </div>
                  )}
                  {business.phone && (
                    <div className="text-sm text-gray-400">{business.phone}</div>
                  )}
                  {business.email && (
                    <div className="text-sm text-gray-400">{business.email}</div>
                  )}
                </div>
                {business.logoUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={business.logoUrl}
                    alt="Business logo"
                    className="w-16 h-16 object-contain rounded-lg shrink-0"
                  />
                )}
              </div>
            ) : (
              <div className="animate-pulse space-y-2">
                <div className="h-5 bg-gray-100 rounded w-40" />
                <div className="h-3 bg-gray-100 rounded w-28" />
              </div>
            )}
          </div>

          {/* TAX INVOICE title */}
          <div className="py-4 text-center border-b border-gray-100">
            <span className="text-[11px] font-bold tracking-[0.25em] text-gray-900 uppercase">
              Tax Invoice
            </span>
          </div>

          {/* Invoice Details + Bill To */}
          <div className="px-6 sm:px-8 py-6 grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-gray-100">

            {/* Invoice Details */}
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3">
                Invoice Details
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-400 w-14 shrink-0">Number</span>
                  <input
                    value={invoiceNumber}
                    onChange={(e) => setInvoiceNumber(e.target.value)}
                    className={`flex-1 text-sm font-mono font-semibold ${fieldCls}`}
                  />
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-400 w-14 shrink-0">Date</span>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className={`flex-1 text-sm ${fieldCls}`}
                  />
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-400 w-14 shrink-0">Due Date</span>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className={`flex-1 text-sm ${fieldCls}`}
                  />
                </div>
              </div>
            </div>

            {/* Bill To */}
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3">
                Bill To
              </div>
              <div className="space-y-2.5">
                {clients.length > 0 && (
                  <Select
                    value={selectedClientId}
                    onValueChange={setSelectedClientId}
                  >
                    <SelectTrigger className="bg-white text-xs h-8">
                      <SelectValue placeholder="Select client..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">No client</SelectItem>
                      {clients.map((c) => (
                        <SelectItem key={c.id} value={c.id}>
                          {c.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
                {selectedClient && (
                  <div className="space-y-0.5">
                    <div className="text-sm font-semibold text-gray-900">
                      {selectedClient.name}
                    </div>
                    {selectedClient.gstin && (
                      <div className="text-xs text-gray-500">GSTIN: {selectedClient.gstin}</div>
                    )}
                    {selectedClient.phone && (
                      <div className="text-xs text-gray-500">📞 {selectedClient.phone}</div>
                    )}
                    {selectedClient.address && (
                      <div className="text-xs text-gray-500">{selectedClient.address}</div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Items */}
          <div className="px-6 sm:px-8 py-6 border-b border-gray-100">

            <div className="hidden sm:grid grid-cols-[24px_1fr_72px_96px_72px_96px_28px] gap-x-2 bg-gray-900 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-2.5 rounded-t-lg">
              <span className="text-center">#</span>
              <span>Description</span>
              <span className="text-right">Qty</span>
              <span className="text-right">Rate (₹)</span>
              <span className="text-center">GST %</span>
              <span className="text-right">Amount</span>
              <span />
            </div>

            <div className="sm:border sm:border-t-0 sm:border-gray-100 sm:rounded-b-lg sm:overflow-hidden divide-y divide-gray-50">
              {items.map((item, index) => {
                const calc = calculatedItems[index];
                const rowTotal = (calc?.amount ?? 0) + (calc?.cgst ?? 0) + (calc?.sgst ?? 0);
                const hasTax = calc && (calc.cgst > 0 || calc.sgst > 0);

                return (
                  <div key={index} className={index % 2 === 1 ? "sm:bg-gray-50/60" : ""}>
                    {/* Desktop row */}
                    <div className="hidden sm:grid grid-cols-[24px_1fr_72px_96px_72px_96px_28px] gap-x-2 items-center px-3 py-2.5">
                      <span className="text-center text-xs text-gray-400">{index + 1}</span>
                      <input
                        value={item.description}
                        onChange={(e) => updateItem(index, "description", e.target.value)}
                        placeholder="Item / service..."
                        className="text-sm bg-transparent border-b border-dashed border-gray-200 hover:border-gray-400 focus:border-gray-700 focus:outline-none pb-0.5 w-full placeholder:text-gray-300"
                      />
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          updateItem(index, "quantity", parseFloat(e.target.value) || 0)
                        }
                        min="0.01"
                        step="0.01"
                        className="text-sm text-right bg-transparent border-b border-dashed border-gray-200 hover:border-gray-400 focus:border-gray-700 focus:outline-none pb-0.5 w-full"
                      />
                      <input
                        type="number"
                        value={item.rate}
                        onChange={(e) =>
                          updateItem(index, "rate", parseFloat(e.target.value) || 0)
                        }
                        min="0"
                        step="0.01"
                        className="text-sm text-right bg-transparent border-b border-dashed border-gray-200 hover:border-gray-400 focus:border-gray-700 focus:outline-none pb-0.5 w-full"
                      />
                      <Select
                        value={String(item.gstRate)}
                        onValueChange={(v) => updateItem(index, "gstRate", parseFloat(v))}
                      >
                        <SelectTrigger className="h-7 text-xs border-dashed bg-transparent shadow-none">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {GST_RATES.map((rate) => (
                            <SelectItem key={rate} value={String(rate)}>
                              {rate}%
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <span className="text-sm text-right font-semibold text-gray-800">
                        {formatCurrency(rowTotal)}
                      </span>
                      {items.length > 1 ? (
                        <button
                          type="button"
                          onClick={() => removeItem(index)}
                          className="text-gray-300 hover:text-red-400 transition-colors flex justify-center"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      ) : (
                        <span />
                      )}
                    </div>

                    {hasTax && (
                      <div className="hidden sm:flex justify-end gap-4 px-3 pb-2 -mt-1">
                        <span className="text-[10px] text-gray-400">
                          CGST: {formatCurrency(calc.cgst)}
                        </span>
                        <span className="text-[10px] text-gray-400">
                          SGST: {formatCurrency(calc.sgst)}
                        </span>
                      </div>
                    )}

                    {/* Mobile card */}
                    <div className="sm:hidden py-3 space-y-2">
                      <div className="flex items-start gap-2">
                        <span className="text-xs text-gray-400 mt-1.5 shrink-0 w-4 text-center">
                          {index + 1}.
                        </span>
                        <input
                          value={item.description}
                          onChange={(e) => updateItem(index, "description", e.target.value)}
                          placeholder="Item / service..."
                          className="flex-1 text-sm bg-transparent border-b border-dashed border-gray-200 focus:border-gray-700 focus:outline-none pb-0.5 placeholder:text-gray-300"
                        />
                        {items.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeItem(index)}
                            className="text-gray-300 hover:text-red-400 transition-colors mt-1 shrink-0"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                      <div className="flex items-center gap-2 pl-5">
                        <div className="flex items-center gap-1.5 flex-1">
                          <span className="text-[10px] text-gray-400 uppercase">Qty</span>
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) =>
                              updateItem(index, "quantity", parseFloat(e.target.value) || 0)
                            }
                            min="0.01"
                            step="0.01"
                            className="w-16 text-sm text-right bg-transparent border-b border-dashed border-gray-200 focus:border-gray-700 focus:outline-none pb-0.5"
                          />
                        </div>
                        <div className="flex items-center gap-1.5 flex-1">
                          <span className="text-[10px] text-gray-400 uppercase">₹</span>
                          <input
                            type="number"
                            value={item.rate}
                            onChange={(e) =>
                              updateItem(index, "rate", parseFloat(e.target.value) || 0)
                            }
                            min="0"
                            step="0.01"
                            className="w-20 text-sm text-right bg-transparent border-b border-dashed border-gray-200 focus:border-gray-700 focus:outline-none pb-0.5"
                          />
                        </div>
                        <Select
                          value={String(item.gstRate)}
                          onValueChange={(v) => updateItem(index, "gstRate", parseFloat(v))}
                        >
                          <SelectTrigger className="h-7 w-20 text-xs border-dashed bg-transparent shadow-none shrink-0">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {GST_RATES.map((rate) => (
                              <SelectItem key={rate} value={String(rate)}>
                                {rate}%
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex justify-between items-center pl-5">
                        <div className="flex gap-3 text-[10px] text-gray-400">
                          {hasTax && (
                            <>
                              <span>CGST: {formatCurrency(calc.cgst)}</span>
                              <span>SGST: {formatCurrency(calc.sgst)}</span>
                            </>
                          )}
                        </div>
                        <span className="text-sm font-semibold text-gray-800">
                          {formatCurrency(rowTotal)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              type="button"
              onClick={addItem}
              className="mt-4 flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add item
            </button>
          </div>

          {/* Totals */}
          <div className="px-6 sm:px-8 py-6 border-b border-gray-100">
            <div className="flex justify-end">
              <div className="w-64 space-y-1.5">
                <div className="flex justify-between text-sm text-gray-500 px-1">
                  <span>Subtotal</span>
                  <span>{formatCurrency(totals.subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500 px-1">
                  <span>CGST</span>
                  <span>{formatCurrency(totals.cgstTotal)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500 px-1">
                  <span>SGST</span>
                  <span>{formatCurrency(totals.sgstTotal)}</span>
                </div>
                <div className="flex justify-between items-center bg-gray-900 text-white rounded-lg px-4 py-2.5 mt-2">
                  <span className="text-sm font-bold tracking-wide">Grand Total</span>
                  <span className="text-base font-bold">{formatCurrency(totals.grandTotal)}</span>
                </div>
                {totals.grandTotal > 0 && (
                  <div className="bg-gray-50 rounded-lg px-3 py-2">
                    <p className="text-[10px] text-gray-400 italic leading-relaxed">
                      {numberToWords(totals.grandTotal)}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="px-6 sm:px-8 py-6">
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">
              Notes / Terms
            </div>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Payment terms, bank details, thank you note..."
              rows={3}
              className="w-full bg-transparent text-sm text-gray-600 placeholder:text-gray-300 border-none focus:outline-none resize-none"
            />
          </div>
        </div>

        {/* Save Button */}
        <Button
          onClick={handleSave}
          size="lg"
          className="w-full mt-4 gap-2 h-12 text-base"
          disabled={saving}
        >
          {saving ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <Download className="w-5 h-5" />
              Save & Download PDF
            </>
          )}
        </Button>

        {/* Download Name Dialog */}
        <DownloadNameDialog
          open={pendingDownload !== null}
          defaultName={pendingDownload?.suggestedName ?? ""}
          loading={generatingPdf}
          onConfirm={handleDownloadConfirm}
          onCancel={handleDownloadCancel}
        />
      </div>
    </div>
  );
}
