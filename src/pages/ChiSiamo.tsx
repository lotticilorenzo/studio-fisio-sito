import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Building2, HeartPulse, Sparkles, Users } from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { SectionDivider } from '../components/SectionDivider';
import { InteractiveSurface } from '../components/InteractiveSurface';
import { useSEO } from '../hooks/useSEO';
import { ease, duration, viewport } from '../lib/motion';

const studioNotes = [
  {
    icon: Users,
    title: '6 professioniste, un solo tono di lavoro',
    text: 'Competenze diverse che non si presentano come reparti separati, ma come un dialogo continuo.',
  },
  {
    icon: HeartPulse,
    title: 'Percorsi più leggibili per chi entra in studio',
    text: 'Ascolto, valutazione, trattamento e movimento devono restare dentro la stessa idea di cura.',
  },
  {
    icon: Building2,
    title: 'Uno spazio pensato per non farti sentire di passaggio',
    text: "L'ambiente è parte dell'esperienza: caldo, ordinato, chiaro, mai freddo o impersonale.",
  },
] as const;

const principles = [
  {
    step: '01',
    title: 'Ascolto',
    text: 'Ogni percorso inizia da una valutazione attenta e da una conversazione vera, senza fretta e senza formule.',
  },
  {
    step: '02',
    title: 'Confronto',
    text: 'Le professioniste dello studio si parlano, così il lavoro resta coerente quando il caso ha bisogno di più sguardi.',
  },
  {
    step: '03',
    title: 'Continuità',
    text: 'Trattamento, movimento e indicazioni pratiche devono aiutarti anche fuori dallo studio, non solo durante la seduta.',
  },
] as const;

const team = [
  {
    name: 'Beatrice Grassi',
    role: 'Fisioterapista',
    desc: 'Segue percorsi di riabilitazione con attenzione al movimento, alla progressione degli esercizi e al rapporto con la persona.',
    image: '/images/real/beatricegrassi.webp',
  },
  {
    name: 'Elisa Caggiati',
    role: 'Fisioterapista',
    desc: 'Lavora su dolore, recupero ortopedico e terapia manuale con un approccio preciso, concreto e adattato al caso.',
    image: '/images/real/elisacaggiati.webp',
  },
  {
    name: 'Valentina Mazza',
    role: 'Psicologa clinica',
    desc: 'Accoglie le persone con uno sguardo attento e costruisce percorsi che aiutano a mettere a fuoco ciò che oggi pesa di più.',
    image: '/images/real/staff-valentina-mazza-fisioterapista-studio-fisyo.webp',
  },
  {
    name: 'Valentina Corradi',
    role: 'Fisioterapista',
    desc: 'Segue il Pilates Clinico con grande cura del dettaglio, qualità del gesto e sicurezza del percorso.',
    image: '/images/real/staff-valentina-corradi-pilates-clinico-studio-fisyo.webp',
  },
  {
    name: 'Elisa Zanacca',
    role: 'Ostetrica',
    desc: 'Accompagna le donne in un percorso riservato e rispettoso, dal pavimento pelvico alla fase del post-parto.',
    image: '/images/real/fotoostetrica.webp',
  },
  {
    name: 'Elisa Cardinali',
    role: 'Biologa nutrizionista',
    desc: 'Costruisce percorsi alimentari chiari e sostenibili, sempre calibrati sulla vita concreta della persona.',
    image: '/images/real/elisa-cardinali-nutrizionista-e1766323699892.webp',
  },
] as const;

