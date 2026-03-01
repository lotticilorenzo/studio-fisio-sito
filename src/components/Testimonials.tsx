import { motion } from 'framer-motion';
import { Reveal } from './Reveal';

const testimonials = [
    {
        name: 'Marco P.',
        condition: 'Mal di schiena cronico',
        text: 'Dopo anni di dolori alla schiena, Studio Fisyo mi ha cambiato la vita. Il percorso personalizzato e la professionalità del team sono stati decisivi.',
        rating: 5,
        initials: 'MP',
    },
    {
        name: 'Giulia M.',
        condition: 'Riabilitazione post-infortunio',
        text: 'Sono tornata a giocare a tennis dopo soli 3 mesi. Il loro approccio funzionale integrato è completamente diverso da qualsiasi altra cosa abbia provato.',
        rating: 5,
        initials: 'GM',
    },
    {
        name: 'Roberto L.',
        condition: 'Cervicale e postura',
        text: 'Competenza, dedizione e un ambiente accogliente. Lo studio mi ha aiutato a capire il mio corpo e a correggere anni di cattive abitudini posturali.',
        rating: 5,
        initials: 'RL',
    },
];

const StarRating = ({ count }: { count: number }) => (
    <div className="flex gap-0.5">
        {Array.from({ length: count }).map((_, i) => (
            <svg key={i} className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
        ))}
    </div>
);

export const Testimonials = () => {
    return (
        <section className="py-24 px-6 lg:px-12 bg-[#F5F5F0] relative overflow-hidden">
            {/* Subtle background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-background/30 to-transparent pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <Reveal>
                    <div className="text-center mb-16">
                        <p className="font-sans text-xs tracking-[0.2em] uppercase text-accent font-semibold mb-4">
                            Testimonianze
                        </p>
                        <h2 className="font-sans font-bold text-4xl md:text-5xl tracking-tighter text-primary leading-tight">
                            Cosa dicono i nostri{' '}
                            <span className="font-drama italic font-normal text-accent">pazienti</span>
                        </h2>
                        <p className="font-sans text-lg text-primary/60 mt-4 max-w-xl mx-auto leading-relaxed">
                            Centinaia di persone hanno ritrovato benessere e qualità della vita grazie al nostro approccio integrato.
                        </p>
                    </div>
                </Reveal>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                    {testimonials.map((t, i) => (
                        <Reveal key={t.name}>
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                                className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] flex flex-col gap-5 hover:shadow-[0_8px_30px_-8px_rgba(0,0,0,0.12)] transition-shadow duration-300"
                            >
                                {/* Stars */}
                                <StarRating count={t.rating} />

                                {/* Quote */}
                                <blockquote className="font-sans text-primary/80 leading-relaxed flex-1">
                                    &ldquo;{t.text}&rdquo;
                                </blockquote>

                                {/* Author */}
                                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                                    <div className="w-10 h-10 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                                        <span className="font-sans font-bold text-accent text-xs">{t.initials}</span>
                                    </div>
                                    <div>
                                        <p className="font-sans font-semibold text-primary text-sm">{t.name}</p>
                                        <p className="font-sans text-primary/50 text-xs">{t.condition}</p>
                                    </div>
                                </div>
                            </motion.div>
                        </Reveal>
                    ))}
                </div>

                {/* CTA di supporto */}
                <Reveal>
                    <div className="text-center mt-12">
                        <p className="font-sans text-primary/50 text-sm">
                            Vuoi condividere la tua esperienza?{' '}
                            <a
                                href="https://www.google.com/maps/search/Studio+Fisyo+Felino"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-accent hover:underline underline-offset-4 transition-colors"
                            >
                                Lascia una recensione su Google →
                            </a>
                        </p>
                    </div>
                </Reveal>
            </div>
        </section>
    );
};
