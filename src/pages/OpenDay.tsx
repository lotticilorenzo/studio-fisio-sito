import { useEffect } from 'react';
import { OpenDayHero } from '../components/openday/OpenDayHero';
import { CustomCursor } from '../components/CustomCursor';
import { OpenDayProblem } from '../components/openday/OpenDayProblem';
import { OpenDayAwareness } from '../components/openday/OpenDayAwareness';
import { OpenDaySolution } from '../components/openday/OpenDaySolution';
import { OpenDayUrgency } from '../components/openday/OpenDayUrgency';
import { OpenDayDetails } from '../components/openday/OpenDayDetails';
import { OpenDayAbout } from '../components/openday/OpenDayAbout';
import { OpenDayFAQ } from '../components/openday/OpenDayFAQ';
import { OpenDayProof } from '../components/openday/OpenDayProof';
import { OpenDayLandingFooter } from '../components/openday/OpenDayLandingFooter';

export const OpenDay = () => {
    useEffect(() => {
        window.scrollTo(0, 0);

        // ─── Title ───
        document.title = "Capire la Fibromialgia in 1 Mattina — Open Day Gratuito | Studio Fisyo";

        // ─── Meta Description ───
        const setMeta = (name: string, content: string, property?: boolean) => {
            const attr = property ? 'property' : 'name';
            let el = document.querySelector(`meta[${attr}="${name}"]`);
            if (!el) {
                el = document.createElement('meta');
                el.setAttribute(attr, name);
                document.head.appendChild(el);
            }
            el.setAttribute('content', content);
        };

        setMeta('robots', 'noindex, nofollow');
        setMeta('description', 'Open Day gratuito sulla Fibromialgia a Felino (PR) — 21 Marzo 2026. Consulenze gratuite con fisioterapista, nutrizionista e psicologa. Solo 30 posti.');

        // ─── Open Graph (Facebook / WhatsApp / Instagram) ───
        setMeta('og:title', 'Capire la Fibromialgia in 1 Mattina — Open Day Gratuito', true);
        setMeta('og:description', 'Sabato 21 Marzo 2026, ore 9-13. Consulenze gratuite con 3 specialiste. Solo 30 posti disponibili. Prenota ora!', true);
        setMeta('og:image', 'https://www.studiofisyo.com/images/og-openday.png', true);
        setMeta('og:url', 'https://www.studiofisyo.com/fibromialgia-open-day', true);
        setMeta('og:type', 'website', true);
        setMeta('og:locale', 'it_IT', true);
        setMeta('og:site_name', 'Studio Fisyo', true);

        // ─── Twitter Card ───
        setMeta('twitter:card', 'summary_large_image');
        setMeta('twitter:title', 'Capire la Fibromialgia in 1 Mattina — Open Day Gratuito');
        setMeta('twitter:description', 'Sabato 21 Marzo 2026, 9-13. Consulenze gratuite con 3 specialiste. Solo 30 posti.');
        setMeta('twitter:image', 'https://www.studiofisyo.com/images/og-openday.png');

        // ─── Canonical ───
        let canonical = document.querySelector('link[rel="canonical"]');
        if (!canonical) {
            canonical = document.createElement('link');
            canonical.setAttribute('rel', 'canonical');
            document.head.appendChild(canonical);
        }
        canonical.setAttribute('href', 'https://www.studiofisyo.com/fibromialgia-open-day');

        // ─── JSON-LD Schema Event ───
        const schema = {
            "@context": "https://schema.org",
            "@type": "Event",
            "name": "Capire la Fibromialgia in 1 Mattina — Open Day Studio Fisyo",
            "description": "Open Day gratuito dedicato alla Fibromialgia. Consulenze individuali gratuite con Fisioterapista, Nutrizionista e Psicologa.",
            "startDate": "2026-03-21T09:00:00+01:00",
            "endDate": "2026-03-21T13:00:00+01:00",
            "eventStatus": "https://schema.org/EventScheduled",
            "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
            "maximumAttendeeCapacity": 30,
            "isAccessibleForFree": true,
            "location": {
                "@type": "Place",
                "name": "Studio Fisyo",
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "Via Aldo Moro 1/A",
                    "addressLocality": "Felino",
                    "addressRegion": "PR",
                    "postalCode": "43035",
                    "addressCountry": "IT"
                }
            },
            "organizer": {
                "@type": "MedicalClinic",
                "name": "Studio Fisyo",
                "url": "https://www.studiofisyo.com",
                "telephone": "+393406794660"
            },
            "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "EUR",
                "availability": "https://schema.org/LimitedAvailability",
                "url": "https://www.studiofisyo.com/fibromialgia-open-day"
            },
            "image": "https://www.studiofisyo.com/images/real/fisioterapia_studio_fisyo.webp"
        };

        const scriptEl = document.createElement('script');
        scriptEl.type = 'application/ld+json';
        scriptEl.textContent = JSON.stringify(schema);
        document.head.appendChild(scriptEl);

        return () => {
            document.title = "Studio Fisyo — Fisioterapia e Riabilitazione a Felino";
            // Clean up the schema script on unmount
            if (scriptEl.parentNode) scriptEl.parentNode.removeChild(scriptEl);
        };
    }, []);

    const whatsappMessage = encodeURIComponent("Ciao! Vorrei prenotare un posto per l'Open Day Fibromialgia del 21 Marzo 🩺");

    return (
        <main className="bg-background min-h-screen text-foreground relative z-10 selection:bg-accent selection:text-primary">
            {/* Push Iubenda widget above sticky CTA on mobile */}
            <style>{`
                @media (max-width: 767px) {
                    #iubenda-cs-banner, .iubenda-cs-other-content, [class*="iubenda"] {
                        bottom: 96px !important;
                    }
                }
            `}</style>
            <CustomCursor />
            <OpenDayHero />
            <OpenDayProblem />
            <OpenDayAwareness />
            <OpenDaySolution />
            <OpenDayUrgency />
            <OpenDayDetails />
            <OpenDayAbout />
            <OpenDayFAQ />
            <OpenDayProof />
            <OpenDayLandingFooter />

            {/* ─── Floating compact CTA pill (mobile only) ─── */}
            <div className="fixed bottom-5 right-5 z-[999] md:hidden flex items-center gap-2 p-1.5 rounded-full bg-white/80 backdrop-blur-xl border border-black/5 shadow-[0_8px_32px_rgba(0,0,0,0.12)]" role="group" aria-label="Prenota il tuo posto">
                <a
                    href="tel:+393406794660"
                    aria-label="Chiama lo studio al 340 679 4660"
                    className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center active:scale-90 transition-transform"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                </a>
                <a
                    href={`https://wa.me/393406794660?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Prenota su WhatsApp"
                    className="w-12 h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center active:scale-90 transition-transform"
                >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12.031 0C5.385 0 0 5.385 0 12.031c0 2.124.551 4.194 1.597 6.01L.062 24l6.101-1.603c1.745.961 3.738 1.468 5.868 1.468 6.646 0 12.031-5.385 12.031-12.031S18.677 0 12.031 0zm0 21.906c-1.803 0-3.568-.485-5.118-1.405l-.367-.217-3.799.998.998-3.799-.217-.367C2.559 15.636 2.054 13.844 2.054 12.03c0-5.503 4.482-9.985 9.977-9.985 5.503 0 9.985 4.482 9.985 9.985s-4.482 9.985-9.985 9.985zm5.474-7.487c-.301-.151-1.782-.879-2.059-.979-.276-.1-4.78-.151-.676.151-.301.3-.879.879-1.08 1.08-.2.201-.402.226-.703.076-1.731-.861-2.924-1.93-4.04-3.811-.2-.34.094-.32.385-.9.083-.167.042-.316-.033-.466-.075-.151-.676-1.631-.926-2.233-.243-.585-.491-.505-.676-.514-.176-.01-.377-.01-.577-.01-.2 0-.528.075-.804.376-.276.301-1.055 1.03-1.055 2.51 0 1.481 1.08 2.912 1.231 3.113.151.201 2.159 3.42 5.346 4.675 2.219.872 3.016.732 3.543.616.634-.14 1.782-.728 2.033-1.431.251-.703.251-1.305.176-1.431-.075-.126-.276-.201-.577-.352z" />
                    </svg>
                </a>
            </div>
        </main>
    );
};
