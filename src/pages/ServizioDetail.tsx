import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeftIcon, ChevronDownIcon, PlayIcon, TokensIcon, StarIcon, FaceIcon, TargetIcon, ActivityLogIcon, PersonIcon, LightningBoltIcon, SunIcon } from '@radix-ui/react-icons';
import { useSEO } from '../hooks/useSEO';

// Animazioni Variabili Framer Motion
const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15
        }
    }
};

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } }
};

interface Specialist {
    name: string;
    role: string;
    description: string;
    image?: string;
}

interface Application {
    title: string;
    desc: string;
    icon?: React.ReactNode;
}

interface FAQ {
    q: string;
    a: string;
}

interface ServiceData {
    title: string;
    subtitle: string;
    image: string;
    intro: string[];
    howItWorks?: string[];
    applications?: Application[];
    specialists?: Specialist[];
    faq?: FAQ[];
    note?: string;
}

// Dati Puliti, Ottimizzati SEO e senza ripetizioni
const servicesData: Record<string, ServiceData> = {
    "fisioterapia": {
        title: "Fisioterapia e Riabilitazione Funzionale",
        subtitle: "Il nostro Metodo dei 3 pilastri.",
        image: "/images/real/fisioterapia-manuale-studio-fisyo-parma.webp",
        intro: [
            "Non limitarti a spegnere il sintomo. Attraverso la Terapia Manuale Avanzata e l'Esercizio Terapeutico, curiamo la causa alla radice per restituirti completa libertà di movimento.",
            "Il dolore cronico e i blocchi muscolari non sono mai 'normali'. Che si tratti di un infortunio sportivo, di un forte blocco alla schiena o del recupero post-intervento, il nostro obiettivo clinico è risolvere il quadro acuto e renderti autonomo a lungo termine."
        ],
        howItWorks: [
            "Terapia Manuale: Sblocchiamo le articolazioni, sciogliamo contratture profonde e riduciamo l'infiammazione localizzata usando le mani.",
            "Esercizio Terapeutico: Non basta sbloccare, occorre blindare. Rinforziamo la muscolatura per evitare recidive e ricadute nel mese successivo.",
            "Educazione Fisica: Ti insegniamo a gestire attivamente il tuo corpo. La vera guarigione si ha quando non dipendi più dal terapista."
        ],
        applications: [
            { icon: <ActivityLogIcon />, title: "Recupero Post-Chirurgico", desc: "Riabilitazione specializzata dopo protesi (anca, ginocchio), ricostruzione legamenti, meniscectomie o esiti di fratture." },
            { icon: <TokensIcon />, title: "Riabilitazione Neuromotoria", desc: "Percorsi mirati per patologie neurologiche (esiti di Ictus, Parkinson, SM) per recuperare schemi motori, equilibrio e autonomia." },
            { title: "Dolori Vertebrali e Articolari", desc: "Alta specializzazione nel trattamento di Cervicalgie, Lombalgie acute, Sciatalgie, Ernie discali e tendinopatie della spalla." }
        ],
        specialists: [
            { name: "Beatrice Grassi", role: "Fisioterapista Muscoloscheletrica", description: "Specialista nel trattamento della colonna vertebrale e disturbi posturali. Unisce l'abilità manuale a una spiccata attenzione per la compliance del paziente, puntando all'eliminazione rapida del dolore.", image: "/images/real/beatricegrassi.webp" },
            { name: "Elisa Caggiati", role: "Fisioterapista Ortopedica", description: "Espertissima in terapia manuale avanzata e gestione del recupero ortopedico. Precisione tecnica assoluta e altissima personalizzazione nella transizione dalle prime fasi infiammatorie fino al recupero muscolare.", image: "/images/real/elisacaggiati.webp" }
        ],
        faq: [
            { q: "Serve obbligatoriamente la ricetta medica?", a: "Non è obbligatoria per la prima valutazione. Se hai già esami recenti (RX, Risonanze), portali pure: completeranno il quadro clinico." },
            { q: "Fate uso di tecar, laser o ultrasuoni?", a: "Privilegiamo sempre l'approccio manuale e l'esercizio attivo per efficacia duratura. Integriamo tecnologie specifiche solo se strettamente necessario." },
            { q: "Quanto tempo dura mediamente una seduta?", a: "Tra i 45 e i 60 minuti. È il tempo ideale per combinare lo sblocco manuale e l'impostazione degli esercizi correttivi." }
        ]
    },
    "pilates-clinico": {
        title: "Pilates Clinico e Rieducazione Posturale",
        subtitle: "Non è semplice ginnastica: è Terapia in Movimento.",
        image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=2670",
        intro: [
            "Dimentica le asettiche palestre affollate dove sei solo un numero. Qui trovi percorsi rieducativi premium condotti esclusivamente da Fisioterapisti.",
            "Il Pilates Clinico non è strutturato per farti 'sudare', ma per curare le disfunzioni biomeccaniche. Ogni esercizio è calibrato esattamente sul tuo storico clinico per sanare mal di schiena e difetti posturali complessi."
        ],
        howItWorks: [
            "Supervisione Fisioterapica: Conosciamo l'esatta conformazione della tua ernia o scoliosi. Eseguirai solo movimenti sicuri e curativi.",
            "Classi Elite a Numero Chiuso: Gruppi di massimo 4-5 persone per un controllo maniacale su allineamento e respirazione, come in una lezione privata.",
            "Analisi Preliminare Iniziale: Valutazione clinica obbligatoria prima dell'inserimento per definire il programma di rinforzo personalizzato."
        ],
        applications: [
            { icon: <TargetIcon />, title: "Lombalgia e Deviazioni Cervicali", desc: "Indicato per blocchi lombo-sacrali, ernie o protrusioni. Creiamo un 'corsetto anatomico naturale' reclutando attivamente il trasverso dell'addome." },
            { icon: <PersonIcon />, title: "Riprogrammazione da Scrivania", desc: "Passi ore al computer? Distendiamo l'ipercifosi dorsale (spalle chiuse) e sfiammiamo le retrazioni trapezoidali ridando espansione toracica." },
            { title: "Profilassi per Sportivi", desc: "Migliora fluidità, baricentro e flessibilità. Fondamentale per runner, calciatori o golfisti che vogliono aumentare le performance e invecchiare in salute senza infortuni." }
        ],
        specialists: [
            { name: "Valentina Corradi", role: "Fisioterapista Posturologa", description: "Perfezionista del controllo neuromotorio. Valentina trasforma l'esercizio in rigida biologia curativa: non ti insegnerà solo le coreografie del Pilates, ma educherà il tuo sistema nervoso.", image: "/images/real/staff-valentina-corradi-pilates-clinico-studio-fisyo.webp" }
        ],
        faq: [
            { q: "Ho un mal di schiena acuto, posso iniziare subito?", a: "Sì. Le posture vengono ingegnerizzate per non comprimere le zone infiammate, aiutando anzi la decompressione dei dischi intervertebrali." },
            { q: "È a corpo libero (Matwork) o sui Reformer?", a: "Il focus è sul Matwork clinico con resistenze elastiche, poiché consolida più velocemente la forza rispetto ai macchinari attivi." },
            { q: "È un allenamento intenso? Sono fermo da anni.", a: "Nessun problema, i carichi iniziali sono nulli. La progressione seguirà millimetricamente le tue reali capacità di adattamento." }
        ]
    },
    "salute-donna": {
        title: "Salute della Donna e Pavimento Pelvico",
        subtitle: "Un porto sicuro, protetto e professionale per la tua intimità clinica.",
        image: "/images/real/salute_donna.webp",
        intro: [
            "Oltre un certo limite, non devi rassegnarti al fastidio. Perdite urinarie improvvise, dispaurenia (dolore ai rapporti), sensazione di pesantezza vescicale o la parete addominale inattiva dopo il parto.",
            "Tante donne tollerano questi segni bollandoli come 'inevitabili'. La medicina insegna il contrario: il perineo è un distretto muscolare governabile, e guidate da specialiste ostetriche si può curare efficacemente. Senza alcun giudizio, rispettando intimamente i tuoi tempi emotivi."
        ],
        applications: [
            { icon: <SunIcon />, title: "Gravidanza e Accompagnamento", desc: "Preparazione elastica del perineo al momento del parto, trattamento sinergico della lombosciatalgia gravidica e ginnastica a basso impatto per il benessere feto-materno." },
            { icon: <ActivityLogIcon />, title: "Riabilitazione del Post-Parto", desc: "Iter diagnostico per Diastasi Addominale Centrale, riarmonizzazione tissutale delle cicatrici (cesareo e episiotomia) e ripristino istantaneo della continenza sfinterica." },
            { title: "Menopausa, Atrofia e Prevenzione", desc: "Terapia ricostruttiva per la stabilità da prolasso urogenitale nascente. Lotta all'atrofia mucosale, secchezza estrema e protocolli d'urto sul dolore pelvico cronico associato." }
        ],
        specialists: [
            { name: "Elena Zanacca", role: "Ostetrica Specialista", description: "Fonde un'impeccabile conoscenza ginecologica e riabilitativa a una delicatezza umana encomiabile. L'intero approccio si prefigge come assoluta assenza di giudizio, ponendo come baricentro incrollabile la sicurezza ambientale e psicologica della paziente.", image: "/images/real/fotoostetrica.webp" }
        ],
        faq: [
            { q: "La prima visita mi mette a disagio. Come si svolge?", a: "Tutto segue i tuoi tempi emotivi. La valutazione interna si esegue solo se sei del tutto serena. Altrimenti iniziamo da test esterni e un sereno colloquio." },
            { q: "Ho partorito tre anni fa: sono in ritardo per iniziare?", a: "I muscoli perineali mantengono memoria a qualsiasi età. Che tu abbia partorito un mese fa o da 10 anni, recuperare tono e continenza è sempre possibile." },
            { q: "Trattate anche la Diastasi Addominale?", a: "Certamente. Parete addominale e perineo lavorano insieme: offriamo protocolli isometrici per riattivare la tenuta fasciale su entrambi i fronti." }
        ],
        note: "Il grande vantaggio di Studio Fisyo è l'Equipe unificata: curiamo il dolore intimo con l'Ostetrica, ma se necessiti di dimagrire per alleggerire il carico sul pavimento pelvico, interviene fluidamente la nostra Nutrizionista. Avrai tutto nello stesso bunker clinico."
    },
    "linfodrenaggio": {
        title: "Terapia Decongestiva e Linfodrenaggio Manuale",
        subtitle: "L'arma d'elezione clinica (e non estetica) per i ristagni extracellulari.",
        image: "/images/real/linfodrenaggiobendaggigambe.webp",
        intro: [
            "Bisogna chiarire un presupposto chiave: in moltissime spa si offre un massaggio vigoroso, proponendolo come linfodrenaggio. Qui dentro, al contrario, parliamo di altissima Sanità Specialistica.",
            "L'obiettivo medico è svuotare in sicurezza grandiosi quadri di edema diffuso, linfedemi invalidanti da chirurgia oncologica, e fortissime stasi venose."
        ],
        howItWorks: [
            "Assenza Totale di Macchinari Invasivi: Impieghiamo solo mani addestrate Metodo Vodder, l'unico vero sistema ad alto fondamento empirico sul riassorbimento linfatico.",
            "Sicurezza Patologica Assoluta: Conosciamo i tuoi linfonodi. Svuotiamo arti post-chirurgici riducendo a zero il rischio d'infezione o sovraccarico infiammatorio locale.",
            "Bendaggi Compressivi Fisio-Farmacologici: Creiamo bendaggi decongestionanti specializzati da portare a casa, per consolidare il risultato dopo le manovre sul lettino."
        ],
        applications: [
            { icon: <FaceIcon />, title: "Terapia Oncologica e Mastectomica", desc: "Gestione indispensabile pre e post chirurgia tumorale mammaria, scongiurando dolori e pericolosi versamenti edematosi." },
            { icon: <TargetIcon />, title: "Emergenze Traumatologiche", desc: "Le distorsioni giganti alla caviglia, o le gonfiature infiammatorie disastrose seguenti all'innesto di protesi metalliche articolari (ginocchio, anca) o fratture tibiali." },
            { title: "Insufficienza Venosa e Peso Gravidico", desc: "I classici e faticosi rigonfiamenti podalici degli ultimi mesi di dolce attesa, o l'astenia pura dettata dalla sedentarietà e scompensi del microcircolo." }
        ],
        specialists: [
            { name: "Elisa Caggiati", role: "Specialista in Terapia Decongestiva Linfatica", description: "Forte di un'esperienza clinica pluriennale, Elisa è una vera autorità del reticolo linfatico vascolare. Non spinge i liquidi a caso: individua con sensitività rara le zone di 'ingorgo' superficiali convogliando intelligentemente le vie di scarico con pressioni piumate ma incredibilmente efficaci.", image: "/images/real/elisacaggiati.webp" }
        ],
        faq: [
            { q: "Risulta un trattamento doloroso?", a: "Assolutamente no. I capillari linfatici sono in superficie: massaggi forti li distruggono. Godrai di sfioramenti leggeri, lenti ed estremamente rilassanti." },
            { q: "Quante sedute servono per un risultato duraturo?", a: "Per traumi acuti (una storta) bastano 3 o 4 visite ravvicinate. Per linfedemi cronici stiliamo cicli di mantenimento mensili leggeri e scaglionati nel tempo." },
            { q: "Meglio la pressoterapia al posto del linfodrenaggio?", a: "La macchina pressoria spinge brutalmente liquidi ovunque, rischiando infiammazioni. Le mani dell'operatore bypassano i dotti guasti convogliando i fluidi solo dove c'è reale sbocco biologico." }
        ]
    },
    "psicologia": {
        title: "Psicologia Cognitiva e Interventi di Psicoterapia",
        subtitle: "L'innegabile ponte neuro-bio-sistemico: ascoltare la mente per risolvere il dolore.",
        image: "/images/real/psicologia.webp",
        intro: [
            "Pensare alla salute del corpo staccandola meccanicamente dai software neurali cerebrali è oggi scientificamente anacronistico. Un percorso psicoterapeutico è la chiave per riarmonizzare un reset fisiologico complessivo.",
            "Nel nostro centro trattiamo le somatizzazioni. È frequentissimo che una cefalea mialgica tesa, un colon irritato, o spasmi mandibolari ininterrotti, celino in ultima instanza lupi d'ansia o di depressione strisciante prolungatamente irrisolti."
        ],
        applications: [
            { icon: <TokensIcon />, title: "Supporto al Dolore Centrale e Psicosomatico", desc: "Sostenere un sintomo invalidante costante fiacca le resistenze più dure, scendendo nell'oblio e nella rassegnazione. Rialleniamo le chiavi di sopravvivenza motivazionali alla cura per affrontare il duro piano fisioterapico." },
            { icon: <LightningBoltIcon />, title: "Dissoluzione dell'Ansia Reattiva", desc: "Stress cronici performativi familiari e lavorativi scatenano valanghe sproporzionate di cortisolo ematico. Smembreremo i muri ideologici dei pensieri ruminanti restituendo controllo al tuo vissuto insonne." },
            { title: "Fragilità Perinatale e Supporto alla Nascita", desc: "La gravidanza può sfociare nella più isolante depressione post-partum (baby blues) per chi non riceve ascolto qualificato. Riquilibriamo il focus genitoriale al tramonto dell'onda d'urto ormonale, per ridare solidità alla coppia e al sistema." }
        ],
        specialists: [
            { name: "Valentina Mazza", role: "Psicologa e Psicoterapeuta Regolativa", description: "L'enorme caratura dell'approccio di Valentina consiste in tecniche orientate agli obiettivi e scevre dai lunghissimi giri di parole infiniti, con la formidabile ed empatica potenza nel ri-disegnare mappe comportamentali utili e pratiche nella vita dei pazienti in sovraccarico reattivo grave.", image: "/images/real/staff-valentina-mazza-fisioterapista-studio-fisyo.webp" }
        ],
        faq: [
            { q: "La terapia indica che sono 'sbagliato' o malato?", a: "Curare l'assorbimento emotivo è igiene vitale, esattamente come curare un infortunio. Concedersi lo spazio per elaborare traumi è la più alta forma d'intelligenza e coraggio." },
            { q: "Perché affiancare Fisioterapia e Psicoterapia?", a: "Perché chi soffre di forte fobia o stress si contrae, bloccando il recupero muscolare. Decomprimere la mente spegne letteralmente i recettori dolorifici periferici in tempi record." },
            { q: "È un percorso infinito in cui parlo da solo?", a: "Usiamo percorsi orientati agli obiettivi e 'Brief Therapy'. Se l'evento scatenante è acuto e circoscritto, ci dedichiamo allo sblocco immediato nel 'qui ed ora', in pochissime sedute." }
        ]
    },
    "fisio4young": {
        title: "Polo Pediatrico e Valutazione Età Evolutiva (Fisio4Young)",
        subtitle: "Scansionare oggi per evitare le invalidità strutturali di domani.",
        image: "/images/real/esercizibambinifisioterapia.webp",
        intro: [
            "La missione cruciale di questa divisione è puramente intercettiva prima che le saldature scheletriche ossee solidifichino permanentemente degli sbilanciamenti dannosi incurabili nei decenni a venire del nascente adulto.",
            "I fanciulli sono sistemi fragili rapidissimi ad adattarsi anche nei compensi patologici. Fisioterapia pediatrica significa individuazione precoce delle scoliopsie invisibili tra i banchi scolastici e gestione certosina degli overload muscolari dovuti allo sport super-competitivo odierno."
        ],
        applications: [
            { icon: <TargetIcon />, title: "Sorveglianza Cifotica e Scoliosi Idiopatica", desc: "Monitoraggio con test clinici pediatrici (Adams) e l'immediata programmazione meccanica o fasciale per de-rotare le deviazioni nascenti del dorso." },
            { icon: <PersonIcon />, title: "Morbi della Crescita o Sindrome di Sever", desc: "De-sensibilizzazione immediata da dolori acutissimi post sport nei giovani atleti (ginocchio Osgood-Schlatter o tallonite Sever) in piena fase ormonale." },
            { title: "Rientro Traumatologico Sportivo", desc: "Gestione di ricostruzioni crociate, distorsioni e stiramenti immaturi, arginando allenatori disattenti o le pericolose smanie di ri-giocare prima di un pieno recupero fasciale." }
        ],
        specialists: [
            { name: "Beatrice Grassi", role: "Responsabile Riabilitazione Neuro-Ortopedica Infantile", description: "Beatrice declina lo spigolo autoritario dell'esame medico, conquistando incredibilmente l'attenzione vitale (e difficilissima) degli insofferenti e diffidenti teenager e bambini, traducendo sequenze cliniche complesse in input performativi ludici ed avvincenti di alta fascia terapeutica ingaggiante.", image: "/images/real/beatricegrassi.webp" }
        ],
        faq: [
            { q: "C'è un'età ideale per la prima valutazione posturale asintomatica?", a: "In media tra i 6 e gli 8 anni c'è il grosso balzo prepuberale. Lì è cruciale farsi vedere, specie se il bambino riferisce frequenti piccole distorsioni o dolori lancinanti notturni al riposo." },
            { q: "Mio figlio è insofferente a tutto, come lo convincete?", a: "Le sessioni pediatriche tramutano terapie complesse in missioni motorie, challenge sfidanti e destrutturazioni ludiche per ingannare strategicamente il loro rapido disincanto adolescenziale." },
            { q: "Se ha già un grosso gibbo, serve prima il corsetto?", a: "In tali casi un ortopedico valuterà gli apparati passivi. Ma l'esercizio riabilitativo in concomitanza al corsetto è tassativo altrimenti i suoi muscoli spinali cadranno in grave ipotrofia debole chiusi dentro al busto a vita." }
        ]
    },
    "nutrizione": {
        title: "Nutrizione Clinica Biologica di Precisione",
        subtitle: "L'allineamento ormonale tra soddisfazione palatale e risultato metabolico performante.",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=2670",
        intro: [
            "Bisogna demolire le barriere del senso di colpa terrorista sul calcolo al granello della caloria che porta, in 3 settimane, a sfaceli nervosi in cui cedi riacquistando tutto.",
            "Tramite la profonda chimica del sangue ricuciremo il divario tra una vita alimentare di gusto e miseria, tracciando il passo chiave verso il dimagrimento senza rinunce impossibili."
        ],
        howItWorks: [
            "Niente dieta pre-stampata: Nessun PDF standard uguale per tutti. Incroceremo scientificamente le tue complesse necessità sociali (cene, turni lavorativi) ai soli pilastri alimentari davvero incidenti.",
            "Valutazioni ormonali profonde: Integriamo le anamnesi mediche post-amenorree, infiammazioni pelviche e colon irritabile con la pura densità molecolare del cibo antinfiammatorio per favorire reazioni organiche di spegnimento duraturo locale.",
            "Analisi bio-impedenziometriche periodiche Vettoriali: Non misuriamo 'grammi' a vuoto o inutili BMI. Scannerizziamo mensilmente l'idratazione ed i muscoli reali salvati preservandoli faticosamente distruggendo millimetri localizzati d'adipe e ritenzione d'idratazione torbida."
        ],
        applications: [
            { icon: <TokensIcon />, title: "Rigenerazione Nutrizionale Ortopedica", desc: "Abbattiamo i dolori articolari bloccando cibi altamente acidificanti prima dell'intervento, decuplicando le chance del collagene di riparare una lussazione chirurgica assieme al fisioterapista post operazione." },
            { icon: <LightningBoltIcon />, title: "Gestione Fisiologica Femminile", desc: "Disinnesco dell'effetto fiamma pre-ciclo o caldane post menopausa. Assestiamo le quote insuliniche contrastando ritenzioni massimali repentine o ovaio micropolicistico in fiore attivo infiammatorio letale sfiancante." },
            { title: "Definizione Medica della Massa Tonica", desc: "Non basta fare sport amabilmente e affamarsi come fachiro indiano disperato decalcificandosi d'ossa d'autunno: qui ci blindiamo a protocollo chirurgico massimale garantendo scudo plastico tonico ed epurando via seccamente la massa grassa adiposa zavorrante finta cellulite infiammata e flaccida svuotante." }
        ],
        specialists: [
            { name: "Elisa Cardinali", role: "Specialista Magistrale in Nutrizione Biologica", description: "Oltre tre lustri di titanica gestione delle carenze, ha un occhio istantaneo, analitico e non ingannabile riguardo le carenze fisiologiche patologiche inespresse. Distrugge falsi miti complottari terrorizzanti su proteine in polvere ed orrori dei media sull'indice glicemico terrorizzante offrendo pace alla pancia di pazienti estenuate, sempre in fortissimo sinergismo coi dottori che accerchiano i casi a 360 gradi e li guidano incrociando i super-poteri del network medico fisyo con sensibilità inarrivabile ma altissimo controllo scientifico dei parametri di tolleranza salutistici finali desiderati all'anamnesi.", image: "/images/real/elisa-cardinali-nutrizionista-e1766323699892.webp" }
        ],
        faq: [
            { q: "Dovrò pesare in modo maniacale ogni scondita foglia tutti i giorni vero?", a: "Nessun terrorismo bilancia: basiamo il piano su grammature 'visive' o varianti libere libere per i pasti principali qualora la tua patologia consenta forti tolleranze psicosociali ansiogene. L'arte medica sta nell'aderenza felice e non in prigione dorata calcolatore e depressa solitaria in cucina in un angolo piangendo calorie infinite!" },
            { q: "Davvero correggere la nutrizione disinfiamma il dolore cronico ad un'articolazione in riabilitazione!?", a: "Miracolosamente sì! Se curiamo il PH dei fluidi sierosi togliendo farine iper infiammatorie disperatamente brucianti pro-ciclossigenasi il lavoro meccanico del fisio farà il doppio da un giorno in base e in velocità folgorante risolvendo la lesione perenne bloccata anni interi." },
            { q: "Se non possiedo purtroppo del prelievo clinico ematico fresco vi ritardate ed arrendo rinviandomi a casa?", a: "Falso. Ovvio l'avere esami del fegato tiroide aggiornati massimile ai 6 mesate dona una radiografia chimica sublime al piano perfetto della dieta perfetta, ma procediamo per test iniziali anamnestici anche orali rassicurandoti guidandoti step e qualora urgessero approfondimenti ti ci indirizzeremo no-stress." }
        ]
    }
};

