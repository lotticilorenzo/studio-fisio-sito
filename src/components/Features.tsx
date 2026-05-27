/* eslint-disable react-hooks/refs */
import { useState, useRef } from 'react';
import { ArrowRightIcon, ChevronDownIcon } from '@radix-ui/react-icons';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import type { RefObject } from 'react';
import { ease, duration, viewport } from '../lib/motion';

function useTilt(factor = 8) {
  const ref = useRef<HTMLElement>(null);
  const rawRx = useMotionValue(0);
  const rawRy = useMotionValue(0);
  const rotateX = useSpring(rawRx, { stiffness: 280, damping: 24 });
  const rotateY = useSpring(rawRy, { stiffness: 280, damping: 24 });

  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    rawRy.set(x * factor);
    rawRx.set(-y * factor);
  };
  const onMouseLeave = () => {
    rawRx.set(0);
    rawRy.set(0);
  };

  return { ref: ref as RefObject<HTMLElement>, rotateX, rotateY, onMouseMove, onMouseLeave };
}

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
};

const accordionTransition = { duration: 0.26, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] };

const qualitativeItems = [
  {
    title: 'Controllo',
    desc: 'Riconosciamo i movimenti che ti limitano e impostiamo il lavoro per recuperarli.',
  },
  {
    title: 'Mobilità',
    desc: 'Sblocchiamo le aree rigide con tecnica manuale e esercizio mirato.',
  },
  {
    title: 'Continuità',
    desc: 'Ti accompagniamo oltre la seduta con indicazioni pratiche e follow-up.',
  },
];

const steps = [
  ['Valutazione iniziale', 'Si parte da ascolto, storia clinica e obiettivi concreti.'],
  ['Scelte leggibili', 'Ti spieghiamo cosa facciamo, perché lo facciamo e come si prosegue.'],
  ['Passi sostenibili', 'Non carichiamo il percorso di cose che non servono.'],
];

const serviceTags = ['Fisioterapia', 'Pilates clinico', 'Salute della donna', 'Nutrizione', 'Psicologia'];

