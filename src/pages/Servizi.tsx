import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { GearIcon, HeartIcon, MixIcon, SunIcon } from '@radix-ui/react-icons';
import { MagneticButton } from '../components/MagneticButton';
import { useSEO } from '../hooks/useSEO';

const services = [
    {
        id: "fisioterapia",
        title: "Fisioterapia e Terapia Manuale",
        desc: "Riabilitazione ortopedica, traumatologica e post-chirurgica. Trattamento dei dolori acuti e cronici (mal di schiena, cervicalgia, tendiniti) tramite tecniche manuali avanzate e tecnologie di ultima generazione.",
        icon: <GearIcon className="w-6 h-6" />,
        image: "/images/real/fisioterapia-manuale-studio-fisyo-parma.webp"
    },
    {
        id: "pilates-clinico",
        title: "Pilates Clinico",
        desc: "Sedute individuali o in micro-gruppi condotte esclusivamente da Fisioterapisti. Ideale per il potenziamento mirato del core, correzione posturale e prevenzione degli infortuni.",
        icon: <MixIcon className="w-6 h-6" />,
        image: "/images/real/staff-valentina-corradi-pilates-clinico-studio-fisyo.webp"
    },
    {
        id: "salute-donna",
        title: "Salute della Donna",
        desc: "Percorsi specializzati per la riabilitazione del pavimento pelvico, incontinenza, dolori pelvici cronici, e percorsi specifici pre e post gravidanza con personale dedicato.",
        icon: <HeartIcon className="w-6 h-6" />,
        image: "/images/real/salute_donna.webp"
    },
    {
        id: "linfodrenaggio",
        title: "Linfodrenaggio Manuale",
        desc: "Terapia medica (Metodo Vodder/Leduc) per edemi, gonfiori post-operatori e ritenzione idrica. Eseguito solo da fisioterapisti.",
        icon: <MixIcon className="w-6 h-6" />,
        image: "/images/real/linfodrenaggiobendaggigambe.webp"
    },
    {
        id: "psicologia",
        title: "Psicologia e Psicoterapia",
        desc: "Approccio integrato mente-corpo. Gestione di ansia, stress e del circolo vizioso tra dolore fisico e malessere emotivo.",
        icon: <MixIcon className="w-6 h-6" />,
        image: "/images/real/psicologia.webp"
    },
    {
        id: "fisio4young",
        title: "Fisio4Young",
        desc: "Prevenzione scoliosi, infortuni sportivi e rieducazione posturale dai 6-7 anni fino all'adolescenza.",
        icon: <SunIcon className="w-6 h-6" />,
        image: "/images/real/esercizibambinifisioterapia.webp"
    },
    {
        id: "nutrizione",
        title: "Nutrizione Clinica",
        desc: "Piani alimentari personalizzati per sportivi, per il dimagrimento o associati a patologie specifiche, elaborati da nutrizionisti esperti in stretta collaborazione con il team riabilitativo.",
        icon: <SunIcon className="w-6 h-6" />,
        image: "/images/real/elisa-cardinali-nutrizionista-e1766323699892.webp"
    }
];

export const Servizi = () => {
    useSEO({
        title: "I Nostri Servizi | Fisioterapia, Pilates e Salute a Felino",
        description: "Scopri i servizi di Studio Fisyo a Felino: Fisioterapia, Pilates Clinico, Salute della Donna, Linfodrenaggio, Psicologia, Fisio4Young e Nutrizione.",
        url: "https://www.studiofisyo.it/servizi",
        schema: {
            "@context": "https://schema.org",
            "@type": "ItemList",
            "itemListElement": services.map((s, idx) => ({
                "@type": "ListItem",
                "position": idx + 1,
                "url": `https://www.studiofisyo.it/servizi/${s.id}`,
                "name": s.title
            }))
        }
    });
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="pt-32 pb-24 px-6 lg:px-12 max-w-7xl mx-auto flex flex-col gap-16 relative">
            <header className="mb-12">
                <h1 className="font-sans font-bold text-5xl md:text-7xl tracking-tighter text-primary mb-6 leading-tight max-w-3xl">
                    I nostri <span className="font-drama italic font-normal text-accent">Servizi</span>.
                </h1>
                <p className="font-sans text-xl text-primary/70 max-w-2xl leading-relaxed">
                    Un ecosistema completo per il tuo corpo. Ogni specialità è interconnessa per garantirti un recupero totale e un benessere duraturo.
                </p>
            </header>

            <div className="flex flex-col gap-16 md:gap-24">
                {services.map((srv, i) => {
                    const isEven = i % 2 === 0;
                    return (
                        <motion.div
                            key={srv.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-16 items-center`}
                        >
                            {/* Image Section */}
                            <div className="w-full lg:w-1/2">
                                <Link to={`/servizi/${srv.id}`} className="block group">
                                    <div className="rounded-[3rem] overflow-hidden relative aspect-[4/3] bg-slate-100 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_45px_80px_-15px_rgba(234,179,8,0.15)] transition-all duration-[1s]">
                                        <img
                                            src={srv.image}
                                            alt={srv.title}
                                            loading="lazy"
                                            decoding="async"
                                            className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105 filter grayscale-[10%] group-hover:grayscale-0"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent group-hover:opacity-50 transition-opacity duration-700"></div>

                                        {/* Icon Badge */}
                                        <div className="absolute top-8 left-8 w-14 h-14 bg-white/90 backdrop-blur-md text-primary border border-white/20 rounded-full flex items-center justify-center shadow-[0_15px_30px_-10px_rgba(0,0,0,0.1)] group-hover:bg-accent group-hover:text-primary transition-colors duration-500">
                                            {srv.icon}
                                        </div>
                                    </div>
                                </Link>
                            </div>

                            {/* Text Section */}
                            <div className="w-full lg:w-1/2 flex flex-col items-start px-4 lg:px-0">
                                <h2 className="font-sans font-bold text-3xl md:text-5xl text-primary mb-6 leading-tight hover:text-accent transition-colors duration-300">
                                    <Link to={`/servizi/${srv.id}`}>{srv.title}</Link>
                                </h2>
                                <p className="font-sans text-lg md:text-xl text-primary/70 leading-relaxed mb-10 max-w-xl">
                                    {srv.desc}
                                </p>
                                <MagneticButton to={`/servizi/${srv.id}`} className="bg-primary hover:bg-accent hover:text-primary transition-colors duration-500 text-background px-8 py-4 text-base font-bold shadow-lg hover:shadow-accent/20">
                                    Esplora il percorso
                                </MagneticButton>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};
