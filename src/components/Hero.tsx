import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';
import { MagneticButton } from './MagneticButton';

const INITIAL_PARTICLES = Array.from({ length: 20 }).map(() => ({
    startX: Math.random() * 100,
    startY: Math.random() * 100,
    yEnd: -200 - Math.random() * 200,
    xEnd: Math.random() * 100 - 50,
    opacityPeak: Math.random() * 0.6 + 0.2,
    scalePeak: Math.random() * 2 + 0.5,
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 10
}));

const ParticleField = () => {
    return (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none mix-blend-screen">
            {INITIAL_PARTICLES.map((p, i) => (
                <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-accent/40 rounded-full blur-[2px]"
                    style={{ left: `${p.startX}%`, top: `${p.startY}%` }}
                    animate={{
                        y: [0, p.yEnd],
                        x: [0, p.xEnd],
                        opacity: [0, p.opacityPeak, 0],
                        scale: [0, p.scalePeak, 0]
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: p.delay
                    }}
                />
            ))}
        </div>
    );
};

export const Hero = () => {
    const comp = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const t1 = gsap.timeline();

            t1.fromTo(".hero-text-1", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out" })
                .fromTo(".hero-text-2", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out" }, "-=0.8")
                .fromTo(".hero-sub", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out" }, "-=0.6")
                .fromTo(".hero-cta", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out" }, "-=0.6");
        }, comp);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={comp} className="relative w-full min-h-[100svh] flex flex-col justify-end pt-40 pb-16 md:pb-24 lg:pb-32 px-6 lg:px-12 bg-[#0A0F0D] overflow-hidden">
            {/* Background Image Container */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                {/* Medical/Physio mood image: professional, clean, moody */}
                <img
                    src="/images/real/internistudiofisyo2.webp"
                    alt="Studio Fisyo Interni"
                    fetchPriority="high"
                    decoding="async"
                    className="w-full h-full object-cover filter grayscale-[10%]"
                />
                {/* Clean luxury dark gradient fade without the muddy green */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F0D] via-[#0A0F0D]/60 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-[#0A0F0D]/40 to-transparent"></div>
                <ParticleField />
            </div>

            {/* Content strictly in the bottom left third as per GEMINI.md instructions */}
            <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col justify-end">
                <div className="max-w-3xl">
                    <h1 className="flex flex-col gap-2">
                        <span className="hero-text-1 block font-sans font-bold text-white text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight">
                            Ridisegniamo il tuo
                        </span>
                        <span className="hero-text-2 block font-drama italic text-accent text-7xl md:text-8xl lg:text-9xl leading-[0.85] tracking-tight">
                            Equilibrio.
                        </span>
                    </h1>
                    <p className="hero-sub font-sans text-xl md:text-2xl text-background/80 mt-6 lg:mt-8 max-w-2xl leading-relaxed">
                        Dimentica le solite terapie. Sperimenta un approccio integrato, dove corpo e mente trovano soluzioni definitive e percorsi su misura.
                    </p>
                    <div className="hero-cta mt-8 lg:mt-12 relative z-50">
                        <MagneticButton to="/contatti" className="bg-accent text-primary px-8 py-4 md:px-10 md:py-5 font-sans font-bold text-base md:text-lg">
                            Prenota la tua valutazione gratuita
                        </MagneticButton>
                    </div>
                </div>
            </div>
        </section>
    );
};
