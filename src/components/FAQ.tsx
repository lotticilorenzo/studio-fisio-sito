import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal } from './Reveal';
import { waUrl } from '../config/constants';
import { homepageFaqs } from '../data/homepageFaqs';

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
    className={`overflow-hidden rounded-card-sm border border-primary/8 backdrop-blur-xl transition-colors duration-200 ${
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
          <p className="border-t border-primary/6 px-6 pb-6 pt-4 text-base leading-relaxed text-ink-soft">
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
      <div className="mx-auto grid max-w-7xl 2xl:max-w-[1600px] gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <Reveal width="100%">
          <div className="lg:sticky lg:top-28">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.26em] text-ink-muted">
              Domande frequenti
            </p>
            <h2 className="max-w-xl text-h2 font-semibold text-primary">
              Le cose che conviene sapere prima di iniziare.
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-ink-soft md:text-lg">
              Se non trovi qui la risposta che cerchi, puoi scriverci. Ti rispondiamo
              in modo diretto e senza giri.
            </p>

            <a
              href={waUrl('Ciao Studio Fisyo, avrei una domanda.')}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-background transition-colors hover:bg-[#1c2822]"
            >
              Chiedici su WhatsApp
            </a>
          </div>
        </Reveal>

        <div className="flex flex-col gap-3">
          {homepageFaqs.map((faq, index) => (
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
