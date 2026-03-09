import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { MagneticButton } from '../MagneticButton';
import { OPENDAY_CONFIG } from '../../config/openday';

export const OpenDayUrgency = () => {
    const comp = useRef<HTMLDivElement>(null);
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    const [isExpired, setIsExpired] = useState(false);

    useEffect(() => {
        const { EVENT_DATE } = OPENDAY_CONFIG;
        const targetDate = new Date(EVENT_DATE).getTime();

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const difference = targetDate - now;

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((difference % (1000 * 60)) / 1000)
                });
            } else {
                setIsExpired(true);
                clearInterval(interval);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: comp.current,
                    start: "top 75%",
                }
            });

            tl.fromTo(".urg-content", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" })
                .fromTo(".urg-timer", { y: 20, opacity: 0, scale: 0.95 }, { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.2)" }, "-=0.4")
                .fromTo(".urg-cta", { y: 20, opacity: 0, stagger: 0.2 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.4");
        }, comp);

        return () => ctx.revert();
    }, []);

    const { PHONE_NUMBER, PHONE_HREF, WHATSAPP_MESSAGE, MAX_SEATS } = OPENDAY_CONFIG;

    return (
        <section ref={comp} className="py-24 md:py-32 px-6 lg:px-12 bg-primary relative overflow-hidden text-center z-10">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-background/5 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

            <div className="max-w-4xl mx-auto relative z-10 urg-content">
                <span className="inline-block px-4 py-1.5 rounded-full bg-red-500/20 text-red-300 font-bold text-sm tracking-wider uppercase mb-6 border border-red-500/20">
                    Solo {MAX_SEATS} Posti
                </span>

                <h2 className="font-drama text-4xl md:text-5xl lg:text-7xl text-white mb-6">
                    {isExpired ? "Iscrizioni Chiuse" : <>I posti stanno <span className="italic text-accent">finendo</span></>}
                </h2>

                <p className="font-sans text-xl text-white/80 max-w-2xl mx-auto mb-16 leading-relaxed">
                    {isExpired ? (
                        "Le prenotazioni per questo Open Day sono terminate. Resta aggiornato sui prossimi eventi seguendoci."
                    ) : (
                        `Ogni consulenza dura 15 minuti per specialista — per garantire qualità, possiamo accogliere solo ${MAX_SEATS} persone. I posti stanno finendo rapidamente.`
                    )}
                </p>

                {/* Countdown Timer */}
                {!isExpired && (
                    <div className="urg-timer grid grid-cols-4 gap-3 md:gap-6 max-w-2xl mx-auto mb-16">
                        {[
                            { label: 'Giorni', value: timeLeft.days },
                            { label: 'Ore', value: timeLeft.hours },
                            { label: 'Minuti', value: timeLeft.minutes },
                            { label: 'Secondi', value: timeLeft.seconds }
                        ].map((item, i) => (
                            <div key={i} className="flex flex-col items-center bg-white/5 border border-white/10 rounded-2xl p-4 md:p-6 backdrop-blur-sm">
                                <span className="font-mono text-3xl md:text-5xl lg:text-6xl font-bold text-accent mb-2 tabular-nums tracking-tighter shadow-sm">
                                    {item.value.toString().padStart(2, '0')}
                                </span>
                                <span className="font-sans text-xs md:text-sm font-medium text-white/50 uppercase tracking-widest">
                                    {item.label}
                                </span>
                            </div>
                        ))}
                    </div>
                )}

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <MagneticButton href={`tel:${PHONE_HREF}`} className="urg-cta bg-white text-primary px-8 py-4 sm:px-10 sm:py-5 font-sans font-bold text-base md:text-lg w-full sm:w-auto hover:bg-white/90">
                        <div className="flex items-center justify-center gap-3">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            CHIAMA ORA
                        </div>
                    </MagneticButton>
                    <MagneticButton href={`https://wa.me/${PHONE_NUMBER}?text=${WHATSAPP_MESSAGE}`} className="urg-cta bg-[#25D366] text-white px-8 py-4 sm:px-10 sm:py-5 font-sans font-bold text-base md:text-lg w-full sm:w-auto hover:bg-[#20bd5a]" target="_blank" rel="noopener noreferrer">
                        <div className="flex items-center justify-center gap-3">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12.031 0C5.385 0 0 5.385 0 12.031c0 2.124.551 4.194 1.597 6.01L.062 24l6.101-1.603c1.745.961 3.738 1.468 5.868 1.468 6.646 0 12.031-5.385 12.031-12.031S18.677 0 12.031 0zm0 21.906c-1.803 0-3.568-.485-5.118-1.405l-.367-.217-3.799.998.998-3.799-.217-.367C2.559 15.636 2.054 13.844 2.054 12.03c0-5.503 4.482-9.985 9.977-9.985 5.503 0 9.985 4.482 9.985 9.985s-4.482 9.985-9.985 9.985zm5.474-7.487c-.301-.151-1.782-.879-2.059-.979-.276-.1-4.78-.151-.676.151-.301.3-.879.879-1.08 1.08-.2.201-.402.226-.703.076-1.731-.861-2.924-1.93-4.04-3.811-.2-.34.094-.32.385-.9.083-.167.042-.316-.033-.466-.075-.151-.676-1.631-.926-2.233-.243-.585-.491-.505-.676-.514-.176-.01-.377-.01-.577-.01-.2 0-.528.075-.804.376-.276.301-1.055 1.03-1.055 2.51 0 1.481 1.08 2.912 1.231 3.113.151.201 2.159 3.42 5.346 4.675 2.219.872 3.016.732 3.543.616.634-.14 1.782-.728 2.033-1.431.251-.703.251-1.305.176-1.431-.075-.126-.276-.201-.577-.352z" />
                            </svg>
                            WHATSAPP
                        </div>
                    </MagneticButton>
                </div>
            </div>
        </section>
    );
};
