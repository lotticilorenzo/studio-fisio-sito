import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, ChevronDown, MapPin } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';
import { waUrl } from '../config/constants';
import { services, servicesById, type ServiceFAQ } from '../data/services';
import { RevealPanel } from '../components/RevealPanel';
import { RevealMedia } from '../components/RevealMedia';
import { MaskReveal } from '../components/MaskReveal';
import { reveal, ease, duration } from '../lib/motion';

type ServiceItem = (typeof services)[number];
type ApproachItem = ServiceItem['approach'][number];

type EditorialNote = {
  lead: string;
  promise: string;
  closing: string;
};

const editorialNotes: Record<string, EditorialNote> = {
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

const defaultEditorialNote: EditorialNote = {
  lead:
    'Ogni servizio dello studio nasce per aiutarti a capire meglio il problema e costruire un percorso coerente.',
  promise:
    'Il lavoro qui deve essere leggibile, concreto e abbastanza umano da farti sentire seguito davvero.',
  closing:
    'Se vuoi capire da dove partire, la prima valutazione serve proprio a questo.',
};

/**
 * Decorative giant section index that drifts on scroll (parallax depth).
 * aria-hidden + faint texture; transform-only and static under reduced motion.
 * Ref sits on the (untransformed) anchor so scroll measurement never feeds back.
 */
// (Decorative giant section-index watermark removed: faint low-contrast text
// cannot meet WCAG AA contrast, so it's dropped to keep 0 violations.)

/** One approach step. The mono index drifts (parallax); body text stays fully opaque (contrast safe). */
const ApproachStep = ({
  item,
  index,
  reduced,
}: {
  item: ApproachItem;
  index: number;
  reduced: boolean | null;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const numberY = useTransform(scrollYProgress, [0, 1], [42, -42]);
  const ItemIcon = item.icon;

  return (
    <motion.article
      ref={ref}
      {...reveal(index * 0.06)}
      className="grid gap-6 border-t border-white/12 py-10 first:border-0 first:pt-0 md:grid-cols-[auto_1fr] md:gap-12"
    >
      <motion.span
        aria-hidden="true"
        style={reduced ? undefined : { y: numberY }}
        className="font-mono text-4xl leading-none text-accent md:text-5xl"
      >
        0{index + 1}
      </motion.span>
      <div>
        <div className="flex items-center gap-3">
          <ItemIcon className="h-5 w-5 text-accent" aria-hidden="true" />
          <h3 className="text-h3 font-semibold">{item.title}</h3>
        </div>
        <p className="mt-4 max-w-2xl text-body-lg leading-relaxed text-on-dark/80">
          {item.body}
        </p>
      </div>
    </motion.article>
  );
};

/** Related-service card: entrance reveal (outer) + continuous scroll parallax depth (inner) + hover lift. */
const RelatedCard = ({
  item,
  index,
  reduced,
}: {
  item: ServiceItem;
  index: number;
  reduced: boolean | null;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const depth = index % 2 === 1 ? 32 : 16;
  const y = useTransform(scrollYProgress, [0, 1], [depth, -depth]);

  return (
    <motion.div ref={ref} {...reveal(index * 0.06)}>
      <motion.div style={reduced ? undefined : { y }}>
        <Link
          to={`/servizi/${item.id}`}
          className="group block overflow-hidden rounded-card-lg border border-line bg-bone-2 transition-transform duration-500 ease-out hover:-translate-y-1.5"
        >
          <RevealMedia
            src={item.image}
            alt={item.imageAlt}
            index={index}
            className="aspect-[16/11] w-full"
          />
          <div className="p-7 md:p-8">
            <p className="text-eyebrow font-medium uppercase text-ink-muted">{item.label}</p>
            <h3 className="mt-3 text-h3 font-semibold text-ink">{item.title}</h3>
            <p className="mt-4 text-body leading-relaxed text-ink-soft">{item.summary}</p>
            <span className="mt-6 inline-flex items-center gap-2 text-body-sm font-semibold text-ink transition-colors group-hover:text-accent">
              Scopri il percorso
              <ArrowUpRight className="h-4 w-4 text-accent" />
            </span>
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
};

const FAQAccordion = ({ faqs }: { faqs: ServiceFAQ[] }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="flex flex-col gap-3">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        const buttonId = `faq-trigger-${index}`;
        const panelId = `faq-panel-${index}`;

        return (
          <div
            key={faq.question}
            className={`overflow-hidden rounded-card-sm border transition-colors ${
              isOpen ? 'border-accent/30 bg-bone-2' : 'border-line bg-bone-2/60'
            }`}
          >
            <h3 className="m-0">
              <button
                id={buttonId}
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="flex w-full items-center justify-between gap-5 px-6 py-5 text-left md:px-7"
              >
                <span className="text-body-lg font-medium leading-snug text-ink">
                  {faq.question}
                </span>
                <ChevronDown
                  aria-hidden="true"
                  className={`h-5 w-5 shrink-0 text-accent transition-transform duration-300 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.26, ease: ease.out }}
                  className="overflow-hidden"
                >
                  <p className="border-t border-line px-6 pb-6 pt-4 text-body leading-relaxed text-ink-soft md:px-7">
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

  const reduced = useReducedMotion();

  // Hero image parallax — drift + subtle scale as the hero scrolls away.
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroImgY = useTransform(heroScroll, [0, 1], ['0%', '-10%']);
  const heroImgScale = useTransform(heroScroll, [0, 1], [1, 1.06]);

  // Approach (dark) signature beat — watermark index drifts across the pinned section.

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
  const relatedServices = services.filter((item) => item.id !== service.id).slice(0, 3);

  return (
    <div className="flex flex-col">
      {/* ============================= HERO ============================= */}
      <section className="pb-[clamp(64px,9vw,120px)] pt-[calc(var(--nav-h,74px)+2.25rem)]">
        <div className="cine-container">
          <Link
            to="/servizi"
            className="group inline-flex items-center gap-2 text-body-sm font-medium text-ink-soft transition-colors hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4 text-accent transition-transform duration-300 group-hover:-translate-x-1" aria-hidden="true" />
            Tutti i percorsi
          </Link>

          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] lg:items-stretch lg:gap-16">
            {/* --- Left: editorial copy --- */}
            <div className="flex flex-col justify-center">
              <motion.span
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: duration.std, ease: ease.out }}
                className="inline-flex w-fit items-center gap-2.5 rounded-full border border-line bg-bone-2 px-4 py-2 text-eyebrow font-medium uppercase text-ink-muted"
              >
                <Icon className="h-4 w-4 text-accent" aria-hidden="true" />
                {service.label}
              </motion.span>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: duration.enter, delay: 0.08, ease: ease.out }}
                className="mt-8 max-w-lg text-body-sm font-medium uppercase tracking-[0.2em] text-ink-muted"
              >
                {notes.lead}
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: duration.enter, delay: 0.16, ease: ease.out }}
                className="mt-5 max-w-2xl text-h1 font-semibold text-ink [overflow-wrap:break-word]"
              >
                {service.title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: duration.enter, delay: 0.26, ease: ease.out }}
                className="mt-6 max-w-xl text-body-lg leading-relaxed text-ink-soft md:text-xl"
              >
                {service.subtitle}
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: duration.enter, delay: 0.34, ease: ease.out }}
                className="mt-5 max-w-xl text-body-lg leading-relaxed text-ink-soft"
              >
                {service.summary}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: duration.enter, delay: 0.42, ease: ease.out }}
                className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
              >
                <Link to={`/contatti?service=${service.id}`} className="btn">
                  Prenota una valutazione
                  <ArrowUpRight className="arr h-4 w-4" />
                </Link>
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="btn ghost">
                  Chiedi su WhatsApp
                </a>
              </motion.div>

              <motion.dl
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: duration.enter, delay: 0.52, ease: ease.out }}
                className="mt-10 grid gap-6 border-t border-line pt-7 sm:grid-cols-3"
              >
                <div>
                  <dt className="flex items-center gap-1.5 text-eyebrow font-medium uppercase text-ink-muted">
                    <MapPin className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                    Dove
                  </dt>
                  <dd className="mt-2.5 text-body font-semibold text-ink">Felino, Parma</dd>
                </div>
                <div>
                  <dt className="text-eyebrow font-medium uppercase text-ink-muted">Ingresso</dt>
                  <dd className="mt-2.5 text-body font-semibold text-ink">Prima valutazione gratuita</dd>
                </div>
                <div>
                  <dt className="text-eyebrow font-medium uppercase text-ink-muted">Focus</dt>
                  <dd className="mt-2.5 text-body font-semibold text-ink">{service.highlights[0]}</dd>
                </div>
              </motion.dl>
            </div>

            {/* --- Right: Sipario image (scroll parallax) + promise caption --- */}
            <div className="relative">
              <div
                ref={heroRef}
                className="relative h-full min-h-[440px] overflow-hidden rounded-card-lg"
              >
                <motion.div
                  className="h-full w-full"
                  style={reduced ? undefined : { y: heroImgY, scale: heroImgScale }}
                >
                  <RevealPanel
                    src={service.image}
                    alt={service.imageAlt}
                    panel="bone"
                    priority
                    className="h-[112%] w-full"
                  />
                </motion.div>
              </div>
              <div className="absolute inset-x-4 bottom-4 rounded-card-md border border-white/10 bg-dark p-6 text-on-dark shadow-card-lg md:inset-x-6 md:bottom-6 md:p-7">
                <p className="text-eyebrow font-medium uppercase text-accent">La promessa</p>
                <p className="mt-3 max-w-md text-body-lg font-medium leading-snug md:text-xl">
                  {notes.promise}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================= INTRO ============================= */}
      <section className="relative overflow-hidden py-[clamp(72px,11vw,150px)]">
        <div className="relative cine-container">

          <div className="mb-14 max-w-3xl">
            <motion.p {...reveal()} className="kicker mb-6">Il percorso</motion.p>
            <h2 className="text-h2 font-semibold text-ink">
              <MaskReveal>
                Cosa significa
                <span className="font-drama font-normal italic text-accent"> iniziare da qui.</span>
              </MaskReveal>
            </h2>
          </div>

          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-20">
            <div className="grid gap-8 self-start sm:grid-cols-2">
              {service.intro.map((paragraph, index) => (
                <motion.p
                  key={paragraph}
                  {...reveal(index * 0.08)}
                  className="text-body-lg leading-relaxed text-ink-soft"
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>

            <motion.div
              {...reveal(0.1)}
              className="rounded-card-lg border border-line bg-bone-2 p-8 md:p-10"
            >
              <p className="kicker mb-6">Cosa troverai</p>
              <ul className="flex flex-col gap-5">
                {service.highlights.map((highlight, index) => (
                  <li key={highlight} className="flex items-baseline gap-4 border-t border-line pt-5 first:border-0 first:pt-0">
                    <span className="font-mono text-body-sm tracking-[0.18em] text-accent">
                      0{index + 1}
                    </span>
                    <span className="text-body-lg leading-snug text-ink">{highlight}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================= APPROACH (DARK) — signature pinned beat ============================= */}
      <section className="bg-dark py-[clamp(72px,11vw,150px)] text-on-dark">
        <div className="cine-container">
          <div className="lg:grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
            {/* Left: sticky heading + drifting watermark index (lg+ pin; static stacked below) */}
            <div className="mb-14 overflow-hidden lg:mb-0 lg:sticky lg:top-[clamp(100px,15vh,180px)] lg:self-start">
              <motion.p {...reveal()} className="kicker mb-6 !text-accent">Come lavoriamo</motion.p>
              <h2 className="text-h2 font-semibold">
                <MaskReveal>
                  Un metodo leggibile,
                  <span className="font-drama font-normal italic text-accent"> serio da portare avanti.</span>
                </MaskReveal>
              </h2>
            </div>

            {/* Right: steps scroll past the pin, each with a drifting index */}
            <div className="flex flex-col">
              {service.approach.map((item, index) => (
                <ApproachStep key={item.title} item={item} index={index} reduced={reduced} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================= CASES ============================= */}
      <section className="relative overflow-hidden py-[clamp(72px,11vw,150px)]">
        <div className="relative cine-container">

          <div className="mb-14 max-w-3xl">
            <motion.p {...reveal()} className="kicker mb-6">Quando può essere utile</motion.p>
            <h2 className="text-h2 font-semibold text-ink">
              <MaskReveal>
                Capire il momento giusto
                <span className="font-drama font-normal italic text-accent"> fa già parte della cura.</span>
              </MaskReveal>
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {service.cases.map((item, index) => {
              const CaseIcon = item.icon;
              return (
                <motion.article
                  key={item.title}
                  {...reveal(index * 0.06)}
                  className="flex flex-col rounded-card-lg border border-line bg-bone-2 p-8 md:p-9"
                >
                  <CaseIcon className="h-6 w-6 text-accent" aria-hidden="true" />
                  <h3 className="mt-6 text-h3 font-semibold text-ink">{item.title}</h3>
                  <p className="mt-3 text-body leading-relaxed text-ink-soft">{item.body}</p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================= SPECIALISTS ============================= */}
      <section className="py-[clamp(72px,11vw,150px)]">
        <div className="cine-container">
          <div className="mb-14 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <motion.p {...reveal()} className="kicker mb-6">Chi ti segue</motion.p>
              <h2 className="text-h2 font-semibold text-ink">
                <MaskReveal>
                  Le persone che accompagnano
                  <span className="font-drama font-normal italic text-accent"> questo percorso.</span>
                </MaskReveal>
              </h2>
            </div>
            <motion.div {...reveal(0.1)}>
              <Link
                to="/chi-siamo"
                className="inline-flex items-center gap-2 text-body-sm font-semibold text-ink transition-colors hover:text-accent"
              >
                Conosci tutto il team
                <ArrowUpRight className="h-4 w-4 text-accent" />
              </Link>
            </motion.div>
          </div>

          <div className={`grid gap-6 ${service.specialists.length > 1 ? 'lg:grid-cols-2' : ''}`}>
            {service.specialists.map((specialist, index) => (
              <motion.article
                key={specialist.name}
                {...reveal(index * 0.08)}
                className="grid overflow-hidden rounded-card-lg border border-line bg-bone-2 sm:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]"
              >
                <RevealMedia
                  src={specialist.image}
                  alt={`Ritratto di ${specialist.name}.`}
                  index={index}
                  className="aspect-[4/5] w-full sm:aspect-auto sm:h-full sm:min-h-[340px]"
                />
                <div className="flex flex-col justify-center p-8 md:p-10">
                  <p className="text-eyebrow font-medium uppercase text-ink-muted">
                    {specialist.role}
                  </p>
                  <h3 className="mt-3 font-drama text-[clamp(1.9rem,3vw,2.6rem)] leading-[1.05] text-ink">
                    {specialist.name}
                  </h3>
                  <p className="mt-5 text-body-lg leading-relaxed text-ink-soft">
                    {specialist.description}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ============================= FAQ ============================= */}
      <section className="py-[clamp(72px,11vw,150px)]">
        <div className="cine-container">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <motion.p {...reveal()} className="kicker mb-6">Domande frequenti</motion.p>
              <h2 className="text-h2 font-semibold text-ink">
                <MaskReveal>
                  Le risposte che servono
                  <span className="font-drama font-normal italic text-accent"> prima di iniziare.</span>
                </MaskReveal>
              </h2>
            </div>
            <motion.div {...reveal(0.08)}>
              <FAQAccordion faqs={service.faqs} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================= RELATED ============================= */}
      <section className="relative overflow-hidden pb-[clamp(72px,11vw,150px)]">
        <div className="relative cine-container">

          <div className="mb-14 max-w-3xl">
            <motion.p {...reveal()} className="kicker mb-6">Altri percorsi</motion.p>
            <h2 className="text-h2 font-semibold text-ink">
              <MaskReveal>
                Se il tuo bisogno è vicino,
                <span className="font-drama font-normal italic text-accent"> guarda anche qui.</span>
              </MaskReveal>
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {relatedServices.map((item, index) => (
              <RelatedCard key={item.id} item={item} index={index} reduced={reduced} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
