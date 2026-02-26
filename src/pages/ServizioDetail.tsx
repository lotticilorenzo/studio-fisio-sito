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
            { q: "Serve obbligatoriamente la ricetta medica?", a: "Non è obbligatoria per l'accesso diretto alla nostra valutazione funzionale fisioterapica iniziale. Se invece possiedi già una diagnosi, RX o risonanze recenti, portale: completeranno perfettamente il quadro clinico." },
            { q: "Fate uso di tecar, laser o ultrasuoni?", a: "Privilegiamo l'approccio manuale e l'esercizio attivo perché le linee guida internazionali ne documentano un'efficacia nettamente superiore a lungo termine. In alcuni casi specifici, se necessarie, integriamo tecnologie mirate al bisogno." },
            { q: "Quanto tempo dura mediamente una seduta?", a: "Tra i 45 e i 60 minuti. È il tempo fisiologico necessario per combinare le fasi di detensionamento manuale e l'impostazione degli esercizi correttivi sul corpo." }
        ]
    },
    "pilates-clinico": {
        title: "Pilates Clinico e Rieducazione Posturale",
        subtitle: "Non è semplice ginnastica: è Terapia in Movimento.",
        image: "https://picsum.photos/seed/salutedonna/2670/1800",
        intro: [
            "Dimentica le asettiche palestre affollate dove sei solo un numero. Qui trovi percorsi rieducativi premium condotti esclusivamente da Fisioterapisti.",
            "Il Pilates Clinico non è strutturato per farti 'sudare', ma per curare le disfunzioni biomeccaniche. Ogni esercizio è calibrato esattamente sul tuo storico clinico per sanare mal di schiena e difetti posturali complessi."
        ],
        howItWorks: [
            "Supervisione Fisioterapica: Conosciamo l'esatta conformazione della tua ernia o della tua deviazione scoliotica. Non svolgerai mai movimenti a rischio.",
            "Classi Elite a Numero Chiuso: Gruppi di massimo 4-5 persone per garantire un controllo maniacale su allineamento e respirazione, come in una lezione privata.",
            "Analisi Preliminare Iniziale: Prima dell'inserimento in aula, effettuiamo un test posturale individuale per determinare i colli di bottiglia e fissare i risultati desiderati."
        ],
        applications: [
            { icon: <TargetIcon />, title: "Lombalgia e Deviazioni Cervicali", desc: "Indicato per blocchi lombo-sacrali, ernie o protrusioni. Creiamo un 'corsetto anatomico naturale' reclutando attivamente il trasverso dell'addome." },
            { icon: <PersonIcon />, title: "Riprogrammazione da Scrivania", desc: "Passi ore al computer? Distendiamo l'ipercifosi dorsale (spalle chiuse) e sfiammiamo le retrazioni trapezoidali ridando espansione toracica." },
            { title: "Profilassi per Sportivi", desc: "Migliora fluidità, baricentro e flessibilità. Fondamentale per runner, calciatori o golfisti che vogliono aumentare le performance e invecchiare in salute senza infortuni." }
        ],
        specialists: [
            { name: "Valentina Corradi", role: "Fisioterapista Posturologa", description: "Perfezionista del controllo neuromotorio. Valentina trasforma l'esercizio in rigida biologia curativa: non ti insegnerà solo le coreografie del Pilates, ma educherà il tuo sistema nervoso a percepire i limiti del corpo per non eccederli mai più.", image: "/images/real/staff-valentina-corradi-pilates-clinico-studio-fisyo.webp" }
        ],
        faq: [
            { q: "Ho un forte mal di schiena in questo preciso momento, posso farlo?", a: "Assolutamente sì. Nel Pilates Clinico le posture vengono ingegnerizzate apposta per non comprimere un nervo infiammato temporaneo, aiutando addirittura la decompressione dei dischi intervertebrali." },
            { q: "È a corpo libero (Matwork) o con i famosi macchinari (Reformer)?", a: "Il focus predominante è sul Matwork clinico (tappetino), integrando fitball, magic rings e bande elastiche a forte resistenza. È dimostrato che l'impegno a corpo libero consolida prima gli schemi di forza corticale rispetto all'aiuto passivo dei grandi macchinari." },
            { q: "È complesso come sport? Non mi alleno da ere geologiche.", a: "Nessuna paura. È una terapia adatta a sedentari totali: il carico iniziale rasenta lo zero assoluto e la progressione segue millimetricamente le tue capacità soggettive di adattamento." }
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
            { q: "La primissima valutazione mi mette a disagio. Come avviene esattamente?", a: "Tutto segue il tuo consenso logico. La valutazione ispettiva interna fa spesso parte del tracking diagnostico, ma viene eseguita solo se ti senti totalmente serena. Se preferisci, il percorso inizia tranquillamente da test esterni conservativi e dialoghi informativi." },
            { q: "Ho partorito tre anni fa: è diventato troppo tardi per ricominciare a migliorare?", a: "Le fibre muscolari perineali mantengono la memoria e la capacità ipertrofica a qualsiasi età. Che tu abbia partorito un mese fa oppure 15 anni fa, possiamo destrutturare le anomalie e ridare vigore e trofismo ai tessuti di sostegno." },
            { q: "Offrite anche percorsi misti per la temuta Diastasi Addominale?", a: "Certamente. La parete addominale lavora in tandem col perineo. Trattiamo l'incontinenza muscolare della Linea Alba, offrendoti i protocolli isometrici ideali per riattivare la tenuta fasciale dell'addome inferiore." }
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
            "Assenza Totale di Macchinari Invasivi: Operiamo impiegando esclusivamente frazioni manuali originali del Metodo Vodder/Leduc, le uniche ad avere fondamento empirico sul riassorbimento proteico dei fluidi.",
            "Sicurezza Patologica Assoluta: Conosciamo perfettamente l'anatomia linfonodale. Sappiamo dove è possibile svuotare un arto post-mastectomia (quando parte delle stazioni ascellari mancano), azzerando i rischi di infiammazioni acute collaterali.",
            "Bendaggi Fisio-Farmacologici Compressivi: Per le ritenzioni più persistenti o per bloccare i volumi appena ridotti con i polpastrelli, creiamo strati compressivi terapeutici che mantengono il drenaggio attivo anche quando vai a casa."
        ],
        applications: [
            { icon: <FaceIcon />, title: "Terapia Oncologica e Mastectomica", desc: "La gestione indispensabile e sicurissima delle 'braccia gonfie' (linfedema brachiale) che tipicamente insorgono dopo le linfoadenectomie o pesanti quadranti chirurgici al seno." },
            { icon: <TargetIcon />, title: "Emergenze Traumatologiche", desc: "Le distorsioni giganti alla caviglia, o le gonfiature infiammatorie disastrose seguenti all'innesto di protesi metalliche articolari (ginocchio, anca) o fratture tibiali." },
            { title: "Insufficienza Venosa e Peso Gravidico", desc: "I classici e faticosi rigonfiamenti podalici degli ultimi mesi di dolce attesa, o l'astenia pura dettata dalla sedentarietà e scompensi del microcircolo." }
        ],
        specialists: [
            { name: "Elisa Caggiati", role: "Specialista in Terapia Decongestiva Linfatica", description: "Forte di un'esperienza clinica pluriennale, Elisa è una vera autorità del reticolo linfatico vascolare. Non spinge i liquidi a caso: individua con sensitività rara le zone di 'ingorgo' superficiali convogliando intelligentemente le vie di scarico con pressioni piumate ma incredibilmente efficaci.", image: "/images/real/elisacaggiati.webp" }
        ],
        faq: [
            { q: "Risulta un trattamento doloroso essendo clinico?", a: "L'esatto opposto. Anatomicamente i capillari linfatici risiedono pochissimi millimetri sotto il derma: movimenti forti, duri e dolorosi andrebbero a collabire e distruggere i dotti o stressare il vaso venoso. Proprio per questo percepirai sfioramenti ipnotici e lentissimi, estremamente addormentanti." },
            { q: "Quante sedute mediamente richiede una decongestione?", a: "Variabilissimo dal referto e dall'eccesso di linfa misurato. Per un edemìa traumatica (una storta) possono bastare 3 o 4 visite d'urto vicine. Su gestioni croniche in stadio avanzato si creano cicli modulati e mantenimenti costanti distanziati nel corso dei mesi." },
            { q: "Ma quindi le famose pressoterapie ad aria compressive che fanno nei centri?", a: "Un macchinario pressorio non ha un cervello biologico: spinge brutalmente l'acqua in modo omogeneo e monodirezionale, spesso andando 'a sbattere' ostinatamente contro le esatte stazioni linfonodali infiammate, sovraccaricandole o causando reflusso patogeno. Le dita umane di un analista bypassano gli 'incroci rotti', creando miracolosamente tunnel di deflusso alternativi." }
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
            { q: "Rivolgermi alla Psicoterapeuta non è sinonimo di fallimento e pazzia?", a: "Trattare un muscolo infortunato è sinonimo di debolezza? Idem decifrare l'esaurimento chimico cerebrale in burnout. Concedersi le parole per decodificare gli eventi disastrosi è una manovra d'urto igienica d'intelligenza formidabile superiore, lontanissima dallo stigma anacronistico della 'follia psichiatrica'." },
            { q: "Qual è il reale beneficio dell'avervi qui di fianco alla palestra per la riabilitazione muscolare?", a: "È il colpo da maestro: un paziente bloccato che affronta fobie di caduta al ginocchio si paralizza nei propri esercizi. Raccordarsi sui referti ortopedici contemporaneamente sui test cognitivi crea un unicum invincibile contro la catena fisiopatologica dell'infiammazione organica. Chi guarisce la mente spegne i recettori dolorifici periferici, da studio scientifico globale." },
            { q: "Devo stendermi anni per raccontare la mia infanzia?", a: "I format di intervento attuali sono enormemente plastici. A determinati crocevia acuti si possono stringere brief-therapy orientate sui problemi specifici o panici scatenanti attuali. Non è richiesto ricostruire il paleolitico se l'evento traumatico insorgente necessita sbroglio nel 'qui ed ora'." }
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
            { icon: <TargetIcon />, title: "Sorveglianza Cifotica e Scoliosi Idiopatica", desc: "Dal monitoraggio con test d'inclinazione vertebrale di Adams, fino alla programmazione degli input di autocorrezione isometrica per contrastare asimmetrie rotatorie del tronco e dorso curvo strutturato." },
            { icon: <PersonIcon />, title: "Morbo del Ginocchio o Tallone dei Saltatori", desc: "Dolori spaventosi e puntiformi al riposo notturno (Morbi di Osgood-Schlatter o Sever-Blanke), inefficienze o goffaggine patologica motoria in fase di boom puberale vertiginoso gestiti e desensibilizzati intelligentemente." },
            { title: "Rientro Traumatologico delle Promesse Agonistiche", desc: "Gestione accurata delle distorsioni d'inversione, stiramenti giovanili o ricostruzioni pesanti crociate nel preadolescente, garantendo il 'Return to Play' ottimale senza rischio folle di ri-rottura immatura anatomica per compensi o troppa fretta decisa dagli allenatori di campo impazienti." }
        ],
        specialists: [
            { name: "Beatrice Grassi", role: "Responsabile Riabilitazione Neuro-Ortopedica Infantile", description: "Beatrice declina lo spigolo autoritario dell'esame medico, conquistando incredibilmente l'attenzione vitale (e difficilissima) degli insofferenti e diffidenti teenager e bambini, traducendo sequenze cliniche complesse in input performativi ludici ed avvincenti di alta fascia terapeutica ingaggiante.", image: "/images/real/beatricegrassi.webp" }
        ],
        faq: [
            { q: "Qual è il periodo anagrafico perfetto per fissare un primo vero pit-stop esplorativo della colonna in crescita?", a: "L'orologio batte l'alert in media a cavallo dai 6 o agli 8 anni, nell'abbandono dello schema prepuberale puro per favorire una curva d'ispessimento delle masse che potrebbe deviare il segmento dorsale. Se il figlio denota scatti fulminei di statura esagerati che lo curvano, occorre anticipare visivamente d'urgenza." },
            { q: "Mio figlio sbadiglia a tutto e repelle ferocemente gli ordini e la fatica faticando a recepire imposizioni mediche.", a: "Lo diamo per fattore scontato e standard di ammissione. L'architettura clinica propedeutica dello specialista pediatrico è celare enormi fatiche eccentriche fasciali dentro mini-challenge, premi neurologici e destrutturazioni a step della noiosissima serialità ripetuta della palestra antica mortifera, portando a casa il lavoro muscolare adescandoli intelligentemente sul loro terreno mentale sfidante." },
            { q: "Con referto diagnosticato pesantemente asimmetrico ad alto grado Cobb, impiantate corsetti o buscherie per raddrizzarli?", a: "Smarcamento vitale: noi non ci arroghiamo i diritti degli Ortopedici o Fisiatri di rango. I medici prescriveranno l'ancoraggio passivo o l'allungamento in tutore chirurgico se matematicamente lo reputeranno necessario, ma attenzione massima a tutto l'iter posturno: l'esercizio specifico fisioterapico compensatorio è mandatorio al 100% in sinergismo al corsetto per non devitalizzare gravemente in debolezza estrema i muscoli paraspinali rinchiusi nella gabbia vitale!" }
        ]
    },
    "nutrizione": {
        title: "Nutrizione Clinica Biologica di Precisione",
        subtitle: "L'allineamento ormonale tra soddisfazione palatale e risultato metabolico performante.",
        image: "https://picsum.photos/seed/nutrizione/2670/1800",
        intro: [
            "Bisogna demolire le barriere del senso di colpa terrorista sul calcolo al granello del macaronuttriente che porta in 3 settimane lo sfacelo ormonale nervoso in cui si cede ritonfando il peso perso. L'arte nutrizionale è aderenza.",
            "Tramite fortissime revisioni ematochimiche del sangue e la perizia biochimica si compie una traslazione tra la miseria alimentare ed il reale metabolismo dell'energia organica. È il passetto definitivo del trinomio d'acciaio con corpo e movimento."
        ],
        howItWorks: [
            "Destrutturazione Completa del Metodo Copia-Incolla: Niente stampe da prestampato standard in pdf uguali. Si traccia da zero l'ingranaggio del turno notturno del lavoratore o degli infiniti aperitivi di business a cui presenziare del manager, forgiando schemi dove i vizi sono contesi ma non aboliti e frustrati.",
            "L'Alta Precisione d'Intervento per Quadri Invalidanti: Che siano emorragie e infiammazioni pelviche disastrose, amenorree secondarie restrittive per stress folle da sport od il controllo insulinico glicemico instabile.",
            "Antropometria Rivelatrice Scientifica Mese per Mese: Monitoriamo le densità del substrato magro-grasso corporeo tramite plicometrie tattili e analisi d'avanguardia con impedenzometrie vettoriali (BIA) e non con l'infima bilancia pesapersona che non ci dice assolutamente nulla del peso osseo-massa intracellulare reale."
        ],
        applications: [
            { icon: <TokensIcon />, title: "Arma Ematochimica in Assistenza alle Patologie Infiammatorie e Chirurgiche Motorie Fisioterapiche.", desc: "È pazzia accanirsi a massaggiare edemenzi su tendiniti croniche ribelli, laddove sussista all'apice del processo il blocco infiammatorio generato da un ph intracellulare alterato nutrizionalmente da pessimi regimi acidi. Dando il carburante esatto il collagene esplode al doppio della velocità rigenerativa incrociandosi coi traumi." },
            { icon: <LightningBoltIcon />, title: "Normalizzazioni Microbiologiche Intestinali e Assestamento Menopausale Turbolento.", desc: "Per donne travolte dai crolli da svuotamento ormonale post menopausa inficiate dalle secchezze vulvari indurite dal prolasso con le caldane impazzite o quadri devastanti da sindrome del colon perennemente infiammato o fibromialgie sfurenti silenziate malamente dai classici antidolorifici blandi inermi." },
            { title: "Definizione del Target di Ricomposizione Somatica e Abbattimento dei Finti Grasso/Ritenzione Estetici", desc: "Non basta semplicemente far calare il peso a stecca intaccando la preziosissima stabilità muscolare perdendo acqua: il compito sacro e scientifico è mantenere e preservare spietatamente l'ossatura tonica distruggendo specificatamente la molecola d'adipe e drenando gli incroci extracellulari linfatici incagliati senza le temute perdite ematiche spossate dei classici dimagrimenti errati da zero carboidrati punitivi e criminali." }
        ],
        specialists: [
            { name: "Elisa Cardinali", role: "Specialista Magistrale in Nutrizione Biologica", description: "Oltre tre lustri di titanica gestione delle carenze, ha un occhio istantaneo, analitico e non ingannabile riguardo le carenze fisiologiche patologiche inespresse. Distrugge falsi miti complottari terrorizzanti su proteine in polvere ed orrori dei media sull'indice glicemico terrorizzante offrendo pace alla pancia di pazienti estenuate, sempre in fortissimo sinergismo coi dottori che accerchiano i casi a 360 gradi e li guidano incrociando i super-poteri del network medico fisyo con sensibilità inarrivabile ma altissimo controllo scientifico dei parametri di tolleranza salutistici finali desiderati all'anamnesi.", image: "/images/real/elisa-cardinali-nutrizionista-e1766323699892.webp" }
        ],
        faq: [
            { q: "Risulta palesemente mandatorio che mi tocchi misurare con la famigerata ed odiosa bilancina elettronica grammata dell'inquisizione gli insipidi spaghetti pure sconditi bianchi come lenzuoli se accedo malauguratamente nel percorso curativo?!", a: "Soglia falsità zero: dipendentemente dai goals da infrangere non c'è obbligo o manette al controllo certosino di peso ossessivo a tavola per chi è logorato dalle vecchie prigioni mediche delle fobie. La Nutrizionista forgia approcci con interscambi equivalenti spannometrici qualitativi per chi rifugge il calcolo fobico, a meno di target sportivi d'eccellenza dove invece spaccare il fagiolo centesimale sia l'incrociatore del risultato iridato finale da spaccare sul traguardo." },
            { q: "Il dolore al ginocchio che si riacutizza ad eco infinito senza mai scomparire anche dopo infiniti tecar, pomate ed ultrasuoni fallimentari, si attenua miracolosamente cambiandosi il mangemare nel piatto caldo di casa?!?", a: "Pieno e roboante centro. Uno stato generale d'acidosi metabolica di fondo nutre silenziosamente il serbatoio velenoso biochimico in cui un banale insulto si radicalizza trasformandosi in un fuoco che inibisce o ritarda drammaticamente ed inutilmente gli sforzi meccanici e le leve geniali dei nostri fenomenali fisioterapisti d'eccellenza in campo aperto, rallentando colpevolmente i referti." },
            { q: "A livello meramente e volgarmente documentale e noioso d'anagrafica, è previsto categoricamente d'ottenere i test del sangue aggiornati per ricevere di consultazione primaria ambulatoriale specialistica d'apertura o bastano autocertificazioni?!?", a: "L'oro informativo non ha prezzo ed i prelievi con referto del test al computer fresco e puntellato ematico sotto i sei e disgraziatissimamente otto mesi fa costituisce grandissimo faro di rotta della salute. Eppure anche sprovvisti ci si approccia ai colloqui in totale scioltezza avvolti con garbo innamorandosi a passo e fiumi per volta dei concetti prima di tuffarsi sotto stress al prelievo forzoso burocratico della formuletta." }
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
                    <img
                        src={data.image}
                        alt={`Ambiente ${data.title}`}
                        decoding="async"
                        className="w-full h-full object-cover filter grayscale-[10%] group-hover:scale-105 transition-transform duration-[2s] ease-out"
                    />
                    <div className="absolute inset-0 bg-primary/10"></div>
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
