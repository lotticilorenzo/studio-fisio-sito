import { useState, useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { motion, AnimatePresence } from 'framer-motion';

import { OPENDAY_CONFIG } from '../../config/openday';

export const OpenDayFAQ = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const comp = useRef<HTMLDivElement>(null);

    const { PHONE_NUMBER } = OPENDAY_CONFIG;
    const formattedPhone = PHONE_NUMBER.replace(/(\d{3})(\d{7})/, "$1-$2");

    const faqs = [
        {
            q: "Devo pagare qualcosa?",
            a: "No, l'Open Day è completamente gratuito. Nessun costo nascosto."
        },
        {
            q: "Quanto dura la mia consulenza?",
            a: "Ogni consulenza individuale dura circa 15 minuti per specialista. In totale puoi avere fino a 45 minuti di valutazione personalizzata."
        },
        {
            q: "Devo avere già una diagnosi di fibromialgia?",
            a: "No. L'Open Day è aperto anche a chi ha sintomi sospetti o vuole capire meglio i propri dolori cronici."
        },
        {
            q: "Posso venire con un familiare?",
            a: "Assolutamente sì, anzi è consigliato."
        },
        {
            q: "Come prenoto il mio posto?",
            a: `Chiamaci o scrivici su WhatsApp al ${formattedPhone}. Risponderemo entro poche ore.`
        }
    ];

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: comp.current,
                    start: "top 75%",
                }
            });

            tl.fromTo(".faq-title", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" })
                .fromTo(".faq-item", { y: 20, opacity: 0, stagger: 0.1 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, "-=0.4");
        }, comp);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={comp} className="py-24 md:py-32 bg-background relative z-10">
            <div className="max-w-4xl mx-auto px-6 lg:px-12">
                <div className="text-center mb-16">
                    <h2 className="faq-title font-drama text-4xl md:text-5xl lg:text-7xl text-primary leading-tight mb-4">
                        Domande <span className="italic text-accent">Frequenti</span>
                    </h2>
                    <p className="font-sans text-lg text-primary/60 max-w-2xl mx-auto">
                        Tutto ciò che serve per arrivare preparato alla tua mattina di Open Day.
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => {
                        const isOpen = openIndex === index;

                        return (
                            <div
                                key={index}
                                className={`faq-item border transition-colors duration-300 rounded-[2rem] overflow-hidden ${isOpen ? 'bg-white border-black/5 shadow-sm' : 'bg-transparent border-black/5 hover:border-black/10'
                                    }`}
                            >
                                <button
                                    onClick={() => setOpenIndex(isOpen ? null : index)}
                                    className="w-full px-6 py-6 md:px-8 md:py-8 flex items-center justify-between text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-[2rem]"
                                >
                                    <h3 className="font-sans font-bold text-lg md:text-xl text-primary pr-8 leading-tight">
                                        {faq.q}
                                    </h3>
                                    <div className={`w-10 h-10 rounded-full border shrink-0 flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-primary border-primary text-white scale-110' : 'border-primary/20 text-primary'
                                        }`}>
                                        <motion.svg
                                            animate={{ rotate: isOpen ? 180 : 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="w-5 h-5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </motion.svg>
                                    </div>
                                </button>

                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-6 pb-6 md:px-8 md:pb-8 pt-0 font-sans text-primary/70 text-lg leading-relaxed">
                                                {faq.a}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
