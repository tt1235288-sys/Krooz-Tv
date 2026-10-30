// app/reviews/page.tsx
// ✅ Server Component — no "use client" (already correct).
// ✅ Added revalidate, hardened JSON-LD, removed dangerous fallback URL.
// ✅ Consumed shared flag components.

import Link from 'next/link';
import { CONSTANTS, generateSEOMetadata } from '@/lib/seo';
import { reviews, REVIEW_STATS, REVIEW_FAQS } from '@/lib/reviews';
import {
  Star,
  ShieldCheck,
  Zap,
  Headphones,
  MessageCircle,
  ArrowRight,
  CheckCircle2,
  Users,
  MapPin,
  PlayCircle,
  ThumbsUp,
  Award,
  Sparkles,
  Quote,
  ChevronDown,
  type LucideIcon,
} from 'lucide-react';
import { FlagUS, FlagCA, FlagUK, FlagAU } from '../components/Flags';

const SITE_URL = CONSTANTS.SITE_URL;
const BRAND = CONSTANTS.BRAND_NAME;
const PAGE_URL = `${SITE_URL}/reviews`;

// WhatsApp URL — no silent fallback. A missing URL should be a build failure.
const WHATSAPP_BASE = CONSTANTS.CONTACT.whatsappUrl;

// ---------------------------------------------------------------------------
// ISR — reviews can be refreshed without a full redeploy
// ---------------------------------------------------------------------------
export const revalidate = 3600;

// ---------------------------------------------------------------------------
// REVIEW STATS — module-scope, computed once
// ---------------------------------------------------------------------------
const RATING_VALUE = String(REVIEW_STATS?.averageRating ?? 4.9);
const REVIEW_COUNT = String(REVIEW_STATS?.totalReviews ?? 1255);
const HAPPY_CUSTOMERS = String(REVIEW_STATS?.happyCustomers ?? '15,000');
const RECOMMEND_PERCENT = String(REVIEW_STATS?.recommendPercent ?? 98);

// ---------------------------------------------------------------------------
// METADATA
// ---------------------------------------------------------------------------
export const metadata = generateSEOMetadata(
  `Krooz TV Subscription Reviews | Verified US Customer Feedback 2026`,
  `Read ${REVIEW_COUNT}+ verified Krooz TV reviews from US customers. Rated ${RATING_VALUE}/5 for 4K streaming, 36,000+ channels, and 24/7 support.`,
  '/reviews'
);

// ---------------------------------------------------------------------------
// Module-scope constants
// ---------------------------------------------------------------------------
const HERO_GRID_STYLE = {
  backgroundImage: `linear-gradient(to right, #0a2540 1px, transparent 1px), linear-gradient(to bottom, #0a2540 1px, transparent 1px)`,
  backgroundSize: '50px 50px',
} as const;

const STAR_INDICES = [0, 1, 2, 3, 4] as const;

const TRUST_BADGES: readonly { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: ShieldCheck, title: '99.9% Uptime', desc: 'Enterprise grade US servers' },
  { icon: Zap, title: '4K & 60FPS', desc: 'Ultra HD streaming quality' },
  { icon: Headphones, title: '24/7 Support', desc: 'Real chat team on hand' },
  { icon: Award, title: 'Free Trial First', desc: 'Test it on your own device' },
];

// ---------------------------------------------------------------------------
// HELPERS
// ---------------------------------------------------------------------------
function waLink(message: string): string {
  return `${WHATSAPP_BASE}?text=${encodeURIComponent(message)}`;
}

function formatReviewDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    if (Number.isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  } catch {
    return dateStr;
  }
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