const FAQAccordion = ({ faqs }: { faqs: FAQ[] }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <div className="flex flex-col gap-4 mt-6 w-full max-w-4xl">
            {faqs.map((faq, idx) => (
                <div key={idx} className="border border-slate-200/60 rounded-2xl overflow-hidden bg-white hover:bg-slate-50 transition-all duration-300 shadow-sm hover:shadow-md">
                    <button
                        onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                        className="w-full px-6 py-5 flex justify-between items-center text-left"
                    >
                        <span className="font-sans font-bold text-primary text-[1.1rem] md:text-[1.2rem] pr-8">{faq.q}</span>
                        <ChevronDownIcon className={`w-6 h-6 text-accent transition-transform duration-300 flex-shrink-0 ${openIndex === idx ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                        {openIndex === idx && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                            >
                                <div className="px-6 pb-6 pt-0">
                                    <div className="w-8 h-1 bg-accent/30 rounded-full mb-4"></div>
                                    <p className="font-sans text-primary/80 leading-relaxed text-[1.05rem]">
                                        {faq.a}
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ))}
        </div>
    );
};

export const ServizioDetail = () => {
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    const data = id ? servicesData[id] : undefined;

    useSEO(data ? {
        title: `${data.title} | Studio Fisyo`,
        description: data.subtitle,
        url: `https://www.studiofisyo.it/servizi/${id}`,
        schema: {
            "@context": "https://schema.org",
            "@type": "MedicalSpecialty",
            "name": data.title,
            "description": data.intro[0],
            "provider": {
                "@type": "MedicalClinic",
                "name": "Studio Fisyo"
            },
            "url": `https://www.studiofisyo.it/servizi/${id}`
        }
    } : { title: 'Servizio | Studio Fisyo', description: '', url: '' });

    if (!data) {
        return <Navigate to="/servizi" replace />;
    }

    return (
        <div className="pt-32 pb-24 px-6 lg:px-12 w-full max-w-5xl mx-auto flex flex-col gap-16 relative min-h-[90vh]">
            <Link to="/servizi" className="inline-flex items-center gap-2 font-sans font-bold text-primary/60 hover:text-accent transition-colors self-start pb-4 border-b border-transparent hover:border-accent">
                <ArrowLeftIcon className="w-4 h-4" /> Torna a tutti i servizi
            </Link>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col gap-12"
            >
                {/* Header Title Premium */}
                <header className="flex flex-col gap-6">
                    <h1 className="font-sans font-bold text-5xl md:text-6xl lg:text-7xl tracking-tighter text-primary leading-[1.1]">
                        {data.title.split(' e ')[0]} <br className="hidden md:block" />
                        {data.title.split(' e ')[1] && <span className="text-primary/40">e {data.title.split(' e ')[1]}</span>}
                    </h1>
                    {data.subtitle && (
                        <p className="font-drama italic text-3xl md:text-4xl lg:text-5xl text-accent border-l-4 border-accent pl-6 py-2">
                            {data.subtitle}
                        </p>
                    )}
                </header>

                {/* Main Hero Image Cinematic */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="rounded-[3rem] overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] h-[350px] md:h-[500px] w-full mt-4 relative group"
                >
                    <div className={`absolute inset-0 w-full h-full ${id === 'fisio4young' ? 'rotate-90 origin-center scale-[1.4]' : ''}`}>
                        <img
                            src={data.image}
                            alt={`Ambiente ${data.title}`}
                            decoding="async"
                            className="w-full h-full object-cover filter grayscale-[10%] group-hover:scale-[1.05] transition-transform duration-[2s] ease-out"
                        />
                    </div>
                    <div className="absolute inset-0 bg-primary/10 pointer-events-none"></div>
                </motion.div>

                {/* Staggered Intro Blocks */}
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-50px" }}
                    className="flex flex-col gap-8 text-xl md:text-[1.35rem] text-primary/80 font-sans leading-relaxed my-8"
                >
                    {data.intro.map((p, i) => (
                        <motion.p variants={fadeUp} key={i}>{p}</motion.p>
                    ))}
                </motion.div>

                {/* How It Works List (Methodology) */}
                {data.howItWorks && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                        className="bg-slate-50 rounded-[2.5rem] p-8 md:p-14 mb-8 border border-slate-200 shadow-sm"
                    >
                        <h3 className="font-sans font-bold text-3xl md:text-4xl text-primary mb-10 flex items-center gap-4">
                            <PlayIcon className="w-8 h-8 text-accent" /> Come interveniamo.
                        </h3>
                        <ul className="flex flex-col gap-8">
                            {data.howItWorks.map((item, i) => {
                                const [boldTitle, ...rest] = item.split(': ');
                                return (
                                    <li key={i} className="flex gap-6 items-start font-sans text-lg md:text-xl text-primary/80">
                                        <div className="w-8 h-8 rounded-xl bg-accent/20 text-accent font-mono flex items-center justify-center flex-shrink-0 font-bold mt-1">
                                            {i + 1}
                                        </div>
                                        <div>
                                            {rest.length > 0 ? (
                                                <>
                                                    <span className="font-bold text-primary block text-2xl mb-2">{boldTitle}</span>
                                                    <span className="text-primary/70 leading-relaxed">{rest.join(': ')}</span>
                                                </>
                                            ) : (
                                                <span className="leading-relaxed">{item}</span>
                                            )}
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </motion.div>
                )}

                {/* Scenarios / Applications Grid */}
                {data.applications && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="mb-12 mt-12"
                    >
                        <h3 className="font-sans font-bold text-4xl text-primary mb-10 text-center md:text-left">
                            Ambiti di Eccellenza.
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {data.applications.map((app, i) => (
                                <motion.div
                                    whileHover={{ y: -5 }}
                                    key={i}
                                    className="bg-white border border-slate-200/60 p-8 rounded-[2rem] shadow-sm hover:shadow-xl hover:border-accent/40 transition-all duration-300 group flex flex-col"
                                >
                                    <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center mb-6 text-accent group-hover:bg-accent group-hover:text-primary transition-colors duration-300">
                                        {app.icon ? app.icon : <StarIcon className="w-6 h-6" />}
                                    </div>
                                    <h4 className="font-sans font-bold text-[1.35rem] text-primary mb-4 leading-snug">{app.title}</h4>
                                    <p className="font-sans text-primary/70 leading-relaxed text-[1.05rem]">{app.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Specialists Card - Dark Premium */}
                {data.specialists && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                        className="mb-12 mt-12"
                    >
                        <h3 className="font-sans font-bold text-3xl text-primary mb-8 px-2">Chi guida il percorso</h3>
                        <div className="flex flex-col gap-6">
                            {data.specialists.map((spec, i) => (
                                <div key={i} className="relative w-full rounded-[3rem] overflow-hidden bg-[#151D18] border border-accent/20 shadow-[0_30px_60px_-15px_rgba(234,179,8,0.15)] group flex flex-col md:flex-row">
                                    {spec.image && (
                                        <div className="w-full md:w-2/5 h-[350px] md:h-auto min-h-[400px] relative overflow-hidden">
                                            <img src={spec.image} alt={spec.name} className="absolute inset-0 w-full h-full object-cover object-[50%_15%] filter grayscale-[15%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[1.5s] ease-out" />
                                            {/* Gradient for mobile and desktop to fade seamlessly into the text box */}
                                            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#151D18] to-transparent md:hidden"></div>
                                            <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-[#151D18] to-transparent hidden md:block"></div>
                                        </div>
                                    )}
                                    <div className="w-full md:w-3/5 p-10 md:p-16 flex flex-col justify-center relative z-10">
                                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] pointer-events-none group-hover:bg-accent/10 transition-colors duration-1000"></div>
                                        <div className="relative">
                                            <span className="text-accent text-xs md:text-sm font-mono font-bold uppercase tracking-[0.2em] mb-4 block pl-1">{spec.role}</span>
                                            <h4 className="font-sans font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-6 tracking-tight leading-none">{spec.name}</h4>
                                            <div className="w-12 h-1 bg-accent/30 rounded-full mb-6"></div>
                                            <p className="font-sans text-white/70 leading-relaxed text-lg md:text-xl font-light max-w-2xl mb-12">
                                                "{spec.description}"
                                            </p>
                                            <div className="flex items-center gap-4 mt-auto">
                                                <div className="w-12 h-[2px] bg-accent/50 group-hover:bg-accent group-hover:w-20 transition-all duration-500"></div>
                                                <span className="font-drama italic text-2xl text-accent/50 group-hover:text-accent transition-colors duration-500">L'Equipe</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* FAQ Component */}
                {data.faq && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="mb-12 mt-12 w-full flex flex-col md:flex-row gap-12"
                    >
                        <div className="w-full md:w-1/3">
                            <h3 className="font-sans font-bold text-4xl text-primary mb-4">Domande Frequenti.</h3>
                            <p className="font-sans text-lg text-primary/60 pr-8">Togliamo subito ogni dubbio: le risposte reali alle paure più comuni prima di iniziare il percorso in clinica.</p>
                        </div>
                        <div className="w-full md:w-2/3">
                            <FAQAccordion faqs={data.faq} />
                        </div>
                    </motion.div>
                )}

                {/* Note Banner */}
                {data.note && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="bg-accent/10 border border-accent/40 rounded-3xl p-8 md:p-10 relative mt-8 mb-16"
                    >
                        <p className="font-sans text-primary text-xl font-medium relative z-10 leading-relaxed text-center">
                            <span className="uppercase text-xs tracking-[0.3em] block mb-4 opacity-70 text-accent font-bold">La nostra firma</span>
                            <span className="italic">"{data.note}"</span>
                        </p>
                    </motion.div>
                )}

                {/* Note: Abbiamo rimosso la seconda CTA Custom ridondante qui poichè il Layout inserisce automaticamente <CTA /> Globale sotto tutte le pagine */}

            </motion.div>
        </div>
    );
};
