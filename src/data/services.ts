import {
  ActivityLogIcon,
  GearIcon,
  HeartIcon,
  LightningBoltIcon,
  MixIcon,
  PersonIcon,
  SunIcon,
  TargetIcon,
} from '@radix-ui/react-icons';

type IconType = typeof GearIcon;

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface ServicePoint {
  title: string;
  body: string;
  icon: IconType;
}

export interface ServiceSpecialist {
  name: string;
  role: string;
  description: string;
  image: string;
}

export interface ServiceData {
  id: string;
  title: string;
  label: string;
  summary: string;
  subtitle: string;
  image: string;
  imageAlt: string;
  icon: IconType;
  highlights: string[];
  intro: string[];
  approach: ServicePoint[];
  cases: ServicePoint[];
  specialists: ServiceSpecialist[];
  faqs: ServiceFAQ[];
}

export const services: ServiceData[] = [
  {
    id: 'fisioterapia',
    title: 'Fisioterapia e riabilitazione funzionale',
    label: 'Percorso clinico',
    summary:
      'Valutazione, terapia manuale ed esercizio terapeutico dentro un percorso costruito sul tuo caso.',
    subtitle:
      'Per chi vuole togliere dolore, recuperare movimento e capire come non tornare sempre allo stesso punto.',
    image: '/images/real/fisioterapia_studio_fisyo.webp',
    imageAlt: 'Una fisioterapista al lavoro durante un trattamento manuale.',
    icon: GearIcon,
    highlights: ['Dolore acuto o cronico', 'Recupero post intervento', 'Lavoro attivo sul movimento'],
    intro: [
      'Partiamo da quello che senti oggi, ma il lavoro non finisce quando il dolore si abbassa. Guardiamo come ti muovi, cosa ti limita e quali abitudini stanno tenendo acceso il problema.',
      'L obiettivo e semplice. Farti tornare a muoverti bene, con meno paura e piu autonomia nella vita di tutti i giorni.',
    ],
    approach: [
      {
        title: 'Valutazione chiara',
        body: 'Ascoltiamo sintomi, storia clinica, obiettivi e referti. Da qui nasce un piano di lavoro realistico.',
        icon: TargetIcon,
      },
      {
        title: 'Trattamento mirato',
        body: 'Usiamo terapia manuale ed esercizio terapeutico per ridurre dolore, rigidita e compensi.',
        icon: ActivityLogIcon,
      },
      {
        title: 'Continuita a casa',
        body: 'Ti lasciamo indicazioni semplici e utili, cosi il lavoro fatto in studio continua davvero.',
        icon: LightningBoltIcon,
      },
    ],
    cases: [
      {
        title: 'Schiena, cervicale e articolazioni',
        body: 'Lombalgia, cervicalgia, spalla, ginocchio e tutti quei dolori che limitano il movimento o tornano di frequente.',
        icon: GearIcon,
      },
      {
        title: 'Post operatorio',
        body: 'Un percorso guidato dopo un intervento per recuperare mobilita, forza e sicurezza nei gesti quotidiani.',
        icon: SunIcon,
      },
      {
        title: 'Sport e sovraccarichi',
        body: 'Quando il corpo va ascoltato prima di rientrare davvero a correre, allenarsi o tornare in campo.',
        icon: ActivityLogIcon,
      },
    ],
    specialists: [
      {
        name: 'Beatrice Grassi',
        role: 'Fisioterapista',
        description:
          'Segue percorsi di riabilitazione con attenzione al movimento, alla progressione degli esercizi e a quello che la persona deve ritrovare nella vita reale.',
        image: '/images/real/beatricegrassi.webp',
      },
      {
        name: 'Elisa Caggiati',
        role: 'Fisioterapista',
        description:
          'Lavora su dolore, recupero ortopedico e terapia manuale con un approccio preciso, concreto e sempre adattato al caso.',
        image: '/images/real/elisacaggiati.webp',
      },
    ],
    faqs: [
      {
        question: 'Serve la prescrizione medica?',
        answer:
          'Per un trattamento privato no. Se hai referti o esami recenti, portali con te alla prima visita.',
      },
      {
        question: 'Quanto dura una seduta?',
        answer:
          'Di solito tra 50 e 60 minuti. Il tempo cambia in base al lavoro da fare e alla fase del percorso.',
      },
      {
        question: 'Fate anche esercizi oltre al trattamento manuale?',
        answer:
          'Si. Per noi e una parte fondamentale del percorso, soprattutto quando vogliamo consolidare il risultato e prevenire ricadute.',
      },
    ],
  },
  {
    id: 'pilates-clinico',
    title: 'Pilates clinico',
    label: 'Movimento guidato',
    summary:
      'Un lavoro sul corpo condotto da fisioterapiste, pensato per postura, controllo e continuita nel movimento.',
    subtitle:
      'Non una lezione standard, ma un lavoro guidato su respirazione, controllo e qualita del gesto.',
    image: '/images/real/staff-valentina-corradi-pilates-clinico-studio-fisyo.webp',
    imageAlt: 'La fisioterapista che segue una seduta di pilates clinico.',
    icon: MixIcon,
    highlights: ['Piccoli gruppi', 'Controllo posturale', 'Guidato da fisioterapiste'],
    intro: [
      'Il Pilates Clinico e utile quando hai bisogno di rimettere ordine nel movimento, non solo di fare attivita fisica. Ti aiuta a sentire meglio il corpo, distribuire meglio il carico e lavorare con piu continuita.',
      'E adatto sia a chi convive con dolore o rigidita, sia a chi vuole riprendere a muoversi in modo piu consapevole dopo una fase delicata.',
    ],
    approach: [
      {
        title: 'Ingresso valutato',
        body: 'Partiamo sempre da una valutazione, cosi sappiamo da dove iniziare e cosa evitare.',
        icon: TargetIcon,
      },
      {
        title: 'Lavoro preciso',
        body: 'Respirazione, allineamento, controllo e forza profonda. Ogni parte della lezione ha un senso.',
        icon: MixIcon,
      },
      {
        title: 'Progressione graduale',
        body: 'Il carico cresce quando il corpo e pronto. Senza fretta e senza farti inseguire esercizi che non ti appartengono.',
        icon: LightningBoltIcon,
      },
    ],
    cases: [
      {
        title: 'Postura e schiena',
        body: 'Utile quando senti rigidita, instabilita o affaticamento continuo nella zona lombare e dorsale.',
        icon: ActivityLogIcon,
      },
      {
        title: 'Ripresa dopo il dolore',
        body: 'Aiuta a tornare al movimento con gradualita quando non te la senti ancora di ripartire da solo.',
        icon: SunIcon,
      },
      {
        title: 'Prevenzione',
        body: 'Per chi vuole mantenere un buon equilibrio, muoversi meglio e lavorare sul corpo con costanza.',
        icon: TargetIcon,
      },
    ],
    specialists: [
      {
        name: 'Valentina Corradi',
        role: 'Fisioterapista',
        description:
          'Segue il Pilates Clinico con attenzione al dettaglio, alla qualita del gesto e alla sicurezza del percorso.',
        image: '/images/real/staff-valentina-corradi-pilates-clinico-studio-fisyo.webp',
      },
    ],
    faqs: [
      {
        question: 'Posso iniziare anche se non ho mai fatto Pilates?',
        answer:
          'Si. Il percorso nasce proprio per accompagnarti passo dopo passo, senza richiedere esperienza precedente.',
      },
      {
        question: 'E adatto se ho male alla schiena?',
        answer:
          'Spesso si, ma prima va capito in che fase sei e che cosa sta succedendo. Per questo partiamo sempre da una valutazione.',
      },
      {
        question: 'Le sedute sono individuali o di gruppo?',
        answer:
          'Lavoriamo in modo individuale o in piccoli gruppi, cosi possiamo seguirti davvero durante gli esercizi.',
      },
    ],
  },
  {
    id: 'salute-donna',
    title: 'Salute della donna',
    label: 'Area dedicata',
    summary:
      'Uno spazio di lavoro riservato per pavimento pelvico, gravidanza, post parto e benessere femminile.',
    subtitle:
      'Un percorso delicato, competente e rispettoso dei tempi con cui ogni donna sceglie di farsi seguire.',
    image: '/images/real/salute_donna.webp',
    imageAlt: 'Un trattamento dedicato alla salute della donna.',
    icon: HeartIcon,
    highlights: ['Pavimento pelvico', 'Gravidanza e post parto', 'Ascolto riservato'],
    intro: [
      'Ci sono sintomi che molte donne tengono per se troppo a lungo. Dolore, peso pelvico, fastidi dopo il parto, difficolta legate al pavimento pelvico o al cambiamento del corpo.',
      'Qui trovi un ambiente riservato e una professionista che sa come affrontare questi temi con delicatezza, chiarezza e rispetto.',
    ],
    approach: [
      {
        title: 'Colloquio e valutazione',
        body: 'Prima di tutto ascolto. Capire il contesto e il vissuto e parte del lavoro clinico.',
        icon: PersonIcon,
      },
      {
        title: 'Percorso guidato',
        body: 'Il trattamento viene costruito sul momento della vita che stai attraversando e su quello che senti oggi.',
        icon: HeartIcon,
      },
      {
        title: 'Collaborazione interna',
        body: 'Quando serve, il percorso si integra con le altre professioniste dello studio in modo semplice.',
        icon: MixIcon,
      },
    ],
    cases: [
      {
        title: 'Pavimento pelvico',
        body: 'Perdite, pesantezza, dolore o bisogno di ritrovare controllo e consapevolezza in una zona delicata.',
        icon: HeartIcon,
      },
      {
        title: 'Gravidanza',
        body: 'Per accompagnare il corpo che cambia, alleggerire i fastidi e lavorare in modo protetto sul movimento.',
        icon: SunIcon,
      },
      {
        title: 'Post parto',
        body: 'Per ricominciare con ordine, ascoltare il corpo e ritrovare stabilita nel tempo giusto.',
        icon: ActivityLogIcon,
      },
    ],
    specialists: [
      {
        name: 'Elisa Zanacca',
        role: 'Ostetrica',
        description:
          'Accompagna le donne con un approccio attento, rispettoso e molto concreto, dal pavimento pelvico al post parto.',
        image: '/images/real/fotoostetrica.webp',
      },
    ],
    faqs: [
      {
        question: 'La prima visita puo mettermi a disagio. Come funziona?',
        answer:
          'Si parte sempre da un colloquio. Ogni passaggio viene spiegato e nulla viene fatto senza il tuo consenso.',
      },
      {
        question: 'Posso iniziare anche a distanza di tempo dal parto?',
        answer:
          'Si. Molte donne iniziano anche mesi o anni dopo, quando sentono che e arrivato il momento giusto.',
      },
      {
        question: 'Serve avere gia una diagnosi?',
        answer:
          'Non necessariamente. La prima visita serve anche a capire meglio da dove partono i sintomi.',
      },
    ],
  },
  {
    id: 'linfodrenaggio',
    title: 'Linfodrenaggio manuale',
    label: 'Terapia decongestiva',
    summary:
      'Un trattamento delicato e preciso per gonfiore, ristagno, fase post operatoria e bisogno di alleggerire i tessuti.',
    subtitle:
      'Non un massaggio generico, ma un lavoro clinico fatto con tecnica, attenzione e tempi corretti.',
    image: '/images/real/linfodrenaggiobendaggigambe.webp',
    imageAlt: 'Una seduta di linfodrenaggio manuale.',
    icon: MixIcon,
    highlights: ['Edemi e gonfiore', 'Post operatorio', 'Manualita delicata'],
    intro: [
      'Quando i tessuti sono gonfi, pesanti o in una fase delicata del recupero, servono mani esperte e una tecnica rispettosa. Il linfodrenaggio manuale lavora proprio li.',
      'E un trattamento utile in diversi momenti, dal post operatorio al gonfiore persistente, sempre con un ritmo delicato e un obiettivo chiaro.',
    ],
    approach: [
      {
        title: 'Valutazione del quadro',
        body: 'Capire da dove nasce il gonfiore e in che fase sei e il primo passo per scegliere il ritmo giusto.',
        icon: TargetIcon,
      },
      {
        title: 'Tecnica manuale',
        body: 'Il trattamento e leggero, progressivo e rispettoso dei tessuti. Non deve essere aggressivo per essere efficace.',
        icon: MixIcon,
      },
      {
        title: 'Indicazioni pratiche',
        body: 'Quando serve, affianchiamo consigli semplici su gestione quotidiana, bendaggio o continuita del percorso.',
        icon: LightningBoltIcon,
      },
    ],
    cases: [
      {
        title: 'Post operatorio',
        body: 'Per aiutare i tessuti a sgonfiarsi e accompagnare una fase di recupero che richiede delicatezza.',
        icon: SunIcon,
      },
      {
        title: 'Gonfiore e pesantezza',
        body: 'Quando senti gambe o braccia piu tese, pesanti o segnate dal ristagno.',
        icon: ActivityLogIcon,
      },
      {
        title: 'Percorsi piu lunghi',
        body: 'Per chi ha bisogno di continuita e di una gestione costante nel tempo, con obiettivi realistici.',
        icon: TargetIcon,
      },
    ],
    specialists: [
      {
        name: 'Elisa Caggiati',
        role: 'Fisioterapista',
        description:
          'Segue i percorsi di linfodrenaggio manuale con mano leggera, precisione tecnica e grande attenzione alla fase in cui si trova la persona.',
        image: '/images/real/elisacaggiati2.webp',
      },
    ],
    faqs: [
      {
        question: 'Il trattamento e doloroso?',
        answer:
          'No. Il lavoro e delicato e viene adattato alla sensibilita dei tessuti e al momento del recupero.',
      },
      {
        question: 'Quante sedute servono?',
        answer:
          'Dipende dalla causa del gonfiore e da come risponde il corpo. Lo capiamo insieme dopo la prima valutazione.',
      },
      {
        question: 'Serve sempre il bendaggio?',
        answer:
          'Non sempre. Viene proposto solo quando puo essere davvero utile al percorso.',
      },
    ],
  },
  {
    id: 'psicologia',
    title: 'Psicologia e psicoterapia',
    label: 'Spazio di ascolto',
    summary:
      'Un percorso per dare ordine a stanchezza, ansia, fatica emotiva o momenti in cui il corpo e la testa non vanno piu nella stessa direzione.',
    subtitle:
      'Perche a volte il benessere cambia davvero quando qualcuno ti aiuta a mettere a fuoco quello che stai vivendo.',
    image: '/images/real/psicologia.webp',
    imageAlt: 'Uno spazio dedicato all ascolto psicologico.',
    icon: LightningBoltIcon,
    highlights: ['Ansia e stress', 'Supporto emotivo', 'Percorsi individuali'],
    intro: [
      'Non sempre si arriva in studio con un bisogno solo fisico. A volte il dolore pesa anche sulla testa. A volte e il contrario.',
      'Avere uno spazio di ascolto puo aiutare a rimettere ordine, prendere fiato e capire come affrontare meglio quello che stai vivendo.',
    ],
    approach: [
      {
        title: 'Colloquio iniziale',
        body: 'Serve a capire che cosa stai attraversando e se questo e il percorso giusto per te in questo momento.',
        icon: PersonIcon,
      },
      {
        title: 'Percorso condiviso',
        body: 'Gli incontri seguono un obiettivo chiaro e rispettano i tuoi tempi, senza forzature.',
        icon: TargetIcon,
      },
      {
        title: 'Lavoro integrato',
        body: 'Quando ha senso, il supporto psicologico puo camminare accanto agli altri percorsi dello studio.',
        icon: MixIcon,
      },
    ],
    cases: [
      {
        title: 'Stress e ansia',
        body: 'Quando la tensione prende spazio nel quotidiano e senti di avere bisogno di un posto in cui fermarti e capire meglio.',
        icon: LightningBoltIcon,
      },
      {
        title: 'Dolore e fatica emotiva',
        body: 'Quando un disturbo fisico ti accompagna da tanto tempo e comincia a pesare anche sul modo in cui vivi le giornate.',
        icon: ActivityLogIcon,
      },
      {
        title: 'Fasi di cambiamento',
        body: 'Quando stai attraversando un momento delicato e senti il bisogno di un confronto professionale.',
        icon: SunIcon,
      },
    ],
    specialists: [
      {
        name: 'Valentina Mazza',
        role: 'Psicologa clinica',
        description:
          'Accoglie le persone con uno sguardo attento e concreto, costruendo percorsi che aiutano a dare forma a cio che oggi pesa di piu.',
        image: '/images/real/staff-valentina-mazza-fisioterapista-studio-fisyo.webp',
      },
    ],
    faqs: [
      {
        question: 'Devo avere gia le idee chiare per iniziare?',
        answer:
          'No. Spesso si comincia proprio da una sensazione confusa o da una fatica che non sai ancora raccontare bene.',
      },
      {
        question: 'Quanto dura un percorso?',
        answer:
          'Dipende dal bisogno e dall obiettivo. Dopo i primi incontri capiamo insieme che forma puo avere.',
      },
      {
        question: 'Il percorso puo affiancare fisioterapia o altri trattamenti?',
        answer:
          'Si, quando ha senso puo diventare un supporto utile anche dentro un lavoro piu ampio sul benessere.',
      },
    ],
  },
  {
    id: 'fisio4young',
    title: 'Fisio4Young',
    label: 'Eta evolutiva',
    summary:
      'Un percorso dedicato a bambini e ragazzi per postura, crescita, movimento e recupero dopo piccoli o grandi stop.',
    subtitle:
      'Per seguire il corpo mentre cresce, senza aspettare che un fastidio diventi un limite vero.',
    image: '/images/real/esercizibambinifisioterapia.webp',
    imageAlt: 'Una seduta dedicata al movimento in eta evolutiva.',
    icon: SunIcon,
    highlights: ['Bambini e ragazzi', 'Postura e crescita', 'Rientro allo sport'],
    intro: [
      'Quando il corpo cambia in fretta, anche piccoli segnali meritano attenzione. Dolori ricorrenti, movimenti alterati, fatica nello sport o dubbi sulla postura possono essere affrontati prima che si consolidino.',
      'Il lavoro con bambini e ragazzi richiede ascolto, chiarezza e il giusto modo di entrare in relazione. Anche questo fa parte della cura.',
    ],
    approach: [
      {
        title: 'Osservazione e confronto',
        body: 'Capire come si muove il ragazzo e cosa notano famiglia, scuola o allenatori e il primo passo.',
        icon: PersonIcon,
      },
      {
        title: 'Lavoro adatto all eta',
        body: 'Gli esercizi vengono proposti in modo semplice, concreto e adatto a chi li deve fare davvero.',
        icon: SunIcon,
      },
      {
        title: 'Obiettivi chiari',
        body: 'Piu sicurezza nel corpo, meno fastidi e un ritorno al movimento fatto con i tempi giusti.',
        icon: TargetIcon,
      },
    ],
    cases: [
      {
        title: 'Postura e crescita',
        body: 'Quando ci sono dubbi sulla postura o segnali che vale la pena osservare con attenzione.',
        icon: ActivityLogIcon,
      },
      {
        title: 'Sport',
        body: 'Per recuperare bene dopo un infortunio o per gestire sovraccarichi che si ripresentano.',
        icon: LightningBoltIcon,
      },
      {
        title: 'Movimento quotidiano',
        body: 'Per accompagnare il ragazzo a sentirsi piu sicuro, coordinato e libero nei gesti di tutti i giorni.',
        icon: MixIcon,
      },
    ],
    specialists: [
      {
        name: 'Beatrice Grassi',
        role: 'Fisioterapista',
        description:
          'Lavora con bambini e ragazzi cercando sempre il giusto equilibrio tra precisione clinica, ascolto e modo di comunicare.',
        image: '/images/real/beatricegrassi.webp',
      },
    ],
    faqs: [
      {
        question: 'Quando ha senso fare una prima valutazione?',
        answer:
          'Quando noti dolore ricorrente, stanchezza nel movimento, postura che ti lascia perplesso o un recupero che non procede bene.',
      },
      {
        question: 'Serve la presenza di un genitore?',
        answer:
          'Nella prima fase si, per raccogliere bene la storia e costruire un percorso condiviso.',
      },
      {
        question: 'Gli esercizi vengono adattati all eta?',
        answer:
          'Sempre. Il lavoro deve essere comprensibile, sostenibile e adatto a chi lo sta facendo.',
      },
    ],
  },
  {
    id: 'nutrizione',
    title: 'Nutrizione clinica',
    label: 'Percorso alimentare',
    summary:
      'Un supporto concreto per ritrovare equilibrio nel rapporto con il cibo, con il corpo e con alcuni bisogni clinici specifici.',
    subtitle:
      'Per lavorare su alimentazione e benessere in modo serio, senza rigidita inutili e senza soluzioni standard.',
    image: '/images/real/elisa-cardinali-nutrizionista-e1766323699892.webp',
    imageAlt: 'La nutrizionista dello studio durante un incontro.',
    icon: HeartIcon,
    highlights: ['Piani personalizzati', 'Obiettivi realistici', 'Collaborazione con il team'],
    intro: [
      'Mangiare meglio non significa vivere in controllo continuo. Un percorso nutrizionale fatto bene ti aiuta a capire cosa ti serve davvero e come portarlo dentro la tua vita.',
      'Quando serve, la nutrizione si integra con gli altri percorsi dello studio. Questo rende il lavoro piu coerente e spesso piu sostenibile nel tempo.',
    ],
    approach: [
      {
        title: 'Ascolto delle abitudini',
        body: 'Partiamo da routine, obiettivi, gusti, tempi della giornata e bisogni clinici reali.',
        icon: PersonIcon,
      },
      {
        title: 'Piano su misura',
        body: 'Le indicazioni sono costruite per essere pratiche, leggibili e compatibili con la tua vita.',
        icon: HeartIcon,
      },
      {
        title: 'Verifiche nel tempo',
        body: 'Ci rivediamo per capire cosa funziona, cosa pesa troppo e dove aggiustare il percorso.',
        icon: ActivityLogIcon,
      },
    ],
    cases: [
      {
        title: 'Equilibrio e benessere',
        body: 'Per sentirti piu stabile, piu leggero e meno in lotta con l alimentazione.',
        icon: SunIcon,
      },
      {
        title: 'Obiettivi specifici',
        body: 'Quando vuoi lavorare su composizione corporea, energia o gestione di una fase particolare.',
        icon: TargetIcon,
      },
      {
        title: 'Percorsi integrati',
        body: 'Quando il lavoro nutrizionale puo sostenere fisioterapia, movimento o altri obiettivi di salute.',
        icon: MixIcon,
      },
    ],
    specialists: [
      {
        name: 'Elisa Cardinali',
        role: 'Biologa nutrizionista',
        description:
          'Costruisce percorsi alimentari chiari e sostenibili, con attenzione al quadro clinico e alla vita concreta della persona.',
        image: '/images/real/elisa-cardinali-nutrizionista-e1766323699892.webp',
      },
    ],
    faqs: [
      {
        question: 'Il piano alimentare e molto rigido?',
        answer:
          'No. L obiettivo e trovare una struttura che funzioni davvero nella tua quotidianita.',
      },
      {
        question: 'Devo arrivare con esami del sangue recenti?',
        answer:
          'Possono essere utili, ma non sono sempre indispensabili per iniziare un primo confronto.',
      },
      {
        question: 'Posso affiancare la nutrizione a un altro percorso dello studio?',
        answer:
          'Si. Quando ha senso, il lavoro nutrizionale si integra bene con fisioterapia, movimento o altri bisogni specifici.',
      },
    ],
  },
];

export const servicesById = Object.fromEntries(
  services.map((service) => [service.id, service]),
) as Record<string, ServiceData>;
