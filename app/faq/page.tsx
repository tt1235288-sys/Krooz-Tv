// app/faq/page.tsx
// ✅ Server Component — no "use client". Full metadata export, hero + static
//    sections server-rendered. Client interactivity isolated to <FaqList />.

import type { Metadata } from 'next';
import Link from 'next/link';
import { CONSTANTS } from '@/lib/seo';
import {
  HelpCircle,
  Sparkles,
  Tv,
  Smartphone,
  Cpu,
  CheckCircle2,
  Wrench,
  LifeBuoy,
  MessageCircle,
  type LucideIcon,
} from 'lucide-react';
import FaqList from './FaqList';
import ShareButtons from '../components/ShareButtons';
import { FlagUS, FlagCA, FlagUK, FlagAU } from '../components/Flags';

const SITE_URL = `https://${CONSTANTS.DOMAIN}`;
const BRAND = CONSTANTS.BRAND_NAME;

// ---------------------------------------------------------------------------
// SEO — non-indexable conversion/utility page per project spec
// ---------------------------------------------------------------------------
export const metadata: Metadata = {
  title: `Krooz TV FAQ — Setup, Billing, Devices | ${BRAND}`,
  description: `Answers to common Krooz TV questions: setup on Smart TV and Firestick, free trials, supported devices, USD payment methods, and 24/7 chat support.`,
  alternates: { canonical: `${SITE_URL}/faq` },
  robots: { index: false, follow: false },
  openGraph: {
    title: `Krooz TV FAQ | ${BRAND}`,
    description: `Everything you need to know about Krooz TV, 4K streaming, Smart TV setup, and secure USD payments.`,
    url: `${SITE_URL}/faq`,
    type: 'website',
  },
};

// ---------------------------------------------------------------------------
// Module-scope constants (no per-render allocation)
// ---------------------------------------------------------------------------
const HERO_GRID_STYLE = {
  backgroundImage: `linear-gradient(to right, #0a2540 1px, transparent 1px), linear-gradient(to bottom, #0a2540 1px, transparent 1px)`,
  backgroundSize: '50px 50px',
} as const;

const RECOMMENDED_DEVICES: readonly {
  icon: LucideIcon;
  title: string;
  desc: string;
  apps: readonly string[];
  speed: string;
}[] = [
  {
    icon: Smartphone,
    title: 'Android & Firestick',
    desc: 'Highest stability and fastest channel zapping.',
    apps: ['IBO Player Pro (Recommended)', 'TiviMate IPTV Player Pro', 'IPTV Smarters Pro'],
    speed: 'Min. Speed: 20 Mbps',
  },
  {
    icon: Tv,
    title: 'Samsung & LG Smart TV',
    desc: 'Stream directly without an external box.',
    apps: ['IBO Player Pro (webOS / Tizen)', 'Smart IPTV (SIPTV)', 'IPTV Smarters Pro'],
    speed: 'Min. Speed: 25 Mbps',
  },
  {
    icon: Cpu,
    title: 'Apple TV & iOS',
    desc: 'Sharp 4K interface built for Apple devices.',
    apps: ['IBO Player Pro (tvOS)', 'GSE Smart IPTV', 'IPTV Smarters Player Lite'],
    speed: 'Min. Speed: 25 Mbps',
  },
];

const TROUBLESHOOTING_STEPS: readonly { n: number; title: string; desc: string }[] = [
  {
    n: 1,
    title: 'Restart Your Router',
    desc: 'Power off your modem and TV for 30 seconds to clear the DNS cache and network congestion.',
  },
  {
    n: 2,
    title: 'Refresh the Playlist',
    desc: 'In your IPTV app, choose Update Playlist or Reload Portal to load new channels and EPG.',
  },
  {
    n: 3,
    title: 'Switch Stream Format',
    desc: 'In your player settings, switch the stream type from TS to HLS for smoother data delivery.',
  },
];

const waLink = (message: string): string =>
  `${CONSTANTS.CONTACT.whatsappUrl}?text=${encodeURIComponent(message)}`;

