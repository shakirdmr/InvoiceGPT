export const GST_RATES = [0, 5, 12, 18, 28] as const;
export type GstRate = (typeof GST_RATES)[number];

export interface LineItemCalc {
  amount: number;
  cgst: number;
  sgst: number;
  total: number;
}

export function calcLineItem(
  qty: number,
  rate: number,
  gstRate: number
): LineItemCalc {
  const amount = qty * rate;
  const cgst = (amount * (gstRate / 2)) / 100;
  const sgst = (amount * (gstRate / 2)) / 100;
  const total = amount + cgst + sgst;
  return { amount, cgst, sgst, total };
}

export interface InvoiceTotals {
  subtotal: number;
  cgstTotal: number;
  sgstTotal: number;
  grandTotal: number;
}

export function calcInvoiceTotals(
  items: Array<{ amount: number; cgst: number; sgst: number }>
): InvoiceTotals {
  const subtotal = items.reduce((sum, i) => sum + i.amount, 0);
  const cgstTotal = items.reduce((sum, i) => sum + i.cgst, 0);
  const sgstTotal = items.reduce((sum, i) => sum + i.sgst, 0);
  const grandTotal = subtotal + cgstTotal + sgstTotal;
  return { subtotal, cgstTotal, sgstTotal, grandTotal };
}

export function numberToWords(num: number): string {
  const a = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ];
  const b = [
    "",
    "",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];

  function inWords(n: number): string {
    if (n < 20) return a[n];
    if (n < 100) return b[Math.floor(n / 10)] + (n % 10 ? " " + a[n % 10] : "");
    if (n < 1000)
      return (
        a[Math.floor(n / 100)] +
        " Hundred" +
        (n % 100 ? " " + inWords(n % 100) : "")
      );
    if (n < 100000)
      return (
        inWords(Math.floor(n / 1000)) +
        " Thousand" +
        (n % 1000 ? " " + inWords(n % 1000) : "")
      );
    if (n < 10000000)
      return (
        inWords(Math.floor(n / 100000)) +
        " Lakh" +
        (n % 100000 ? " " + inWords(n % 100000) : "")
      );
    return (
      inWords(Math.floor(n / 10000000)) +
      " Crore" +
      (n % 10000000 ? " " + inWords(n % 10000000) : "")
    );
  }

  const rupees = Math.floor(num);
  const paise = Math.round((num - rupees) * 100);

  let result = "Rupees " + inWords(rupees);
  if (paise > 0) result += " and " + inWords(paise) + " Paise";
  result += " Only";
  return result;
}
