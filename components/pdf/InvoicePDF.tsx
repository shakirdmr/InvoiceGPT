import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { numberToWords } from "@/lib/gst";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 10,
    padding: 36,
    backgroundColor: "#fff",
    color: "#111",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
    paddingBottom: 16,
    borderBottom: "2px solid #111",
  },
  businessBlock: {
    flex: 1,
  },
  logo: {
    width: 60,
    height: 60,
    objectFit: "contain",
    marginLeft: 12,
  },
  businessName: {
    fontSize: 16,
    fontFamily: "Helvetica-Bold",
    marginBottom: 3,
  },
  invoiceTitle: {
    textAlign: "center",
    fontSize: 14,
    fontFamily: "Helvetica-Bold",
    letterSpacing: 2,
    marginBottom: 16,
    color: "#111",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
    gap: 16,
  },
  infoBox: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 10,
    borderRadius: 6,
  },
  infoLabel: {
    fontSize: 8,
    color: "#888",
    fontFamily: "Helvetica-Bold",
    marginBottom: 4,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  infoText: {
    fontSize: 10,
    color: "#111",
    marginBottom: 2,
  },
  infoTextBold: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: "#111",
    marginBottom: 2,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#111",
    color: "#fff",
    padding: "6 8",
    borderRadius: "4 4 0 0",
  },
  tableRow: {
    flexDirection: "row",
    padding: "6 8",
    borderBottom: "1px solid #eee",
  },
  tableRowAlt: {
    flexDirection: "row",
    padding: "6 8",
    borderBottom: "1px solid #eee",
    backgroundColor: "#fafafa",
  },
  colSr: { width: "5%", textAlign: "center" },
  colDesc: { width: "35%" },
  colQty: { width: "8%", textAlign: "right" },
  colRate: { width: "12%", textAlign: "right" },
  colGst: { width: "8%", textAlign: "center" },
  colCgst: { width: "12%", textAlign: "right" },
  colSgst: { width: "12%", textAlign: "right" },
  colAmount: { width: "13%", textAlign: "right" },
  colHeaderText: {
    fontSize: 8,
    color: "#fff",
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    letterSpacing: 0.3,
  },
  totalsSection: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 12,
  },
  totalsBox: {
    width: "44%",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 3,
    paddingHorizontal: 8,
  },
  totalLabel: {
    fontSize: 9,
    color: "#555",
  },
  totalValue: {
    fontSize: 9,
    color: "#111",
  },
  grandTotalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: "8 8",
    backgroundColor: "#111",
    borderRadius: 4,
    marginTop: 4,
  },
  grandTotalLabel: {
    fontSize: 11,
    color: "#fff",
    fontFamily: "Helvetica-Bold",
  },
  grandTotalValue: {
    fontSize: 11,
    color: "#fff",
    fontFamily: "Helvetica-Bold",
  },
  amountWords: {
    marginTop: 10,
    backgroundColor: "#f0f0f0",
    padding: "6 10",
    borderRadius: 4,
  },
  amountWordsText: {
    fontSize: 9,
    color: "#444",
    fontStyle: "italic",
  },
  notesSection: {
    marginTop: 16,
    paddingTop: 12,
    borderTop: "1px solid #eee",
  },
  notesLabel: {
    fontSize: 8,
    color: "#888",
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  notesText: {
    fontSize: 9,
    color: "#444",
    lineHeight: 1.5,
  },
  footer: {
    position: "absolute",
    bottom: 24,
    left: 36,
    right: 36,
    textAlign: "center",
    fontSize: 8,
    color: "#bbb",
    borderTop: "1px solid #eee",
    paddingTop: 8,
  },
  smallText: {
    fontSize: 9,
    color: "#555",
    marginBottom: 2,
  },
  gstinText: {
    fontSize: 9,
    color: "#444",
    fontFamily: "Helvetica-Bold",
  },
});

interface InvoiceItem {
  description: string;
  quantity: number;
  rate: number;
  gstRate: number;
  amount: number;
  cgst: number;
  sgst: number;
}

export type InvoicePDFData = InvoiceData;

interface InvoiceData {
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

interface Business {
  name: string;
  gstin?: string | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  phone?: string | null;
  email?: string | null;
  logoUrl?: string | null;
}

interface InvoicePDFProps {
  invoice: InvoiceData;
  businessName: string;
  business?: Business;
}

function fmt(n: number) {
  return new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n);
}

