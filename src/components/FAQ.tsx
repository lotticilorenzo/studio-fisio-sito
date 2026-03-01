import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal } from './Reveal';

const faqs = [
    {
        q: 'Serve la prescrizione medica per la fisioterapia?',
        a: 'Non è obbligatoria per effettuare trattamenti privatamente. Ti consigliamo comunque di portare eventuali referti o diagnosi del tuo medico curante, così possiamo personalizzare al meglio il tuo percorso.',
    },
    {
        q: 'Quanto dura una seduta?',
        a: 'Una seduta standard dura circa 50-60 minuti. La tipologia e la frequenza degli incontri dipende dalla tua condizione specifica e verrà definita durante la valutazione iniziale.',
    },
    {
        q: 'Come posso prenotare una valutazione?',
        a: 'Puoi contattarci direttamente su WhatsApp al 339 650 8642 — è il modo più veloce! In alternativa, puoi compilare il modulo di contatto su questa pagina o chiamarci durante gli orari di apertura.',
    },
    {
        q: 'Quali condizioni trattate?',
        a: 'Trattiamo una vasta gamma di condizioni: dolori muscoloscheletrici (mal di schiena, cervicale, artrosi), riabilitazione post-chirurgica, infortuni sportivi, problematiche posturali, salute della donna, e molto altro. Contattaci per la tua situazione specifica.',
    },
    {
        q: 'Offrite la valutazione funzionale gratuita?',
        a: 'Sì! Offriamo una valutazione iniziale gratuita per capire il tuo problema, definire gli obiettivi e proporti il percorso più adatto. Contattaci su WhatsApp per prenotarla.',
    },
];

const FAQItem = ({ question, answer, isOpen, onToggle }: {
    question: string;
    answer: string;
    isOpen: boolean;
    onToggle: () => void;
}) => (
    <div className="border border-slate-200/80 rounded-2xl overflow-hidden bg-white">
        <button
            onClick={onToggle}
            className="w-full text-left px-6 py-5 font-sans font-semibold text-primary flex justify-between items-center gap-4 hover:bg-slate-50/80 transition-colors"
            aria-expanded={isOpen}
        >
            <span className="text-base leading-snug">{question}</span>
            <motion.div
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
                className="shrink-0 w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center"
            >
                <svg className="w-3 h-3 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
            </motion.div>
        </button>
        <AnimatePresence initial={false}>
            {isOpen && (
                <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                >
                    <p className="px-6 pb-5 pt-1 font-sans text-primary/70 leading-relaxed border-t border-slate-100">
                        {answer}
                    </p>
                </motion.div>
            )}
        </AnimatePresence>
    </div>
);

export const FAQ = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="py-24 px-6 lg:px-12 bg-background">
            <div className="max-w-4xl mx-auto">
                <Reveal>
                    <div className="text-center mb-14">
                        <p className="font-sans text-xs tracking-[0.2em] uppercase text-accent font-semibold mb-4">
                            FAQ
                        </p>
                        <h2 className="font-sans font-bold text-4xl md:text-5xl tracking-tighter text-primary leading-tight">
                            Domande{' '}
                            <span className="font-drama italic font-normal text-accent">frequenti</span>
                        </h2>
                        <p className="font-sans text-lg text-primary/60 mt-4 leading-relaxed">
                            Tutto quello che devi sapere prima di iniziare il tuo percorso.
                        </p>
                    </div>
                </Reveal>

                <div className="flex flex-col gap-3">
                    {faqs.map((faq, i) => (
                        <Reveal key={i}>
                            <FAQItem
                                question={faq.q}
                                answer={faq.a}
                                isOpen={openIndex === i}
                                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                            />
                        </Reveal>
                    ))}
                </div>

                {/* Still have questions CTA */}
                <Reveal>
                    <div className="mt-10 text-center p-8 rounded-3xl bg-accent/5 border border-accent/10">
                        <p className="font-sans font-medium text-primary mb-4">
                            Non hai trovato risposta alla tua domanda?
                        </p>
                        <a
                            href={`https://wa.me/393396508642?text=${encodeURIComponent('Ciao Studio Fisyo! Avrei una domanda...')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-accent text-primary font-sans font-bold text-sm px-6 py-3 rounded-full hover:opacity-90 transition-opacity"
                        >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                            </svg>
                            Chiedici su WhatsApp
                        </a>
                    </div>
                </Reveal>
            </div>
        </section>
    );
};
