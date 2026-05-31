import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  MapPin,
  PhoneCall,
} from 'lucide-react';
import { MagneticButton } from '../components/MagneticButton';
import { Testimonials } from '../components/Testimonials';
import { FAQ } from '../components/FAQ';
import { homepageFaqs } from '../data/homepageFaqs';
import { useSEO } from '../hooks/useSEO';
import { services } from '../data/services';
import { ease, duration, reveal, revealHeading } from '../lib/motion';
import { STUDIO } from '../config/constants';

const signatureDetails = [
  {
    title: 'Uno studio che si parla davvero',
    text: 'Quando un caso ha bisogno di più competenze, qui il percorso non si spezza. Resta leggibile e resta tuo.',
    image: '/images/real/fototeamstudiofisyo.webp',
    imageAlt: 'Il team dello Studio Fisyo riunito in studio.',
  },
  {
    title: 'Prima visita come momento di orientamento',
    text: 'Ascolto clinico, valutazione e un primo ragionamento serio su cosa fare davvero: niente percorsi preconfezionati.',
    image: '/images/real/accoglienza.webp',
    imageAlt: 'Un momento di accoglienza e confronto allo Studio Fisyo.',
  },
  {
    title: 'Atmosfera calda, lavoro molto preciso',
    text: 'L’ambiente non deve intimidire. Deve farti sentire accolto mentre succede un lavoro clinico rigoroso.',
    image: '/images/real/internistudiofisyo_reception.webp',
    imageAlt: 'La reception e gli spazi interni dello Studio Fisyo.',
  },
];

const featuredServices = services.filter(({ id }) =>
  ['fisioterapia', 'pilates-clinico', 'salute-donna', 'nutrizione'].includes(id),
);

const featuredServiceClasses = [
  'lg:col-span-7 lg:row-span-2',
  'lg:col-span-5',
  'lg:col-span-5',
  'lg:col-span-7',
];

const visitSteps = [
  {
    step: '01',
    title: 'Capire bene il punto di partenza',
    text: 'La prima visita serve a leggere il problema e a capire cosa merita davvero attenzione adesso.',
    image: '/images/real/accoglienza.webp',
    imageAlt: 'Un momento di valutazione clinica allo Studio Fisyo.',
  },
  {
    step: '02',
    title: 'Costruire un percorso che abbia senso',
    text: 'Se serve, il lavoro si apre alle altre professioniste dello studio senza diventare confuso o dispersivo.',
    image: '/images/real/fototeamstudiofisyo.webp',
    imageAlt: 'Le professioniste dello Studio Fisyo al lavoro insieme.',
  },
  {
    step: '03',
    title: 'Farti stare meglio anche fuori dallo studio',
    text: 'Trattamento, movimento e indicazioni pratiche devono aiutarti a tornare alla tua vita, non solo a stare bene per un’ora.',
    image: '/images/real/fisioterapia_studio_fisyo.webp',
    imageAlt: 'Una seduta di fisioterapia nello Studio Fisyo.',
  },
];

