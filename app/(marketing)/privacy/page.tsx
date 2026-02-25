import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — InvoiceGPT",
  description:
    "Learn how InvoiceGPT collects, stores, and protects your data. We are committed to safeguarding the privacy of Indian shopkeepers and small businesses.",
  openGraph: {
    title: "Privacy Policy — InvoiceGPT",
    description:
      "Learn how InvoiceGPT collects, stores, and protects your data.",
    url: "https://invoicegpt.org/privacy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-white">
      {/* ── HEADER ── */}
      <section className="pt-20 pb-10 px-4 bg-gray-50 border-b border-gray-100">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Privacy Policy
          </h1>
          <p className="text-gray-500">
            Last updated: February 23, 2026
          </p>
        </div>
      </section>

      {/* ── BODY ── */}
      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto prose-container">
          {/* Introduction */}
          <div className="mb-10">
            <p className="text-gray-600 leading-relaxed">
              At <strong>InvoiceGPT</strong> (&quot;we&quot;, &quot;our&quot;,
              or &quot;us&quot;), we take your privacy seriously. This Privacy
              Policy explains how we collect, use, store, and share your
              personal information when you use our website at{" "}
              <Link
                href="https://invoicegpt.org"
                className="text-gray-900 underline underline-offset-2"
              >
                invoicegpt.org
              </Link>{" "}
              and our GST invoice generation services (collectively, the
              &quot;Service&quot;).
            </p>
            <p className="text-gray-600 leading-relaxed mt-3">
              By using InvoiceGPT, you agree to the collection and use of your
              information as described in this policy. If you do not agree,
              please do not use our Service.
            </p>
          </div>

          {/* 1. Data we collect */}
          <PolicySection number="1" title="Information We Collect">
            <p>
              We collect different types of information to provide and improve
              our Service:
            </p>

            <h4 className="font-semibold text-gray-900 mt-5 mb-2">
              a) Information you provide directly
            </h4>
            <ul>
              <li>
                <strong>Account information:</strong> When you sign in with
                Google, we receive your name, email address, and profile
                picture from Google OAuth.
              </li>
              <li>
                <strong>Business details:</strong> Business name, GSTIN
                number, address, phone number, email, and business logo that
                you enter in your settings.
              </li>
              <li>
                <strong>Client data:</strong> Names, GSTIN numbers, addresses,
                phone numbers, and email addresses of your customers that you
                save for invoice creation.
              </li>
              <li>
                <strong>Invoice data:</strong> Line items, descriptions,
                quantities, rates, GST rates, and totals for each invoice you
                create.
              </li>
            </ul>

            <h4 className="font-semibold text-gray-900 mt-5 mb-2">
              b) Information collected automatically
            </h4>
            <ul>
              <li>
                <strong>Usage data:</strong> Pages visited, features used,
                number of invoices created, and general interaction patterns
                with our Service.
              </li>
              <li>
                <strong>Device information:</strong> Browser type, operating
                system, screen resolution, and device type (mobile/desktop).
              </li>
              <li>
                <strong>Cookies:</strong> We use essential cookies to maintain
                your authentication session. We do not use tracking or
                advertising cookies.
              </li>
            </ul>

            <h4 className="font-semibold text-gray-900 mt-5 mb-2">
              c) Payment information
            </h4>
            <ul>
              <li>
                Subscription payments are processed by{" "}
                <strong>Razorpay</strong>. We do not store your credit card,
                debit card, or UPI details. Razorpay handles all payment
                information securely under their own{" "}
                <a
                  href="https://razorpay.com/privacy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-900 underline underline-offset-2"
                >
                  privacy policy
                </a>
                . We only store your Razorpay subscription ID to track your
                plan status.
              </li>
            </ul>
          </PolicySection>

          {/* 2. How we use your data */}
          <PolicySection number="2" title="How We Use Your Data">
            <p>We use the information we collect to:</p>
            <ul>
              <li>
                <strong>Provide our Service:</strong> Create and store your
                GST invoices, manage your clients, and generate PDF documents.
              </li>
              <li>
                <strong>Authenticate your account:</strong> Verify your
                identity through Google OAuth and maintain your session.
              </li>
              <li>
                <strong>Process subscriptions:</strong> Manage your free trial
                and paid subscription through Razorpay.
              </li>
              <li>
                <strong>Improve the Service:</strong> Understand usage
                patterns to make InvoiceGPT faster, simpler, and more useful.
              </li>
              <li>
                <strong>Communicate with you:</strong> Send important updates
                about your account, service changes, or security notices.
              </li>
              <li>
                <strong>Comply with legal obligations:</strong> Retain records
                as required by Indian tax and business regulations.
              </li>
            </ul>
            <p className="mt-4">
              We <strong>do not</strong> use your data for advertising,
              profiling, or selling to third parties. Your business data is
              used solely to deliver the Service to you.
            </p>
          </PolicySection>

          {/* 3. How we store and protect your data */}
          <PolicySection number="3" title="How We Store &amp; Protect Your Data">
            <ul>
              <li>
                <strong>Database:</strong> Your data is stored in a secure
                PostgreSQL database hosted on{" "}
                <a
                  href="https://supabase.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-900 underline underline-offset-2"
                >
                  Supabase
                </a>
                , which provides enterprise-grade security, encryption at rest,
                and encryption in transit (TLS/SSL).
              </li>
              <li>
                <strong>File storage:</strong> Business logos are stored on
                Supabase Storage with access controls ensuring only
                authenticated users can upload or access their own files.
              </li>
              <li>
                <strong>Authentication:</strong> We use{" "}
                <strong>NextAuth.js</strong> with JWT-based sessions. Passwords
                are never stored — authentication is handled entirely through
                Google&apos;s OAuth 2.0 protocol.
              </li>
              <li>
                <strong>Encryption:</strong> All data transmitted between your
                browser and our servers is encrypted using HTTPS (TLS 1.2+).
              </li>
              <li>
                <strong>Access control:</strong> Your invoices, client data,
                and business details are only accessible to your authenticated
                account. No other user can view or modify your data.
              </li>
            </ul>
            <p className="mt-4">
              While we implement industry-standard security measures, no system
              is 100% secure. We continuously monitor and improve our security
              practices.
            </p>
          </PolicySection>

          {/* 4. How we share your data */}
          <PolicySection number="4" title="How We Share Your Data">
            <p>
              We <strong>do not sell, rent, or trade</strong> your personal
              information to any third party. We share data only in the
              following limited circumstances:
            </p>
            <ul>
              <li>
                <strong>Google (Authentication):</strong> We use Google OAuth
                for sign-in. Google receives standard authentication requests
                but does not have access to your invoice or business data
                stored in InvoiceGPT.
              </li>
              <li>
                <strong>Razorpay (Payments):</strong> When you subscribe to a
                paid plan, your payment is processed by Razorpay. We share
                your email and subscription plan details with Razorpay to
                create and manage your subscription.
              </li>
              <li>
                <strong>Supabase (Infrastructure):</strong> Your data is
                hosted on Supabase servers. Supabase acts as a data processor
                and does not use your data for any purpose other than
                providing hosting services.
              </li>
              <li>
                <strong>Legal requirements:</strong> We may disclose your
                information if required by law, court order, or government
                regulation applicable in India.
              </li>
            </ul>
            <p className="mt-4">
              We <strong>never</strong> share your client list, invoice
              details, revenue figures, or GSTIN information with any third
              party for marketing or commercial purposes.
            </p>
          </PolicySection>

          {/* 5. Data retention */}
          <PolicySection number="5" title="Data Retention">
            <ul>
              <li>
                <strong>Account data:</strong> We retain your account and
                business data for as long as your account is active.
              </li>
              <li>
                <strong>Invoices:</strong> Your invoices are retained
                indefinitely while your account exists, so you always have
                access to your billing history.
              </li>
              <li>
                <strong>Deleted accounts:</strong> If you request account
                deletion, we will permanently delete all your personal data,
                business information, invoices, and client data within 30 days
                of your request.
              </li>
              <li>
                <strong>Backups:</strong> Automated database backups may
                retain deleted data for up to 30 additional days before being
                permanently purged.
              </li>
            </ul>
          </PolicySection>

          {/* 6. Your rights */}
          <PolicySection number="6" title="Your Rights">
            <p>As a user of InvoiceGPT, you have the right to:</p>
            <ul>
              <li>
                <strong>Access your data:</strong> View all personal data we
                hold about you through your account settings and dashboard.
              </li>
              <li>
                <strong>Update your data:</strong> Edit your business details,
                client information, and profile at any time.
              </li>
              <li>
                <strong>Export your data:</strong> Download your invoices as
                PDF documents at any time.
              </li>
              <li>
                <strong>Delete your data:</strong> Request complete deletion
                of your account and all associated data by contacting us.
              </li>
              <li>
                <strong>Withdraw consent:</strong> You can stop using the
                Service at any time. Revoking Google OAuth access will prevent
                future sign-ins.
              </li>
            </ul>
          </PolicySection>

          {/* 7. Cookies */}
          <PolicySection number="7" title="Cookies">
            <p>We use only essential cookies required for:</p>
            <ul>
              <li>
                <strong>Authentication:</strong> Maintaining your sign-in
                session so you don&apos;t have to log in on every page.
              </li>
              <li>
                <strong>Security:</strong> CSRF protection tokens to keep your
                account safe.
              </li>
            </ul>
            <p className="mt-4">
              We do <strong>not</strong> use advertising cookies, analytics
              cookies, or third-party tracking scripts. Your browsing activity
              on InvoiceGPT is not shared with advertisers.
            </p>
          </PolicySection>

          {/* 8. Third-party services */}
          <PolicySection number="8" title="Third-Party Services">
            <p>
              Our Service integrates with the following third-party providers.
              Each has their own privacy policy governing your data:
            </p>
            <div className="mt-4 space-y-3">
              {thirdParties.map((tp) => (
                <div
                  key={tp.name}
                  className="bg-gray-50 rounded-xl p-4 border border-gray-100"
                >
                  <div className="flex items-center justify-between mb-1">
                    <strong className="text-gray-900">{tp.name}</strong>
                    <span className="text-xs text-gray-400">{tp.purpose}</span>
                  </div>
                  <a
                    href={tp.policyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-500 underline underline-offset-2 hover:text-gray-700"
                  >
                    {tp.policyUrl}
                  </a>
                </div>
              ))}
            </div>
          </PolicySection>

          {/* 9. Children's privacy */}
          <PolicySection number="9" title="Children&apos;s Privacy">
            <p>
              InvoiceGPT is designed for business use and is not intended for
              children under 18 years of age. We do not knowingly collect
              personal information from minors. If you believe a child has
              provided us with personal data, please contact us and we will
              promptly delete it.
            </p>
          </PolicySection>

          {/* 10. Changes to this policy */}
          <PolicySection number="10" title="Changes to This Policy">
            <p>
              We may update this Privacy Policy from time to time to reflect
              changes in our practices or for legal reasons. When we make
              significant changes, we will notify you by updating the
              &quot;Last updated&quot; date at the top of this page. We
              encourage you to review this policy periodically.
            </p>
          </PolicySection>

          {/* 11. Contact us */}
          <PolicySection number="11" title="Contact Us">
            <p>
              If you have any questions about this Privacy Policy, your data,
              or wish to exercise your rights, please contact us:
            </p>
            <div className="mt-4 bg-gray-50 rounded-xl p-5 border border-gray-100">
              <p className="font-semibold text-gray-900 mb-2">InvoiceGPT</p>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>
                  Email:{" "}
                  <a
                    href="mailto:privacy@invoicegpt.org"
                    className="text-gray-900 underline underline-offset-2"
                  >
                    privacy@invoicegpt.org
                  </a>
                </li>
                <li>
                  Website:{" "}
                  <Link
                    href="/"
                    className="text-gray-900 underline underline-offset-2"
                  >
                    invoicegpt.org
                  </Link>
                </li>
              </ul>
            </div>
          </PolicySection>
        </div>
      </section>
    </div>
  );
}

// ── COMPONENTS ──

function PolicySection({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-10">
      <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
        <span className="w-8 h-8 bg-gray-900 text-white rounded-lg flex items-center justify-center text-sm font-bold shrink-0">
          {number}
        </span>
        {title}
      </h2>
      <div className="text-gray-600 leading-relaxed space-y-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_ul]:mt-3 [&_a]:text-gray-900 [&_a]:underline [&_a]:underline-offset-2">
        {children}
      </div>
    </div>
  );
}

// ── DATA ──

const thirdParties = [
  {
    name: "Google",
    purpose: "Authentication (OAuth)",
    policyUrl: "https://policies.google.com/privacy",
  },
  {
    name: "Razorpay",
    purpose: "Payment Processing",
    policyUrl: "https://razorpay.com/privacy/",
  },
  {
    name: "Supabase",
    purpose: "Database & Storage",
    policyUrl: "https://supabase.com/privacy",
  },
];
