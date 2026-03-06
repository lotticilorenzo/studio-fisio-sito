import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { MagneticButton } from '../MagneticButton';

export const OpenDayDetails = () => {
    const comp = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: comp.current,
                    start: "top 75%",
                }
            });

            tl.fromTo(".det-title", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" })
                .fromTo(".det-item", { x: -20, opacity: 0, stagger: 0.1 }, { x: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, "-=0.4")
                .fromTo(".det-map", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.2")
                .fromTo(".det-cta", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }, "-=0.2");
        }, comp);

        return () => ctx.revert();
    }, []);

    const details = [
        { icon: "📅", label: "Data", value: "Sabato 21 Marzo 2026" },
        { icon: "🕘", label: "Orario", value: "9:00 – 13:00" },
        { icon: "📍", label: "Dove", value: "Studio Fisyo — Via Aldo Moro 1/A, Felino (PR)" },
        { icon: "💶", label: "Costo", value: "Completamente GRATUITO" },
        { icon: "🪑", label: "Posti", value: "Solo 30 disponibili" },
        { icon: "📱", label: "Prenotazioni", value: "340-6794660" },
    ];

    const whatsappMessage = encodeURIComponent("Ciao! Vorrei prenotare un posto per l'Open Day Fibromialgia del 21 Marzo 🩺");

    return (
        <section ref={comp} className="py-24 md:py-32 bg-background relative z-10">
            <div className="max-w-6xl mx-auto px-6 lg:px-12">
                <div className="text-center mb-16">
                    <h2 className="det-title font-drama text-4xl md:text-5xl lg:text-6xl text-primary leading-tight">
                        Tutto quello che <span className="italic text-accent">devi sapere</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    <div className="space-y-6">
                        {details.map((detail, i) => (
                            <div key={i} className="det-item flex items-center gap-4 p-4 rounded-2xl bg-white border border-black/5 shadow-sm hover:shadow-md transition-shadow">
                                <div className="text-3xl shrink-0 p-2 bg-accent/10 rounded-xl">
                                    {detail.icon}
                                </div>
                                <div>
                                    <div className="font-sans text-sm text-primary/50 uppercase tracking-widest font-bold">
                                        {detail.label}
                                    </div>
                                    <div className="font-sans text-lg md:text-xl text-primary font-medium">
                                        {detail.value}
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* CTA after details — the user just read all the info and is ready to book */}
                        <div className="det-cta pt-4 flex flex-col sm:flex-row gap-3">
                            <MagneticButton
                                href="tel:+393406794660"
                                className="bg-primary text-white px-8 py-4 font-sans font-bold text-base w-full sm:w-auto hover:bg-primary/90"
                            >
                                <div className="flex items-center justify-center gap-3">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    Chiama per Prenotare
                                </div>
                            </MagneticButton>
                            <MagneticButton
                                href={`https://wa.me/393406794660?text=${whatsappMessage}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-[#25D366] text-white px-8 py-4 font-sans font-bold text-base w-full sm:w-auto hover:bg-[#20bd5a]"
                            >
                                <div className="flex items-center justify-center gap-3">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path d="M12.031 0C5.385 0 0 5.385 0 12.031c0 2.124.551 4.194 1.597 6.01L.062 24l6.101-1.603c1.745.961 3.738 1.468 5.868 1.468 6.646 0 12.031-5.385 12.031-12.031S18.677 0 12.031 0zm0 21.906c-1.803 0-3.568-.485-5.118-1.405l-.367-.217-3.799.998.998-3.799-.217-.367C2.559 15.636 2.054 13.844 2.054 12.03c0-5.503 4.482-9.985 9.977-9.985 5.503 0 9.985 4.482 9.985 9.985s-4.482 9.985-9.985 9.985zm5.474-7.487c-.301-.151-1.782-.879-2.059-.979-.276-.1-4.78-.151-.676.151-.301.3-.879.879-1.08 1.08-.2.201-.402.226-.703.076-1.731-.861-2.924-1.93-4.04-3.811-.2-.34.094-.32.385-.9.083-.167.042-.316-.033-.466-.075-.151-.676-1.631-.926-2.233-.243-.585-.491-.505-.676-.514-.176-.01-.377-.01-.577-.01-.2 0-.528.075-.804.376-.276.301-1.055 1.03-1.055 2.51 0 1.481 1.08 2.912 1.231 3.113.151.201 2.159 3.42 5.346 4.675 2.219.872 3.016.732 3.543.616.634-.14 1.782-.728 2.033-1.431.251-.703.251-1.305.176-1.431-.075-.126-.276-.201-.577-.352z" />
                                    </svg>
                                    Scrivici su WhatsApp
                                </div>
                            </MagneticButton>
                        </div>
                    </div>

                    <div className="det-map rounded-[2.5rem] overflow-hidden shadow-lg border-4 border-white h-[400px] lg:h-[100%] min-h-[400px]">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2836.852109404!2d10.24522437613768!3d44.68239077107198!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47806f7aa112cefb%3A0xbc72dfc4ed6fbc55!2sFisyo!5e0!3m2!1sit!2sit!4v1709476123995!5m2!1sit!2sit"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen={false}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Studio Fisyo Map"
                        ></iframe>
                    </div>
                </div>
            </div>
        </section>
    );
};
