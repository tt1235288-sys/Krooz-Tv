// app/blog/page.tsx
// ✅ Server Component — no "use client". Full metadata export, hero + static
//    sections server-rendered. Pagination is URL-driven via searchParams,
//    so /blog, /blog?page=2, /blog?page=3 are all real, indexable URLs.

import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { blogPosts } from '@/lib/blog';
import { CONSTANTS } from '@/lib/seo';
import {
  ArrowRight,
  Clock,
  Calendar,
  Sparkles,
  Tag,
  MessageCircle,
  BookOpen,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

// ---------------------------------------------------------------------------
// CONSTANTS
// ---------------------------------------------------------------------------
const SITE_URL = `https://${CONSTANTS.DOMAIN}`;
const BRAND = CONSTANTS.BRAND_NAME;
const PAGE_URL = `${SITE_URL}/blog`;
const POSTS_PER_PAGE = 6;

// ---------------------------------------------------------------------------
// SEO SAFETY HELPERS
// ---------------------------------------------------------------------------
const clampTitle = (s: string, max = 60): string =>
  s.length <= max ? s : s.slice(0, max - 1).trimEnd() + '…';

const clampDescription = (s: string, max = 160): string =>
  s.length <= max ? s : s.slice(0, max - 3).trimEnd() + '...';

// ---------------------------------------------------------------------------
// SEO STRINGS
// ---------------------------------------------------------------------------
const PAGE_TITLE = clampTitle(
  `Krooz TV Blog | Setup Guides, Tips & News 2026`
);

const PAGE_DESCRIPTION = clampDescription(
  `Krooz TV blog with setup guides, app reviews, and streaming tips for Firestick, Smart TV and mobile. Updated weekly with fresh news.`
);

// ---------------------------------------------------------------------------
// METADATA
// ---------------------------------------------------------------------------
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: PAGE_TITLE,
    absolute: PAGE_TITLE,
  },
  description: PAGE_DESCRIPTION,
  authors: [{ name: `${BRAND} Team` }],
  creator: BRAND,
  publisher: BRAND,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: PAGE_URL,
    languages: {
      'en-US': PAGE_URL,
      'en-CA': PAGE_URL,
      'x-default': PAGE_URL,
    },
  },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: PAGE_URL,
    siteName: BRAND,
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/img/structer.webp`,
        width: 1200,
        height: 630,
        alt: `${BRAND} Blog - Krooz TV Setup Guides and Streaming Tips`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [`${SITE_URL}/img/structer.webp`],
  },
  category: 'entertainment',
  keywords: [
    'krooz tv blog',
    'best krooz tv subscription',
    'krooz tv usa',
    'iptv setup guide usa',
    'iptv firestick setup',
    'ibo player pro guide',
    'iptv reviews usa',
    'iptv service',
    'iptv provider',
    '4k iptv provider',
    'iptv smart tv guide',
    'streaming tips usa',
    'iptv news 2026',
  ],
};

// ---------------------------------------------------------------------------
// CATEGORY CONFIG
// ---------------------------------------------------------------------------
const CATEGORIES = [
  { id: 'all', label: 'All Posts' },
  { id: 'setup', label: 'Setup Guides' },
  { id: 'review', label: 'Reviews' },
  { id: 'sports', label: 'Live Sports' },
  { id: 'tips', label: 'Tips & Tricks' },
  { id: 'news', label: 'News' },
];

function getPostCategory(post: any): string {
  if (post.category) return post.category;
  const kw = (post.keywords || []).join(' ').toLowerCase();
  const title = (post.title || '').toLowerCase();
  if (title.includes('setup') || title.includes('install') || kw.includes('setup guide')) return 'setup';
  if (title.includes('review') || title.includes('compare') || title.includes('best')) return 'review';
  if (title.includes('sport') || kw.includes('live sports')) return 'sports';
  if (title.includes('tip') || title.includes('troubleshoot')) return 'tips';
  return 'news';
}

function getCategoryLabel(id: string): string {
  const map: Record<string, string> = {
    setup: 'Setup Guide',
    review: 'Review',
    sports: 'Live Sports',
    tips: 'Tips & Tricks',
    news: 'News',
  };
  return map[id] || 'Guide';
}

function getReadTime(post: any): string {
  if (post.readTime) return post.readTime;
  const words = (post.content || '').split(/\s+/).length;
  const mins = Math.max(5, Math.round(words / 220));
  return `${mins} min read`;
}

function formatDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

// ---------------------------------------------------------------------------
// SORT POSTS BY DATE DESC
// ---------------------------------------------------------------------------
const sortedPosts = [...blogPosts].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
);

const featuredPost = sortedPosts[0];
const restPosts = sortedPosts.slice(1);

// ---------------------------------------------------------------------------
// JSON-LD SCHEMAS
// ---------------------------------------------------------------------------
const BlogSchema = () => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Blog',
        '@id': `${PAGE_URL}/#blog`,
        name: `${BRAND} Blog`,
        description: `Setup guides, reviews, and Krooz TV tips for Firestick, Smart TV, and mobile streaming.`,
        url: PAGE_URL,
        inLanguage: 'en-US',
        publisher: { '@id': `${SITE_URL}/#organization` },
        blogPost: blogPosts.map((post) => ({
          '@type': 'BlogPosting',
          '@id': `${SITE_URL}/blog/${post.slug}/#article`,
          headline: post.title,
          description: post.description || post.excerpt || '',
          url: `${SITE_URL}/blog/${post.slug}`,
          datePublished: post.date,
          dateModified: post.date,
          inLanguage: 'en-US',
          author: {
            '@type': 'Person',
            name: post.author,
          },
          publisher: { '@id': `${SITE_URL}/#organization` },
          image: {
            '@type': 'ImageObject',
            url: post.image.startsWith('http') ? post.image : `${SITE_URL}${post.image}`,
          },
          keywords: (post.keywords || []).join(', '),
        })),
      },
      {
        '@type': 'CollectionPage',
        '@id': `${PAGE_URL}/#collection`,
        url: PAGE_URL,
        name: PAGE_TITLE,
        description: PAGE_DESCRIPTION,
        inLanguage: 'en-US',
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: { '@id': `${SITE_URL}/#organization` },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${PAGE_URL}/#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: SITE_URL,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Blog',
            item: PAGE_URL,
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      id="blog-page-schema"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};

