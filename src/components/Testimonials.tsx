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
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.26em] text-ink-muted">
              Recensioni
            </p>
            <h2 className="max-w-3xl text-h2 font-semibold text-primary">
              Le persone arrivano per un problema.
              <span className="font-drama italic font-normal text-accent"> Restano per come si sentono seguite.</span>
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-ink-soft md:text-lg">
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
              className="inline-flex items-center gap-2 rounded-full border border-primary/8 bg-white/72 px-4 py-2 text-sm font-medium text-ink-soft backdrop-blur-md"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
              {item}
            </span>
          ))}
        </motion.div>

        {/* Large featured testimonial */}
        <motion.article
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          <InteractiveSurface className="rounded-card-xl">
            <div className="overflow-hidden rounded-card-xl border border-primary/10 bg-primary p-10 text-background shadow-card-xl md:p-12">
              <div className="flex items-center gap-2">
                {Array.from({ length: 5 }).map((_, starIndex) => (
                  <span
                    key={starIndex}
                    className="inline-block h-2.5 w-2.5 rounded-full bg-accent"
                    aria-hidden="true"
                  />
                ))}
              </div>
              <blockquote className="mt-8 max-w-3xl text-2xl leading-relaxed text-background/82 md:text-3xl">
                {testimonials[0].text}
              </blockquote>
              <div className="mt-10 flex items-end justify-between border-t border-white/10 pt-6">
                <div>
                  <p className="font-semibold text-background">{testimonials[0].name}</p>
                  <p className="mt-1 text-sm text-background/70">{testimonials[0].condition}</p>
                </div>
              </div>
            </div>
          </InteractiveSurface>
        </motion.article>

        {/* 2 smaller testimonials */}
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {testimonials.slice(1).map((testimonial, index) => (
            <motion.article
              key={testimonial.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: (index + 1) * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <InteractiveSurface className="h-full rounded-card-lg">
                <div className="h-full overflow-hidden rounded-card-lg border border-primary/8 bg-white/80 p-7 text-primary shadow-card-md backdrop-blur-xl md:p-8">
                  <div className="flex items-center gap-2">
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <span
                        key={starIndex}
                        className="inline-block h-2 w-2 rounded-full bg-accent"
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <blockquote className="mt-6 text-lg leading-relaxed text-ink-soft">
                    {testimonial.text}
                  </blockquote>
                  <div className="mt-6 border-t border-primary/8 pt-4">
                    <p className="font-semibold text-primary">{testimonial.name}</p>
                    <p className="mt-1 text-sm text-ink-muted">{testimonial.condition}</p>
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
          className="mt-8 inline-flex items-center gap-2 rounded-full border border-primary/8 bg-white/72 px-5 py-3 text-sm font-medium text-primary/80 transition-colors hover:bg-white hover:text-primary"
        >
          Leggi le recensioni su Google →
          <span className="sr-only">(apre in una nuova scheda)</span>
        </a>
      </div>
    </section>
  );
};
