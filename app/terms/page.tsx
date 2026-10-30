import { CONSTANTS, generateSEOMetadata } from '@/lib/seo';
import Link from 'next/link';
import {
  FileText,
  AlertCircle,
  CheckCircle,
  CreditCard,
  UserCheck,
  Ban,
  RefreshCw,
  Mail,
  Scale,
  ShieldCheck,
  Gavel,
} from 'lucide-react';

const SITE_URL = `https://${CONSTANTS.DOMAIN}`;
const BRAND = CONSTANTS.BRAND_NAME;
const PAGE_URL = `${SITE_URL}/terms`;

// ---------------------------------------------------------------------------
// METADATA
// ---------------------------------------------------------------------------
export const metadata = generateSEOMetadata(
  'Terms & Conditions',
  `Read the Krooz TV Terms of Service. Clear agreements about subscriptions, our quality guarantee, acceptable use, and US legal jurisdiction.`,
  '/terms'
);

// ---------------------------------------------------------------------------
// JSON-LD
// ---------------------------------------------------------------------------
const TermsSchema = () => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${PAGE_URL}/#webpage`,
        url: PAGE_URL,
        name: `Terms & Conditions | Krooz TV`,
        description: `Krooz TV Terms of Service. Clear agreements about subscriptions, quality guarantee, acceptable use, and US legal jurisdiction.`,
        inLanguage: 'en-US',
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: { '@id': `${SITE_URL}/#organization` },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${PAGE_URL}/#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Terms & Conditions', item: PAGE_URL },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      id="terms-page-schema"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};

