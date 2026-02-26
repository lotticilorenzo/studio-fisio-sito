import { useEffect } from 'react';

interface SEOProps {
    title: string;
    description: string;
    image?: string;
    url?: string;
    schema?: Record<string, unknown>;
}

export const useSEO = ({ title, description, image, url, schema }: SEOProps) => {
    useEffect(() => {
        // Update Title
        document.title = title;

        // Helper to set meta tags robustly
        const setMetaTag = (selector: string, attr: string, attrValue: string, content: string) => {
            let tag = document.querySelector(`meta[${selector}]`);
            if (!tag) {
                tag = document.createElement('meta');
                tag.setAttribute(attr, attrValue);
                document.head.appendChild(tag);
            }
            tag.setAttribute('content', content);
        };

        // Standard Meta Description
        setMetaTag('name="description"', 'name', 'description', description);

        // OpenGraph Tags (Facebook, LinkedIn, iMessage, etc.)
        setMetaTag('property="og:title"', 'property', 'og:title', title);
        setMetaTag('property="og:description"', 'property', 'og:description', description);
        setMetaTag('property="og:type"', 'property', 'og:type', 'website');
        if (image) setMetaTag('property="og:image"', 'property', 'og:image', image);
        if (url) setMetaTag('property="og:url"', 'property', 'og:url', url);

        // Twitter Cards (X)
        setMetaTag('name="twitter:card"', 'name', 'twitter:card', 'summary_large_image');
        setMetaTag('name="twitter:title"', 'name', 'twitter:title', title);
        setMetaTag('name="twitter:description"', 'name', 'twitter:description', description);
        if (image) setMetaTag('name="twitter:image"', 'name', 'twitter:image', image);

        // Canonical URL (Critical for SEO deduplication)
        if (url) {
            let canonical = document.querySelector('link[rel="canonical"]');
            if (!canonical) {
                canonical = document.createElement('link');
                canonical.setAttribute('rel', 'canonical');
                document.head.appendChild(canonical);
            }
            canonical.setAttribute('href', url);
        }

        // Structured Data Schema (JSON-LD for Google Rich Snippets)
        if (schema) {
            let scriptTag = document.querySelector('script[type="application/ld+json"]');
            if (!scriptTag) {
                scriptTag = document.createElement('script');
                scriptTag.setAttribute('type', 'application/ld+json');
                document.head.appendChild(scriptTag);
            }
            scriptTag.textContent = JSON.stringify(schema);
        } else {
            const scriptTag = document.querySelector('script[type="application/ld+json"]');
            if (scriptTag) scriptTag.remove();
        }

    }, [title, description, image, url, schema]);
};