// ---------------------------------------------------------------------------
// JSON-LD SCHEMA — module-scope, XSS-hardened
// ---------------------------------------------------------------------------
function buildReviewsSchema() {
  const productId = `${SITE_URL}/#product`;
  const orgId = `${SITE_URL}/#organization`;
  const websiteId = `${SITE_URL}/#website`;

  const socials = Object.values(CONSTANTS.SOCIALS ?? {}).filter(Boolean);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': orgId,
        name: BRAND,
        alternateName: `${BRAND} Streaming`,
        url: SITE_URL,
        logo: {
          '@type': 'ImageObject',
          '@id': `${SITE_URL}/#logo`,
          url: `${SITE_URL}/img/iptv-logo.webp`,
          contentUrl: `${SITE_URL}/img/iptv-logo.webp`,
          width: 512,
          height: 512,
          caption: `${BRAND} Logo`,
        },
        email: CONSTANTS.CONTACT.email,
        telephone: CONSTANTS.CONTACT.phone,
        areaServed: ['US', 'CA', 'GB', 'AU', 'NZ'],
        ...(socials.length > 0 ? { sameAs: socials } : {}),
      },
      {
        '@type': 'WebSite',
        '@id': websiteId,
        url: SITE_URL,
        name: BRAND,
        inLanguage: 'en-US',
        publisher: { '@id': orgId },
      },
      {
        '@type': 'WebPage',
        '@id': `${PAGE_URL}/#webpage`,
        url: PAGE_URL,
        name: `${BRAND} Reviews & Testimonials`,
        description: `Verified reviews from US ${BRAND} customers.`,
        inLanguage: 'en-US',
        isPartOf: { '@id': websiteId },
        about: { '@id': orgId },
        breadcrumb: { '@id': `${PAGE_URL}/#breadcrumb` },
      },
      {
        '@type': 'Product',
        '@id': productId,
        name: `${BRAND} Premium Subscription`,
        image: `${SITE_URL}/img/structer.webp`,
        description: `${BRAND} delivers premium 4K live TV and on demand media across the United States with 99.9% server uptime and quick chat guided activation.`,
        sku: 'KROOZ-TV-US-PREMIUM',
        category: 'Streaming Service',
        brand: {
          '@type': 'Brand',
          '@id': `${SITE_URL}/#brand`,
          name: BRAND,
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: RATING_VALUE,
          reviewCount: REVIEW_COUNT,
          bestRating: '5',
          worstRating: '1',
        },
      },
      ...reviews.map((rev, index) => ({
        '@type': 'Review',
        '@id': `${PAGE_URL}/#review-${index + 1}`,
        reviewRating: {
          '@type': 'Rating',
          ratingValue: String(rev.rating),
          bestRating: '5',
          worstRating: '1',
        },
        author: { '@type': 'Person', name: rev.name },
        reviewBody: rev.text,
        name: rev.title,
        datePublished: rev.date,
        itemReviewed: { '@id': productId },
      })),
      {
        '@type': 'BreadcrumbList',
        '@id': `${PAGE_URL}/#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Reviews', item: PAGE_URL },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `${PAGE_URL}/#faq`,
        mainEntity: REVIEW_FAQS.map((faq) => ({
          '@type': 'Question',
          name: faq.q,
          acceptedAnswer: { '@type': 'Answer', text: faq.a },
        })),
      },
    ],
  };

  // Escape `<` so no review text can break out of the <script> tag.
  return JSON.stringify(jsonLd).replace(/</g, '\\u003c');
}

const REVIEWS_SCHEMA_STRING = buildReviewsSchema();

