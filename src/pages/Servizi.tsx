import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MagneticButton } from '../components/MagneticButton';
import { useSEO } from '../hooks/useSEO';
import { services } from '../data/services';

export const Servizi = () => {
  useSEO({
    title: 'I nostri servizi | Fisioterapia, Pilates e salute a Felino',
    description:
      'Scopri i servizi di Studio Fisyo a Felino: fisioterapia, Pilates Clinico, salute della donna, linfodrenaggio, psicologia, Fisio4Young e nutrizione.',
    image: 'https://www.studiofisyo.com/images/real/internistudiofisyo2.webp',
    url: 'https://www.studiofisyo.com/servizi',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      itemListElement: services.map((service, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        url: `https://www.studiofisyo.com/servizi/${service.id}`,
        name: service.title,
      })),
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="px-6 pb-24 pt-32 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <header className="grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-end">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.26em] text-primary/46">
              Servizi
            </p>
            <h1 className="max-w-3xl text-5xl font-semibold leading-[0.96] tracking-[-0.06em] text-primary md:text-7xl">
              Percorsi diversi.
              <span className="block font-drama font-normal italic text-accent">Uno stesso modo di lavorare.</span>
            </h1>
          </div>

          <p className="max-w-2xl text-lg leading-relaxed text-primary/68 md:text-xl">
            Ogni area dello studio ha una competenza precisa. Il punto non e offrirti
            tante cose, ma aiutarti a capire quale strada ha davvero senso per te.
          </p>
        </header>

        <div className="mt-16 flex flex-col gap-16 md:gap-20">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isEven = index % 2 === 0;

            return (
              <motion.article
                key={service.id}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                className={`grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center ${
                  isEven ? '' : 'lg:[&>div:first-child]:order-2 lg:[&>div:last-child]:order-1'
                }`}
              >
                <div>
                  <Link to={`/servizi/${service.id}`} className="group block overflow-hidden rounded-[2.8rem] border border-primary/8 bg-white/70 p-3 shadow-[0_28px_80px_-46px_rgba(31,42,36,0.22)] backdrop-blur-xl">
                    <div className="relative overflow-hidden rounded-[2.2rem] bg-[#e9dfd0]">
                      <img
                        src={service.image}
                        alt={service.imageAlt}
                        loading="lazy"
                        decoding="async"
                        className="aspect-[4/4.4] w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/24 to-transparent" />
                    </div>
                  </Link>
                </div>

                <div className="px-1">
                  <div className="inline-flex items-center gap-3 rounded-full border border-primary/8 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary/54 backdrop-blur-md">
                    <Icon className="h-4 w-4 text-accent" />
                    {service.label}
                  </div>
                  <h2 className="mt-6 max-w-2xl text-3xl font-semibold leading-tight tracking-[-0.05em] text-primary md:text-5xl">
                    {service.title}
                  </h2>
                  <p className="mt-5 max-w-2xl text-lg leading-relaxed text-primary/68">
                    {service.summary}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-3">
                    {service.highlights.map((highlight) => (
                      <span
                        key={highlight}
                        className="rounded-full border border-primary/8 bg-transparent px-4 py-2 text-sm text-primary/56"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>

                  <p className="mt-7 max-w-2xl text-base leading-relaxed text-primary/58">
                    {service.subtitle}
                  </p>

                  <MagneticButton
                    to={`/servizi/${service.id}`}
                    className="mt-8 bg-primary px-7 py-4 text-base font-semibold text-background"
                  >
                    Approfondisci il servizio
                  </MagneticButton>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </div>
  );
};
