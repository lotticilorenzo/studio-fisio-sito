import { useEffect } from 'react';
import { Reveal } from '../components/Reveal';
import { useSEO } from '../hooks/useSEO';

export const ChiSiamo = () => {
    useSEO({
        title: "Chi Siamo | Studio Fisyo - Fisioterapia a Felino",
        description: "Scopri il team femminile di Studio Fisyo a Felino. Fisioterapiste laureate, osteopata, ostetrica, nutrizionista e psicologa. Un approccio integrato per la tua salute.",
        image: "https://www.studiofisyo.com/images/real/fototeamstudiofisyo.webp",
        url: "https://www.studiofisyo.com/chi-siamo",
        schema: {
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "name": "Chi Siamo - Team Studio Fisyo",
            "description": "Il team multidisciplinare di Studio Fisyo a Felino dedicato a fisioterapia, riabilitazione, nutrizione e psicologia.",
            "url": "https://www.studiofisyo.com/chi-siamo"
        }
    });
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="pt-32 pb-24 px-6 lg:px-12 max-w-7xl mx-auto flex flex-col gap-16 relative">
            <header className="mb-12">
                <Reveal width="100%">
                    <h1 className="font-sans font-bold text-5xl md:text-7xl tracking-tighter text-primary mb-6 leading-tight max-w-4xl">
                        Dietro ogni camice, una persona pronta ad <span className="font-drama italic font-normal text-accent">ascoltarti</span>.
                    </h1>
                </Reveal>
                <Reveal width="100%" delay={0.1}>
                    <p className="font-sans text-xl text-primary/70 max-w-3xl leading-relaxed">
                        Siamo un team tutto al femminile, unite da un unico obiettivo: accoglierti in un ambiente sereno e curare la tua salute a 360 gradi. Benvenuti nello Studio Fisyo di Felino.
                    </p>
                </Reveal>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mt-8">
                {/* Text Side */}
                <Reveal width="100%" className="h-full">
                    <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-slate-200/50 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.03)] flex flex-col justify-center h-full">
                        <h3 className="font-sans font-bold text-3xl text-primary mb-6">Da un'idea a uno studio integrato</h3>
                        <p className="font-sans text-lg text-primary/70 leading-relaxed mb-6">
                            Studio FISYO nasce dal desiderio di portare a Felino un nuovo concetto di cura. Abbiamo capito che il corpo umano non funziona a compartimenti stagni. Per questo abbiamo unito Fisioterapia, Pilates Clinico, Alimentazione sana, Ostetricia e Psicologia sotto lo stesso tetto.
                        </p>
                        <p className="font-sans text-lg text-primary/70 leading-relaxed">
                            Ascoltiamo i bisogni specifici di ognuno, tracciamo la causa e disegniamo un percorso integrato per risolverla alla radice. Non rincorriamo il sintomo, curiamo la persona.
                        </p>
                    </div>
                </Reveal>

                {/* Big Image Poster Side */}
                <Reveal width="100%" delay={0.2} className="h-full w-full">
                    <div className="rounded-[2.5rem] overflow-hidden relative h-full w-full shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] min-h-[400px]">
                        <img
                            src="/images/real/fototeamstudiofisyo.webp"
                            alt="Lo Studio Fisyo Team"
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover filter grayscale-[10%]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-primary/10 to-transparent"></div>
                        <div className="absolute bottom-8 left-8 right-8 text-white">
                            <h3 className="font-sans font-bold text-2xl tracking-tight mb-2">Molto più di un ambulatorio</h3>
                            <p className="font-sans text-background/80 text-sm">Un habitat dedicato al tuo benessere profondo.</p>
                        </div>
                    </div>
                </Reveal>
            </div>

            {/* Full-width Core Values Banner */}
            <div className="my-24 lg:my-32 -mx-6 lg:-mx-12 px-6 lg:px-12 py-24 md:py-32 bg-[#1A2421] text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images/real/internistudiofisyo2.webp')] opacity-[0.08] mix-blend-overlay pointer-events-none bg-cover bg-center"></div>
                <div className="absolute -top-64 -right-64 w-[800px] h-[800px] bg-accent/10 rounded-full blur-[120px] pointer-events-none"></div>

                <div className="max-w-7xl mx-auto relative z-10 flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
                    <div className="w-full lg:w-1/3">
                        <Reveal>
                            <h2 className="font-sans font-bold text-4xl md:text-5xl lg:text-5xl tracking-tight leading-tight mb-6">
                                Cosa trovi nello <br /><span className="text-accent italic font-drama font-normal">Studio Fisyo</span>
                            </h2>
                        </Reveal>
                        <Reveal delay={0.1}>
                            <p className="font-sans text-background/60 text-lg leading-relaxed">
                                Abbandona l'idea della sala d'attesa fredda e impersonale. Abbiamo progettato ogni millimetro per farti sentire al centro.
                            </p>
                        </Reveal>
                    </div>

                    <div className="w-full lg:w-2/3 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                        {/* Item 1 */}
                        <Reveal>
                            <div className="flex flex-col gap-4">
                                <div className="w-12 h-12 rounded-full border border-accent/20 bg-accent/10 flex items-center justify-center text-accent font-sans font-bold text-xl mb-2">1</div>
                                <h3 className="font-sans font-bold text-xl text-white">Ambiente Sereno</h3>
                                <p className="font-sans text-background/60 leading-relaxed text-sm">
                                    Spazi progettati per infondere calma, privacy assoluta e favorire la concentrazione sul proprio corpo.
                                </p>
                            </div>
                        </Reveal>
                        {/* Item 2 */}
                        <Reveal delay={0.2}>
                            <div className="flex flex-col gap-4">
                                <div className="w-12 h-12 rounded-full border border-accent/20 bg-accent/10 flex items-center justify-center text-accent font-sans font-bold text-xl mb-2">2</div>
                                <h3 className="font-sans font-bold text-xl text-white">Comunicazione</h3>
                                <p className="font-sans text-background/60 leading-relaxed text-sm">
                                    I professionisti dello studio si parlano costantemente per garantirti un percorso coerente e senza interruzioni.
                                </p>
                            </div>
                        </Reveal>
                        {/* Item 3 */}
                        <Reveal delay={0.4}>
                            <div className="flex flex-col gap-4">
                                <div className="w-12 h-12 rounded-full border border-accent/20 bg-accent/10 flex items-center justify-center text-accent font-sans font-bold text-xl mb-2">3</div>
                                <h3 className="font-sans font-bold text-xl text-white">Educazione</h3>
                                <p className="font-sans text-background/60 leading-relaxed text-sm">
                                    Ti spieghiamo esattamente il *perché* di ogni trattamento, per renderti autonomo e consapevole.
                                </p>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </div>

            {/* Team Section Cards */}
            <div className="mt-16 flex flex-col gap-12 w-full">
                <div className="flex flex-col gap-4 text-center md:text-left">
                    <h2 className="font-sans font-bold text-4xl md:text-5xl tracking-tighter text-primary">Conosci i nostri specialisti</h2>
                    <p className="font-sans text-lg text-primary/60 max-w-2xl">Un team di donne esperte, unite dalla passione per il benessere e dalla volontà di offrirti un percorso di cura eccellente e personalizzato.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {[
                        { name: "Dott.Ft Beatrice Grassi", role: "Founder & Fisioterapista", desc: "Specialista nella riabilitazione dell’età evolutiva e neurologica. Accompagna con empatia la crescita dei piccoli pazienti.", image: "/images/real/beatricegrassi.webp" },
                        { name: "Dott.Ft Elisa Caggiati", role: "Founder & Fisioterapista", desc: "Colonna portante della terapia manuale e linfatica. Unisce competenza ortopedica e una delicatezza unica.", image: "/images/real/elisacaggiati.webp" },
                        { name: "Valentina Mazza", role: "Psicologa Clinica", desc: "Supporto psicologico integrato per gestire ansia, stress e carico emotivo. Spazio sicuro per l'equilibrio mente-corpo.", image: "/images/real/staff-valentina-mazza-fisioterapista-studio-fisyo.webp" },
                        { name: "Valentina Corradi", role: "Pilates Clinico", desc: "Specialista nel movimento terapeutico. Segue i pazienti con protocolli personalizzati contro il dolore.", image: "/images/real/staff-valentina-corradi-pilates-clinico-studio-fisyo.webp" },
                        { name: "Elisa Zanacca", role: "Ostetrica", desc: "Punto di riferimento per il pavimento pelvico e percorso nascita. Accompagna le donne con approccio intimo e rassicurante.", image: "/images/real/fotoostetrica.webp" },
                        { name: "Elisa Cardinali", role: "Biologa Nutrizionista", desc: "Percorsi su misura senza rinunciare al piacere della tavola, in stretta collaborazione con il team riabilitativo.", image: "/images/real/elisa-cardinali-nutrizionista-e1766323699892.webp" }
                    ].map((member, i) => (
                        <Reveal key={i} delay={i * 0.1}>
                            <div className="group bg-white/80 backdrop-blur-xl rounded-[2.5rem] overflow-hidden border border-slate-200/50 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.03)] hover:shadow-[0_45px_80px_-15px_rgba(234,179,8,0.15)] transition-all duration-[1s] flex flex-col h-full">
                                {/* REAL IMAGE */}
                                <div className="h-[350px] w-full relative overflow-hidden bg-slate-100">
                                    <img src={member.image} alt={member.name} loading="lazy" decoding="async" className="w-full h-full object-cover object-[50%_10%] filter grayscale-[15%] group-hover:scale-[1.05] transition-transform duration-[1.5s] ease-out group-hover:grayscale-0" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#151D18] via-[#151D18]/40 to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-700"></div>
                                    <div className="absolute bottom-6 left-6 right-6 flex flex-col items-start transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                        <span className="bg-accent/90 backdrop-blur-md text-[#151D18] px-4 py-1.5 rounded-full inline-block text-xs font-bold uppercase tracking-widest mb-2 shadow-lg">{member.role}</span>
                                        <h4 className="font-sans font-bold text-3xl text-white drop-shadow-md">{member.name}</h4>
                                    </div>
                                </div>
                                <div className="p-8 lg:p-10 flex flex-col flex-grow relative bg-white/50 z-10">
                                    <p className="font-sans text-base text-primary/70 leading-relaxed font-medium">{member.desc}</p>
                                    <div className="mt-6 w-12 h-0.5 bg-accent/30 group-hover:w-full group-hover:bg-accent transition-all duration-700"></div>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </div>
    );
};
