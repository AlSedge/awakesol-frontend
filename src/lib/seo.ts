// Per-route SEO metadata.
// Every route gets a unique <title>, meta description, canonical URL,
// Open Graph / Twitter tags, and (where useful) JSON-LD structured data.

export interface SeoMeta {
  title: string;
  description: string;
  type?: 'website' | 'article';
  jsonLd?: object | null;
}

export const SITE_URL = 'https://www.awakesol.com';
export const SITE_NAME = 'Awakesol';

const DEFAULT_DESCRIPTION =
  'Discover expert guidance, practical tips, and inspiring content. From mastering new skills to vibrant senior living and exploring the great outdoors.';

const homeJsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Awakesol',
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.svg`,
    sameAs: [
      'https://twitter.com/awakesol',
      'https://instagram.com/awakesol',
      'https://facebook.com/awakesol',
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Awakesol',
    url: SITE_URL,
  },
];

const ROUTE_META: Record<string, SeoMeta> = {
  '/': {
    title: 'Awakesol | Learn, Thrive & Connect with Nature',
    description: DEFAULT_DESCRIPTION,
    type: 'website',
    jsonLd: homeJsonLd,
  },
  '/learning/ai': {
    title: 'AI Guides for Everyday Life | Awakesol',
    description:
      'Beginner-friendly guides to using artificial intelligence for everyday tasks, productivity, and creative projects — no computer science degree required.',
  },
  '/learning/ai/:id': {
    title: 'AI Guide | Awakesol',
    description: 'A beginner-friendly guide to practical artificial intelligence.',
    type: 'article',
  },
  '/learning/languages': {
    title: 'Learn a Language: Best Apps & Methods | Awakesol',
    description:
      'Proven methods and top-rated apps for learning a new language at any age, from audio courses to live tutoring.',
  },
  '/learning/music': {
    title: 'Learn an Instrument: Best Courses & Gear | Awakesol',
    description:
      'Start your musical journey — recommended online lessons, apps, and beginner gear for guitar, piano, and more.',
  },
  '/learning/dogs': {
    title: 'Dog Training: Best Programs & Products | Awakesol',
    description:
      'Positive-reinforcement training programs, treats, and tools to build a strong bond with your dog.',
  },
  '/health/books': {
    title: 'Best Books for Senior Health & Lifelong Learning | Awakesol',
    description:
      'Curated book recommendations on longevity, cognitive health, personal growth, and finding joy every day.',
  },
  '/health/living-well': {
    title: 'Living Well: Senior Health & Wellness Tips | Awakesol',
    description:
      'Practical daily habits, nutrition advice, and wellness tips for a vibrant life at any age.',
  },
  '/health/living-well/:id': {
    title: 'Wellness Tips | Awakesol',
    description: 'Practical tips for living a vibrant, healthy life.',
    type: 'article',
  },
  '/health/brain-health': {
    title: 'Brain Health: Games & Cognitive Training | Awakesol',
    description:
      'Scientifically-backed games, puzzles, and programs to keep your mind sharp and memory strong.',
  },
  '/nature/gardening': {
    title: 'Gardening for Beginners: Tips & Best Products | Awakesol',
    description:
      'Learn to grow your own food and sanctuary — step-by-step gardening guides, composting essentials, and top-rated tools.',
  },
  '/nature/gardening/:id': {
    title: 'Gardening Guide | Awakesol',
    description: 'A practical gardening guide for beginners and enthusiasts.',
    type: 'article',
  },
  '/nature/wildlife': {
    title: 'Wildlife Watching: Attract & Identify Birds | Awakesol',
    description:
      'Learn to identify, attract, and protect local wildlife — feeding guides, birding tips, and beginner gear.',
  },
  '/nature/wildlife/:id': {
    title: 'Wildlife Guide | Awakesol',
    description: 'A practical guide to observing and supporting local wildlife.',
    type: 'article',
  },
  '/about': {
    title: 'About Awakesol',
    description:
      'Awakesol is dedicated to quality information on self-learning, senior health, and connecting with nature.',
  },
  '/privacy': {
    title: 'Privacy Policy | Awakesol',
    description: 'How Awakesol collects, uses, and protects your personal information.',
  },
  '/cookie-policy-eu': {
    title: 'Cookie Policy | Awakesol',
    description: 'How Awakesol uses cookies, including Google Analytics and advertising cookies.',
  },
  '/disclosure': {
    title: 'Affiliate Disclosure | Awakesol',
    description:
      'Awakesol earns a commission from some product links on this site — learn how that works and what it means for you.',
  },
};

const FALLBACK_META: SeoMeta = {
  title: `${SITE_NAME} | Learn and Thrive`,
  description: DEFAULT_DESCRIPTION,
};

export function getRouteMeta(pathname: string): SeoMeta {
  if (ROUTE_META[pathname]) return ROUTE_META[pathname];
  // Dynamic article routes
  if (pathname.startsWith('/learning/ai/')) return ROUTE_META['/learning/ai/:id'];
  if (pathname.startsWith('/health/living-well/')) return ROUTE_META['/health/living-well/:id'];
  if (pathname.startsWith('/nature/gardening/')) return ROUTE_META['/nature/gardening/:id'];
  if (pathname.startsWith('/nature/wildlife/')) return ROUTE_META['/nature/wildlife/:id'];
  return FALLBACK_META;
}

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setCanonical(href: string) {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);
}

function setJsonLd(data: object | null | undefined) {
  const existing = document.getElementById('seo-jsonld');
  if (existing) existing.remove();
  if (!data) return;
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.id = 'seo-jsonld';
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
}

export function applySeo(meta: SeoMeta, pathname: string) {
  document.title = meta.title;
  setMeta('name', 'description', meta.description);
  setMeta('property', 'og:title', meta.title);
  setMeta('property', 'og:description', meta.description);
  setMeta('property', 'og:type', meta.type || 'website');
  setMeta('property', 'og:url', SITE_URL + pathname);
  setMeta('property', 'og:site_name', SITE_NAME);
  setMeta('name', 'twitter:card', 'summary_large_image');
  setMeta('name', 'twitter:title', meta.title);
  setMeta('name', 'twitter:description', meta.description);
  setCanonical(SITE_URL + pathname);
  setJsonLd(meta.jsonLd);
}

// Called by article views once Sanity content has loaded, so each article
// gets its own title, description, and Article structured data.
export function applyArticleSeo(
  title: string,
  description: string,
  pathname: string,
  dates?: { created?: string; updated?: string }
) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description || DEFAULT_DESCRIPTION,
    url: SITE_URL + pathname,
    image: document.querySelector('meta[property="og:image"]')?.getAttribute('content') || `${SITE_URL}/favicon.svg`,
    author: { '@type': 'Person', name: 'Alan Sedgwick' },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/favicon.svg` },
    },
    ...(dates?.created ? { datePublished: dates.created } : {}),
    ...(dates?.updated ? { dateModified: dates.updated } : {}),
  };
  applySeo(
    {
      title: `${title} | ${SITE_NAME}`,
      description: description || DEFAULT_DESCRIPTION,
      type: 'article',
      jsonLd,
    },
    pathname
  );
}
