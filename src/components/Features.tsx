import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
};

export const Features = () => {
  return (
    <section className="relative px-6 py-24 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <motion.div
          {...fadeUp}
          className="mb-14 grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-end"
        >
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.26em] text-primary/48">
              Perche sceglierci
            </p>
            <h2 className="max-w-3xl text-4xl font-semibold leading-[0.98] tracking-[-0.05em] text-primary md:text-6xl">
              Tre motivi per cui qui il percorso
              <span className="font-drama italic font-normal text-accent"> si sente diverso.</span>
            </h2>
          </div>
          <p className="max-w-xl text-lg leading-relaxed text-primary/68">
            Non stiamo aggiungendo servizi uno accanto all altro. Stiamo costruendo
            un modo di lavorare in cui ogni parte dello studio ha un ruolo chiaro.
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-12 lg:grid-rows-[minmax(0,1fr)_minmax(0,1fr)]">
          <motion.article
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.06 }}
            className="group relative overflow-hidden rounded-[2.7rem] border border-primary/8 bg-primary text-background lg:col-span-7 lg:row-span-2"
          >
            <div className="absolute inset-0">
              <img
                src="/images/real/fototeamstudiofisyo.webp"
                alt="Il team dello Studio Fisyo."
                className="h-full w-full object-cover object-center opacity-34 transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-primary/92 via-primary/82 to-[#162019]/94" />
            </div>

            <div className="relative flex h-full flex-col justify-between p-8 md:p-10 lg:p-12">
              <div className="max-w-md">
                <p className="text-xs uppercase tracking-[0.24em] text-background/45">
                  Primo pilastro
                </p>
                <h3 className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.04em] md:text-5xl">
                  Un solo studio, piu competenze che si parlano davvero.
                </h3>
                <p className="mt-5 text-base leading-relaxed text-background/72 md:text-lg">
                  Quando serve, il percorso non resta chiuso in una stanza. Le
                  professioniste si confrontano e il lavoro rimane coerente.
                </p>
              </div>

              <div className="mt-10 flex flex-wrap gap-3 text-sm text-background/72">
                {['Fisioterapia', 'Pilates clinico', 'Salute della donna', 'Nutrizione', 'Psicologia'].map(
                  (item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/12 bg-white/6 px-4 py-2 backdrop-blur-sm"
                    >
                      {item}
                    </span>
                  ),
                )}
              </div>
            </div>
          </motion.article>

          <motion.article
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.14 }}
            className="rounded-[2.4rem] border border-primary/10 bg-white/82 p-8 shadow-[0_24px_70px_-42px_rgba(31,42,36,0.25)] backdrop-blur-xl lg:col-span-5"
          >
            <p className="text-xs uppercase tracking-[0.24em] text-primary/42">Secondo pilastro</p>
            <h3 className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-primary md:text-3xl">
              Ogni percorso parte da una domanda semplice.
            </h3>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-primary/68">
              Di cosa hai bisogno oggi e che cosa vuoi tornare a fare senza paura,
              senza compensi e senza rinunce inutili.
            </p>

            <div className="mt-8 space-y-4">
              {[
                ['Valutazione iniziale', 'Si parte da ascolto, storia clinica e obiettivi concreti.'],
                ['Scelte leggibili', 'Ti spieghiamo cosa facciamo, perche lo facciamo e come si prosegue.'],
                ['Passi sostenibili', 'Non carichiamo il percorso di cose che non servono.'],
              ].map(([title, text], index) => (
                <div key={title} className="flex items-start gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/12 text-sm font-semibold text-accent">
                    0{index + 1}
                  </span>
                  <div>
                    <p className="font-medium text-primary">{title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-primary/60">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.article>

          <motion.article
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.2 }}
            className="relative overflow-hidden rounded-[2.4rem] border border-accent/12 bg-[#efe7d8] p-8 lg:col-span-5"
          >
            <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-white/40 to-transparent" />
            <p className="relative z-10 text-xs uppercase tracking-[0.24em] text-primary/42">Terzo pilastro</p>
            <h3 className="relative z-10 mt-4 max-w-sm text-2xl font-semibold tracking-[-0.04em] text-primary md:text-3xl">
              Trattamento e lavoro attivo devono stare insieme.
            </h3>
            <p className="relative z-10 mt-4 max-w-md text-base leading-relaxed text-primary/68">
              Per questo i percorsi non si fermano al lettino. Quando serve, il corpo
              va accompagnato a ritrovare fiducia nel movimento.
            </p>

            <div className="relative z-10 mt-8 space-y-4">
              {[78, 58, 88].map((width, index) => (
                <div key={width} className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.22em] text-primary/42">
                    <span>{['Controllo', 'Mobilita', 'Continuita'][index]}</span>
                    <span>{width}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/70">
                    <motion.div
                      initial={{ width: '24%' }}
                      whileInView={{ width: `${width}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.15 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                      className="h-full rounded-full bg-primary"
                    />
                  </div>
                </div>
              ))}
            </div>

            <Link
              to="/servizi/pilates-clinico"
              className="relative z-10 mt-8 inline-flex items-center gap-3 text-sm font-semibold text-primary transition-colors hover:text-accent"
            >
              Scopri il Pilates Clinico
              <span className="text-accent">→</span>
            </Link>
          </motion.article>
        </div>
      </div>
    </section>
  );
};
