import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  robots?: string;
  schema?: Record<string, unknown> | Record<string, unknown>[];
  type?: 'website' | 'article';
}

const removeManagedTag = (selector: string) => {
  const tag = document.querySelector(selector);

  if (tag) {
    tag.remove();
  }
};

const setMetaTag = (attr: string, attrValue: string, content?: string) => {
  if (!content) {
    removeManagedTag(`meta[data-seo="${attrValue}"]`);
    return;
  }

  let tag = document.querySelector(`meta[data-seo="${attrValue}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attr, attrValue);
    tag.setAttribute('data-seo', attrValue);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
};

const setLinkTag = (content?: string) => {
  if (!content) {
    removeManagedTag('link[data-seo="canonical"]');
    return;
  }

  let canonical = document.querySelector('link[data-seo="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    canonical.setAttribute('data-seo', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', content);
};

const setSchemaTag = (schema?: Record<string, unknown> | Record<string, unknown>[]) => {
  if (!schema) {
    removeManagedTag('script[data-seo="schema"]');
    return;
  }

  let scriptTag = document.querySelector('script[data-seo="schema"]');
  if (!scriptTag) {
    scriptTag = document.createElement('script');
    scriptTag.setAttribute('type', 'application/ld+json');
    scriptTag.setAttribute('data-seo', 'schema');
    document.head.appendChild(scriptTag);
  }
  const payload = Array.isArray(schema)
    ? { '@context': 'https://schema.org', '@graph': schema }
    : schema;
  scriptTag.textContent = JSON.stringify(payload);
};

export const useSEO = ({
  title,
  description,
  image,
  url,
  robots = 'index, follow',
  schema,
  type = 'website',
}: SEOProps) => {
  const schemaStr = schema ? JSON.stringify(schema) : '';

  useEffect(() => {
    document.title = title;

    setMetaTag('name', 'description', description);
    setMetaTag('name', 'robots', robots);

    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:type', type);
    setMetaTag('property', 'og:site_name', 'Studio Fisyo');
    setMetaTag('property', 'og:locale', 'it_IT');
    setMetaTag('property', 'og:image', image);
    setMetaTag('property', 'og:url', url);

    setMetaTag(
      'name',
      'twitter:card',
      image ? 'summary_large_image' : 'summary',
    );
    setMetaTag('name', 'twitter:site', '@studiofisyo');
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', image);

    setLinkTag(url);
    setSchemaTag(schema);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [description, image, robots, schemaStr, title, type, url]);
};
