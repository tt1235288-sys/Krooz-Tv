'use client';

import { useState, useId } from 'react';
import Link from 'next/link';
import { CONSTANTS } from '@/lib/seo';
import {
  ArrowRight,
  BadgeDollarSign,
  BarChart3,
  Bot,
  CheckCircle2,
  ChevronDown,
  CreditCard,
  Globe,
  Headphones,
  LayoutDashboard,
  MessageCircle,
  Package,
  Rocket,
  Server,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  UserPlus,
  Users,
  Wallet,
  Zap,
  type LucideIcon,
} from 'lucide-react';
import { FadeIn, FadeInStagger, FadeInItem } from '../components/AnimatedSection';

const BRAND = CONSTANTS.BRAND_NAME;
const YEAR = new Date().getFullYear();

// ---------------------------------------------------------------------------
// Hero grid — module-scope constant (no per-render allocation)
// ---------------------------------------------------------------------------
const HERO_GRID_STYLE = {
  backgroundImage: `linear-gradient(to right, #0a2540 1px, transparent 1px), linear-gradient(to bottom, #0a2540 1px, transparent 1px)`,
  backgroundSize: '60px 60px',
} as const;

// ---------------------------------------------------------------------------
// CURRENCY SYSTEM
// ---------------------------------------------------------------------------
type CurrencyCode = 'USD' | 'CAD' | 'GBP';

const CURRENCIES: Record<
  CurrencyCode,
  { code: CurrencyCode; label: string; symbol: string; usdRate: number }
> = {
  USD: { code: 'USD', label: 'USD', symbol: '$', usdRate: 1 },
  CAD: { code: 'CAD', label: 'CAD', symbol: 'C$', usdRate: 1.36 },
  GBP: { code: 'GBP', label: 'GBP', symbol: '£', usdRate: 0.79 },
};

const CURRENCY_ORDER: readonly CurrencyCode[] = ['USD', 'CAD', 'GBP'];

const formatPrice = (usdAmount: number, currency: CurrencyCode): string => {
  const { symbol, usdRate } = CURRENCIES[currency];
  const converted = Math.round(usdAmount * usdRate);
  return `${symbol}${converted.toLocaleString('en-US')}`;
};

// ---------------------------------------------------------------------------
// PRICING TIERS
// ---------------------------------------------------------------------------
interface PricingTier {
  name: string;
  tag: string;
  years: number;
  credits: number;
  wholesaleUSD: number;
  perYearUSD: number;
  retailMinUSD: number;
  retailMaxUSD: number;
  highlighted: boolean;
  features: string[];
  waMessage: string;
}

const TIERS: readonly PricingTier[] = [
  {
    name: 'Starter',
    tag: '10 Years',
    years: 10,
    credits: 10,
    wholesaleUSD: 320,
    perYearUSD: 32,
    retailMinUSD: 60,
    retailMaxUSD: 110,
    highlighted: false,
    features: [
      '10 Krooz TV reseller credits (10 years)',
      'Full reseller panel access',
      'Instant per customer activation',
      '24/7 live chat support',
      'Credits never expire',
      'Free trial line generator',
      'Payment integration ready',
    ],
    waMessage: 'Hi! I want the Starter Krooz TV Reseller package (10 years / $320).',
  },
  {
    name: 'Growth',
    tag: '20 Years',
    years: 20,
    credits: 20,
    wholesaleUSD: 590,
    perYearUSD: 29.5,
    retailMinUSD: 60,
    retailMaxUSD: 110,
    highlighted: true,
    features: [
      '20 Krooz TV reseller credits (20 years)',
      'Full reseller panel access',
      'Instant per customer activation',
      'Priority live chat support',
      'Credits never expire',
      'Free trial line generator',
      'Custom pricing per customer',
      'API access included',
    ],
    waMessage: 'Hi! I want the Growth Krooz TV Reseller package (20 years / $590).',
  },
  {
    name: 'Pro',
    tag: '30 Years',
    years: 30,
    credits: 30,
    wholesaleUSD: 800,
    perYearUSD: 26.67,
    retailMinUSD: 60,
    retailMaxUSD: 110,
    highlighted: false,
    features: [
      '30 Krooz TV reseller credits (30 years)',
      'Full reseller panel access',
      'Instant per customer activation',
      'Dedicated live chat support',
      'Credits never expire',
      'Free trial line generator',
      'Custom pricing per customer',
      'Full API access included',
      'White label branding option',
    ],
    waMessage: 'Hi! I want the Pro Krooz TV Reseller package (30 years / $800).',
  },
];

