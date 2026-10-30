// lib/seo.ts
import { Metadata } from 'next';

// ---------------------------------------------------------------------------
// CORE BRAND & DOMAIN CONFIGURATION (UNITED STATES)
// ---------------------------------------------------------------------------
const DOMAIN = 'krooziptv.us';
const BRAND_NAME = 'Krooz TV';
const SITE_URL = `https://${DOMAIN}`;
const FOCUS_KEYWORD = 'Krooz TV';
const SECONDARY_FOCUS_KEYWORD = 'Krooz IPTV';
const LOCALE = 'en_US';
const LANGUAGE = 'en-US';
const ADDRESS_COUNTRY = 'US';
const CURRENCY = 'USD';

// Stable Organization @id used to link brand entities across JSON-LD blocks
const ORGANIZATION_ID = `${SITE_URL}/#organization`;

// ---------------------------------------------------------------------------
// EXPORTED CONSTANTS
// ---------------------------------------------------------------------------
export const CONSTANTS = {
  DOMAIN,
  BRAND_NAME,
  SITE_URL,
  FOCUS_KEYWORD,
  SECONDARY_FOCUS_KEYWORD,
  LOCALE,
  LANGUAGE,
  ADDRESS_COUNTRY,
  CURRENCY,
  ORGANIZATION_ID,

  // Primary High-Intent US Keywords
  PRIMARY_KEYWORDS: [
    'Krooz TV',
    'Krooz TV USA',
    'Krooz IPTV',
    'best Krooz TV',
    'Krooz TV subscription',
    'Krooz TV service',
    'Krooz TV 4K streaming',
    'Krooz IPTV USA',
  ],

  // Secondary & High-Intent Search Terms
  SECONDARY_KEYWORDS: [
    'Krooz TV NFL Sunday',
    'Krooz TV NBA MLB NHL streaming',
    'Krooz TV college football',
    'Krooz TV ESPN HBO Showtime',
    'Krooz TV 4K anti-freeze',
    'Krooz TV Firestick',
    'Krooz TV New York Los Angeles Chicago',
    'Krooz TV live TV no cable USA',
  ],

  // Business Contact Details
  CONTACT: {
    email: 'support@krooziptv.us', // ⚠️ Replace with your real support email
    phone: '+1 555 010 0199', // ⚠️ Replace with your real US number
    whatsapp: '+1 555 010 0199', // ⚠️ Replace with your real WhatsApp number
    whatsappUrl: 'https://live-support.netlify.app', // ⚠️ Replace with your real wa.me link
    supportHours: '24/7 US Customer Support via Email and Live Chat',
  },

  // Social Media (used in Footer / Header)
  SOCIALS: {
    twitter: 'https://twitter.com/krooziptv', // ⚠️ Replace
    instagram: 'https://instagram.com/krooziptv', // ⚠️ Replace
    facebook: 'https://facebook.com/krooziptv', // ⚠️ Replace
  },

  // Payment Methods (used in Footer / Pricing badges)
  PAYMENT_METHODS: [
    { name: 'PayPal', icon: '/img/payment/1.png' },
    { name: 'Bitcoin & Crypto', icon: '/img/payment/2.png' },
    { name: 'Visa', icon: '/img/payment/3.png' },
    { name: 'Mastercard', icon: '/img/payment/4.png' },
  ],

  // Major Target Cities in the United States
  TARGET_REGIONS: [
    'New York',
    'Los Angeles',
    'Chicago',
    'Houston',
    'Phoenix',
    'Philadelphia',
    'San Antonio',
    'San Diego',
    'Dallas',
    'San Jose',
  ],

  // Value Propositions for US Viewers
  USPS: [
    'Buffer-free 4K & Full HD streaming on Krooz TV, backed by dedicated US edge servers in New York and Los Angeles',
    'Access to 20,000+ live channels on Krooz TV including NFL Sunday action, NBA, MLB, NHL, and college football',
    'Instant Krooz TV activation within 5 minutes of subscription approval',
    'Full coverage of ESPN, HBO, Showtime, local US affiliates, and premium VOD movies with Krooz IPTV',
    'Universal device support: Amazon Firestick, Smart TV, Android, iOS, Mag Box, Roku',
  ],
};

