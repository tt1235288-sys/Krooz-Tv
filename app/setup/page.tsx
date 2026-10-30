'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { CONSTANTS } from '@/lib/seo';
import Image from 'next/image';
import Link from 'next/link';
import {
  MonitorSmartphone,
  Tv,
  Apple,
  Laptop,
  Sparkles,
  Lock,
  Zap,
  Users,
  CheckCircle2,
  PlayCircle,
  ArrowRight,
  MessageCircle,
  Clock,
  Headphones,
  Download,
  KeyRound,
  AlertCircle,
  X,
  Gift,
  ShoppingCart,
  Plug,
  ShieldCheck,
  Globe,
  Phone,
  type LucideIcon,
} from 'lucide-react';
import { FadeIn, FadeInStagger, FadeInItem } from '../components/AnimatedSection';
import ShareButtons from '../components/ShareButtons';
import SetupFAQItem from './SetupFAQItem';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
type DeviceId = 'firestick' | 'smarttv' | 'apple' | 'pc';

type StepCta =
  | { type: 'internal'; label: string; href: string }
  | { type: 'external'; label: string; href: string }
  | { type: 'whatsapp'; label: string; message: string };

type StepMethod = {
  title: string;
  subtitle: string;
  points: string[];
  highlighted: boolean;
};

type StepStat = { value: string; label: string };

type Step = {
  number: number;
  title: string;
  description: string;
  duration: string;
  icon: LucideIcon;
  chips?: string[];
  methods?: StepMethod[];
  stats?: StepStat[];
  cta?: StepCta;
  tip?: string;
};

type DeviceData = {
  title: string;
  icon: LucideIcon;
  steps: Step[];
};

type FaqItem = { q: string; a: string };

// ---------------------------------------------------------------------------
// SVG Flags — US, CA, UK, AU (US first)
// ---------------------------------------------------------------------------
const FlagUS = () => (
  <svg
    className="w-5 h-5 sm:w-6 sm:h-6 rounded-full shadow-md shrink-0 border border-[#e5e7eb]/20"
    viewBox="0 0 32 32"
    role="img"
    aria-label="United States"
  >
    <clipPath id="st-pg-us">
      <circle cx="16" cy="16" r="16" />
    </clipPath>
    <g clipPath="url(#st-pg-us)">
      <rect width="32" height="32" fill="#FFF" />
      {[0, 4.57, 9.14, 13.71, 18.29, 22.86, 27.43].map((y, i) => (
        <rect key={i} y={y} width="32" height="2.29" fill="#B22234" />
      ))}
      <rect width="13.7" height="14.86" fill="#3C3B6E" />
    </g>
  </svg>
);

const FlagCA = () => (
  <svg
    className="w-5 h-5 sm:w-6 sm:h-6 rounded-full shadow-md shrink-0 border border-[#e5e7eb]/20"
    viewBox="0 0 32 32"
    role="img"
    aria-label="Canada"
  >
    <clipPath id="st-pg-ca">
      <circle cx="16" cy="16" r="16" />
    </clipPath>
    <g clipPath="url(#st-pg-ca)">
      <rect width="32" height="32" fill="#FFF" />
      <rect width="8" height="32" fill="#D80621" />
      <rect x="24" width="8" height="32" fill="#D80621" />
      <path
        fill="#D80621"
        d="M16 7l1.2 2.4 2.6-.6-.9 2.5 2.3 1.3-2.1 1.5.8 2.5-2.5-.7L16 18l-1.4-2.1-2.5.7.8-2.5-2.1-1.5 2.3-1.3-.9-2.5 2.6.6L16 7z"
      />
    </g>
  </svg>
);

const FlagUK = () => (
  <svg
    className="w-5 h-5 sm:w-6 sm:h-6 rounded-full shadow-md shrink-0 border border-[#e5e7eb]/20"
    viewBox="0 0 32 32"
    role="img"
    aria-label="United Kingdom"
  >
    <clipPath id="st-pg-uk">
      <circle cx="16" cy="16" r="16" />
    </clipPath>
    <g clipPath="url(#st-pg-uk)">
      <rect width="32" height="32" fill="#012169" />
      <path stroke="#FFF" strokeWidth="6" d="M0 0l32 32M32 0L0 32" />
      <path stroke="#C8102E" strokeWidth="3" d="M0 0l32 32M32 0L0 32" />
      <path stroke="#FFF" strokeWidth="10" d="M16 0v32M0 16h32" />
      <path stroke="#C8102E" strokeWidth="6" d="M16 0v32M0 16h32" />
    </g>
  </svg>
);

const FlagAU = () => (
  <svg
    className="w-5 h-5 sm:w-6 sm:h-6 rounded-full shadow-md shrink-0 border border-[#e5e7eb]/20"
    viewBox="0 0 32 32"
    role="img"
    aria-label="Australia"
  >
    <clipPath id="st-pg-au">
      <circle cx="16" cy="16" r="16" />
    </clipPath>
    <g clipPath="url(#st-pg-au)">
      <rect width="32" height="32" fill="#012169" />
      <path stroke="#FFF" strokeWidth="4" d="M0 0l16 16M16 0L0 16" />
      <path stroke="#C8102E" strokeWidth="2" d="M0 0l16 16M16 0L0 16" />
      <path stroke="#FFF" strokeWidth="6" d="M8 0v16M0 8h16" />
      <path stroke="#C8102E" strokeWidth="3" d="M8 0v16M0 8h16" />
      <path
        fill="#FFF"
        d="M8 19.2l.65 1.95h2.05l-1.65 1.2.63 1.95L8 23.1l-1.68 1.2.63-1.95-1.65-1.2h2.05z"
      />
      <path fill="#FFF" d="M24 4.6l.5 1.5h1.55l-1.25.9.48 1.5L24 7.6l-1.28.9.48-1.5-1.25-.9h1.55z" />
      <path fill="#FFF" d="M24 24l.5 1.5h1.55l-1.25.9.48 1.5L24 27l-1.28.9.48-1.5-1.25-.9h1.55z" />
      <path fill="#FFF" d="M28 14l.5 1.5h1.55l-1.25.9.48 1.5L28 17l-1.28.9.48-1.5-1.25-.9h1.55z" />
      <path fill="#FFF" d="M20 14l.5 1.5h1.55l-1.25.9.48 1.5L20 17l-1.28.9.48-1.5-1.25-.9h1.55z" />
      <path fill="#FFF" d="M23.2 18.6l.3.9h.95l-.77.56.3.9-.78-.55-.78.55.3-.9-.77-.56h.95z" />
    </g>
  </svg>
);

const IBO_DOWNLOAD_URL = 'https://iboplayer.pro/';

// ---------------------------------------------------------------------------
// Static data
// ---------------------------------------------------------------------------
const HERO_GRID_STYLE = {
  backgroundImage: `linear-gradient(to right, #0a2540 1px, transparent 1px), linear-gradient(to bottom, #0a2540 1px, transparent 1px)`,
  backgroundSize: '50px 50px',
} as const;

