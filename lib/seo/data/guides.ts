export interface Guide {
  slug: string;
  title: string;
  description: string;
  category: GuideCategory;
  readingTimeMinutes: number;
  datePublished: string;
  dateModified: string;
  keywords: string[];
  sections: GuideSection[];
  faqs: { q: string; a: string }[];
  relatedSlugs: string[];
}

export interface GuideSection {
  heading: string;
  content: string;
}

export type GuideCategory =
  | "how-to"
  | "gst-guide"
  | "business-tips"
  | "invoicing-basics";

export const GUIDE_CATEGORIES: Record<GuideCategory, string> = {
  "how-to": "How-To Guides",
  "gst-guide": "GST Guides",
  "business-tips": "Business Tips",
  "invoicing-basics": "Invoicing Basics",
};

export const guides: Guide[] = [
  {
    slug: "how-to-create-gst-invoice",
    title: "How to Create a GST Invoice in India (Step-by-Step Guide 2025)",
    description:
      "Complete step-by-step guide to creating a GST-compliant invoice in India. Learn what fields are mandatory, how to calculate CGST & SGST, and how to create your first invoice in 60 seconds.",
    category: "how-to",
    readingTimeMinutes: 7,
    datePublished: "2024-01-15",
    dateModified: "2025-01-10",
    keywords: [
      "how to create gst invoice",
      "gst invoice format india",
      "create gst bill online",
      "gst invoice maker free",
    ],
    sections: [
      {
        heading: "What is a GST Invoice?",
        content:
          "A GST invoice is a legal document issued by a GST-registered supplier to a buyer. It details the goods or services provided, the applicable GST rate, and the total amount payable including taxes. Under India's Goods and Services Tax (GST) Act, every registered business must issue a compliant tax invoice for every sale.",
      },
      {
        heading: "Mandatory Fields on a GST Invoice",
        content:
          "A valid GST tax invoice must include: (1) Name, address, and GSTIN of the supplier, (2) A unique invoice number, (3) Date of issue, (4) Name, address, and GSTIN of the recipient (for B2B), (5) Description of goods/services, (6) HSN/SAC code, (7) Quantity and unit of measure, (8) Taxable value, (9) GST rate (CGST + SGST for intra-state, or IGST for inter-state), (10) Total invoice amount in words.",
      },
      {
        heading: "How to Calculate CGST and SGST",
        content:
          "For intra-state transactions (buyer and seller in same state), GST is split equally between Central GST (CGST) and State GST (SGST). For example, an item with 18% GST: CGST = 9% and SGST = 9%. Multiply the taxable value by each rate to get the tax amounts. InvoiceGPT calculates this automatically for every line item.",
      },
      {
        heading: "Step-by-Step: Create Your First GST Invoice",
        content:
          "Step 1: Sign in to InvoiceGPT with your Google account. Step 2: Go to Settings and enter your business name, GSTIN, and address. Step 3: Click 'New Invoice'. Step 4: Add a client name (and their GSTIN for B2B). Step 5: Add line items — each with a description, quantity, rate, and GST percentage. Step 6: InvoiceGPT auto-calculates CGST, SGST, and the total. Step 7: Click Download PDF to get your ready-to-share GST invoice.",
      },
      {
        heading: "Common GST Invoice Mistakes to Avoid",
        content:
          "The most common mistakes include: using wrong GST rates for items, forgetting to mention HSN codes (mandatory for businesses over ₹5 crore turnover), not mentioning the place of supply for interstate transactions, using the same invoice number twice, and not mentioning GSTIN for B2B transactions above ₹50,000.",
      },
    ],
    faqs: [
      {
        q: "Is a GST invoice mandatory for all businesses?",
        a: "All GST-registered businesses must issue a tax invoice for every taxable supply. Unregistered businesses issue a 'bill of supply' instead.",
      },
      {
        q: "What is the difference between a tax invoice and a bill of supply?",
        a: "A tax invoice is issued by GST-registered businesses and shows the GST charged. A bill of supply is issued by unregistered businesses or for exempt supplies — it does not show GST charges.",
      },
      {
        q: "How many copies of a GST invoice should I keep?",
        a: "For goods, issue three copies: original for buyer, duplicate for transporter, triplicate for your records. For services, two copies suffice: original for buyer and duplicate for your records.",
      },
      {
        q: "Can I create a GST invoice without accounting software?",
        a: "Yes. InvoiceGPT is a simple web app specifically designed for creating GST invoices without any accounting knowledge. You can create your first invoice in under 2 minutes.",
      },
    ],
    relatedSlugs: [
      "gst-rates-in-india",
      "difference-between-cgst-sgst-igst",
      "how-to-download-gst-invoice-pdf",
    ],
  },
  {
    slug: "gst-rates-in-india",
    title: "GST Rates in India 2025 — Complete Rate List for All Products",
    description:
      "Complete GST rate guide for India in 2025. Find the correct GST rate for any product or service — from 0% to 28% — with the official rate list and HSN code guide.",
    category: "gst-guide",
    readingTimeMinutes: 10,
    datePublished: "2024-02-01",
    dateModified: "2025-01-10",
    keywords: [
      "gst rates india 2025",
      "gst rate list",
      "hsn code gst rate",
      "gst tax rates products",
    ],
    sections: [
      {
        heading: "GST Rate Slabs in India",
        content:
          "India's GST has five main rate slabs: 0% (essential goods), 5% (basic necessities like food, medicine), 12% (standard rate for many goods), 18% (most goods and services), and 28% (luxury goods and services). Additionally, some goods attract cess on top of GST rates.",
      },
      {
        heading: "0% GST Rate Items",
        content:
          "Common 0% GST items include: unbranded/unpackaged food grains (rice, wheat, pulses), fresh vegetables and fruits, milk and curd, eggs, salt, newspapers, books and printed material, healthcare services by registered practitioners, and education services by recognized institutions.",
      },
      {
        heading: "5% GST Rate Items",
        content:
          "5% GST applies to: packed food items (branded rice, pulses), medicines and drugs (most), transport services (rail and road), household items (sugar, edible oil, tea, coffee), footwear under ₹1,000, garments under ₹1,000, restaurant food (non-AC), and some agricultural products.",
      },
      {
        heading: "12% GST Rate Items",
        content:
          "12% GST includes: packaged food, mobiles and smartphones, butter, ghee, cheese, notebooks and stationery, umbrella, sewing machine, watches (under ₹10,000), ayurvedic medicines, and most processed food items.",
      },
      {
        heading: "18% GST Rate Items",
        content:
          "18% GST (the most common rate) includes: electronics (TV, AC, washing machine), computers and laptops, most services (banking, insurance, telecom, IT), AC restaurant food, hotels (₹2,500-₹7,500/night), most manufactured goods, paints, cement, pipes, toothpaste, soap, and shampoo.",
      },
      {
        heading: "28% GST Rate Items",
        content:
          "28% GST applies to luxury and sin goods: cars, motorcycles, tobacco products, aerated drinks, pan masala, caffeinated beverages, AC hotels above ₹7,500/night, 5-star restaurants, and premium electronics/appliances.",
      },
    ],
    faqs: [
      {
        q: "How do I find the correct GST rate for my product?",
        a: "Look up the HSN (Harmonised System of Nomenclature) code for your product on the CBIC website. The GST rate corresponds to the HSN code category. InvoiceGPT lets you manually set the correct rate per item.",
      },
      {
        q: "What is HSN code and is it mandatory?",
        a: "HSN is a global product classification code. For businesses with turnover above ₹5 crore, 6-digit HSN codes are mandatory. For ₹1.5-5 crore turnover, 4-digit codes. Below ₹1.5 crore, HSN codes are optional.",
      },
      {
        q: "Can GST rates change?",
        a: "Yes. The GST Council meets periodically and can revise rates. Always verify current rates for your specific products at the CBIC website or with a qualified CA.",
      },
    ],
    relatedSlugs: [
      "how-to-create-gst-invoice",
      "difference-between-cgst-sgst-igst",
      "what-is-gstin",
    ],
  },
  {
    slug: "difference-between-cgst-sgst-igst",
    title: "CGST vs SGST vs IGST — Key Differences Explained Simply",
    description:
      "Simple explanation of the difference between CGST, SGST, and IGST in India. Learn when to charge which tax, how the money flows to government, and how to apply them on invoices.",
    category: "gst-guide",
    readingTimeMinutes: 5,
    datePublished: "2024-02-15",
    dateModified: "2025-01-10",
    keywords: [
      "difference between cgst sgst igst",
      "cgst sgst igst meaning",
      "when to charge igst",
      "intrastate interstate gst",
    ],
    sections: [
      {
        heading: "The Three Components of GST",
        content:
          "India's GST system has three components: CGST (Central GST), SGST (State GST), and IGST (Integrated GST). Which you charge depends entirely on whether the buyer and seller are in the same state (intra-state) or different states (inter-state).",
      },
      {
        heading: "CGST and SGST — For Intra-State Transactions",
        content:
          "When you sell to a buyer within the same state, GST is split 50/50 between the Central and State governments. For example, on 18% GST goods: CGST = 9% goes to the Centre, SGST = 9% goes to the State. This is what most small shopkeepers charge for local sales.",
      },
      {
        heading: "IGST — For Inter-State Transactions",
        content:
          "When you sell to a buyer in a different state, you charge IGST (Integrated GST) at the full combined rate. For 18% GST goods, you charge 18% IGST (no split). The IGST then gets distributed between the Centre and the destination state.",
      },
      {
        heading: "How to Determine Which Tax to Apply",
        content:
          "Check the 'Place of Supply' — typically the location where goods are delivered or services are consumed. If Place of Supply = your state, charge CGST + SGST. If Place of Supply = another state, charge IGST.",
      },
    ],
    faqs: [
      {
        q: "Does InvoiceGPT automatically choose between CGST+SGST and IGST?",
        a: "InvoiceGPT currently handles intra-state (CGST + SGST) billing — ideal for most local shopkeepers and businesses. For interstate IGST transactions, you can note the IGST amount in the invoice description.",
      },
      {
        q: "Can I claim input credit for IGST paid?",
        a: "Yes. IGST paid on purchases can be used to offset IGST, CGST, or SGST liability in sequence as per GST rules.",
      },
      {
        q: "My supplier is in another state — do I pay IGST?",
        a: "Yes. Your supplier charges you IGST for interstate supply. You can claim this as input tax credit against your output IGST, CGST, or SGST.",
      },
    ],
    relatedSlugs: [
      "how-to-create-gst-invoice",
      "gst-rates-in-india",
      "what-is-gstin",
    ],
  },
  {
    slug: "what-is-gstin",
    title: "What is GSTIN? How to Apply for GST Registration in India",
    description:
      "Complete guide to GSTIN — what it is, its 15-digit format, who needs to register, how to apply online, and how to use your GSTIN on invoices.",
    category: "gst-guide",
    readingTimeMinutes: 6,
    datePublished: "2024-03-01",
    dateModified: "2025-01-10",
    keywords: [
      "what is gstin",
      "gst registration india",
      "gstin number format",
      "how to get gst number",
    ],
    sections: [
      {
        heading: "What is GSTIN?",
        content:
          "GSTIN (Goods and Services Tax Identification Number) is a unique 15-character alphanumeric code assigned to every GST-registered business in India. It is like a PAN card but specifically for GST. Every business that is required to register under GST receives a GSTIN.",
      },
      {
        heading: "Understanding the GSTIN Format",
        content:
          "The 15-character GSTIN has a specific structure: Characters 1-2 = State code (e.g., 01 for Jammu & Kashmir, 27 for Maharashtra), Characters 3-12 = PAN of the business owner, Character 13 = Number of registrations in same state (usually 1), Character 14 = Z (default), Character 15 = Checksum digit.",
      },
      {
        heading: "Who Needs to Register for GST?",
        content:
          "GST registration is mandatory for: (1) Businesses with aggregate annual turnover above ₹40 lakhs (goods) or ₹20 lakhs (services), (2) Those supplying goods/services in multiple states, (3) E-commerce sellers (regardless of turnover), (4) Businesses making inter-state supplies, (5) Casual taxable persons.",
      },
      {
        heading: "How to Apply for GST Registration Online",
        content:
          "Apply at gstin.gov.in: (1) Visit GST Portal, (2) Click 'Register Now', (3) Select 'New Registration', (4) Fill Part A with PAN, mobile, and email for OTP, (5) Complete Part B with business details, address, and documents, (6) Upload documents (PAN, Aadhaar, address proof, bank statement), (7) Verify with DSC or Aadhaar OTP, (8) Submit — ARN generated in 15 minutes, GSTIN in 3-7 working days.",
      },
    ],
    faqs: [
      {
        q: "Is GST registration free?",
        a: "Yes. GST registration on the GST portal (gstin.gov.in) is completely free. You don't need to pay any government fee.",
      },
      {
        q: "Can I use InvoiceGPT without a GSTIN?",
        a: "Yes. You can create bills of supply without a GSTIN if you're not yet registered. Once you get your GSTIN, add it in Settings and it appears on all future invoices.",
      },
      {
        q: "How long does it take to get a GSTIN?",
        a: "After submitting your application online, you typically receive your GSTIN within 3-7 working days if all documents are correct.",
      },
    ],
    relatedSlugs: [
      "how-to-create-gst-invoice",
      "gst-rates-in-india",
      "how-to-file-gst-returns",
    ],
  },
  {
    slug: "how-to-download-gst-invoice-pdf",
    title: "How to Download GST Invoice as PDF — Quick Guide",
    description:
      "Learn how to download your GST invoice as a PDF and share it on WhatsApp. Step-by-step guide for InvoiceGPT users and general tips for any GST billing tool.",
    category: "how-to",
    readingTimeMinutes: 3,
    datePublished: "2024-03-15",
    dateModified: "2025-01-10",
    keywords: [
      "download gst invoice pdf",
      "gst invoice pdf download",
      "share invoice whatsapp",
      "invoice pdf india",
    ],
    sections: [
      {
        heading: "Why PDF Format for GST Invoices?",
        content:
          "PDF (Portable Document Format) is the standard format for GST invoices because it preserves the exact layout, is tamper-evident, can be easily shared on WhatsApp, email, or stored on a phone, and can be printed on any printer. Tax authorities accept PDF invoices for scrutiny and audits.",
      },
      {
        heading: "How to Download PDF in InvoiceGPT",
        content:
          "In InvoiceGPT, after creating or viewing an invoice, tap the 'Download PDF' button. Your phone will download the PDF file. Open it in any PDF viewer (Google Files, Adobe Reader) to review. To share on WhatsApp: tap Share, select WhatsApp, and choose the customer's contact.",
      },
      {
        heading: "Sharing GST Invoice PDF on WhatsApp",
        content:
          "Most small business owners in India share invoices on WhatsApp. From InvoiceGPT: tap Download PDF > tap Share > select WhatsApp > choose the customer. The customer receives a professional GST invoice PDF directly on their phone in seconds.",
      },
    ],
    faqs: [
      {
        q: "Is a PDF invoice legally valid in India?",
        a: "Yes. Digital PDF invoices are legally valid under Indian law when they contain all mandatory GST fields. You don't need a physical stamp or wet signature on most tax invoices.",
      },
      {
        q: "Can I print the PDF invoice?",
        a: "Yes. PDF invoices from InvoiceGPT are print-ready at standard A4 size. Connect your phone to any printer or send to a nearby print shop.",
      },
      {
        q: "What if my customer wants the invoice by email?",
        a: "Download the PDF, then attach it to an email from your phone. Most email apps (Gmail, Outlook) allow attaching files from your phone storage.",
      },
    ],
    relatedSlugs: [
      "how-to-create-gst-invoice",
      "gst-invoice-format-india",
    ],
  },
  {
    slug: "gst-invoice-format-india",
    title: "GST Invoice Format in India — Mandatory Fields & Sample Template",
    description:
      "Official GST invoice format as per Indian GST law. Complete list of mandatory and optional fields, with a sample GST invoice template you can use immediately.",
    category: "invoicing-basics",
    readingTimeMinutes: 8,
    datePublished: "2024-04-01",
    dateModified: "2025-01-10",
    keywords: [
      "gst invoice format india",
      "gst tax invoice format",
      "mandatory fields gst invoice",
      "gst invoice template india",
    ],
    sections: [
      {
        heading: "Legal Requirements for GST Invoice Format",
        content:
          "The GST invoice format is governed by Rule 46 of the CGST Rules, 2017. A tax invoice must be generated in triplicate for goods and duplicate for services, though digital copies are now accepted. The invoice can be in any language, but must include the mandatory fields prescribed under the GST Act.",
      },
      {
        heading: "Mandatory Fields on a GST Tax Invoice",
        content:
          "Required fields: (1) Supplier name, address, GSTIN, (2) Unique invoice serial number, (3) Invoice date, (4) Place of supply (state), (5) Customer name and address, (6) Customer GSTIN (for B2B above ₹50,000), (7) HSN/SAC code, (8) Description of goods/services, (9) Quantity and unit, (10) Taxable value, (11) GST rate and amounts (CGST, SGST, or IGST), (12) Whether GST is payable on reverse charge, (13) Total amount in words.",
      },
      {
        heading: "Optional But Recommended Fields",
        content:
          "While not legally mandatory, include: (1) Phone and email of business, (2) Bank account details for payment, (3) Payment terms and due date, (4) Purchase order reference, (5) Delivery address if different from billing, (6) Business logo for professional presentation.",
      },
      {
        heading: "Invoice Numbering Rules",
        content:
          "Invoice numbers must be consecutive and unique within a financial year. You cannot reuse invoice numbers. Most businesses use a format like INV-YYMM-0001. All InvoiceGPT users get auto-generated sequential invoice numbers.",
      },
    ],
    faqs: [
      {
        q: "Can I create a GST invoice in any format?",
        a: "You can use any format as long as all mandatory fields are present. There is no single prescribed design. InvoiceGPT's format meets all GST legal requirements.",
      },
      {
        q: "Is a handwritten GST invoice valid?",
        a: "Technically yes, as long as all mandatory fields are legible. However, digital invoices are preferred for accuracy, professionalism, and easier record-keeping.",
      },
      {
        q: "How long should I keep GST invoice records?",
        a: "GST records, including invoices, must be maintained for 6 years from the due date of the annual return for the relevant year. All InvoiceGPT invoices are stored permanently in your account.",
      },
    ],
    relatedSlugs: [
      "how-to-create-gst-invoice",
      "what-is-gstin",
      "gst-rates-in-india",
    ],
  },
  {
    slug: "how-to-file-gst-returns",
    title: "How to File GST Returns in India — Beginner's Guide",
    description:
      "Simple beginner's guide to filing GST returns in India. Learn about GSTR-1, GSTR-3B, filing deadlines, and how to stay compliant without an accountant.",
    category: "gst-guide",
    readingTimeMinutes: 9,
    datePublished: "2024-05-01",
    dateModified: "2025-01-10",
    keywords: [
      "how to file gst returns",
      "gst return filing india",
      "gstr-1 gstr-3b",
      "gst return due date",
    ],
    sections: [
      {
        heading: "Types of GST Returns",
        content:
          "Main GST returns: GSTR-1 (details of outward supplies, filed monthly or quarterly), GSTR-3B (summary of transactions and tax payment, monthly), GSTR-9 (annual return, once per year). For small businesses under the Quarterly Return Monthly Payment (QRMP) scheme, GSTR-1 is quarterly.",
      },
      {
        heading: "GSTR-1 — Outward Supply Return",
        content:
          "GSTR-1 reports all your sales invoices. For businesses with turnover above ₹5 crore: monthly by the 11th. For businesses under ₹5 crore: quarterly by the 13th of the next month after the quarter. Your invoices from InvoiceGPT form the basis for GSTR-1 data.",
      },
      {
        heading: "GSTR-3B — Summary Return",
        content:
          "GSTR-3B is a monthly self-assessed summary return and tax payment. Due on the 20th (for turnover above ₹5 crore) or 22nd/24th (for lower turnover) of the following month. It summarises total sales, input credit claimed, and net tax payable.",
      },
      {
        heading: "How Your Invoices Help with GST Filing",
        content:
          "Every invoice you create in InvoiceGPT contributes to your GSTR-1 data. Your dashboard shows total taxable value and GST collected, which you reference when filing. Export your invoice data to share with your CA for filing assistance.",
      },
    ],
    faqs: [
      {
        q: "What happens if I miss GST return deadlines?",
        a: "Late filing attracts a penalty of ₹50/day (₹25 CGST + ₹25 SGST) for regular taxpayers, capped at ₹5,000. For nil returns, the late fee is ₹20/day.",
      },
      {
        q: "Do I need a CA to file GST returns?",
        a: "Small businesses can file GST returns themselves on the GST portal (gstin.gov.in). For complex situations (multiple GSTINs, large volumes, ITC claims), a CA is recommended.",
      },
      {
        q: "Can InvoiceGPT directly file my GST returns?",
        a: "InvoiceGPT is a billing and invoice generation tool — it doesn't directly integrate with the GST portal for return filing. However, your invoice records from InvoiceGPT make it easy to compile the data needed for your CA or self-filing.",
      },
    ],
    relatedSlugs: [
      "what-is-gstin",
      "gst-rates-in-india",
      "how-to-create-gst-invoice",
    ],
  },
  {
    slug: "free-gst-invoice-maker-india",
    title: "Free GST Invoice Maker for Small Businesses in India",
    description:
      "Create free GST invoices online without downloading any software. Comparison of free GST invoice makers in India — features, limitations, and which is best for shopkeepers.",
    category: "business-tips",
    readingTimeMinutes: 5,
    datePublished: "2024-06-01",
    dateModified: "2025-01-10",
    keywords: [
      "free gst invoice maker india",
      "free invoice generator india",
      "online gst invoice creator",
      "best free billing software india",
    ],
    sections: [
      {
        heading: "What to Look for in a Free GST Invoice Maker",
        content:
          "Key features to look for: (1) Auto-calculation of CGST and SGST, (2) PDF download, (3) Mobile-friendly interface, (4) Client/customer saving, (5) Invoice history, (6) GSTIN and business logo support, (7) Multiple GST rate support (0-28%), (8) No Excel or accounting knowledge required.",
      },
      {
        heading: "InvoiceGPT Free Trial",
        content:
          "InvoiceGPT offers 6 completely free invoices — no credit card required. Create professional GST invoices with auto-calculated CGST/SGST, download as PDF, and share on WhatsApp. After 6 invoices, upgrade to Pro at ₹399/month for unlimited invoices. No Excel, no accountant needed.",
      },
      {
        heading: "Why Mobile-First Matters for Indian Shopkeepers",
        content:
          "Most Indian shopkeepers primarily use smartphones, not computers. A mobile-optimised GST invoice maker means you can create invoices on your phone instantly — between customers, at your shop counter, or even while at a client's location. InvoiceGPT is built mobile-first and works in any browser.",
      },
    ],
    faqs: [
      {
        q: "Can I really create a GST invoice for free?",
        a: "Yes. InvoiceGPT gives you 6 fully GST-compliant invoices free — no credit card needed. Each invoice includes PDF download and WhatsApp sharing.",
      },
      {
        q: "Are free invoice makers legally compliant?",
        a: "A free tool like InvoiceGPT generates fully GST-compliant invoices that meet all legal requirements — including all mandatory fields and correct CGST/SGST calculations.",
      },
      {
        q: "What's the best free GST billing app for Android?",
        a: "InvoiceGPT works directly in your phone's browser (Chrome, Firefox) — no app download needed. It's optimised for Android and iPhone and creates professional invoices in under 60 seconds.",
      },
    ],
    relatedSlugs: [
      "how-to-create-gst-invoice",
      "gst-invoice-format-india",
      "difference-between-cgst-sgst-igst",
    ],
  },
  {
    slug: "gst-invoice-for-small-business",
    title: "GST Invoicing for Small Business Owners in India — Complete Guide",
    description:
      "Everything small business owners in India need to know about GST invoicing — when to register, what to include on invoices, how to stay compliant, and tools to make it easy.",
    category: "business-tips",
    readingTimeMinutes: 8,
    datePublished: "2024-07-01",
    dateModified: "2025-01-10",
    keywords: [
      "gst invoice small business india",
      "gst billing small business",
      "small business gst compliance india",
      "invoice for shopkeeper india",
    ],
    sections: [
      {
        heading: "Does My Small Business Need GST Registration?",
        content:
          "You must register for GST if your annual aggregate turnover exceeds ₹40 lakhs for goods businesses (₹20 lakhs for service businesses, and ₹10 lakhs in special category states like J&K, Himachal Pradesh, Uttarakhand). Even below these limits, voluntary registration has benefits — your B2B buyers can claim input credit on purchases from you.",
      },
      {
        heading: "GST Compliance Checklist for Small Businesses",
        content:
          "✓ Register on GST portal if above threshold, ✓ Display GSTIN on your shop signage and invoices, ✓ Issue GST-compliant tax invoice for every sale above ₹200, ✓ File GSTR-1 monthly/quarterly, ✓ File GSTR-3B monthly, ✓ Pay GST dues before return deadlines, ✓ Maintain invoice records for 6 years.",
      },
      {
        heading: "Time-Saving Tips for Small Business GST Invoicing",
        content:
          "Save repeat customers once and reuse details. Set your business GSTIN, logo, and address once in your billing app — it appears on every invoice automatically. Use a mobile billing app so you can create invoices anywhere, even at a customer's location. Batch-create invoices at the end of each day if you don't need to issue them in real-time.",
      },
    ],
    faqs: [
      {
        q: "What if my small business turnover is under the GST threshold?",
        a: "You don't need to register or collect GST. You can still issue bills of supply without GST. However, your B2B customers cannot claim input credit on purchases from you.",
      },
      {
        q: "How much does GST compliance cost for a small business?",
        a: "GST registration is free. Filing returns yourself costs nothing. A CA for monthly filing typically charges ₹500-2,000/month. Using InvoiceGPT for invoicing costs ₹399/month for unlimited invoices — less than one visit to an accountant.",
      },
      {
        q: "What records do I need to keep for GST compliance?",
        a: "Keep copies of all sales invoices, purchase invoices, debit/credit notes, GST payment challans, and annual return filings for 6 years.",
      },
    ],
    relatedSlugs: [
      "how-to-create-gst-invoice",
      "what-is-gstin",
      "gst-rates-in-india",
    ],
  },
];

/** Fast lookup by slug */
export const guideMap = new Map<string, Guide>(
  guides.map((g) => [g.slug, g]),
);

/** All unique guide slugs */
export const guideSlugs = guides.map((g) => g.slug);

/** Group guides by category */
export const guidesByCategory = guides.reduce<
  Record<GuideCategory, Guide[]>
>((acc, guide) => {
  const cat = guide.category;
  if (!acc[cat]) acc[cat] = [];
  acc[cat].push(guide);
  return acc;
}, {} as Record<GuideCategory, Guide[]>);
