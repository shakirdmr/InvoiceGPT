export interface Industry {
  /** URL slug, e.g. "medical-store" */
  slug: string;
  /** Display name, e.g. "Medical Store" */
  name: string;
  /** Short plural, e.g. "medical stores" */
  plural: string;
  /** Business owner term, e.g. "pharmacist" */
  ownerTerm: string;
  /** Primary GST rates used (for content relevance) */
  gstRates: number[];
  /** Hub category this industry belongs to */
  category: IndustryCategory;
  /** Industry-specific hero description (1 sentence) */
  description: string;
  /** 3 industry-specific pain points */
  painPoints: string[];
  /** 3 industry-specific benefits */
  benefits: string[];
  /** Industry-specific FAQs (3 min) */
  faqs: { q: string; a: string }[];
}

export type IndustryCategory =
  | "retail"
  | "food"
  | "health"
  | "services"
  | "manufacturing"
  | "wholesale"
  | "education"
  | "construction";

export const INDUSTRY_CATEGORIES: Record<IndustryCategory, string> = {
  retail: "Retail & Shops",
  food: "Food & Restaurants",
  health: "Health & Pharmacy",
  services: "Professional Services",
  manufacturing: "Manufacturing & Production",
  wholesale: "Wholesale & Distribution",
  education: "Education & Training",
  construction: "Construction & Real Estate",
};

