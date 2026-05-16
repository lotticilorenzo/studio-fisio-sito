import { Hero } from '../components/Hero';
import { TrustBar } from '../components/TrustBar';
import { Features } from '../components/Features';
import { Philosophy } from '../components/Philosophy';
import { Protocol } from '../components/Protocol';
import { Testimonials } from '../components/Testimonials';
import { FAQ } from '../components/FAQ';
import { useEffect } from 'react';
import { useSEO } from '../hooks/useSEO';

export const Home = () => {
    useSEO({
        title: "Fisioterapia a Felino | Studio Fisyo",
        description: "Studio Fisyo a Felino offre percorsi di Fisioterapia, Pilates Clinico, Salute della Donna e Nutrizione. Prenota la tua valutazione.",
        image: "https://www.studiofisyo.com/images/real/internistudiofisyo2.webp",
        url: "https://www.studiofisyo.com/",
        schema: {
            "@context": "https://schema.org",
            "@type": "MedicalClinic",
            "name": "Studio Fisyo",
            "image": "https://www.studiofisyo.com/images/real/internistudiofisyo2.webp",
            "description": "Studio di fisioterapia, pilates clinico, salute della donna, nutrizione e percorsi integrati a Felino (Parma).",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "Via Aldo Moro 1/A",
                "addressLocality": "Felino",
                "addressRegion": "PR",
                "postalCode": "43035",
                "addressCountry": "IT"
            },
            "geo": {
                "@type": "GeoCoordinates",
                "latitude": 44.6937,
                "longitude": 10.2443
            },
            "openingHoursSpecification": [
                {
                    "@type": "OpeningHoursSpecification",
                    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                    "opens": "08:00",
                    "closes": "20:00"
                }
            ],
            "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+39-339-6508642",
                "contactType": "Customer Support"
            },
            "priceRange": "$$",
            "areaServed": "Felino, Parma, Emilia-Romagna",
            "sameAs": [
                "https://www.instagram.com/studiofisyo",
                "https://www.facebook.com/studiofisyo"
            ],
            "url": "https://www.studiofisyo.com/"
        }
    });
    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="flex flex-col">
            <Hero />
            <TrustBar />
            <Features />
            <Philosophy />
            <Testimonials />
            <FAQ />
            <Protocol />
        </div>
    );
};
