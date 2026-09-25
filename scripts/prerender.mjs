// Prerenders every route to static HTML after the Vite build.
// Why: the site is a client-side React app, so crawl bots initially saw the same
// empty shell (with no per-page title/canonical/content) for all 40 URLs.
// This writes dist/<route>/index.html with unique title, meta, canonical,
// structured data, real article text, and internal links.
// React replaces this content on load, so users see the normal app.
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(__dirname, '..', 'dist');
const SITE = 'https://www.awakesol.com';
const API = 'https://hb5scemv.api.sanity.io/v2024-04-22/data/query/production';
const AUTHOR = 'Alan Sedgwick';

// Article type -> route prefix
const ARTICLE_ROUTES = {
  livingWellArticle: '/health/living-well/',
  gardeningArticle: '/nature/gardening/',
  wildlifeArticle: '/nature/wildlife/',
  aiArticle: '/learning/ai/',
  languageArticle: '/learning/languages/',
  dogArticle: '/learning/dogs/',
  musicArticle: '/learning/music/',
};

// Hub pages: path -> { title, description, heading, intro, types[] }
const HUBS = {
  '/learning/ai': {
    title: 'AI Guides for Everyday Life | Awakesol',
    description: 'Beginner-friendly guides to using artificial intelligence for everyday tasks, productivity, and creative projects - no computer science degree required.',
    heading: 'Artificial Intelligence',
    intro: 'Learn how to use AI for everyday tasks, productivity, and creativity - written for beginners, with no jargon.',
    types: ['aiArticle'],
  },
  '/learning/languages': {
    title: 'Learn a Language: Best Apps & Methods | Awakesol',
    description: 'Proven methods and top-rated apps for learning a new language at any age, from audio courses to live tutoring.',
    heading: 'Learn a Language',
    intro: 'Practical guides and honest recommendations for learning a new language - at any age, at your own pace.',
    types: ['languageArticle'],
  },
  '/learning/music': {
    title: 'Learn an Instrument: Best Courses & Gear | Awakesol',
    description: 'Start your musical journey - recommended online lessons, apps, and beginner gear for guitar, piano, and more.',
    heading: 'Learn an Instrument',
    intro: 'Guides and resources for learning an instrument as an adult - from choosing your first instrument to finding the best lessons.',
    types: ['musicArticle'],
  },
  '/learning/dogs': {
    title: 'Dog Training: Best Programs & Products | Awakesol',
    description: 'Positive-reinforcement training programs, treats, and tools to build a strong bond with your dog.',
    heading: 'Dog Training',
    intro: 'Kind, effective dog training guides - positive reinforcement methods for puppies and adult dogs.',
    types: ['dogArticle'],
  },
  '/health/living-well': {
    title: 'Living Well: Senior Health & Wellness Tips | Awakesol',
    description: 'Practical daily habits, nutrition advice, and wellness tips for a vibrant life at any age.',
    heading: 'Living Well',
    intro: 'Practical, science-informed guidance for living well at any age - mobility, safety, wellness, and everyday health.',
    types: ['livingWellArticle'],
  },
  '/health/brain-health': {
    title: 'Brain Health: Games & Cognitive Training | Awakesol',
    description: 'Scientifically-backed games, puzzles, and programs to keep your mind sharp and memory strong.',
    heading: 'Brain Health',
    intro: 'Keep your mind sharp with games, puzzles, and evidence-based cognitive training.',
    types: [],
    extraLinks: [
      { href: '/health/living-well/lw-brain-health-after-60', label: 'Brain Health After 60: What Actually Works (and What Does Not)' },
    ],
  },
  '/health/books': {
    title: 'Best Books for Senior Health & Lifelong Learning | Awakesol',
    description: 'Curated book recommendations on longevity, cognitive health, personal growth, and finding joy every day.',
    heading: 'Recommended Reading',
    intro: 'Curated books on longevity, cognitive health, personal growth, and finding joy in everyday moments - including our own titles.',
    types: [],
    // Mirrors the "Reading with the grandchildren?" card in src/pages/Books.tsx, so the
    // link is present in the static HTML (a reliable crawl path to aloraswift.com).
    extraLinks: [
      { href: 'https://www.aloraswift.com/books', label: "Children's picture books by Alora Swift - for reading with the grandchildren" },
    ],
  },
  '/nature/gardening': {
    title: 'Gardening for Beginners: Tips & Best Products | Awakesol',
    description: 'Learn to grow your own food and sanctuary - step-by-step gardening guides, composting essentials, and top-rated tools.',
    heading: 'Gardening',
    intro: 'Step-by-step gardening guides for beginners - raised beds, composting, and the easiest vegetables to grow.',
    types: ['gardeningArticle'],
  },
  '/nature/wildlife': {
    title: 'Wildlife Watching: Attract & Identify Birds | Awakesol',
    description: 'Learn to identify, attract, and protect local wildlife - feeding guides, birding tips, and beginner gear.',
    heading: 'Wildlife',
    intro: 'Bring your garden to life - bird feeding, identification, and attracting wildlife, with simple practical guides.',
    types: ['wildlifeArticle'],
  },
};

