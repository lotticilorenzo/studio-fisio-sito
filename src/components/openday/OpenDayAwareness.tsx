import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { MagneticButton } from '../MagneticButton';
import { OPENDAY_CONFIG } from '../../config/openday';

const symptoms = [
    "Dolori diffusi in tutto il corpo che cambiano sede",
    "Stanchezza cronica che non passa nemmeno dopo il riposo",
    "Difficoltà a dormire o sonno non ristoratore",
    "\"Fibro-fog\": difficoltà di concentrazione e memoria",
    "Sensibilità aumentata a freddo, caldo, rumori, luci",
    "Esami del sangue nella norma, ma il dolore c'è",
];

const stats = [
    {
        number: "2 MLN",
        text: "Gli italiani che soffrono di fibromialgia. Il 90% sono donne.",
    },
    {
        number: "7 anni",
        text: "Il tempo medio per ottenere una diagnosi corretta di fibromialgia in Italia.",
    },
    {
        number: "1 mattina",
        text: "Il tempo che ti chiediamo il 21 Marzo per darti finalmente risposte concrete.",
    },
];

export const OpenDayAwareness = () => {
    const comp = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: { trigger: comp.current, start: "top 75%" }
            });

            tl.fromTo(".aw-title", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" })
                .fromTo(".aw-check", { x: -15, opacity: 0, stagger: 0.06 }, { x: 0, opacity: 1, duration: 0.5, ease: "power3.out" }, "-=0.4")
                .fromTo(".aw-cta-mid", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }, "-=0.2")
                .fromTo(".aw-stat", { y: 30, opacity: 0, scale: 0.95, stagger: 0.12 }, { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: "back.out(1.4)" }, "-=0.3")
                .fromTo(".aw-empathy", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.3");
        }, comp);
        return () => ctx.revert();
    }, []);

    const { PHONE_NUMBER, WHATSAPP_MESSAGE } = OPENDAY_CONFIG;

    return (
        <section ref={comp} className="py-24 md:py-32 bg-[#FAF9F5] relative z-10 border-t border-black/5 overflow-hidden">
            <div className="max-w-5xl mx-auto px-6 lg:px-12">

                {/* ─── BLOCCO 1: Titolo ─── */}
                <div className="aw-title text-center mb-16 md:mb-20">
                    <h2 className="font-drama text-4xl md:text-5xl lg:text-6xl text-primary leading-tight mb-6">
                        Hai questi sintomi? <br />
                        <span className="italic text-accent">Potresti avere la fibromialgia senza saperlo.</span>
                    </h2>
                    <p className="font-sans text-lg md:text-xl text-primary/70 max-w-3xl mx-auto leading-relaxed">
                        La fibromialgia colpisce circa 2 milioni di italiani. La maggior parte ci ha messo <strong className="text-primary">anni</strong> ad avere una diagnosi.
                    </p>
                </div>

                {/* ─── BLOCCO 2: Checklist Sintomi (6 items) ─── */}
                <div className="max-w-3xl mx-auto mb-12">
                    <div className="grid grid-cols-1 gap-3">
                        {symptoms.map((s, i) => (
                            <div key={i} className="aw-check flex items-start gap-4 p-4 md:p-5 rounded-2xl bg-white border border-black/5 shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:border-accent/30 transition-colors duration-200">
                                <div className="w-6 h-6 rounded-lg border-2 border-primary/20 shrink-0 mt-0.5 flex items-center justify-center" aria-hidden="true" />
                                <p className="font-sans text-[15px] md:text-base text-primary/80 leading-relaxed">{s}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Testo sotto la checklist + CTA bianco (contrasto con sticky verde) */}
                <div className="aw-cta-mid text-center mb-20 md:mb-24 max-w-2xl mx-auto">
                    <p className="font-sans text-lg md:text-xl text-primary/80 leading-relaxed mb-8">
                        Se ti sei riconosciuta in <strong className="text-primary">3 o più</strong> di questi punti, vale la pena parlarne con uno specialista. Il <strong className="text-accent">21 Marzo</strong> puoi farlo <strong className="text-accent">gratuitamente</strong>.
                    </p>
                    <MagneticButton
                        href={`https://wa.me/${PHONE_NUMBER}?text=${WHATSAPP_MESSAGE}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white text-primary border-2 border-primary/10 px-8 py-4 sm:px-10 sm:py-5 font-sans font-bold text-base md:text-lg w-full sm:w-auto hover:bg-primary hover:text-white hover:border-primary shadow-sm"
                    >
                        <div className="flex items-center justify-center gap-3">
                            <span className="text-xl" aria-hidden="true">💬</span>
                            Prenota il tuo posto gratuito
                        </div>
                    </MagneticButton>
                </div>

                {/* ─── BLOCCO 3: 3 Statistiche ─── */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 mb-20 md:mb-24">
                    {stats.map((stat, i) => (
                        <div key={i} className="aw-stat bg-white p-8 md:p-10 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-transparent hover:border-black/5 transition-all duration-300 text-center group">
                            <div className="font-mono text-5xl md:text-6xl lg:text-7xl font-bold text-primary mb-4 tracking-tighter group-hover:text-accent transition-colors duration-300">
                                {stat.number}
                            </div>
                            <p className="font-sans text-primary/70 leading-relaxed text-[15px] md:text-base">
                                {stat.text}
                            </p>
                        </div>
                    ))}
                </div>

                {/* ─── BLOCCO 4: Testo Empatico Finale ─── */}
                <div className="aw-empathy relative p-8 md:p-12 rounded-[2.5rem] bg-primary text-white overflow-hidden text-center">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_bottom_left,rgba(234,179,8,0.15),transparent)] pointer-events-none" aria-hidden="true"></div>
                    <div className="relative z-10 max-w-3xl mx-auto">
                        <p className="font-drama text-2xl md:text-3xl lg:text-4xl leading-snug mb-6 italic">
                            Non è stress. Non è nella tua testa. <br className="hidden md:block" />
                            Non stai esagerando.
                        </p>
                        <p className="font-sans text-lg md:text-xl text-white/80 leading-relaxed mb-8">
                            La fibromialgia è una condizione reale, riconosciuta dall'OMS dal 1992. Merita un approccio serio, multidisciplinare e — soprattutto — <span className="text-accent font-bold">ti meriti di essere ascoltata</span>.
                        </p>
                        <MagneticButton
                            href={`https://wa.me/${PHONE_NUMBER}?text=${WHATSAPP_MESSAGE}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white text-primary px-8 py-4 sm:px-10 sm:py-5 font-sans font-bold text-base md:text-lg w-full sm:w-auto hover:bg-white/90"
                        >
                            <div className="flex items-center justify-center gap-3">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M12.031 0C5.385 0 0 5.385 0 12.031c0 2.124.551 4.194 1.597 6.01L.062 24l6.101-1.603c1.745.961 3.738 1.468 5.868 1.468 6.646 0 12.031-5.385 12.031-12.031S18.677 0 12.031 0zm0 21.906c-1.803 0-3.568-.485-5.118-1.405l-.367-.217-3.799.998.998-3.799-.217-.367C2.559 15.636 2.054 13.844 2.054 12.03c0-5.503 4.482-9.985 9.977-9.985 5.503 0 9.985 4.482 9.985 9.985s-4.482 9.985-9.985 9.985zm5.474-7.487c-.301-.151-1.782-.879-2.059-.979-.276-.1-4.78-.151-.676.151-.301.3-.879.879-1.08 1.08-.2.201-.402.226-.703.076-1.731-.861-2.924-1.93-4.04-3.811-.2-.34.094-.32.385-.9.083-.167.042-.316-.033-.466-.075-.151-.676-1.631-.926-2.233-.243-.585-.491-.505-.676-.514-.176-.01-.377-.01-.577-.01-.2 0-.528.075-.804.376-.276.301-1.055 1.03-1.055 2.51 0 1.481 1.08 2.912 1.231 3.113.151.201 2.159 3.42 5.346 4.675 2.219.872 3.016.732 3.543.616.634-.14 1.782-.728 2.033-1.431.251-.703.251-1.305.176-1.431-.075-.126-.276-.201-.577-.352z" />
                                </svg>
                                Scrivici su WhatsApp
                            </div>
                        </MagneticButton>
                    </div>
                </div>

            </div>
        </section>
    );
};
