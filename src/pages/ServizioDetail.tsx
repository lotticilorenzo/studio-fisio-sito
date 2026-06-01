import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeftIcon, ChevronDownIcon } from '@radix-ui/react-icons';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowUpRight, MapPin, Sparkles } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';
import { waUrl } from '../config/constants';
import { services, servicesById } from '../data/services';
import { MagneticButton } from '../components/MagneticButton';
import { SectionDivider } from '../components/SectionDivider';
import { ease, duration, viewport } from '../lib/motion';

const accordionTransition = {
  duration: 0.26,
  ease: ease.out,
};

const editorialNotes: Record<
  string,
  {
    lead: string;
    promise: string;
    closing: string;
  }
> = {
  fisioterapia: {
    lead:
      'Quando il dolore cambia il modo in cui ti muovi, serve un percorso che rimetta insieme sintomo, gesto e recupero.',
    promise:
      'Il nostro obiettivo non è solo abbassare il dolore: è restituirti margine, fiducia e continuità nei gesti quotidiani.',
    closing:
      'Se vuoi capire se è il percorso giusto, iniziamo da una valutazione chiara.',
  },
  'pilates-clinico': {
    lead: 'Quando il corpo chiede precisione, non intensità.',
    promise:
      'Respirazione, controllo e progressione diventano un lavoro guidato, serio e sostenibile.',
    closing:
      'Ti aiutiamo a capire se partire da una valutazione individuale o da un piccolo gruppo.',
  },
  'salute-donna': {
    lead:
      'Uno spazio delicato non significa vago: significa competente, rispettoso e molto chiaro.',
    promise:
      'Qui il percorso segue i tuoi tempi, protegge il tuo agio e mette ordine in temi che spesso restano in sospeso.',
    closing:
      'Il primo incontro serve prima di tutto a farti sentire al sicuro nel percorso.',
  },
  linfodrenaggio: {
    lead: 'Quando i tessuti chiedono leggerezza, il gesto deve essere preciso.',
    promise:
      'Lavoriamo con tecnica, ritmo corretto e grande attenzione alla fase in cui si trova il corpo.',
    closing:
      'Se vuoi capire se il linfodrenaggio può esserti utile, il primo confronto ci aiuta a leggere bene la situazione.',
  },
  psicologia: {
    lead:
      'A volte il benessere cambia quando qualcuno ti aiuta a mettere a fuoco quello che oggi pesa di più.',
    promise:
      'Lo spazio psicologico qui non è separato dalla vita reale: serve a dare ordine, respiro e possibilità di movimento.',
    closing:
      'Se senti che è il momento di parlarne, possiamo iniziare con un primo confronto chiaro.',
  },
  fisio4young: {
    lead:
      'Seguire il corpo mentre cresce significa intervenire con attenzione, senza aspettare che il fastidio diventi un limite.',
    promise:
      'Con bambini e ragazzi il rigore clinico conta, ma conta anche il modo in cui si entra in relazione.',
    closing:
      'La prima valutazione serve a capire cosa osservare davvero e come accompagnare il percorso.',
  },
  nutrizione: {
    lead:
      'Mangiare meglio non vuol dire vivere in controllo: vuol dire trovare un equilibrio che regga nella vita vera.',
    promise:
      'Il percorso nutrizionale qui resta concreto, sostenibile e coerente con gli altri obiettivi di salute.',
    closing:
      'Possiamo partire da un confronto semplice per capire quale direzione ha più senso.',
  },
};

const defaultEditorialNote = {
  lead:
    'Ogni servizio dello studio nasce per aiutarti a capire meglio il problema e costruire un percorso coerente.',
  promise:
    'Il lavoro qui deve essere leggibile, concreto e abbastanza umano da farti sentire seguito davvero.',
  closing:
    'Se vuoi capire da dove partire, la prima valutazione serve proprio a questo.',
};

