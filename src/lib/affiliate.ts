// Outbound links to monetised destinations.
// Google asks that affiliate links be marked rel="sponsored"; we add nofollow as
// well so they pass no ranking signal, while ordinary editorial links are left
// alone. Keep AFFILIATE_HOSTS in sync with scripts/prerender.mjs.
const AFFILIATE_HOSTS = [
  'amazon.co.uk',
  'amazon.com',
  'amzn.to',
  'amzn.eu',
  'digistore24.com',
  'digistore24-app.com',
  'checkout-ds24.com',
  'clickbank.net',
  'hop.clickbank.net',
];

const SITE_ORIGIN = 'https://www.awakesol.com';

/** True when href points at a monetised external host. Internal links are never affiliate. */
export function isAffiliateUrl(href?: string | null): boolean {
  if (!href) return false;
  let url: URL;
  try {
    url = new URL(href, SITE_ORIGIN);
  } catch {
    return false;
  }
  if (url.protocol !== 'http:' && url.protocol !== 'https:') return false;
  if (url.origin === SITE_ORIGIN) return false;
  const host = url.hostname.toLowerCase();
  return AFFILIATE_HOSTS.some((h) => host === h || host.endsWith('.' + h));
}

/**
 * rel attribute for an outbound link:
 *   internal            -> undefined (no rel needed)
 *   external editorial  -> "noopener noreferrer"
 *   affiliate           -> "sponsored nofollow noopener noreferrer"
 */
export function relFor(href?: string | null): string | undefined {
  if (!href) return undefined;
  let url: URL;
  try {
    url = new URL(href, SITE_ORIGIN);
  } catch {
    return undefined;
  }
  if (url.protocol !== 'http:' && url.protocol !== 'https:') return undefined;
  if (url.origin === SITE_ORIGIN) return undefined;
  return isAffiliateUrl(href)
    ? 'sponsored nofollow noopener noreferrer'
    : 'noopener noreferrer';
}