// ---------------------------------------------------------------------------
// FAQS
// ---------------------------------------------------------------------------
const FAQS: readonly { q: string; a: string }[] = [
  {
    q: 'What exactly is a Krooz TV reseller panel?',
    a: 'A Krooz TV reseller panel is a private dashboard that lets you create and manage IPTV subscriptions for your own customers. You buy credits from us in bulk, then use those credits to activate yearly, monthly, or trial subscriptions for anyone you sell to. You keep the full retail price minus your wholesale cost, and your customers never see that we exist behind the scenes.',
  },
  {
    q: 'How much can I realistically earn as a Krooz TV reseller in the USA?',
    a: 'It depends on how many customers you bring in. American and international customers typically pay between $60 and $110 per year, with $85 being the average. Your wholesale cost per credit starts around $32 per year, so your profit per sale ranges from $28 to $78 depending on your selling price. Sell 10 subscriptions at $85 and you have earned roughly $530 in profit from a $320 investment.',
  },
  {
    q: 'Do I need technical skills to become a Krooz TV reseller?',
    a: 'No. The reseller panel is designed to be simple. If you can use live chat and a web browser, you can run a reseller business. We also provide onboarding guidance over live chat, so any time you get stuck, our team walks you through it directly.',
  },
  {
    q: 'Do the Krooz TV reseller credits expire?',
    a: 'No. Your credits stay in your account indefinitely. You can activate them at your own pace, whether that means selling several subscriptions in a week or spreading them across months. There is no monthly minimum, no expiration date, and no pressure to sell quickly.',
  },
  {
    q: 'Which currencies can I sell in?',
    a: 'You can sell to your customers in any currency you prefer. US dollars, Canadian dollars, British pounds, or anything else. Your wholesale cost with us is fixed in USD. Your retail price is completely up to you, so you control your margin. Use the currency toggle at the top of the pricing section to see all prices in USD, CAD, or GBP.',
  },
  {
    q: 'What kind of support do I get as a Krooz TV reseller?',
    a: 'Every reseller, regardless of tier, gets direct live chat support from our team. The Growth plan adds priority response times, and the Pro plan includes a dedicated support channel plus white label setup assistance.',
  },
];

// ---------------------------------------------------------------------------
// STEPS
// ---------------------------------------------------------------------------
const STEPS: readonly { icon: LucideIcon; number: string; title: string; description: string }[] = [
  {
    icon: Wallet,
    number: '01',
    title: 'Buy Your Credits',
    description:
      'Choose a package and receive your Krooz TV credits instantly. Starter, Growth, and Pro all activate within minutes of payment confirmation.',
  },
  {
    icon: LayoutDashboard,
    number: '02',
    title: 'Access Your Panel',
    description:
      'Log into your private reseller dashboard. Create subscriptions, generate trial lines, and manage every customer account from one clean interface.',
  },
  {
    icon: Users,
    number: '03',
    title: 'Sell to Customers',
    description:
      'Set your own prices and sell yearly, monthly, or trial subscriptions. You keep the full retail amount and only spend credits when you activate a customer.',
  },
  {
    icon: TrendingUp,
    number: '04',
    title: 'Scale Your Profit',
    description:
      'Buy more credits at lower per credit prices as your customer base grows. Every new tier improves your margin and increases your recurring income.',
  },
];

// ---------------------------------------------------------------------------
// VALUE CARDS
// ---------------------------------------------------------------------------
const VALUE_CARDS: readonly { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: BadgeDollarSign,
    title: 'Low Entry Cost',
    description:
      'Start your Krooz TV reseller business with a single $320 package. No contracts, no monthly fees, no hidden charges. Just buy credits and start selling.',
  },
  {
    icon: Users,
    title: 'Global Demand',
    description:
      'Millions of viewers look for cable alternatives every year. The Krooz TV reseller market keeps growing with room for new sellers in every region.',
  },
  {
    icon: Wallet,
    title: 'High Margins',
    description:
      'Your cost per yearly subscription starts at $27 to $32. Customers happily pay $60 to $110 per year. That is a strong margin on every sale.',
  },
  {
    icon: Server,
    title: 'Real Infrastructure',
    description:
      'You resell on our dedicated bare metal servers. No overloaded shared hosting, no downtime during peak hours, no technical issues to explain.',
  },
];

