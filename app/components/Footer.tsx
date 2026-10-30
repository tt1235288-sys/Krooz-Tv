// components/Footer.tsx
// ✅ Server Component — no "use client". Zero interactivity.
// ✅ Uses shared flag components from components/Flags.
// ✅ Footer link lists wrapped in <nav> landmarks.
// ✅ Year computed once at module scope (no hydration risk, no per-render).

import Link from 'next/link';
import Image from 'next/image';
import type { ReactElement } from 'react';
import { CONSTANTS } from '@/lib/seo';
import { channelsData } from '@/lib/channels-data';
import { Facebook, Instagram, Twitter, type LucideIcon } from 'lucide-react';
import { FlagUS, FlagCA, FlagUK, FlagAU } from '../components/Flags';

const BRAND = CONSTANTS.BRAND_NAME;
const CURRENT_YEAR = new Date().getFullYear();

// ---------------------------------------------------------------------------
// STATIC DATA — module scope, no per-render allocation
// ---------------------------------------------------------------------------
const NAV_LINKS: readonly { name: string; href: string }[] = [
  { name: 'Home', href: '/' },
  { name: 'Pricing & Plans', href: '/pricing' },
  { name: 'Setup Guide', href: '/setup' },
  { name: 'Reviews & Feedback', href: '/reviews' },
  { name: 'FAQ', href: '/faq' },
  { name: 'Blog & Guide', href: '/blog' },
  { name: 'Support', href: '/support' },
  { name: 'Reseller Program', href: '/reseller' },
];

const LEGAL_LINKS: readonly { name: string; href: string }[] = [
  { name: 'About Us', href: '/about' },
  { name: 'Terms & Conditions', href: '/terms' },
  { name: 'Privacy Policy', href: '/privacy' },
  { name: 'Refund & Guarantee Policy', href: '/refund-policy' },
  { name: 'DMCA Policy', href: '/dmca' },
];

const SERVING_FLAGS: readonly {
  name: string;
  code: string;
  Flag: () => ReactElement;
}[] = [
  { name: 'United States', code: 'US', Flag: FlagUS },
  { name: 'Canada', code: 'CA', Flag: FlagCA },
  { name: 'United Kingdom', code: 'UK', Flag: FlagUK },
  { name: 'Australia', code: 'AU', Flag: FlagAU },
];

const SOCIAL_LINKS: readonly {
  name: string;
  href: string | undefined;
  Icon: LucideIcon;
}[] = [
  { name: 'Twitter', href: CONSTANTS.SOCIALS?.twitter, Icon: Twitter },
  { name: 'Instagram', href: CONSTANTS.SOCIALS?.instagram, Icon: Instagram },
  { name: 'Facebook', href: CONSTANTS.SOCIALS?.facebook, Icon: Facebook },
];

const PAYMENT_METHODS = CONSTANTS.PAYMENT_METHODS ?? [];