export function InvoicePDF({ invoice, businessName, business }: InvoicePDFProps) {
  const displayBusiness = business || { name: businessName };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.businessBlock}>
            <Text style={styles.businessName}>{displayBusiness.name}</Text>
            {displayBusiness.gstin && (
              <Text style={styles.gstinText}>
                GSTIN: {displayBusiness.gstin}
              </Text>
            )}
            {displayBusiness.address && (
              <Text style={styles.smallText}>{displayBusiness.address}</Text>
            )}
            {(displayBusiness.city || displayBusiness.state) && (
              <Text style={styles.smallText}>
                {[displayBusiness.city, displayBusiness.state]
                  .filter(Boolean)
                  .join(", ")}
              </Text>
            )}
            {displayBusiness.phone && (
              <Text style={styles.smallText}>Ph: {displayBusiness.phone}</Text>
            )}
            {displayBusiness.email && (
              <Text style={styles.smallText}>Email: {displayBusiness.email}</Text>
            )}
          </View>
          {displayBusiness.logoUrl && (
            <Image src={displayBusiness.logoUrl} style={styles.logo} />
          )}
        </View>

        {/* Title */}
        <Text style={styles.invoiceTitle}>TAX INVOICE</Text>

        {/* Invoice info + Bill To */}
        <View style={styles.infoRow}>
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>Invoice Details</Text>
            <Text style={styles.infoTextBold}>{invoice.invoiceNumber}</Text>
            <Text style={styles.infoText}>
              Date:{" "}
              {new Date(invoice.date).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </Text>
            {invoice.dueDate && (
              <Text style={styles.infoText}>
                Due:{" "}
                {new Date(invoice.dueDate).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </Text>
            )}
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>Bill To</Text>
            {invoice.client ? (
              <>
                <Text style={styles.infoTextBold}>{invoice.client.name}</Text>
                {invoice.client.gstin && (
                  <Text style={styles.infoText}>
                    GSTIN: {invoice.client.gstin}
                  </Text>
                )}
                {invoice.client.address && (
                  <Text style={styles.infoText}>{invoice.client.address}</Text>
                )}
                {(invoice.client.city || invoice.client.state) && (
                  <Text style={styles.infoText}>
                    {[invoice.client.city, invoice.client.state]
                      .filter(Boolean)
                      .join(", ")}
                  </Text>
                )}
                {invoice.client.phone && (
                  <Text style={styles.infoText}>
                    Ph: {invoice.client.phone}
                  </Text>
                )}
              </>
            ) : (
              <Text style={styles.infoText}>Walk-in Customer</Text>
            )}
          </View>
        </View>

        {/* Items table */}
        <View>
          <View style={styles.tableHeader}>
            <Text style={[styles.colSr, styles.colHeaderText]}>#</Text>
            <Text style={[styles.colDesc, styles.colHeaderText]}>
              Description
            </Text>
            <Text style={[styles.colQty, styles.colHeaderText]}>Qty</Text>
            <Text style={[styles.colRate, styles.colHeaderText]}>Rate</Text>
            <Text style={[styles.colGst, styles.colHeaderText]}>GST%</Text>
            <Text style={[styles.colCgst, styles.colHeaderText]}>CGST</Text>
            <Text style={[styles.colSgst, styles.colHeaderText]}>SGST</Text>
            <Text style={[styles.colAmount, styles.colHeaderText]}>Amount</Text>
          </View>

          {invoice.items.map((item, i) => (
            <View key={i} style={i % 2 === 0 ? styles.tableRow : styles.tableRowAlt}>
              <Text style={styles.colSr}>{i + 1}</Text>
              <Text style={styles.colDesc}>{item.description}</Text>
              <Text style={styles.colQty}>{item.quantity}</Text>
              <Text style={styles.colRate}>{fmt(item.rate)}</Text>
              <Text style={styles.colGst}>{item.gstRate}%</Text>
              <Text style={styles.colCgst}>{fmt(item.cgst)}</Text>
              <Text style={styles.colSgst}>{fmt(item.sgst)}</Text>
              <Text style={styles.colAmount}>{fmt(item.amount + item.cgst + item.sgst)}</Text>
            </View>
          ))}
        </View>

        {/* Totals */}
        <View style={styles.totalsSection}>
          <View style={styles.totalsBox}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Subtotal</Text>
              <Text style={styles.totalValue}>₹{fmt(invoice.subtotal)}</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>CGST</Text>
              <Text style={styles.totalValue}>₹{fmt(invoice.cgstTotal)}</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>SGST</Text>
              <Text style={styles.totalValue}>₹{fmt(invoice.sgstTotal)}</Text>
            </View>
            <View style={styles.grandTotalRow}>
              <Text style={styles.grandTotalLabel}>GRAND TOTAL</Text>
              <Text style={styles.grandTotalValue}>₹{fmt(invoice.total)}</Text>
            </View>
          </View>
        </View>

        {/* Amount in words */}
        <View style={styles.amountWords}>
          <Text style={styles.amountWordsText}>
            Amount (in words): {numberToWords(invoice.total)}
          </Text>
        </View>

        {/* Notes */}
        {invoice.notes && (
          <View style={styles.notesSection}>
            <Text style={styles.notesLabel}>Notes / Terms</Text>
            <Text style={styles.notesText}>{invoice.notes}</Text>
          </View>
        )}

        {/* Footer */}
        <View style={styles.footer}>
          <Text>
            Generated by InvoiceGPT · invoicegpt.org · This is a computer generated invoice
          </Text>
        </View>
      </Page>
    </Document>
  );
}
