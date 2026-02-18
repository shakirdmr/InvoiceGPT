# InvoiceGPT

**GST invoice generation for Indian businesses.** Create, download, and manage tax-compliant invoices in under a minute.

---

## What it does

- **WYSIWYG invoice editor** — edit directly inside a document-style view. What you see is what downloads.
- **Auto GST calculation** — CGST + SGST computed per line item at 0%, 5%, 12%, 18%, or 28%.
- **PDF generation** — professional Tax Invoice PDF, server-rendered and downloaded instantly.
- **Client management** — save clients, reuse their details on future invoices.
- **Dashboard** — revenue stats, month-over-month charts, recent invoices.
- **Subscription model** — 6 free invoices, then ₹199/mo (Basic) or ₹399/mo (Pro) via Razorpay.

---

## Tech stack

| Layer | Tool |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + shadcn/ui |
| Auth | NextAuth.js v5 — Google OAuth, JWT sessions |
| ORM | Prisma |
| Database | Supabase (PostgreSQL) |
| File storage | Supabase Storage (business logos) |
| PDF | @react-pdf/renderer — server-side via API route |
| Charts | Recharts |
| Payments | Razorpay subscriptions |

---

## Project structure

```
app/
  page.tsx                    # Landing page
  (app)/
    dashboard/                # Stats + revenue chart
    invoices/
      new/                    # Create invoice (WYSIWYG editor)
      [id]/                   # View invoice + download PDF
    clients/                  # Client list
    settings/                 # Business profile + logo
  api/
    business/                 # GET/PATCH business profile
    invoices/
      route.ts                # GET list, POST create
      [id]/
        route.ts              # GET single, PATCH status
        pdf/route.tsx         # GET → generates + streams PDF
    clients/                  # GET list, POST create
    user/me/                  # GET subscription status
    razorpay/                 # Subscription + webhook

components/
  invoice/
    InvoiceForm.tsx           # WYSIWYG invoice editor
    InvoiceActions.tsx        # Download PDF + Mark Paid buttons
  dashboard/
    InvoiceDetailContent.tsx  # Invoice detail page (client-side)
    SettingsForm.tsx          # Business profile form
  pdf/
    InvoicePDF.tsx            # @react-pdf/renderer template

lib/
  auth.ts                     # NextAuth config (JWT strategy)
  prisma.ts                   # Prisma client singleton
  gst.ts                      # calcLineItem, calcInvoiceTotals, numberToWords
  hooks.ts                    # SWR hooks: useBusiness, useClients, useInvoices…
  razorpay.ts                 # TRIAL_INVOICE_LIMIT, plan IDs
```

---

## Local setup

### 1. Clone and install

```bash
git clone <repo>
cd InvoiceGPT
npm install
```

### 2. Environment variables

Create `.env.local`:

```env
# Database (Supabase)
DATABASE_URL="postgresql://..."        # Pooler URL (for queries)
DIRECT_URL="postgresql://..."          # Direct URL (for migrations)

# Auth
NEXTAUTH_SECRET="..."
AUTH_GOOGLE_ID="..."
AUTH_GOOGLE_SECRET="..."

# Supabase Storage (logo uploads)
NEXT_PUBLIC_SUPABASE_URL="https://xxx.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="..."

# Razorpay
RAZORPAY_KEY_ID="..."
RAZORPAY_KEY_SECRET="..."
RAZORPAY_PLAN_ID="..."                 # Pro plan (₹399/mo)
RAZORPAY_WEBHOOK_SECRET="..."
```

### 3. Database

```bash
npm run db:push       # Push schema to Supabase
npm run db:generate   # Regenerate Prisma client
```

### 4. Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Programmatic SEO (6,967 pages)

InvoiceGPT generates thousands of public landing pages from two data files — no manual work per page.

### Route structure

```
/gst-invoice                              ← hub (lists all 38 industries)
/gst-invoice/medical-store                ← 1 page per industry
/gst-invoice/medical-store/mumbai         ← 1 page per industry × city

/guides                                   ← hub (lists all 9 guides)
/guides/how-to-create-gst-invoice         ← 1 page per guide
```

**38 industries × 182 cities = 6,916 city+industry pages** — from two files.

### Data files (`lib/seo/data/`)

| File | Content |
|------|---------|
| `industries.ts` | 38 business types — each with unique pain points, benefits, FAQs |
| `cities.ts` | 182 Indian cities with state, nearby cities, lat/lng |
| `guides.ts` | 9 full GST guides with title, slug, sections, FAQs |

### SEO infrastructure (`lib/seo/`)

| File | Purpose |
|------|---------|
| `config.ts` | Site URL, name, pricing — one source of truth |
| `metadata.ts` | Generates title, description, canonical, OG, Twitter for any page |
| `structured-data.ts` | Generates JSON-LD schemas (Organization, FAQPage, BreadcrumbList, LocalBusiness, Article) |

### SEO components (`components/seo/`)

| Component | Purpose |
|-----------|---------|
| `JsonLd.tsx` | Injects structured data into page `<head>` |
| `Breadcrumbs.tsx` | "Home → GST Invoice → Medical Store → Mumbai" nav |

### Adding content

```
New industry  → add one object to lib/seo/data/industries.ts
               → 1 hub entry + 182 city pages auto-generate

New city      → add one object to lib/seo/data/cities.ts
               → 38 new industry+city pages auto-generate

New guide     → add one object to lib/seo/data/guides.ts
               → 1 guide page auto-generates
```

No template changes. No new routes. Just data.

> When URLs exceed 50,000, switch to `generateSitemaps()` (pattern documented in `app/sitemap.ts`).

---

## Key architectural notes

**PDF generation is server-side.** `@react-pdf/renderer` has persistent issues when bundled for the browser in Next.js 15. All PDF rendering happens in `GET /api/invoices/[id]/pdf` using `renderToBuffer`, which streams the bytes back to the client. The `canvas` webpack alias prevents bundling errors from the optional canvas dependency.

**JWT sessions, not database sessions.** `lib/auth.ts` uses `strategy: "jwt"`. Every `auth()` call in an API route is a crypto check, not a DB query. This eliminates the Supabase free-tier wake-up latency on first load.

**All app pages are static shells.** Every page under `app/(app)/` is `○ (Static)` — data fetches happen client-side via SWR. No server-rendering latency for authenticated routes.

---

## Scripts

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run db:push      # Sync schema → Supabase
npm run db:studio    # Open Prisma Studio
```