const STATIC_PAGES = {
  '/': {
    title: 'Awakesol | Learn, Thrive & Connect with Nature',
    description: 'Discover expert guidance, practical tips, and inspiring content. From mastering new skills to vibrant senior living and exploring the great outdoors.',
    heading: 'Learn and Thrive. Enjoy Life and Nature.',
    intro: 'Awakesol is a practical resource for learning new skills, living well as you get older, and connecting with nature. Written by Alan Sedgwick - a retired finance and IT professional who gardens, explores AI, and writes about ageing well.',
  },
  '/about': {
    title: 'About Awakesol',
    description: 'Awakesol is a site created by a former finance and IT professional who believes learning never stops.',
    heading: 'About Awakesol',
    intro: "Hi, I'm Alan Sedgwick. After 30+ years analysing numbers and building systems in finance and IT, I'm retired - and now I write about the things I love: staying healthy, gardening, learning AI, and keeping curious.",
  },
  '/contact': {
    title: 'Contact Awakesol',
    description: 'Questions, feedback, or just want to say hello? Get in touch with Alan, the author behind Awakesol.',
    heading: 'Get in Touch',
    intro: 'Questions, feedback, or just want to say hello? I read every message.',
  },
  '/privacy': { title: 'Privacy Policy | Awakesol', description: 'How Awakesol collects, uses, and protects your personal information.', heading: 'Privacy Policy', intro: 'How Awakesol collects, uses, and protects your personal information.' },
  '/cookie-policy-eu': { title: 'Cookie Policy | Awakesol', description: 'How Awakesol uses cookies, including Google Analytics and advertising cookies.', heading: 'Cookie Policy', intro: 'How Awakesol uses cookies, including Google Analytics and advertising cookies.' },
  '/disclosure': { title: 'Affiliate Disclosure | Awakesol', description: 'Awakesol earns a commission from some product links on this site - learn how that works.', heading: 'Affiliate Disclosure', intro: 'Awakesol is reader-supported: some links are affiliate links, which may earn a small commission at no cost to you.' },
};

// ---------- helpers ----------
const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function portableTextToHtml(blocks = []) {
  if (!Array.isArray(blocks)) return '';
  const out = [];
  let listType = null;
  const closeList = () => { if (listType) { out.push(`</${listType}>`); listType = null; } };
  for (const b of blocks) {
    if (b._type !== 'block') continue;
    const marks = {};
    for (const md of b.markDefs || []) if (md._type === 'link') marks[md._key] = md.href;
    const inner = (b.children || [])
      .map((c) => {
        let t = esc(c.text || '');
        const cm = c.marks || [];
        if (cm.some((m) => marks[m])) {
          const href = cm.map((m) => marks[m]).find(Boolean);
          t = `<a href="${esc(href)}">${t}</a>`;
        }
        if (cm.includes('strong')) t = `<strong>${t}</strong>`;
        if (cm.includes('em')) t = `<em>${t}</em>`;
        return t;
      })
      .join('');
    if (b.listItem) {
      const want = b.listItem === 'number' ? 'ol' : 'ul';
      if (listType !== want) { closeList(); out.push(`<${want}>`); listType = want; }
      out.push(`<li>${inner}</li>`);
      continue;
    }
    closeList();
    const style = b.style || 'normal';
    if (style === 'h2') out.push(`<h2>${inner}</h2>`);
    else if (style === 'h3') out.push(`<h3>${inner}</h3>`);
    else if (style === 'h4') out.push(`<h4>${inner}</h4>`);
    else if (style === 'blockquote') out.push(`<blockquote>${inner}</blockquote>`);
    else out.push(`<p>${inner}</p>`);
  }
  closeList();
  return out.join('\n');
}