// ---------------------------------------------------------------------------
// PAGE
// ---------------------------------------------------------------------------
export default function FAQPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0b0914] text-[#f4f4f6] overflow-hidden">

      {/* HERO */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 border-b border-[#e5e7eb]/10 overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#0a2540]/40 blur-[140px] rounded-full" />
          <div className="absolute inset-0 opacity-[0.06]" style={HERO_GRID_STYLE} />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center justify-center">
          <div className="inline-flex items-center gap-2 bg-[#0a2540] px-4 py-2 rounded-full mb-6 shadow-lg border border-[#ffd000]/30">
            <HelpCircle className="w-4 h-4 text-[#ffd000]" aria-hidden="true" />
            <span className="text-[#f4f4f6] font-black text-xs uppercase tracking-widest">
              Help Center &amp; Answers 🇺🇸
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-[#f4f4f6] tracking-tighter uppercase mb-6 leading-none">
            FREQUENTLY ASKED <br className="hidden sm:block" />
            <span className="text-[#ffd000]">QUESTIONS</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-[#e5e7eb]/85 font-bold max-w-2xl mx-auto leading-relaxed mb-8">
            Find instant answers about <span className="text-[#ffd000]">Krooz TV</span>, 4K streaming, Smart TV setup, and secure USD payments.
          </p>

          <div className="w-full flex items-center justify-center mb-8">
            <div className="inline-flex items-center justify-center flex-wrap sm:flex-nowrap gap-2.5 sm:gap-4 px-4 py-2 rounded-full bg-[#0b0914]/60 border border-[#0a2540] shadow-xl backdrop-blur-md">
              <div className="flex items-center gap-1.5 shrink-0">
                <FlagUS />
                <span className="text-[11px] sm:text-xs font-black uppercase text-[#f4f4f6]">USA</span>
              </div>
              <span className="text-[#e5e7eb]/20 text-xs font-black" aria-hidden="true">•</span>
              <div className="flex items-center gap-1.5 shrink-0">
                <FlagCA />
                <span className="text-[11px] sm:text-xs font-black uppercase text-[#f4f4f6]">Canada</span>
              </div>
              <span className="text-[#e5e7eb]/20 text-xs font-black" aria-hidden="true">•</span>
              <div className="flex items-center gap-1.5 shrink-0">
                <FlagUK />
                <span className="text-[11px] sm:text-xs font-black uppercase text-[#f4f4f6]">UK</span>
              </div>
              <span className="text-[#e5e7eb]/20 text-xs font-black" aria-hidden="true">•</span>
              <div className="flex items-center gap-1.5 shrink-0">
                <FlagAU />
                <span className="text-[11px] sm:text-xs font-black uppercase text-[#f4f4f6]">Australia</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ LIST — client leaf (search + tabs + accordion + JSON-LD) */}
      <FaqList />

      {/* RECOMMENDED DEVICES */}
      <section className="py-16 bg-[#0b0914] border-y border-[#e5e7eb]/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-[#0a2540]/60 border border-[#ffd000]/40 px-4 py-1.5 rounded-full mb-4">
              <Sparkles className="w-4 h-4 text-[#ffd000]" aria-hidden="true" />
              <span className="text-[#ffd000] font-black text-xs uppercase tracking-widest">
                Recommended Setup
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#f4f4f6] uppercase tracking-tight mb-3">
              Best <span className="text-[#ffd000]">Devices &amp; Apps</span>
            </h2>
            <p className="text-sm sm:text-base text-[#e5e7eb]/85 font-bold max-w-xl mx-auto">
              The best IPTV players and minimum internet speeds for a buffer free viewing experience in the USA.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {RECOMMENDED_DEVICES.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title}
                  className="group bg-[#f4f4f6] border-2 border-[#0a2540]/30 rounded-2xl p-6 flex flex-col justify-between hover:border-[#0a2540] hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(10,37,64,0.35)] transition-all duration-500"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-[#0a2540]/10 flex items-center justify-center mb-4 group-hover:bg-[#0a2540] transition-colors">
                      <Icon className="w-6 h-6 text-[#0a2540] group-hover:text-[#ffd000] transition-colors" aria-hidden="true" />
                    </div>
                    <h3 className="text-lg font-black text-[#0b0914] uppercase mb-1">{card.title}</h3>
                    <p className="text-xs text-[#0b0914]/60 font-bold mb-4">{card.desc}</p>
                    <ul className="space-y-2 text-xs font-bold text-[#0b0914]/80">
                      {card.apps.map((app) => (
                        <li key={app} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#0a2540] shrink-0" aria-hidden="true" />
                          {app}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-6 pt-4 border-t border-[#0b0914]/10 text-[11px] font-black text-[#0a2540]">
                    {card.speed}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* TROUBLESHOOTING */}
      <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="bg-[#f4f4f6] border-4 border-[#0a2540] rounded-3xl p-8 sm:p-10 shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-[#0a2540] flex items-center justify-center">
              <Wrench className="w-6 h-6 text-[#ffd000]" aria-hidden="true" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0b0914] uppercase tracking-tight">
              Quick Self Help for Small Glitches
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TROUBLESHOOTING_STEPS.map((step) => (
              <div key={step.n} className="p-5 bg-[#f4f4f6] rounded-2xl border border-[#0b0914]/10 shadow-sm">
                <span
                  className="w-8 h-8 rounded-full bg-[#ffd000] text-[#0b0914] font-black text-sm flex items-center justify-center mb-3"
                  aria-hidden="true"
                >
                  {step.n}
                </span>
                <h3 className="font-black text-sm uppercase mb-1 text-[#0b0914]">{step.title}</h3>
                <p className="text-xs font-bold text-[#0b0914]/80 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Share */}
      <div className="w-full flex justify-center items-center my-10">
        <ShareButtons />
      </div>

      {/* SUPPORT CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 w-full">
        <div className="relative rounded-3xl overflow-hidden border-2 border-[#ffd000]/30 bg-gradient-to-br from-[#0a2540] via-[#0b0914] to-[#0a2540] p-8 md:p-12 text-center shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,208,0,0.1),_transparent_70%)] pointer-events-none" aria-hidden="true" />
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-[#ffd000] text-[#0b0914] px-4 py-2 rounded-full mb-4 shadow-md">
              <LifeBuoy className="w-4 h-4" aria-hidden="true" />
              <span className="font-black text-xs uppercase tracking-widest">Personal Help</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-[#f4f4f6] uppercase tracking-tight mb-3">
              Still Have a Specific Question?
            </h2>

            <p className="text-[#e5e7eb]/90 font-bold text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
              Our team is available 24/7 on chat for installation help, channel questions, and free 24 hour trial lines.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
              <a
                href={waLink(`Hi ${BRAND}, I have a question about Krooz TV.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#ffd000] text-[#0b0914] font-black text-xs uppercase tracking-widest hover:bg-[#ffdb33] transition-all hover:scale-105 shadow-xl border-2 border-[#ffd000]"
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" /> Chat Support
              </a>
              <Link
                href="/pricing"
                className="w-full sm:w-auto text-center px-8 py-4 rounded-full bg-[#0a2540] text-[#ffd000] font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform shadow-xl border border-[#ffd000]/40"
              >
                View All Plans
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#ffd000] hover:text-[#f4f4f6] transition-colors font-black text-xs uppercase tracking-widest"
          >
            ← Back to homepage
          </Link>
        </div>
      </section>
    </div>
  );
}