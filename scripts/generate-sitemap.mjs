// Build-time sitemap generator.
// Queries Sanity for all article documents and writes public/sitemap.xml
// so every article URL is discoverable (not just the hub pages).
// Runs automatically as part of `npm run build` (local and Vercel).
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, '..', 'public', 'sitemap.xml');
const SITE = 'https://www.awakesol.com';
const API = 'https://hb5scemv.api.sanity.io/v2024-04-22/data/query/production';

const STATIC_PAGES = [
  ['/', '1.0', 'weekly'],
  ['/learning/ai', '0.8', 'weekly'],
  ['/learning/languages', '0.8', 'weekly'],
  ['/learning/music', '0.8', 'weekly'],
  ['/learning/dogs', '0.8', 'weekly'],
  ['/health/books', '0.8', 'weekly'],
  ['/health/living-well', '0.8', 'weekly'],
  ['/health/brain-health', '0.8', 'weekly'],
  ['/nature/gardening', '0.8', 'weekly'],
  ['/nature/wildlife', '0.8', 'weekly'],
  ['/about', '0.5', 'monthly'],
  ['/privacy', '0.3', 'yearly'],
  ['/cookie-policy-eu', '0.3', 'yearly'],
  ['/disclosure', '0.3', 'yearly'],
];

// Sanity _type -> article URL prefix
const ARTICLE_ROUTES = {
  livingWellArticle: '/health/living-well/',
  gardeningArticle: '/nature/gardening/',
  wildlifeArticle: '/nature/wildlife/',
  aiArticle: '/learning/ai/',
  languageArticle: '/learning/languages/',
};

async function querySanity(groq) {
  const res = await fetch(`${API}?query=${encodeURIComponent(groq)}`, {
    headers: { 'user-agent': 'AwakesolSitemap/1.0' },
    signal: AbortSignal.timeout(30000),
  });
  if (!res.ok) throw new Error(`Sanity HTTP ${res.status}`);
  const data = await res.json();
  return data.result || [];
}

function xmlEscape(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function buildSitemap(articleEntries) {
  const urls = [];
  for (const [loc, priority, freq] of STATIC_PAGES) {
    urls.push(`  <url>\n    <loc>${SITE}${loc}</loc>\n    <changefreq>${freq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`);
  }
  for (const [url, lastmod] of articleEntries) {
    urls.push(`  <url>\n    <loc>${xmlEscape(url)}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ''}\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>`);
  }
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`;
}

async function main() {
  const articleEntries = [];
  try {
    const types = Object.keys(ARTICLE_ROUTES);
    const results = await Promise.all(
      types.map((t) =>
        querySanity(`*[_type == "${t}"]{_id, _updatedAt}`)
      )
    );
    results.forEach((docs, i) => {
      const type = types[i];
      const prefix = ARTICLE_ROUTES[type];
      for (const d of docs) {
        articleEntries.push([
          `${SITE}${prefix}${d._id}`,
          d._updatedAt ? d._updatedAt.slice(0, 10) : null,
        ]);
      }
    });
    console.log(`Sitemap: ${articleEntries.length} article URLs from Sanity`);
  } catch (err) {
    console.warn(`Sitemap: could not fetch Sanity articles (${err.message}); writing static pages only.`);
  }

  fs.writeFileSync(OUT, buildSitemap(articleEntries), 'utf8');
  console.log(`Sitemap written to ${OUT} (${articleEntries.length + STATIC_PAGES.length} URLs)`);
}

main().catch((err) => {
  // Never break the build over a sitemap
  console.warn('Sitemap generation failed:', err.message);
  fs.writeFileSync(OUT, buildSitemap([]), 'utf8');
});