const DEVICES: ReadonlyArray<{
  id: DeviceId;
  name: string;
  icon: LucideIcon;
  popular: boolean;
  stepCount: number;
}> = [
  { id: 'firestick', name: 'Firestick / Android TV', icon: MonitorSmartphone, popular: true, stepCount: 6 },
  { id: 'smarttv', name: 'Smart TVs', icon: Tv, popular: false, stepCount: 6 },
  { id: 'apple', name: 'Apple Devices', icon: Apple, popular: false, stepCount: 6 },
  { id: 'pc', name: 'PC / Mac', icon: Laptop, popular: false, stepCount: 6 },
];

// --- Reusable CTA fragments to reduce stepData bloat ---------------------
const ctaViewPlans: StepCta = { label: 'View Krooz TV SUBSCRIPTION Plans', href: '/pricing', type: 'internal' };
const ctaDownloadIbo: StepCta = { label: 'Download IBO Player Pro', type: 'external', href: IBO_DOWNLOAD_URL };
const methodAuto = (points: string[]): StepMethod => ({
  title: 'Auto Setup by Support',
  subtitle: 'Recommended',
  points,
  highlighted: true,
});
const methodManual = (points: string[]): StepMethod => ({
  title: 'Manual Setup',
  subtitle: 'DIY',
  points,
  highlighted: false,
});

