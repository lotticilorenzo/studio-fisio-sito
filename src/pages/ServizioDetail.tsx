import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeftIcon, ChevronDownIcon } from '@radix-ui/react-icons';
import { Link, Navigate, useParams } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';
import { servicesById } from '../data/services';
import { MagneticButton } from '../components/MagneticButton';
import { SectionDivider } from '../components/SectionDivider';
import { ease, duration, viewport } from '../lib/motion';

const accordionTransition = {
  duration: 0.26,
  ease: ease.out,
};

const FAQAccordion = ({
  faqs,
}: {
  faqs: { question: string; answer: string }[];
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="flex flex-col gap-3">
      {faqs.map((faq, index) => (
        <div
          key={faq.question}
          className="overflow-hidden rounded-[1.8rem] border border-primary/8 bg-white/80 backdrop-blur-xl"
        >
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            aria-expanded={openIndex === index}
            className="flex w-full items-center justify-between gap-5 px-6 py-5 text-left"
          >
            <span className="text-base font-medium leading-snug text-primary md:text-lg">
              {faq.question}
            </span>
            <ChevronDownIcon
              aria-hidden="true"
              className={`h-5 w-5 shrink-0 text-accent transition-transform ${
                openIndex === index ? 'rotate-180' : ''
              }`}
            />
          </button>
          <AnimatePresence initial={false}>
            {openIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={accordionTransition}
                className="overflow-hidden"
              >
                <p className="border-t border-primary/6 px-6 pb-6 pt-4 text-base leading-relaxed text-primary/72">
                  {faq.answer}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

export const ServizioDetail = () => {
  const { id } = useParams<{ id: string }>();
  const service = id ? servicesById[id] : undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useSEO(
    service
      ? {
          title: `${service.title} | Studio Fisyo`,
          description: service.summary,
          image: `https://www.studiofisyo.com${service.image}`,
          url: `https://www.studiofisyo.com/servizi/${id}`,
          schema: [
            {
              '@type': 'Service',
              name: service.title,
              description: service.summary,
              provider: {
                '@type': 'MedicalClinic',
                name: 'Studio Fisyo',
                url: 'https://www.studiofisyo.com',
              },
              areaServed: 'Felino, Parma',
              url: `https://www.studiofisyo.com/servizi/${id}`,
            },
            {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.studiofisyo.com/' },
                { '@type': 'ListItem', position: 2, name: 'Servizi', item: 'https://www.studiofisyo.com/servizi' },
                { '@type': 'ListItem', position: 3, name: service.title, item: `https://www.studiofisyo.com/servizi/${id}` },
              ],
            },
            {
              '@type': 'FAQPage',
              mainEntity: service.faqs.map((faq) => ({
                '@type': 'Question',
                name: faq.question,
                acceptedAnswer: { '@type': 'Answer', text: faq.answer },
              })),
            },
          ],
        }
      : { title: 'Servizio | Studio Fisyo', description: '', url: '' },
  );

  if (!service) {
    return <Navigate to="/servizi" replace />;
  }

  const Icon = service.icon;

  return (
    <div className="relative isolate overflow-hidden px-6 pb-24 pt-32 lg:px-12">
      <div className="page-aura" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl">
        <Link
          to="/servizi"
          className="inline-flex items-center gap-2 text-sm font-medium text-primary/62 transition-colors hover:text-primary"
        >
          <ArrowLeftIcon className="h-4 w-4" aria-hidden="true" />
          Torna a tutti i servizi
        </Link>

        <section className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-end">
          <div>
            <div className="inline-flex items-center gap-3 rounded-full border border-primary/8 bg-white/75 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary/54 backdrop-blur-md">
              <Icon className="h-4 w-4 text-accent" />
              {service.label}
            </div>
            <h1 className="mt-6 max-w-3xl text-5xl font-semibold leading-[0.96] tracking-[-0.06em] text-primary md:text-7xl">
              {service.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-primary/68 md:text-xl">
              {service.subtitle}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {service.highlights.map((highlight) => (
                <span
                  key={highlight}
                  className="rounded-full border border-primary/8 bg-transparent px-4 py-2 text-sm text-primary/54"
                >
                  {highlight}
                </span>
              ))}
            </div>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <MagneticButton
                to="/contatti"
                className="bg-primary px-7 py-4 text-base font-semibold text-background"
              >
                Prenota una valutazione
              </MagneticButton>
              <a
                href="https://wa.me/393396508642?text=Ciao%20Studio%20Fisyo!%20Vorrei%20avere%20informazioni%20su%20questo%20servizio."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-primary/10 bg-white/72 px-7 py-4 text-base font-medium text-primary backdrop-blur-md transition-colors hover:bg-white"
              >
                Chiedi informazioni
              </a>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: duration.slow, ease: ease.out }}
            className="overflow-hidden rounded-[2.8rem] border border-primary/8 bg-white/74 p-3 shadow-[0_30px_80px_-44px_rgba(31,42,36,0.24)] backdrop-blur-xl"
          >
            <div className="overflow-hidden rounded-[2.2rem] bg-[#eadfce]">
              <img
                src={service.image}
                alt={service.imageAlt}
                width={800}
                height={900}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="aspect-[4/4.3] w-full object-cover"
              />
            </div>
          </motion.div>
        </section>

        <SectionDivider className="mt-14 mb-12" />

        <section className="grid gap-6 lg:grid-cols-2">
          {service.intro.map((paragraph, index) => (
            <motion.div
              key={paragraph}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport.item}
              transition={{ duration: duration.std, delay: index * 0.08, ease: ease.out }}
              className="rounded-[2.3rem] border border-primary/8 bg-white/76 p-7 backdrop-blur-xl md:p-8"
            >
              <p className="text-lg leading-relaxed text-primary/70">{paragraph}</p>
            </motion.div>
          ))}
        </section>

        <SectionDivider className="mt-14 mb-12" />

        <section className="grid gap-6 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)]">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.26em] text-primary/60">
              Come lavoriamo
            </p>
            <h2 className="max-w-md text-4xl font-semibold leading-[0.98] tracking-[-0.05em] text-primary md:text-5xl">
              Un percorso costruito con passaggi leggibili.
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {service.approach.map((item, index) => {
              const ItemIcon = item.icon;
              return (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewport.item}
                  transition={{ duration: duration.std, delay: index * 0.08, ease: ease.out }}
                  className="rounded-[2rem] border border-primary/8 bg-white/78 p-6 backdrop-blur-xl"
                >
                  <ItemIcon className="h-5 w-5 text-accent" />
                  <h3 className="mt-5 text-2xl font-semibold tracking-[-0.04em] text-primary">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-primary/72">{item.body}</p>
                </motion.article>
              );
            })}
          </div>
        </section>

        <SectionDivider className="mt-14 mb-12" />

        <section>
          <div className="mb-8">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.26em] text-primary/60">
              Quando può essere utile
            </p>
            <h2 className="max-w-3xl text-4xl font-semibold leading-[0.98] tracking-[-0.05em] text-primary md:text-5xl">
              Alcuni casi in cui questo percorso può fare la differenza.
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {service.cases.map((item, index) => {
              const CaseIcon = item.icon;
              return (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewport.item}
                  transition={{ duration: duration.std, delay: index * 0.08, ease: ease.out }}
                  className="rounded-[2rem] border border-primary/8 bg-[#f7f1e6] p-6"
                >
                  <CaseIcon className="h-5 w-5 text-accent" />
                  <h3 className="mt-5 text-2xl font-semibold tracking-[-0.04em] text-primary">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-primary/72">{item.body}</p>
                </motion.article>
              );
            })}
          </div>
        </section>

        <SectionDivider className="mt-14 mb-12" />

        <section>
          <div className="mb-8">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.26em] text-primary/60">
              Professioniste
            </p>
            <h2 className="max-w-3xl text-4xl font-semibold leading-[0.98] tracking-[-0.05em] text-primary md:text-5xl">
              Le persone che possono accompagnarti in questo percorso.
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {service.specialists.map((specialist, index) => (
              <motion.article
                key={specialist.name}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewport.item}
                transition={{ duration: duration.std, delay: index * 0.08, ease: ease.out }}
                className="overflow-hidden rounded-[2.5rem] border border-primary/8 bg-white/80 shadow-[0_24px_70px_-42px_rgba(31,42,36,0.18)] backdrop-blur-xl"
              >
                <div className="grid gap-0 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
                  <div className="bg-[#eadfce]">
                    <img
                      src={specialist.image}
                      alt=""
                      role="presentation"
                      width={800}
                      height={900}
                      loading="lazy"
                      decoding="async"
                      className="aspect-[4/4.5] h-full w-full object-cover"
                    />
                  </div>
                  <div className="p-7 md:p-8">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary/58">
                      {specialist.role}
                    </p>
                    <h3 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-primary">
                      {specialist.name}
                    </h3>
                    <p className="mt-4 text-base leading-relaxed text-primary/72">
                      {specialist.description}
                    </p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <SectionDivider className="mt-14 mb-12" />

        <section className="grid gap-10 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)]">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.26em] text-primary/60">
              Domande frequenti
            </p>
            <h2 className="max-w-md text-4xl font-semibold leading-[0.98] tracking-[-0.05em] text-primary md:text-5xl">
              Le risposte che servono prima di iniziare.
            </h2>
          </div>
          <FAQAccordion faqs={service.faqs} />
        </section>

        <SectionDivider className="mt-14 mb-12" />

        <section className="overflow-hidden rounded-[3rem] bg-primary px-8 py-12 text-background md:px-12 md:py-14">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.26em] text-background/46">
                Inizia il percorso
              </p>
              <h2 className="max-w-xl text-3xl font-semibold leading-tight tracking-[-0.05em] md:text-4xl">
                Hai ancora dubbi? Parliamone �?" la prima valutazione è gratuita.
              </h2>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row md:flex-col lg:flex-row">
              <MagneticButton
                to="/contatti"
                className="bg-background px-7 py-4 text-base font-semibold text-primary"
              >
                Prenota ora
              </MagneticButton>
              <a
                href={`https://wa.me/393396508642?text=${encodeURIComponent('Ciao Studio Fisyo! Vorrei avere informazioni su ' + service.title + '.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/8 px-7 py-4 text-base font-medium text-background backdrop-blur-md transition-colors hover:bg-white/16"
              >
                Chiedi su WhatsApp
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