export const industries: Industry[] = [
  // ── RETAIL ───────────────────────────────────────────────────────────────
  {
    slug: "general-store",
    name: "General Store",
    plural: "general stores",
    ownerTerm: "shopkeeper",
    gstRates: [0, 5, 12, 18],
    category: "retail",
    description:
      "Create GST invoices for your general store in under 60 seconds — auto-calculate CGST & SGST for all product categories.",
    painPoints: [
      "Managing multiple GST rates (0%, 5%, 12%, 18%) for different product types",
      "Spending 20+ minutes manually writing invoices by hand every day",
      "Losing customers who need proper GST bills for their business expenses",
    ],
    benefits: [
      "Auto-select correct GST rate for groceries, FMCG, and packaged goods",
      "Save client details once — reuse for repeat customers instantly",
      "Professional PDF invoices shared on WhatsApp in one tap",
    ],
    faqs: [
      {
        q: "Can I create invoices for different GST rates in the same bill?",
        a: "Yes. InvoiceGPT lets you add multiple line items, each with a different GST rate (0%, 5%, 12%, 18%, 28%). CGST and SGST are calculated automatically for each item.",
      },
      {
        q: "Do I need to know my GSTIN to use InvoiceGPT?",
        a: "You can start without a GSTIN on a trial. For GST-compliant invoices, you'll enter your GSTIN once in Settings — it appears automatically on every invoice.",
      },
      {
        q: "Can my customers pay me by UPI and get a proper bill?",
        a: "Yes. You create the invoice in InvoiceGPT, download the PDF, and share it on WhatsApp after payment — completely compliant with GST rules.",
      },
    ],
  },
  {
    slug: "kirana-store",
    name: "Kirana Store",
    plural: "kirana stores",
    ownerTerm: "kirana owner",
    gstRates: [0, 5],
    category: "retail",
    description:
      "Create GST-compliant kirana store invoices in 60 seconds from your mobile phone — no PC or accountant required.",
    painPoints: [
      "Most grocery items have different GST rates that are hard to remember",
      "Customers want proper GST bills but writing them by hand takes too long",
      "Complex billing software built for big businesses, not neighbourhood stores",
    ],
    benefits: [
      "Pre-set GST rates for common grocery and kirana items",
      "Works perfectly on any Android or iPhone — no app download needed",
      "Print-quality PDF invoices that look professional to any customer",
    ],
    faqs: [
      {
        q: "Are grocery and food items taxable under GST?",
        a: "Most unpackaged staples (rice, flour, lentils) are 0% GST. Packaged branded foods are typically 5% or 12%. InvoiceGPT lets you set the right rate per item.",
      },
      {
        q: "Is this app suitable for a small kirana store?",
        a: "Absolutely. InvoiceGPT was built specifically for shopkeepers like you — simple enough to use from day one with no training needed.",
      },
      {
        q: "Can I use it offline?",
        a: "InvoiceGPT is a web app that requires an internet connection to save and generate invoices. A basic mobile data connection is sufficient.",
      },
    ],
  },
  {
    slug: "electronics-shop",
    name: "Electronics Shop",
    plural: "electronics shops",
    ownerTerm: "electronics dealer",
    gstRates: [18, 28],
    category: "retail",
    description:
      "Generate professional GST invoices for electronics — mobile phones, TVs, appliances — with auto-calculated 18% or 28% GST.",
    painPoints: [
      "Electronics carry 18% or 28% GST — manual calculations frequently result in errors",
      "Customers demand proper tax invoices for warranty claims and business expenses",
      "High-value electronics sales require professional invoices, not handwritten bills",
    ],
    benefits: [
      "Auto-calculate 18% and 28% GST for every electronic product",
      "Include IMEI/serial numbers in item descriptions for warranty records",
      "Professional PDF invoices suitable for high-value purchases",
    ],
    faqs: [
      {
        q: "What is the GST rate on mobile phones and electronics in India?",
        a: "Mobile phones attract 12% GST. Most consumer electronics (TVs, laptops, washing machines) attract 18% GST. Air conditioners and some luxury items attract 28%. InvoiceGPT lets you set the correct rate per product.",
      },
      {
        q: "Can I include warranty information on invoices?",
        a: "Yes. You can add warranty details, serial numbers, and IMEI numbers in the item description field — they'll appear on the printed PDF invoice.",
      },
      {
        q: "My invoices need to work for B2B customers who claim input tax credit — will InvoiceGPT work?",
        a: "Yes. InvoiceGPT generates GST-compliant invoices with your GSTIN and the customer's GSTIN — fully valid for Input Tax Credit (ITC) claims.",
      },
    ],
  },
  {
    slug: "clothing-store",
    name: "Clothing Store",
    plural: "clothing stores",
    ownerTerm: "garment shop owner",
    gstRates: [5, 12],
    category: "retail",
    description:
      "Create professional GST invoices for your clothing and garment business — different rates for different price brackets handled automatically.",
    painPoints: [
      "Clothing GST rates differ by price — under ₹1000 is 5%, above is 12%",
      "Fashion boutiques need professional branded invoices, not handwritten bills",
      "Tracking which items sold at which GST rate is complex without proper software",
    ],
    benefits: [
      "Set 5% or 12% GST per item based on price — automatic CGST/SGST split",
      "Add your store logo for a branded, professional invoice look",
      "Save frequent customers for faster invoicing during peak seasons",
    ],
    faqs: [
      {
        q: "What GST rate applies to readymade garments?",
        a: "Readymade garments priced up to ₹1,000 attract 5% GST. Garments priced above ₹1,000 attract 12% GST. You can set the correct rate per line item in InvoiceGPT.",
      },
      {
        q: "Can I add my store's branding to invoices?",
        a: "Yes. Upload your store logo in Settings and it will appear on every invoice PDF you generate.",
      },
      {
        q: "How do I handle exchanges and returns?",
        a: "For returns, you can create a credit note by entering negative item quantities, or issue a fresh invoice for exchanged goods. InvoiceGPT supports flexible item entry.",
      },
    ],
  },
  {
    slug: "footwear-shop",
    name: "Footwear Shop",
    plural: "footwear shops",
    ownerTerm: "footwear retailer",
    gstRates: [5, 12, 18],
    category: "retail",
    description:
      "Fast GST invoicing for footwear and shoe shops — handle multiple GST slabs across different price ranges with zero manual calculation.",
    painPoints: [
      "Footwear GST varies by price band — complex to calculate manually",
      "Customers buying branded shoes need tax invoices for returns and warranties",
      "Managing a busy shop floor while also writing invoices is stressful",
    ],
    benefits: [
      "Different GST rates per item pair — no mental math required",
      "PDF invoices downloadable in one tap for immediate customer sharing",
      "Dashboard shows daily/monthly revenue from footwear sales",
    ],
    faqs: [
      {
        q: "What is the GST rate on footwear?",
        a: "Footwear priced up to ₹1,000 attracts 5% GST. Footwear priced above ₹1,000 attracts 12% GST. Rubber footwear may attract different rates — verify with a CA for edge cases.",
      },
      {
        q: "Can I use InvoiceGPT on a tablet at my shop counter?",
        a: "Yes. InvoiceGPT is fully responsive and works great on tablets, making it ideal as a billing station at your shop counter.",
      },
      {
        q: "Is there a way to see which products I sell most?",
        a: "Your dashboard shows total revenue and invoice counts. For detailed inventory tracking, you'd manage that separately — InvoiceGPT focuses on fast, accurate invoicing.",
      },
    ],
  },
  {
    slug: "furniture-shop",
    name: "Furniture Shop",
    plural: "furniture shops",
    ownerTerm: "furniture dealer",
    gstRates: [12, 18, 28],
    category: "retail",
    description:
      "Generate GST invoices for furniture and home decor — handle 12%, 18%, and 28% rates across different product categories.",
    painPoints: [
      "Furniture items span multiple GST slabs — wooden vs. upholstered vs. luxury",
      "High-value sales require professional, detailed tax invoices",
      "Customers often need invoices days after delivery for business claims",
    ],
    benefits: [
      "Add detailed product descriptions including dimensions and materials",
      "Retrieve past invoices instantly by customer name or invoice number",
      "Generate PDF months later if a customer needs a copy for their records",
    ],
    faqs: [
      {
        q: "What is the GST rate on furniture?",
        a: "Most wooden furniture attracts 12% GST. Upholstered furniture and mattresses attract 18% GST. Some luxury items may attract 28%. Set the correct rate per line item in InvoiceGPT.",
      },
      {
        q: "Can I include delivery charges in the invoice?",
        a: "Yes. Add delivery/freight charges as a separate line item with the applicable GST rate (usually 18% for transportation services).",
      },
      {
        q: "Can I regenerate an invoice I made months ago?",
        a: "Yes. All invoices are saved in your account. You can view, download, and share any past invoice at any time.",
      },
    ],
  },
  {
    slug: "stationery-shop",
    name: "Stationery Shop",
    plural: "stationery shops",
    ownerTerm: "stationery shop owner",
    gstRates: [12, 18],
    category: "retail",
    description:
      "Fast GST invoicing for stationery and book shops — create professional invoices in under a minute for bulk orders and retail sales.",
    painPoints: [
      "Stationery shops often handle bulk B2B orders requiring proper GST invoices",
      "Books (0% GST) and stationery (12-18% GST) have different rates in one bill",
      "School and office supply bulk orders need detailed itemised invoices",
    ],
    benefits: [
      "Mix items with different GST rates in one invoice effortlessly",
      "Perfect for both retail walk-in customers and B2B bulk orders",
      "Save frequent institutional clients (schools, offices) for repeat billing",
    ],
    faqs: [
      {
        q: "What is the GST rate on stationery and books?",
        a: "Books and printed material are 0% GST. Notebooks, pens, and stationery items are typically 12% or 18% GST. InvoiceGPT lets you set the rate per item.",
      },
      {
        q: "Can I create invoices for large school bulk orders?",
        a: "Yes. You can add as many line items as needed. There is no limit on the number of items per invoice.",
      },
      {
        q: "Is this suitable for B2B institutional sales?",
        a: "Yes. Enter the institution's GSTIN in the client details for a fully GST-compliant B2B invoice valid for input tax credit.",
      },
    ],
  },
  {
    slug: "gift-shop",
    name: "Gift Shop",
    plural: "gift shops",
    ownerTerm: "gift shop owner",
    gstRates: [12, 18],
    category: "retail",
    description:
      "Create beautiful, professional GST invoices for your gift shop — handle corporate gifting orders, retail sales, and seasonal bulk orders.",
    painPoints: [
      "Corporate gifting orders need detailed itemised GST invoices for accounts departments",
      "Seasonal rush means lots of invoices to create quickly — no time for slow software",
      "Gift items span many GST categories — confusing without clear guidance",
    ],
    benefits: [
      "Add corporate client GSTINs for B2B gifting orders",
      "Create invoices in 60 seconds even during peak festival seasons",
      "Store repeat corporate clients and reuse their details instantly",
    ],
    faqs: [
      {
        q: "What GST applies to gift items like chocolates and gift hampers?",
        a: "Chocolates attract 28% GST. Packaged sweets and bakery items typically 5-18%. Handicrafts and artware are 12%. Set the correct rate per item for compliance.",
      },
      {
        q: "Can I create bulk corporate gifting invoices?",
        a: "Yes. Add multiple items in a single invoice. For large orders with many identical items, you can list them as a bulk quantity on one line.",
      },
      {
        q: "Do my corporate clients need my GSTIN on the invoice?",
        a: "Yes. Corporate clients need your GSTIN to claim Input Tax Credit. Add your GSTIN once in Settings — it appears on every invoice automatically.",
      },
    ],
  },
  {
    slug: "hardware-store",
    name: "Hardware Store",
    plural: "hardware stores",
    ownerTerm: "hardware shop owner",
    gstRates: [18, 28],
    category: "retail",
    description:
      "Generate GST invoices for hardware and building materials — from nuts and bolts to electrical fittings — with correct 18% or 28% GST auto-applied.",
    painPoints: [
      "Hardware items span 18% and 28% GST — easy to miscalculate manually",
      "B2B contractors and builders demand proper tax invoices for input credit",
      "Busy hardware stores don't have time for complicated billing software",
    ],
    benefits: [
      "Quick invoicing during rush hours — create bills in 60 seconds",
      "Contractor clients saved for fast repeat billing on construction projects",
      "Full CGST/SGST breakdown for input tax credit compliance",
    ],
    faqs: [
      {
        q: "What GST rate applies to hardware and building materials?",
        a: "Most hardware items (screws, nails, tools) attract 18% GST. Paints and certain construction materials may be 18% or 28%. Always verify and set the rate per item.",
      },
      {
        q: "My contractor customers need invoices at project end — can I issue them late?",
        a: "Yes. You can create invoices at any time. Set the invoice date to the actual supply date regardless of when you generate it in InvoiceGPT.",
      },
      {
        q: "Can I add custom notes to invoices — like project names?",
        a: "Yes. There's a Notes field on every invoice where you can add project names, site addresses, or any custom information.",
      },
    ],
  },
  {
    slug: "toy-shop",
    name: "Toy Shop",
    plural: "toy shops",
    ownerTerm: "toy retailer",
    gstRates: [12, 18],
    category: "retail",
    description:
      "Quickly create GST invoices for toy and hobby shops — from educational toys to board games and hobby kits.",
    painPoints: [
      "Toys have varying GST rates (12-18%) making manual billing error-prone",
      "Festival seasons bring high sales volumes that need fast invoicing",
      "Gift receipts and tax bills needed by both retail and wholesale buyers",
    ],
    benefits: [
      "Handle 12% and 18% GST toy items in the same invoice",
      "Fast invoicing during Diwali, Christmas, and holiday rush periods",
      "Professional PDF invoices suitable for gift receipts and tax bills",
    ],
    faqs: [
      {
        q: "What is the GST rate on toys?",
        a: "Most toys attract 12% GST. Electronic toys and video games may attract 18% GST. Verify with the specific HSN code for your product category.",
      },
      {
        q: "Can I use InvoiceGPT for wholesale toy distribution?",
        a: "Yes. Enter the retailer's GSTIN as the client for B2B wholesale transactions — fully valid for input tax credit claims.",
      },
      {
        q: "Is there a limit on how many invoices I can create?",
        a: "Free trial includes 6 invoices. The Pro plan at ₹399/month gives you unlimited invoices for your toy business.",
      },
    ],
  },

  // ── FOOD & RESTAURANTS ────────────────────────────────────────────────────
  {
    slug: "restaurant",
    name: "Restaurant",
    plural: "restaurants",
    ownerTerm: "restaurant owner",
    gstRates: [5, 18],
    category: "food",
    description:
      "Create GST invoices for your restaurant — 5% for non-AC restaurants, 18% for AC restaurants and hotel dining — calculated automatically.",
    painPoints: [
      "Restaurant GST depends on AC/non-AC status — complex to apply correctly every time",
      "Fast-paced restaurant environments need instant invoicing, not slow software",
      "Catering orders and corporate dining need formal GST tax invoices",
    ],
    benefits: [
      "Pre-set your restaurant's GST rate (5% or 18%) once — applies to all bills",
      "Fast enough to generate invoices during busy lunch and dinner service",
      "Catering and corporate order invoices for full GST compliance",
    ],
    faqs: [
      {
        q: "What is the GST rate for restaurants?",
        a: "Non-AC restaurants and food courts charge 5% GST without ITC. AC restaurants, hotel restaurants, and delivery platforms charge 18% GST. InvoiceGPT lets you set the correct rate for your establishment.",
      },
      {
        q: "Do restaurants need to provide GST invoices to all customers?",
        a: "You must issue a bill of supply or tax invoice to every customer. For amounts above ₹200, a tax invoice with your GSTIN is required if you're GST registered.",
      },
      {
        q: "Can I create invoices for large catering orders?",
        a: "Yes. Add multiple menu items, set quantities, and generate a professional PDF for your catering client in minutes.",
      },
    ],
  },
  {
    slug: "bakery",
    name: "Bakery",
    plural: "bakeries",
    ownerTerm: "baker",
    gstRates: [5, 18],
    category: "food",
    description:
      "Generate professional GST invoices for your bakery — handle 5% GST on baked goods and 18% on restaurant-style service correctly.",
    painPoints: [
      "Bakery products have mixed GST rates — bread is exempt, cakes have 5-18%",
      "Corporate cake and pastry orders need proper tax invoices",
      "Wedding and event catering orders require detailed itemised bills",
    ],
    benefits: [
      "Set correct GST for bread (0%), packaged items (5%), and celebration cakes (18%)",
      "Event and wedding order invoices with full itemised details",
      "Save recurring corporate clients for faster order processing",
    ],
    faqs: [
      {
        q: "What GST rate applies to bakery products?",
        a: "Unpackaged bread is 0% GST. Packaged bakery items (biscuits, rusks) are 18%. Cakes sold in restaurants/hotels are 18%. Standalone bakery shops selling fresh items may be 5%. Verify with a CA.",
      },
      {
        q: "I take advance orders for weddings — how do I handle partial payments?",
        a: "You can note the advance amount in the invoice Notes field. InvoiceGPT is a billing tool — partial payment tracking can be added in your notes.",
      },
      {
        q: "Can I add item photos to invoices?",
        a: "InvoiceGPT focuses on clear text-based GST invoices. You can add detailed descriptions of each bakery product in the item description field.",
      },
    ],
  },
  {
    slug: "catering-service",
    name: "Catering Service",
    plural: "catering services",
    ownerTerm: "caterer",
    gstRates: [5, 18],
    category: "food",
    description:
      "Create professional GST invoices for catering events — weddings, corporate functions, and social gatherings — all calculated correctly.",
    painPoints: [
      "Catering invoices are complex with multiple service items and varying GST",
      "Clients expect professional invoices before releasing final payment",
      "Corporate catering requires GST invoices with your GSTIN and client GSTIN",
    ],
    benefits: [
      "Detailed multi-item catering invoices covering food, service, and rental charges",
      "Corporate client GSTIN support for input tax credit compliance",
      "Advance payment and balance payment invoicing flexibility",
    ],
    faqs: [
      {
        q: "What GST applies to catering services?",
        a: "Catering services attract 5% GST (without ITC) or 18% GST (with ITC). Most outdoor caterers charge 5% GST. Verify your registration type with a CA.",
      },
      {
        q: "Can I create invoices for large events with many line items?",
        a: "Yes. Add as many items as needed — food categories, service charges, equipment rental, etc. — all with individual GST rates if required.",
      },
      {
        q: "Do I need to issue an invoice before an event or after?",
        a: "GST invoices should be issued at the time of supply (usually before or at the event). You can set the invoice date to the event date in InvoiceGPT.",
      },
    ],
  },
  {
    slug: "sweet-shop",
    name: "Sweet Shop",
    plural: "sweet shops",
    ownerTerm: "mithai shop owner",
    gstRates: [5, 18],
    category: "food",
    description:
      "Fast GST invoicing for mithai and sweet shops — create professional bills for festive bulk orders, retail sales, and corporate gifting.",
    painPoints: [
      "Festive seasons bring huge order volumes needing fast, accurate billing",
      "Corporate sweet gifting orders need proper GST invoices for accounts",
      "Packaged vs. loose sweets have different GST implications",
    ],
    benefits: [
      "Handle festive bulk orders without slowing down your sweet shop",
      "Corporate Diwali and Eid gifting invoices with client GSTIN",
      "Differentiate packaged and loose sweets with different GST rates per item",
    ],
    faqs: [
      {
        q: "What is the GST rate on Indian sweets?",
        a: "Unpackaged freshly made sweets are 0% GST. Pre-packaged branded sweets attract 5% GST. Chocolate-based sweets attract 18-28% GST.",
      },
      {
        q: "Can I create corporate gifting invoices for bulk orders?",
        a: "Yes. Add the corporate client's GSTIN, list all items, and generate a PDF invoice valid for input tax credit claims.",
      },
      {
        q: "How fast can I create an invoice during festive rush?",
        a: "InvoiceGPT takes 60 seconds or less per invoice once your business details are set up. Repeat customers are saved for even faster billing.",
      },
    ],
  },
  {
    slug: "dhaba",
    name: "Dhaba",
    plural: "dhabas",
    ownerTerm: "dhaba owner",
    gstRates: [5],
    category: "food",
    description:
      "Simple GST invoicing for dhabas — create clean bills at 5% GST for non-AC food establishments without complex software.",
    painPoints: [
      "Most dhabas are non-AC and need simple 5% GST invoicing",
      "Highway and truck driver clients increasingly ask for GST bills for expense claims",
      "No time to learn complex billing software between serving customers",
    ],
    benefits: [
      "Simple 5% GST billing set once — applies to all your food items automatically",
      "Works perfectly on mobile — no PC or printer needed to share PDF",
      "Instant bills for truckers and B2B customers who need GST invoices",
    ],
    faqs: [
      {
        q: "Does my dhaba need to be GST registered?",
        a: "If your annual turnover exceeds ₹40 lakhs (₹20 lakhs for some states), GST registration is mandatory. Below that, it's optional but helps B2B customers with ITC.",
      },
      {
        q: "Can I use InvoiceGPT without registering for GST?",
        a: "Yes. You can create bills without a GSTIN — they'll show as bills of supply rather than tax invoices. Add GSTIN later when registered.",
      },
      {
        q: "What if my customers don't need a GST bill?",
        a: "You can still use InvoiceGPT for retail customers — just leave the client GSTIN empty. The PDF will serve as a normal receipt/bill.",
      },
    ],
  },

  // ── HEALTH & PHARMACY ─────────────────────────────────────────────────────
  {
    slug: "medical-store",
    name: "Medical Store",
    plural: "medical stores",
    ownerTerm: "pharmacist",
    gstRates: [0, 5, 12],
    category: "health",
    description:
      "Create GST-compliant invoices for medical stores — handle 0%, 5%, and 12% GST on medicines, surgical items, and healthcare products correctly.",
    painPoints: [
      "Medicines have 0%, 5%, and 12% GST — manually tracking is error-prone",
      "Hospitals and clinics need formal GST invoices for their procurement records",
      "High-volume prescription filling requires fast, accurate invoicing",
    ],
    benefits: [
      "Set correct GST rate per medicine type — auto-calculate CGST and SGST",
      "Hospital and clinic client GSTINs saved for instant repeat billing",
      "Full GST compliance for pharmaceutical supply chains",
    ],
    faqs: [
      {
        q: "What GST rate applies to medicines and drugs?",
        a: "Life-saving drugs are 5% or 0% GST. Most prescription medicines are 12% GST. Vaccines and certain formulations may be 0%. Check the HSN code for each medicine — InvoiceGPT lets you set the correct rate per item.",
      },
      {
        q: "Can I use InvoiceGPT for bulk hospital supply invoices?",
        a: "Yes. Hospital and clinic procurement invoices with their GSTIN can be created in InvoiceGPT — fully valid for GST input credit.",
      },
      {
        q: "Do I need a specific medical billing software or will InvoiceGPT work?",
        a: "InvoiceGPT handles GST invoicing for medical stores. For inventory management and prescription tracking, you'd use dedicated pharmacy software — InvoiceGPT handles the billing/invoicing part.",
      },
    ],
  },
  {
    slug: "clinic",
    name: "Clinic",
    plural: "clinics",
    ownerTerm: "doctor",
    gstRates: [0, 18],
    category: "health",
    description:
      "Create professional invoices for clinics and medical practices — healthcare services are GST-exempt, but ancillary services may attract GST.",
    painPoints: [
      "Medical services are GST-exempt but ancillary services (lab tests, pharmacy) are not",
      "Patients expect professional itemised receipts for insurance claims",
      "Insurance companies require detailed invoices listing all services",
    ],
    benefits: [
      "Create professional patient receipts for insurance reimbursement claims",
      "List consultation fees, procedure charges, and medicine costs separately",
      "PDF receipts shareable on WhatsApp for immediate patient confirmation",
    ],
    faqs: [
      {
        q: "Are medical services subject to GST?",
        a: "Healthcare services provided by registered medical practitioners (doctors) are exempt from GST. However, cosmetic treatments, clinical lab tests, and pharmacy sales may attract GST.",
      },
      {
        q: "Can I create patient receipts for insurance claims?",
        a: "Yes. InvoiceGPT can generate detailed itemised receipts/invoices listing consultation fees, procedures, and medicines separately — suitable for insurance claim submission.",
      },
      {
        q: "What if I run a diagnostic lab alongside my clinic?",
        a: "Diagnostic and lab services are taxable under GST. Set the correct GST rate for lab tests as separate line items in InvoiceGPT.",
      },
    ],
  },
  {
    slug: "optical-store",
    name: "Optical Store",
    plural: "optical stores",
    ownerTerm: "optician",
    gstRates: [5, 12, 18],
    category: "health",
    description:
      "Fast GST invoicing for optical and eyewear stores — frames, lenses, contact lenses, and eye care products all handled correctly.",
    painPoints: [
      "Spectacles have complex GST: frames (12%), lenses (12%), contact lenses (12%)",
      "Insurance-covered eyewear purchases need detailed tax invoices",
      "High-value designer frames require professional, accurate tax bills",
    ],
    benefits: [
      "Separate line items for frames, lenses, and services with individual GST rates",
      "Insurance-compatible detailed invoices for vision benefit claims",
      "Customer prescription details can be noted for repeat order reference",
    ],
    faqs: [
      {
        q: "What is the GST rate on spectacles and optical goods?",
        a: "Spectacle frames attract 12% GST. Spectacle lenses attract 12% GST. Contact lenses attract 12% GST. Eye drops and medications vary — check HSN codes.",
      },
      {
        q: "Can I list frame model and power on the invoice?",
        a: "Yes. Add frame model, lens power, and any custom specifications in the item description field — they'll appear on the printed invoice.",
      },
      {
        q: "My customers want a copy of their invoice months later — is that possible?",
        a: "Yes. All invoices are saved permanently in your InvoiceGPT account. You can download or share any past invoice at any time.",
      },
    ],
  },
  {
    slug: "gym",
    name: "Gym & Fitness Center",
    plural: "gyms and fitness centers",
    ownerTerm: "gym owner",
    gstRates: [18],
    category: "health",
    description:
      "Create professional GST invoices for gym memberships, fitness classes, and personal training — all at 18% GST, calculated automatically.",
    painPoints: [
      "Gym memberships attract 18% GST — but many gym owners undercharge or forget",
      "Members paying via UPI or bank transfer still need proper GST receipts",
      "Fitness equipment sales and services need separate billing",
    ],
    benefits: [
      "Pre-set 18% GST for all membership and service billing",
      "Monthly membership renewal invoices created in under a minute",
      "Personal training, nutrition consultation billed as separate line items",
    ],
    faqs: [
      {
        q: "Do gyms and fitness centres need to charge GST?",
        a: "Yes. Health and fitness services attract 18% GST if your annual turnover exceeds the registration threshold (₹20 lakhs for most states).",
      },
      {
        q: "Can I create recurring monthly membership invoices?",
        a: "Yes. Once a member is saved in InvoiceGPT, you can create their monthly invoice in under 60 seconds by selecting their name.",
      },
      {
        q: "How do I handle annual membership payments?",
        a: "Create a single invoice for the full annual amount. You can note the membership period in the invoice description or notes field.",
      },
    ],
  },
  {
    slug: "ayurvedic-store",
    name: "Ayurvedic Store",
    plural: "ayurvedic stores",
    ownerTerm: "ayurvedic shop owner",
    gstRates: [0, 5, 12],
    category: "health",
    description:
      "Create accurate GST invoices for Ayurvedic medicines, herbal products, and wellness items — handle varying GST rates with ease.",
    painPoints: [
      "Ayurvedic medicines have different GST rates from 0% to 12%",
      "Online and offline sales both need proper GST documentation",
      "Hospitals and wellness centres ordering in bulk need formal GST invoices",
    ],
    benefits: [
      "Correct GST rates for Ayurvedic drugs, herbal supplements, and wellness products",
      "B2B wellness centre and hospital supply invoices with GSTIN",
      "Simple enough for any shop owner — no accounting knowledge needed",
    ],
    faqs: [
      {
        q: "What GST applies to Ayurvedic medicines?",
        a: "Ayurvedic medicines in the Government's approved list are 0% GST. Other Ayurvedic preparations are typically 12% GST. Herbal supplements and cosmetics may be higher.",
      },
      {
        q: "Can I use InvoiceGPT for online Ayurvedic product sales?",
        a: "Yes. Create invoices for both in-store and online orders. Include the customer's shipping address in the notes field if needed.",
      },
      {
        q: "Is InvoiceGPT suitable for a small Ayurvedic practitioner?",
        a: "Absolutely. InvoiceGPT works for any size of business — from small herbal product stalls to large Ayurvedic distribution businesses.",
      },
    ],
  },

  // ── PROFESSIONAL SERVICES ─────────────────────────────────────────────────
  {
    slug: "ca-firm",
    name: "CA Firm",
    plural: "CA firms",
    ownerTerm: "chartered accountant",
    gstRates: [18],
    category: "services",
    description:
      "Create professional GST service invoices for CA firms and accounting practices — all professional services billed at 18% GST.",
    painPoints: [
      "CA firms need perfectly GST-compliant invoices to set an example for clients",
      "Multiple services (audit, tax filing, advisory) need clear separate billing",
      "Retainer clients need monthly invoices generated quickly",
    ],
    benefits: [
      "Professional service invoices meeting all GST compliance requirements",
      "Separate line items for each service: audit, filing, advisory, representation",
      "Monthly retainer clients invoiced in under a minute",
    ],
    faqs: [
      {
        q: "What GST applies to CA and professional services?",
        a: "All professional services including CA, legal, consulting, and advisory services attract 18% GST.",
      },
      {
        q: "Can I add my firm's registration details to invoices?",
        a: "Yes. Enter your firm name, GSTIN, address, and registration number in Settings — they appear on every invoice automatically.",
      },
      {
        q: "Can I create invoices for multiple clients quickly?",
        a: "Yes. Save each client once with their GSTIN. Monthly invoices for all retainer clients can be created in under a minute each.",
      },
    ],
  },
  {
    slug: "law-firm",
    name: "Law Firm",
    plural: "law firms",
    ownerTerm: "lawyer",
    gstRates: [18],
    category: "services",
    description:
      "Generate professional GST invoices for legal services — consultation fees, retainer bills, and court representation — all at 18% GST.",
    painPoints: [
      "Legal invoices need to clearly detail services for client transparency",
      "Corporate clients need GST invoices for legal expense claims",
      "Retainer arrangements require regular monthly billing",
    ],
    benefits: [
      "Detailed legal service invoices listing each service component",
      "Corporate client billing with GSTIN for ITC compliance",
      "Professional PDF invoices suitable for formal legal billing",
    ],
    faqs: [
      {
        q: "Are legal services subject to GST?",
        a: "Yes. Legal services provided to business entities attract 18% GST. Services to individuals may have different rules — consult a tax advisor for your specific practice.",
      },
      {
        q: "Can I include hourly rate breakdowns in invoices?",
        a: "Yes. You can list each service (consultation hours, document drafting, court appearances) as separate line items with individual amounts.",
      },
      {
        q: "Is InvoiceGPT suitable for a solo advocate or large law firm?",
        a: "Yes. InvoiceGPT works for solo practitioners and multi-partner firms alike. Save clients once and invoice them in seconds for every matter.",
      },
    ],
  },
  {
    slug: "it-services",
    name: "IT Services",
    plural: "IT companies",
    ownerTerm: "IT business owner",
    gstRates: [18],
    category: "services",
    description:
      "Create professional GST invoices for IT services, software development, and tech consulting — all at 18% GST with full compliance.",
    painPoints: [
      "IT invoices need milestone-based or monthly billing with clear descriptions",
      "International clients may need special invoice formats",
      "Project-based billing with multiple deliverables requires detailed invoicing",
    ],
    benefits: [
      "Milestone and monthly retainer invoice generation in under a minute",
      "Detailed service descriptions for each development deliverable",
      "Professional corporate-grade PDF invoices for tech clients",
    ],
    faqs: [
      {
        q: "What GST rate applies to software and IT services?",
        a: "All IT services including software development, consulting, SaaS, and tech support attract 18% GST for domestic clients.",
      },
      {
        q: "Do I charge GST on invoices to international clients?",
        a: "Exports of services (zero-rated supply) attract 0% GST or are outside the scope of GST. Consult a CA for the correct treatment for your export invoices.",
      },
      {
        q: "Can I create invoices for SaaS subscriptions?",
        a: "Yes. List the subscription period, service name, and amount. InvoiceGPT generates a fully compliant 18% GST invoice.",
      },
    ],
  },
  {
    slug: "freelancer",
    name: "Freelancer",
    plural: "freelancers",
    ownerTerm: "freelancer",
    gstRates: [18],
    category: "services",
    description:
      "Create professional GST invoices as a freelancer in India — designers, writers, developers, and consultants all covered with 18% GST auto-calculated.",
    painPoints: [
      "Freelancers often skip proper invoicing — creating problems during ITR filing",
      "Corporate clients reject informal invoices and demand proper GST bills",
      "Creating invoices manually for every client takes valuable productive time",
    ],
    benefits: [
      "Professional freelance invoices accepted by corporate clients and their accounts teams",
      "Save repeat clients — create their invoice in under 30 seconds",
      "All invoices stored for easy ITR and tax filing documentation",
    ],
    faqs: [
      {
        q: "Do freelancers need to register for GST?",
        a: "Freelancers earning over ₹20 lakhs annually (₹10 lakhs in some states) must register. Below that, voluntary registration is optional but can help with B2B clients.",
      },
      {
        q: "Can I issue invoices without a GSTIN as a freelancer?",
        a: "If you're not GST registered, you can create bills of supply without GST. InvoiceGPT allows invoicing with or without GSTIN.",
      },
      {
        q: "Will InvoiceGPT help me track my income for ITR?",
        a: "Your dashboard shows total revenue across all invoices, which you can use as a reference for income tax filing.",
      },
    ],
  },
  {
    slug: "salon",
    name: "Beauty Salon",
    plural: "beauty salons",
    ownerTerm: "salon owner",
    gstRates: [18],
    category: "services",
    description:
      "Create professional GST invoices for beauty salons and hair studios — all services at 18% GST, product sales handled separately.",
    painPoints: [
      "Salon services (18% GST) and retail product sales (varying GST) need separate treatment",
      "Customers paying by UPI or card still need proper GST receipts",
      "Corporate salon packages for office employees need formal GST invoices",
    ],
    benefits: [
      "Separate billing for services (18%) and retail products (12-18%)",
      "Package deal invoices with all services listed clearly",
      "Professional salon invoices that build customer trust",
    ],
    faqs: [
      {
        q: "What GST applies to beauty salon services?",
        a: "Beauty treatment services (haircut, facial, massage, etc.) attract 18% GST. Beauty products sold retail attract 18% GST. Cosmetics may attract 28% GST.",
      },
      {
        q: "Can I offer package deals with mixed services on one invoice?",
        a: "Yes. List each service as a separate line item — haircut, facial, manicure, etc. — all calculated at 18% GST automatically.",
      },
      {
        q: "Do I need a GST registration for a small home salon?",
        a: "If your turnover exceeds ₹20 lakhs, registration is mandatory. Small home salons below this threshold can operate without GST registration.",
      },
    ],
  },
  {
    slug: "photography-studio",
    name: "Photography Studio",
    plural: "photography studios",
    ownerTerm: "photographer",
    gstRates: [18],
    category: "services",
    description:
      "Create professional GST invoices for photography services — weddings, events, corporate shoots, and product photography billed correctly.",
    painPoints: [
      "Photography clients often request formal invoices for business expense claims",
      "Wedding photography involves large sums — professional invoicing is essential",
      "Advance and balance payment structure needs clear invoicing",
    ],
    benefits: [
      "Event photography invoices with package details and delivery timelines in notes",
      "Corporate client billing with GSTIN for business expense claims",
      "Advance and final payment invoices with clear payment terms",
    ],
    faqs: [
      {
        q: "What GST rate applies to photography services?",
        a: "Photography services including wedding photography, event coverage, and commercial shoots attract 18% GST.",
      },
      {
        q: "Can I create a separate invoice for the advance payment?",
        a: "Yes. Create one invoice for the advance with the amount received, and a second invoice for the balance payment after the event.",
      },
      {
        q: "Do I need GST registration as a freelance photographer?",
        a: "If your annual income from photography exceeds ₹20 lakhs, GST registration is mandatory. Below that, it's optional but beneficial for B2B clients.",
      },
    ],
  },
  {
    slug: "travel-agency",
    name: "Travel Agency",
    plural: "travel agencies",
    ownerTerm: "travel agent",
    gstRates: [5, 18],
    category: "services",
    description:
      "Create professional GST invoices for travel agencies — tour packages, hotel bookings, and travel services billed with correct GST rates.",
    painPoints: [
      "Travel services have complex GST — tour packages are 5%, some services are 18%",
      "Corporate travel requires formal GST invoices for expense reimbursement",
      "Holiday package invoices need detailed itemisation for client clarity",
    ],
    benefits: [
      "Correct GST rates for domestic and international tour packages",
      "Corporate travel invoices with GSTIN for employee expense claims",
      "Detailed tour package invoices listing all included services",
    ],
    faqs: [
      {
        q: "What GST rate applies to travel agency services?",
        a: "Tour operator services for domestic packages are 5% GST. For international packages, it's 5% on the Indian leg. Commission-based agents may charge 18% on service fees.",
      },
      {
        q: "Can I create invoices for hotel bookings and flights separately?",
        a: "Yes. List each component — flights, hotels, transfers, activities — as separate line items with the applicable GST rate.",
      },
      {
        q: "How do I handle cancellations and refunds?",
        a: "For refunds, create a credit note referencing the original invoice. Note the cancellation charges and any applicable refund amount.",
      },
    ],
  },
  {
    slug: "event-management",
    name: "Event Management",
    plural: "event management companies",
    ownerTerm: "event manager",
    gstRates: [18],
    category: "services",
    description:
      "Generate professional GST invoices for event management services — corporate events, weddings, and exhibitions billed at 18% GST.",
    painPoints: [
      "Event invoices are complex with venue, catering, AV, and staffing charges",
      "Corporate event clients demand detailed GST invoices before releasing payment",
      "Large event amounts need professional-looking invoices for client trust",
    ],
    benefits: [
      "Multi-line event invoices covering all service categories",
      "Corporate client GSTIN for input tax credit compliance",
      "Professional PDF invoices suitable for high-value corporate billings",
    ],
    faqs: [
      {
        q: "What GST rate applies to event management services?",
        a: "Event management and planning services attract 18% GST. Individual components (catering, venue rental) may have different rates.",
      },
      {
        q: "Can I create separate invoices for advance and final payments?",
        a: "Yes. Create an advance invoice when the booking is confirmed and a final balance invoice after the event is completed.",
      },
      {
        q: "How do I include reimbursable expenses on event invoices?",
        a: "List reimbursable expenses as separate line items. Mark them clearly in the description field. Apply GST only if you're charging for the service, not passing through pure costs.",
      },
    ],
  },

  // ── WHOLESALE & DISTRIBUTION ──────────────────────────────────────────────
  {
    slug: "wholesale-distributor",
    name: "Wholesale Distributor",
    plural: "wholesale distributors",
    ownerTerm: "wholesale dealer",
    gstRates: [5, 12, 18, 28],
    category: "wholesale",
    description:
      "Create bulk GST invoices for wholesale and distribution businesses — handle large orders with multiple GST rates across product categories.",
    painPoints: [
      "Wholesale invoices have many line items with different GST rates per product",
      "Retail buyers need formal B2B GST invoices for their input tax credit claims",
      "Large invoice amounts require professional, error-free billing",
    ],
    benefits: [
      "Handle hundreds of line items with accurate CGST/SGST per item",
      "Save all retail client GSTINs for fast repeat B2B invoicing",
      "Error-free calculation reduces tax disputes with buyers",
    ],
    faqs: [
      {
        q: "Can InvoiceGPT handle large wholesale invoices with many items?",
        a: "Yes. You can add as many line items as needed on a single invoice, each with a different GST rate and quantity.",
      },
      {
        q: "Do I need to include HSN codes on wholesale invoices?",
        a: "If your turnover exceeds ₹5 crore, you must include 6-digit HSN codes. Below ₹5 crore, 4-digit HSN codes are required. You can add HSN codes in the item description field in InvoiceGPT.",
      },
      {
        q: "Can I create invoices for interstate wholesale transactions?",
        a: "InvoiceGPT currently handles intra-state CGST/SGST billing. For IGST interstate transactions, add the IGST amount manually in the notes field while we work on full IGST support.",
      },
    ],
  },
  {
    slug: "cold-storage",
    name: "Cold Storage",
    plural: "cold storage facilities",
    ownerTerm: "cold storage owner",
    gstRates: [18],
    category: "wholesale",
    description:
      "Create GST invoices for cold storage and warehousing services — monthly storage charges, handling fees, and ancillary services.",
    painPoints: [
      "Cold storage billing involves recurring monthly charges for multiple clients",
      "Farmers and food processors need proper GST receipts for income tax",
      "Storage, handling, and transportation charges need separate billing",
    ],
    benefits: [
      "Monthly recurring storage invoices created in under a minute",
      "Separate billing for storage, handling, and transportation services",
      "Agricultural client billing including farmer producer organisation invoicing",
    ],
    faqs: [
      {
        q: "What GST rate applies to cold storage services?",
        a: "Cold storage of agricultural produce is exempt from GST. Cold storage for other goods and perishables attracts 18% GST for warehousing services.",
      },
      {
        q: "Can I create monthly recurring invoices for long-term storage clients?",
        a: "Yes. Once a client is saved, you can create their monthly invoice in under a minute. All past invoices are accessible for record-keeping.",
      },
      {
        q: "How do I handle billing for partial months?",
        a: "Add the prorated amount for partial months as a line item. Note the specific date range in the item description for client clarity.",
      },
    ],
  },

  // ── EDUCATION ─────────────────────────────────────────────────────────────
  {
    slug: "coaching-center",
    name: "Coaching Centre",
    plural: "coaching centres",
    ownerTerm: "coaching institute owner",
    gstRates: [18],
    category: "education",
    description:
      "Create professional GST invoices for coaching centres and educational institutes — tuition fees, study material, and online classes billed correctly.",
    painPoints: [
      "Educational services have complex GST exemptions vs. taxable coaching",
      "Parents need proper receipts for school fee reimbursement and tax deductions",
      "Online and offline coaching billing needs clear documentation",
    ],
    benefits: [
      "Separate billing for tuition fees (may be exempt) and study materials (18%)",
      "Parent-friendly receipts that work for school fee reimbursement",
      "Batch-based billing for recurring monthly coaching fees",
    ],
    faqs: [
      {
        q: "Is coaching and tuition subject to GST?",
        a: "Educational services by recognized institutions are exempt. Private coaching centres and tuition classes are subject to 18% GST if registered. Verify with a CA for your specific case.",
      },
      {
        q: "Can I issue monthly receipts for coaching fees?",
        a: "Yes. Save each student (or their parent) as a client and issue monthly fee receipts/invoices in under a minute.",
      },
      {
        q: "How do I handle study material and book sales separately?",
        a: "Add study materials as separate line items with the applicable GST rate (typically 12% for books, 18% for digital content) on the same invoice.",
      },
    ],
  },
  {
    slug: "computer-training",
    name: "Computer Training Institute",
    plural: "computer training institutes",
    ownerTerm: "training institute owner",
    gstRates: [18],
    category: "education",
    description:
      "Create GST invoices for computer training and IT education institutes — course fees, certification exams, and software training billed at 18% GST.",
    painPoints: [
      "Corporate training clients need detailed invoices for employee development budgets",
      "Course fees, materials, and certification fees need separate line items",
      "Government training contracts have specific invoicing requirements",
    ],
    benefits: [
      "Detailed course invoices suitable for corporate training budgets",
      "Certification fee and course material billed as separate line items",
      "Professional invoices for government empanelled training contracts",
    ],
    faqs: [
      {
        q: "What GST rate applies to computer training courses?",
        a: "Private computer training and vocational courses not affiliated with recognized boards attract 18% GST. Courses affiliated with recognized universities may be exempt.",
      },
      {
        q: "Can I bulk invoice corporate clients for employee training?",
        a: "Yes. Create one invoice listing all participating employees, course dates, and per-head fees for a clean corporate training invoice.",
      },
      {
        q: "How do I handle EMI-based course fee payments?",
        a: "Create invoices for each instalment. Note the instalment number and total course fee in the description for student clarity.",
      },
    ],
  },

  // ── CONSTRUCTION ──────────────────────────────────────────────────────────
  {
    slug: "contractor",
    name: "Construction Contractor",
    plural: "construction contractors",
    ownerTerm: "contractor",
    gstRates: [12, 18],
    category: "construction",
    description:
      "Create professional GST invoices for construction and civil contractors — works contracts, labour charges, and material supply billed correctly.",
    painPoints: [
      "Construction invoices need to separate works contract (12%) from material supply (18%)",
      "Government and corporate clients require formal GST invoices for payments",
      "Large project invoices with many components need clear itemisation",
    ],
    benefits: [
      "Separate billing for labour (works contract) and material (supply) with correct GST",
      "Government tender and corporate project invoicing that meets compliance",
      "Running account bill (RAB) style invoicing with clear milestones",
    ],
    faqs: [
      {
        q: "What GST rate applies to construction contracts?",
        a: "Composite works contracts for affordable housing attract 12% GST. For commercial construction, 18% GST applies. Pure labour services attract 18% GST. Verify with a CA for your specific contract type.",
      },
      {
        q: "Can I create running account bills for government projects?",
        a: "Yes. Create invoices for each billing milestone. Use the notes field to reference the project name, work order number, and measurement book details.",
      },
      {
        q: "How do I show TDS deductions on construction invoices?",
        a: "Add a TDS deduction as a negative line item or note it in the footer/notes section of the invoice.",
      },
    ],
  },
  {
    slug: "real-estate",
    name: "Real Estate Agency",
    plural: "real estate agencies",
    ownerTerm: "real estate agent",
    gstRates: [18],
    category: "construction",
    description:
      "Create professional GST invoices for real estate brokerage and agency services — commission fees and consultancy billed at 18% GST.",
    painPoints: [
      "Real estate commission invoices need to be formal for high-value transactions",
      "Developers and builders need GST invoices for brokerage expense claims",
      "Multiple transactions with different clients need organised invoicing",
    ],
    benefits: [
      "Professional brokerage commission invoices for high-value property deals",
      "Developer and builder GSTIN support for input tax credit",
      "Organised client database for repeat property transaction billing",
    ],
    faqs: [
      {
        q: "What GST applies to real estate agent commission?",
        a: "Real estate agent commission and brokerage services attract 18% GST on the commission amount (not the property value).",
      },
      {
        q: "Do I need to charge GST on property sales?",
        a: "Resale of completed properties is not subject to GST. Only brokerage/agent fees attract 18% GST. Under-construction property sales are subject to GST charged by the developer.",
      },
      {
        q: "Can I create invoices for both the buyer and seller?",
        a: "Yes. Create separate invoices for each party if you're charging commission from both buyer and seller.",
      },
    ],
  },
  {
    slug: "interior-designer",
    name: "Interior Designer",
    plural: "interior designers",
    ownerTerm: "interior designer",
    gstRates: [18],
    category: "construction",
    description:
      "Create professional GST invoices for interior design services — design fees, furniture supply, and project management billed correctly.",
    painPoints: [
      "Interior design projects mix professional services (18% GST) and goods supply (12-28% GST)",
      "High-value projects need professional invoicing for client trust and banking",
      "Staged payment billing for interior projects requires multiple invoices",
    ],
    benefits: [
      "Separate design fees and material/furniture supply with correct GST per category",
      "Stage-wise billing for interior projects (design, procurement, execution, completion)",
      "Professional invoices that build confidence for high-value residential projects",
    ],
    faqs: [
      {
        q: "What GST rate applies to interior design services?",
        a: "Interior design consulting and project management services attract 18% GST. Furniture and fixtures supplied attract 12-28% GST depending on the item type.",
      },
      {
        q: "How do I invoice for a turnkey interior project?",
        a: "Break the project into stages: design fee, material procurement, labour/execution. Create separate invoices or line items for each stage on a composite invoice.",
      },
      {
        q: "Can I include a payment schedule on the invoice?",
        a: "Yes. Use the Notes field to include the payment schedule (e.g., 30% advance, 40% at mid-stage, 30% on completion).",
      },
    ],
  },

  // ── MANUFACTURING ─────────────────────────────────────────────────────────
  {
    slug: "manufacturer",
    name: "Manufacturer",
    plural: "manufacturers",
    ownerTerm: "manufacturer",
    gstRates: [5, 12, 18, 28],
    category: "manufacturing",
    description:
      "Create accurate B2B GST invoices for manufacturing businesses — raw material, finished goods, and job work all handled with correct GST rates.",
    painPoints: [
      "Manufacturing involves complex supply chains needing accurate GST documentation",
      "Buyers claim input tax credit — incorrect invoices cause disputes and delays",
      "Multiple product lines with different GST rates increase billing complexity",
    ],
    benefits: [
      "Accurate GST invoices that hold up for buyer's input tax credit claims",
      "Multiple GST rate handling for diverse product portfolios",
      "Professional B2B invoicing that meets large buyer procurement standards",
    ],
    faqs: [
      {
        q: "Do manufacturers need GST registration?",
        a: "Yes. Any manufacturer with an annual aggregate turnover exceeding ₹40 lakhs (₹20 lakhs for service states) must register for GST.",
      },
      {
        q: "Can InvoiceGPT handle job work invoices?",
        a: "Yes. Create job work invoices listing the work done, applicable GST rate, and any materials returned. Add job work reference numbers in the notes field.",
      },
      {
        q: "How do I handle GST for exports from my manufacturing unit?",
        a: "For zero-rated exports, InvoiceGPT lets you create invoices with 0% GST. Note the export details (shipping bill number, port) in the notes field.",
      },
    ],
  },
  {
    slug: "printing-press",
    name: "Printing Press",
    plural: "printing presses",
    ownerTerm: "printer",
    gstRates: [5, 12, 18],
    category: "manufacturing",
    description:
      "Create professional GST invoices for printing and publishing businesses — books, stationery, packaging, and marketing materials billed correctly.",
    painPoints: [
      "Printed goods have varying GST rates — books (0-5%), packaging (12-18%), marketing material (18%)",
      "Bulk printing orders for businesses need formal GST invoices for tax records",
      "Quick turnaround printing needs fast, accurate billing",
    ],
    benefits: [
      "Handle books (low GST), packaging, and marketing material (higher GST) in one invoice",
      "Corporate printing clients billed with GSTIN for input tax credit",
      "Fast invoicing to match your quick printing turnaround",
    ],
    faqs: [
      {
        q: "What GST applies to printing services?",
        a: "Books printed without advertising attract 0% GST. Stationery printing is 12%. Advertising and marketing material printing is 18%. Packaging printing is typically 18%.",
      },
      {
        q: "Can I invoice for printing and design together?",
        a: "Yes. Add printing and design as separate line items with their respective GST rates on the same invoice.",
      },
      {
        q: "How do I handle advance payments for large printing orders?",
        a: "Create an advance receipt invoice when the order is placed, and a final invoice on delivery. Note the advance received in the balance invoice.",
      },
    ],
  },
];

/** Fast lookup by slug */
export const industryMap = new Map<string, Industry>(
  industries.map((i) => [i.slug, i]),
);

/** All unique slugs (used for static generation) */
export const industrySlugs = industries.map((i) => i.slug);

/** Group industries by category */
export const industriesByCategory = industries.reduce<
  Record<IndustryCategory, Industry[]>
>((acc, industry) => {
  const cat = industry.category;
  if (!acc[cat]) acc[cat] = [];
  acc[cat].push(industry);
  return acc;
}, {} as Record<IndustryCategory, Industry[]>);
