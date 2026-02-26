import { Hero } from '../components/Hero';
import { Features } from '../components/Features';
import { Philosophy } from '../components/Philosophy';
import { Protocol } from '../components/Protocol';
import { useEffect } from 'react';
import { useSEO } from '../hooks/useSEO';

export const Home = () => {
    useSEO({
        title: "Fisioterapia a Felino | Studio Fisyo",
        description: "Studio Fisyo a Felino offre percorsi di Fisioterapia, Pilates Clinico, Salute della Donna e Nutrizione. Prenota la tua valutazione.",
        url: "https://www.studiofisyo.it/",
        schema: {
            "@context": "https://schema.org",
            "@type": "MedicalClinic",
            "name": "Studio Fisyo",
            "image": "https://www.studiofisyo.it/images/real/internistudiofisyo.webp",
            "description": "Studio di fisioterapia, pilates clinico, osteopatia e nutrizione a Felino (Parma).",
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
                "telephone": "+39-389-3177651",
                "contactType": "Customer Support"
            },
            "url": "https://www.studiofisyo.it/"
        }
    });
    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="flex flex-col">
            <Hero />
            <Features />
            <Philosophy />
            <Protocol />
        </div>
    );
};
