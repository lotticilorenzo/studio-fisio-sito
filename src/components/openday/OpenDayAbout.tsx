import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';

export const OpenDayAbout = () => {
    const comp = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: comp.current,
                    start: "top 75%",
                }
            });

            tl.fromTo(".abt-image", { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" })
                .fromTo(".abt-content", { x: 30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.6");
        }, comp);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={comp} className="py-24 md:py-32 bg-[#FAF9F5] border-y border-black/5 relative z-10 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    <div className="abt-image relative rounded-[2.5rem] overflow-hidden aspect-[4/3] shadow-lg">
                        <img
                            src="/images/real/fisioterapia_studio_fisyo.webp"
                            alt="Fisioterapia professionale a Studio Fisyo, Felino (Parma)"
                            width={800}
                            height={600}
                            className="w-full h-full object-cover"
                            loading="lazy"
                        />
                        <div className="absolute inset-0 border-4 border-white/20 rounded-[2.5rem] pointer-events-none"></div>
                    </div>

                    <div className="abt-content">
                        <h2 className="font-drama text-4xl md:text-5xl lg:text-6xl text-primary leading-tight mb-8">
                            Studio Fisyo — <br />
                            <span className="italic text-accent">Felino (Parma)</span>
                        </h2>

                        <div className="space-y-6 font-sans text-lg md:text-xl text-primary/80 leading-relaxed mb-10">
                            <p>
                                Siamo un team di professionisti uniti da una missione comune: offrirti un percorso di guarigione e benessere integrato. Crediamo che il corpo umano sia un sistema complesso e per questo curiamo non solo il sintomo, ma la causa.
                            </p>
                            <p>
                                A Studio Fisyo combiniamo fisioterapia avanzata, nutrizione clinica e supporto psicologico in un ambiente caldo, accogliente e tecnologicamente all'avanguardia.
                            </p>
                        </div>

                        <Link
                            to="/"
                            className="inline-flex items-center gap-3 font-sans font-bold text-accent hover:text-primary transition-colors text-lg group"
                        >
                            Scopri di più su www.studiofisyo.com
                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </Link>
                    </div>

                </div>
            </div>
        </section>
    );
};