// ---------------------------------------------------------------------------
// BLOG CARD COMPONENT
// ---------------------------------------------------------------------------
function BlogCard({ post, priority = false }: { post: any; priority?: boolean }) {
  const categoryId = getPostCategory(post);
  const categoryLabel = getCategoryLabel(categoryId);
  const readTime = getReadTime(post);
  const dateStr = formatDate(post.date);

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group relative flex flex-col bg-[#f4f4f6] rounded-3xl overflow-hidden border-2 border-[#0a2540]/20 hover:border-[#0a2540] hover:shadow-[0_20px_50px_rgba(10,37,64,0.35)] hover:-translate-y-2 transition-all duration-500"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-[#0b0914]">
        <Image
          src={post.image}
          alt={post.title}
          width={800}
          height={500}
          priority={priority}
          loading={priority ? 'eager' : 'lazy'}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0914] via-[#0b0914]/20 to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-500" />

        <div className="absolute top-3 left-3 z-10">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#0a2540] text-[#ffd000] text-[10px] font-black uppercase tracking-wider shadow-lg">
            <Tag className="w-3 h-3" />
            {categoryLabel}
          </span>
        </div>

        <div className="absolute top-3 right-3 z-10">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#0b0914]/80 backdrop-blur-md text-[#f4f4f6] text-[10px] font-black uppercase tracking-wider border border-[#e5e7eb]/15">
            <Clock className="w-3 h-3" />
            {readTime}
          </span>
        </div>
      </div>

      <div className="flex flex-col flex-1 p-5 md:p-6">
        <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-wider text-[#0b0914]/60 mb-3">
          <Calendar className="w-3 h-3 text-[#0a2540]" />
          <span>{dateStr}</span>
          <span className="text-[#0a2540]">•</span>
          <span>{post.author}</span>
        </div>

        <h3 className="text-base md:text-lg font-black text-[#0b0914] uppercase tracking-tight leading-snug mb-3 line-clamp-2 group-hover:text-[#0a2540] transition-colors">
          {post.title}
        </h3>

        <p className="text-[#0b0914]/70 text-sm font-medium leading-relaxed line-clamp-3 mb-4 flex-1">
          {post.description || post.excerpt || ''}
        </p>

        <div className="pt-4 border-t border-[#0b0914]/10 flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 text-[#0a2540] font-black text-xs uppercase tracking-widest group-hover:gap-2.5 transition-all">
            Read Article
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
          <div className="w-8 h-8 rounded-xl bg-[#0a2540]/10 border border-[#0a2540]/30 flex items-center justify-center text-[#0a2540] group-hover:bg-[#ffd000] group-hover:text-[#0b0914] group-hover:border-[#ffd000] transition-all duration-300">
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </Link>
  );
}

// ---------------------------------------------------------------------------
// FEATURED CARD COMPONENT
// ---------------------------------------------------------------------------
function FeaturedCard({ post }: { post: any }) {
  const categoryLabel = getCategoryLabel(getPostCategory(post));
  const readTime = getReadTime(post);
  const dateStr = formatDate(post.date);

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group relative grid grid-cols-1 lg:grid-cols-2 gap-0 bg-[#f4f4f6] rounded-[2rem] overflow-hidden border-2 border-[#0a2540] hover:shadow-[0_25px_60px_rgba(10,37,64,0.4)] transition-all duration-500"
    >
      <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[420px] overflow-hidden bg-[#0b0914]">
        <Image
          src={post.image}
          alt={post.title}
          width={900}
          height={600}
          priority
          loading="eager"
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#0b0914]/80 via-transparent to-transparent" />

        <div className="absolute top-4 left-4 z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0a2540] text-[#ffd000] text-[11px] font-black uppercase tracking-widest shadow-xl border border-[#ffd000]/40">
            <Sparkles className="w-3.5 h-3.5 text-[#ffd000]" />
            Featured
          </span>
        </div>
      </div>

      <div className="flex flex-col justify-center p-6 md:p-8 lg:p-10">
        <div className="flex flex-wrap items-center gap-2 text-[11px] font-black uppercase tracking-wider text-[#0b0914]/60 mb-4">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#0a2540]/10 text-[#0a2540] border border-[#0a2540]/30">
            <Tag className="w-3 h-3" />
            {categoryLabel}
          </span>
          <span className="inline-flex items-center gap-1">
            <Calendar className="w-3 h-3 text-[#0a2540]" />
            {dateStr}
          </span>
          <span className="text-[#0a2540]">•</span>
          <span className="inline-flex items-center gap-1">
            <Clock className="w-3 h-3 text-[#0a2540]" />
            {readTime}
          </span>
        </div>

        <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-[#0b0914] uppercase tracking-tight leading-tight mb-4 group-hover:text-[#0a2540] transition-colors">
          {post.title}
        </h2>

        <p className="text-[#0b0914]/70 text-sm md:text-base font-medium leading-relaxed mb-6 line-clamp-3">
          {post.description || post.excerpt || ''}
        </p>

        <div className="flex items-center gap-4">
          <span className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#ffd000] text-[#0b0914] font-black text-xs uppercase tracking-widest group-hover:gap-3 transition-all shadow-lg border border-[#ffd000]">
            Read Full Article
            <ArrowRight className="w-4 h-4" />
          </span>
          <span className="text-[#0b0914]/50 text-xs font-bold uppercase tracking-wider">
            by {post.author}
          </span>
        </div>
      </div>
    </Link>
  );
}

// ---------------------------------------------------------------------------
// MAIN PAGE — URL-driven pagination
// ---------------------------------------------------------------------------
type PageProps = {
  searchParams: Promise<{ page?: string }>;
};

export default async function BlogListing({ searchParams }: PageProps) {
  // Resolve the current page from the URL (?page=2), clamp to a valid range.
  const resolvedParams = await searchParams;
  const rawPage = resolvedParams?.page;
  const parsedPage = Number.parseInt(String(rawPage ?? '1'), 10);
  const requestedPage = Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1;

  const totalPages = Math.max(1, Math.ceil(restPosts.length / POSTS_PER_PAGE));
  const currentPage = Math.min(requestedPage, totalPages);

  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const currentPosts = restPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  // Pagination URL helper — page 1 uses the clean /blog URL, others use ?page=N
  const pageHref = (page: number) =>
    page === 1 ? '/blog' : `/blog?page=${page}`;

  // Window of page numbers to show around the current page (max 5 buttons)
  const pageNumbers: number[] = (() => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const start = Math.max(1, Math.min(currentPage - 2, totalPages - 4));
    return Array.from({ length: 5 }, (_, i) => start + i);
  })();

  return (
    <>
      <BlogSchema />

      <div className="flex flex-col min-h-screen bg-[#0b0914] text-[#f4f4f6]">

        {/* HERO */}
        <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#0a2540]/50 blur-[150px] rounded-full pointer-events-none" />
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(to right, #0a2540 1px, transparent 1px), linear-gradient(to bottom, #0a2540 1px, transparent 1px)`,
              backgroundSize: '50px 50px',
            }}
          />

          <div className="relative z-10 max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-[#0a2540] px-4 py-2 rounded-full mb-6 shadow-lg border border-[#ffd000]/30">
              <BookOpen className="w-4 h-4 text-[#ffd000]" />
              <span className="text-[#f4f4f6] font-black text-xs uppercase tracking-widest">
                Krooz TV Blog 🇺🇸
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none text-[#f4f4f6] mb-6">
              KROOZ TV <br />
              <span className="text-[#ffd000]">BLOG &amp; GUIDES</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-[#e5e7eb]/85 font-bold max-w-2xl mx-auto leading-relaxed mb-8">
              Setup guides, app reviews, streaming tips, and the latest news. Everything you need to get the most out of your Krooz TV subscription.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0a2540]/60 border border-[#e5e7eb]/10 text-[#f4f4f6] text-xs font-black uppercase tracking-wider">
                <TrendingUp className="w-3.5 h-3.5 text-[#ffd000]" />
                {blogPosts.length} Articles
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0a2540]/60 border border-[#e5e7eb]/10 text-[#f4f4f6] text-xs font-black uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-[#ffd000]" />
                Updated Weekly
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0a2540]/60 border border-[#e5e7eb]/10 text-[#f4f4f6] text-xs font-black uppercase tracking-wider">
                <MessageCircle className="w-3.5 h-3.5 text-[#ffd000]" />
                24/7 Support
              </span>
            </div>
          </div>
        </section>

        {/* CATEGORY FILTER CHIPS */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full mb-10">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {CATEGORIES.map((cat) => (
              <span
                key={cat.id}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all border-2 ${
                  cat.id === 'all'
                    ? 'bg-[#ffd000] text-[#0b0914] border-[#ffd000] shadow-lg shadow-[#ffd000]/30'
                    : 'bg-[#0a2540]/60 text-[#e5e7eb]/85 border-[#e5e7eb]/10'
                }`}
                aria-label={`Filter by ${cat.label}`}
              >
                {cat.label}
              </span>
            ))}
          </div>
        </section>

        {/* FEATURED POST — only on page 1 */}
        {currentPage === 1 && featuredPost && (
          <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full mb-16">
            <div className="mb-6 flex items-center gap-3">
              <div className="h-1 w-12 bg-[#ffd000] rounded-full" />
              <h2 className="text-sm font-black uppercase tracking-widest text-[#ffd000]">
                Featured Article
              </h2>
            </div>
            <FeaturedCard post={featuredPost} />
          </section>
        )}

        {/* ARTICLES GRID */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full mb-16">
          <div className="mb-6 flex items-center gap-3">
            <div className="h-1 w-12 bg-[#ffd000] rounded-full" />
            <h2 className="text-sm font-black uppercase tracking-widest text-[#ffd000]">
              {currentPage === 1 ? 'Latest Articles' : `Articles — Page ${currentPage}`}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {currentPosts.map((post, i) => (
              <BlogCard key={post.id} post={post} priority={currentPage === 1 && i < 3} />
            ))}
          </div>

          {/* PAGINATION — real links, URL-driven */}
          {totalPages > 1 && (
            <nav
              className="mt-12 flex items-center justify-center gap-2 sm:gap-3"
              aria-label="Blog pagination"
            >
              {currentPage === 1 ? (
                <span
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#0a2540]/40 text-[#e5e7eb]/40 border border-[#e5e7eb]/10 text-xs font-black uppercase tracking-widest cursor-not-allowed"
                  aria-disabled="true"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Prev
                </span>
              ) : (
                <Link
                  href={pageHref(currentPage - 1)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#0a2540] text-[#ffd000] border border-[#ffd000]/40 hover:bg-[#ffd000] hover:text-[#0b0914] transition-all text-xs font-black uppercase tracking-widest"
                  aria-label="Previous page"
                  rel="prev"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Prev
                </Link>
              )}

              {pageNumbers.map((n) => {
                const isCurrent = n === currentPage;
                return isCurrent ? (
                  <span
                    key={n}
                    className="w-10 h-10 rounded-full text-xs font-black flex items-center justify-center bg-[#ffd000] text-[#0b0914] shadow-lg shadow-[#ffd000]/30"
                    aria-current="page"
                  >
                    {n}
                  </span>
                ) : (
                  <Link
                    key={n}
                    href={pageHref(n)}
                    className="w-10 h-10 rounded-full text-xs font-black flex items-center justify-center bg-[#0a2540]/60 text-[#e5e7eb]/70 border border-[#e5e7eb]/10 hover:bg-[#0a2540] hover:text-[#ffd000] hover:border-[#ffd000]/40 transition-all"
                    aria-label={`Go to page ${n}`}
                  >
                    {n}
                  </Link>
                );
              })}

              {currentPage === totalPages ? (
                <span
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#0a2540]/40 text-[#e5e7eb]/40 border border-[#e5e7eb]/10 text-xs font-black uppercase tracking-widest cursor-not-allowed"
                  aria-disabled="true"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </span>
              ) : (
                <Link
                  href={pageHref(currentPage + 1)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#0a2540] text-[#ffd000] border border-[#ffd000]/40 hover:bg-[#ffd000] hover:text-[#0b0914] transition-all text-xs font-black uppercase tracking-widest"
                  aria-label="Next page"
                  rel="next"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </Link>
              )}
            </nav>
          )}
        </section>

        {/* CHAT CTA STRIP */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full mb-16">
          <div className="relative rounded-3xl overflow-hidden border-2 border-[#ffd000]/30 bg-gradient-to-br from-[#0a2540] via-[#0b0914] to-[#0a2540] p-8 md:p-10 text-center shadow-2xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,208,0,0.1),_transparent_70%)] pointer-events-none" />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-[#ffd000] text-[#0b0914] px-4 py-2 rounded-full mb-5 shadow-lg">
                <MessageCircle className="w-4 h-4" />
                <span className="font-black text-xs uppercase tracking-widest">
                  Need Help?
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#f4f4f6] uppercase tracking-tighter leading-tight mb-4">
                Get Free Krooz TV Setup Help
              </h3>
              <p className="text-[#e5e7eb]/90 text-sm sm:text-base font-bold max-w-xl mx-auto mb-6">
                Our team is on chat 24/7 to help with Firestick, Smart TV, or any device. Guided IBO Player Pro activation included.
              </p>
              <a
                href={`${CONSTANTS.CONTACT.whatsappUrl}?text=${encodeURIComponent(
                  `Hi ${BRAND}, I found your blog and need setup help.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#ffd000] text-[#0b0914] font-black text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-xl border-2 border-[#ffd000]"
              >
                <MessageCircle className="w-5 h-5 text-[#0b0914]" />
                Chat With Us
              </a>
            </div>
          </div>
        </section>

        {/* BOTTOM CTA */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full pb-20">
          <div className="bg-[#f4f4f6] rounded-3xl p-8 md:p-12 border-2 border-[#0a2540]/20 text-center">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tighter text-[#0b0914] leading-tight mb-4">
              Ready to Stream <span className="text-[#0a2540]">Krooz TV?</span>
            </h3>
            <p className="text-[#0b0914]/70 text-sm sm:text-base font-medium max-w-xl mx-auto mb-8">
              Choose from 3, 6, or 12 month plans starting at $39 USD. Guided chat setup, 36,000+ channels, and 120,000+ movies and TV shows.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/pricing"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#ffd000] text-[#0b0914] font-black text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-lg border border-[#ffd000]"
              >
                View Krooz TV Plans <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/setup"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#0b0914] text-[#f4f4f6] font-black text-sm uppercase tracking-widest hover:scale-105 transition-all border-2 border-[#ffd000]"
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