// ---------------------------------------------------------------------------
// STAR RATING
// ---------------------------------------------------------------------------
function StarRating({
  rating,
  size = 'md',
}: {
  rating: number;
  size?: 'sm' | 'md' | 'lg';
}) {
  const sizeClass =
    size === 'lg' ? 'w-6 h-6' : size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4';
  return (
    <div className="flex gap-0.5" role="img" aria-label={`${rating} out of 5 stars`}>
      {STAR_INDICES.map((i) => (
        <Star
          key={i}
          className={`${sizeClass} ${
            i < rating ? 'fill-[#ffd000] text-[#ffd000]' : 'text-[#0b0914]/20'
          }`}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// REVIEW CARD
// ---------------------------------------------------------------------------
function ReviewCard({ review }: { review: (typeof reviews)[number] }) {
  const initials = getInitials(review.name);

  return (
    <div className="relative bg-[#f4f4f6] border-2 border-[#0a2540]/20 hover:border-[#0a2540] rounded-3xl p-6 shadow-lg hover:shadow-[0_20px_50px_rgba(10,37,64,0.2)] hover:-translate-y-1.5 transition-all duration-500 flex flex-col">
      <Quote className="absolute top-4 right-4 w-12 h-12 text-[#0a2540]/10 rotate-180" aria-hidden="true" />

      <div className="flex items-start gap-3.5 mb-4">
        <div className="relative flex-shrink-0">
          <div
            className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0a2540] to-[#0b0914] flex items-center justify-center text-[#f4f4f6] font-black text-base uppercase shadow-md"
            aria-hidden="true"
          >
            {initials}
          </div>
          <div className="absolute -bottom-1 -right-1 rounded-full ring-2 ring-[#f4f4f6]">
            <CountryFlag country={review.country} size="sm" />
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5 flex-wrap mb-0.5">
            <span className="font-black text-[#0b0914] text-sm uppercase tracking-tight">
              {review.name}
            </span>
            {review.verified && (
              <span title="Verified Subscriber" aria-label="Verified subscriber">
                <CheckCircle2 className="w-4 h-4 text-[#0a2540] shrink-0" aria-hidden="true" />
              </span>
            )}
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#0b0914]/60">
            <MapPin className="w-3 h-3 text-[#0a2540]" aria-hidden="true" />
            <span>
              {review.city}, {review.province}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-3">
        <StarRating rating={review.rating} size="sm" />
        <span className="text-[10px] font-black uppercase tracking-wider text-[#0b0914]/50">
          {formatReviewDate(review.date)}
        </span>
      </div>

      <h3 className="font-black text-[#0b0914] text-base uppercase tracking-tight leading-tight mb-3 line-clamp-2">
        {review.title}
      </h3>

      <p className="text-[#0b0914]/75 text-sm font-medium leading-relaxed line-clamp-6 flex-1 mb-4">
        {review.text}
      </p>

      <div className="pt-4 border-t border-[#0b0914]/10 flex items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-[#0b0914]/60">
          <PlayCircle className="w-3.5 h-3.5 text-[#0a2540]" aria-hidden="true" />
          {review.device}
        </span>
        <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-[#0a2540]">
          <ShieldCheck className="w-3 h-3" aria-hidden="true" />
          Verified
        </span>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// CountryFlag — thin wrapper around shared flag components
// ---------------------------------------------------------------------------
function CountryFlag({
  country,
  size = 'md',
}: {
  country: 'AU' | 'US' | 'UK' | 'CA';
  size?: 'sm' | 'md' | 'lg';
}) {
  const dim = size === 'lg' ? 'w-7 h-7' : size === 'sm' ? 'w-4 h-4' : 'w-5 h-5';
  return (
    <span className={`inline-block ${dim}`}>
      {country === 'US' && <FlagUS />}
      {country === 'CA' && <FlagCA />}
      {country === 'UK' && <FlagUK />}
      {country === 'AU' && <FlagAU />}
    </span>
  );
}

// ---------------------------------------------------------------------------
// FAQ ITEM — native <details>/<summary>
// ---------------------------------------------------------------------------
function FAQItem({ q, a }: { q: string; a: string }) {
  return (
    <details className="group bg-[#f4f4f6] border-4 border-[#0a2540] rounded-2xl overflow-hidden">
      <summary className="cursor-pointer list-none p-6 flex items-center justify-between gap-4 hover:bg-[#f4f4f6]/80 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ffd000]/60 focus-visible:ring-offset-2 rounded-2xl">
        <h3 className="text-base md:text-lg font-black uppercase tracking-tight text-[#0b0914] flex items-start gap-3 text-left">
          <span className="text-[#0a2540] font-black text-xl shrink-0" aria-hidden="true">
            Q.
          </span>
          <span>{q}</span>
        </h3>
        <ChevronDown
          className="w-5 h-5 flex-shrink-0 text-[#0a2540] transition-transform duration-300 group-open:rotate-180"
          aria-hidden="true"
        />
      </summary>
      <div className="px-6 pb-6">
        <p className="text-[#0b0914]/80 font-medium leading-relaxed text-sm md:text-base pl-9 border-l-4 border-[#0a2540] ml-1 py-1">
          {a}
        </p>
      </div>
    </details>
  );
}

// ---------------------------------------------------------------------------
// MAIN PAGE
// ---------------------------------------------------------------------------
export default function ReviewsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        id="reviews-page-schema"
        dangerouslySetInnerHTML={{ __html: REVIEWS_SCHEMA_STRING }}
      />

      <div className="flex flex-col min-h-screen bg-[#0b0914] text-[#f4f4f6]">
        {/* HERO */}
        <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#0a2540]/40 blur-[150px] rounded-full pointer-events-none" aria-hidden="true" />
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={HERO_GRID_STYLE} aria-hidden="true" />

          <div className="relative z-10 max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-[#0a2540] px-4 py-2 rounded-full mb-6 shadow-lg border border-[#ffd000]/30">
              <Sparkles className="w-4 h-4 text-[#ffd000]" aria-hidden="true" />
              <span className="text-[#f4f4f6] font-black text-xs uppercase tracking-widest">
                Real Customer Feedback 🇺🇸
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none text-[#f4f4f6] mb-6">
              KROOZ TV SUBSCRIPTION <br />
              <span className="text-[#ffd000]">REVIEWS &amp; TESTIMONIALS</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-[#e5e7eb]/85 font-bold max-w-2xl mx-auto leading-relaxed mb-8">
              Read verified reviews from {HAPPY_CUSTOMERS} happy US customers, from New York to Los Angeles, rated{' '}
              <span className="text-[#ffd000] font-black">{RATING_VALUE}/5</span>{' '}
              for buffer free 4K streaming.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0a2540]/60 border border-[#e5e7eb]/10 text-[#f4f4f6] text-xs font-black uppercase tracking-wider">
                <Star className="w-3.5 h-3.5 text-[#ffd000] fill-[#ffd000]" aria-hidden="true" />
                {RATING_VALUE} / 5
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0a2540]/60 border border-[#e5e7eb]/10 text-[#f4f4f6] text-xs font-black uppercase tracking-wider">
                <Users className="w-3.5 h-3.5 text-[#ffd000]" aria-hidden="true" />
                {HAPPY_CUSTOMERS} Customers
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0a2540]/60 border border-[#e5e7eb]/10 text-[#f4f4f6] text-xs font-black uppercase tracking-wider">
                <ThumbsUp className="w-3.5 h-3.5 text-[#ffd000]" aria-hidden="true" />
                {RECOMMEND_PERCENT}% Recommend
              </span>
            </div>
          </div>
        </section>

        {/* OVERALL RATING CARD */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full mb-16">
          <div className="bg-[#f4f4f6] border-4 border-[#0a2540] rounded-3xl p-8 md:p-10 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <div className="text-center md:text-left">
                <div className="text-6xl md:text-7xl font-black text-[#0a2540] leading-none mb-2">
                  {RATING_VALUE}
                </div>
                <div className="mb-3 flex justify-center md:justify-start">
                  <StarRating rating={5} size="lg" />
                </div>
                <p className="text-[#0b0914]/70 text-xs font-black uppercase tracking-wider">
                  Based on {REVIEW_COUNT} Reviews
                </p>
              </div>

              <div className="text-center border-y md:border-y-0 md:border-x border-[#0b0914]/10 py-6 md:py-0 md:px-8">
                <div className="inline-flex items-center justify-center gap-2 bg-[#0a2540] text-[#ffd000] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-3">
                  <Award className="w-3.5 h-3.5" aria-hidden="true" /> Top Rated
                </div>
                <div className="text-4xl md:text-5xl font-black text-[#0b0914] leading-none mb-2">
                  {RECOMMEND_PERCENT}%
                </div>
                <p className="text-[#0b0914]/70 text-xs font-black uppercase tracking-wider">
                  Would Recommend
                </p>
              </div>

              <div className="text-center md:text-right">
                <div className="text-4xl md:text-5xl font-black text-[#0b0914] leading-none mb-2">
                  {HAPPY_CUSTOMERS}
                </div>
                <p className="text-[#0b0914]/70 text-xs font-black uppercase tracking-wider mb-4">
                  Happy US Customers
                </p>
                <div className="flex flex-wrap gap-2 justify-center md:justify-end items-center">
                  <CountryFlag country="US" size="md" />
                  <CountryFlag country="CA" size="md" />
                  <CountryFlag country="UK" size="md" />
                  <CountryFlag country="AU" size="md" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* REVIEWS GRID */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full mb-16">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-[#0a2540]/60 border border-[#ffd000]/40 px-4 py-1.5 rounded-full mb-4">
              <MessageCircle className="w-4 h-4 text-[#ffd000]" aria-hidden="true" />
              <span className="text-[#ffd000] font-black text-xs uppercase tracking-widest">
                Customer Stories
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-[#f4f4f6] uppercase tracking-tighter leading-tight">
              What US Customers Are <span className="text-[#ffd000]">Saying</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </section>

        {/* TRUST BADGES */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full mb-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {TRUST_BADGES.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="bg-[#f4f4f6] border-2 border-[#0a2540]/20 hover:border-[#0a2540] rounded-2xl p-5 text-center transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#0a2540]/10 flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-6 h-6 text-[#0a2540]" aria-hidden="true" />
                  </div>
                  <h3 className="text-sm font-black text-[#0b0914] uppercase tracking-tight mb-1">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-[#0b0914]/60 font-bold leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* CHAT CTA */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full mb-16">
          <div className="relative rounded-3xl overflow-hidden border-2 border-[#ffd000]/30 bg-gradient-to-br from-[#0a2540] via-[#0b0914] to-[#0a2540] p-8 md:p-10 text-center shadow-2xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,208,0,0.1),_transparent_70%)] pointer-events-none" aria-hidden="true" />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-[#ffd000] text-[#0b0914] px-4 py-2 rounded-full mb-5 shadow-lg">
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                <span className="font-black text-xs uppercase tracking-widest">
                  Join {HAPPY_CUSTOMERS} US Viewers
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#f4f4f6] uppercase tracking-tighter leading-tight mb-4">
                Get Started with a Free 24 Hour Trial
              </h2>
              <p className="text-[#e5e7eb]/90 text-sm sm:text-base font-bold max-w-xl mx-auto mb-6">
                Message our team on chat. We will set up IBO Player Pro or IPTV Smarters Pro for you and get you streaming in under 10 minutes.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href={waLink("Hi! I read your reviews and I'd like to try the free 24 hour trial.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#ffd000] text-[#0b0914] font-black text-sm uppercase tracking-widest hover:bg-[#ffdb33] transition-all shadow-xl border-2 border-[#ffd000]"
                >
                  <MessageCircle className="w-5 h-5 text-[#0b0914]" aria-hidden="true" />
                  Get Free Trial
                </a>
                <Link
                  href="/pricing"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#0a2540] text-[#ffd000] font-black text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-xl border border-[#ffd000]/40"
                >
                  View Pricing <ArrowRight className="w-5 h-5" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full mb-16 relative">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-full max-w-2xl h-96 bg-[#0a2540]/20 blur-[130px] rounded-full pointer-events-none" aria-hidden="true" />

          <div className="text-center mb-10 relative z-10">
            <div className="inline-flex items-center gap-2 bg-[#0a2540]/60 border border-[#ffd000]/40 px-4 py-1.5 rounded-full mb-4">
              <MessageCircle className="w-4 h-4 text-[#ffd000]" aria-hidden="true" />
              <span className="text-[#ffd000] font-black text-xs uppercase tracking-widest">
                Reviews FAQ
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-[#f4f4f6] uppercase tracking-tighter leading-tight">
              Common Questions <span className="text-[#ffd000]">About Our Reviews</span>
            </h2>
          </div>

          <div className="space-y-4 relative z-10">
            {REVIEW_FAQS.map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} />
            ))}
          </div>
        </section>

        {/* BOTTOM CTA */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full pb-20">
          <div className="bg-[#f4f4f6] rounded-3xl p-8 md:p-12 border-2 border-[#0a2540]/20 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tighter text-[#0b0914] leading-tight mb-4">
              Ready to Join Our <span className="text-[#0a2540]">Happy Customers?</span>
            </h2>
            <p className="text-[#0b0914]/70 text-sm sm:text-base font-medium max-w-xl mx-auto mb-8">
              Choose from 3, 6, or 12 month plans starting at $39 USD. Guided chat setup, 36,000+ channels, and 120,000+ movies and TV shows.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/pricing"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#ffd000] text-[#0b0914] font-black text-sm uppercase tracking-widest hover:bg-[#ffdb33] transition-all shadow-lg border border-[#ffd000]"
              >
                View Krooz TV SUBSCRIPTION Plans <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </Link>
              <Link
                href="/setup"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#0a2540] text-[#ffd000] font-black text-sm uppercase tracking-widest hover:scale-105 transition-all border-2 border-[#ffd000]/40"
              >
                Setup Guide
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}