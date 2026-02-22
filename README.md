# InvoiceGPT

GST invoice generation for Indian businesses — create, download, and manage tax-compliant invoices in under a minute.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + shadcn/ui |
| Auth | NextAuth.js v5 (Google OAuth, JWT) |
| Database | PostgreSQL (Supabase) |
| ORM | Prisma |
| Storage | Supabase Storage |
| PDF | @react-pdf/renderer |
| Charts | Recharts |
| Payments | Razorpay |

## Features

- **WYSIWYG Invoice Editor** — edit directly inside a document-style view with multiple line items, auto-generated invoice numbers, and client selection
- **Auto GST Calculation** — CGST + SGST computed per line item at 0%, 5%, 12%, 18%, or 28%
- **PDF Generation** — professional Tax Invoice PDF with GSTIN details, line-item tax breakdown, and total in words (Indian number system)
- **Client Management** — save clients with GSTIN, address, and contact details for reuse across invoices
- **Dashboard** — revenue stats, 6-month revenue chart, recent invoices at a glance
- **Business Settings** — company profile, GSTIN, address, and logo upload with in-browser cropping
- **Subscriptions** — 6 free invoices on trial, then paid plans via Razorpay
- **Programmatic SEO** — 6,900+ auto-generated landing pages from industry and city data files
- **Google OAuth** — one-click sign-in with JWT sessions (no DB round-trip on auth)

## Setup

### 1. Install

```bash
git clone <repo-url>
cd InvoiceGPT
npm install
```

### 2. Environment Variables

Create `.env.local`:

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

### 3. Database

```bash
npm run db:push        # Push schema to Supabase
npm run db:generate    # Generate Prisma client
```

### 4. Run

```bash
npm run dev            # → http://localhost:3000
```

## Folder Structure

```
app/
├── (app)/                        # Authenticated routes
│   ├── dashboard/                # Revenue stats + chart
│   ├── invoices/new/             # WYSIWYG invoice editor
│   ├── invoices/[id]/            # Invoice detail + PDF download
│   ├── clients/                  # Client list + add
│   └── settings/                 # Business profile + logo
├── (marketing)/                  # Public SEO pages
│   ├── gst-invoice/              # Industry + city landing pages
│   └── guides/                   # GST guide articles
├── api/
│   ├── invoices/                 # CRUD + PDF generation
│   ├── clients/                  # CRUD
│   ├── business/                 # Profile endpoints
│   ├── razorpay/                 # Subscription + webhook
│   └── user/me/                  # Subscription status
├── login/                        # Sign-in page
├── onboarding/                   # First-time business setup
└── subscribe/                    # Upgrade page

components/
├── invoice/                      # InvoiceForm, InvoiceActions
├── dashboard/                    # App UI components
├── pdf/                          # react-pdf invoice template
├── seo/                          # JsonLd, Breadcrumbs
└── ui/                           # shadcn/ui primitives

lib/
├── auth.ts                       # NextAuth config
├── prisma.ts                     # Prisma client
├── gst.ts                        # GST calculation + numberToWords
├── hooks.ts                      # SWR data hooks
├── razorpay.ts                   # Razorpay client + plan config
├── supabase.ts                   # Storage client + logo upload
└── seo/                          # Metadata, structured data, content
```

## Scripts

```bash
npm run dev            # Start dev server
npm run build          # Production build
npm run db:push        # Sync Prisma schema → database
npm run db:studio      # Open Prisma Studio GUI
npm run db:generate    # Regenerate Prisma client
```

## Roadmap

- [ ] Multi-currency support
- [ ] Email invoices directly to clients
- [ ] Recurring invoices
- [ ] Expense tracking
- [ ] GST return export (GSTR-1)
- [ ] Mobile-responsive invoice editor
- [ ] Team/multi-user access
- [ ] Invoice templates & customization
