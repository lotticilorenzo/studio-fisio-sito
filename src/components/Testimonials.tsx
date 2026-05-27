import { motion } from 'framer-motion';
import { STUDIO } from '../config/constants';
import { InteractiveSurface } from './InteractiveSurface';

const testimonials = [
  {
    name: 'Marco P.',
    condition: 'Mal di schiena cronico',
    text: 'Mi sono sentito seguito con attenzione e senza fretta. Abbiamo lavorato sul dolore, ma anche su quello che lo faceva tornare.',
    featured: true,
  },
  {
    name: 'Giulia M.',
    condition: 'Recupero dopo un infortunio',
    text: "Il percorso è stato chiaro dall'inizio. Ho capito cosa fare, cosa evitare e come rientrare a muovermi con fiducia.",
    featured: false,
  },
  {
    name: 'Roberto L.',
    condition: 'Cervicale e postura',
    text: 'Competenza e chiarezza. Mi ha fatto bene sentire che qualcuno stava guardando il problema nel suo insieme.',
    featured: false,
  },
];

export const Testimonials = () => {
  const trustPoints = ['5.0 su Google', '47 recensioni', 'Felino, Parma'];

  return (
    <section className="relative px-6 py-24 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between"
        >
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.26em] text-primary/60">
              Recensioni
            </p>
            <h2 className="max-w-3xl text-4xl font-semibold leading-[0.98] tracking-[-0.05em] text-primary md:text-6xl">
              Le persone arrivano per un problema.
              <span className="font-drama italic font-normal text-accent"> Restano per come si sentono seguite.</span>
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-primary/64 md:text-lg">
            Parole semplici, ma molto utili: quando tornano sempre le stesse, dicono qualcosa di
            vero sul modo in cui uno studio viene vissuto.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 flex flex-wrap gap-3"
        >
          {trustPoints.map((item) => (
            <span
              key={item}
              className="inline-flex items-center gap-2 rounded-full border border-primary/8 bg-white/72 px-4 py-2 text-sm font-medium text-primary/70 backdrop-blur-md"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
              {item}
            </span>
          ))}
        </motion.div>

        <div className="flex snap-x gap-5 overflow-x-auto pb-2 lg:grid lg:grid-cols-[1.15fr_0.85fr_0.85fr] lg:overflow-visible">
          {testimonials.map((testimonial, index) => (
            <motion.article
              key={testimonial.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="min-w-[84vw] snap-start rounded-card-lg md:min-w-[420px] lg:min-w-0"
            >
              <InteractiveSurface className="h-full rounded-card-lg">
                <div
                  className={`h-full overflow-hidden rounded-card-lg border p-7 md:p-8 ${
                    testimonial.featured
                      ? 'border-primary/10 bg-primary text-background shadow-card-lg'
                      : 'border-primary/8 bg-white/80 text-primary shadow-card-md backdrop-blur-xl'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      {Array.from({ length: 5 }).map((_, starIndex) => (
                        <span
                          key={starIndex}
                          className="inline-block h-2 w-2 rounded-full bg-accent"
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <span
                      className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${
                        testimonial.featured
                          ? 'border-white/12 bg-white/6 text-background/56'
                          : 'border-primary/8 bg-white/65 text-primary/50'
                      }`}
                    >
                      Recensione
                    </span>
                  </div>

                  <blockquote
                    className={`mt-6 text-lg leading-relaxed ${
                      testimonial.featured ? 'text-background/78' : 'text-primary/72'
                    }`}
                  >
                    {testimonial.text}
                  </blockquote>

                  <div
                    className={`mt-8 border-t pt-5 ${
                      testimonial.featured ? 'border-white/10' : 'border-primary/8'
                    }`}
                  >
                    <p className={`font-semibold ${testimonial.featured ? 'text-background' : 'text-primary'}`}>
                      {testimonial.name}
                    </p>
                    <p
                      className={`mt-1 text-sm ${
                        testimonial.featured ? 'text-background/50' : 'text-primary/50'
                      }`}
                    >
                      {testimonial.condition}
                    </p>
                  </div>
                </div>
              </InteractiveSurface>
            </motion.article>
          ))}
        </div>

        <a
          href={STUDIO.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2 rounded-full border border-primary/8 bg-white/72 px-5 py-3 text-sm font-medium text-primary/64 transition-colors hover:bg-white hover:text-primary"
        >
          Leggi le recensioni su Google
          <span className="sr-only">(apre in una nuova scheda)</span>
        </a>
      </div>
    </section>
  );
};
