import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { MagneticButton } from '../MagneticButton';

export const OpenDayHero = () => {
    const comp = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const t1 = gsap.timeline();

            t1.fromTo(".hero-badge", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" })
                .fromTo(".hero-title", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out" }, "-=0.6")
                .fromTo(".hero-subtitle", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.6")
                .fromTo(".hero-datetime", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.6")
                .fromTo(".hero-cta", { y: 20, opacity: 0, stagger: 0.2 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.4");
        }, comp);

        return () => ctx.revert();
    }, []);

    const whatsappMessage = encodeURIComponent("Ciao! Vorrei prenotare un posto per l'Open Day del 21 Marzo");

    return (
        <section ref={comp} className="relative w-full min-h-[100svh] flex flex-col justify-end pt-24 md:pt-40 pb-16 md:pb-24 lg:pb-32 px-6 lg:px-12 bg-primary overflow-hidden">
            <div className="absolute inset-0 z-0 overflow-hidden">
                <img
                    src="/images/real/internistudiofisyo2.webp"
                    alt="Studio Fisyo — ambiente professionale e accogliente"
                    width={1200}
                    height={800}
                    fetchPriority="high"
                    decoding="async"
                    className="w-full h-full object-cover filter brightness-[0.35]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-transparent"></div>
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col justify-end">
                <div className="max-w-4xl">
                    <div className="hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-primary font-bold text-sm tracking-wider uppercase mb-8">
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                        SOLO 30 POSTI &middot; GRATUITO
                    </div>

                    <h1 className="hero-title font-sans font-bold text-white text-4xl md:text-6xl lg:text-7xl tracking-tight leading-[1.1] mb-6">
                        Capire la Fibromialgia in <span className="font-drama italic text-accent">1 Mattina</span>
                    </h1>

                    <p className="hero-subtitle font-sans text-xl md:text-2xl text-background/90 max-w-3xl leading-relaxed mb-8">
                        Incontri la fisioterapista, la nutrizionista e la psicologa — insieme, in una sola mattina, gratuitamente.
                    </p>

                    <div className="hero-datetime flex flex-wrap items-center gap-4 text-white/80 font-mono text-sm md:text-base bg-white/5 p-4 rounded-2xl border border-white/10 w-fit mb-12 backdrop-blur-sm">
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            Sabato 21 Marzo 2026
                        </div>
                        <div className="hidden md:block w-1 h-1 rounded-full bg-white/30"></div>
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            9:00 – 13:00
                        </div>
                        <div className="hidden md:block w-1 h-1 rounded-full bg-white/30"></div>
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            Felino (PR)
                        </div>
                    </div>

                    <div className="hidden md:flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                        <MagneticButton href="tel:+393406794660" className="hero-cta bg-white text-primary px-8 py-4 sm:px-10 sm:py-5 font-sans font-bold text-base md:text-lg w-full sm:w-auto h-full hover:bg-white/90">
                            <div className="flex items-center justify-center gap-3">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                CHIAMA ORA
                            </div>
                        </MagneticButton>
                        <MagneticButton href={`https://wa.me/393406794660?text=${whatsappMessage}`} className="hero-cta bg-[#25D366] text-white px-8 py-4 sm:px-10 sm:py-5 font-sans font-bold text-base md:text-lg w-full sm:w-auto h-full hover:bg-[#20bd5a]" target="_blank" rel="noopener noreferrer">
                            <div className="flex items-center justify-center gap-3">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12.031 0C5.385 0 0 5.385 0 12.031c0 2.124.551 4.194 1.597 6.01L.062 24l6.101-1.603c1.745.961 3.738 1.468 5.868 1.468 6.646 0 12.031-5.385 12.031-12.031S18.677 0 12.031 0zm0 21.906c-1.803 0-3.568-.485-5.118-1.405l-.367-.217-3.799.998.998-3.799-.217-.367C2.559 15.636 2.054 13.844 2.054 12.03c0-5.503 4.482-9.985 9.977-9.985 5.503 0 9.985 4.482 9.985 9.985s-4.482 9.985-9.985 9.985zm5.474-7.487c-.301-.151-1.782-.879-2.059-.979-.276-.1-4.78-.151-.676.151-.301.3-.879.879-1.08 1.08-.2.201-.402.226-.703.076-1.731-.861-2.924-1.93-4.04-3.811-.2-.34.094-.32.385-.9.083-.167.042-.316-.033-.466-.075-.151-.676-1.631-.926-2.233-.243-.585-.491-.505-.676-.514-.176-.01-.377-.01-.577-.01-.2 0-.528.075-.804.376-.276.301-1.055 1.03-1.055 2.51 0 1.481 1.08 2.912 1.231 3.113.151.201 2.159 3.42 5.346 4.675 2.219.872 3.016.732 3.543.616.634-.14 1.782-.728 2.033-1.431.251-.703.251-1.305.176-1.431-.075-.126-.276-.201-.577-.352z" />
                                </svg>
                                SCRIVICI SU WHATSAPP
                            </div>
                        </MagneticButton>
                    </div>
                </div>
            </div>
        </section>
    );
};
