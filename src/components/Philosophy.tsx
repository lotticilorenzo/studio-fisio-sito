import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const values = [
  {
    title: 'Ascolto clinico',
    text: 'Prima di proporre una strada, ci prendiamo il tempo di capire il quadro e il momento che stai vivendo.',
  },
  {
    title: 'Confronto tra professioniste',
    text: 'Se il caso lo richiede, il percorso si apre al dialogo interno dello studio senza perdere chiarezza.',
  },
  {
    title: 'Obiettivi concreti',
    text: 'Meno enfasi e piu sostanza. Ci interessa cosa vuoi tornare a fare, non solo come ti senti sul momento.',
  },
];

export const Philosophy = () => {
  return (
    <section className="relative overflow-hidden bg-[#161f1a] px-6 py-24 text-background lg:px-12 lg:py-32">
      <div className="absolute inset-0">
        <img
          src="/images/real/internistudiofisyo2.webp"
          alt="Interno dello Studio Fisyo."
          className="h-full w-full object-cover opacity-[0.11]"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#111813]/92 via-[#161f1a]/92 to-[#1c271f]/95" />
      </div>

      <div className="absolute left-[6%] top-[14%] h-56 w-56 rounded-full bg-accent/10 blur-[140px]" />
      <div className="absolute bottom-[6%] right-[8%] h-72 w-72 rounded-full bg-accent/8 blur-[140px]" />

      <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)] lg:items-start">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-background/45">
            Il nostro modo di lavorare
          </p>
          <h2 className="max-w-3xl text-4xl font-semibold leading-[0.96] tracking-[-0.05em] md:text-6xl">
            Non lavoriamo per spegnere il sintomo e rivederti presto.
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-background/70 md:text-xl">
            Cerchiamo di capire cosa mantiene acceso il problema e come aiutarti a
            tornare a una vita piu libera, piu stabile e piu tua.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              to="/chi-siamo"
              className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/7 px-7 py-4 text-base font-medium text-background backdrop-blur-md transition-colors hover:bg-white/10"
            >
              Conosci il team
            </Link>
            <Link
              to="/contatti"
              className="inline-flex items-center justify-center rounded-full bg-accent px-7 py-4 text-base font-semibold text-primary transition-colors hover:bg-[#e4b14a]"
            >
              Scrivici
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-[2.7rem] border border-white/10 bg-white/5 p-7 backdrop-blur-xl md:p-8"
        >
          <div className="space-y-6">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="grid gap-4 border-b border-white/8 pb-6 last:border-b-0 last:pb-0 md:grid-cols-[auto_1fr]"
              >
                <span className="text-sm font-semibold tracking-[0.22em] text-accent/85">
                  0{index + 1}
                </span>
                <div>
                  <h3 className="text-2xl font-semibold tracking-[-0.04em] text-white">
                    {value.title}
                  </h3>
                  <p className="mt-3 max-w-xl text-base leading-relaxed text-background/68">
                    {value.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
