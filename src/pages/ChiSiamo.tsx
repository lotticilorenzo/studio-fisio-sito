import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { PageHero } from '../components/PageHero';
import { SectionDivider } from '../components/SectionDivider';
import { useSEO } from '../hooks/useSEO';
import { ease, duration, viewport } from '../lib/motion';

const values = [
  {
    title: 'Ascolto',
    text: 'Ogni percorso inizia da una valutazione attenta e da una conversazione vera.',
  },
  {
    title: 'Confronto',
    text: 'Le professioniste dello studio si parlano, così il lavoro resta coerente quando il caso lo richiede.',
  },
  {
    title: 'Continuità',
    text: 'Trattamento, movimento e indicazioni pratiche devono aiutarti anche fuori dallo studio.',
  },
];

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
];

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
          title="Uno studio nato per lavorare bene insieme."
          subtitle="Siamo un team di professioniste con competenze diverse. La cosa che ci unisce non è una formula, ma un modo di lavorare: ascoltare, confrontarci e costruire un percorso coerente per ogni persona."
          image="/images/real/fototeamstudiofisyo.webp"
          imageAlt="Il team dello Studio Fisyo."
        />

        <SectionDivider className="mt-16 mb-14" />

        {/* Story section */}
        <section className="grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport.section}
            transition={{ duration: duration.slow, ease: ease.out }}
          >
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.26em] text-primary/46">
              Dentro Studio Fisyo
            </p>
            <h2 className="text-4xl font-semibold leading-[0.98] tracking-[-0.05em] text-primary md:text-5xl">
              Un posto in cui le competenze si parlano davvero.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport.section}
            transition={{ duration: duration.slow, delay: 0.1, ease: ease.out }}
            className="rounded-[2.8rem] border border-primary/8 bg-white/78 p-8 shadow-[0_28px_80px_-46px_rgba(31,42,36,0.2)] backdrop-blur-xl md:p-10"
          >
            <p className="text-lg leading-relaxed text-primary/70">
              Lo studio nasce dal desiderio di offrire a Felino un posto in cui le
              persone possano sentirsi seguite con più continuità. A volte serve
              un trattamento, a volte un lavoro sul movimento, a volte uno sguardo
              più ampio. Per questo le competenze convivono e si parlano.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-primary/70">
              Non inseguiamo effetti speciali. Cerchiamo chiarezza, attenzione e
              un modo di lavorare che abbia senso per chi entra qui con un dubbio,
              un dolore o la voglia di ripartire meglio.
            </p>
          </motion.div>
        </section>

        <SectionDivider className="mt-16 mb-14" />

        {/* Values section */}
        <section className="overflow-hidden rounded-[3rem] bg-primary px-8 py-12 text-background md:px-10 md:py-14">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport.section}
              transition={{ duration: duration.slow, ease: ease.out }}
            >
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.26em] text-background/42">
                Il nostro modo di lavorare
              </p>
              <h2 className="max-w-md text-4xl font-semibold leading-[0.98] tracking-[-0.05em] md:text-5xl">
                Cura, confronto e continuità.
              </h2>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-3">
              {values.map((value, index) => (
                <motion.article
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewport.item}
                  transition={{ duration: duration.slow, delay: index * 0.06, ease: ease.out }}
                  className="rounded-[2rem] border border-white/10 bg-white/6 p-6 backdrop-blur-md"
                >
                  <p className="text-sm font-semibold tracking-[0.24em] text-accent">0{index + 1}</p>
                  <h3 className="mt-4 text-2xl font-semibold">{value.title}</h3>
                  <p className="mt-3 text-base leading-relaxed text-background/68">{value.text}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <SectionDivider className="mt-16 mb-14" />

        {/* Team section */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport.section}
            transition={{ duration: duration.slow, ease: ease.out }}
            className="mb-12 max-w-3xl"
          >
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.26em] text-primary/46">
              Il team
            </p>
            <h2 className="text-4xl font-semibold leading-[0.98] tracking-[-0.05em] text-primary md:text-6xl">
              Le persone che trovi in studio.
            </h2>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {team.map((member, index) => (
              <motion.article
                key={member.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewport.item}
                transition={{ duration: duration.slow, delay: index * 0.05, ease: ease.out }}
                className="group overflow-hidden rounded-[2.4rem] border border-primary/8 bg-white/80 shadow-[0_24px_70px_-42px_rgba(31,42,36,0.18)] backdrop-blur-xl"
              >
                <div className="relative aspect-[4/4.5] overflow-hidden bg-[#e9dfd0]">
                  <img
                    src={member.image}
                    alt={member.name}
                    width={800}
                    height={900}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/35 to-transparent" />
                </div>
                <div className="p-7 md:p-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary/42">
                    {member.role}
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-primary">
                    {member.name}
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-primary/66">{member.desc}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
