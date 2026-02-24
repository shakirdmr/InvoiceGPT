import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { numberToWords } from "@/lib/gst";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface InvoiceItem {
  description: string;
  quantity: number;
  rate: number;
  gstRate: number;
  amount: number;
  cgst: number;
  sgst: number;
}

export interface InvoiceData {
  invoiceNumber: string;
  date: string;
  dueDate?: string | null;
  notes?: string | null;
  subtotal: number;
  cgstTotal: number;
  sgstTotal: number;
  total: number;
  items: InvoiceItem[];
  client?: {
    name?: string | null;
    gstin?: string | null;
    phone?: string | null;
    address?: string | null;
    city?: string | null;
    state?: string | null;
  } | null;
}

export interface BusinessData {
  name: string;
  gstin?: string | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  phone?: string | null;
  email?: string | null;
  logoUrl?: string | null;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function fmt(n: number): string {
  return new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n);
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

// ---------------------------------------------------------------------------
// PDF Generator
// ---------------------------------------------------------------------------

export async function generateInvoicePDF(
  invoice: InvoiceData,
  business: BusinessData,
): Promise<Buffer> {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  // ── Logo (top-right) ─────────────────────────────────────────────────────
  if (business.logoUrl) {
    try {
      const resp = await fetch(business.logoUrl);
      if (resp.ok) {
        const arrayBuf = await resp.arrayBuffer();
        const base64 = Buffer.from(arrayBuf).toString("base64");
        const mime = resp.headers.get("content-type") ?? "image/webp";
        const logoSize = 20; // mm
        doc.addImage(
          `data:${mime};base64,${base64}`,
          mime.includes("png") ? "PNG" : "JPEG",
          pageWidth - margin - logoSize,
          y,
          logoSize,
          logoSize,
        );
      }
    } catch {
      // logo fetch failed — continue without it
    }
  }

  // ── Header ───────────────────────────────────────────────────────────────
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(17, 17, 17);
  doc.text(business.name, margin, y + 6);
  y += 10;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(68, 68, 68);

  if (business.gstin) {
    doc.setFont("helvetica", "bold");
    doc.text(`GSTIN: ${business.gstin}`, margin, y + 4);
    doc.setFont("helvetica", "normal");
    y += 5;
  }
  if (business.address) {
    doc.text(business.address, margin, y + 4);
    y += 4;
  }
  const cityState = [business.city, business.state].filter(Boolean).join(", ");
  if (cityState) {
    doc.text(cityState, margin, y + 4);
    y += 4;
  }
  if (business.phone) {
    doc.text(`Ph: ${business.phone}`, margin, y + 4);
    y += 4;
  }
  if (business.email) {
    doc.text(`Email: ${business.email}`, margin, y + 4);
    y += 4;
  }

  y += 4;

  // Header separator
  doc.setDrawColor(17, 17, 17);
  doc.setLineWidth(0.6);
  doc.line(margin, y, pageWidth - margin, y);
  y += 6;

  // ── TAX INVOICE title ───────────────────────────────────────────────────
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(17, 17, 17);
  doc.text("TAX INVOICE", pageWidth / 2, y + 4, { align: "center" });
  y += 12;

  // ── Info boxes (Invoice Details | Bill To) ──────────────────────────────
  const boxHeight = 30;
  const boxWidth = (contentWidth - 4) / 2;
  const leftBoxX = margin;
  const rightBoxX = margin + boxWidth + 4;

  // Left box — Invoice Details
  doc.setFillColor(249, 249, 249);
  doc.roundedRect(leftBoxX, y, boxWidth, boxHeight, 2, 2, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(7);
  doc.setTextColor(136, 136, 136);
  doc.text("INVOICE DETAILS", leftBoxX + 4, y + 5);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(17, 17, 17);
  doc.text(invoice.invoiceNumber ?? "", leftBoxX + 4, y + 11);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text(`Date: ${formatDate(invoice.date)}`, leftBoxX + 4, y + 17);

  if (invoice.dueDate) {
    doc.text(`Due: ${formatDate(invoice.dueDate)}`, leftBoxX + 4, y + 22);
  }

  // Right box — Bill To
  doc.setFillColor(249, 249, 249);
  doc.roundedRect(rightBoxX, y, boxWidth, boxHeight, 2, 2, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(7);
  doc.setTextColor(136, 136, 136);
  doc.text("BILL TO", rightBoxX + 4, y + 5);

  if (invoice.client) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(17, 17, 17);
    doc.text(invoice.client.name ?? "", rightBoxX + 4, y + 11);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    let clientY = y + 17;

    if (invoice.client.gstin) {
      doc.text(`GSTIN: ${invoice.client.gstin}`, rightBoxX + 4, clientY);
      clientY += 4;
    }
    const clientCityState = [invoice.client.city, invoice.client.state]
      .filter(Boolean)
      .join(", ");
    if (invoice.client.address) {
      doc.text(invoice.client.address, rightBoxX + 4, clientY);
      clientY += 4;
    }
    if (clientCityState) {
      doc.text(clientCityState, rightBoxX + 4, clientY);
    }
  } else {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(17, 17, 17);
    doc.text("Walk-in Customer", rightBoxX + 4, y + 11);
  }

  y += boxHeight + 6;

  // ── Items table ─────────────────────────────────────────────────────────
  const tableHead = [["#", "Description", "Qty", "Rate", "GST%", "CGST", "SGST", "Amount"]];
  const tableBody = invoice.items.map((item, i) => [
    String(i + 1),
    item.description ?? "",
    String(item.quantity),
    fmt(item.rate),
    `${item.gstRate}%`,
    fmt(item.cgst),
    fmt(item.sgst),
    fmt(item.amount + item.cgst + item.sgst),
  ]);

  autoTable(doc, {
    startY: y,
    margin: { left: margin, right: margin },
    head: tableHead,
    body: tableBody,
    headStyles: {
      fillColor: [17, 17, 17],
      textColor: [255, 255, 255],
      fontSize: 7,
      fontStyle: "bold",
      halign: "left",
    },
    bodyStyles: {
      fontSize: 8,
      textColor: [17, 17, 17],
    },
    alternateRowStyles: {
      fillColor: [250, 250, 250],
    },
    columnStyles: {
      0: { cellWidth: 8, halign: "center" },
      1: { cellWidth: "auto" },
      2: { cellWidth: 14, halign: "right" },
      3: { cellWidth: 22, halign: "right" },
      4: { cellWidth: 14, halign: "center" },
      5: { cellWidth: 22, halign: "right" },
      6: { cellWidth: 22, halign: "right" },
      7: { cellWidth: 24, halign: "right" },
    },
    theme: "grid",
    styles: {
      lineColor: [238, 238, 238],
      lineWidth: 0.2,
      cellPadding: 2,
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  y = (doc as any).lastAutoTable.finalY + 6;

  // ── Totals ──────────────────────────────────────────────────────────────
  const totalsX = pageWidth - margin - 80;
  const totalsW = 80;

  const drawTotalRow = (label: string, value: string, bold = false) => {
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(9);
    doc.setTextColor(bold ? 255 : 85, bold ? 255 : 85, bold ? 255 : 85);

    if (bold) {
      doc.setFillColor(17, 17, 17);
      doc.roundedRect(totalsX, y - 1, totalsW, 8, 1, 1, "F");
      doc.setTextColor(255, 255, 255);
    }

    doc.text(label, totalsX + 3, y + 4);
    doc.text(value, totalsX + totalsW - 3, y + 4, { align: "right" });
    y += bold ? 10 : 6;
  };

  drawTotalRow("Subtotal", `₹${fmt(invoice.subtotal)}`);
  drawTotalRow("CGST", `₹${fmt(invoice.cgstTotal)}`);
  drawTotalRow("SGST", `₹${fmt(invoice.sgstTotal)}`);
  drawTotalRow("GRAND TOTAL", `₹${fmt(invoice.total)}`, true);

  y += 2;

  // ── Amount in words ─────────────────────────────────────────────────────
  doc.setFillColor(240, 240, 240);
  doc.roundedRect(margin, y, contentWidth, 8, 1, 1, "F");
  doc.setFont("helvetica", "italic");
  doc.setFontSize(8);
  doc.setTextColor(68, 68, 68);
  doc.text(
    `Amount (in words): ${numberToWords(invoice.total)}`,
    margin + 4,
    y + 5,
  );
  y += 14;

  // ── Notes ───────────────────────────────────────────────────────────────
  if (invoice.notes) {
    doc.setDrawColor(238, 238, 238);
    doc.setLineWidth(0.2);
    doc.line(margin, y, pageWidth - margin, y);
    y += 4;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(7);
    doc.setTextColor(136, 136, 136);
    doc.text("NOTES / TERMS", margin, y + 3);
    y += 6;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(68, 68, 68);
    const noteLines = doc.splitTextToSize(invoice.notes, contentWidth);
    doc.text(noteLines, margin, y + 3);
  }

  // ── Footer ──────────────────────────────────────────────────────────────
  const pageHeight = doc.internal.pageSize.getHeight();
  const footerY = pageHeight - 10;
  doc.setDrawColor(238, 238, 238);
  doc.setLineWidth(0.2);
  doc.line(margin, footerY - 3, pageWidth - margin, footerY - 3);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.setTextColor(187, 187, 187);
  doc.text(
    "Generated by InvoiceGPT · invoicegpt.org · This is a computer generated invoice",
    pageWidth / 2,
    footerY,
    { align: "center" },
  );

  // Return as Buffer
  const outBuf = doc.output("arraybuffer");
  return Buffer.from(outBuf);
}