// ---------------------------------------------------------------------------
// MAIN PAGE
// ---------------------------------------------------------------------------
export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0b0914] text-[#f4f4f6]">

      <TermsSchema />

      {/* HERO */}
      <section className="relative pt-32 pb-16 overflow-hidden border-b border-[#e5e7eb]/10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(10,37,64,0.4),_transparent_50%)] pointer-events-none" />
        <div
          className="absolute inset-0 opacity-25 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to right, #0a254008 1px, transparent 1px), linear-gradient(to bottom, #0a254008 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10 flex flex-col items-center justify-center">
          <div className="inline-flex items-center gap-2 bg-[#0a2540] px-4 py-2 rounded-full mb-6 shadow-md border border-[#ffd000]/30">
            <Scale className="w-4 h-4 text-[#ffd000]" />
            <span className="text-[#f4f4f6] font-black text-xs uppercase tracking-widest">
              Legal Agreement 🇺🇸
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-[#f4f4f6] uppercase tracking-tighter leading-none mb-6">
            Terms & <span className="text-[#ffd000]">Conditions</span>
          </h1>

          <p className="text-lg md:text-xl text-[#e5e7eb]/85 font-bold max-w-2xl mx-auto leading-relaxed">
            Please read these terms carefully before using the services and streaming subscriptions of Krooz TV.
          </p>

          <p className="text-xs text-[#e5e7eb]/40 mt-4 font-bold uppercase tracking-wider">
            Last updated:{' '}
            {new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <div className="max-w-4xl mx-auto px-4 py-16 w-full">

        {/* Acceptance Box */}
        <div className="bg-[#f4f4f6] border-4 border-[#0a2540] rounded-3xl p-6 md:p-8 mb-12 shadow-xl">
          <div className="flex gap-4 items-start">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-xl bg-[#0a2540]/10 flex items-center justify-center">
                <FileText className="w-6 h-6 text-[#0a2540]" />
              </div>
            </div>
            <div>
              <p className="text-[#0b0914] font-bold text-sm md:text-base leading-relaxed">
                <span className="text-[#0a2540] font-black uppercase tracking-wide block mb-1">
                  Acceptance of Terms:
                </span>
                By purchasing a subscription or using the website and services of Krooz TV, you acknowledge and agree to be bound by these Terms & Conditions as well as our Privacy Policy.
              </p>
            </div>
          </div>
        </div>

        {/* Legal Sections */}
        <div className="space-y-10">

          <section>
            <h2 className="text-2xl md:text-3xl font-black text-[#f4f4f6] uppercase tracking-tight mb-4 flex items-center gap-3">
              <span className="w-2 h-7 bg-[#ffd000] rounded-full inline-block" />
              1. Description of Service
            </h2>
            <p className="text-[#e5e7eb]/85 text-base font-medium leading-relaxed">
              Krooz TV provides digital IPTV streaming services that give subscribers access to live television channels, video on demand (VOD) movies, and TV series via the internet. Our service is intended for personal, non commercial household use only.
            </p>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-black text-[#f4f4f6] uppercase tracking-tight mb-4 flex items-center gap-3">
              <span className="w-2 h-7 bg-[#ffd000] rounded-full inline-block" />
              2. Eligibility & Responsibilities
            </h2>
            <p className="text-[#e5e7eb]/85 text-base font-medium leading-relaxed mb-4">
              By using our services, you represent and warrant that:
            </p>
            <ul className="space-y-3 mb-6">
              {[
                'You are at least 18 years of age and legally capable of entering into a binding agreement.',
                'You provide accurate and up to date information when creating your account.',
                'You keep your personal login credentials and playlist links strictly confidential and do not resell them.',
                'You do not use our service for commercial rebroadcasting or public exhibition.',
                'You have a suitable internet connection (minimum 25 Mbps for smooth 4K streaming).',
              ].map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 text-[#e5e7eb]/85 font-bold text-sm md:text-base"
                >
                  <CheckCircle className="w-5 h-5 text-[#ffd000] flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="bg-[#f4f4f6] border-4 border-[#0a2540] rounded-3xl p-6 my-6 shadow-xl">
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-xl bg-[#0a2540]/10 flex items-center justify-center">
                    <UserCheck className="w-5 h-5 text-[#0a2540]" />
                  </div>
                </div>
                <div>
                  <p className="text-[#0b0914] text-sm font-bold leading-relaxed">
                    <span className="text-[#0a2540] font-black uppercase tracking-wide block mb-0.5">
                      Account Security:
                    </span>
                    You are responsible at all times for all activity that occurs under your account and login credentials.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-black text-[#f4f4f6] uppercase tracking-tight mb-4 flex items-center gap-3">
              <span className="w-2 h-7 bg-[#ffd000] rounded-full inline-block" />
              3. Subscriptions, Pricing & Payment
            </h2>
            <p className="text-[#e5e7eb]/85 text-base font-medium leading-relaxed mb-4">
              Our current subscription options and rates are listed on the Pricing page. Upon purchase, you agree to the following:
            </p>
            <ul className="space-y-3 mb-6">
              {[
                'Payments are made in advance via secure payment methods (Credit Card, PayPal, and Crypto).',
                'Subscriptions are not auto renewed. You decide when to renew.',
                'Your account is activated after successful payment confirmation and our chat guided setup.',
                'All prices are in USD ($) and include all applicable taxes unless explicitly stated otherwise.',
              ].map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 text-[#e5e7eb]/85 font-bold text-sm md:text-base"
                >
                  <CheckCircle className="w-5 h-5 text-[#ffd000] flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="bg-[#f4f4f6] border-4 border-[#0a2540] rounded-3xl p-6 my-6 shadow-xl">
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-xl bg-[#0a2540]/10 flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-[#0a2540]" />
                  </div>
                </div>
                <div>
                  <p className="text-[#0b0914] text-sm font-bold leading-relaxed">
                    <span className="text-[#0a2540] font-black uppercase tracking-wide block mb-0.5">
                      Secure Payment:
                    </span>
                    All transactions are processed via PCI DSS certified payment gateways with 256 bit SSL encryption.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-black text-[#f4f4f6] uppercase tracking-tight mb-4 flex items-center gap-3">
              <span className="w-2 h-7 bg-[#ffd000] rounded-full inline-block" />
              4. Acceptable Use Policy (Fair Use)
            </h2>
            <p className="text-[#e5e7eb]/85 text-base font-medium leading-relaxed mb-4">
              It is strictly forbidden to use the service for:
            </p>
            <ul className="space-y-3 mb-6">
              {[
                'Reselling, restreaming, or cloning your assigned streaming lines.',
                'Streaming on more devices at the same time than your chosen plan allows.',
                'Attempting to reverse engineer, scrape servers, or overload the network (DDoS).',
                'Downloading, permanently recording, or redistributing any digital broadcasts.',
                'Any use that violates applicable US or international law.',
              ].map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 text-[#e5e7eb]/85 font-bold text-sm md:text-base"
                >
                  <Ban className="w-5 h-5 text-[#ffd000] flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="bg-[#f4f4f6] border-4 border-[#0a2540] rounded-3xl p-6 my-6 shadow-xl">
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-xl bg-[#0a2540]/10 flex items-center justify-center">
                    <AlertCircle className="w-6 h-6 text-[#0a2540]" />
                  </div>
                </div>
                <div>
                  <p className="text-[#0b0914] text-sm font-bold leading-relaxed">
                    <span className="text-[#0a2540] font-black uppercase tracking-wide block mb-0.5">
                      Consequences of Violation:
                    </span>
                    In the event of a violation of this Acceptable Use Policy, we reserve the right to immediately suspend the account without refund.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-black text-[#f4f4f6] uppercase tracking-tight mb-4 flex items-center gap-3">
              <span className="w-2 h-7 bg-[#ffd000] rounded-full inline-block" />
              5. Quality Guarantee & Refunds
            </h2>
            <p className="text-[#e5e7eb]/85 text-base font-medium leading-relaxed mb-4">
              We offer a full 7 day quality guarantee. If the service does not work as promised, or you experience technical problems that our team cannot resolve, you may request a full refund within 7 days of purchase by contacting our support team.
            </p>
            <p className="text-[#e5e7eb]/85 text-base font-medium leading-relaxed mb-4">
              This guarantee applies to genuine service problems only. It does not cover change of mind requests, personal preference, local internet issues, or device incompatibility on your end. Full details are available in our{' '}
              <Link href="/refund-policy" className="text-[#ffd000] font-black hover:underline">
                Refund &amp; Guarantee Policy
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-black text-[#f4f4f6] uppercase tracking-tight mb-4 flex items-center gap-3">
              <span className="w-2 h-7 bg-[#ffd000] rounded-full inline-block" />
              6. Availability & Channel Changes
            </h2>
            <p className="text-[#e5e7eb]/85 text-base font-medium leading-relaxed mb-4">
              We strive for constant 99.9% uptime. However, temporary maintenance or external channel changes may occur. Krooz TV reserves the right to:
            </p>
            <ul className="space-y-3 mb-6">
              {[
                'Update or optimise channel lineups and VOD catalogues for better picture quality.',
                'Perform brief scheduled server maintenance outside peak hours.',
                'Adjust pricing for future subscription periods.',
              ].map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 text-[#e5e7eb]/85 font-bold text-sm md:text-base"
                >
                  <RefreshCw className="w-5 h-5 text-[#ffd000] flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-black text-[#f4f4f6] uppercase tracking-tight mb-4 flex items-center gap-3">
              <span className="w-2 h-7 bg-[#ffd000] rounded-full inline-block" />
              7. Intellectual Property & Liability
            </h2>
            <p className="text-[#e5e7eb]/85 text-base font-medium leading-relaxed">
              All trademarks, logos, text, and software code on this website are the intellectual property of Krooz TV. To the maximum extent permitted by US law, Krooz TV is not liable for indirect damages, data loss, or outages caused by third party internet providers or user equipment.
            </p>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-black text-[#f4f4f6] uppercase tracking-tight mb-4 flex items-center gap-3">
              <span className="w-2 h-7 bg-[#ffd000] rounded-full inline-block" />
              8. Governing Law & Jurisdiction
            </h2>
            <div className="bg-[#f4f4f6] border-4 border-[#0a2540] rounded-3xl p-6 my-6 shadow-xl">
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-xl bg-[#0a2540]/10 flex items-center justify-center">
                    <Gavel className="w-5 h-5 text-[#0a2540]" />
                  </div>
                </div>
                <div>
                  <p className="text-[#0b0914] text-sm font-bold leading-relaxed">
                    <span className="text-[#0a2540] font-black uppercase tracking-wide block mb-0.5">
                      Applicable Law:
                    </span>
                    These Terms & Conditions are governed by and construed in accordance with the laws of the State of Delaware, United States, and the federal laws of the United States applicable therein. Any disputes shall be resolved exclusively in the state or federal courts located in Delaware.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-black text-[#f4f4f6] uppercase tracking-tight mb-4 flex items-center gap-3">
              <span className="w-2 h-7 bg-[#ffd000] rounded-full inline-block" />
              9. Changes to These Terms
            </h2>
            <p className="text-[#e5e7eb]/85 text-base font-medium leading-relaxed">
              We reserve the right to modify these Terms & Conditions at any time. Material changes will be announced on our homepage or via chat to active subscribers. Continued use of our services after any update constitutes acceptance of the revised terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-black text-[#f4f4f6] uppercase tracking-tight mb-4 flex items-center gap-3">
              <span className="w-2 h-7 bg-[#ffd000] rounded-full inline-block" />
              10. Contact & Customer Support
            </h2>
            <p className="text-[#e5e7eb]/85 text-base font-medium leading-relaxed mb-4">
              For questions about these Terms & Conditions or support with your subscription, contact our legal and support department:
            </p>
            <div className="bg-[#f4f4f6] border-4 border-[#0a2540] rounded-3xl p-6 my-6 text-center shadow-xl">
              <Mail className="w-8 h-8 text-[#0a2540] mx-auto mb-2" />
              <p className="text-xs uppercase font-black text-[#0b0914]/60 tracking-widest mb-1">
                Legal & Customer Support
              </p>
              <a
                href={`mailto:legal@${CONSTANTS.DOMAIN}`}
                className="text-[#0b0914] font-black text-xl md:text-2xl hover:text-[#0a2540] transition-colors break-all"
              >
                legal@{CONSTANTS.DOMAIN}
              </a>
            </div>
            <p className="text-[#e5e7eb]/85 text-base font-medium leading-relaxed">
              For general customer support, use our 24/7{' '}
              <Link href="/support" className="text-[#ffd000] font-black hover:underline">
                chat support team
              </Link>{' '}
              instead.
            </p>
          </section>
        </div>

        {/* Back link */}
        <div className="mt-16 pt-8 border-t border-[#e5e7eb]/10 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#ffd000] hover:text-[#f4f4f6] transition-colors font-black text-xs uppercase tracking-widest"
          >
            ← Back to homepage
          </Link>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center">
          <p className="text-[#e5e7eb]/40 text-xs font-bold">
            © {new Date().getFullYear()} Krooz TV. All rights reserved. Made in the USA 🇺🇸
          </p>
        </div>
      </div>
    </div>
  );
}