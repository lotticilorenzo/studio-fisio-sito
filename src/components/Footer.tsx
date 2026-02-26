import { MagneticButton } from './MagneticButton';
import { Link } from 'react-router-dom';

export const CTA = () => {
    return (
        <section className="py-32 px-6 lg:px-12 bg-background relative overflow-hidden" id="prenota">
            <div className="max-w-5xl mx-auto rounded-[3rem] bg-primary text-background border border-primary/20 shadow-[-20px_40px_60px_-20px_rgba(46,64,54,0.3)] p-12 md:p-24 relative overflow-hidden flex flex-col items-center text-center">

                {/* Subtle decorative elements */}
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-background/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3 pointer-events-none"></div>

                <h2 className="relative z-10 font-sans font-bold text-4xl md:text-5xl lg:text-7xl tracking-tighter leading-[1.1] mb-8 max-w-4xl">
                    Sei pronto a <span className="font-drama italic font-normal text-accent">riprendere il controllo</span> del tuo benessere?
                </h2>

                <p className="relative z-10 font-sans text-background/70 text-lg md:text-xl max-w-2xl mb-12 leading-relaxed">
                    Non rimandare. Prenota la tua valutazione funzionale e iniziamo subito a tracciare il tuo percorso di salute integrata.
                </p>

                <MagneticButton to="/contatti" className="bg-accent text-primary px-10 py-5 font-sans font-medium text-lg md:text-xl">
                    Prenota Mappa Funzionale
                </MagneticButton>
            </div>
        </section>
    );
};

export const Footer = () => {
    return (
        <footer className="bg-[#151D18] pt-24 pb-12 px-6 lg:px-12 rounded-t-[4rem] text-background mt-12 relative overflow-hidden">
            <div className="max-w-7xl mx-auto flex flex-col">

                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-8 mb-24">
                    <div className="md:col-span-2">
                        <img src="/images/logo-fisyo.png" alt="Studio Fisyo Logo" loading="lazy" decoding="async" className="h-10 w-auto mb-6 rounded-sm bg-white p-1" />
                        <p className="font-sans text-background/60 max-w-sm mb-8 leading-relaxed">
                            Il tuo hub medico d'eccellenza a Felino. Fisioterapia avanzata, pilates clinico e percorsi su misura per farti ritrovare il vero benessere.
                        </p>
                        {/* Trust Badge */}
                        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-accent/20 bg-accent/5 backdrop-blur-sm">
                            <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                            <span className="font-sans text-xs font-semibold tracking-wide text-accent uppercase">Polo d'Eccellenza Riabilitativa</span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h4 className="font-sans font-medium text-background/80 mb-2">Pagine</h4>
                        <Link to="/servizi" className="font-sans text-background/50 hover:text-accent transition-colors text-sm">Servizi</Link>
                        <Link to="/chi-siamo" className="font-sans text-background/50 hover:text-accent transition-colors text-sm">Chi Siamo</Link>
                        <Link to="/contatti" className="font-sans text-background/50 hover:text-accent transition-colors text-sm">Contatti</Link>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h4 className="font-sans font-medium text-background/80 mb-2">Vieni a trovarci</h4>
                        <a href="https://maps.google.com/?q=Via+Aldo+Moro+1/A,+43035+Felino+PR" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-start gap-1">
                            <span className="font-sans text-background/50 text-sm group-hover:text-background transition-colors">Via Aldo Moro 1/A</span>
                            <span className="font-sans text-background/50 text-sm group-hover:text-background transition-colors">43035 Felino (PR)</span>
                        </a>
                        <a href="tel:3396508642" className="inline-flex items-center gap-2 font-sans font-medium text-accent hover:text-white transition-colors text-sm mt-2">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                            339 650 8642
                        </a>
                        <a href="mailto:info@studiofisio.com" className="inline-flex items-center gap-2 font-sans font-medium text-background/50 hover:text-white transition-colors text-sm">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                            info@studiofisio.com
                        </a>

                        {/* Social Links */}
                        <div className="flex items-center gap-4 mt-4">
                            <a
                                href="https://www.instagram.com/studiofisyo?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full border border-background/20 flex items-center justify-center text-background/50 hover:text-accent hover:border-accent hover:bg-accent/10 transition-all"
                                aria-label="Seguici su Instagram"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                                </svg>
                            </a>
                            <a
                                href="https://www.facebook.com/studiofisyo?locale=it_IT"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full border border-background/20 flex items-center justify-center text-background/50 hover:text-accent hover:border-accent hover:bg-accent/10 transition-all"
                                aria-label="Seguici su Facebook"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-background/10 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="font-sans text-background/40 text-xs">
                        © 2026 Studio Fisyo. Tutti i diritti riservati. P.IVA 02551160340
                    </p>
                    <div className="flex gap-6">
                        <a href="https://www.iubenda.com/privacy-policy/25963224" className="iubenda-nostyle iubenda-noiframe iubenda-embed font-sans text-background/40 hover:text-accent transition-colors text-xs" title="Privacy Policy Studio Fisyo">Informativa Privacy</a>
                        <a href="https://www.iubenda.com/privacy-policy/25963224/cookie-policy" className="iubenda-nostyle iubenda-noiframe iubenda-embed font-sans text-background/40 hover:text-accent transition-colors text-xs" title="Cookie Policy Studio Fisyo">Gestione Cookie</a>
                    </div>
                </div>

            </div>
        </footer>
    );
};
