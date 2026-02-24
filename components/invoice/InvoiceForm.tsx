"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { toast } from "sonner";
import { calcLineItem, calcInvoiceTotals, GST_RATES, numberToWords } from "@/lib/gst";
import { formatCurrency, generateInvoiceNumber } from "@/lib/utils";
import { useClients, useBusiness, useInvoices } from "@/lib/hooks";
import { NewClientDialog } from "@/components/dashboard/NewClientDialog";

interface LineItem {
  description: string;
  quantity: number;
  rate: number;
  gstRate: number;
}

const EMPTY_ITEM: LineItem = {
  description: "",
  quantity: 1,
  rate: 0,
  gstRate: 18,
};

export function InvoiceForm() {
  const router = useRouter();
  const { data: clientsData } = useClients();
  const { data: business } = useBusiness();
  const { data: invoicesData } = useInvoices();

  const clients = clientsData ?? [];
  const businessName = business?.name ?? "";

  const [loading, setLoading] = useState(false);
  const [generatingPdf, setGeneratingPdf] = useState(false);

  // Client section
  const [selectedClientId, setSelectedClientId] = useState<string>("");
  const [showNewClient, setShowNewClient] = useState(false);
  const [newClient, setNewClient] = useState({
    name: "",
    gstin: "",
    phone: "",
    address: "",
    city: "",
    state: "",
  });

  // Invoice details — number set once invoice count loads
  const [invoiceNumber, setInvoiceNumber] = useState("");
  useEffect(() => {
    if (invoicesData !== undefined && invoiceNumber === "") {
      setInvoiceNumber(generateInvoiceNumber(invoicesData.length));
    }
  }, [invoicesData, invoiceNumber]);
  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [dueDate, setDueDate] = useState("");
  const [notes, setNotes] = useState("");

  // Line items
  const [items, setItems] = useState<LineItem[]>([{ ...EMPTY_ITEM }]);

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

  // Calculate totals
  const calculatedItems = items.map((item) =>
    calcLineItem(item.quantity, item.rate, item.gstRate)
  );
  const totals = calcInvoiceTotals(calculatedItems);

  const selectedClient = clients.find((c) => c.id === selectedClientId);

  async function saveAndGeneratePDF(invoiceId: string) {
    setGeneratingPdf(true);
    try {
      const res = await fetch(`/api/invoices/${invoiceId}/pdf`);
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error((body as { error?: string }).error ?? `HTTP ${res.status}`);
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${invoiceNumber}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success("Invoice saved and PDF downloaded!");
      router.push(`/invoices/${invoiceId}`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      console.error("[PDF]", msg);
      toast.error(`PDF failed: ${msg}`);
      router.push("/invoices");
    } finally {
      setGeneratingPdf(false);
    }
  }

  async function handleSubmit() {
    if (items.some((i) => !i.description.trim())) {
      toast.error("All items need a description");
      return;
    }
    if (items.some((i) => i.quantity <= 0 || i.rate < 0)) {
      toast.error("Check item quantities and rates");
      return;
    }

    setLoading(true);

    try {
      // Create client if new
      let clientId = selectedClientId;
      if (showNewClient && newClient.name.trim()) {
        const clientRes = await fetch("/api/clients", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newClient),
        });
        if (clientRes.ok) {
          const client = await clientRes.json();
          clientId = client.id;
        }
      }

      const payload = {
        clientId: clientId || null,
        invoiceNumber,
        date,
        dueDate: dueDate || null,
        notes,
        items,
      };

      const res = await fetch("/api/invoices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.status === 402) {
        toast.error("Trial limit reached! Please subscribe to continue.");
        router.push("/subscribe");
        return;
      }

      if (!res.ok) throw new Error("Failed to save invoice");

      const invoice = await res.json();

      await saveAndGeneratePDF(invoice.id);
    } catch {
      toast.error("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  const fieldCls =
    "bg-transparent border-b border-dashed border-gray-300 hover:border-gray-400 focus:border-gray-900 focus:outline-none pb-0.5 min-w-0";

  return (
    <div className="p-4 sm:p-6 pb-10">
      <div className="max-w-3xl mx-auto">

        {/* ── The Invoice Paper ── */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">

          {/* Section 1 — Business Header */}
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
                <div className="h-3 bg-gray-100 rounded w-48" />
              </div>
            )}
          </div>

          {/* Section 2 — TAX INVOICE title */}
          <div className="py-4 text-center border-b border-gray-100">
            <span className="text-[11px] font-bold tracking-[0.25em] text-gray-900 uppercase">
              Tax Invoice
            </span>
          </div>

          {/* Section 3 — Invoice Details + Bill To */}
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
                    onValueChange={(v) => {
                      setSelectedClientId(v);
                      if (v) setShowNewClient(false);
                    }}
                  >
                    <SelectTrigger className="bg-white text-xs h-8">
                      <SelectValue placeholder="Select existing client..." />
                    </SelectTrigger>
                    <SelectContent>
                      {clients.map((c) => (
                        <SelectItem key={c.id} value={c.id}>
                          {c.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}

                {selectedClient && !showNewClient && (
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

                <button
                  type="button"
                  onClick={() => {
                    setShowNewClient(!showNewClient);
                    if (!showNewClient) setSelectedClientId("");
                  }}
                  className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-700 transition-colors"
                >
                  {showNewClient ? (
                    <ChevronUp className="w-3.5 h-3.5" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5" />
                  )}
                  {showNewClient ? "Hide" : "+ New client"}
                </button>

                <NewClientDialog
                  onClientCreated={(client) => {
                    setSelectedClientId(client.id);
                    setShowNewClient(false);
                  }}
                  trigger={
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="text-xs h-auto px-2 py-1 text-gray-400 hover:text-gray-700 hover:bg-transparent"
                    >
                      Quick add
                    </Button>
                  }
                />

                {showNewClient && (
                  <div className="space-y-2">
                    <input
                      value={newClient.name}
                      onChange={(e) => setNewClient((p) => ({ ...p, name: e.target.value }))}
                      placeholder="Client name *"
                      className="w-full text-sm bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-gray-400"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        value={newClient.gstin}
                        onChange={(e) => setNewClient((p) => ({ ...p, gstin: e.target.value }))}
                        placeholder="GSTIN"
                        className="text-sm bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-gray-400 uppercase"
                      />
                      <input
                        value={newClient.phone}
                        onChange={(e) => setNewClient((p) => ({ ...p, phone: e.target.value }))}
                        placeholder="Phone"
                        type="tel"
                        className="text-sm bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-gray-400"
                      />
                    </div>
                    <input
                      value={newClient.address}
                      onChange={(e) => setNewClient((p) => ({ ...p, address: e.target.value }))}
                      placeholder="Address"
                      className="w-full text-sm bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-gray-400"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        value={newClient.city}
                        onChange={(e) => setNewClient((p) => ({ ...p, city: e.target.value }))}
                        placeholder="City"
                        className="text-sm bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-gray-400"
                      />
                      <input
                        value={newClient.state}
                        onChange={(e) => setNewClient((p) => ({ ...p, state: e.target.value }))}
                        placeholder="State"
                        className="text-sm bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-gray-400"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Section 4 — Items */}
          <div className="px-6 sm:px-8 py-6 border-b border-gray-100">

            {/* Desktop table header */}
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

                    {/* CGST/SGST hint — desktop only */}
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

          {/* Section 5 — Totals */}
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

          {/* Section 6 — Notes */}
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

        {/* Submit */}
        <Button
          onClick={handleSubmit}
          size="lg"
          className="w-full mt-4 gap-2 h-12 text-base"
          disabled={loading || generatingPdf}
        >
          {loading || generatingPdf ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <Download className="w-5 h-5" />
              Save & Download PDF
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
