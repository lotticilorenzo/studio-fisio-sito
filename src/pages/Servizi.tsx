import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MagneticButton } from '../components/MagneticButton';
import { PageHero } from '../components/PageHero';
import { SectionDivider } from '../components/SectionDivider';
import { useSEO } from '../hooks/useSEO';
import { services } from '../data/services';
import { ease, duration } from '../lib/motion';

const categories = ['Tutti', 'Fisioterapia', 'Movimento', 'Donna', 'Benessere'] as const;
type Category = (typeof categories)[number];

function matchesCategory(label: string, cat: Category): boolean {
  if (cat === 'Tutti') return true;
  const l = label.toLowerCase();
  if (cat === 'Fisioterapia') return l.includes('fisioterapia');
  if (cat === 'Movimento') return l.includes('pilates') || l.includes('movimento');
  if (cat === 'Donna') return l.includes('donna');
  if (cat === 'Benessere')
    return ['psicologia', 'nutrizione', 'linfodrenaggio'].some((k) => l.includes(k));
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
    schema: {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Servizi di Studio Fisyo',
      description: 'Fisioterapia, Pilates Clinico, salute della donna, linfodrenaggio, psicologia, nutrizione a Felino (Parma).',
      numberOfItems: services.length,
      itemListElement: services.map((service, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: service.title,
        url: `https://www.studiofisyo.com/servizi/${service.id}`,
      })),
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filtered =
    activeCategory === 'Tutti'
      ? services
      : services.filter((s) => matchesCategory(s.label, activeCategory));

  return (
    <div className="relative isolate overflow-hidden px-6 pb-24 pt-32 lg:px-12">
      <div className="page-aura" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl">
        <PageHero
          label="Servizi"
          title="Percorsi diversi."
          titleAccent="Uno stesso modo di lavorare."
          subtitle="Ogni area dello studio ha una competenza precisa. Il punto non è offrirti tante cose, ma aiutarti a capire quale strada ha davvero senso per te."
        />

        <SectionDivider className="mt-14 mb-10" />

        {/* Category filter */}
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filtra per categoria">
          {categories.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={cat === activeCategory}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
                cat === activeCategory
                  ? 'bg-primary text-background shadow-[0_4px_20px_-8px_rgba(36,52,44,0.35)]'
                  : 'border border-primary/10 bg-white/70 text-primary/72 backdrop-blur-md hover:bg-white hover:text-primary'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Service list */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: duration.fast, ease: ease.out }}
            className="mt-14 flex flex-col gap-16 md:gap-20"
          >
            {filtered.length === 0 && (
              <p className="text-lg text-primary/60">Nessun servizio in questa categoria.</p>
            )}
            {filtered.map((service, index) => {
              const Icon = service.icon;
              const isEven = index % 2 === 0;

              return (
                <motion.article
                  key={service.id}
                  initial={{ opacity: 0, y: 26 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: duration.slow,
                    delay: index * 0.06,
                    ease: ease.out,
                  }}
                  className={`grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center ${
                    isEven
                      ? ''
                      : 'lg:[&>div:first-child]:order-2 lg:[&>div:last-child]:order-1'
                  }`}
                >
                  <div>
                    <Link
                      to={`/servizi/${service.id}`}
                      aria-label={`Scopri ${service.title}`}
                      className="group block overflow-hidden rounded-[2.8rem] border border-primary/8 bg-white/70 p-3 shadow-[0_28px_80px_-46px_rgba(31,42,36,0.22)] backdrop-blur-xl"
                    >
                      <div className="relative overflow-hidden rounded-[2.2rem] bg-[#e9dfd0]">
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
                    <MagneticButton
                      to={`/servizi/${service.id}`}
                      aria-label={`Approfondisci ${service.title}`}
                      className="mt-8 bg-primary px-7 py-4 text-base font-semibold text-background"
                    >
                      Approfondisci il servizio
                    </MagneticButton>
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
