import { Component, type ErrorInfo, type ReactNode } from 'react';
import { WA_MESSAGE_ERROR, waUrl } from '../config/constants';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
    state: State = { hasError: false };

    static getDerivedStateFromError(): State {
        return { hasError: true };
    }

    componentDidCatch(error: Error, info: ErrorInfo) {
        void error;
        void info;

        // Intentionally not logging to external services
    }

    render() {
        if (!this.state.hasError) return this.props.children;

        const waHref = waUrl(WA_MESSAGE_ERROR);

        return (
            <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 text-center">
                <img
                    src="/images/logo-fisyo.png"
                    alt="Studio Fisyo"
                    width={120}
                    height={40}
                    className="mb-10 opacity-80"
                />

                <h1 className="font-drama text-4xl md:text-5xl text-primary mb-4">
                    Qualcosa non ha funzionato
                </h1>
                <p className="font-sans text-base text-ink-soft max-w-md mb-10 leading-relaxed">
                    Si è verificato un errore inaspettato. Prova a ricaricare la pagina — se il problema
                    persiste scrivici su WhatsApp.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-4">
                    <button
                        onClick={() => window.location.reload()}
                        className="bg-accent text-primary font-sans font-bold px-8 py-4 rounded-2xl hover:bg-accent/90 transition-colors"
                    >
                        Ricarica la pagina
                    </button>
                    <a
                        href={waHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border border-primary/20 text-primary font-sans font-semibold px-8 py-4 rounded-2xl hover:bg-primary/5 transition-colors"
                    >
                        Scrivici su WhatsApp
                    </a>
                </div>
            </div>
        );
    }
}
