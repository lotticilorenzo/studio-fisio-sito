import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const steps = [
  {
    number: '01',
    title: 'Ascolto clinico',
    text: 'Prima di proporre una strada, ci prendiamo il tempo di capire il quadro e il momento che stai vivendo.',
    image: '/images/real/accoglienza.webp',
    imageAlt: 'Momento di ascolto e accoglienza allo Studio Fisyo.',
  },
  {
    number: '02',
    title: 'Confronto tra professioniste',
    text: 'Se il caso lo richiede, il percorso si apre al dialogo interno dello studio senza perdere chiarezza.',
    image: '/images/real/fototeamstudiofisyo.webp',
    imageAlt: 'Il team dello Studio Fisyo si confronta.',
  },
  {
    number: '03',
    title: 'Obiettivi concreti',
    text: 'Meno enfasi e più sostanza. Ci interessa cosa vuoi tornare a fare, non solo come ti senti sul momento.',
    image: '/images/real/fisioterapia_studio_fisyo.webp',
    imageAlt: 'Una seduta di fisioterapia nello Studio Fisyo.',
  },
];

export const Philosophy = () => {
  const [activeStep, setActiveStep] = useState(0);
  const step = steps[activeStep];

  return (
    <section className="relative overflow-hidden bg-[#161f1a] px-6 py-24 text-background lg:px-12 lg:py-32">
      {/* Background image + overlay — unchanged */}
      <div className="absolute inset-0">
        <img
          src="/images/real/internistudiofisyo2.webp"
          alt="Interno dello Studio Fisyo."
          className="h-full w-full object-cover opacity-[0.11]"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#111813]/92 via-[#161f1a]/92 to-[#1c271f]/95" />
      </div>

      {/* Glow blobs — unchanged */}
      <div className="absolute left-[6%] top-[14%] h-56 w-56 rounded-full bg-accent/10 blur-[140px]" />
      <div className="absolute bottom-[6%] right-[8%] h-72 w-72 rounded-full bg-accent/8 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl"
        >
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-background/45">
            Il nostro modo di lavorare
          </p>
          <h2 className="text-4xl font-semibold leading-[0.96] tracking-[-0.05em] md:text-6xl">
            Non lavoriamo per spegnere il sintomo e rivederti presto.
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-background/70 md:text-xl">
            Cerchiamo di capire cosa mantiene acceso il problema e come aiutarti a
            tornare a una vita più libera, più stabile e più tua.
          </p>
        </motion.div>

        {/* Step switcher — left 55% text | right 45% image */}
        <div className="mt-16 grid gap-10 lg:grid-cols-[minmax(0,0.55fr)_minmax(0,0.45fr)] lg:items-start lg:gap-14">

          {/* Left: step buttons + animated content + CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Step number buttons */}
            <div className="flex gap-3">
              {steps.map((s, i) => (
                <button
                  key={s.number}
                  onClick={() => setActiveStep(i)}
                  aria-pressed={i === activeStep}
                  className={`rounded-full border px-5 py-2.5 text-sm font-semibold tracking-[0.1em] transition-all duration-300 ${
                    i === activeStep
                      ? 'border-accent text-accent'
                      : 'border-white/12 text-background/60 opacity-40 hover:opacity-60'
                  }`}
                >
                  {s.number}
                </button>
              ))}
            </div>

            {/* Animated step content */}
            <div className="mt-10 min-h-[16rem]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="block font-drama text-7xl font-normal leading-none text-accent/20">
                    {step.number}
                  </span>
                  <h3 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-white md:text-4xl">
                    {step.title}
                  </h3>
                  <p className="mt-5 max-w-xl text-lg leading-relaxed text-background/68">
                    {step.text}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* CTAs */}
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                to="/chi-siamo"
                className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/7 px-7 py-4 text-base font-medium text-background backdrop-blur-md transition-colors hover:bg-white/10"
              >
                Conosci il team
              </Link>
              <Link
                to="/contatti"
                className="inline-flex items-center justify-center rounded-full bg-accent px-7 py-4 text-base font-semibold text-primary transition-colors hover:bg-[#e4b14a]"
              >
                Scrivici
              </Link>
            </div>
          </motion.div>

          {/* Right: sticky image with crossfade */}
          <div className="lg:sticky lg:top-32">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="aspect-[4/3] overflow-hidden rounded-card-md"
              >
                <img
                  src={step.image}
                  alt={step.imageAlt}
                  width={600}
                  height={450}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
