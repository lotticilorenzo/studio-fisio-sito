import { useState } from 'react';
import { AnimatePresence, motion, type Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, RotateCcw } from 'lucide-react';
import { servicesById } from '../data/services';
import { MagneticButton } from './MagneticButton';
import { MaskReveal } from './MaskReveal';
import { RevealMedia } from './RevealMedia';
import { ease, duration, viewport } from '../lib/motion';

type Option = { label: string; value: string };

const Q1: { question: string; options: Option[] } = {
  question: 'Cosa descrive meglio il tuo momento?',
  options: [
    { label: 'Ho dolore o sto recuperando', value: 'dolore' },
    { label: 'Voglio muovermi meglio', value: 'movimento' },
    { label: 'Cerco un percorso per la donna', value: 'donna' },
    { label: 'Voglio più equilibrio e benessere', value: 'benessere' },
    { label: 'Non lo so ancora', value: 'orientamento' },
  ],
};

// Seconda domanda ramificata: l'opzione scelta porta direttamente all'id del servizio.
const Q2: Record<string, { question: string; options: Option[] }> = {
  dolore: {
    question: 'Il fastidio com’è?',
    options: [
      { label: 'Recente o acuto', value: 'fisioterapia' },
      { label: 'Da tempo o ricorrente', value: 'fisioterapia' },
      { label: 'Dopo un intervento', value: 'fisioterapia' },
    ],
  },
  movimento: {
    question: 'Cosa cerchi soprattutto?',
    options: [
      { label: 'Postura e controllo', value: 'pilates-clinico' },
      { label: 'Prevenzione e continuità', value: 'pilates-clinico' },
      { label: 'Rientro graduale al movimento', value: 'fisio4young' },
    ],
  },
  donna: {
    question: 'In che fase ti trovi?',
    options: [
      { label: 'Gravidanza o pre-parto', value: 'salute-donna' },
      { label: 'Post-parto', value: 'salute-donna' },
      { label: 'Pavimento pelvico', value: 'salute-donna' },
    ],
  },
  benessere: {
    question: 'A cosa daresti priorità?',
    options: [
      { label: 'Equilibrio con il cibo', value: 'nutrizione' },
      { label: 'Mente, stress, emozioni', value: 'psicologia' },
      { label: 'Tessuti, gambe, leggerezza', value: 'linfodrenaggio' },
    ],
  },
  orientamento: {
    question: 'Cosa ti pesa di più adesso?',
    options: [
      { label: 'Il corpo e il movimento', value: 'fisioterapia' },
      { label: 'Energia e alimentazione', value: 'nutrizione' },
      { label: 'Testa e benessere', value: 'psicologia' },
    ],
  },
};

const stepTransition = { duration: duration.base, ease: ease.page };

// Staggered cascade for the answer options — opacity fade survives reduced-motion
// (global <MotionConfig reducedMotion="user"> neutralises the y-transform).
const listVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.055, delayChildren: 0.08 } },
};
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: duration.base, ease: ease.out } },
};