export const Home = () => {
  useSEO({
    title: 'Fisioterapia a Felino | Studio Fisyo',
    description:
      'Studio Fisyo a Felino offre percorsi di Fisioterapia, Pilates Clinico, Salute della Donna e Nutrizione. Prenota la tua valutazione.',
    image: 'https://www.studiofisyo.com/images/real/internistudiofisyo2.webp',
    url: 'https://www.studiofisyo.com/',
    schema: [
      {
        '@type': 'WebPage',
        name: 'Fisioterapia a Felino | Studio Fisyo',
        description:
          'Studio Fisyo a Felino offre percorsi di Fisioterapia, Pilates Clinico, Salute della Donna e Nutrizione. Prenota la tua valutazione.',
        url: 'https://www.studiofisyo.com/',
      },
      {
        '@type': 'FAQPage',
        mainEntity: homepageFaqs.map((faq) => ({
          '@type': 'Question',
          name: faq.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.a,
          },
        })),
      },
    ],
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col">
      <section className="relative isolate overflow-hidden px-6 pb-20 pt-28 sm:pt-32 lg:px-12 lg:pb-28 lg:pt-36">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(217,164,59,0.14),transparent_26%),radial-gradient(circle_at_86%_20%,rgba(36,52,44,0.1),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.6),rgba(255,255,255,0))]" />
          <div className="absolute left-[10%] top-[10%] h-48 w-48 rounded-full bg-accent/14 blur-[120px]" />
          <div className="absolute bottom-[12%] right-[8%] h-72 w-72 rounded-full bg-primary/10 blur-[140px]" />
        </div>

        <div className="relative mx-auto grid max-w-7xl gap-12 lg:min-h-[calc(100svh-9rem)] lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:grid-rows-[1fr] lg:items-center">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: duration.std, ease: ease.out }}
              className="flex flex-wrap items-center gap-3"
            >
              <span className="inline-flex max-w-full flex-wrap items-center justify-center gap-x-2.5 gap-y-1 rounded-[1.4rem] border border-accent/20 bg-accent/8 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-accent/90 sm:rounded-full sm:text-[11px] sm:tracking-[0.22em]">
                <MapPin className="h-3.5 w-3.5 shrink-0" />
                Felino, Parma
                <span className="h-1 w-1 rounded-full bg-accent/50" />
                Prima valutazione gratuita
              </span>
            </motion.div>

            <h1 className="mt-8 text-[clamp(2.55rem,9vw,5.9rem)] font-semibold leading-[0.95] tracking-[-0.055em] text-primary sm:leading-[0.92] sm:tracking-[-0.07em]">
              <motion.span
                className="block"
                initial={{ opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: duration.enter, delay: 0.12, ease: ease.out }}
              >
                Fisioterapia e salute integrata,
              </motion.span>
              <motion.span
                className="mt-3 block font-drama text-[0.9em] font-normal italic text-accent"
                initial={{ opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: duration.enter, delay: 0.22, ease: ease.out }}
              >