async function querySanity(groq) {
  const res = await fetch(`${API}?query=${encodeURIComponent(groq)}`, {
    headers: { 'user-agent': 'AwakesolPrerender/1.0' },
    signal: AbortSignal.timeout(30000),
  });
  if (!res.ok) throw new Error(`Sanity HTTP ${res.status}`);
  return (await res.json()).result || [];
}

function buildHtml(template, { title, description, canonical, bodyHtml, jsonLd }) {
  let html = template;
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`);
  html = html.replace(/<meta name="description" content="[^"]*"\s*\/?>/, `<meta name="description" content="${esc(description)}" />`);
  // OG/Twitter
  html = html.replace(/<meta property="og:title" content="[^"]*"\s*\/?>/, `<meta property="og:title" content="${esc(title)}" />`);
  html = html.replace(/<meta property="og:description" content="[^"]*"\s*\/?>/, `<meta property="og:description" content="${esc(description)}" />`);
  html = html.replace(/<meta property="og:url" content="[^"]*"\s*\/?>/, `<meta property="og:url" content="${esc(canonical)}" />`);
  html = html.replace(/<meta name="twitter:title" content="[^"]*"\s*\/?>/, `<meta name="twitter:title" content="${esc(title)}" />`);
  html = html.replace(/<meta name="twitter:description" content="[^"]*"\s*\/?>/, `<meta name="twitter:description" content="${esc(description)}" />`);
  const head = [
    `<link rel="canonical" href="${esc(canonical)}" />`,
    jsonLd ? `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>` : '',
  ].filter(Boolean).join('\n    ');
  html = html.replace('</head>', `  ${head}\n  </head>`);
  // Crawlable content inside #root (React replaces it on load)
  html = html.replace('<div id="root"></div>', `<div id="root"><main>${bodyHtml}</main></div>`);
  return html;
}

function articleJsonLd(title, description, url) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url,
    author: { '@type': 'Person', name: AUTHOR },
    publisher: { '@type': 'Organization', name: 'Awakesol', url: SITE },
  };
}

async function main() {
  const templatePath = path.join(DIST, 'index.html');
  if (!fs.existsSync(templatePath)) throw new Error('dist/index.html not found - run vite build first');
  const template = fs.readFileSync(templatePath, 'utf8');

  // fetch all articles
  const types = Object.keys(ARTICLE_ROUTES);
  const results = await Promise.all(
    types.map((t) => querySanity(`*[_type == "${t}"] | order(order asc) {_id, title, description, body}`))
  );
  const articlesByType = {};
  types.forEach((t, i) => { articlesByType[t] = results[i]; });

  let written = 0;

  // 1. Static pages + hubs
  for (const [route, meta] of Object.entries({ ...STATIC_PAGES, ...HUBS })) {
    const typeList = meta.types || [];
    const links = [];
    const items = [];
    for (const t of typeList) {
      for (const a of articlesByType[t] || []) {
        links.push(`<li><a href="${ARTICLE_ROUTES[t]}${esc(a._id)}">${esc(a.title)}</a>${a.description ? ` - ${esc(a.description)}` : ''}</li>`);
        items.push({ '@type': 'ListItem', position: items.length + 1, name: a.title, url: SITE + ARTICLE_ROUTES[t] + a._id });
      }
    }
    // Hand-picked cross-links from a hub to a specific article elsewhere on the site
    for (const l of meta.extraLinks || []) {
      links.push(`<li><a href="${l.href}">${esc(l.label)}</a></li>`);
      // extraLinks may point at another site (e.g. aloraswift.com), so only prefix SITE for local paths
      items.push({ '@type': 'ListItem', position: items.length + 1, name: l.label, url: /^https?:\/\//.test(l.href) ? l.href : SITE + l.href });
    }
    const bodyHtml = [
      `<h1>${esc(meta.heading)}</h1>`,
      `<p>${esc(meta.intro)}</p>`,
      links.length ? `<h2>Articles</h2><ul>${links.join('')}</ul>` : '',
      route === '/' ? '<h2>Explore</h2><ul><li><a href="/health/living-well">Senior health &amp; living well</a></li><li><a href="/nature/gardening">Gardening</a></li><li><a href="/nature/wildlife">Wildlife</a></li><li><a href="/learning/ai">AI guides</a></li><li><a href="/learning/languages">Languages</a></li><li><a href="/learning/dogs">Dog training</a></li><li><a href="/learning/music">Music</a></li><li><a href="/health/books">Books</a></li></ul>' : '',
    ].filter(Boolean).join('\n');
    const html = buildHtml(template, {
      title: meta.title,
      description: meta.description,
      canonical: SITE + route,
      bodyHtml,
      jsonLd: route === '/'
        ? [
            { '@context': 'https://schema.org', '@type': 'Organization', name: 'Awakesol', url: SITE },
            { '@context': 'https://schema.org', '@type': 'WebSite', name: 'Awakesol', url: SITE },
          ]
        : [
            {
              '@context': 'https://schema.org',
              '@type': items.length ? 'CollectionPage' : 'WebPage',
              name: meta.heading,
              description: meta.description,
              url: SITE + route,
              isPartOf: { '@type': 'WebSite', name: 'Awakesol', url: SITE },
            },
            ...(items.length
              ? [{ '@context': 'https://schema.org', '@type': 'ItemList', name: meta.heading, itemListElement: items }]
              : []),
          ],
    });
    const dir = route === '/' ? DIST : path.join(DIST, route);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), html, 'utf8');
    written++;
  }

  // 2. Article pages
  for (const [type, prefix] of Object.entries(ARTICLE_ROUTES)) {
    for (const a of articlesByType[type] || []) {
      const url = `${SITE}${prefix}${a._id}`;
      const bodyHtml = [
        `<article>`,
        `<h1>${esc(a.title)}</h1>`,
        a.description ? `<p>${esc(a.description)}</p>` : '',
        portableTextToHtml(a.body),
        `</article>`,
      ].filter(Boolean).join('\n');
      const html = buildHtml(template, {
        title: `${a.title} | Awakesol`,
        description: a.description || 'Practical guidance from Awakesol.',
        canonical: url,
        bodyHtml,
        jsonLd: articleJsonLd(a.title, a.description || '', url),
      });
      const dir = path.join(DIST, prefix.replace(/^\//, ''), a._id);
      fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(path.join(dir, 'index.html'), html, 'utf8');
      written++;
    }
  }

  // 3. 404 page.
  // Vercel serves dist/404.html - with a real HTTP 404 - for any path that
  // matches no static file. Every router route is prerendered above, so this
  // only affects URLs that genuinely do not exist, which previously answered
  // "200 OK" (soft 404s, 21 of them flagged in Search Console). It is the app
  // shell, so React still renders the friendly not-found screen, and noindex
  // keeps it out of search results.
  const homeHtml = fs.readFileSync(path.join(DIST, 'index.html'), 'utf8');
  fs.writeFileSync(path.join(DIST, '404.html'), homeHtml.replace('</head>', '  <meta name="robots" content="noindex" />\n</head>'), 'utf8');

  console.log(`Prerendered ${written} pages + 404.html`);
}

main().catch((err) => {
  console.error('Prerender failed:', err.message);
  process.exit(1);
});
