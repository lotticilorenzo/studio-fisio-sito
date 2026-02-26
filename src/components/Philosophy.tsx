import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Philosophy = () => {
    const sectionRef = useRef(null);
    const textRef1 = useRef(null);
    const textRef2 = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Very subtle parallax on the background
            gsap.to(".philo-bg", {
                yPercent: 20,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            });

            // Split text fade-up simulation
            gsap.fromTo(textRef1.current,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: textRef1.current, start: "top 80%" } }
            );

            gsap.fromTo(textRef2.current,
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, delay: 0.2, ease: "power3.out", scrollTrigger: { trigger: textRef2.current, start: "top 80%" } }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative w-full py-40 md:py-56 px-6 lg:px-12 bg-[#0A0F0D] overflow-hidden group">
            {/* Background Texture in Parallax */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <img
                    src="/images/real/internistudiofisyo2.webp"
                    alt="Texture organica scura"
                    loading="lazy"
                    decoding="async"
                    className="philo-bg w-full h-[120%] object-cover object-center opacity-[0.08] absolute -top-[10%] group-hover:scale-110 transition-transform duration-[3s] ease-out filter grayscale-[50%]"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#0A0F0D] via-[#0A0F0D]/90 to-[#0A0F0D]"></div>

                {/* Decorative Premium Orbs */}
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[100px] pointer-events-none translate-y-1/2 -translate-x-1/2"></div>
            </div>

            <div className="relative z-10 max-w-6xl mx-auto flex flex-col justify-center h-full">
                <p ref={textRef1} className="font-sans text-white/50 text-xl md:text-3xl lg:text-4xl tracking-tight mb-8 md:mb-12 max-w-4xl leading-relaxed">
                    La maggior parte centri standard si concentra su un unico scopo limitato: <span className="text-white/80">spegnere il sintomo momentaneamente per vederti tornare fra due mesi</span>.
                </p>
                <h2 ref={textRef2} className="font-sans text-white font-bold text-5xl md:text-7xl lg:text-8xl tracking-tighter leading-[1.05] max-w-5xl mb-16">
                    Noi progettiamo <span className="font-drama italic font-normal text-accent/90">un percorso clinico integrato</span> che agisce su corpo e mente per una soluzione vera e definitiva.
                </h2>

                <div className="flex">
                    <Link to="/chi-siamo" className="group/btn rounded-full bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-xl px-10 py-5 text-white font-sans text-lg font-medium transition-all flex items-center gap-4 hover:border-accent/30 hover:shadow-[0_0_30px_rgba(234,179,8,0.1)]">
                        Scopri il team <span className="text-accent text-2xl group-hover/btn:translate-x-2 transition-transform">→</span>
                    </Link>
                </div>
            </div>
        </section>
    );
};
