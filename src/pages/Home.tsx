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
