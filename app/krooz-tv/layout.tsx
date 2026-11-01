
import type { Metadata, Viewport } from 'next';
import type { CSSProperties } from 'react';
import { GoogleAnalytics } from '@next/third-parties/google';
import Header from '../components/Header';
import FloatingWhatsApp from '../components/FloatingWhatsApp';
import Footer from '../components/Footer';
import RouteProgressBar from '../components/RouteProgressBar';
import { CONSTANTS } from '@/lib/seo';

const BRAND = CONSTANTS.BRAND_NAME;
const SITE_URL = CONSTANTS.SITE_URL.replace(/\/$/, '');
const PAGE_URL = `${SITE_URL}/krooz-tv`;

// ---------------------------------------------------------------------------
// FONTS — Local system fallback; no Google Fonts build-time requests
// ---------------------------------------------------------------------------
const fontVariables = {
  '--font-poppins': 'Arial, Helvetica, sans-serif',
  '--font-montserrat': 'Arial, Helvetica, sans-serif',
} as CSSProperties;

// ---------------------------------------------------------------------------
// SEO STRINGS
// ---------------------------------------------------------------------------
const clampTitle = (s: string, max = 60): string =>
  s.length <= max ? s : s.slice(0, max - 1).trimEnd() + '…';

const clampDescription = (s: string, max = 160): string =>
  s.length <= max ? s : s.slice(0, max - 3).trimEnd() + '...';

const SEO_TITLE = clampTitle(
  'Krooz TV - Smart 4K Streaming, Sports & Movies'
);

const SEO_DESCRIPTION = clampDescription(
  'Krooz TV with 36,000+ live channels & 120,000+ 4K movies. Start your free trial today with easy chat setup and no lock-in.'
);

// ---------------------------------------------------------------------------
// VIEWPORT
// ---------------------------------------------------------------------------
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0b0914',
};

// ---------------------------------------------------------------------------
// GLOBAL METADATA
// ---------------------------------------------------------------------------
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: SEO_TITLE,
    template: `%s | ${BRAND}`,
  },

  description: SEO_DESCRIPTION,

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
  },

  openGraph: {
    title: SEO_TITLE,
    description: SEO_DESCRIPTION,
    url: PAGE_URL,
    siteName: BRAND,
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/img/structer.webp`,
        width: 1200,
        height: 630,
        alt: `${BRAND} - 36,000+ live channels in 4K Ultra HD`,
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: clampTitle(SEO_TITLE, 70),
    description: clampDescription(SEO_DESCRIPTION, 200),
    images: [`${SITE_URL}/img/structer.webp`],
  },

  icons: {
    icon: [
      {
        url: '/img/favicons/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        url: '/img/favicons/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        url: '/img/favicons/favicon-48x48.png',
        sizes: '48x48',
        type: 'image/png',
      },
      {
        url: '/img/favicons/favicon-96x96.png',
        sizes: '96x96',
        type: 'image/png',
      },
      {
        url: '/img/favicons/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        url: '/img/favicons/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],

    shortcut: '/img/favicons/favicon.ico',

    apple: [
      {
        url: '/img/favicons/apple-touch-icon-120x120.png',
        sizes: '120x120',
        type: 'image/png',
      },
      {
        url: '/img/favicons/apple-touch-icon-152x152.png',
        sizes: '152x152',
        type: 'image/png',
      },
      {
        url: '/img/favicons/apple-touch-icon-180x180.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],

    other: [
      {
        rel: 'mask-icon',
        url: '/img/favicons/safari-pinned-tab.svg',
        color: '#0b0914',
      },
    ],
  },

  manifest: '/img/favicons/site.webmanifest',

  appleWebApp: {
    capable: true,
    title: BRAND,
    statusBarStyle: 'black-translucent',
  },

  category: 'entertainment',

  keywords: [
    'krooz tv',
    'best krooz tv subscription',
    'krooz tv usa',
    'iptv service',
    'iptv provider',
    'buy krooz tv subscription',
    'iptv setup usa',
    '4k iptv provider',
    'iptv new york',
    'iptv los angeles',
    'iptv chicago',
    'iptv houston',
    'iptv phoenix',
    'free iptv trial usa',
    'smart tv iptv usa',
    'nfl iptv usa',
    'nba iptv usa',
  ],
};

// ---------------------------------------------------------------------------
// SITE-WIDE SCHEMAS
// ---------------------------------------------------------------------------
const SOCIAL_URLS = Object.values(CONSTANTS.SOCIALS ?? {}).filter(
  (url): url is string => typeof url === 'string' && url.length > 0
);

function buildOrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: BRAND,
    alternateName: `${BRAND} Streaming`,
    url: SITE_URL,
    logo: `${SITE_URL}/img/iptv-logo.webp`,
    image: `${SITE_URL}/img/structer.webp`,

    description: `${BRAND} is a trusted US IPTV provider with 36,000+ live channels and 120,000+ movies and TV shows in 4K Ultra HD. Setup is guided on live chat, a free trial is available, and pricing is in USD.`,

    contactPoint: {
      '@type': 'ContactPoint',
      telephone: CONSTANTS.CONTACT.phone,
      email: CONSTANTS.CONTACT.email,
      contactType: 'customer service',
      availableLanguage: ['English'],
      areaServed: 'US',
    },

    ...(SOCIAL_URLS.length > 0 ? { sameAs: SOCIAL_URLS } : {}),
  };

  return JSON.stringify(schema).replace(/</g, '\\u003c');
}

function buildWebSiteSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: BRAND,
    alternateName: `${BRAND} - Best IPTV Service`,
    publisher: {
      '@id': `${SITE_URL}/#organization`,
    },
    inLanguage: 'en-US',
  };

  return JSON.stringify(schema).replace(/</g, '\\u003c');
}

const ORGANIZATION_SCHEMA = buildOrganizationSchema();
const WEBSITE_SCHEMA = buildWebSiteSchema();

// ---------------------------------------------------------------------------
// ROOT LAYOUT
// ---------------------------------------------------------------------------
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en-US"
      suppressHydrationWarning
      className="scroll-smooth motion-reduce:scroll-auto"
    >
      <body
        suppressHydrationWarning
        style={fontVariables}
        className="antialiased min-h-screen bg-[#0b0914] text-[#f4f4f6] selection:bg-[#ffd000] selection:text-[#0b0914]"
      >
        <script
          type="application/ld+json"
          id="organization-schema"
          dangerouslySetInnerHTML={{ __html: ORGANIZATION_SCHEMA }}
        />

        <script
          type="application/ld+json"
          id="website-schema"
          dangerouslySetInnerHTML={{ __html: WEBSITE_SCHEMA }}
        />

        <RouteProgressBar />

        <Header />

        <main className="relative z-10">{children}</main>

        <Footer />

        <FloatingWhatsApp />

        <GoogleAnalytics gaId="G-5YBRX123P1" />
      </body>
    </html>
  );
}
