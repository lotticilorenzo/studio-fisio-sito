import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MagneticButton } from '../components/MagneticButton';
import { PageHero } from '../components/PageHero';
import { SectionDivider } from '../components/SectionDivider';
import { InteractiveSurface } from '../components/InteractiveSurface';
import { useSEO } from '../hooks/useSEO';
import { STUDIO, waUrl } from '../config/constants';
import { services } from '../data/services';
import { ease, duration } from '../lib/motion';

const categories = ['Tutti', 'Fisioterapia', 'Movimento', 'Donna', 'Benessere'] as const;
type Category = (typeof categories)[number];

function matchesCategory(label: string, cat: Category): boolean {
  if (cat === 'Tutti') return true;
  const normalized = label.toLowerCase();
  if (cat === 'Fisioterapia') return normalized.includes('fisioterapia');
  if (cat === 'Movimento') return normalized.includes('pilates') || normalized.includes('movimento');
  if (cat === 'Donna') return normalized.includes('donna');
  if (cat === 'Benessere') {
    return ['psicologia', 'nutrizione', 'linfodrenaggio'].some((keyword) =>
      normalized.includes(keyword),
    );
  }
  return false;
}

export const Servizi = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('Tutti');

  useSEO({
    title: 'I nostri servizi | Fisioterapia, Pilates e salute a Felino',
    description:
      'Scopri i servizi di Studio Fisyo a Felino: fisioterapia, Pilates Clinico, salute della donna, linfodrenaggio, psicologia, Fisio4Young e nutrizione.',
    image: 'https://www.studiofisyo.com/images/real/internistudiofisyo2.webp',
    url: 'https://www.studiofisyo.com/servizi',
    schema: [
      {
        '@type': 'CollectionPage',
        name: 'Servizi di Studio Fisyo',
        description:
          'Fisioterapia, Pilates Clinico, salute della donna, linfodrenaggio, psicologia, nutrizione a Felino (Parma).',
        url: 'https://www.studiofisyo.com/servizi',
      },
      {
        '@type': 'ItemList',
        name: 'Servizi di Studio Fisyo',
        numberOfItems: services.length,
        itemListElement: services.map((service, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          name: service.title,
          url: `https://www.studiofisyo.com/servizi/${service.id}`,
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.studiofisyo.com/' },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Servizi',
            item: 'https://www.studiofisyo.com/servizi',
          },
        ],
      },
    ],
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filtered =
    activeCategory === 'Tutti'
      ? services
      : services.filter((service) => matchesCategory(service.label, activeCategory));

  return (
    <div className="relative isolate overflow-hidden px-6 pb-24 pt-32 lg:px-12">
      <div className="page-aura" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl 2xl:max-w-[1600px]">
        <PageHero
          label="Servizi"
          badge="Prima valutazione gratuita"
          title="Percorsi diversi."
          titleAccent="Uno stesso modo di lavorare."
          subtitle="Ogni area dello studio ha una competenza precisa. Il punto non è offrirti tante cose, ma aiutarti a capire quale strada ha davvero senso per te."
          captionEyebrow="I nostri percorsi"
          captionText="Ogni servizio nasce da una competenza precisa e da un modo di lavorare condiviso."
        />

        <SectionDivider className="mb-10 mt-14" />

        <section className="grid gap-6 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:items-start">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.26em] text-ink-muted">
              Filtra i percorsi
            </p>
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filtra per categoria">
              {categories.map((category) => (
                <button
                  key={category}
                  role="tab"
                  aria-selected={category === activeCategory}
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-full px-5 py-3 text-sm font-medium transition-colors ${
                    category === activeCategory
                      ? 'bg-primary text-background shadow-[0_4px_20px_-8px_rgba(36,52,44,0.35)]'
                      : 'border border-primary/10 bg-white/70 text-ink-soft backdrop-blur-md hover:bg-white hover:text-primary'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            <p className="mt-5 text-sm leading-relaxed text-ink-soft">
              {filtered.length} {filtered.length === 1 ? 'percorso visibile' : 'percorsi visibili'}.
              Se non sai ancora quale scegliere, va bene: il primo contatto serve proprio a questo.
            </p>
          </div>

          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: duration.slow, ease: ease.out }}
            className="rounded-card-lg border border-primary/8 bg-white/80 p-7 shadow-card-md backdrop-blur-xl md:p-8"
          >
            <InteractiveSurface className="rounded-card-md">
              <p className="text-eyebrow font-semibold uppercase text-ink-muted">
                Aiuto nella scelta
              </p>
              <h2 className="mt-4 max-w-2xl text-3xl font-semibold leading-tight tracking-[-0.04em] text-primary md:text-4xl">
                Non serve arrivare con le idee perfette.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft md:text-lg">
                Se ci racconti in breve che cosa ti sta limitando oggi, ti aiutiamo a capire
                se partire da fisioterapia, movimento guidato o da un altro percorso dello studio.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <span className="rounded-full border border-primary/8 bg-warm-100 px-4 py-2 text-sm text-ink-soft">
                  Prima valutazione gratuita
                </span>
                <span className="rounded-full border border-primary/8 bg-warm-100 px-4 py-2 text-sm text-ink-soft">
                  Risposta entro 24 h feriali
                </span>
                <span className="rounded-full border border-primary/8 bg-warm-100 px-4 py-2 text-sm text-ink-soft">
                  {STUDIO.city}
                </span>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <MagneticButton
                  to="/contatti"
                  className="bg-primary px-7 py-4 text-base font-semibold text-background"
                >
                  Ti aiutiamo a scegliere
                </MagneticButton>
                <a
                  href={waUrl('Ciao Studio Fisyo! Vorrei capire quale servizio è più adatto a me.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-primary/10 bg-white px-7 py-4 text-base font-medium text-primary transition-colors hover:bg-warm-50"
                >
                  Scrivici su WhatsApp
                </a>
              </div>
            </InteractiveSurface>
          </motion.article>
        </section>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: duration.fast, ease: ease.out }}
            className="mt-14 flex flex-col gap-24 md:gap-32"
          >
            {filtered.length === 0 && (
              <p className="text-lg text-ink-soft">Nessun servizio in questa categoria.</p>
            )}

            {filtered.map((service, index) => {
              const Icon = service.icon;
              const isEven = index % 2 === 0;

              if (service.id === 'fisioterapia') {
                const Icon = service.icon;
                return (
                  <motion.article
                    key={service.id}
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: duration.slow, ease: ease.out }}
                    className="overflow-hidden rounded-card-xl border border-primary/8 bg-warm-50 shadow-card-lg"
                  >
                    <div className="grid lg:grid-cols-[minmax(0,0.58fr)_minmax(0,0.42fr)]">
                      <Link
                        to={`/servizi/${service.id}`}
                        aria-label={`Scopri ${service.title}`}
                        className="group block overflow-hidden bg-warm-200"
                      >
                        <img
                          src={service.image}
                          alt={service.imageAlt}
                          width={800}
                          height={900}
                          loading="lazy"
                          decoding="async"
                          className="aspect-[4/3] lg:aspect-auto lg:h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
                        />
                      </Link>
                      <div className="flex flex-col justify-between p-8 lg:p-12">
                        <div>
                          <div className="mb-6 flex flex-wrap items-center gap-3">
                            <div className="inline-flex items-center gap-3 rounded-full border border-primary/8 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-ink-muted backdrop-blur-md">
                              <Icon className="h-4 w-4 text-accent" />
                              {service.label}
                            </div>
                            <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-accent">
                              <span className="h-1 w-1 rounded-full bg-accent" />
                              Servizio principale
                            </span>
                          </div>
                          <h2 className="max-w-2xl text-4xl font-semibold leading-tight tracking-[-0.05em] text-primary md:text-5xl lg:text-6xl">
                            {service.title}
                          </h2>
                          <p className="mt-5 text-lg leading-relaxed text-ink-soft">{service.summary}</p>
                        </div>
                        <div>
                          <div className="mt-6 flex flex-wrap gap-3">
                            {service.highlights.map((highlight) => (
                              <span
                                key={highlight}
                                className="rounded-full border border-primary/8 bg-warm-100 px-4 py-2 text-sm text-ink-soft"
                              >
                                {highlight}
                              </span>
                            ))}
                          </div>
                          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                            <MagneticButton
                              to={`/servizi/${service.id}`}
                              aria-label={`Approfondisci ${service.title}`}
                              className="bg-primary px-7 py-4 text-base font-semibold text-background"
                            >
                              Approfondisci il servizio
                            </MagneticButton>
                            <Link
                              to={`/contatti?service=${service.id}`}
                              className="inline-flex items-center justify-center rounded-full border border-primary/10 bg-white/72 px-7 py-4 text-base font-medium text-primary backdrop-blur-md transition-colors hover:bg-white"
                            >
                              Prenota questo percorso
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                );
              }

              const colClass =
                index % 3 === 0
                  ? 'lg:grid-cols-[minmax(0,0.55fr)_minmax(0,1.45fr)]'
                  : index % 3 === 1
                    ? 'lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]'
                    : 'lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]';

              return (
                <motion.article
                  key={service.id}
                  initial={{ opacity: 0, y: 26 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: duration.slow, delay: Math.min(index, 3) * 0.06, ease: ease.out }}
                  className={`grid gap-8 ${colClass} lg:items-center ${
                    isEven ? '' : 'lg:[&>div:first-child]:order-2 lg:[&>div:last-child]:order-1'
                  }`}
                >
                  <InteractiveSurface className="rounded-card-lg">
                    <Link
                      to={`/servizi/${service.id}`}
                      aria-label={`Scopri ${service.title}`}
                      className="group block overflow-hidden rounded-card-lg border border-primary/8 bg-white/70 p-3 shadow-card-md backdrop-blur-xl"
                    >
                      <div className="relative overflow-hidden rounded-card-md bg-warm-300">
                        <img
                          src={service.image}
                          alt={service.imageAlt}
                          width={800}
                          height={900}
                          loading="lazy"
                          decoding="async"
                          className="aspect-[4/4.4] w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/24 to-transparent" />
                      </div>
                    </Link>
                  </InteractiveSurface>

                  <div className="px-1">
                    <div className="inline-flex items-center gap-3 rounded-full border border-primary/8 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-ink-muted backdrop-blur-md">
                      <Icon className="h-4 w-4 text-accent" />
                      {service.label}
                    </div>
                    <h2 className="mt-6 max-w-2xl text-3xl font-semibold leading-tight tracking-[-0.05em] text-primary md:text-5xl">
                      {service.title}
                    </h2>
                    <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
                      {service.summary}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-3">
                      {service.highlights.map((highlight) => (
                        <span
                          key={highlight}
                          className="rounded-full border border-primary/8 bg-warm-100 px-4 py-2 text-sm text-ink-soft"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                      <MagneticButton
                        to={`/servizi/${service.id}`}
                        aria-label={`Approfondisci ${service.title}`}
                        className="bg-primary px-7 py-4 text-base font-semibold text-background"
                      >
                        Approfondisci il servizio
                      </MagneticButton>
                      <Link
                        to={`/contatti?service=${service.id}`}
                        className="inline-flex items-center justify-center rounded-full border border-primary/10 bg-white/72 px-7 py-4 text-base font-medium text-primary backdrop-blur-md transition-colors hover:bg-white"
                      >
                        Prenota questo percorso
                      </Link>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
