import { useEffect } from 'react';

type SEOProps = {
  title?: string;
  description?: string;
  keywords?: string[] | string;
  canonical?: string;
};

function upsertMeta(name: string, content: string) {
  if (!content) return;
  let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('name', name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel: string, href: string) {
  if (!href) return;
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

export default function SEO({ title, description, keywords, canonical }: SEOProps) {
  useEffect(() => {
    if (title) document.title = title;
    if (description) upsertMeta('description', description);
    if (keywords) upsertMeta('keywords', Array.isArray(keywords) ? keywords.join(', ') : keywords);
    if (canonical) upsertLink('canonical', canonical);
  }, [title, description, keywords, canonical]);

  return null;
}


