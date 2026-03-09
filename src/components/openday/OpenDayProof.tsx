import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';

const reviews = [
    {
        name: "Francesca P.",
        text: "Dopo anni di dolori diffusi e visite a vuoto, l'approccio multidisciplinare mi ha finalmente dato delle risposte concrete. Soffro molto meno ora.",
        stars: 5,
    },
    {
        name: "Giulia M.",
        text: "Credevo di dovermi rassegnare alla stanchezza cronica. Hanno ascoltato davvero il mio problema, oggi mi sento molto più energica.",
        stars: 5,
    },
    {
        name: "Silvia L.",
        text: "Avere neuropsicologa, fisioterapista e nutrizionista insieme fa la differenza per la gestione di questi dolori complessi. Altamente consigliato.",
        stars: 5,
    },
];

const Star = () => (
    <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
);

export const OpenDayProof = () => {
    const comp = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.timeline({
                scrollTrigger: { trigger: comp.current, start: "top 80%" }
            })
                .fromTo(".proof-header", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" })
                .fromTo(".proof-card", { y: 20, opacity: 0, stagger: 0.12 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, "-=0.3");
        }, comp);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={comp} className="py-16 md:py-20 bg-background relative z-10 border-t border-black/5">
            <div className="max-w-5xl mx-auto px-6 lg:px-12">
                {/* Header */}
                <div className="proof-header text-center mb-10">
                    <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white border border-black/5 shadow-sm mb-6">
                        {/* Google "G" icon */}
                        <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        <div className="flex gap-0.5">{Array.from({ length: 5 }).map((_, i) => <Star key={i} />)}</div>
                        <span className="font-sans font-bold text-primary text-sm">5.0 su Google</span>
                    </div>

                    <h2 className="font-drama text-3xl md:text-4xl text-primary leading-tight">
                        I nostri pazienti <span className="italic text-accent">parlano per noi</span>
                    </h2>
                </div>

                {/* Review Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                    {reviews.map((r, i) => (
                        <div key={i} className="proof-card bg-white rounded-2xl p-6 border border-black/5 shadow-sm">
                            <div className="flex gap-0.5 mb-3">{Array.from({ length: r.stars }).map((_, j) => <Star key={j} />)}</div>
                            <blockquote className="font-sans text-primary/80 leading-relaxed text-[15px] mb-4">
                                &ldquo;{r.text}&rdquo;
                            </blockquote>
                            <div className="font-sans font-bold text-primary text-sm">{r.name}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
