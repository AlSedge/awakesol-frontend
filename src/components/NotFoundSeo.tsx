import { useEffect } from 'react';
import { applyNotFoundSeo } from '../lib/seo';

// Drop this into any "not found" render: marks the page noindex so Google stops
// logging it as a Soft 404 instead of a valid page.
export default function NotFoundSeo() {
  useEffect(() => {
    applyNotFoundSeo(window.location.pathname);
  }, []);
  return null;
}