// ---------------------------------------------------------------------------
// FOOTER
// ---------------------------------------------------------------------------
export default function Footer() {
  return (
    <footer className="relative bg-[#0b0914] text-[#f4f4f6] pt-16 border-t-4 border-[#ffd000] overflow-hidden">
      {/* Top accent line */}
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#ffd000]/60 to-transparent"
        aria-hidden="true"
      />

      {/* Main body */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10">

          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-5 flex flex-col justify-between">
            <div>
              <Link
                href="/"
                className="flex items-center gap-3 mb-5 group inline-flex focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ffd000]/60 rounded"
                aria-label={`${BRAND} - Home`}
              >
                <div className="w-auto h-12 flex items-center group-hover:scale-105 transition-transform duration-200">
                  <Image
                    src="/img/banner-logo.png"
                    alt={`${BRAND} Logo`}
                    width={180}
                    height={48}
                    className="object-contain h-full w-auto"
                    loading="lazy"
                  />
                </div>
              </Link>

              <p className="text-sm md:text-base font-bold text-[#e5e7eb]/90 max-w-sm leading-relaxed mb-5">
                Experience the future of American television with{' '}
                <strong className="text-[#ffd000]">{BRAND}</strong>. Delivering
                premium 4K IPTV streams across New York, Los Angeles, Chicago,
                Houston, and beyond.
              </p>

              {/* Serving badge */}
              <div className="inline-flex items-center flex-wrap gap-2 sm:gap-3 py-1.5 px-3 mb-6 rounded-full bg-[#f4f4f6]/[0.04] border border-[#ffd000]/40 backdrop-blur-md w-fit shadow-sm">
                <span className="text-[10px] uppercase font-black tracking-wider text-[#e5e7eb]/70 shrink-0">
                  Serving:
                </span>
                <div className="flex items-center gap-2 sm:gap-2.5 shrink-0 flex-wrap">
                  {SERVING_FLAGS.map(({ name, code, Flag }) => (
                    <div
                      key={code}
                      className="flex items-center gap-1 group cursor-default"
                    >
                      <Flag />
                      <span className="text-[10px] font-black uppercase text-[#f4f4f6] group-hover:text-[#ffd000] transition-colors">
                        <span className="sr-only">{name}</span>
                        <span aria-hidden="true">{code}</span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map(({ name, href, Icon }) =>
                href ? (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow ${BRAND} on ${name}`}
                    className="group w-10 h-10 rounded-full bg-[#f4f4f6]/[0.05] border border-[#e5e7eb]/15 flex items-center justify-center hover:bg-[#ffd000] hover:border-[#ffd000] transition-all duration-300 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ffd000]/60"
                  >
                    <Icon
                      className="w-4 h-4 text-[#e5e7eb]/80 group-hover:text-[#0b0914] transition-colors"
                      aria-hidden="true"
                    />
                  </a>
                ) : null
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav
            aria-labelledby="footer-nav-heading"
            className="lg:col-span-2"
          >
            <h3
              id="footer-nav-heading"
              className="text-[#f4f4f6] font-black mb-5 tracking-widest uppercase text-sm border-b-2 border-[#ffd000] pb-1 inline-block"
            >
              Navigation
            </h3>
            <ul className="space-y-3 text-sm font-bold">
              {NAV_LINKS.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-[#e5e7eb]/80 hover:text-[#ffd000] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ffd000]/60 rounded"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Channel Packages */}
          <nav
            aria-labelledby="footer-channels-heading"
            className="lg:col-span-3"
          >
            <h3
              id="footer-channels-heading"
              className="text-[#f4f4f6] font-black mb-5 tracking-widest uppercase text-sm border-b-2 border-[#ffd000] pb-1 inline-block"
            >
              Channel Packages
            </h3>
            <ul className="space-y-3 text-sm font-bold">
              {channelsData.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/channels/${category.slug}`}
                    className="text-[#e5e7eb]/80 hover:text-[#ffd000] transition-colors block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ffd000]/60 rounded"
                  >
                    {category.name.replace(/\s*\([^)]*\)/g, '')}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Legal */}
          <nav
            aria-labelledby="footer-legal-heading"
            className="lg:col-span-2"
          >
            <h3
              id="footer-legal-heading"
              className="text-[#f4f4f6] font-black mb-5 tracking-widest uppercase text-sm border-b-2 border-[#ffd000] pb-1 inline-block"
            >
              Legal
            </h3>
            <ul className="space-y-3 text-sm font-bold">
              {LEGAL_LINKS.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-[#e5e7eb]/80 hover:text-[#ffd000] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ffd000]/60 rounded"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t-2 border-[#ffd000]/40 py-6 px-6 lg:px-12 shadow-lg z-20 bg-[#0a2540]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5">
          <p className="text-base md:text-sm font-extrabold text-[#f4f4f6] tracking-wide text-center md:text-left drop-shadow-sm">
            © {CURRENT_YEAR} <span className="text-[#ffd000]">{BRAND}</span>. All rights reserved.
          </p>

          <div className="flex items-center gap-3 flex-wrap justify-center">
            {PAYMENT_METHODS.map((item) => (
              <div
                key={item.name}
                className="relative h-10 w-16 shrink-0 rounded-lg border border-[#ffd000]/50 bg-[#0b0914] backdrop-blur-sm p-1 shadow-sm hover:scale-105 hover:bg-[#ffd000]/30 hover:border-[#ffd000] transition-all duration-200"
                title={item.name}
              >
                <Image
                  src={item.icon}
                  alt={item.name}
                  fill
                  className="object-contain p-1 filter drop-shadow-sm opacity-95"
                  loading="lazy"
                  sizes="64px"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}