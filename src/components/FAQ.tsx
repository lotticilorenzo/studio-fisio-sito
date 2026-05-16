import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal } from './Reveal';

const faqs = [
  {
    q: 'Serve la prescrizione medica per iniziare?',
    a: 'Per un trattamento privato no. Se hai già referti o esami, portali con te alla prima visita.',
  },
  {
    q: 'Quanto dura una seduta?',
    a: 'Di solito tra 50 e 60 minuti. Lo definiamo in base al tipo di lavoro e alla fase del percorso.',
  },
  {
    q: 'Come posso prenotare una valutazione?',
    a: 'Puoi scriverci su WhatsApp, chiamarci oppure usare il modulo di contatto. Ti indichiamo noi il passo più semplice.',
  },
  {
    q: 'Lavorate solo sul sintomo o anche sulle cause?',
    a: 'Il sintomo conta, ma non è tutto. Cerchiamo sempre di capire che cosa lo alimenta e come aiutarti a non ritrovarti da capo dopo poco.',
  },
  {
    q: 'Avete una prima valutazione gratuita?',
    a: 'Sì. La usiamo per ascoltare bene il problema, capire da dove partire e suggerirti il percorso più adatto.',
  },
];

const FAQItem = ({
  question,
  answer,
  isOpen,
  onToggle,
  number,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  number: string;
}) => (
  <div
    className={`overflow-hidden rounded-[1.8rem] border border-primary/8 backdrop-blur-xl transition-colors duration-200 ${
      isOpen ? 'border-l-2 border-l-accent bg-surface' : 'bg-white/78'
    }`}
  >
    <button
      onClick={onToggle}
      className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-white/40"
      aria-expanded={isOpen}
    >
      <span className="text-base font-medium leading-snug text-primary md:text-lg">
        <span className="mr-3 font-mono text-xs text-accent">{number}</span>
        {question}
      </span>
      <motion.div
        animate={{ rotate: isOpen ? 45 : 0 }}
        transition={{ duration: 0.22, ease: 'easeInOut' }}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/12"
      >
        <svg className="h-3.5 w-3.5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.4}>
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
          transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden"
        >
          <p className="border-t border-primary/6 px-6 pb-6 pt-4 text-base leading-relaxed text-primary/66">
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
    <section className="px-6 py-24 lg:px-12 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <Reveal width="100%">
          <div className="lg:sticky lg:top-28">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.26em] text-primary/46">
              Domande frequenti
            </p>
            <h2 className="max-w-xl text-4xl font-semibold leading-[0.98] tracking-[-0.05em] text-primary md:text-6xl">
              Le cose che conviene sapere prima di iniziare.
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-primary/64 md:text-lg">
              Se non trovi qui la risposta che cerchi, puoi scriverci. Ti rispondiamo
              in modo diretto e senza giri.
            </p>

            <a
              href={`https://wa.me/393396508642?text=${encodeURIComponent('Ciao Studio Fisyo, avrei una domanda.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-background transition-colors hover:bg-[#1c2822]"
            >
              Chiedici su WhatsApp
            </a>
          </div>
        </Reveal>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, index) => (
            <Reveal key={faq.q} width="100%" delay={index * 0.04}>
              <FAQItem
                question={faq.q}
                answer={faq.a}
                isOpen={openIndex === index}
                onToggle={() => setOpenIndex(openIndex === index ? null : index)}
                number={`0${index + 1}`}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
