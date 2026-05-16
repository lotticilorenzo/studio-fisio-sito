const steps = [
  {
    title: 'Ascolto e valutazione',
    text: 'Partiamo da come stai, da quello che ti limita e da cosa vuoi tornare a fare senza pensarci ogni volta.',
    label: 'Fase 01',
    image: '/images/real/accoglienza.webp',
  },
  {
    title: 'Percorso condiviso',
    text: 'Se serve, il caso si apre al confronto tra le professioniste dello studio. Tu hai una direzione chiara e un percorso che resta coerente.',
    label: 'Fase 02',
    image: '/images/real/fototeamstudiofisyo.webp',
  },
  {
    title: 'Lavoro che continua',
    text: 'Trattamento, esercizi e indicazioni pratiche devono aiutarti anche fuori dallo studio. E li che il risultato comincia a restare.',
    label: 'Fase 03',
    image: '/images/real/fisioterapia_studio_fisyo.webp',
  },
];

export const Protocol = () => {
  return (
    <section className="px-6 py-24 lg:px-12 lg:py-32" id="il-metodo">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.26em] text-primary/46">
            Il nostro metodo
          </p>
          <h2 className="max-w-xl text-4xl font-semibold leading-[0.98] tracking-[-0.05em] text-primary md:text-6xl">
            Un percorso in tre fasi, senza passaggi superflui.
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-primary/64 md:text-lg">
            Ogni fase ha un compito preciso. Capire il problema, impostare la strada
            giusta e accompagnarti nel lavoro che conta davvero.
          </p>
        </div>

        <div className="relative flex flex-col gap-8 lg:gap-10">
          <div className="absolute left-4 top-6 hidden h-[calc(100%-3rem)] w-px bg-primary/10 lg:block" />
          {steps.map((step, index) => (
            <article
              key={step.title}
              className="group relative overflow-hidden rounded-[2.7rem] border border-primary/8 bg-white/84 shadow-[0_28px_80px_-48px_rgba(31,42,36,0.28)] backdrop-blur-xl lg:ml-10"
            >
              <div className="grid gap-0 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
                <div className="relative overflow-hidden bg-[#e8dfd2]">
                  <img
                    src={step.image}
                    alt={step.title}
                    width={900}
                    height={1125}
                    loading="lazy"
                    decoding="async"
                    className="h-full min-h-[280px] w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/28 via-primary/8 to-transparent" />
                  <span className="absolute left-5 top-5 rounded-full border border-white/30 bg-white/16 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-white backdrop-blur-md">
                    {step.label}
                  </span>
                </div>

                <div className="flex flex-col justify-center p-8 md:p-10">
                  <p className="text-sm font-medium uppercase tracking-[0.22em] text-primary/36">
                    0{index + 1}
                  </p>
                  <h3 className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.04em] text-primary md:text-4xl">
                    {step.title}
                  </h3>
                  <div className="mt-5 h-px w-16 bg-accent/45 transition-all duration-500 group-hover:w-28" />
                  <p className="mt-6 max-w-lg text-base leading-relaxed text-primary/66 md:text-lg">
                    {step.text}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
