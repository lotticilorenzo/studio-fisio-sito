import { motion } from 'framer-motion';
import { Reveal } from './Reveal';

const testimonials = [
  {
    name: 'Marco P.',
    condition: 'Mal di schiena cronico',
    text: 'Mi sono sentito seguito con attenzione e senza fretta. Abbiamo lavorato sul dolore, ma anche su quello che lo faceva tornare.',
  },
  {
    name: 'Giulia M.',
    condition: 'Recupero dopo un infortunio',
    text: "Il percorso è stato chiaro dall'inizio. Ho capito cosa fare, cosa evitare e come rientrare a muovermi con fiducia.",
    featured: true,
  },
  {
    name: 'Roberto L.',
    condition: 'Cervicale e postura',
    text: 'Competenza e chiarezza. Mi ha fatto bene sentire che qualcuno stava guardando il problema nel suo insieme.',
  },
];

export const Testimonials = () => {
  return (
    <section className="relative px-6 py-24 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal width="100%">
          <div className="mb-14 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.26em] text-primary/46">
                Recensioni
              </p>
              <h2 className="max-w-3xl text-4xl font-semibold leading-[0.98] tracking-[-0.05em] text-primary md:text-6xl">
                Le persone arrivano per un problema.
                <span className="font-drama italic font-normal text-accent"> Restano per come si sentono seguite.</span>
              </h2>
            </div>
            <p className="max-w-md text-base leading-relaxed text-primary/64 md:text-lg">
              Una selezione di parole che tornano spesso quando qualcuno ci racconta
              come ha vissuto il percorso.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-12 lg:items-stretch">
          {testimonials.map((testimonial, index) => (
            <Reveal
              key={testimonial.name}
              width="100%"
              delay={index * 0.08}
              className={testimonial.featured ? 'lg:col-span-6' : 'lg:col-span-3'}
            >
              <motion.article
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 180, damping: 18 }}
                className={`group relative flex h-full flex-col overflow-hidden rounded-[2.5rem] border p-8 md:p-9 ${
                  testimonial.featured
                    ? 'border-primary/10 bg-primary text-background shadow-[0_30px_80px_-40px_rgba(36,52,44,0.42)]'
                    : 'border-primary/8 bg-white/78 text-primary shadow-[0_24px_70px_-42px_rgba(31,42,36,0.18)] backdrop-blur-xl'
                }`}
              >
                <div
                  className={`pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${
                    testimonial.featured
                      ? 'bg-[radial-gradient(circle_at_top_right,rgba(217,164,59,0.18),transparent_34%)]'
                      : 'bg-[radial-gradient(circle_at_top_right,rgba(217,164,59,0.12),transparent_34%)]'
                  }`}
                />

                <div className="relative flex items-center gap-2">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <span
                      key={starIndex}
                      className={`h-2.5 w-2.5 rounded-full ${
                        testimonial.featured ? 'bg-accent' : 'bg-accent/72'
                      }`}
                    />
                  ))}
                </div>

                <blockquote
                  className={`relative mt-8 text-lg leading-relaxed ${
                    testimonial.featured ? 'text-background/78 md:text-[1.38rem]' : 'text-primary/72'
                  }`}
                >
                  "{testimonial.text}"
                </blockquote>

                <div
                  className={`relative mt-auto border-t pt-5 ${
                    testimonial.featured ? 'border-white/10' : 'border-primary/8'
                  }`}
                >
                  <p className={`font-medium ${testimonial.featured ? 'text-white' : 'text-primary'}`}>
                    {testimonial.name}
                  </p>
                  <p className={`mt-1 text-sm ${testimonial.featured ? 'text-background/55' : 'text-primary/48'}`}>
                    {testimonial.condition}
                  </p>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