// ---------------------------------------------------------------------------
// PANEL FEATURES
// ---------------------------------------------------------------------------
const PANEL_FEATURES: readonly { icon: LucideIcon; label: string }[] = [
  { icon: LayoutDashboard, label: 'Reseller Dashboard' },
  { icon: Zap, label: 'Instant Activation' },
  { icon: Package, label: 'No Expiry Credits' },
  { icon: Bot, label: 'Trial Generator' },
  { icon: BarChart3, label: 'Sales Tracking' },
  { icon: CreditCard, label: 'Payment Ready' },
  { icon: Globe, label: 'Multi Currency' },
  { icon: Headphones, label: '24/7 Support' },
  { icon: ShieldCheck, label: 'Encrypted Panel' },
  { icon: Rocket, label: 'API Automation' },
];

// ---------------------------------------------------------------------------
// Live chat helper
// ---------------------------------------------------------------------------
const waLink = (message: string): string =>
  `${CONSTANTS.CONTACT.whatsappUrl}?text=${encodeURIComponent(message)}`;

// ---------------------------------------------------------------------------
// PRICING CARD
// ---------------------------------------------------------------------------
function PricingCard({ tier, currency }: { tier: PricingTier; currency: CurrencyCode }) {
  const wholesalePrice = formatPrice(tier.wholesaleUSD, currency);
  const perYearPrice = formatPrice(tier.perYearUSD, currency);
  const retailMin = formatPrice(tier.retailMinUSD, currency);
  const retailMax = formatPrice(tier.retailMaxUSD, currency);
  const totalProfit = formatPrice((tier.retailMaxUSD - tier.perYearUSD) * tier.years, currency);

  return (
    <div
      className={`relative flex flex-col rounded-3xl p-6 md:p-8 transition-all duration-500 ${
        tier.highlighted
          ? 'bg-gradient-to-br from-[#0a2540] via-[#0b0914] to-[#0a2540] border-4 border-[#ffd000] shadow-[0_25px_60px_rgba(10,37,64,0.4)] lg:-translate-y-4 z-20'
          : 'bg-[#f4f4f6] border-2 border-[#0a2540]/20 hover:border-[#0a2540] hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(10,37,64,0.2)]'
      }`}
    >
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-30">
        <div
          className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg border-2 whitespace-nowrap ${
            tier.highlighted
              ? 'bg-[#ffd000] text-[#0b0914] border-[#ffd000]'
              : 'bg-[#0a2540] text-[#ffd000] border-[#0b0914]'
          }`}
        >
          {tier.highlighted && <Sparkles className="w-3 h-3 shrink-0" aria-hidden="true" />}
          {tier.tag}
        </div>
      </div>

      <div className="pt-4">
        <h3
          className={`text-xs font-black uppercase tracking-[0.2em] mb-3 ${
            tier.highlighted ? 'text-[#f4f4f6]/90' : 'text-[#0a2540]'
          }`}
        >
          {tier.name}
        </h3>

        <div
          className={`text-2xl font-black uppercase tracking-tight mb-4 ${
            tier.highlighted ? 'text-[#f4f4f6]' : 'text-[#0b0914]'
          }`}
        >
          {tier.years} Years
        </div>

        <div className="mb-4">
          <div
            className={`text-5xl md:text-6xl font-black tracking-tighter mb-2 ${
              tier.highlighted ? 'text-[#f4f4f6]' : 'text-[#0b0914]'
            }`}
          >
            {wholesalePrice}
          </div>
          <div
            className={`text-xs font-bold tracking-wide ${
              tier.highlighted ? 'text-[#f4f4f6]/80' : 'text-[#0b0914]/60'
            }`}
          >
            {tier.credits} credits total
          </div>
        </div>

        <div
          className={`text-[11px] font-black uppercase tracking-widest mb-6 inline-block px-3 py-1 rounded-full border whitespace-nowrap ${
            tier.highlighted
              ? 'text-[#ffd000] border-[#ffd000]/40 bg-[#ffd000]/10'
              : 'text-[#0a2540] border-[#0a2540]/30 bg-[#0a2540]/10'
          }`}
        >
          {perYearPrice} per year
        </div>

        <div
          className={`rounded-2xl p-4 mb-6 ${
            tier.highlighted
              ? 'bg-[#0b0914]/40 border border-[#ffd000]/30'
              : 'bg-[#f4f4f6] border border-[#0a2540]/20'
          }`}
        >
          <div
            className={`text-[10px] font-black uppercase tracking-widest mb-2 ${
              tier.highlighted ? 'text-[#ffd000]/80' : 'text-[#0b0914]/60'
            }`}
          >
            Your Profit Potential
          </div>
          <div
            className={`text-xs font-bold mb-1 ${
              tier.highlighted ? 'text-[#f4f4f6]' : 'text-[#0b0914]'
            }`}
          >
            Sell at {retailMin} to {retailMax} / year
          </div>
          <div
            className={`text-base font-black uppercase mt-2 ${
              tier.highlighted ? 'text-[#ffd000]' : 'text-[#0a2540]'
            }`}
          >
            Up to {totalProfit} total
          </div>
        </div>

        <ul className="space-y-2.5 mb-8 flex-1">
          {tier.features.map((feature) => (
            <li
              key={feature}
              className={`flex items-start gap-2.5 text-xs font-bold ${
                tier.highlighted ? 'text-[#f4f4f6]' : 'text-[#0b0914]/85'
              }`}
            >
              <CheckCircle2
                className={`w-4 h-4 shrink-0 mt-0.5 ${
                  tier.highlighted ? 'text-[#ffd000]' : 'text-[#0a2540]'
                }`}
                aria-hidden="true"
              />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <a
          href={waLink(tier.waMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-full inline-flex items-center justify-center gap-2 py-4 rounded-full font-black text-xs uppercase tracking-widest transition-all hover:scale-105 whitespace-nowrap ${
            tier.highlighted
              ? 'bg-[#ffd000] text-[#0b0914] hover:bg-[#ffdb33] shadow-2xl'
              : 'bg-[#0a2540] text-[#ffd000] hover:bg-[#0b0914] shadow-lg'
          }`}
        >
          <span>Get This Package</span>
          <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// FAQ ITEM
// ---------------------------------------------------------------------------
function FaqItem({
  faq,
  index,
  defaultOpen = false,
}: {
  faq: { q: string; a: string };
  index: number;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const headingId = useId();
  const answerId = useId();
  const num = String(index + 1).padStart(2, '0');

  return (
    <div
      className={`relative overflow-hidden rounded-3xl border-2 transition-all duration-300 ${
        isOpen
          ? 'border-[#0a2540] shadow-[0_20px_50px_rgba(10,37,64,0.15)]'
          : 'border-[#0a2540]/20 hover:border-[#0a2540]'
      } bg-[#f4f4f6]`}
    >
      <h3 className="m-0">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full text-left p-6 md:p-7 flex items-start gap-5 cursor-pointer rounded-3xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ffd000]/60 focus-visible:ring-offset-2"
          aria-expanded={isOpen}
          aria-controls={answerId}
          id={headingId}
        >
          <div
            className="shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0a2540] to-[#0b0914] flex items-center justify-center text-[#ffd000] font-black text-lg shadow-lg shadow-[#0a2540]/30"
            aria-hidden="true"
          >
            {num}
          </div>
          <div className="flex-1 min-w-0">
            <span className="block font-black text-[#0b0914] text-base md:text-lg uppercase tracking-tight leading-snug">
              {faq.q}
            </span>
          </div>
          <ChevronDown
            className={`shrink-0 w-5 h-5 text-[#0a2540] transition-transform duration-300 mt-4 ${
              isOpen ? 'rotate-180' : ''
            }`}
            aria-hidden="true"
          />
        </button>
      </h3>

      <div
        id={answerId}
        role="region"
        aria-labelledby={headingId}
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <p className="text-[#0b0914]/85 font-medium leading-relaxed text-sm md:text-base mt-1 ml-6 md:ml-7 pl-4 border-l-4 border-[#0a2540] pb-6 pr-6">
            {faq.a}
          </p>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// MAIN PAGE
// ---------------------------------------------------------------------------
export default function ResellerPage() {
  const [currency, setCurrency] = useState<CurrencyCode>('USD');

  return (
    <div className="flex flex-col min-h-screen bg-[#0b0914] text-[#f4f4f6]">

      {/* HERO */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-[#e5e7eb]/10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#0a2540]/40 blur-[150px] rounded-full pointer-events-none" aria-hidden="true" />
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={HERO_GRID_STYLE} aria-hidden="true" />

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 bg-[#0a2540] px-5 py-2.5 rounded-full mb-8 shadow-lg shadow-[#0a2540]/30 border border-[#ffd000]/40">
              <BadgeDollarSign className="w-4 h-4 text-[#ffd000] shrink-0" aria-hidden="true" />
              <span className="text-[#f4f4f6] font-black text-xs uppercase tracking-widest whitespace-nowrap">
                Krooz TV Reseller USA {YEAR} 🇺🇸
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-[1.05] text-[#f4f4f6] mb-6 max-w-4xl mx-auto">
              BECOME A <br className="hidden sm:block" />
              <span className="text-[#ffd000]">KROOZ TV RESELLER</span> <br className="hidden sm:block" />
              IN THE USA
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-[#e5e7eb]/85 font-bold max-w-3xl mx-auto leading-relaxed mb-10">
              Start your own Krooz TV reseller business with a single $320 package. Buy credits in bulk, sell yearly subscriptions at $60 to $110, and earn up to $78 profit per customer.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto mb-12">
              <a
                href="#pricing"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#ffd000] text-[#0b0914] font-black text-sm uppercase tracking-widest shadow-[0_0_30px_rgba(255,208,0,0.4)] hover:bg-[#ffdb33] hover:scale-105 transition-transform whitespace-nowrap border border-[#ffd000]"
              >
                See Pricing
                <ArrowRight className="w-5 h-5 shrink-0" aria-hidden="true" />
              </a>
              <a
                href={waLink('Hi! I want to learn more about becoming a Krooz TV reseller in the USA.')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#0a2540] text-[#ffd000] font-black text-sm uppercase tracking-widest hover:scale-105 transition-transform whitespace-nowrap border border-[#ffd000]/40"
              >
                <MessageCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
                Talk to Us
              </a>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-4">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0a2540]/60 border border-[#e5e7eb]/10 text-[#f4f4f6] text-xs font-black uppercase tracking-widest whitespace-nowrap">
                <Zap className="w-3.5 h-3.5 text-[#ffd000] shrink-0" aria-hidden="true" />
                Instant Access
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0a2540]/60 border border-[#e5e7eb]/10 text-[#f4f4f6] text-xs font-black uppercase tracking-widest whitespace-nowrap">
                <ShieldCheck className="w-3.5 h-3.5 text-[#ffd000] shrink-0" aria-hidden="true" />
                No Expiry
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0a2540]/60 border border-[#e5e7eb]/10 text-[#f4f4f6] text-xs font-black uppercase tracking-widest whitespace-nowrap">
                <Headphones className="w-3.5 h-3.5 text-[#ffd000] shrink-0" aria-hidden="true" />
                24/7 Support
              </span>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* VALUE CARDS — LIGHT */}
      <section className="py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-[#f4f4f6] w-full">
        <div className="max-w-7xl mx-auto">
          <FadeIn className="text-center mb-14 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-[#0a2540]/10 border border-[#0a2540]/30 px-4 py-1.5 rounded-full mb-5">
              <TrendingUp className="w-4 h-4 text-[#0a2540] shrink-0" aria-hidden="true" />
              <span className="text-[#0a2540] font-black text-xs uppercase tracking-widest whitespace-nowrap">
                Why Join Us
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0b0914] uppercase tracking-tighter leading-tight mb-5">
              WHY RESELL KROOZ TV <span className="text-[#0a2540]">TODAY</span>?
            </h2>
            <p className="text-base md:text-lg text-[#0b0914]/70 font-bold leading-relaxed">
              The Krooz TV reseller market has never been easier to enter. Low upfront costs, massive demand, and full profit control make it one of the most accessible side businesses today.
            </p>
          </FadeIn>

          <FadeInStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUE_CARDS.map((card) => {
              const Icon = card.icon;
              return (
                <FadeInItem
                  key={card.title}
                  className="group bg-[#f4f4f6] border-2 border-[#0a2540]/20 rounded-3xl p-6 md:p-7 hover:border-[#0a2540] hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(10,37,64,0.2)] transition-all duration-500"
                >
                  <div className="w-14 h-14 rounded-2xl bg-[#0a2540]/10 group-hover:bg-[#0a2540] flex items-center justify-center mb-5 transition-colors">
                    <Icon className="w-7 h-7 text-[#0a2540] group-hover:text-[#ffd000] transition-colors" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg md:text-xl font-black text-[#0b0914] uppercase tracking-tight mb-3">
                    {card.title}
                  </h3>
                  <p className="text-[#0b0914]/75 text-sm font-medium leading-relaxed">
                    {card.description}
                  </p>
                </FadeInItem>
              );
            })}
          </FadeInStagger>
        </div>
      </section>

      {/* PROFIT MATH — DARK */}
      <section className="py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-[#0b0914] border-y border-[#e5e7eb]/10">
        <div className="max-w-5xl mx-auto">
          <FadeIn className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-[#0a2540]/60 border border-[#ffd000]/30 px-4 py-1.5 rounded-full mb-5">
              <BarChart3 className="w-4 h-4 text-[#ffd000] shrink-0" aria-hidden="true" />
              <span className="text-[#ffd000] font-black text-xs uppercase tracking-widest whitespace-nowrap">
                The Real Math
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#f4f4f6] uppercase tracking-tighter leading-tight mb-5">
              HOW MUCH CAN YOU <span className="text-[#ffd000]">EARN</span>?
            </h2>
            <p className="text-base md:text-lg text-[#e5e7eb]/70 font-bold max-w-3xl mx-auto">
              A concrete example. This is what happens when you buy a Krooz TV reseller package and sell to customers at normal retail pricing.
            </p>
          </FadeIn>

          <FadeIn className="bg-[#f4f4f6] text-[#0b0914] border-4 border-[#0a2540] rounded-3xl p-6 sm:p-8 md:p-12 shadow-2xl mb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 text-center">
              <div>
                <div className="text-xs font-black uppercase tracking-widest text-[#0b0914]/50 mb-3">
                  Starter Package
                </div>
                <div className="text-4xl md:text-5xl font-black text-[#0a2540] tracking-tighter mb-2">
                  {formatPrice(320, currency)}
                </div>
                <div className="text-xs font-bold text-[#0b0914]/70">
                  10 credits (10 years)
                </div>
              </div>
              <div className="md:border-x-2 border-[#0b0914]/10 md:px-8">
                <div className="text-xs font-black uppercase tracking-widest text-[#0b0914]/50 mb-3">
                  Sell Per Year At
                </div>
                <div className="text-4xl md:text-5xl font-black text-[#0b0914] tracking-tighter mb-2">
                  {formatPrice(85, currency)}
                </div>
                <div className="text-xs font-bold text-[#0b0914]/70">
                  average retail price
                </div>
              </div>
              <div>
                <div className="text-xs font-black uppercase tracking-widest text-[#0b0914]/50 mb-3">
                  Total Revenue
                </div>
                <div className="text-4xl md:text-5xl font-black text-[#0a2540] tracking-tighter mb-2">
                  {formatPrice(850, currency)}
                </div>
                <div className="text-xs font-bold text-[#0b0914]/70">
                  from 10 customers
                </div>
              </div>
            </div>

            <div className="pt-6 md:pt-8 border-t-2 border-[#0b0914]/10 mt-6 md:mt-8">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="text-center sm:text-left">
                  <div className="text-xs font-black uppercase tracking-widest text-[#0b0914]/60 mb-2">
                    Revenue minus Cost
                  </div>
                  <div className="text-sm font-bold text-[#0b0914]/80">
                    Net profit from your first 10 customers
                  </div>
                </div>
                <div className="text-center sm:text-right">
                  <div className="text-xs font-black uppercase tracking-widest text-[#0a2540] mb-1">
                    Your Profit
                  </div>
                  <div className="text-5xl md:text-6xl font-black text-[#0a2540] tracking-tighter">
                    {formatPrice(530, currency)}
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn className="text-center max-w-3xl mx-auto">
            <p className="text-[#e5e7eb]/85 font-bold text-base md:text-lg leading-relaxed">
              Sell at the higher end of the range and profit climbs even further. At $110 per sale, your profit from 10 customers reaches <span className="text-[#ffd000] font-black">{formatPrice(780, currency)}</span>. The Growth and Pro packages lower your per year cost, so your total profit scales with every additional customer.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* PRICING — DARK */}
      <section id="pricing" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full scroll-mt-24">
        <FadeIn className="text-center mb-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-[#0a2540]/60 border border-[#ffd000]/30 px-4 py-1.5 rounded-full mb-5">
            <Package className="w-4 h-4 text-[#ffd000] shrink-0" aria-hidden="true" />
            <span className="text-[#ffd000] font-black text-xs uppercase tracking-widest whitespace-nowrap">
              Reseller Packages
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#f4f4f6] uppercase tracking-tighter leading-tight mb-5">
            CHOOSE YOUR <span className="text-[#ffd000]">PACKAGE</span>
          </h2>
          <p className="text-base md:text-lg text-[#e5e7eb]/85 font-bold max-w-3xl mx-auto">
            Every Krooz TV package includes full reseller panel access, instant activation per customer, and 24/7 live chat support. Credits never expire.
          </p>
        </FadeIn>

        <FadeIn className="flex justify-center mb-12">
          <div
            role="group"
            aria-label="Currency"
            className="inline-flex bg-[#0a2540] border border-[#e5e7eb]/10 rounded-2xl p-1.5 shadow-2xl"
          >
            {CURRENCY_ORDER.map((code) => {
              const active = currency === code;
              return (
                <button
                  key={code}
                  type="button"
                  onClick={() => setCurrency(code)}
                  aria-pressed={active}
                  className={`px-5 sm:px-8 py-2.5 rounded-xl text-xs sm:text-sm font-black tracking-wider uppercase transition-all duration-300 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ffd000]/60 ${
                    active
                      ? 'bg-[#ffd000] text-[#0b0914] shadow-lg shadow-[#ffd000]/30'
                      : 'text-[#e5e7eb]/60 hover:text-[#f4f4f6]'
                  }`}
                >
                  {CURRENCIES[code].label}
                </button>
              );
            })}
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6 items-stretch max-w-6xl mx-auto mt-8">
          {TIERS.map((tier) => (
            <PricingCard key={tier.name} tier={tier} currency={currency} />
          ))}
        </div>

        <FadeIn className="mt-12 text-center">
          <p className="text-[#e5e7eb]/60 text-sm font-bold">
            Need larger volume? Message our team on live chat for wholesale pricing on 100+ credits.
          </p>
        </FadeIn>
      </section>

      {/* HOW IT WORKS — LIGHT */}
      <section className="py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-[#f4f4f6] border-y border-[#0b0914]/5">
        <div className="max-w-6xl mx-auto">
          <FadeIn className="text-center mb-16 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-[#0a2540]/10 border border-[#0a2540]/30 px-4 py-1.5 rounded-full mb-5">
              <Rocket className="w-4 h-4 text-[#0a2540] shrink-0" aria-hidden="true" />
              <span className="text-[#0a2540] font-black text-xs uppercase tracking-widest whitespace-nowrap">
                How It Works
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0b0914] uppercase tracking-tighter leading-tight mb-5">
              START IN <span className="text-[#0a2540]">FOUR STEPS</span>
            </h2>
          </FadeIn>

          <FadeInStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((step) => {
              const Icon = step.icon;
              return (
                <FadeInItem
                  key={step.number}
                  className="relative bg-[#f4f4f6] border-2 border-[#0a2540]/20 rounded-3xl p-6 md:p-7 hover:border-[#0a2540] hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(10,37,64,0.2)] transition-all duration-500"
                >
                  <div
                    className="absolute -top-4 -right-3 w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0a2540] to-[#0b0914] flex items-center justify-center text-[#ffd000] font-black text-sm shadow-lg shadow-[#0a2540]/40 border border-[#ffd000]/40"
                    aria-hidden="true"
                  >
                    {step.number}
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-[#0a2540]/10 flex items-center justify-center mb-5">
                    <Icon className="w-7 h-7 text-[#0a2540]" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg md:text-xl font-black text-[#0b0914] uppercase tracking-tight mb-3">
                    {step.title}
                  </h3>
                  <p className="text-[#0b0914]/75 text-sm font-medium leading-relaxed">
                    {step.description}
                  </p>
                </FadeInItem>
              );
            })}
          </FadeInStagger>
        </div>
      </section>

      {/* PANEL FEATURES — COBALT */}
      <section className="py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-[#0a2540] w-full relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#ffd000]/10 blur-[140px] rounded-full pointer-events-none" aria-hidden="true" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#0b0914]/40 blur-[140px] rounded-full pointer-events-none" aria-hidden="true" />

        <div className="max-w-6xl mx-auto relative z-10">
          <FadeIn className="text-center mb-14 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-[#0b0914]/50 border border-[#ffd000]/40 px-4 py-1.5 rounded-full mb-5">
              <LayoutDashboard className="w-4 h-4 text-[#ffd000] shrink-0" aria-hidden="true" />
              <span className="text-[#ffd000] font-black text-xs uppercase tracking-widest whitespace-nowrap">
                Panel Features
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#f4f4f6] uppercase tracking-tighter leading-tight mb-5">
              EVERYTHING IN <span className="text-[#ffd000]">ONE DASHBOARD</span>
            </h2>
          </FadeIn>

          <FadeInStagger className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {PANEL_FEATURES.map((feature) => {
              const Icon = feature.icon;
              return (
                <FadeInItem
                  key={feature.label}
                  className="bg-[#f4f4f6] border-2 border-[#ffd000]/30 rounded-2xl p-4 flex flex-col items-center text-center hover:border-[#ffd000] transition-colors duration-300 shadow-lg"
                >
                  <Icon className="w-6 h-6 text-[#0a2540] mb-2" aria-hidden="true" />
                  <span className="text-[#0b0914] font-black text-[11px] md:text-xs uppercase tracking-wide leading-tight">
                    {feature.label}
                  </span>
                </FadeInItem>
              );
            })}
          </FadeInStagger>
        </div>
      </section>

      {/* FAQ — LIGHT */}
      <section className="py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-[#f4f4f6] w-full border-t border-[#0b0914]/5">
        <div className="max-w-5xl mx-auto">
          <FadeIn className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-[#0a2540]/10 border border-[#0a2540]/30 px-4 py-1.5 rounded-full mb-5">
              <MessageCircle className="w-4 h-4 text-[#0a2540] shrink-0" aria-hidden="true" />
              <span className="text-[#0a2540] font-black text-xs uppercase tracking-widest whitespace-nowrap">
                Reseller FAQ
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0b0914] uppercase tracking-tighter leading-tight mb-5">
              COMMON <span className="text-[#0a2540]">QUESTIONS</span>
            </h2>
          </FadeIn>

          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <FaqItem key={faq.q} faq={faq} index={i} defaultOpen={i === 0} />
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA — DARK with cobalt gradient card */}
      <section className="py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-[#0b0914] max-w-5xl mx-auto w-full">
        <FadeIn>
          <div className="relative overflow-hidden rounded-3xl border-2 border-[#ffd000]/40 bg-gradient-to-br from-[#0a2540] via-[#0b0914] to-[#0a2540] p-8 md:p-14 text-center shadow-2xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,208,0,0.1),_transparent_70%)] pointer-events-none" aria-hidden="true" />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-[#ffd000] text-[#0b0914] px-5 py-2 rounded-full mb-6 shadow-lg">
                <UserPlus className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span className="font-black text-xs uppercase tracking-widest whitespace-nowrap">
                  Ready to Start
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#f4f4f6] uppercase tracking-tighter leading-tight mb-5 max-w-3xl mx-auto">
                LAUNCH YOUR RESELLER BUSINESS TODAY
              </h2>

              <p className="text-[#e5e7eb]/90 font-bold text-base md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
                Message our team on live chat and we will have your Krooz TV reseller panel active within 10 minutes. Pick your package, log in, and start selling to your first customer the same day.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto">
                <a
                  href={waLink('Hi! I want to become a Krooz TV reseller. Please help me get started.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#ffd000] text-[#0b0914] font-black text-sm uppercase tracking-widest hover:bg-[#ffdb33] hover:scale-105 transition-all shadow-xl border-2 border-[#ffd000] whitespace-nowrap"
                >
                  <MessageCircle className="w-5 h-5 text-[#0b0914] shrink-0" aria-hidden="true" />
                  Start on Chat
                </a>
                <Link
                  href="/pricing"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#0b0914] text-[#ffd000] font-black text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-xl border-2 border-[#ffd000]/40 whitespace-nowrap"
                >
                  Customer Plans
                  <ArrowRight className="w-5 h-5 shrink-0" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}