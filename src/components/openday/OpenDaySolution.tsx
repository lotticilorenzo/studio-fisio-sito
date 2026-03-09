import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { OPENDAY_CONFIG } from '../../config/openday';

const specialists = [
    {
        role: "FISIOTERAPISTA",
        name: "Elisa Caggiati",
        title: "Valutazione Fisioterapica",
        text: "Capire come la fibromialgia coinvolge il tuo corpo, la postura, il movimento quotidiano.",
        image: "/images/real/elisacaggiati.webp"
    },
    {
        role: "NUTRIZIONISTA",
        name: "Elisa Cardinali",
        title: "Consulenza Nutrizionale",
        text: "L'alimentazione anti-infiammatoria può cambiare molto. Scopri come.",
        image: "/images/real/elisa-cardinale-nutrizionista-felino-e1765806933407-1024x877.webp"
    },
    {
        role: "PSICOLOGA",
        name: "Servizio Psicologico",
        title: "Supporto Psicologico",
        text: "Dolore cronico e mente sono connessi. Affrontarli insieme fa la differenza.",
        image: "/images/real/psicologia.webp"
    }
];

export const OpenDaySolution = () => {
    const comp = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: comp.current,
                    start: "top 70%",
                }
            });

            tl.fromTo(".sol-title", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" })
                .fromTo(".sol-card", { y: 30, opacity: 0, stagger: 0.15 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.4")
                .fromTo(".sol-bottom", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.4");
        }, comp);

        return () => ctx.revert();
    }, []);

    const { MAX_SEATS } = OPENDAY_CONFIG;

    return (
        <section ref={comp} className="py-24 md:py-32 bg-[#FAF9F5] relative z-10 border-t border-black/5">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="text-center mb-16 md:mb-24">
                    <h2 className="sol-title font-drama text-4xl md:text-5xl lg:text-6xl text-primary leading-tight">
                        In una sola mattina, parli con <span className="italic text-accent">tre esperti</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16">
                    {specialists.map((spec, i) => (
                        <div key={i} className="sol-card bg-white p-8 md:p-10 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_40px_rgb(0,0,0,0.08)] transition-all duration-300 flex flex-col items-center text-center group border border-transparent hover:border-black/5">
                            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden mb-6 border-4 border-[#F2F0E9] group-hover:border-accent transition-colors duration-300 shadow-sm relative">
                                <img
                                    src={spec.image}
                                    alt={`${spec.name} — ${spec.role} Studio Fisyo`}
                                    width={256}
                                    height={256}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    loading="lazy"
                                />
                            </div>
                            <div className="font-mono text-xs md:text-sm tracking-widest text-primary/50 font-bold mb-2 uppercase">
                                {spec.role}
                            </div>
                            <div className="font-sans font-medium text-lg text-primary mb-4">
                                {spec.name}
                            </div>
                            <h3 className="font-sans font-bold text-2xl text-primary mb-4">
                                {spec.title}
                            </h3>
                            <p className="font-sans text-primary/70 leading-relaxed">
                                {spec.text}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="sol-bottom text-center">
                    <div className="inline-flex flex-wrap items-center justify-center gap-4 px-6 md:px-10 py-5 bg-white rounded-full border border-black/5 shadow-sm">
                        <span className="font-bold text-primary font-sans">Tutto in una mattina</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                        <span className="font-bold text-primary font-sans">Tutto gratis</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                        <span className="font-bold text-accent font-sans animate-pulse">Solo {MAX_SEATS} posti disponibili</span>
                    </div>
                </div>
            </div>
        </section>
    );
};