// ---------------------------------------------------------------------------
// SEO METADATA GENERATOR
// ---------------------------------------------------------------------------
export const generateSEOMetadata = (
  pageName: string,
  description?: string,
  path: string = '/'
): Metadata => {
  // Enforces strict 150-160 character count for Google snippet optimisation
  const defaultDescription =
    description ||
    `Stream with Krooz TV — 20,000+ live channels, NFL, NBA, MLB and movies in 4K across the USA. Start your risk-free Krooz IPTV trial on Firestick today!`;

  // Enforces strict 50-60 character count for meta titles
  const defaultTitle = `${pageName} | ${BRAND_NAME} - Best IPTV Service USA`;
  const formattedTitle =
    defaultTitle.length > 60 ? defaultTitle.substring(0, 60) : defaultTitle;

  const fullCanonicalUrl =
    path === '/'
      ? SITE_URL
      : `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;

  return {
    title: formattedTitle,
    description: defaultDescription,
    keywords: [
      ...CONSTANTS.PRIMARY_KEYWORDS,
      ...CONSTANTS.SECONDARY_KEYWORDS,
    ].join(', '),
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: fullCanonicalUrl,
      languages: {
        'en-US': fullCanonicalUrl,
        'en-CA': fullCanonicalUrl,
        'x-default': fullCanonicalUrl,
      },
    },
    openGraph: {
      title: formattedTitle,
      description: defaultDescription,
      url: fullCanonicalUrl,
      siteName: BRAND_NAME,
      locale: LOCALE,
      type: 'website',
      images: [
        {
          url: `${SITE_URL}/img/og-image.webp`,
          width: 1200,
          height: 630,
          alt: `${BRAND_NAME} - ${FOCUS_KEYWORD}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: formattedTitle,
      description: defaultDescription,
      images: [`${SITE_URL}/img/og-image.webp`],
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
    authors: [{ name: BRAND_NAME, url: SITE_URL }],
    creator: BRAND_NAME,
    publisher: BRAND_NAME,
    category: 'Entertainment',
    applicationName: BRAND_NAME,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
  };
};

// ---------------------------------------------------------------------------
// JSON-LD SCHEMA GENERATOR — Organization
// ---------------------------------------------------------------------------
export const generateOrganizationSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORGANIZATION_ID,
    name: BRAND_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/img/iptv-logo.webp`,
    description:
      'Krooz TV is a top-rated US IPTV provider delivering high-definition live television, local affiliate broadcasts, and premium sports streaming across America.',
    address: {
      '@type': 'PostalAddress',
      addressCountry: ADDRESS_COUNTRY,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      email: CONSTANTS.CONTACT.email,
      telephone: CONSTANTS.CONTACT.phone,
      contactType: 'customer support',
      areaServed: ADDRESS_COUNTRY,
      availableLanguage: ['English'],
    },
    sameAs: [
      CONSTANTS.SOCIALS.twitter,
      CONSTANTS.SOCIALS.instagram,
      CONSTANTS.SOCIALS.facebook,
    ],
  };
};

// ---------------------------------------------------------------------------
// JSON-LD SCHEMA GENERATOR — Product / Offer
// NOTE: Reserve strictly for sales or reseller pages. Do NOT use on /setup
// or other informational/guide pages.
// ---------------------------------------------------------------------------
export const generateProductSchema = (
  name: string,
  price: string,
  currency: string = CURRENCY,
  description: string
) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: name,
    description: description,
    brand: {
      '@type': 'Brand',
      name: BRAND_NAME,
    },
    offers: {
      '@type': 'Offer',
      price: price,
      priceCurrency: currency,
      availability: 'https://schema.org/InStock',
      url: `${SITE_URL}/pricing`,
      seller: {
        '@id': ORGANIZATION_ID,
      },
      areaServed: {
        '@type': 'Country',
        name: 'United States',
      },
    },
  };
};

// ---------------------------------------------------------------------------
// JSON-LD SCHEMA GENERATOR — LocalBusiness (US Cities)
// ---------------------------------------------------------------------------
export const generateLocalBusinessSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/#localbusiness`,
    name: BRAND_NAME,
    url: SITE_URL,
    image: `${SITE_URL}/img/og-image.webp`,
    description:
      'Krooz TV is a US IPTV subscription service offering 4K live TV, sports, and VOD streaming to households across New York, Los Angeles, Chicago, Houston, and Phoenix.',
    priceRange: '$$',
    telephone: CONSTANTS.CONTACT.phone,
    email: CONSTANTS.CONTACT.email,
    address: {
      '@type': 'PostalAddress',
      addressCountry: ADDRESS_COUNTRY,
    },
    areaServed: CONSTANTS.TARGET_REGIONS.map((city) => ({
      '@type': 'City',
      name: city,
    })),
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      opens: '00:00',
      closes: '23:59',
    },
    parentOrganization: {
      '@id': ORGANIZATION_ID,
    },
  };
};

// ---------------------------------------------------------------------------
// JSON-LD SCHEMA GENERATOR — FAQPage
// ---------------------------------------------------------------------------
export const generateFAQSchema = (faqs: { q: string; a: string }[]) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };
};

// ---------------------------------------------------------------------------
// JSON-LD SCHEMA GENERATOR — BreadcrumbList
// ---------------------------------------------------------------------------
export const generateBreadcrumbSchema = (
  items: { name: string; url: string }[]
) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
};