const STEP_DATA: Record<DeviceId, DeviceData> = {
  firestick: {
    title: 'Setup Krooz TV SUBSCRIPTION on Firestick & Android TV',
    icon: MonitorSmartphone,
    steps: [
      {
        number: 1,
        title: 'Choose Your Krooz TV SUBSCRIPTION Plan',
        description:
          'Pick the subscription that fits your household. Choose 3, 6, or 12 months with 1, 2, or 3 simultaneous screens.',
        chips: ['36,000+ Channels', '120,000+ Movies', '4K & 60FPS', 'USD Pricing'],
        duration: '1 min',
        icon: ShoppingCart,
        cta: ctaViewPlans,
        tip: 'The 12 month VIP plan saves up to 50% and unlocks priority US servers.',
      },
      {
        number: 2,
        title: 'Contact Support on Chat',
        description:
          'Message our team on chat with your chosen plan. We confirm pricing in USD and send a secure payment link right in chat.',
        chips: ['Credit Card', 'PayPal', 'Crypto'],
        duration: '2-3 min',
        icon: MessageCircle,
        cta: { label: 'Chat With Us', type: 'whatsapp', message: "Hi! I want to subscribe and get setup help on Firestick." },
        tip: 'Support is live 24/7 with an average reply time under 2 minutes.',
      },
      {
        number: 3,
        title: 'Download IBO Player Pro',
        description:
          'IBO Player Pro is the fastest and most stable IPTV player for Firestick. It supports 4K, EPG, and comes with a built-in trial.',
        chips: ['4K HDR', 'Low RAM', 'Fast Zapping', 'Built In Trial'],
        duration: '2 min',
        icon: Download,
        cta: ctaDownloadIbo,
        tip: 'On Firestick, use the Downloader app to sideload IBO Player Pro if it is not in the Amazon App Store.',
      },
      {
        number: 4,
        title: 'Choose Your Setup Method',
        description: 'Two ways to connect your Krooz TV SUBSCRIPTION. Pick whichever feels easier.',
        methods: [
          methodAuto(['Send us your Device Key', 'We activate remotely', 'Channel list loads automatically']),
          methodManual(['Support sends M3U URL', 'Or Xtream Codes', 'You enter credentials in app']),
        ],
        duration: '2 min',
        icon: KeyRound,
        tip: 'Not sure which to pick? Go with Auto. Our team handles 100% of the setup for you.',
      },
      {
        number: 5,
        title: 'Load Content & Wait 1 to 2 Minutes',
        description:
          'Once activated, IBO Player Pro downloads your full catalog in the background. Channels, movies, TV shows, EPG guide, everything.',
        chips: ['1 to 2 min', 'EPG Auto Load', 'Favourites Ready'],
        duration: '1-2 min',
        icon: Plug,
        tip: 'Keep the app open during this first load. It only happens once.',
      },
      {
        number: 6,
        title: 'Start Streaming Krooz TV SUBSCRIPTION!',
        description:
          'You are live. Enjoy instant access to premium IPTV including the NFL Sunday, NBA, MLB, NHL, movies, TV shows, and live events all in one place.',
        stats: [
          { value: '36,000+', label: 'Live Channels' },
          { value: '120,000+', label: 'Movies & TV Shows' },
          { value: '4K/60FPS', label: 'Quality' },
          { value: '24/7', label: 'Support' },
        ],
        duration: 'Done!',
        icon: PlayCircle,
        tip: 'Pin your favourite channels. Channel surfing becomes instant.',
      },
    ],
  },
  smarttv: {
    title: 'Setup Krooz TV SUBSCRIPTION on Smart TV',
    icon: Tv,
    steps: [
      {
        number: 1,
        title: 'Choose Your Krooz TV SUBSCRIPTION Plan',
        description:
          'Select 3, 6, or 12 month access with 1, 2, or 3 simultaneous screens. Perfect for family households.',
        chips: ['36,000+ Channels', '120,000+ Movies', 'Samsung & LG', 'USD Pricing'],
        duration: '1 min',
        icon: ShoppingCart,
        cta: ctaViewPlans,
        tip: 'Multi screen plans work best for families watching different content at once.',
      },
      {
        number: 2,
        title: 'Contact Support on Chat',
        description:
          'Message our team on chat. We confirm your plan in USD and send a secure payment link right in chat.',
        chips: ['Credit Card', 'PayPal', 'Crypto'],
        duration: '2-3 min',
        icon: MessageCircle,
        cta: { label: 'Chat With Us', type: 'whatsapp', message: "Hi! I want to setup Krooz TV SUBSCRIPTION on my Smart TV." },
        tip: 'Tell us your TV brand and we send a custom setup guide for Samsung, LG, or Sony.',
      },
      {
        number: 3,
        title: 'Install IBO Player Pro',
        description:
          'IBO Player Pro runs natively on Samsung Tizen, LG webOS, and Android TV. No extra hardware required.',
        chips: ['Samsung Tizen', 'LG webOS', 'Android TV', '4K HDR'],
        duration: '2 min',
        icon: Download,
        cta: ctaDownloadIbo,
        tip: 'Search for IBO Player Pro in your TV app store, or ask support for an install link.',
      },
      {
        number: 4,
        title: 'Choose Your Setup Method',
        description:
          'Connect your Krooz TV SUBSCRIPTION the easy way. Auto by support, or Manual with your own credentials.',
        methods: [
          methodAuto(['Send us your Device Key', 'We link your subscription', 'Channels appear automatically']),
          methodManual(['Support sends M3U or Xtream', 'You enter in Add Playlist', 'Channels load instantly']),
        ],
        duration: '2 min',
        icon: KeyRound,
        tip: 'Auto setup works on all Smart TV brands. Just send us your Device Key.',
      },
      {
        number: 5,
        title: 'Load Content & Wait 1 to 2 Minutes',
        description:
          'IBO Player Pro downloads your channels, movies and TV shows library, and full 7 day EPG guide automatically.',
        chips: ['1 to 2 min', 'EPG Auto Load', 'Parental Controls'],
        duration: '1-2 min',
        icon: Plug,
        tip: 'Do not close the app during first load. Everything will be ready in under 2 minutes.',
      },
      {
        number: 6,
        title: 'Stream Krooz TV SUBSCRIPTION in 4K',
        description:
          'Your Smart TV is ready. Enjoy buffer free 4K IPTV with NFL Sunday, NBA primetime, MLB playoffs, NHL games, college football, ESPN, and thousands of international networks.',
        stats: [
          { value: '36,000+', label: 'Live Channels' },
          { value: '120,000+', label: 'Movies & TV Shows' },
          { value: '4K', label: 'Ultra HD' },
          { value: '24/7', label: 'Support' },
        ],
        duration: 'Done!',
        icon: PlayCircle,
        tip: 'For the sharpest 4K, connect your TV via Ethernet or 5GHz WiFi.',
      },
    ],
  },
  apple: {
    title: 'Setup Krooz TV SUBSCRIPTION on Apple Devices',
    icon: Apple,
    steps: [
      {
        number: 1,
        title: 'Choose Your Krooz TV SUBSCRIPTION Plan',
        description:
          'Pick the plan that fits your Apple household. Choose 3, 6, or 12 months with 1, 2, or 3 screens.',
        chips: ['36,000+ Channels', '120,000+ Movies', 'iPhone / iPad', 'Apple TV 4K'],
        duration: '1 min',
        icon: ShoppingCart,
        cta: ctaViewPlans,
        tip: 'The VIP plan unlocks AirPlay 2 optimisations for Apple TV streaming.',
      },
      {
        number: 2,
        title: 'Contact Support on Chat',
        description:
          'Our support team handles everything over chat. Payment in USD and instant credentials.',
        chips: ['Credit Card', 'PayPal', 'Crypto'],
        duration: '2-3 min',
        icon: MessageCircle,
        cta: { label: 'Chat With Us', type: 'whatsapp', message: "Hi! I need setup help for my Apple device." },
        tip: 'Family Sharing users, mention it to support for multi device guidance.',
      },
      {
        number: 3,
        title: 'Install IBO Player Pro',
        description:
          'IBO Player Pro works on iPhone, iPad, and Apple TV 4K with AirPlay, Picture in Picture, and iCloud sync.',
        chips: ['iOS + tvOS', 'AirPlay 2', 'Picture in Picture', 'iCloud Sync'],
        duration: '2 min',
        icon: Download,
        cta: ctaDownloadIbo,
        tip: 'On tvOS, use the Apple TV Remote app on your iPhone to type faster.',
      },
      {
        number: 4,
        title: 'Choose Your Setup Method',
        description:
          'Auto activation by our team, or manual login with your M3U or Xtream credentials.',
        methods: [
          methodAuto(['Send your Device Key', 'We activate remotely', 'Auto loads your channels']),
          methodManual(['We send M3U or Xtream', 'Enter in Add Playlist', 'Instant channel load']),
        ],
        duration: '2 min',
        icon: KeyRound,
        tip: 'Auto setup is fastest. Activation completes in under 60 seconds.',
      },
      {
        number: 5,
        title: 'Load Content & Wait 1 to 2 Minutes',
        description:
          'Your channels, movies and TV shows, and 7 day EPG guide load automatically in IBO Player Pro.',
        chips: ['1 to 2 min', 'EPG Auto Load', 'iCloud Favourites'],
        duration: '1-2 min',
        icon: Plug,
        tip: 'Favourites sync automatically across iPhone, iPad, and Apple TV.',
      },
      {
        number: 6,
        title: 'Stream Krooz TV SUBSCRIPTION in 4K',
        description:
          'Your Apple device is ready. Enjoy premium 4K IPTV with AirPlay casting and Picture in Picture support.',
        stats: [
          { value: '36,000+', label: 'Live Channels' },
          { value: '120,000+', label: 'Movies & TV Shows' },
          { value: '4K HDR', label: 'Quality' },
          { value: '24/7', label: 'Support' },
        ],
        duration: 'Done!',
        icon: PlayCircle,
        tip: 'Enable Reduce Loud Sounds in tvOS for balanced audio on sport content.',
      },
    ],
  },
  pc: {
    title: 'Setup Krooz TV SUBSCRIPTION on PC & Mac',
    icon: Laptop,
    steps: [
      {
        number: 1,
        title: 'Choose Your Krooz TV SUBSCRIPTION Plan',
        description:
          'Pick 3, 6, or 12 month access. Multi screen plans work great for dual monitor setups.',
        chips: ['36,000+ Channels', '120,000+ Movies', 'Windows & Mac', 'USD Pricing'],
        duration: '1 min',
        icon: ShoppingCart,
        cta: ctaViewPlans,
        tip: '2 or 3 screen plans are perfect for home office background streaming.',
      },
      {
        number: 2,
        title: 'Contact Support on Chat',
        description:
          'Reach our support team on chat. We confirm the plan in USD and send a secure payment link.',
        chips: ['Credit Card', 'PayPal', 'Crypto'],
        duration: '2-3 min',
        icon: MessageCircle,
        cta: { label: 'Chat With Us', type: 'whatsapp', message: "Hi! I need setup Krooz TV SUBSCRIPTION on PC or Mac." },
        tip: 'Ask for the M3U URL if you plan to use VLC for immediate streaming.',
      },
      {
        number: 3,
        title: 'Download IBO Player Pro',
        description:
          'IBO Player Pro runs on Windows and macOS with keyboard shortcuts and multi window support.',
        chips: ['Windows 10/11', 'macOS', 'Multi window', '4K Ready'],
        duration: '2 min',
        icon: Download,
        cta: ctaDownloadIbo,
        tip: 'VLC Media Player also works if you prefer a lightweight option.',
      },
      {
        number: 4,
        title: 'Choose Your Setup Method',
        description:
          'Auto setup by our team, or manual entry of M3U URL or Xtream Codes.',
        methods: [
          methodAuto(['Send your Device Key', 'We activate remotely', 'App connects instantly']),
          methodManual(['We send M3U URL', 'Or Xtream Codes', 'Paste and play']),
        ],
        duration: '2 min',
        icon: KeyRound,
        tip: 'On VLC, press Ctrl+L (Win) or Cmd+L (Mac) to view the playlist sidebar.',
      },
      {
        number: 5,
        title: 'Load Content & Wait 1 to 2 Minutes',
        description:
          'Your full IPTV catalog loads automatically. 36,000+ channels, 120,000+ movies and TV shows, and the EPG guide.',
        chips: ['1 to 2 min', 'EPG Auto Load', 'Favourites Sync'],
        duration: '1-2 min',
        icon: Plug,
        tip: 'Keep the app in focus during first load for the fastest experience.',
      },
      {
        number: 6,
        title: 'Stream Krooz TV SUBSCRIPTION in 4K',
        description:
          'Your PC or Mac is ready. Stream live sport, movies, and international networks in 4K Ultra HD.',
        stats: [
          { value: '36,000+', label: 'Live Channels' },
          { value: '120,000+', label: 'Movies & TV Shows' },
          { value: '4K', label: 'Quality' },
          { value: '24/7', label: 'Support' },
        ],
        duration: 'Done!',
        icon: PlayCircle,
        tip: 'Enable hardware acceleration in player settings for smoother 4K playback.',
      },
    ],
  },
};

