import { useId, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MaskReveal } from './MaskReveal';
import { reveal, revealHeading, ease, duration } from '../lib/motion';
import { waUrl } from '../config/constants';
import { homepageFaqs } from '../data/homepageFaqs';

const FAQItem = ({
  question,
  answer,
  number,
  isOpen,
  onToggle,
  index,
}: {
  question: string;
  answer: string;
  number: string;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) => {
  const uid = useId();
  const triggerId = `faq-trigger-${uid}`;
  const panelId = `faq-panel-${uid}`;

  return (
    <motion.div {...reveal(Math.min(index * 0.06, 0.3))} className="border-b border-line">
      <h3 className="m-0">
        <button
          id={triggerId}
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={panelId}
          className="group flex w-full items-start justify-between gap-5 py-6 text-left"
        >
          <span className="flex items-baseline gap-4 md:gap-5">
            <span
              aria-hidden="true"
              className="font-mono text-sm tabular-nums text-accent-deep"
            >
              {number}
            </span>
            <span className="text-lg font-medium leading-snug tracking-[-0.01em] text-ink md:text-xl">
              {question}
            </span>
          </span>

          {/* plus → minus toggle (decorative; state is conveyed by aria-expanded) */}
          <span
            aria-hidden="true"
            className="relative mt-1 flex h-9 w-9 shrink-0 items-center justify-center"
          >
            <span className="absolute h-px w-3.5 bg-ink transition-colors duration-300 group-hover:bg-accent-deep" />
            <motion.span
              className="absolute h-px w-3.5 bg-ink transition-colors duration-300 group-hover:bg-accent-deep"
              animate={{ rotate: isOpen ? 0 : 90 }}
              transition={{ duration: duration.fast, ease: ease.out }}
            />
          </span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            id={panelId}
            role="region"
            aria-labelledby={triggerId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.42, ease: ease.out },
              opacity: { duration: 0.28, ease: ease.out },
            }}
            className="overflow-hidden"
          >
            <p className="max-w-2xl pb-7 pl-8 pr-6 text-base leading-relaxed text-ink-soft md:pl-9 md:text-lg">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      aria-labelledby="faq-heading"
      className="bg-background py-[clamp(56px,8vw,112px)]"
    >
      <div className="cine-container grid gap-x-16 gap-y-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-x-24">
        {/* ---- Sticky editorial heading ---- */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <motion.p {...reveal()} className="kicker mb-6">
            Domande frequenti
          </motion.p>
          <h2 id="faq-heading" className="text-h2 font-semibold text-ink">
            <MaskReveal>
              Le cose che conviene sapere
              <span className="font-drama font-normal italic text-accent"> prima di iniziare.</span>
            </MaskReveal>
          </h2>

          <motion.div {...revealHeading(0.08)}>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-ink-soft">
              Se non trovi qui la risposta che cerchi, scrivici pure. Ti rispondiamo
              in modo diretto e senza giri.
            </p>

            <a
              href={waUrl('Ciao Studio Fisyo, avrei una domanda.')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn mt-10"
            >
              Chiedici su WhatsApp
              <svg
                className="arr h-4 w-4"
                aria-hidden="true"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H8M17 7v9" />
              </svg>
            </a>
          </motion.div>
        </div>

        {/* ---- Accordion ---- */}
        <div className="border-t border-line">
          {homepageFaqs.map((faq, index) => (
            <FAQItem
              key={faq.q}
              question={faq.q}
              answer={faq.a}
              number={`0${index + 1}`}
              index={index}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
