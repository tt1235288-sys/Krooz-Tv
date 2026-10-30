'use client';

import { useState } from 'react';
import { FadeIn, FadeInStagger, FadeInItem } from './AnimatedSection';
import { CONSTANTS } from '@/lib/seo';
import {
  CheckCircle2,
  Zap,
  Crown,
  MonitorPlay,
  Gift,
  Sparkles,
  Flame,
  ShieldCheck,
  Lock,
} from 'lucide-react';

// ---------------------------------------------------------------------------
// Module-scope constants — no re-allocation on render
// ---------------------------------------------------------------------------
const DEVICE_OPTIONS = [1, 2, 3] as const;
type DeviceCount = (typeof DEVICE_OPTIONS)[number];
type Duration = 3 | 6 | 12;

const PRICING: Record<DeviceCount, Record<Duration, { total: number; mo: string }>> = {
  1: {
    3: { total: 39, mo: (39 / 3).toFixed(2) },
    6: { total: 49, mo: (49 / 6).toFixed(2) },
    12: { total: 69, mo: (69 / 12).toFixed(2) },
  },
  2: {
    3: { total: 45, mo: (45 / 3).toFixed(2) },
    6: { total: 65, mo: (65 / 6).toFixed(2) },
    12: { total: 89, mo: (89 / 12).toFixed(2) },
  },
  3: {
    3: { total: 59, mo: (59 / 3).toFixed(2) },
    6: { total: 79, mo: (79 / 6).toFixed(2) },
    12: { total: 99, mo: (99 / 12).toFixed(2) },
  },
};

const STANDARD_FEATURES = [
  '4K Ultra HD & 60FPS Sports Feeds',
  '36,000+ Live Channels (US, CA, UK, INTL)',
  '120,000+ Movies & TV Shows (Updated Daily)',
  'NFL Sunday, NBA, MLB, NHL & College Football',
  '7 Day US Catch Up & Full EPG Guide',
  'Anti Freeze US Edge Servers',
  'Smart TV, Firestick, iOS, Android, Shield',
  '24/7 Priority Support via Live Chat',
] as const;

const VIP_FEATURES = [
  'Ultra HD 4K & Pure Full HD Quality',
  '36,000+ Premium Live Channels',
  '120,000+ Movies & TV Shows (Updated Daily)',
  'NFL, NBA, ESPN, HBO, Showtime & All PPVs',
  '7 Day Catch Up & Electronic Program Guide',
  'Dedicated New York & Los Angeles Server Line',
  'Smart TV, Firestick, Apple TV, iOS, Android',
  '24/7 VIP Priority Support via Live Chat',
] as const;

const FREE_TRIAL_MESSAGE =
  "Hi! I would like to request a free 24-hour trial to test the Krooz TV sports, movies and live TV streaming quality on my device before I subscribe.";

// ---------------------------------------------------------------------------
// Payment Method SVG Icons — US & Global Standard
// ---------------------------------------------------------------------------
const SHELL_STYLES = {
  light: { bg: '#FFFFFF', border: '#E4E4E7' },
  dark: { bg: '#0b0914', border: 'rgba(255,208,0,0.35)' },
} as const;

function PaymentShell({
  variant,
  children,
}: {
  variant: 'light' | 'dark';
  children: React.ReactNode;
}) {
  const { bg, border } = SHELL_STYLES[variant];
  return (
    <div
      className="flex items-center justify-center h-8 w-12 rounded-md overflow-hidden shrink-0 transition-transform duration-300 hover:scale-110"
      style={{ backgroundColor: bg, border: `1px solid ${border}` }}
    >
      {children}
    </div>
  );
}