const SETUP_FAQS: readonly FaqItem[] = [
  {
    q: 'How do I receive my login details after purchasing a plan?',
    a: 'Everything is handled live over chat. Once you confirm your plan and complete payment, our team sends your setup details directly in the chat, usually within minutes.',
  },
  {
    q: 'Which IPTV player do you recommend for setup?',
    a: 'We recommend IBO Player Pro for the fastest channel zapping, lowest RAM usage, and best 4K performance across Firestick, Smart TVs, Apple devices, and PC or Mac. IPTV Smarters Pro is also a great alternative if you want a different interface.',
  },
  {
    q: 'Do I need to activate IBO Player Pro separately?',
    a: 'The activation service is included free with every subscription. Choose Auto Setup (send us your Device Key and we activate remotely) or Manual Setup (enter M3U or Xtream codes yourself).',
  },
  {
    q: 'How long does setup take?',
    a: 'Most customers are streaming within 10 minutes. Installing IBO Player Pro takes about 2 minutes, activation takes 1 to 2 minutes, and content loading takes 1 to 2 minutes.',
  },
  {
    q: 'Can I use my login credentials on multiple devices?',
    a: 'Yes. You can install the app on unlimited devices. The number of simultaneous streams depends on your plan, with 1 screen for Standard or 2 and 3 screens for Multi room.',
  },
  {
    q: 'What should I do if I get a login error in IBO Player Pro?',
    a: 'Confirm you selected the Xtream Codes API method, not M3U, and that there are no extra spaces in your username or password. If it persists, message us on chat and most issues resolve within 2 minutes.',
  },
  {
    q: 'What internet speed do I need for 4K streaming?',
    a: 'For 4K Ultra HD we recommend 30 Mbps minimum. Full HD 1080p runs smoothly on 15 Mbps. Anti freeze server technology adapts to your connection speed automatically.',
  },
  {
    q: 'Do I need a VPN to use the service?',
    a: 'No. Our US servers are optimised and secure. If your internet provider applies streaming throttling during peak hours, you can enable a VPN without issues.',
  },
];

const LONG_FORM_FAQS: readonly FaqItem[] = [
  {
    q: 'What devices work best for Krooz TV SUBSCRIPTION setup?',
    a: 'For the best experience, we recommend Amazon Firestick 4K Max for streaming sticks, Samsung Tizen or LG webOS Smart TVs for built in apps, Apple TV 4K for the AirPlay ecosystem, and any Windows 11 or macOS Sonoma desktop for full 4K playback. All of these devices support IBO Player Pro, our recommended IPTV player, and handle 4K and 60FPS content without frame drops. Older devices like Firestick Lite or second generation Apple TV still work but cap out at Full HD. For the smoothest 4K performance, choose hardware from the last two generations.',
  },
  {
    q: 'How does remote activation actually work?',
    a: 'Remote activation is the easiest setup method. After you contact us on chat and complete payment, our support team asks for your device identifier. For IBO Player Pro this is a Device Key or MAC address shown on the app welcome screen. We register that key on our US server, link it to your subscription, and within 60 seconds your channel list loads automatically the moment you reopen the app. No typing, no manual credentials, no risk of errors. If you prefer to handle it yourself, we also send the standard M3U URL and Xtream Codes credentials. Both methods produce identical 4K streaming performance.',
  },
  {
    q: 'What if I have an older Smart TV that cannot install IBO Player Pro?',
    a: 'If your Smart TV is more than 5 years old and cannot install IBO Player Pro directly, you still have options. The most popular solution is an Amazon Firestick 4K Max. It plugs into any HDMI port and turns older TVs into full 4K IPTV streamers in under 5 minutes. Alternatively, an Android TV box, Nvidia Shield, or Apple TV 4K delivers the same result. Our chat support team regularly helps customers upgrade older televisions with a low cost streaming stick. Message us and we will recommend the best device for your specific TV model and viewing habits.',
  },
  {
    q: 'Can I switch devices later or move my subscription?',
    a: 'Yes, absolutely. Your Krooz TV SUBSCRIPTION is tied to your account, not to a single device. If you upgrade from a Firestick to an Apple TV, add a second Smart TV, or move your setup to a new PC, simply contact our chat support team and we will re-activate the subscription on your new device, usually within 2 minutes. Device changes are unlimited and free for the entire duration of your subscription. If you need simultaneous streaming in multiple rooms, we offer 2 screen and 3 screen plans so your household can watch different content at the same time without interruption.',
  },
];

const WHY_CHOOSE_US: ReadonlyArray<{
  icon: LucideIcon;
  title: string;
  desc: string;
}> = [
  {
    icon: ShieldCheck,
    title: 'True US Support',
    desc: 'Real team tuned for American viewers, priced in USD, with know how across every state from New York to Los Angeles. No offshore scripts, no language barriers.',
  },
  {
    icon: Zap,
    title: 'Done For You Activation',
    desc: 'Send us your Device Key on chat and we handle 100% of the technical side. You only need to install IBO Player Pro. Everything else is on us.',
  },
  {
    icon: Clock,
    title: 'Setup in Under 10 Minutes',
    desc: 'Average setup time from first message to first live channel is 8 to 10 minutes. Fastest customers activate in under 5 minutes.',
  },
  {
    icon: PlayCircle,
    title: 'IBO Player Pro Expertise',
    desc: 'We are specialists in IBO Player Pro, one of the most stable IPTV players available. We know its settings, quirks, and optimisations inside out.',
  },
  {
    icon: MessageCircle,
    title: 'Real Time Chat Support',
    desc: 'No email tickets, no waiting days for replies. Our support answers on chat in under 2 minutes, 24 hours a day, 7 days a week.',
  },
  {
    icon: Lock,
    title: 'Secure US Payments',
    desc: 'Pay safely with Credit Card, PayPal, or Crypto. All transactions are encrypted and processed with 256 bit SSL.',
  },
];

// ---------------------------------------------------------------------------
// WhatsApp helper
// ---------------------------------------------------------------------------
function waLink(message: string): string {
  return `${CONSTANTS.CONTACT.whatsappUrl}?text=${encodeURIComponent(message)}`;
}