export const ChiSiamo = () => {
  useSEO({
    title: 'Chi siamo | Studio Fisyo - Fisioterapia a Felino',
    description:
      'Scopri il team di Studio Fisyo a Felino. Fisioterapia, ostetricia, nutrizione e psicologia in un unico spazio di lavoro.',
    image: 'https://www.studiofisyo.com/images/real/fototeamstudiofisyo.webp',
    url: 'https://www.studiofisyo.com/chi-siamo',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: 'Chi siamo - Team Studio Fisyo',
      description: 'Il team multidisciplinare di Studio Fisyo a Felino.',
      url: 'https://www.studiofisyo.com/chi-siamo',
      mainEntity: {
        '@type': 'MedicalClinic',
        name: 'Studio Fisyo',
        url: 'https://www.studiofisyo.com',
        employee: team.map((member) => ({
          '@type': 'Person',
          name: member.name,
          jobTitle: member.role,
        })),
      },
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative isolate overflow-hidden px-6 pb-24 pt-32 lg:px-12">
      <div className="page-aura" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl">
        <PageHero
          label="Chi siamo"
          badge="Team integrato"
          title="Uno studio nato per lavorare bene insieme."
          subtitle="Siamo un team di professioniste con competenze diverse. La cosa che ci unisce non è una formula, ma un modo di lavorare: ascoltare, confrontarci e costruire un percorso coerente per ogni persona."
          image="/images/real/fototeamstudiofisyo.webp"
          imageAlt="Il team dello Studio Fisyo."
          captionEyebrow="Il team"
          captionText="Sei professioniste che si confrontano davvero, non una somma di trattamenti scollegati."
        />

        <SectionDivider className="mb-14 mt-16" />

        <section className="grid gap-10 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport.section}
            transition={{ duration: duration.slow, ease: ease.out }}
            className="lg:sticky lg:top-28"
          >
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.26em] text-primary/60">
              Dentro Studio Fisyo
            </p>
            <h2 className="max-w-lg text-4xl font-semibold leading-[0.98] tracking-[-0.05em] text-primary md:text-5xl">
              Più continuità, più confronto,
              <span className="font-drama italic font-normal text-accent"> meno frammentazione.</span>
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-primary/68 md:text-lg">
              Lo studio nasce dal desiderio di offrire a Felino un posto in cui le persone possano
              sentirsi seguite con più continuità. A volte serve un trattamento, a volte un lavoro
              sul movimento, a volte uno sguardo più ampio. Per questo le competenze convivono e si parlano.
            </p>

            <div className="mt-8 grid gap-4">
              {studioNotes.map((note, index) => {
                const Icon = note.icon;

                return (
                  <motion.article
                    key={note.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={viewport.item}
                    transition={{ duration: duration.std, delay: 0.06 + index * 0.06, ease: ease.out }}
                    className="rounded-card-md"
                  >
                    <InteractiveSurface className="rounded-card-md border border-primary/8 bg-white/78 p-6 shadow-card-md backdrop-blur-xl">
                      <Icon className="h-5 w-5 text-accent" />
                      <h3 className="mt-4 text-xl font-semibold tracking-[-0.04em] text-primary">
                        {note.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-primary/66 md:text-base">
                        {note.text}
                      </p>
                    </InteractiveSurface>
                  </motion.article>
                );
              })}
            </div>
          </motion.div>

          <div className="grid gap-6">
            <motion.article
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport.section}
              transition={{ duration: duration.slow, ease: ease.out }}
              className="rounded-card-lg"
            >
              <InteractiveSurface className="overflow-hidden rounded-card-lg border border-primary/8 bg-white/78 p-3 shadow-card-lg backdrop-blur-xl">
                <div className="relative overflow-hidden rounded-card-md bg-warm-300">
                  <img
                    src="/images/real/internistudiofisyo_reception.webp"
                    alt="La reception e gli spazi interni dello Studio Fisyo."
                    width={1200}
                    height={850}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[16/10] w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/34 via-transparent to-transparent" />
                  <div className="absolute inset-x-5 bottom-5 rounded-card-sm border border-white/20 bg-primary/72 px-5 py-4 text-background backdrop-blur-xl">
                    <p className="text-[11px] uppercase tracking-[0.24em] text-background/50">
                      Atmosfera dello studio
                    </p>
                    <p className="mt-2 text-base leading-snug">
                      Non inseguiamo effetti speciali. Cerchiamo chiarezza, attenzione e un luogo
                      che faccia sentire le persone davvero accolte.
                    </p>
                  </div>
                </div>
              </InteractiveSurface>
            </motion.article>

            <div className="grid gap-6 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
              <motion.article
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewport.item}
                transition={{ duration: duration.std, delay: 0.06, ease: ease.out }}
                className="rounded-card-md"
              >
                <InteractiveSurface className="overflow-hidden rounded-card-md border border-primary/8 bg-warm-200">
                  <img
                    src="/images/real/esternistudiofisyo.webp"
                    alt="L'esterno dello Studio Fisyo a Felino."
                    width={900}
                    height={1000}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[4/4.7] w-full object-cover"
                  />
                </InteractiveSurface>
              </motion.article>

              <motion.article
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewport.item}
                transition={{ duration: duration.std, delay: 0.12, ease: ease.out }}
                className="rounded-card-md"
              >
                <InteractiveSurface className="rounded-card-md border border-primary/8 bg-primary p-7 text-background shadow-card-md md:p-8">
                  <Sparkles className="h-5 w-5 text-accent" />
                  <h3 className="mt-5 text-2xl font-semibold tracking-[-0.04em]">
                    Un luogo che non mette distanza.
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-background/68">
                    Ci interessa che chi entra qui senta di poter capire cosa sta succedendo, a chi
                    affidarsi e come può iniziare il proprio percorso senza confusione.
                  </p>
                  <p className="mt-4 text-base leading-relaxed text-background/68">
                    La sensazione deve essere questa: c&apos;è competenza, ma c&apos;è anche presenza.
                  </p>
                </InteractiveSurface>
              </motion.article>
            </div>
          </div>
        </section>

        <SectionDivider className="mb-14 mt-16" />

        <section className="relative overflow-hidden rounded-card-xl bg-primary px-8 py-12 text-background md:px-10 md:py-14">
          <div className="absolute inset-0">
            <img
              src="/images/real/founderstudiofisyo.webp"
              alt=""
              role="presentation"
              className="h-full w-full object-cover opacity-[0.08]"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/96 via-primary/90 to-[#161f1a]/96" />
          </div>

          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport.section}
              transition={{ duration: duration.slow, ease: ease.out }}
              className="grid gap-8 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:items-end"
            >
              <div>
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.26em] text-background/42">
                  Il nostro modo di lavorare
                </p>
                <h2 className="max-w-lg text-4xl font-semibold leading-[0.98] tracking-[-0.05em] md:text-5xl">
                  Cura, confronto e continuità.
                </h2>
              </div>
              <p className="max-w-2xl text-base leading-relaxed text-background/68 md:text-lg">
                In studio ci interessa che il lavoro resti coerente dall&apos;inizio alla fine.
                La parte bella del percorso non è fare tante cose: è fare le cose giuste con un tono
                umano, leggibile e molto rigoroso.
              </p>
            </motion.div>

            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {principles.map((value, index) => (
                <motion.article
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewport.item}
                  transition={{ duration: duration.slow, delay: index * 0.06, ease: ease.out }}
                  className="rounded-card-md"
                >
                  <InteractiveSurface className="rounded-card-md border border-white/10 bg-white/6 p-6 backdrop-blur-md">
                    <p className="text-sm font-semibold tracking-[0.24em] text-accent">{value.step}</p>
                    <h3 className="mt-4 text-2xl font-semibold">{value.title}</h3>
                    <p className="mt-3 text-base leading-relaxed text-background/68">{value.text}</p>
                  </InteractiveSurface>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <SectionDivider className="mb-14 mt-16" />

        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport.section}
            transition={{ duration: duration.slow, ease: ease.out }}
            className="mb-12 max-w-3xl"
          >
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.26em] text-primary/60">
              Il team
            </p>
            <h2 className="text-4xl font-semibold leading-[0.98] tracking-[-0.05em] text-primary md:text-6xl">
              Le persone che rendono il lavoro dello studio riconoscibile.
            </h2>
          </motion.div>

          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport.section}
            transition={{ duration: duration.slow, ease: ease.out }}
            className="rounded-card-xl"
          >
            <InteractiveSurface className="overflow-hidden rounded-card-xl border border-primary/8 bg-white/78 p-3 shadow-card-lg backdrop-blur-xl">
              <div className="grid gap-0 lg:grid-cols-[minmax(0,1.06fr)_minmax(0,0.94fr)]">
                <div className="overflow-hidden rounded-card-md bg-warm-300">
                  <img
                    src="/images/real/fototeamstudiofisyo.webp"
                    alt="Il team completo dello Studio Fisyo."
                    width={1400}
                    height={1000}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center p-8 md:p-10">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary/58">
                    Team multidisciplinare
                  </p>
                  <h3 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-primary md:text-4xl">
                    Qui non trovi professioniste isolate.
                  </h3>
                  <p className="mt-5 text-base leading-relaxed text-primary/70 md:text-lg">
                    Trovi un gruppo di lavoro che ha scelto di condividere linguaggio, tono e responsabilità.
                    Per chi entra in studio questo fa una grande differenza: il percorso sembra più chiaro,
                    più stabile e meno frammentato.
                  </p>
                </div>
              </div>
            </InteractiveSurface>
          </motion.article>

          <div className="mt-6 grid gap-6 lg:grid-cols-12 lg:gap-8">

            {/* LEAD CARD — 7 colonne su lg */}
            <motion.article
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport.section}
              transition={{ duration: duration.slow, ease: ease.out }}
              className="group relative overflow-hidden rounded-card-xl border border-primary/8 bg-warm-50 shadow-card-lg lg:col-span-7"
            >
              <div className="grid h-full lg:grid-cols-[1.1fr_0.9fr] lg:grid-rows-1">
                {/* Foto verticale prominente */}
                <div className="relative aspect-[4/5] overflow-hidden lg:aspect-auto lg:h-full">
                  <img
                    src={team[0].image}
                    alt=""
                    role="presentation"
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-primary/40 to-transparent lg:hidden" />
                  <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/85 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-primary backdrop-blur-md">
                    <span className="h-1 w-1 rounded-full bg-accent" />
                    Founder
                  </div>
                </div>

                {/* Bio estesa */}
                <div className="flex flex-col justify-between gap-6 p-7 lg:p-9">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-accent">
                      {team[0].role}
                    </p>
                    <h3 className="mt-3 font-drama text-4xl font-normal italic leading-[0.98] tracking-[-0.02em] text-primary lg:text-5xl">
                      {team[0].name}
                    </h3>
                    <p className="mt-5 text-[15px] leading-relaxed text-primary/72">
                      {team[0].desc}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5" aria-hidden="true">
                    <span className="h-1 w-1 rounded-full bg-accent" />
                    <span className="h-1 w-1 rounded-full bg-accent/50" />
                    <span className="h-1 w-1 rounded-full bg-accent/25" />
                  </div>
                </div>
              </div>
            </motion.article>

            {/* SOTTO-GRIGLIA — 5 professioniste, 5 colonne su lg */}
            <div className="grid gap-4 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1 lg:gap-3">
              {team.slice(1).map((member, idx) => (
                <motion.article
                  key={member.name}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewport.item}
                  transition={{ duration: duration.std, ease: ease.out, delay: 0.05 * idx }}
                  className="group relative overflow-hidden rounded-card-md border border-primary/8 bg-warm-50 shadow-card-sm"
                >
                  <div className="grid grid-cols-[0.4fr_0.6fr] lg:grid-cols-[100px_1fr]">
                    <div className="relative aspect-square overflow-hidden lg:aspect-auto lg:h-full lg:min-h-[120px]">
                      <img
                        src={member.image}
                        alt=""
                        role="presentation"
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition-transform duration-[1s] ease-out group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-col justify-center gap-1 p-4 lg:p-5">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent/80">
                        {member.role}
                      </p>
                      <h4 className="text-lg font-semibold leading-tight tracking-[-0.01em] text-primary">
                        {member.name}
                      </h4>
                      <p className="mt-1 line-clamp-2 text-[13px] leading-relaxed text-primary/64">
                        {member.desc}
                      </p>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>

          </div>
        </section>
      </div>
    </div>
  );
};