const PaymentIcons = ({ variant = 'light' }: { variant?: 'light' | 'dark' }) => {
  const isDark = variant === 'dark';
  return (
    <div className="grid grid-cols-5 gap-2 items-center">
      <PaymentShell variant={variant}>
        <svg viewBox="0 0 48 32" className="h-5 w-auto" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <text x="24" y="22" textAnchor="middle" fontFamily="Helvetica, Arial, sans-serif" fontSize="14" fontWeight="900" fontStyle="italic" fill={isDark ? '#FFFFFF' : '#1434CB'} letterSpacing="-0.5">VISA</text>
        </svg>
      </PaymentShell>

      <PaymentShell variant={variant}>
        <svg viewBox="0 0 48 32" className="h-5 w-auto" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <circle cx="19" cy="16" r="9" fill="#EB001B" />
          <circle cx="29" cy="16" r="9" fill="#F79E1B" />
          <path d="M24 8.5a9 9 0 000 15 9 9 0 000-15z" fill="#FF5F00" />
        </svg>
      </PaymentShell>

      <PaymentShell variant={variant}>
        <svg viewBox="0 0 48 32" className="h-5 w-auto" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <text x="24" y="21" textAnchor="middle" fontFamily="Helvetica, Arial, sans-serif" fontSize="11" fontWeight="900" fontStyle="italic" fill="#003087">Pay</text>
          <text x="24" y="27" textAnchor="middle" fontFamily="Helvetica, Arial, sans-serif" fontSize="9" fontWeight="800" fontStyle="italic" fill="#0079C1">Pal</text>
        </svg>
      </PaymentShell>

      <PaymentShell variant={variant}>
        <svg viewBox="0 0 48 32" className="h-5 w-auto" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <circle cx="24" cy="16" r="10" fill="#F7931A" />
          <text x="24" y="21" textAnchor="middle" fontFamily="Helvetica, Arial, sans-serif" fontSize="14" fontWeight="900" fill="#FFFFFF">₿</text>
        </svg>
      </PaymentShell>

      <PaymentShell variant={variant}>
        <svg viewBox="0 0 48 32" className="h-5 w-auto" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <text x="24" y="21" textAnchor="middle" fontFamily="Helvetica, Arial, sans-serif" fontSize="11" fontWeight="800" fill={isDark ? '#FFFFFF' : '#5F6368'}>GPay</text>
        </svg>
      </PaymentShell>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Feature list renderer — avoids duplicating the same <ul> markup 3×
// ---------------------------------------------------------------------------
function FeatureList({
  devices,
  features,
  theme,
}: {
  devices: DeviceCount;
  features: readonly string[];
  theme: 'standard' | 'gold';
}) {
  const isGold = theme === 'gold';
  const checkWrap = isGold
    ? 'bg-[#ffd000]/20 p-0.5 rounded-full border border-[#ffd000]/40'
    : '';
  const checkColor = isGold ? 'text-[#ffd000]' : 'text-[#0a2540]';
  const textColor = isGold ? 'text-[#f4f4f6]' : 'text-[#0b0914]/85';

  return (
    <ul className="w-full space-y-3.5 flex-grow relative mb-6">
      {/* Dynamic device-count line first */}
      <li className={`flex items-center gap-3 text-sm font-semibold ${textColor}`}>
        {isGold ? (
          <div className={checkWrap}>
            <CheckCircle2 className={`w-4 h-4 ${checkColor} flex-shrink-0`} />
          </div>
        ) : (
          <CheckCircle2 className={`w-4 h-4 ${checkColor} flex-shrink-0`} />
        )}
        <span>{devices} Simultaneous {devices > 1 ? 'Screens' : 'Connection'}</span>
      </li>
      {features.map((feature, idx) => (
        <li key={feature} className={`flex items-center gap-3 text-sm font-semibold ${textColor}`}>
          {isGold ? (
            <div className={checkWrap}>
              <CheckCircle2 className={`w-4 h-4 ${checkColor} flex-shrink-0`} />
            </div>
          ) : (
            <CheckCircle2 className={`w-4 h-4 ${checkColor} flex-shrink-0`} />
          )}
          <span className={isGold ? 'text-[#f4f4f6]' : ''}>{feature}</span>
          {isGold && idx === 3 && (
            <span className="bg-[#ffd000]/20 text-[#ffd000] text-[9px] font-black uppercase px-2 py-0.5 rounded ml-auto border border-[#ffd000]/40">
              All PPVs
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}

// ---------------------------------------------------------------------------
// Live chat helper — pure function, no re-creation needed
// ---------------------------------------------------------------------------
function openLiveChat(message: string) {
  const url = `${CONSTANTS.CONTACT.whatsappUrl}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}

// ---------------------------------------------------------------------------
// MAIN COMPONENT
// ---------------------------------------------------------------------------
export default function PricingSection() {
  const [devices, setDevices] = useState<DeviceCount>(1);
  const currentPricing = PRICING[devices];

  const handleLiveChatRedirect = (months: Duration) => {
    const selectedPrice = currentPricing[months].total;
    const noun = devices > 1 ? 'screens' : 'screen';
    openLiveChat(
      `Hi! I would like to order a ${months}-month Krooz TV subscription for ${devices} ${noun} for $${selectedPrice}. Please send me the step by step setup guide on live chat so we can get started.`
    );
  };

  const handleFreeTrialRedirect = () => openLiveChat(FREE_TRIAL_MESSAGE);

  return (
    <section
      id="pricing-section"
      className="py-24 md:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full relative z-10 scroll-mt-20 bg-[#0b0914] text-[#f4f4f6] overflow-hidden"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#0a2540]/40 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb05_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb05_1px,transparent_1px)] bg-[size:24px_24px] md:bg-[size:40px_40px] pointer-events-none" />

      {/* Section Header */}
      <FadeIn className="text-center justify-center max-w-4xl mx-auto mb-16 md:mb-20 relative z-10">
        <div className="inline-flex items-center gap-2 border border-[#ffd000] bg-[#0b0914] px-4 py-1.5 rounded-full mb-6 shadow-lg shadow-[#ffd000]/10">
          <Crown className="w-4 h-4 text-[#ffd000]" />
          <span className="text-[#ffd000] font-black text-xs uppercase tracking-widest">
            Best Krooz TV Subscription Plans 🇺🇸
          </span>
        </div>

        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#f4f4f6] mb-6 uppercase tracking-tight leading-tight">
          CHOOSE YOUR <span className="text-[#ffd000]">KROOZ TV SUBSCRIPTION</span> PLAN
        </h2>
        <p className="text-base sm:text-lg text-[#e5e7eb]/80 mb-10 max-w-2xl mx-auto leading-relaxed font-medium">
          Official Krooz TV provider with instant 4K Ultra HD streaming across the US. Save up to{' '}
          <span className="text-[#ffd000] font-bold">50% off</span> on 12 month passes with simultaneous multi screen support. Set up on live chat, test on a free trial, then upgrade when you are happy.
        </p>

        {/* Device Switcher */}
        <div className="flex flex-col items-center justify-center mb-6">
          <div className="inline-flex items-center gap-2 mb-3">
            <Zap className="w-4 h-4 text-[#ffd000]" />
            <span className="text-xs text-[#e5e7eb]/70 font-black uppercase tracking-widest">
              Select Simultaneous Screens
            </span>
          </div>
          <div className="inline-flex bg-[#0a2540] border border-[#e5e7eb]/10 rounded-2xl p-1.5 shadow-2xl relative">
            {DEVICE_OPTIONS.map((d) => (
              <button
                key={d}
                type="button"
                aria-pressed={devices === d}
                onClick={() => setDevices(d)}
                className={`px-5 sm:px-8 py-2.5 rounded-xl text-xs sm:text-sm font-black tracking-wider uppercase transition-all duration-300 relative ${
                  devices === d
                    ? 'bg-[#ffd000] text-[#0b0914] shadow-lg shadow-[#ffd000]/40 scale-[1.03] ring-2 ring-[#ffd000]/40'
                    : 'text-[#e5e7eb]/70 hover:text-[#f4f4f6]'
                }`}
              >
                {d} {d > 1 ? 'Screens' : 'Screen'}
              </button>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* Pricing Cards Grid */}
      <FadeInStagger className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-8 items-stretch max-w-6xl mx-auto mt-12 relative z-10">

        {/* CARD 1: 3 MONTHS */}
        <FadeInItem className="relative bg-[#f4f4f6] text-[#0b0914] border-2 border-[#0a2540]/40 rounded-3xl p-6 sm:p-8 flex flex-col group overflow-hidden shadow-xl transition-all duration-500 hover:border-[#0a2540] hover:shadow-[0_25px_60px_rgba(10,37,64,0.5)] hover:-translate-y-3">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a2540]/0 via-[#0a2540]/0 to-[#0a2540]/0 group-hover:from-[#0a2540]/5 group-hover:to-[#0a2540]/10 transition-all duration-500 pointer-events-none" />
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#0a2540]/10 to-transparent rounded-bl-[3rem] pointer-events-none transition-all duration-500 group-hover:from-[#0a2540]/20 group-hover:w-32 group-hover:h-32" />
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#0a2540] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative z-10 flex flex-col h-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-black text-[#0a2540] uppercase tracking-[0.2em]">Starter Pass</h3>
              <MonitorPlay className="w-5 h-5 text-[#0a2540] transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110" />
            </div>
            <div className="text-3xl font-black text-[#0b0914] mb-2 tracking-tighter uppercase">3 Months</div>

            <div className="flex items-baseline gap-2 mb-2 mt-4">
              <span className="text-5xl font-black text-[#0b0914] tracking-tighter transition-all duration-500 group-hover:text-[#0a2540]">
                ${currentPricing[3].total}
              </span>
            </div>
            <div className="text-[11px] font-black text-[#0a2540] mb-8 uppercase tracking-widest border border-[#0a2540]/30 self-start px-3 py-1 rounded-full inline-block bg-[#0a2540]/10">
              ${currentPricing[3].mo} / month
            </div>
            <button
              type="button"
              onClick={() => handleLiveChatRedirect(3)}
              className="w-full text-center whitespace-nowrap px-6 py-4 rounded-full bg-[#ffd000] text-[#0b0914] font-black text-xs uppercase tracking-widest hover:bg-[#ffdb33] transition-all shadow-lg shadow-[#ffd000]/30 active:scale-95 group-hover:scale-105 group-hover:shadow-[0_15px_35px_rgba(255,208,0,0.5)]"
            >
              Select 3 Months
            </button>

              <br />

            <div className="mb-6 pt-4 border-t border-[#e5e7eb]">
              <div className="flex items-center justify-between text-[10px] font-black text-[#0b0914]/60 uppercase tracking-widest mb-3">
                <span>Accepted Payments</span>
                <Lock className="w-3 h-3 text-[#0b0914]/60" />
              </div>
              <PaymentIcons variant="light" />
            </div>


            <FeatureList devices={devices} features={STANDARD_FEATURES} theme="standard" />

            <div className="mb-6 p-3 bg-[#0a2540]/10 rounded-2xl flex items-center gap-2.5 transition-colors duration-500 group-hover:bg-[#0a2540]/20">
              <Zap className="w-4 h-4 text-[#0a2540] shrink-0" />
              <span className="text-[11px] font-black text-[#0b0914] uppercase tracking-wider">
                Instant Activation • 99.9% Uptime Guarantee
              </span>
            </div>

          </div>
        </FadeInItem>

        {/* CARD 2: 12 MONTHS VIP — GOLD */}
        <FadeInItem className="relative bg-[#0b0914] border-2 border-[#ffd000] rounded-3xl p-6 sm:p-9 flex flex-col transform lg:-translate-y-4 shadow-[0_0_50px_rgba(255,208,0,0.25)] z-20 group transition-all duration-500 hover:shadow-[0_0_70px_rgba(255,208,0,0.5)] hover:-translate-y-6">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-30 w-auto whitespace-nowrap">
            <div className="bg-[#ffd000] text-[#0b0914] text-[11px] font-black uppercase tracking-[0.2em] px-5 py-2 rounded-full flex items-center gap-1.5 shadow-xl border border-[#0b0914]">
              <Flame className="w-3.5 h-3.5 fill-current text-[#0b0914]" /> Most Popular in USA
            </div>
          </div>

          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#ffd000]/0 via-[#ffd000]/0 to-[#ffd000]/0 group-hover:from-[#ffd000]/5 group-hover:to-[#ffd000]/10 transition-all duration-500 pointer-events-none" />

          <div className="relative z-10 flex flex-col h-full pt-2">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-black text-[#ffd000] uppercase tracking-[0.2em] flex items-center gap-1.5">
                <Crown className="w-4 h-4 text-[#ffd000]" /> Ultimate US VIP
              </h3>
              <Sparkles className="w-4 h-4 text-[#ffd000] transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110" />
            </div>

            <div className="mb-4 inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-full bg-[#0a2540] text-[#ffd000] text-[10px] font-black uppercase tracking-widest shadow-lg shadow-[#0a2540]/60 border border-[#ffd000]/40">
              <Flame className="w-3 h-3 fill-current" /> Save 50% Today
            </div>

            <div className="text-3xl font-black text-[#ffd000] mb-2 tracking-tighter uppercase">
              12 Months
            </div>

            <div className="flex items-baseline gap-2 mb-2 mt-4">
              <span className="text-6xl font-black text-[#ffd000] tracking-tighter drop-shadow-[0_0_20px_rgba(255,208,0,0.4)] transition-all duration-500 group-hover:drop-shadow-[0_0_30px_rgba(255,208,0,0.7)]">
                ${currentPricing[12].total}
              </span>
            </div>

            <div className="text-[11px] font-black text-[#0b0914] mb-8 uppercase tracking-widest border border-[#ffd000] self-start px-4 py-1.5 rounded-full inline-block bg-[#ffd000] shadow-sm">
              BEST VALUE: ${currentPricing[12].mo} / mo
            </div>

            <button
              type="button"
              onClick={() => handleLiveChatRedirect(12)}
              className="w-full text-center whitespace-nowrap px-6 py-4 sm:py-5 rounded-full bg-[#ffd000] text-[#0b0914] font-black text-xs sm:text-sm uppercase tracking-widest hover:bg-[#ffdb33] transition-all shadow-xl shadow-[#ffd000]/30 active:scale-95 group-hover:scale-105 group-hover:shadow-[0_15px_40px_rgba(255,208,0,0.5)]"
            >
              Get 12 Months VIP
            </button>
            <br />

            <div className="mb-6 pt-4 border-t border-[#ffd000]/20">
              <div className="flex items-center justify-between text-[10px] font-black text-[#ffd000]/80 uppercase tracking-widest mb-3">
                <span>Accepted Payments</span>
                <Lock className="w-3 h-3 text-[#ffd000]" />
              </div>
              <PaymentIcons variant="dark" />
            </div>

            <FeatureList devices={devices} features={VIP_FEATURES} theme="gold" />

            <div className="mb-6 p-3 bg-[#ffd000]/10 border border-[#ffd000]/30 rounded-2xl flex items-center gap-2.5 transition-colors duration-500 group-hover:bg-[#ffd000]/20">
              <Crown className="w-4 h-4 text-[#ffd000] shrink-0" />
              <span className="text-[11px] font-black text-[#ffd000] uppercase tracking-wider">
                Priority Local Server Line Included
              </span>
            </div>


          </div>
        </FadeInItem>

        {/* CARD 3: 6 MONTHS */}
        <FadeInItem className="relative bg-[#f4f4f6] text-[#0b0914] border-2 border-[#0a2540]/40 rounded-3xl p-6 sm:p-8 flex flex-col group overflow-hidden shadow-xl transition-all duration-500 hover:border-[#0a2540] hover:shadow-[0_25px_60px_rgba(10,37,64,0.5)] hover:-translate-y-3">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a2540]/0 via-[#0a2540]/0 to-[#0a2540]/0 group-hover:from-[#0a2540]/5 group-hover:to-[#0a2540]/10 transition-all duration-500 pointer-events-none" />
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#0a2540]/10 to-transparent rounded-bl-[3rem] pointer-events-none transition-all duration-500 group-hover:from-[#0a2540]/20 group-hover:w-32 group-hover:h-32" />
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#0a2540] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative z-10 flex flex-col h-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-black text-[#0a2540] uppercase tracking-[0.2em]">Standard Pass</h3>
              <MonitorPlay className="w-5 h-5 text-[#0a2540] transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110" />
            </div>
            <div className="text-3xl font-black text-[#0b0914] mb-2 tracking-tighter uppercase">6 Months</div>

            <div className="flex items-baseline gap-2 mb-2 mt-4">
              <span className="text-5xl font-black text-[#0b0914] tracking-tighter transition-all duration-500 group-hover:text-[#0a2540]">
                ${currentPricing[6].total}
              </span>
            </div>
            <div className="text-[11px] font-black text-[#0a2540] mb-8 uppercase tracking-widest border border-[#0a2540]/30 self-start px-3 py-1 rounded-full inline-block bg-[#0a2540]/10">
              ${currentPricing[6].mo} / month
            </div>

            <button
              type="button"
              onClick={() => handleLiveChatRedirect(6)}
              className="w-full text-center whitespace-nowrap px-6 py-4 rounded-full bg-[#ffd000] text-[#0b0914] font-black text-xs uppercase tracking-widest hover:bg-[#ffdb33] transition-all shadow-lg shadow-[#ffd000]/30 active:scale-95 group-hover:scale-105 group-hover:shadow-[0_15px_35px_rgba(255,208,0,0.5)]"
            >
              Select 6 Months
            </button>
              <br />
            <div className="mb-6 pt-4 border-t border-[#e5e7eb]">
              <div className="flex items-center justify-between text-[10px] font-black text-[#0b0914]/60 uppercase tracking-widest mb-3">
                <span>Accepted Payments</span>
                <Lock className="w-3 h-3 text-[#0b0914]/60" />
              </div>
              <PaymentIcons variant="light" />
            </div>

            <FeatureList devices={devices} features={STANDARD_FEATURES} theme="standard" />

            <div className="mb-6 p-3 bg-[#0a2540]/10 rounded-2xl flex items-center gap-2.5 transition-colors duration-500 group-hover:bg-[#0a2540]/20">
              <Zap className="w-4 h-4 text-[#0a2540] shrink-0" />
              <span className="text-[11px] font-black text-[#0b0914] uppercase tracking-wider">
                Instant Activation • 99.9% Uptime Guarantee
              </span>
            </div>


          </div>
        </FadeInItem>

      </FadeInStagger>

      {/* Free Trial Banner */}
      <FadeIn className="max-w-2xl mx-auto mt-16 relative z-30">
        <div className="bg-[#0a2540] border border-[#ffd000]/40 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xl relative overflow-hidden group hover:border-[#ffd000] transition-all duration-500">
          <div className="absolute -top-16 -left-16 w-64 h-64 bg-[#ffd000]/10 blur-[80px] rounded-full pointer-events-none" />
          <div className="flex items-center gap-4 text-left relative z-10">
            <div className="bg-[#ffd000]/10 border border-[#ffd000]/30 p-3 rounded-xl text-[#ffd000] shrink-0 hidden sm:block transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
              <Gift className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <ShieldCheck className="w-4 h-4 text-[#ffd000]" />
                <h4 className="text-base font-black text-[#f4f4f6] uppercase tracking-tight">
                  Free 24 Hour Krooz TV Trial 🇺🇸
                </h4>
              </div>
              <p className="text-xs text-[#e5e7eb]/80 font-medium">
                Test 4K streaming on your own device before you commit. Our team guides you through setup on live chat so you are sorted from the start.
              </p>
            </div>
          </div>

          <div className="w-full sm:w-auto shrink-0 relative z-10">
            <button
              type="button"
              onClick={handleFreeTrialRedirect}
              className="w-full sm:w-auto text-center whitespace-nowrap px-6 py-3 rounded-full bg-[#ffd000] text-[#0b0914] font-black text-xs uppercase tracking-widest hover:bg-[#ffdb33] transition-all shadow-lg active:scale-95 hover:scale-105"
            >
              Request Free Trial
            </button>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}