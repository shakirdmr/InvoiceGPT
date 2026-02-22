# InvoiceGPT

GST invoice generation for Indian businesses — create, download, and manage tax-compliant invoices in under a minute.

[![Next.js](https://img.shields.io/badge/Framework-Next.js%2015-000000?logo=nextdotjs&logoColor=fff)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript-3178C6?logo=typescript&logoColor=fff)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/CSS-Tailwind-38BDF8?logo=tailwindcss&logoColor=fff)](https://tailwindcss.com/)
[![shadcn/ui](https://img.shields.io/badge/UI-shadcn%2Fui-000000?logo=shadcnui&logoColor=fff)](https://ui.shadcn.com/)
[![NextAuth.js](https://img.shields.io/badge/Auth-NextAuth.js%20v5-7C3AED)](https://next-auth.js.org/)
[![Prisma](https://img.shields.io/badge/ORM-Prisma-2D3748?logo=prisma&logoColor=fff)](https://www.prisma.io/)
[![Supabase](https://img.shields.io/badge/Database-Supabase-3FCF8E?logo=supabase&logoColor=fff)](https://supabase.com/)
[![Razorpay](https://img.shields.io/badge/Payments-Razorpay-0C2451?logo=razorpay&logoColor=fff)](https://razorpay.com/)
[![react-pdf](https://img.shields.io/badge/PDF-react--pdf-EC5990)](https://react-pdf.org/)
[![Recharts](https://img.shields.io/badge/Charts-Recharts-FF6384)](https://recharts.org/)

---

## ✨ Features

- **WYSIWYG invoice editor** — edit directly inside a document-style view, what you see is what downloads
- **Auto GST calculation** — CGST + SGST computed per line item at **0%, 5%, 12%, 18%, or 28%**
- **PDF generation** — professional Tax Invoice with GSTIN details, tax breakdown, and total in words
- **Client management** — save clients with GSTIN, address, and contact details for reuse
- **Dashboard** — revenue stats, **6-month chart**, recent invoices at a glance
- **Business settings** — company profile, GSTIN, and logo upload with **in-browser cropping**
- **Subscriptions** — 6 free invoices on trial, then paid plans via Razorpay
- **Programmatic SEO** — **6,900+ pages** auto-generated from industry and city data files
- **Google OAuth** — one-click sign-in with JWT sessions (no DB round-trip)

---

## 🗂️ Project Structure

```
InvoiceGPT/
│
├── app/
│   ├── (app)/                        # Authenticated routes
│   │   ├── dashboard/                # Revenue stats + chart
│   │   ├── invoices/new/             # WYSIWYG invoice editor
│   │   ├── invoices/[id]/            # Invoice detail + PDF download
│   │   ├── clients/                  # Client list + add
│   │   └── settings/                 # Business profile + logo
│   ├── (marketing)/                  # Public SEO pages
│   │   ├── gst-invoice/              # Industry + city landing pages
│   │   └── guides/                   # GST guide articles
│   ├── api/
│   │   ├── invoices/                 # CRUD + PDF generation
│   │   ├── clients/                  # CRUD
│   │   ├── business/                 # Profile endpoints
│   │   ├── razorpay/                 # Subscription + webhook
│   │   └── user/me/                  # Subscription status
│   ├── login/                        # Sign-in page
│   ├── onboarding/                   # First-time business setup
│   └── subscribe/                    # Upgrade page
│
├── components/
│   ├── invoice/                      # InvoiceForm, InvoiceActions
│   ├── dashboard/                    # App UI components
│   ├── pdf/                          # react-pdf invoice template
│   ├── seo/                          # JsonLd, Breadcrumbs
│   └── ui/                           # shadcn/ui primitives
│
├── lib/
│   ├── auth.ts                       # NextAuth config
│   ├── prisma.ts                     # Prisma client singleton
│   ├── gst.ts                        # GST calculation + numberToWords
│   ├── hooks.ts                      # SWR data hooks
│   ├── razorpay.ts                   # Razorpay client + plan config
│   ├── supabase.ts                   # Storage client + logo upload
│   └── seo/                          # Metadata, structured data, content
│
├── prisma/
│   └── schema.prisma                 # Database schema
├── middleware.ts                      # Auth route guard
└── package.json
```

---

## ⚙️ Setup (Local)

### 1) Clone & Install

```bash
git clone <repo-url>
cd InvoiceGPT
npm install
```

---

### 2) Environment Variables

**`.env.local`**

```env
# Database (Supabase)
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."

# Auth
NEXTAUTH_SECRET="..."
AUTH_GOOGLE_ID="..."
AUTH_GOOGLE_SECRET="..."

# Supabase Storage
NEXT_PUBLIC_SUPABASE_URL="https://xxx.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="..."

# Razorpay
RAZORPAY_KEY_ID="..."
RAZORPAY_KEY_SECRET="..."
RAZORPAY_PLAN_ID="..."
RAZORPAY_WEBHOOK_SECRET="..."
```

---

### 3) Database

```bash
npm run db:push        # Push schema to Supabase
npm run db:generate    # Generate Prisma client
```

---

### 4) Run

```bash
npm run dev
```

Open the app:

```
http://localhost:3000
```

---

## 📜 Scripts

```bash
npm run dev            # Start dev server
npm run build          # Production build
npm run db:push        # Sync Prisma schema → database
npm run db:studio      # Open Prisma Studio GUI
npm run db:generate    # Regenerate Prisma client
```

---

## 🛣️ Roadmap

- [ ] Multi-currency support
- [ ] Email invoices directly to clients
- [ ] Recurring invoices
- [ ] Expense tracking
- [ ] GST return export (GSTR-1)
- [ ] Mobile-responsive invoice editor
- [ ] Team / multi-user access
- [ ] Invoice templates & customization