const FAQAccordion = ({
  faqs,
}: {
  faqs: { question: string; answer: string }[];
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="flex flex-col gap-3">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;

        return (
          <div
            key={faq.question}
            className={`overflow-hidden rounded-card-sm border backdrop-blur-xl transition-colors ${
              isOpen
                ? 'border-accent/20 bg-warm-100'
                : 'border-primary/8 bg-white/80'
            }`}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-5 px-6 py-5 text-left md:px-7"
            >
              <span className="text-base font-medium leading-snug text-primary md:text-lg">
                {faq.question}
              </span>
              <ChevronDownIcon
                aria-hidden="true"
                className={`h-5 w-5 shrink-0 text-accent transition-transform ${
                  isOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={accordionTransition}
                  className="overflow-hidden"
                >
                  <p className="border-t border-primary/6 px-6 pb-6 pt-4 text-base leading-relaxed text-ink-soft md:px-7">
                    {faq.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
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
  const notes = editorialNotes[service.id] ?? defaultEditorialNote;
  const whatsappHref = waUrl(`Ciao Studio Fisyo! Vorrei avere informazioni su ${service.title}.`);
  const ctaImage = service.specialists[0]?.image ?? service.image;
  const relatedServices = services.filter((item) => item.id !== service.id).slice(0, 3);

  return (
    <div className="relative isolate overflow-hidden px-6 pb-24 pt-32 lg:px-12">
      <div className="page-aura" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl 2xl:max-w-[1600px]">
        <Link
          to="/servizi"
          className="inline-flex items-center gap-2 py-1.5 text-sm font-medium text-ink-soft transition-colors hover:text-primary"
        >
          <ArrowLeftIcon className="h-4 w-4" aria-hidden="true" />
          Torna a tutti i servizi
        </Link>

        <section className="mt-8 overflow-hidden rounded-card-xl border border-primary/8 bg-white/78 shadow-card-xl backdrop-blur-xl">
          <div className="grid gap-0 lg:grid-cols-[minmax(0,0.84fr)_minmax(0,1.16fr)]">
            <div className="px-7 py-8 md:px-10 md:py-10 lg:px-12 lg:py-14">
              <div className="inline-flex items-center gap-3 rounded-full border border-primary/8 bg-white/74 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-ink-muted">
                <Icon className="h-4 w-4 text-accent" />
                {service.label}
              </div>

              <p className="mt-7 max-w-lg text-sm font-medium uppercase tracking-[0.24em] text-ink-muted">
                {notes.lead}
              </p>

              <h1 className="mt-5 max-w-3xl text-h1 font-semibold text-primary">
                {service.title}
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft md:text-xl">
                {service.subtitle}
              </p>

              <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-soft md:text-lg">
                {service.summary}
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <MagneticButton
                  to={`/contatti?service=${service.id}`}
                  className="bg-primary px-7 py-4 text-base font-semibold text-background shadow-card-sm"
                >
                  Prenota una valutazione
                </MagneticButton>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-primary/10 bg-white/72 px-7 py-4 text-base font-medium text-primary backdrop-blur-md transition-colors hover:bg-white"
                >
                  Chiedi informazioni
                </a>
              </div>

              <div className="mt-10 grid gap-4 border-t border-primary/10 pt-6 md:grid-cols-3">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-muted">
                    Dove
                  </p>
                  <p className="mt-3 text-lg font-semibold tracking-[-0.04em] text-primary">
                    Felino, Parma
                  </p>
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-muted">
                    Ingresso
                  </p>
                  <p className="mt-3 text-lg font-semibold tracking-[-0.04em] text-primary">
                    Prima valutazione gratuita
                  </p>
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-muted">
                    Focus
                  </p>
                  <p className="mt-3 text-lg font-semibold tracking-[-0.04em] text-primary">
                    {service.highlights[0]}
                  </p>
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: duration.enter, ease: ease.out }}
              className="relative min-h-[420px] bg-warm-300 lg:min-h-full"
            >
              <img
                src={service.image}
                alt={service.imageAlt}
                width={1100}
                height={1200}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/58 via-primary/10 to-white/10" />

              <div className="absolute left-5 right-5 top-5 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/14 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-background backdrop-blur-md">
                  <Sparkles className="h-3.5 w-3.5 text-accent" />
                  Percorso su misura
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/18 bg-primary/34 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-background backdrop-blur-md">
                  <MapPin className="h-3.5 w-3.5" />
                  Studio Fisyo
                </span>
              </div>

              <div className="absolute inset-x-5 bottom-5 rounded-card-md border border-white/18 bg-primary/72 p-6 text-background shadow-card-md backdrop-blur-xl md:p-7">
                <p className="text-[11px] uppercase tracking-[0.24em] text-background/70">
                  Cosa vogliamo ottenere
                </p>
                <p className="mt-3 max-w-xl text-xl font-semibold leading-snug tracking-[-0.03em] md:text-2xl">
                  {notes.promise}
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        <SectionDivider className="mb-12 mt-14" />

        <section className="grid gap-8 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport.section}
            transition={{ duration: duration.slow, ease: ease.out }}
            className="lg:sticky lg:top-28"
          >
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.26em] text-ink-muted">
              Il senso del percorso
            </p>
            <h2 className="max-w-md text-h2 font-semibold text-primary">
              Un lavoro che mette ordine,
              <span className="font-drama italic font-normal text-accent">
                {' '}non passaggi casuali.
              </span>
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-ink-soft md:text-lg">
              {notes.promise} Ogni scelta deve essere leggibile, spiegata e abbastanza concreta
              da accompagnarti anche fuori dallo studio.
            </p>
          </motion.div>

          <div className="grid gap-6">
            <div className="grid gap-6 md:grid-cols-2">
              {service.intro.map((paragraph, index) => (
                <motion.article
                  key={paragraph}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewport.item}
                  transition={{ duration: duration.std, delay: index * 0.08, ease: ease.out }}
                  className="rounded-card-md border border-primary/8 bg-white/80 p-7 shadow-card-sm backdrop-blur-xl md:p-8"
                >
                  <p className="text-lg leading-relaxed text-ink-soft">{paragraph}</p>
                </motion.article>
              ))}
            </div>

            <motion.article
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport.section}
              transition={{ duration: duration.slow, delay: 0.08, ease: ease.out }}
              className="rounded-card-lg border border-primary/8 bg-warm-100 p-7 md:p-8"
            >
              <div className="grid gap-6 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:items-start">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-ink-muted">
                    Cosa troverai
                  </p>
                  <h3 className="mt-4 text-h3 font-semibold text-primary">
                    Un percorso chiaro, con obiettivi reali e margine per adattarsi al tuo caso.
                  </h3>
                </div>

                <div className="grid gap-3">
                  {service.highlights.map((highlight, index) => (
                    <div
                      key={highlight}
                      className="flex items-start gap-4 rounded-card-sm border border-primary/8 bg-white/70 px-5 py-4"
                    >
                      <span className="mt-0.5 text-sm font-semibold tracking-[0.18em] text-accent">
                        0{index + 1}
                      </span>
                      <p className="text-base leading-relaxed text-ink-soft">{highlight}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.article>
          </div>
        </section>

        <SectionDivider className="mb-12 mt-14" />

        <section className="relative overflow-hidden rounded-card-xl bg-primary px-8 py-12 text-background md:px-10 md:py-14">
          <div className="absolute inset-0">
            <img
              src={service.image}
              alt=""
              role="presentation"
              className="h-full w-full object-cover opacity-[0.1]"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/96 via-primary/92 to-[#161f1a]/96" />
          </div>

          <div className="relative grid gap-10 lg:grid-cols-[minmax(0,0.76fr)_minmax(0,1.24fr)] lg:items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport.section}
              transition={{ duration: duration.slow, ease: ease.out }}
              className="lg:sticky lg:top-28"
            >
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.26em] text-background/70">
                Come lavoriamo
              </p>
              <h2 className="max-w-md text-h2 font-semibold">
                Passaggi semplici da leggere, seri da portare avanti.
              </h2>
              <p className="mt-5 max-w-md text-base leading-relaxed text-background/68 md:text-lg">
                Vogliamo che il percorso sia chiaro da capire, coerente da seguire e abbastanza
                preciso da farti sentire il lavoro anche nel tempo.
              </p>
            </motion.div>

            <div className="grid gap-4">
              {service.approach.map((item, index) => {
                const ItemIcon = item.icon;

                return (
                  <motion.article
                    key={item.title}
                    initial={{ opacity: 0, y: 22 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={viewport.item}
                    transition={{ duration: duration.std, delay: index * 0.08, ease: ease.out }}
                    className="rounded-card-md border border-white/10 bg-white/6 p-6 backdrop-blur-md md:p-7"
                  >
                    <div className="grid gap-5 md:grid-cols-[auto_1fr] md:items-start">
                      <div className="flex items-center gap-4">
                        <span className="text-sm font-semibold tracking-[0.24em] text-accent">
                          0{index + 1}
                        </span>
                        <ItemIcon className="h-5 w-5 text-accent" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-semibold tracking-[-0.04em]">
                          {item.title}
                        </h3>
                        <p className="mt-3 max-w-2xl text-base leading-relaxed text-background/70">
                          {item.body}
                        </p>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        <SectionDivider className="mb-12 mt-14" />

        <section className="grid gap-6 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:items-start">
          <motion.article
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport.section}
            transition={{ duration: duration.slow, ease: ease.out }}
            className="rounded-card-lg border border-primary/8 bg-warm-100 p-8 md:p-10"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-ink-muted">
              Quando può essere utile
            </p>
            <h2 className="mt-5 max-w-lg text-h2 font-semibold text-primary">
              Capire il momento giusto fa già parte della cura.
            </h2>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-ink-soft md:text-lg">
              Non tutte le situazioni hanno bisogno della stessa intensità o dello stesso ritmo.
              Questa pagina serve anche a capire se il tuo caso può trovare qui una direzione
              sensata e concreta.
            </p>
          </motion.article>

          <div className="grid gap-4">
            {service.cases.map((item, index) => {
              const CaseIcon = item.icon;

              return (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewport.item}
                  transition={{ duration: duration.std, delay: index * 0.08, ease: ease.out }}
                  className="rounded-card-md border border-primary/8 bg-white/80 p-6 shadow-card-sm backdrop-blur-xl md:p-7"
                >
                  <div className="flex items-start gap-5">
                    <span className="mt-1 text-sm font-semibold tracking-[0.22em] text-accent">
                      0{index + 1}
                    </span>
                    <div>
                      <CaseIcon className="h-5 w-5 text-accent" />
                      <h3 className="mt-4 text-h3 font-semibold text-primary">
                        {item.title}
                      </h3>
                      <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink-soft">
                        {item.body}
                      </p>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </section>

        <SectionDivider className="mb-12 mt-14" />

        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport.section}
            transition={{ duration: duration.slow, ease: ease.out }}
            className="mb-10 grid gap-6 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:items-end"
          >
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.26em] text-ink-muted">
                Professioniste
              </p>
              <h2 className="max-w-3xl text-h2 font-semibold text-primary">
                Le persone che possono accompagnarti in questo percorso.
              </h2>
            </div>
            <Link
              to="/chi-siamo"
              className="inline-flex items-center gap-2 py-1 text-base font-medium text-ink-soft transition-colors hover:text-primary"
            >
              Conosci tutto il team
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </motion.div>

          <div className="grid gap-6 lg:grid-cols-2">
            {service.specialists.map((specialist, index) => {
              const isLead = service.specialists.length > 1 && index === 0;

              return (
                <motion.article
                  key={specialist.name}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewport.item}
                  transition={{ duration: duration.std, delay: index * 0.08, ease: ease.out }}
                  className={`group overflow-hidden rounded-card-lg border border-primary/8 bg-white/80 shadow-card-md backdrop-blur-xl ${
                    isLead ? 'lg:col-span-2' : ''
                  }`}
                >
                  <div
                    className={`grid gap-0 ${
                      isLead
                        ? 'lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]'
                        : 'md:grid-cols-[minmax(0,0.84fr)_minmax(0,1.16fr)]'
                    }`}
                  >
                    <div className="overflow-hidden bg-warm-300">
                      <img
                        src={specialist.image}
                        alt={`Ritratto di ${specialist.name}.`}
                        width={900}
                        height={1000}
                        loading="lazy"
                        decoding="async"
                        className={`h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.03] ${
                          isLead ? 'aspect-[16/11]' : 'aspect-[4/4.5]'
                        }`}
                      />
                    </div>
                    <div className="flex flex-col justify-center p-7 md:p-8 lg:p-10">
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-ink-muted">
                        {specialist.role}
                      </p>
                      <h3 className="mt-3 text-h3 font-semibold text-primary">
                        {specialist.name}
                      </h3>
                      <p className="mt-5 text-base leading-relaxed text-ink-soft md:text-lg">
                        {specialist.description}
                      </p>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </section>

        <SectionDivider className="mb-12 mt-14" />

        <section className="grid gap-10 lg:grid-cols-[minmax(0,0.74fr)_minmax(0,1.26fr)] lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport.section}
            transition={{ duration: duration.slow, ease: ease.out }}
          >
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.26em] text-ink-muted">
              Domande frequenti
            </p>
            <h2 className="max-w-md text-h2 font-semibold text-primary">
              Le risposte che servono prima di iniziare.
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-ink-soft md:text-lg">
              Se qualcosa resta poco chiaro, qui trovi le informazioni che aiutano a capire
              meglio come funziona il percorso.
            </p>
          </motion.div>
          <FAQAccordion faqs={service.faqs} />
        </section>

        <SectionDivider className="mb-12 mt-14" />

        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport.section}
            transition={{ duration: duration.slow, ease: ease.out }}
            className="mb-10 grid gap-6 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:items-end"
          >
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.26em] text-ink-muted">
                Altri percorsi utili
              </p>
              <h2 className="max-w-3xl text-h2 font-semibold text-primary">
                Se il tuo bisogno è vicino a questo, potresti voler guardare anche qui.
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-relaxed text-ink-soft md:text-lg">
              A volte la strada migliore nasce dal confronto tra percorsi diversi dello studio.
              Questa sezione serve proprio a rendere più leggibile il quadro complessivo.
            </p>
          </motion.div>

          <div className="grid gap-6 lg:grid-cols-3">
            {relatedServices.map((item, index) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewport.item}
                transition={{ duration: duration.std, delay: index * 0.08, ease: ease.out }}
                className="group overflow-hidden rounded-card-lg border border-primary/8 bg-white/80 shadow-card-md backdrop-blur-xl"
              >
                <Link to={`/servizi/${item.id}`} className="block">
                  <div className="overflow-hidden bg-warm-300">
                    <img
                      src={item.image}
                      alt={item.imageAlt}
                      width={900}
                      height={760}
                      loading="lazy"
                      decoding="async"
                      className="aspect-[16/11] w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="p-6 md:p-7">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-ink-muted">
                      {item.label}
                    </p>
                    <h3 className="mt-3 text-h3 font-semibold text-primary">
                      {item.title}
                    </h3>
                    <p className="mt-4 text-base leading-relaxed text-ink-soft">
                      {item.summary}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors group-hover:text-accent">
                      Scopri il percorso
                      <ArrowUpRight className="h-4 w-4 text-accent" />
                    </span>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </section>

        <SectionDivider className="mb-12 mt-14" />

        <section className="relative overflow-hidden rounded-card-xl bg-primary px-8 py-12 text-background md:px-10 md:py-14">
          <div className="absolute inset-0">
            <img
              src={ctaImage}
              alt=""
              role="presentation"
              className="h-full w-full object-cover opacity-[0.12]"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/94 via-primary/90 to-[#141d18]/96" />
          </div>

          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.26em] text-background/70">
                Inizia il percorso
              </p>
              <h2 className="text-3xl font-semibold leading-tight tracking-[-0.05em] md:text-4xl">
                Vuoi capire se questo è il percorso giusto per te?
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-background/68 md:text-lg">
                {notes.closing}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <MagneticButton
                to={`/contatti?service=${service.id}`}
                className="bg-background px-7 py-4 text-base font-semibold text-primary"
              >
                Prenota ora
              </MagneticButton>
              <a
                href={whatsappHref}
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
