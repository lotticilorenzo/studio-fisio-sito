import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';

export const OpenDayProblem = () => {
    const comp = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: comp.current,
                    start: "top 75%",
                }
            });

            tl.fromTo(".prob-title", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" })
                .fromTo(".prob-item", { y: 20, opacity: 0, stagger: 0.2 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, "-=0.4")
                .fromTo(".prob-text", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.2");
        }, comp);

        return () => ctx.revert();
    }, []);

    const bullets = [
        "Anni di visite senza una diagnosi chiara",
        "Dolori che cambiano ogni giorno, stanchezza che non passa",
        "La sensazione che nessuno ti creda davvero"
    ];

    return (
        <section ref={comp} className="py-24 md:py-32 bg-background relative z-10">
            <div className="max-w-4xl mx-auto px-6 lg:px-12">
                <h2 className="prob-title font-drama text-4xl md:text-5xl lg:text-6xl text-primary leading-tight mb-12">
                    La fibromialgia è reale.<br />
                    <span className="italic text-accent">E tu meriti risposte vere.</span>
                </h2>

                <div className="space-y-6 mb-16">
                    {bullets.map((text, i) => (
                        <div key={i} className="prob-item flex items-start gap-5 p-6 rounded-3xl bg-white shadow-sm border border-black/5 hover:border-black/10 transition-colors">
                            <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center shrink-0 mt-0.5">
                                <span className="w-2.5 h-2.5 rounded-full bg-accent"></span>
                            </div>
                            <p className="font-sans text-lg md:text-xl text-primary/80 font-medium">
                                "{text}"
                            </p>
                        </div>
                    ))}
                </div>

                <div className="prob-text relative p-8 md:p-10 rounded-[2.5rem] bg-primary text-white overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(234,179,8,0.15),transparent)] pointer-events-none"></div>
                    <p className="relative z-10 font-sans text-xl md:text-2xl font-medium leading-relaxed">
                        Noi ti crediamo. <br className="hidden md:block" />
                        E il 21 Marzo apriamo le porte per <span className="text-accent">ascoltarti</span>.
                    </p>
                </div>
            </div>
        </section>
    );
};
