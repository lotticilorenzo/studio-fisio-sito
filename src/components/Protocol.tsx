import { motion } from 'framer-motion';

const steps = [
  {
    title: 'Ascolto e valutazione',
    text: 'Partiamo da come stai, da quello che ti limita e da cosa vuoi tornare a fare senza pensarci ogni volta.',
    label: 'Fase 01',
    image: '/images/real/accoglienza.webp',
  },
  {
    title: 'Percorso condiviso',
    text: 'Se serve, il caso si apre al confronto tra le professioniste dello studio. Tu hai una direzione chiara e un percorso che resta coerente.',
    label: 'Fase 02',
    image: '/images/real/fototeamstudiofisyo.webp',
  },
  {
    title: 'Lavoro che continua',
    text: 'Trattamento, esercizi e indicazioni pratiche devono aiutarti anche fuori dallo studio. È lì che il risultato comincia a restare.',
    label: 'Fase 03',
    image: '/images/real/fisioterapia_studio_fisyo.webp',
  },
];

export const Protocol = () => (
  <section className="px-6 py-24 lg:px-12 lg:py-32" id="il-metodo">
    <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)]">

      {/* Left: sticky header — unchanged */}
      <div className="lg:sticky lg:top-28 lg:self-start">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.26em] text-primary/46">
          Il nostro metodo
        </p>
        <h2 className="max-w-xl text-4xl font-semibold leading-[0.98] tracking-[-0.05em] text-primary md:text-6xl">
          Un percorso in tre fasi, senza passaggi superflui.
        </h2>
        <p className="mt-5 max-w-md text-base leading-relaxed text-primary/64 md:text-lg">
          Ogni fase ha un compito preciso. Capire il problema, impostare la strada
          giusta e accompagnarti nel lavoro che conta davvero.
        </p>
      </div>

      {/* Right: compact vertical timeline */}
      <div className="relative flex flex-col gap-10">
        {/* Vertical line — runs through all dot centers */}
        <div className="absolute left-6 top-5 h-[calc(100%-2.5rem)] w-px bg-primary/10" />

        {steps.map((step, index) => (
          <motion.article
            key={step.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex items-start gap-5"
          >
            {/* Dot column — w-12 centers the dot on the line at left-6 */}
            <div className="flex w-12 shrink-0 justify-center pt-[18px]">
              <div className="z-10 h-4 w-4 rounded-full border-2 border-background bg-accent" />
            </div>

            {/* Thumbnail */}
            <div className="h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-[#e8dfd2]">
              <img
                src={step.image}
                alt={step.title}
                width={80}
                height={80}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </div>

            {/* Text */}
            <div className="flex-1 pt-1">
              <span className="inline-block rounded-full bg-accent/12 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">
                {step.label}
              </span>
              <h3 className="mt-2 text-xl font-semibold tracking-[-0.04em] text-primary md:text-2xl">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-primary/66 md:text-base">
                {step.text}
              </p>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);
