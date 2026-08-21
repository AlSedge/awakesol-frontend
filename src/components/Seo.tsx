import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { applySeo, getRouteMeta } from '../lib/seo';

// Renders nothing — applies the current route's title, meta description,
// canonical, Open Graph and JSON-LD tags to <head> on every navigation.
export default function Seo() {
  const { pathname } = useLocation();

  useEffect(() => {
    applySeo(getRouteMeta(pathname), pathname);
  }, [pathname]);

  return null;
}