export const ServiceFinder = () => {
  const [step, setStep] = useState<0 | 1 | 2>(0);
  const [area, setArea] = useState<string | null>(null);
  const [resultId, setResultId] = useState<string | null>(null);

  const result = resultId ? servicesById[resultId] : undefined;
  const branch = area ? Q2[area] : undefined;

  const reset = () => {
    setStep(0);
    setArea(null);
    setResultId(null);
  };

  const optionClass =
    'group relative flex min-h-[56px] w-full items-center gap-4 rounded-2xl border border-on-dark/15 bg-on-dark/[0.04] px-5 py-4 text-left text-base font-medium text-on-dark transition-[border-color,background-color,transform] duration-300 hover:border-accent/60 hover:bg-on-dark/[0.08] active:scale-[0.99]';

  const marker = (
    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-on-dark/25 text-[11px] font-semibold text-on-dark/70 transition-colors duration-300 group-hover:border-accent group-hover:text-accent">
      +
    </span>
  );

  const arrow = (
    <ArrowUpRight
      aria-hidden="true"
      className="h-4 w-4 shrink-0 -translate-x-1 text-accent opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
    />
  );

  const resetButtonClass =
    'mt-6 inline-flex min-h-[44px] items-center gap-2 py-1 text-sm font-medium text-on-dark-mut transition-colors hover:text-on-dark';

  return (
    <section className="relative overflow-hidden bg-dark text-on-dark">
      {/* Ambient gold haze — purely decorative */}
      <div className="pointer-events-none absolute -left-[8%] top-[6%] h-72 w-72 rounded-full bg-accent/10 blur-[130px]" />
      <div className="pointer-events-none absolute -right-[6%] bottom-[4%] h-80 w-80 rounded-full bg-accent/[0.07] blur-[150px]" />

      <div className="cine-container relative py-[clamp(56px,8vw,112px)]">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:items-start lg:gap-16">
          {/* Intestazione */}
          <div>
            <motion.span
              className="kicker block text-accent"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport.section}
              transition={{ duration: duration.std, ease: ease.out }}
            >
              Trova il tuo percorso
            </motion.span>

            <h2 className="mt-6 max-w-md text-h2 font-semibold text-on-dark">
              <MaskReveal>Non sai da dove partire?</MaskReveal>
              <MaskReveal delay={0.08} className="font-drama font-normal italic text-accent">
                Ti orientiamo in un minuto.
              </MaskReveal>
            </h2>

            <motion.p
              className="mt-6 max-w-md text-body-lg leading-relaxed text-on-dark/75"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport.section}
              transition={{ duration: duration.slow, delay: 0.12, ease: ease.out }}
            >
              Due domande veloci e ti indichiamo il percorso più sensato per la tua situazione.
              Nessun impegno: serve solo a partire più chiari.
            </motion.p>
          </div>

          {/* Quiz */}
          <motion.div
            className="rounded-card-xl border border-on-dark/12 bg-on-dark/[0.03] p-6 shadow-card-xl backdrop-blur-sm md:p-9"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport.section}
            transition={{ duration: duration.enter, delay: 0.1, ease: ease.out }}
          >
            {step < 2 && (
              <div className="mb-7 flex items-center gap-4">
                <span className="whitespace-nowrap font-mono text-xs uppercase tracking-[0.24em] text-on-dark-mut">
                  Domanda {step + 1} di 2
                </span>
                <span className="flex flex-1 gap-1.5" aria-hidden="true">
                  {[0, 1].map((i) => (
                    <span
                      key={i}
                      className={`h-1 flex-1 rounded-full transition-colors duration-500 ${
                        i <= step ? 'bg-accent' : 'bg-on-dark/15'
                      }`}
                    />
                  ))}
                </span>
              </div>
            )}

            <AnimatePresence mode="wait" initial={false}>
              {step === 0 && (
                <motion.div
                  key="q1"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -18 }}
                  transition={stepTransition}
                >
                  <p className="text-h3 font-semibold tracking-[-0.03em] text-on-dark">{Q1.question}</p>
                  <motion.ul
                    variants={listVariants}
                    initial="hidden"
                    animate="show"
                    className="mt-6 grid gap-3"
                  >
                    {Q1.options.map((opt) => (
                      <motion.li key={opt.label} variants={itemVariants}>
                        <button
                          type="button"
                          onClick={() => {
                            setArea(opt.value);
                            setStep(1);
                          }}
                          className={optionClass}
                        >
                          {marker}
                          <span className="flex-1">{opt.label}</span>
                          {arrow}
                        </button>
                      </motion.li>
                    ))}
                  </motion.ul>
                </motion.div>
              )}

              {step === 1 && branch && (
                <motion.div
                  key="q2"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -18 }}
                  transition={stepTransition}
                >
                  <p className="text-h3 font-semibold tracking-[-0.03em] text-on-dark">
                    {branch.question}
                  </p>
                  <motion.ul
                    variants={listVariants}
                    initial="hidden"
                    animate="show"
                    className="mt-6 grid gap-3"
                  >
                    {branch.options.map((opt) => (
                      <motion.li key={opt.label} variants={itemVariants}>
                        <button
                          type="button"
                          onClick={() => {
                            setResultId(opt.value);
                            setStep(2);
                          }}
                          className={optionClass}
                        >
                          {marker}
                          <span className="flex-1">{opt.label}</span>
                          {arrow}
                        </button>
                      </motion.li>
                    ))}
                  </motion.ul>
                  <button type="button" onClick={reset} className={resetButtonClass}>
                    <RotateCcw aria-hidden="true" className="h-3.5 w-3.5" />
                    Ricomincia
                  </button>
                </motion.div>
              )}

              {step === 2 && result && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -18 }}
                  transition={stepTransition}
                  className="overflow-hidden rounded-card-lg border border-on-dark/12 bg-dark-2"
                >
                  <div className="relative">
                    <RevealMedia
                      src={result.image}
                      alt={result.imageAlt}
                      className="aspect-[16/10] w-full"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-dark via-dark/45 to-transparent" />
                    <div className="absolute inset-x-6 bottom-5">
                      <motion.span
                        className="block font-mono text-[0.7rem] font-medium uppercase tracking-[0.24em] text-accent"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: duration.std, delay: 0.35, ease: ease.out }}
                      >
                        Il percorso più adatto
                      </motion.span>
                      <motion.h3
                        className="mt-1.5 text-2xl font-semibold tracking-[-0.03em] text-on-dark md:text-3xl"
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: duration.slow, delay: 0.42, ease: ease.out }}
                      >
                        {result.title}
                      </motion.h3>
                    </div>
                  </div>

                  <motion.div
                    className="p-6 md:p-8"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: duration.slow, delay: 0.5, ease: ease.out }}
                  >
                    <p className="text-body leading-relaxed text-on-dark/80">{result.summary}</p>
                    <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                      <MagneticButton
                        to={`/contatti?service=${result.id}`}
                        className="min-h-[48px] bg-accent px-6 py-3.5 text-sm font-semibold text-primary"
                      >
                        Prenota questo percorso
                      </MagneticButton>
                      <Link
                        to={`/servizi/${result.id}`}
                        className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-on-dark/25 px-6 py-3.5 text-sm font-medium text-on-dark transition-colors hover:border-on-dark/40 hover:bg-on-dark/[0.06]"
                      >
                        Scopri di più
                        <ArrowUpRight aria-hidden="true" className="h-4 w-4 text-accent" />
                      </Link>
                    </div>
                    <button type="button" onClick={reset} className={resetButtonClass}>
                      <RotateCcw aria-hidden="true" className="h-3.5 w-3.5" />
                      Rifai il test
                    </button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