export const Features = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const tiltMain = useTilt(6);
  const tiltSecond = useTilt(5);
  const tiltThird = useTilt(5);

  const toggle = (i: number) => setOpenIndex((prev) => (prev === i ? null : i));

  return (
    <section id="perche-sceglierci" className="relative px-6 py-24 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <motion.div
          {...fadeUp}
          className="mb-14 grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-end"
        >
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.26em] text-primary/48">
              Perché sceglierci
            </p>
            <h2 className="max-w-3xl text-4xl font-semibold leading-[0.98] tracking-[-0.05em] text-primary md:text-6xl">
              Tre motivi per cui qui il percorso
              <span className="font-drama italic font-normal text-accent"> si sente diverso.</span>
            </h2>
          </div>
          <p className="max-w-xl text-lg leading-relaxed text-primary/68">
            Non stiamo aggiungendo servizi uno accanto all'altro. Stiamo costruendo
            un modo di lavorare in cui ogni parte dello studio ha un ruolo chiaro.
          </p>
        </motion.div>

        {/* Mobile accordion */}
        <div className="flex flex-col gap-3 lg:hidden">

          {/* Accordion: Primo pilastro (dark) */}
          <div className="overflow-hidden rounded-card-md border border-white/10 bg-primary text-background">
            <button
              onClick={() => toggle(0)}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              aria-expanded={openIndex === 0}
            >
              <div>
                <p className="text-[10px] uppercase tracking-[0.24em] text-background/45">Primo pilastro</p>
                <h3 className="mt-1 text-lg font-semibold leading-snug tracking-[-0.03em]">
                  Un solo studio, più competenze che si parlano davvero.
                </h3>
              </div>
              <ChevronDownIcon
                className={`h-5 w-5 shrink-0 text-accent transition-transform duration-300 ${openIndex === 0 ? 'rotate-180' : ''}`}
              />
            </button>
            <AnimatePresence initial={false}>
              {openIndex === 0 && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={accordionTransition}
                  className="overflow-hidden"
                >
                  <div className="border-t border-white/10 px-6 pb-6 pt-4">
                    <p className="text-base leading-relaxed text-background/72">
                      Quando serve, il percorso non resta chiuso in una stanza. Le
                      professioniste si confrontano e il lavoro rimane coerente.
                    </p>
                    <div className="mt-6 flex flex-wrap gap-2 text-sm text-background/72">
                      {serviceTags.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-white/12 bg-white/6 px-3 py-1.5 backdrop-blur-sm"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Accordion: Secondo pilastro (light) */}
          <div className="overflow-hidden rounded-card-md border border-primary/10 bg-white/82 backdrop-blur-xl">
            <button
              onClick={() => toggle(1)}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              aria-expanded={openIndex === 1}
            >
              <div>
                <p className="text-[10px] uppercase tracking-[0.24em] text-primary/58">Secondo pilastro</p>
                <h3 className="mt-1 text-lg font-semibold leading-snug tracking-[-0.03em] text-primary">
                  Ogni percorso parte da una domanda semplice.
                </h3>
              </div>
              <ChevronDownIcon
                className={`h-5 w-5 shrink-0 text-accent transition-transform duration-300 ${openIndex === 1 ? 'rotate-180' : ''}`}
              />
            </button>
            <AnimatePresence initial={false}>
              {openIndex === 1 && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={accordionTransition}
                  className="overflow-hidden"
                >
                  <div className="border-t border-primary/8 px-6 pb-6 pt-4">
                    <p className="text-base leading-relaxed text-primary/68">
                      Di cosa hai bisogno oggi e che cosa vuoi tornare a fare senza paura,
                      senza compensi e senza rinunce inutili.
                    </p>
                    <div className="mt-5 space-y-4">
                      {steps.map(([title, text], index) => (
                        <div key={title} className="flex items-start gap-4">
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/12 text-sm font-semibold text-accent">
                            0{index + 1}
                          </span>
                          <div>
                            <p className="font-medium text-primary">{title}</p>
                            <p className="mt-1 text-sm leading-relaxed text-primary/60">{text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Accordion: Terzo pilastro (warm neutral) */}
          <div className="overflow-hidden rounded-card-md border border-accent/12 bg-warm-200">
            <button
              onClick={() => toggle(2)}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              aria-expanded={openIndex === 2}
            >
              <div>
                <p className="text-[10px] uppercase tracking-[0.24em] text-primary/58">Terzo pilastro</p>
                <h3 className="mt-1 text-lg font-semibold leading-snug tracking-[-0.03em] text-primary">
                  Trattamento e lavoro attivo devono stare insieme.
                </h3>
              </div>
              <ChevronDownIcon
                className={`h-5 w-5 shrink-0 text-accent transition-transform duration-300 ${openIndex === 2 ? 'rotate-180' : ''}`}
              />
            </button>
            <AnimatePresence initial={false}>
              {openIndex === 2 && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={accordionTransition}
                  className="overflow-hidden"
                >
                  <div className="border-t border-primary/8 px-6 pb-6 pt-4">
                    <p className="text-base leading-relaxed text-primary/68">
                      Per questo i percorsi non si fermano al lettino. Quando serve, il corpo
                      va accompagnato a ritrovare fiducia nel movimento.
                    </p>
                    <div className="mt-5 space-y-5">
                      {qualitativeItems.map((item, i) => (
                        <motion.div
                          key={item.title}
                          initial={{ opacity: 0, y: 16 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={viewport.item}
                          transition={{ duration: duration.std, ease: ease.out, delay: i * 0.08 }}
                          className="border-l-2 border-accent/40 pl-4"
                        >
                          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary/60">
                            {item.title}
                          </p>
                          <p className="mt-1.5 text-[14px] leading-relaxed text-primary/72">
                            {item.desc}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                    <Link
                      to="/servizi/pilates-clinico"
                      className="mt-6 inline-flex items-center gap-3 text-sm font-semibold text-primary transition-colors hover:text-accent"
                    >
                      Scopri il Pilates Clinico
                      <ArrowRightIcon className="h-4 w-4 text-accent" />
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Desktop grid */}
        <div className="hidden gap-6 lg:grid lg:grid-cols-12 lg:grid-rows-[minmax(0,1fr)_minmax(0,1fr)]">
          <motion.article
            ref={tiltMain.ref}
            onMouseMove={tiltMain.onMouseMove}
            onMouseLeave={tiltMain.onMouseLeave}
            style={{ rotateX: tiltMain.rotateX, rotateY: tiltMain.rotateY, transformPerspective: 1000 }}
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.06 }}
            className="group relative overflow-hidden rounded-card-lg border border-primary/8 bg-primary text-background lg:col-span-7 lg:row-span-2"
          >
            <div className="absolute inset-0">
              <img
                src="/images/real/fototeamstudiofisyo.webp"
                alt="Il team dello Studio Fisyo."
                width={900}
                height={1125}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover object-center opacity-34 transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
              />
              {/* Darker overlay to keep the image background calm under copy */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/88 to-[#0e1a12]/96" />
            </div>

            <div className="relative flex h-full flex-col justify-between p-8 md:p-10 lg:p-12">
              <div className="max-w-md">
                <p className="text-xs uppercase tracking-[0.24em] text-background/45">
                  Primo pilastro
                </p>
                <h3 className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.04em] md:text-5xl">
                  Un solo studio, più competenze che si parlano davvero.
                </h3>
                <p className="mt-5 text-base leading-relaxed text-background/72 md:text-lg">
                  Quando serve, il percorso non resta chiuso in una stanza. Le
                  professioniste si confrontano e il lavoro rimane coerente.
                </p>
              </div>

              <div className="mt-10 flex flex-wrap gap-3 text-sm text-background/72">
                {serviceTags.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/12 bg-white/6 px-4 py-2 backdrop-blur-sm"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </motion.article>

          <motion.article
            ref={tiltSecond.ref}
            onMouseMove={tiltSecond.onMouseMove}
            onMouseLeave={tiltSecond.onMouseLeave}
            style={{ rotateX: tiltSecond.rotateX, rotateY: tiltSecond.rotateY, transformPerspective: 1000 }}
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.14 }}
            className="rounded-card-md border border-primary/10 bg-white/82 p-8 shadow-card-md backdrop-blur-xl lg:col-span-5"
          >
            <p className="text-xs uppercase tracking-[0.24em] text-primary/58">Secondo pilastro</p>
            <h3 className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-primary md:text-3xl">
              Ogni percorso parte da una domanda semplice.
            </h3>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-primary/68">
              Di cosa hai bisogno oggi e che cosa vuoi tornare a fare senza paura,
              senza compensi e senza rinunce inutili.
            </p>

            <div className="mt-8 space-y-4">
              {steps.map(([title, text], index) => (
                <div key={title} className="flex items-start gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/12 text-sm font-semibold text-accent">
                    0{index + 1}
                  </span>
                  <div>
                    <p className="font-medium text-primary">{title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-primary/60">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.article>

          <motion.article
            ref={tiltThird.ref}
            onMouseMove={tiltThird.onMouseMove}
            onMouseLeave={tiltThird.onMouseLeave}
            style={{ rotateX: tiltThird.rotateX, rotateY: tiltThird.rotateY, transformPerspective: 1000 }}
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.2 }}
            className="relative overflow-hidden rounded-card-md border border-accent/12 bg-warm-200 p-8 lg:col-span-5"
          >
            <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-white/40 to-transparent" />
            <p className="relative z-10 text-xs uppercase tracking-[0.24em] text-primary/58">Terzo pilastro</p>
            <h3 className="relative z-10 mt-4 max-w-sm text-2xl font-semibold tracking-[-0.04em] text-primary md:text-3xl">
              Trattamento e lavoro attivo devono stare insieme.
            </h3>
            <p className="relative z-10 mt-4 max-w-md text-base leading-relaxed text-primary/68">
              Per questo i percorsi non si fermano al lettino. Quando serve, il corpo
              va accompagnato a ritrovare fiducia nel movimento.
            </p>

            <div className="relative z-10 mt-8 space-y-5">
              {qualitativeItems.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewport.item}
                  transition={{ duration: duration.std, ease: ease.out, delay: i * 0.08 }}
                  className="border-l-2 border-accent/40 pl-4"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary/60">
                    {item.title}
                  </p>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-primary/72">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>

            <Link
              to="/servizi/pilates-clinico"
              className="relative z-10 mt-8 inline-flex items-center gap-3 text-sm font-semibold text-primary transition-colors hover:text-accent"
            >
              Scopri il Pilates Clinico
              <ArrowRightIcon className="h-4 w-4 text-accent" />
            </Link>
          </motion.article>
        </div>
      </div>
    </section>
  );
};
