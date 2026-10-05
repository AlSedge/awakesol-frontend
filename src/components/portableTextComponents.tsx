import type { PortableTextComponents } from '@portabletext/react';
import type { ReactNode } from 'react';
import { relFor } from '../lib/affiliate';

// Article body links. Affiliate destinations are marked rel="sponsored nofollow"
// as Google asks; ordinary external links get noopener/noreferrer; internal links
// get no rel at all.
function LinkMark({ value, children }: { value?: { href?: string }; children?: ReactNode }) {
  const href = value?.href;
  const rel = relFor(href);
  return (
    <a href={href} {...(rel ? { rel } : {})}>
      {children}
    </a>
  );
}

/** Just the link mark, for views that already pass their own components prop. */
export const portableTextLinkMarks: PortableTextComponents['marks'] = {
  link: LinkMark,
};

/** Full component set, for views that pass nothing. */
export const portableTextComponents: PortableTextComponents = {
  marks: portableTextLinkMarks,
};
