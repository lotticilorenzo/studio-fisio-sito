import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const MultidisciplinareCard = () => {
    return (
        <div className="flex flex-col gap-6 group h-full">
            <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-8 lg:p-10 border border-slate-200/50 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.03)] hover:shadow-[0_30px_60px_-15px_rgba(234,179,8,0.1)] transition-all duration-500 h-64 lg:h-72 flex justify-center items-center relative overflow-hidden bg-gradient-to-br from-white/90 to-slate-50/90">
                {/* Animated interconnected nodes */}
                <div className="relative w-40 h-40">
                    <motion.div className="absolute top-0 left-1/2 -ml-6 w-12 h-12 bg-accent/10 rounded-full border border-accent/20 flex items-center justify-center z-10 group-hover:bg-accent/20 group-hover:scale-110 transition-all duration-500" animate={{ y: [0, -5, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
                        <div className="w-2 h-2 bg-accent rounded-full group-hover:scale-150 transition-transform duration-500"></div>
                    </motion.div>
                    <motion.div className="absolute bottom-0 left-0 w-12 h-12 bg-primary/10 rounded-full border border-primary/20 flex items-center justify-center z-10 group-hover:border-primary/40 transition-colors duration-500" animate={{ x: [0, -5, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}>
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                    </motion.div>
                    <motion.div className="absolute bottom-0 right-0 w-12 h-12 bg-primary/10 rounded-full border border-primary/20 flex items-center justify-center z-10 group-hover:border-primary/40 transition-colors duration-500" animate={{ x: [0, 5, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}>
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                    </motion.div>

                    {/* Connecting lines */}
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 160 160">
                        <motion.path d="M80 24 L24 136" stroke="currentColor" strokeWidth="1.5" className="text-slate-200 group-hover:text-accent/30 transition-colors duration-500" strokeDasharray="4 4" animate={{ strokeDashoffset: [0, 20] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} />
                        <motion.path d="M80 24 L136 136" stroke="currentColor" strokeWidth="1.5" className="text-slate-200 group-hover:text-accent/30 transition-colors duration-500" strokeDasharray="4 4" animate={{ strokeDashoffset: [0, 20] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} />
                        <motion.path d="M24 136 L136 136" stroke="currentColor" strokeWidth="1.5" className="text-slate-200 group-hover:text-slate-300 transition-colors duration-500" strokeDasharray="4 4" animate={{ strokeDashoffset: [0, 20] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} />
                    </svg>

                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white px-3 py-1 rounded-full text-[10px] tracking-widest font-bold text-primary shadow-sm border border-slate-100 z-20 group-hover:shadow-md transition-shadow duration-500">PAZIENTE</div>
                    </div>
                </div>
            </div>
            <div>
                <h3 className="font-sans font-bold text-2xl text-primary mb-2">Approccio Multidisciplinare</h3>
                <p className="font-sans text-foreground/70 text-base leading-relaxed mb-4">
                    Ogni persona è unica. Integriamo fisioterapia, nutrizione, psicologia e ostetricia in un unico piano coerente per curare la persona, non solo il sintomo.
                </p>
                <Link to="/chi-siamo" className="font-sans font-bold text-primary bg-accent/10 hover:bg-accent/20 px-5 py-2.5 rounded-full text-xs tracking-widest uppercase transition-colors flex items-center justify-between gap-3 w-fit border border-accent/20 hover:border-accent/40">
                    Scopri il team <span className="text-accent text-lg leading-none group-hover:translate-x-1 transition-transform">→</span>
                </Link>
            </div>
        </div>
    );
};

const PersonalizzatoCard = () => {
    return (
        <div className="flex flex-col gap-6 group h-full">
            <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-8 lg:p-10 border border-slate-200/50 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.03)] hover:shadow-[0_30px_60px_-15px_rgba(234,179,8,0.1)] transition-all duration-500 h-64 lg:h-72 flex justify-center items-center relative overflow-hidden bg-gradient-to-br from-white/90 to-slate-50/90">
                <div className="flex flex-col gap-5 w-full max-w-[160px]">
                    {[0, 1, 2].map((i) => (
                        <div key={i} className="h-2 w-full bg-slate-100 rounded-full overflow-hidden relative group-hover:bg-slate-200 transition-colors duration-500">
                            <motion.div
                                className="absolute top-0 left-0 h-full bg-accent/60 group-hover:bg-accent rounded-full transition-colors duration-500"
                                initial={{ width: "20%" }}
                                animate={{ width: i === 0 ? ["20%", "70%", "70%", "20%"] : i === 1 ? ["20%", "40%", "40%", "20%"] : ["20%", "85%", "85%", "20%"] }}
                                transition={{ duration: 4, repeat: Infinity, delay: i * 0.2, times: [0, 0.4, 0.8, 1], ease: "easeInOut" }}
                            />
                            <motion.div
                                className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-accent rounded-full shadow-sm group-hover:scale-125 transition-transform duration-500"
                                initial={{ left: "20%" }}
                                animate={{ left: i === 0 ? ["20%", "70%", "70%", "20%"] : i === 1 ? ["20%", "40%", "40%", "20%"] : ["20%", "85%", "85%", "20%"] }}
                                transition={{ duration: 4, repeat: Infinity, delay: i * 0.2, times: [0, 0.4, 0.8, 1], ease: "easeInOut" }}
                                style={{ marginLeft: "-8px" }}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <h3 className="font-sans font-bold text-2xl text-primary mb-2">Percorso Personalizzato</h3>
                <p className="font-sans text-foreground/70 text-base leading-relaxed mb-4">
                    Nessun protocollo standard o fotocopia. Dopo un'anamnesi profonda, creiamo una terapia su misura basata sui tuoi specifici obiettivi di salute.
                </p>
                <Link to="/servizi" className="font-sans font-bold text-primary bg-accent/10 hover:bg-accent/20 px-5 py-2.5 rounded-full text-xs tracking-widest uppercase transition-colors flex items-center justify-between gap-3 w-fit border border-accent/20 hover:border-accent/40">
                    Visualizza i percorsi <span className="text-accent text-lg leading-none group-hover:translate-x-1 transition-transform">→</span>
                </Link>
            </div>
        </div>
    );
};

const PilatesCard = () => {
    return (
        <div className="flex flex-col gap-6 group h-full md:col-span-2 lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-8 lg:p-10 border border-slate-200/50 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.03)] hover:shadow-[0_30px_60px_-15px_rgba(234,179,8,0.1)] transition-all duration-500 h-64 lg:h-72 flex justify-center items-center relative overflow-hidden bg-gradient-to-br from-white/90 to-slate-50/90">
                <div className="relative w-32 h-32 flex justify-center items-center">
                    <motion.div
                        className="absolute w-full h-full rounded-full border-[1.5px] border-primary/20 group-hover:border-accent/30 transition-colors duration-500"
                        animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0.1, 0.5] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div
                        className="absolute w-24 h-24 rounded-full border-[1.5px] border-accent/40"
                        animate={{ scale: [1, 0.8, 1], opacity: [0.5, 0.8, 0.5] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <div className="text-primary/50 font-sans text-[9px] tracking-[0.2em] uppercase font-bold text-center leading-tight group-hover:text-primary transition-colors duration-500">
                        Controllo<br />Motori
                    </div>
                </div>
            </div>
            <div>
                <h3 className="font-sans font-bold text-2xl text-primary mb-2">Pilates Clinico</h3>
                <p className="font-sans text-foreground/70 text-base leading-relaxed mb-4">
                    Condotto esclusivamente da fisioterapisti esperti, in piccoli gruppi o singolarmente. Una vera terapia attiva per rieducare il movimento.
                </p>
                <Link to="/servizi/pilates-clinico" className="font-sans font-bold text-primary bg-accent/10 hover:bg-accent/20 px-5 py-2.5 rounded-full text-xs tracking-widest uppercase transition-colors flex items-center justify-between gap-3 w-fit border border-accent/20 hover:border-accent/40">
                    Scopri il pilates <span className="text-accent text-lg leading-none group-hover:translate-x-1 transition-transform">→</span>
                </Link>
            </div>
        </div>
    );
};

export const Features = () => {
    return (
        <section className="py-24 md:py-32 px-6 lg:px-12 bg-background relative z-10">
            <div className="max-w-7xl mx-auto">
                <div className="mb-16 md:mb-24 flex justify-between items-end">
                    <h2 className="font-sans font-bold text-primary text-4xl md:text-5xl lg:text-6xl tracking-tight max-w-2xl leading-tight">
                        Tre pilastri per <br /><span className="text-accent italic font-drama font-normal text-5xl md:text-7xl">risolvere</span> il problema alla radice.
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    <MultidisciplinareCard />
                    <PersonalizzatoCard />
                    <PilatesCard />
                </div>
            </div>
        </section>
    );
};