curiamo il percorso, non solo il sintomo.
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: duration.enter, delay: 0.40, ease: ease.out }}
              className="mt-7 max-w-xl text-lg leading-relaxed text-ink-soft md:text-xl"
            >
              Studio Fisyo nasce per chi non cerca una seduta qualsiasi, ma un posto in cui
              ascolto clinico, trattamento, movimento e confronto tra professioniste stiano
              dentro la stessa idea di cura.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: duration.enter, delay: 0.48, ease: ease.out }}
              className="mt-10 flex flex-col gap-4 sm:flex-row"
            >
              <MagneticButton
                to="/contatti"
                className="bg-primary px-7 py-4 text-base font-semibold text-background shadow-card-sm"
              >
                Prenota una valutazione
              </MagneticButton>
              <Link
                to="/servizi"
                className="inline-flex items-center justify-center rounded-full border border-primary/10 bg-white/72 px-7 py-4 text-base font-medium text-primary backdrop-blur-md transition-colors hover:bg-white"
              >
                Guarda i percorsi
              </Link>
            </motion.div>

            <div className="mt-10 grid gap-4 border-t border-primary/10 pt-6 sm:grid-cols-2">
              {/* Card 1 — Counter recensioni */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: duration.enter, delay: 0.44, ease: ease.out }}
                className="rounded-card-md border border-primary/8 bg-warm-50 p-5 shadow-card-sm"
              >
                <p className="text-eyebrow font-semibold uppercase text-ink-muted">
                  Recensioni
                </p>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="font-drama text-5xl font-normal italic leading-none text-primary">47</span>
                  <span className="text-2xl text-accent">★</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">su Google</p>
              </motion.div>

              {/* Card 2 — Live status */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: duration.enter, delay: 0.50, ease: ease.out }}
                className="rounded-card-md border border-primary/8 bg-warm-50 p-5 shadow-card-sm"
              >
                <p className="text-eyebrow font-semibold uppercase text-ink-muted">
                  Risposta
                </p>
                <div className="mt-3 flex items-center gap-3">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
                  <span className="font-drama text-2xl font-normal italic text-primary">Attivo ora</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">Rispondiamo entro 24 h feriali</p>
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.35, ease: ease.out }}
            className="grid gap-4 lg:h-full lg:grid-cols-[minmax(0,0.35fr)_minmax(0,0.65fr)] lg:self-stretch"
          >
            <div className="order-2 grid gap-4 lg:order-1 lg:h-full lg:grid-rows-[1fr_auto]">
              <div className="overflow-hidden rounded-card-md border border-primary/8 bg-white/72 p-3 shadow-card-md backdrop-blur-xl lg:h-full">
                <div className="overflow-hidden rounded-card-sm bg-warm-300 lg:h-full">
                  <img
                    src="/images/real/fototeamstudiofisyo.webp"
                    alt="Il team dello Studio Fisyo riunito in studio."
                    width={700}
                    height={900}
                    loading="eager"
                    decoding="async"
                    className="aspect-[4/5] w-full object-cover object-top lg:aspect-auto lg:h-full"
                  />
                </div>
              </div>

              <div className="rounded-card-md border border-primary/8 bg-primary p-6 text-background shadow-card-md">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-background/70">
                  Dentro lo studio
                </p>
                <p className="mt-4 text-xl font-semibold leading-snug tracking-[-0.04em]">
                  Non una somma di stanze, ma un posto in cui i percorsi si parlano.
                </p>
              </div>
            </div>

            <div className="order-1 overflow-hidden rounded-card-lg border border-white/60 bg-white/60 p-3 shadow-card-xl backdrop-blur-xl lg:order-2 lg:h-full">
              <div className="relative h-full min-h-[24rem] overflow-hidden rounded-card-md bg-warm-300">
                <img
                  src="/images/real/fisioterapia_studio_fisyo.webp"
                  alt="Una seduta di fisioterapia nello Studio Fisyo."
                  width={900}
                  height={1125}
                  fetchPriority="high"
                  loading="eager"
                  decoding="async"
                  className="aspect-[4/5] h-full w-full object-cover object-center lg:aspect-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/18 via-transparent to-transparent" />
              </div>
            </div>
          </motion.div>
        </div>

      </section>

      <section className="px-6 py-24 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <motion.div
            {...revealHeading()}
            className="mb-14 grid gap-8 lg:grid-cols-[minmax(0,0.98fr)_minmax(0,1.02fr)] lg:items-end"
          >
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.26em] text-ink-muted">
                Firma dello studio
              </p>
              <h2 className="max-w-3xl text-h2 font-semibold text-primary">
                Lo facciamo sentire subito:
                <span className="font-drama italic font-normal text-accent">
                  {' '}qui c’è più precisione, ma anche più presenza.
                </span>
              </h2>
            </div>
            <p className="max-w-xl text-lg leading-relaxed text-ink-soft">
              La parte estetica conta se rende più credibile quello che succede dentro il
              percorso. Per questo la bellezza qui non copre il lavoro: lo introduce meglio.
            </p>
          </motion.div>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-stretch">
            <motion.article
              initial={{ opacity: 0, y: 32, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.9, ease: ease.out, delay: 0.04 }}
              className="group overflow-hidden rounded-card-xl border border-primary/8 bg-warm-200 shadow-card-lg"
            >
              <div className="overflow-hidden">
                <img
                  src={signatureDetails[0].image}
                  alt={signatureDetails[0].imageAlt}
                  width={900}
                  height={1125}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.03]"
                />
              </div>
              <div className="p-8 md:p-10">
                <h3 className="text-h3 font-semibold text-primary">
                  {signatureDetails[0].title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-ink-soft">
                  {signatureDetails[0].text}
                </p>
              </div>
            </motion.article>

            <motion.article
              {...reveal(0.12)}
              className="flex flex-col justify-between rounded-card-xl border border-primary/8 bg-warm-50 p-8 shadow-card-md md:p-10 lg:p-12"
            >
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-ink-muted">Prima visita</p>
                <h3 className="mt-4 text-h3 font-semibold text-primary">
                  {signatureDetails[1].title}
                </h3>
                <p className="mt-5 text-base leading-relaxed text-ink-soft md:text-lg">
                  {signatureDetails[1].text}
                </p>
              </div>
              <div className="mt-10 overflow-hidden rounded-card-md bg-warm-200">
                <img
                  src={signatureDetails[1].image}
                  alt={signatureDetails[1].imageAlt}
                  width={900}
                  height={760}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[16/10] w-full object-cover"
                />
              </div>
            </motion.article>
          </div>
        </div>
      </section>

      <section className="px-6 py-24 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <motion.div
            {...revealHeading()}
            className="mb-14 grid gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-end"
          >
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.26em] text-ink-muted">
                Percorsi
              </p>
              <h2 className="max-w-3xl text-h2 font-semibold text-primary">
                Servizi diversi,
                <span className="font-drama italic font-normal text-accent">
                  {' '}uno stesso standard di attenzione.
                </span>
              </h2>
            </div>
            <p className="max-w-xl text-lg leading-relaxed text-ink-soft">
              Non volevamo un catalogo lungo e impersonale. Volevamo che ogni area dello studio
              mantenesse la stessa sensazione: chiarezza, profondità e un orientamento molto umano.
            </p>
          </motion.div>

          <div className="grid gap-6 lg:grid-cols-12 lg:grid-rows-[repeat(2,minmax(0,1fr))]">
            {featuredServices.map((service, index) => (
              <motion.article
                key={service.id}
                {...(index === 0
                  ? {
                      initial: { opacity: 0, y: 32, scale: 0.97 },
                      whileInView: { opacity: 1, y: 0, scale: 1 },
                      viewport: { once: true, margin: '-80px' },
                      transition: { duration: 0.9, ease: ease.out, delay: 0.04 },
                    }
                  : reveal(index * 0.06))}
                whileHover={{ y: -4 }}
                className={`group relative overflow-hidden rounded-card-lg border border-primary/8 bg-white/75 shadow-card-md backdrop-blur-xl ${featuredServiceClasses[index]}`}
              >
                <div className="absolute inset-0">
                  <img
                    src={service.image}
                    alt={service.imageAlt}
                    width={900}
                    height={1125}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-400 ease-out group-hover:scale-[1.06]"
                  />
                  <div
                    className={`absolute inset-0 ${
                      index === 0 || index === 3
                        ? 'bg-gradient-to-br from-primary/86 via-primary/62 to-primary/32'
                        : 'bg-gradient-to-br from-primary/52 via-primary/18 to-transparent'
                    }`}
                  />
                </div>

                <div
                  className={`relative flex h-full flex-col justify-between gap-8 p-7 md:p-8 lg:p-10 ${
                    index === 0 || index === 3 ? 'text-background' : 'text-primary'
                  }`}
                >
                  <div className="max-w-lg">
                    <p
                      className={`text-xs font-semibold uppercase tracking-[0.24em] ${
                        index === 0 || index === 3 ? 'text-background/55' : 'text-ink-muted'
                      }`}
                    >
                      {service.label}
                    </p>
                    <h3 className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.04em] md:text-4xl">
                      {service.title}
                    </h3>
                    <p
                      className={`mt-4 text-base leading-relaxed ${
                        index === 0 || index === 3 ? 'text-background/72' : 'text-ink-soft'
                      }`}
                    >
                      {service.summary}
                    </p>
                  </div>

                  <div className="flex flex-col gap-5">
                    <div className="flex flex-wrap gap-2">
                      {service.highlights.slice(0, 3).map((highlight) => (
                        <span
                          key={highlight}
                          className={`rounded-full border px-3.5 py-1.5 text-sm backdrop-blur-sm ${
                            index === 0 || index === 3
                              ? 'border-white/14 bg-white/6 text-background/72'
                              : 'border-primary/10 bg-white/68 text-ink-soft'
                          }`}
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>

                    <Link
                      to={`/servizi/${service.id}`}
                      className={`inline-flex items-center gap-3 py-1 text-sm font-semibold transition-colors ${
                        index === 0 || index === 3
                          ? 'text-background hover:text-accent'
                          : 'text-primary hover:text-accent'
                      }`}
                    >
                      Approfondisci il percorso
                      <ArrowUpRight className="h-4 w-4 text-accent" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <motion.div
            {...revealHeading()}
            className="grid gap-8 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:items-end"
          >
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-ink-muted">
                Il percorso in pratica
              </p>
              <h2 className="max-w-3xl text-h2 font-semibold text-primary">
                Prima capiamo bene.
                <span className="font-drama italic font-normal text-accent">
                  {' '}Poi scegliamo cosa vale la pena fare davvero.
                </span>
              </h2>
            </div>
            <p className="max-w-2xl text-lg leading-relaxed text-ink-soft">
              Il valore di Studio Fisyo non è fare più cose. È tenere insieme le cose giuste,
              nel momento giusto, con un ritmo che la persona riesce a sentire come sostenibile.
            </p>
          </motion.div>

          <div className="mt-16 flex flex-col gap-16 md:gap-20">
            {visitSteps.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.article
                  key={step.step}
                  {...reveal(index * 0.08)}
                  className={`grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center ${
                    !isEven
                      ? 'lg:[&>div:first-child]:order-2 lg:[&>div:last-child]:order-1'
                      : ''
                  }`}
                >
                  <div className="overflow-hidden rounded-card-lg border border-primary/8 bg-warm-200 shadow-card-md">
                    <img
                      src={step.image}
                      alt={step.imageAlt}
                      width={900}
                      height={720}
                      loading="lazy"
                      decoding="async"
                      className="aspect-[4/3] w-full object-cover"
                    />
                  </div>
                  <div className="px-1 lg:px-8">
                    <p className="text-sm font-semibold tracking-[0.24em] text-accent">{step.step}</p>
                    <h3 className="mt-5 text-2xl font-semibold leading-tight tracking-[-0.04em] text-primary md:text-3xl lg:text-4xl">
                      {step.title}
                    </h3>
                    <p className="mt-4 text-base leading-relaxed text-ink-soft md:text-lg">
                      {step.text}
                    </p>
                  </div>
                </motion.article>
              );
            })}
          </div>

          <motion.div
            {...reveal(0.18)}
            className="mt-12 flex flex-col gap-4 sm:flex-row sm:flex-wrap"
          >
            <MagneticButton
              to="/contatti"
              className="bg-accent px-8 py-4 text-base font-semibold text-primary shadow-[0_18px_40px_-30px_rgba(217,164,59,0.55)]"
            >
              Prenota la prima visita
            </MagneticButton>
            <a
              href={`tel:${STUDIO.phoneRaw}`}
              className="inline-flex items-center justify-center gap-3 rounded-full border border-primary/12 bg-white/80 px-8 py-4 text-base font-medium text-primary transition-colors hover:bg-white"
            >
              <PhoneCall className="h-4 w-4 text-accent" />
              {STUDIO.phone}
            </a>
            <a
              href={STUDIO.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 rounded-full border border-primary/12 bg-white/80 px-8 py-4 text-base font-medium text-primary transition-colors hover:bg-white"
            >
              <MapPin className="h-4 w-4 text-accent" />
              Via Aldo Moro 1/A, Felino
            </a>
          </motion.div>
        </div>
      </section>

      <Testimonials />
      <FAQ />
    </div>
  );
};
