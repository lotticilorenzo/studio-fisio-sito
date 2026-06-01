import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, RotateCcw, Sparkles } from 'lucide-react';
import { servicesById } from '../data/services';
import { MagneticButton } from './MagneticButton';
import { ease, duration } from '../lib/motion';

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

const transition = { duration: duration.base, ease: ease.page };

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
    'w-full rounded-card-sm border border-primary/10 bg-white/80 px-5 py-4 text-left text-base font-medium text-primary transition-colors hover:border-accent/40 hover:bg-white';

  return (
    <section className="px-6 py-24 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-7xl 2xl:max-w-[1600px]">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: ease.out }}
          className="relative overflow-hidden rounded-card-xl border border-primary/10 bg-warm-50 p-7 shadow-card-lg md:p-10 lg:grid lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-12 lg:p-14"
        >
          {/* Intestazione */}
          <div className="lg:flex lg:flex-col lg:justify-center">
            <p className="inline-flex items-center gap-2 text-eyebrow font-semibold uppercase text-ink-muted">
              <Sparkles className="h-3.5 w-3.5 text-accent" />
              Trova il tuo percorso
            </p>
            <h2 className="mt-5 max-w-md text-h2 font-semibold text-primary">
              Non sai da dove partire?
              <span className="font-drama font-normal italic text-accent"> Ti orientiamo in un minuto.</span>
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-ink-soft">
              Due domande veloci e ti indichiamo il percorso più sensato per la tua situazione.
              Nessun impegno: serve solo a partire più chiari.
            </p>
          </div>

          {/* Quiz */}
          <div className="mt-8 lg:mt-0">
            {step < 2 && (
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-ink-muted">
                Domanda {step + 1} di 2
              </p>
            )}

            <AnimatePresence mode="wait" initial={false}>
              {step === 0 && (
                <motion.div
                  key="q1"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={transition}
                >
                  <p className="text-xl font-semibold tracking-[-0.03em] text-primary">{Q1.question}</p>
                  <div className="mt-5 grid gap-3">
                    {Q1.options.map((opt) => (
                      <button
                        key={opt.label}
                        type="button"
                        onClick={() => {
                          setArea(opt.value);
                          setStep(1);
                        }}
                        className={optionClass}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 1 && branch && (
                <motion.div
                  key="q2"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={transition}
                >
                  <p className="text-xl font-semibold tracking-[-0.03em] text-primary">{branch.question}</p>
                  <div className="mt-5 grid gap-3">
                    {branch.options.map((opt) => (
                      <button
                        key={opt.label}
                        type="button"
                        onClick={() => {
                          setResultId(opt.value);
                          setStep(2);
                        }}
                        className={optionClass}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={reset}
                    className="mt-5 inline-flex items-center gap-2 py-1 text-sm font-medium text-ink-muted transition-colors hover:text-primary"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    Ricomincia
                  </button>
                </motion.div>
              )}

              {step === 2 && result && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={transition}
                  className="overflow-hidden rounded-card-lg border border-primary/10 bg-white shadow-card-md"
                >
                  <div className="relative h-44 overflow-hidden bg-warm-300 sm:h-52">
                    <img
                      src={result.image}
                      alt=""
                      role="presentation"
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/30 to-transparent" />
                    <div className="absolute inset-x-5 bottom-4 text-background">
                      <p className="text-eyebrow font-semibold uppercase text-background/70">
                        Il percorso più adatto
                      </p>
                      <p className="mt-1.5 text-2xl font-semibold tracking-[-0.03em]">{result.title}</p>
                    </div>
                  </div>
                  <div className="p-6 md:p-7">
                    <p className="text-base leading-relaxed text-ink-soft">{result.summary}</p>
                    <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                      <MagneticButton
                        to={`/contatti?service=${result.id}`}
                        className="bg-primary px-6 py-3.5 text-sm font-semibold text-background"
                      >
                        Prenota questo percorso
                      </MagneticButton>
                      <Link
                        to={`/servizi/${result.id}`}
                        className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/12 bg-white px-6 py-3.5 text-sm font-medium text-primary transition-colors hover:bg-warm-50"
                      >
                        Scopri di più
                        <ArrowUpRight className="h-4 w-4 text-accent" />
                      </Link>
                    </div>
                    <button
                      type="button"
                      onClick={reset}
                      className="mt-5 inline-flex items-center gap-2 py-1 text-sm font-medium text-ink-muted transition-colors hover:text-primary"
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                      Rifai il test
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