// ---------------------------------------------------------------------------
// StepItem
// ---------------------------------------------------------------------------
function StepItem({ step, index, isLast }: { step: Step; index: number; isLast: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const Icon = step.icon;

  return (
    <div ref={ref} className="relative">
      <div className="flex gap-4 md:gap-6">
        <div className="flex flex-col items-center shrink-0">
          <motion.div
            className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center z-10 transition-all duration-500 ${
              isInView ? 'bg-[#0a2540] shadow-[0_0_25px_rgba(10,37,64,0.5)] scale-110' : 'bg-[#0a2540]/20'
            }`}
            initial={{ scale: 0 }}
            animate={{ scale: isInView ? 1 : 0 }}
            transition={{ duration: 0.4, type: 'spring', delay: index * 0.08 }}
            aria-hidden="true"
          >
            <span className={`text-xl md:text-2xl font-black transition-all duration-300 ${isInView ? 'text-[#ffd000]' : 'text-[#0a2540]'}`}>
              {step.number}
            </span>
          </motion.div>
          {!isLast && (
            <motion.div
              className="relative w-0.5 flex-1 min-h-[60px] my-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: isInView ? 1 : 0 }}
              transition={{ delay: index * 0.12 + 0.3 }}
              aria-hidden="true"
            >
              <motion.div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-[#0a2540] to-[#0b0914]"
                initial={{ height: 0 }}
                animate={{ height: isInView ? '100%' : 0 }}
                transition={{ duration: 0.8, delay: index * 0.12 + 0.2 }}
              />
            </motion.div>
          )}
        </div>

        <motion.div
          className="flex-1 pb-10 md:pb-12"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -30 }}
          transition={{ duration: 0.5, delay: index * 0.08 }}
        >
          <div className={`bg-[#f4f4f6] border-2 rounded-2xl p-5 md:p-6 transition-all duration-500 ${isInView ? 'border-[#0a2540] shadow-[0_10px_35px_rgba(10,37,64,0.2)]' : 'border-[#e5e7eb]/20'}`}>
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-[#0a2540]/15">
                  <Icon className="w-5 h-5 text-[#0a2540]" aria-hidden="true" />
                </div>
                <h3 className="text-lg md:text-xl font-black uppercase tracking-tight text-[#0b0914]">
                  {step.title}
                </h3>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0b0914]/5">
                <Clock className="w-3 h-3 text-[#0a2540]" aria-hidden="true" />
                <span className="text-[#0b0914]/60 text-[10px] md:text-xs font-bold">{step.duration}</span>
              </div>
            </div>

            <p className="text-[#0b0914]/80 font-medium leading-relaxed text-sm md:text-base mb-4">
              {step.description}
            </p>

            {step.chips && (
              <div className="flex flex-wrap gap-2 mb-4">
                {step.chips.map((chip) => (
                  <span key={chip} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#0a2540]/10 border border-[#0a2540]/30 text-[#0a2540] text-[10px] md:text-xs font-black uppercase tracking-wider">
                    {chip}
                  </span>
                ))}
              </div>
            )}

            {step.methods && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                {step.methods.map((m) => (
                  <div key={m.title} className={`rounded-xl p-4 border-2 transition-all ${m.highlighted ? 'bg-[#ffd000]/10 border-[#ffd000]' : 'bg-[#f4f4f6] border-[#0b0914]/10'}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${m.highlighted ? 'bg-[#ffd000] text-[#0b0914]' : 'bg-[#0b0914]/10 text-[#0b0914]'}`}>
                        {m.subtitle}
                      </span>
                    </div>
                    <h4 className="text-sm font-black uppercase text-[#0b0914] mb-2">{m.title}</h4>
                    <ul className="space-y-1">
                      {m.points.map((p) => (
                        <li key={p} className="flex items-center gap-2 text-[11px] md:text-xs font-semibold text-[#0b0914]/70">
                          <CheckCircle2 className="w-3 h-3 text-[#0a2540] shrink-0" aria-hidden="true" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {step.stats && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                {step.stats.map((s) => (
                  <div key={s.label} className="rounded-xl bg-[#0b0914] text-center py-3 px-2 border border-[#0a2540]/40">
                    <div className="text-base md:text-lg font-black text-[#ffd000] leading-none">{s.value}</div>
                    <div className="text-[9px] md:text-[10px] font-black uppercase tracking-wider text-[#f4f4f6] mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            )}

            {step.cta && (
              <div className="mb-4">
                {step.cta.type === 'internal' && (
                  <Link
                    href={step.cta.href}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#ffd000] text-[#0b0914] text-xs font-black uppercase tracking-widest hover:bg-[#ffdb33] transition-all hover:scale-105 shadow-md"
                  >
                    {step.cta.label} <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                )}
                {step.cta.type === 'external' && (
                  <a
                    href={step.cta.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#ffd000] text-[#0b0914] text-xs font-black uppercase tracking-widest hover:bg-[#ffdb33] transition-all hover:scale-105 shadow-md"
                  >
                    <Download className="w-4 h-4" aria-hidden="true" /> {step.cta.label}
                  </a>
                )}
                {step.cta.type === 'whatsapp' && (
                  <a
                    href={waLink(step.cta.message)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#ffd000] text-[#0b0914] text-xs font-black uppercase tracking-widest hover:bg-[#ffdb33] transition-all hover:scale-105 shadow-md"
                  >
                    <MessageCircle className="w-4 h-4" aria-hidden="true" /> {step.cta.label}
                  </a>
                )}
              </div>
            )}

            {isInView && step.tip && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="p-3 rounded-xl bg-[#0b0914]/5 border border-[#0a2540]/20 flex gap-2.5"
              >
                <div className="w-6 h-6 rounded-md bg-[#0a2540]/20 flex items-center justify-center shrink-0">
                  <AlertCircle className="w-3.5 h-3.5 text-[#0a2540]" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-[#0a2540] font-black text-[10px] uppercase tracking-wider">Pro Tip</p>
                  <p className="text-[#0b0914]/75 text-xs font-medium mt-0.5">{step.tip}</p>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// MAIN PAGE
// ---------------------------------------------------------------------------
export default function SetupPage() {
  const [activeDevice, setActiveDevice] = useState<DeviceId>('firestick');
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const currentData = STEP_DATA[activeDevice];
  const CurrentIcon = currentData.icon;
  const modalCloseButtonRef = useRef<HTMLButtonElement>(null);

  const openVideo = () => setIsVideoOpen(true);
  const closeVideo = () => setIsVideoOpen(false);

  // Escape key closes modal
  useEffect(() => {
    if (!isVideoOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsVideoOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    modalCloseButtonRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isVideoOpen]);

  return (
    <div className="flex flex-col min-h-screen bg-[#0b0914]">

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/img/bg-1.webp"
            alt="Setup Krooz TV SUBSCRIPTION on Firestick, Smart TV, Android and iOS"
            width={1920}
            height={1080}
            priority
            className="w-full h-full object-cover brightness-[0.2]"
            sizes="100vw"
            quality={85}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0914]/20 via-transparent to-[#0b0914]/20" />
        </div>

        <div className="absolute inset-0 z-0 opacity-5" style={HERO_GRID_STYLE} aria-hidden="true" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#0a2540]/40 blur-[150px] rounded-full pointer-events-none z-0" aria-hidden="true" />

        <div className="max-w-4xl mx-auto px-4 pt-24 text-center relative z-10 flex flex-col items-center justify-center">
          <FadeInStagger className="flex flex-col items-center justify-center text-center">
            <FadeInItem>
              <div className="inline-flex items-center gap-2 bg-[#0a2540] px-4 py-2 rounded-full mb-6 shadow-md">
                <Sparkles className="w-4 h-4 text-[#ffd000]" aria-hidden="true" />
                <span className="text-[#f4f4f6] font-black text-xs uppercase tracking-widest">
                  Easy Setup Krooz TV SUBSCRIPTION 🇺🇸
                </span>
              </div>
            </FadeInItem>

            <FadeInItem>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-[#f4f4f6] tracking-tighter uppercase mb-6 leading-none text-center">
                SETUP Krooz TV SUBSCRIPTION <br />
                <span className="text-[#ffd000]">IN UNDER 10 MINUTES</span>
              </h1>
            </FadeInItem>

            <FadeInItem>
              <p className="text-base sm:text-lg md:text-xl text-[#e5e7eb]/85 font-bold max-w-2xl mx-auto leading-relaxed px-2 text-center mb-6">
                Install <strong className="text-[#f4f4f6]">IBO Player Pro</strong> and let our team handle the rest on chat. Krooz TV SUBSCRIPTION setup made simple for Firestick, Smart TV, Apple, and PC or Mac.
              </p>
            </FadeInItem>

            <FadeInItem>
              <div className="w-full flex items-center justify-center mb-8">
                <div className="inline-flex items-center justify-center flex-wrap sm:flex-nowrap gap-2.5 sm:gap-4 px-4 py-2 rounded-full bg-[#0b0914]/60 border border-[#0a2540] shadow-xl backdrop-blur-md">
                  <div className="flex items-center gap-1.5 shrink-0"><FlagUS /><span className="text-[11px] sm:text-xs font-black uppercase text-[#f4f4f6]">USA</span></div>
                  <span className="text-[#e5e7eb]/20 text-xs font-black" aria-hidden="true">•</span>
                  <div className="flex items-center gap-1.5 shrink-0"><FlagCA /><span className="text-[11px] sm:text-xs font-black uppercase text-[#f4f4f6]">Canada</span></div>
                  <span className="text-[#e5e7eb]/20 text-xs font-black" aria-hidden="true">•</span>
                  <div className="flex items-center gap-1.5 shrink-0"><FlagUK /><span className="text-[11px] sm:text-xs font-black uppercase text-[#f4f4f6]">UK</span></div>
                  <span className="text-[#e5e7eb]/20 text-xs font-black" aria-hidden="true">•</span>
                  <div className="flex items-center gap-1.5 shrink-0"><FlagAU /><span className="text-[11px] sm:text-xs font-black uppercase text-[#f4f4f6]">Australia</span></div>
                </div>
              </div>
            </FadeInItem>

            <FadeInItem>
              <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-[#e5e7eb]/70 text-xs md:text-sm font-black uppercase tracking-widest">
                <span className="flex items-center gap-2"><Lock className="w-4 h-4 text-[#ffd000]" aria-hidden="true" /> Secure Setup</span>
                <span className="flex items-center gap-2"><Zap className="w-4 h-4 text-[#ffd000]" aria-hidden="true" /> 10 Min Setup</span>
                <span className="flex items-center gap-2"><Headphones className="w-4 h-4 text-[#ffd000]" aria-hidden="true" /> 24/7 Support</span>
                <span className="flex items-center gap-2"><Users className="w-4 h-4 text-[#ffd000]" aria-hidden="true" /> 15,000+ Viewers</span>
              </div>
            </FadeInItem>

            <FadeInItem className="mt-8 relative flex justify-center">
              <button
                type="button"
                onClick={openVideo}
                aria-haspopup="dialog"
                aria-expanded={isVideoOpen}
                className="inline-flex items-center justify-center p-2 rounded-full bg-[#f4f4f6]/10 border border-[#f4f4f6]/20 hover:border-[#0a2540]/60 transition-all duration-300 relative z-10 shadow-inner group cursor-pointer focus-visible:ring-2 focus-visible:ring-[#ffd000]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0914]"
                aria-label="Watch setup Krooz TV SUBSCRIPTION video tutorial"
              >
                <div className="flex items-center gap-4 bg-[#f4f4f6]/5 px-6 sm:px-8 py-4 sm:py-5 rounded-full border border-[#f4f4f6]/10 hover:bg-[#f4f4f6]/10 transition-colors">
                  <PlayCircle className="w-8 h-8 sm:w-10 sm:h-10 text-[#ffd000] shrink-0 group-hover:scale-110 transition-transform" aria-hidden="true" />
                  <div className="text-left">
                    <p className="text-[#f4f4f6] font-black uppercase tracking-widest text-xs sm:text-sm md:text-base">
                      Video Tutorial
                    </p>
                    <p className="text-[#e5e7eb]/60 text-[10px] sm:text-xs font-bold uppercase tracking-wide mt-0.5">
                      Visual step by step guide
                    </p>
                  </div>
                </div>
              </button>
              <div className="absolute inset-0 rounded-full bg-[#0a2540]/30 animate-pulse blur-md scale-110 pointer-events-none" aria-hidden="true" />
            </FadeInItem>
          </FadeInStagger>
        </div>
      </section>

      {/* CTA BANNER — Free Trial */}
      <section className="w-full bg-gradient-to-r from-[#0a2540] via-[#0b0914] to-[#0a2540] py-10 px-4 sm:px-6 border-y-4 border-[#ffd000]/30 shadow-[0_0_50px_rgba(10,37,64,0.5)] relative z-20 overflow-hidden">
        <div className="max-w-3xl mx-auto flex flex-col items-center justify-center text-center relative z-10 gap-5">
          <div className="relative inline-block">
            <div className="bg-[#ffd000] text-[#0b0914] font-black text-xs px-5 py-2 rounded-full uppercase tracking-widest shadow-md animate-bounce">
              FREE 24 HOUR TRIAL
            </div>
            <div className="absolute inset-0 rounded-full bg-[#ffd000]/30 animate-ping opacity-75 pointer-events-none" aria-hidden="true" />
          </div>
          <h2 className="text-[#f4f4f6] text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tighter leading-none drop-shadow-md max-w-2xl">
            TRY Krooz TV SUBSCRIPTION WITH IBO PLAYER PRO FREE!
          </h2>
          <p className="text-[#e5e7eb]/90 text-sm sm:text-base md:text-lg font-bold max-w-xl leading-relaxed">
            36,000+ live channels, 120,000+ movies and TV shows, live sport. Activated via chat in minutes.
          </p>
          <div className="w-full sm:w-auto mt-2 flex flex-col sm:flex-row gap-3">
            <a
              href={waLink("Hi! I would like the free 24 hour trial for Krooz TV SUBSCRIPTION setup.")}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#ffd000] text-[#0b0914] hover:bg-[#ffdb33] hover:scale-105 transition-all duration-300 px-8 sm:px-10 py-4 rounded-full font-black text-sm uppercase tracking-widest shadow-2xl"
            >
              <MessageCircle className="w-5 h-5" aria-hidden="true" /> <span>Get Free Trial</span>
            </a>
            <Link
              href="/pricing"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#0a2540] text-[#ffd000] hover:bg-[#ffd000] hover:text-[#0b0914] transition-all duration-300 px-8 sm:px-10 py-4 rounded-full font-black text-sm uppercase tracking-widest shadow-2xl border-2 border-[#ffd000]/40"
            >
              View Plans <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* DEVICE SELECTION */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full bg-[#0b0914]">
        <FadeIn className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#f4f4f6] mb-4 uppercase tracking-tighter leading-none">
            Setup Krooz TV SUBSCRIPTION on <span className="text-[#ffd000]">Your Device</span>
          </h2>
          <p className="text-[#e5e7eb]/85 text-base md:text-lg font-bold max-w-2xl mx-auto mt-4">
            Select your platform below for detailed step by step setup instructions.
          </p>
        </FadeIn>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {DEVICES.map((device) => {
            const Icon = device.icon;
            const isActive = activeDevice === device.id;
            return (
              <button
                key={device.id}
                type="button"
                onClick={() => setActiveDevice(device.id)}
                aria-pressed={isActive}
                className={`relative p-4 sm:p-6 rounded-3xl text-center transition-all duration-300 cursor-pointer group focus-visible:ring-2 focus-visible:ring-[#ffd000]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0914] ${
                  isActive
                    ? 'bg-[#f4f4f6] text-[#0b0914] border-2 border-[#0a2540] shadow-2xl scale-[1.02]'
                    : 'bg-[#f4f4f6] text-[#0b0914] border-2 border-transparent hover:border-[#0a2540]/40'
                }`}
              >
                {device.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0a2540] text-[#ffd000] font-black uppercase text-[10px] tracking-widest px-3 py-1 rounded-full whitespace-nowrap shadow-md border border-[#ffd000]/40">
                    Most Popular
                  </div>
                )}
                <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4 transition-colors ${isActive ? 'bg-[#0b0914] text-[#ffd000]' : 'bg-[#0b0914]/5 text-[#0a2540]'}`}>
                  <Icon className="w-7 h-7 sm:w-8 sm:h-8 shrink-0" aria-hidden="true" />
                </div>
                <h3 className="text-sm sm:text-base md:text-lg font-black uppercase tracking-wide mb-2">{device.name}</h3>
                <p className={`text-[10px] sm:text-xs font-bold ${isActive ? 'text-[#0b0914]/60' : 'text-[#0b0914]/40'}`}>
                  {device.stepCount} easy steps
                </p>
              </button>
            );
          })}
        </div>
      </section>

      {/* TIMELINE */}
      <section className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full bg-[#0b0914]">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0a2540] text-[#f4f4f6] font-black uppercase text-xs tracking-widest mb-4 shadow-md max-w-full border border-[#ffd000]/30">
            <CurrentIcon className="w-4 h-4 text-[#ffd000] shrink-0" aria-hidden="true" />
            <span className="truncate">{currentData.title}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#f4f4f6] mb-4 uppercase tracking-tighter">
            Setup Krooz TV SUBSCRIPTION <span className="text-[#ffd000]">Step by Step</span>
          </h2>
          <p className="text-[#e5e7eb]/60 text-sm md:text-base font-bold uppercase tracking-widest mt-2">
            Follow the steps for a flawless setup in under 10 minutes
          </p>
        </div>

        <div className="relative px-2">
          {currentData.steps.map((step, index) => (
            <StepItem
              key={`${activeDevice}-${step.number}`}
              step={step}
              index={index}
              isLast={index === currentData.steps.length - 1}
            />
          ))}
        </div>

        {/* Success Card */}
        <motion.div
          className="text-center mt-12 p-6 sm:p-8 md:p-10 rounded-3xl bg-[#f4f4f6] border-4 border-[#0a2540] shadow-2xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <CheckCircle2 className="w-12 h-12 sm:w-14 sm:h-14 text-[#0a2540] mx-auto mb-4" aria-hidden="true" />
          <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-[#0b0914] uppercase tracking-tight mb-3">
            Setup Complete! 🇺🇸
          </h3>
          <p className="text-[#0a2540] font-bold text-sm sm:text-base max-w-md mx-auto mb-8">
            You are ready to stream with IBO Player Pro. Enjoy 36,000+ channels and 120,000+ movies and TV shows.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-md mx-auto">
            <Link href="/" className="w-full sm:w-auto text-center whitespace-nowrap px-6 py-4 rounded-full bg-[#ffd000] text-[#0b0914] font-black text-sm uppercase tracking-widest transition-transform hover:scale-105 border border-[#ffd000]">
              Back to Home
            </Link>
            <Link href="/pricing" className="w-full sm:w-auto text-center whitespace-nowrap px-6 py-4 rounded-full bg-[#0a2540] text-[#ffd000] font-black text-sm uppercase tracking-widest transition-transform hover:scale-105 border-2 border-[#ffd000]/40">
              View Plans
            </Link>
          </div>
        </motion.div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-20 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full bg-[#0b0914]">
        <FadeIn className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-[#0a2540]/60 border border-[#ffd000]/40 px-4 py-1.5 rounded-full mb-6">
            <ShieldCheck className="w-4 h-4 text-[#ffd000]" aria-hidden="true" />
            <span className="text-[#ffd000] font-black text-xs uppercase tracking-widest">
              Why Customers Choose Us
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#f4f4f6] mb-6 uppercase tracking-tighter leading-tight max-w-4xl mx-auto">
            Why Setup Krooz TV SUBSCRIPTION <span className="text-[#ffd000]">With Our Team?</span>
          </h2>
          <p className="text-[#e5e7eb]/85 text-base md:text-lg font-bold max-w-3xl mx-auto leading-relaxed">
            Thousands of US viewers trust our hands on chat support to handle their entire Krooz TV SUBSCRIPTION setup, from plan selection to IBO Player Pro activation. Here is why customers pick us over generic DIY guides.
          </p>
        </FadeIn>

        <FadeInStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_CHOOSE_US.map((item, idx) => {
            const Icon = item.icon;
            return (
              <FadeInItem key={idx} className="bg-[#f4f4f6] border-2 border-[#0a2540]/20 rounded-2xl p-6 md:p-7 hover:border-[#0a2540] hover:shadow-[0_15px_40px_rgba(10,37,64,0.2)] hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-[#0a2540]/10 flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6 text-[#0a2540]" aria-hidden="true" />
                </div>
                <h3 className="text-lg md:text-xl font-black text-[#0b0914] uppercase tracking-tight mb-3">
                  {item.title}
                </h3>
                <p className="text-[#0b0914]/75 text-sm font-medium leading-relaxed">
                  {item.desc}
                </p>
              </FadeInItem>
            );
          })}
        </FadeInStagger>

        <FadeIn className="mt-12 max-w-3xl mx-auto text-center">
          <p className="text-[#e5e7eb]/85 text-sm sm:text-base font-medium leading-relaxed mb-8">
            Setup does not need to be complicated. Our team has activated thousands of subscriptions across Firestick, Smart TVs, Apple devices, Android boxes, and computers. Every customer gets the same white glove service: real time chat support, live guidance, and a complete IBO Player Pro activation service. Whether you are cord cutting for the first time or upgrading from a slow cable package, we will get you streaming in under 10 minutes.
          </p>
          <a
            href={waLink("Hi! I want setup Krooz TV SUBSCRIPTION help from your team.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#ffd000] text-[#0b0914] font-black text-sm uppercase tracking-widest shadow-[0_0_30px_rgba(255,208,0,0.3)] hover:bg-[#ffdb33] hover:scale-105 transition-transform border border-[#ffd000]"
          >
            <MessageCircle className="w-5 h-5" aria-hidden="true" /> Get Setup Help
          </a>
        </FadeIn>
      </section>

      {/* SUPPORT GRID */}
      <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full bg-[#0b0914]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <div className="bg-[#f4f4f6] border-4 border-[#0a2540] rounded-3xl p-6 sm:p-8 text-center shadow-xl group">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-[#0a2540]/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-[#0a2540]/20 transition-colors">
              <Gift className="w-7 h-7 sm:w-8 sm:h-8 text-[#0a2540]" aria-hidden="true" />
            </div>
            <h3 className="text-lg sm:text-xl font-black text-[#0b0914] mb-2 uppercase tracking-wide">
              Free 24 Hour Krooz TV SUBSCRIPTION Trial
            </h3>
            <p className="text-[#0a2540] text-sm font-medium mb-5">
              Try IBO Player Pro and our full service free for 24 hours. Message our chat team to activate instantly.
            </p>
            <a
              href={waLink("Hi! I would like the free 24 hour Krooz TV SUBSCRIPTION trial.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#0a2540] font-black uppercase text-xs tracking-widest hover:gap-3 transition-all"
            >
              Request Free Trial <ArrowRight className="w-4 h-4 text-[#0b0914]" aria-hidden="true" />
            </a>
          </div>

          <div className="bg-[#f4f4f6] border-4 border-[#0a2540] rounded-3xl p-6 sm:p-8 text-center shadow-xl group">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-[#0a2540]/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-[#0a2540]/20 transition-colors">
              <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8 text-[#0a2540]" aria-hidden="true" />
            </div>
            <h3 className="text-lg sm:text-xl font-black text-[#0b0914] mb-2 uppercase tracking-wide">
              24/7 Setup Support
            </h3>
            <p className="text-[#0a2540] text-sm font-medium mb-5">
              Our team handles everything over chat: plan, payment, IBO Player Pro activation, and full setup.
            </p>
            <a
              href={waLink("Hi! I need setup Krooz TV SUBSCRIPTION help.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#0a2540] font-black uppercase text-xs tracking-widest hover:gap-3 transition-all"
            >
              Chat With Us <ArrowRight className="w-4 h-4 text-[#0b0914]" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      {/* Share */}
      <div className="w-full flex justify-center items-center mb-10">
        <ShareButtons />
      </div>

      {/* FAQ — Short 8 items */}
      <section className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full bg-[#0b0914] relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-96 bg-[#0a2540]/20 blur-[120px] rounded-full pointer-events-none" aria-hidden="true" />

        <FadeIn className="text-center mb-16 relative z-10">
          <div className="inline-flex items-center gap-2 bg-[#0a2540] px-4 py-2 rounded-full mb-6 shadow-md border border-[#ffd000]/30">
            <span className="text-[#ffd000] font-black text-xs uppercase tracking-widest">Setup FAQ</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#f4f4f6] mb-6 uppercase tracking-tighter leading-none">
            Setup <span className="text-[#ffd000]">Questions</span>
          </h2>
          <p className="text-[#e5e7eb]/85 font-bold text-base md:text-lg max-w-2xl mx-auto mt-4">
            Quick answers to the most common setup questions.
          </p>
        </FadeIn>

        <FadeInStagger className="space-y-4 relative z-10">
          {SETUP_FAQS.map((faq, i) => (
            <FadeInItem key={faq.q}>
              <SetupFAQItem question={faq.q} answer={faq.a} defaultOpen={i === 0} />
            </FadeInItem>
          ))}
        </FadeInStagger>
      </section>

      {/* LONG FORM Q&A */}
      <section className="py-20 sm:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full bg-[#0b0914] relative">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-full max-w-2xl h-96 bg-[#0a2540]/20 blur-[130px] rounded-full pointer-events-none" aria-hidden="true" />

        <FadeIn className="text-center mb-12 md:mb-16 relative z-10">
          <div className="inline-flex items-center gap-2 bg-[#0a2540]/60 border border-[#ffd000]/40 px-4 py-1.5 rounded-full mb-6">
            <Globe className="w-4 h-4 text-[#ffd000]" aria-hidden="true" />
            <span className="text-[#ffd000] font-black text-xs uppercase tracking-widest">
              Deep Dive Guide
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#f4f4f6] mb-6 uppercase tracking-tighter leading-tight max-w-4xl mx-auto">
            Setup <span className="text-[#ffd000]">Explained in Depth</span>
          </h2>
          <p className="text-[#e5e7eb]/85 text-base md:text-lg font-bold max-w-3xl mx-auto leading-relaxed">
            Longer answers for the questions our support team hears most often. Each answer helps you get the most out of your Krooz TV SUBSCRIPTION and IBO Player Pro setup.
          </p>
        </FadeIn>

        <FadeInStagger className="space-y-6 relative z-10">
          {LONG_FORM_FAQS.map((item, idx) => (
            <FadeInItem key={idx} className="bg-[#f4f4f6] border-2 border-[#0a2540]/20 rounded-2xl p-6 md:p-8 hover:border-[#0a2540]/60 transition-colors">
              <h3 className="text-lg sm:text-xl md:text-2xl font-black text-[#0b0914] uppercase tracking-tight mb-4 flex items-start gap-3">
                <span className="text-[#0a2540] text-2xl shrink-0" aria-hidden="true">Q.</span>
                <span>{item.q}</span>
              </h3>
              <p className="text-[#0b0914]/80 font-medium leading-relaxed text-sm sm:text-base pl-6 sm:pl-8 border-l-4 border-[#0a2540]">
                {item.a}
              </p>
            </FadeInItem>
          ))}
        </FadeInStagger>

        <FadeIn className="mt-12 text-center">
          <a
            href={waLink("Hi! I have a question about setup Krooz TV SUBSCRIPTION.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#ffd000] text-[#0b0914] font-black text-sm uppercase tracking-widest hover:bg-[#ffdb33] hover:scale-105 transition-transform shadow-[0_0_30px_rgba(255,208,0,0.2)] border-2 border-[#ffd000]"
          >
            <Phone className="w-5 h-5 text-[#0b0914]" aria-hidden="true" /> Ask Our Team on Chat
          </a>
        </FadeIn>
      </section>

      {/* VIDEO MODAL */}
      {isVideoOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
          onClick={(e) => { if (e.target === e.currentTarget) closeVideo(); }}
          role="dialog"
          aria-modal="true"
          aria-label="Setup Krooz TV SUBSCRIPTION video tutorial"
        >
          <div className="relative w-full max-w-4xl">
            <button
              ref={modalCloseButtonRef}
              type="button"
              onClick={closeVideo}
              className="absolute -top-12 right-0 text-[#e5e7eb]/70 hover:text-[#ffd000] transition-colors cursor-pointer flex items-center gap-2 text-xs sm:text-sm font-bold z-10 uppercase tracking-widest focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ffd000]/60 rounded"
            >
              <X className="w-5 h-5 shrink-0" aria-hidden="true" /> Close Video
            </button>
            <div className="relative pb-[56.25%] h-0 rounded-2xl overflow-hidden shadow-2xl border-2 border-[#0a2540] bg-black">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/9pZOoS-1NHg?autoplay=1&rel=0&modestbranding=1"
                title="Setup Krooz TV SUBSCRIPTION - Complete Installation Tutorial"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}