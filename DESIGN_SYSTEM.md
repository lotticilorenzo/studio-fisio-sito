# Studio Fisyo — Design System

Fonte di verità per ogni decisione visiva. Aggiornare questo file ogni volta che si introduce un nuovo pattern nel codice.

**Estetica di riferimento:** lusso organico, clinica premium, caldo e naturale. Mai freddo, mai ospedaliero, mai sterilmente minimal.

---

## 1. Colori

### Palette

| Token Tailwind | Hex | Ruolo semantico |
|---|---|---|
| `background` | `#F4EFE7` | Sfondo principale di ogni pagina |
| `primary` | `#24342C` | Testo principale, bottoni primari, sfondi scuri |
| `accent` | `#D9A43B` | CTA, highlight, icone, cursore selezione |
| `foreground` | `#1B241F` | Variante leggermente più scura di primary (corpo testo) |
| `surface` | `#FBF7F0` | Sfondo cards leggere, superfici interne |
| `line` | `#D8D0C4` | Bordi, divisori, linee sottili |

### Varianti opacity (pattern ricorrenti)

```
text-primary/60   → testo secondario su background chiaro
text-primary/68   → corpo testo standard  
text-primary/42   → label uppercase, eyebrow
text-primary/46   → eyebrow alternativo
text-background/62 → testo secondario su sfondo scuro
text-background/68 → corpo testo su sfondo scuro
text-background/36 → footer fine print
```

### Colori fuori palette (usati solo in specifici contesti)

- `#141c18` / `#121915` — footer, superfici ultra-scure (non usare altrove)
- `#f7f1e6` — variante calda per cards alternativa (caso d'uso e backgrounds)
- `#eadfce` / `#e9e0d3` — placeholder image background (warm nude)
- `bg-[linear-gradient(180deg,#f0e7da_0%,#f5efe7_46%,#ece4d7_100%)]` — Hero section background

### Regole colore

- **MAI** usare colori fuori dalla palette senza documentarli qui
- **MAI** testo bianco puro (`text-white`) su `bg-background` — usare `text-primary`
- `text-white` è ammesso **solo** su sfondi `bg-primary` o scuri (footer, OpenDay hero)
- L'`accent` (#D9A43B) non ha abbastanza contrasto come testo su `background` — non usarlo per testo body
- **Sempre** `text-primary` come default sui sfondi chiari

---

## 2. Tipografia

### Font stack

| Classe Tailwind | Font | Quando usarlo |
|---|---|---|
| `font-sans` | Plus Jakarta Sans → Outfit → sans-serif | Tutto il testo UI: body, heading H1–H3, bottoni, label |
| `font-drama` | Cormorant Garamond → serif | Accenti italici nelle headline; mai come testo leggibile a corpo |
| `font-mono` | IBM Plex Mono → monospace | Date, orari, countdown timer, dato numerico preciso |

### Heading pattern

```tsx
// H1 Hero (clamp responsive)
className="text-[clamp(3.25rem,7vw,5.6rem)] font-semibold leading-[0.94] tracking-[-0.06em] text-primary"

// H1 pagina interna
className="text-5xl md:text-7xl font-semibold leading-[0.96] tracking-[-0.06em] text-primary"

// H2 sezione
className="text-4xl md:text-6xl font-semibold leading-[0.98] tracking-[-0.05em] text-primary"

// H3 card
className="text-2xl md:text-3xl font-semibold tracking-[-0.04em] text-primary"
```

### Accento drama (pattern ricorrente)

```tsx
// Snippet italic accent alla fine di un H1/H2
<span className="font-drama italic font-normal text-accent"> si sente diverso.</span>
```

Il `font-drama` è sempre: `italic`, `font-normal`, colore `text-accent`. Mai bold, mai upright.

### Eyebrow label (sopra i titoli)

```tsx
<p className="mb-4 text-xs font-semibold uppercase tracking-[0.26em] text-primary/46">
  Perché sceglierci
</p>
```

Pattern fisso: `text-xs font-semibold uppercase tracking-[0.24em]–[0.28em] text-primary/42–/48`

### Corpo testo

```tsx
// Primario
className="text-lg leading-relaxed text-primary/68 md:text-xl"

// Secondario / didascalia
className="text-sm leading-relaxed text-primary/60"

// Micro label (dentro cards, badge)
className="text-xs uppercase tracking-[0.22em] text-primary/42"
```

### Regole tipografia

- **MAI** `font-drama` per testi leggibili a lunghezza (blocchi di paragrafo)
- Leading per heading: sempre `leading-[0.94]`–`leading-[0.98]` (tight)
- Leading per body: sempre `leading-relaxed` (1.625)
- Tracking per heading: **negativo**, da `tracking-[-0.04em]` a `tracking-[-0.06em]`
- Tracking per label uppercase: **positivo**, da `tracking-[0.22em]` a `tracking-[0.28em]`

---

## 3. Border Radius

| Classe | Valore | Quando usarlo |
|---|---|---|
| `rounded-full` | 9999px | Badge pill, bottoni (MagneticButton), avatar |
| `rounded-[1.8rem]` | ~29px | Accordion items, elementi compatti |
| `rounded-[2rem]` | 32px (4xl custom) | Cards standard, approch items |
| `rounded-[2.2rem]` | 35px | Immagine interna al frame |
| `rounded-[2.3rem]`–`[2.4rem]` | ~37–38px | Cards glassmorphism standard |
| `rounded-[2.5rem]` | 40px (5xl custom) | Cards specialists |
| `rounded-[2.7rem]`–`[2.8rem]` | ~43–45px | Cards grandi (Features dark card, image frame) |
| `rounded-[3rem]` | 48px (6xl custom) | CTA block, Footer inner |

**Regola:** più grande è la card, più grande il radius. Non mescolare radius piccoli su elementi di dimensione grande.

---

## 4. Componenti Pattern

### 4.1 Card glassmorphism (light)

Carta su sfondo chiaro con blur.

```tsx
className="rounded-[2.4rem] border border-primary/8 bg-white/80 p-7 
           shadow-[0_24px_70px_-42px_rgba(31,42,36,0.18)] backdrop-blur-xl"
```

Variante con padding ridotto per grids dense:

```tsx
className="rounded-[2rem] border border-primary/8 bg-white/78 p-6 backdrop-blur-xl"
```

### 4.2 Image frame (glassmorphism con immagine interna)

Pattern: involucro traslucido + inner con immagine e radius leggermente inferiore.

```tsx
// Outer frame
<div className="overflow-hidden rounded-[2.8rem] border border-white/60 bg-white/60 p-3
                shadow-[0_34px_100px_-42px_rgba(30,38,33,0.35)] backdrop-blur-xl">
  // Inner image container
  <div className="relative aspect-[4/5] overflow-hidden rounded-[2.2rem] bg-[#e9e0d3]">
    <img className="h-full w-full object-cover object-center" />
  </div>
</div>
```

### 4.3 Card dark (primary bg)

Carta scura con immagine in overlay e gradient.

```tsx
<article className="relative overflow-hidden rounded-[2.7rem] border border-primary/8 bg-primary text-background">
  <div className="absolute inset-0">
    <img className="h-full w-full object-cover opacity-34 transition-transform duration-[1400ms] group-hover:scale-[1.04]" />
    <div className="absolute inset-0 bg-gradient-to-br from-primary/92 via-primary/82 to-[#162019]/94" />
  </div>
  <div className="relative flex h-full flex-col justify-between p-8 md:p-10 lg:p-12">
    {/* content */}
  </div>
</article>
```

### 4.4 Card warm neutral

Alternativa alle glassmorphism per sezioni "casi clinici" o varianti.

```tsx
className="rounded-[2rem] border border-primary/8 bg-[#f7f1e6] p-6"
```

### 4.5 CTA Block

Blocco CTA dark a tutta larghezza.

```tsx
<div className="mx-auto max-w-6xl overflow-hidden rounded-[3rem] border border-primary/10 bg-primary 
               px-8 py-14 text-background shadow-[0_36px_90px_-42px_rgba(36,52,44,0.48)] md:px-12 md:py-16 lg:px-16">
```

### 4.6 Bottoni (MagneticButton)

MagneticButton è **sempre** `rounded-full` per default. Si personalizza solo con le classi di colore/padding.

```tsx
// Primario (su sfondo chiaro)
<MagneticButton to="/contatti" className="bg-primary px-7 py-4 text-base font-semibold text-background">

// Accent CTA
<MagneticButton to="/contatti" className="bg-accent px-8 py-4 text-base font-semibold text-primary
                                          shadow-[0_18px_40px_-30px_rgba(217,164,59,0.55)]">

// Ghost su sfondo chiaro
<Link className="inline-flex items-center justify-center rounded-full border border-primary/12 
                 bg-white/65 px-7 py-4 text-base font-medium text-primary 
                 backdrop-blur-md transition-colors hover:bg-white">

// Ghost su sfondo scuro
<a className="inline-flex items-center justify-center rounded-full border border-white/12 
              bg-white/7 px-8 py-4 text-base font-medium text-background 
              transition-colors hover:bg-white/10">
```

### 4.7 Badge / Pill

```tsx
// Status badge (accent)
<div className="inline-flex items-center gap-3 rounded-full border border-accent/20 bg-accent/8 px-4 py-2">
  <span className="h-2 w-2 rounded-full bg-accent" />
  <span className="text-xs font-semibold uppercase tracking-[0.22em] text-accent/90">Label</span>
</div>

// Tag outline neutro
<span className="rounded-full border border-primary/8 bg-transparent px-4 py-2 text-sm text-primary/54">
  Tag
</span>

// Tag su sfondo scuro
<span className="rounded-full border border-white/12 bg-white/6 px-4 py-2 text-sm backdrop-blur-sm">
  Tag
</span>
```

### 4.8 Eyebrow + Heading (combo)

```tsx
<p className="mb-4 text-xs font-semibold uppercase tracking-[0.26em] text-primary/46">
  Sezione
</p>
<h2 className="text-4xl font-semibold leading-[0.98] tracking-[-0.05em] text-primary md:text-6xl">
  Titolo della sezione con 
  <span className="font-drama italic font-normal text-accent"> accento finale.</span>
</h2>
```

### 4.9 Accordion

```tsx
<div className="overflow-hidden rounded-[1.8rem] border border-primary/8 bg-white/80 backdrop-blur-xl">
  <button className="flex w-full items-center justify-between gap-5 px-6 py-5 text-left">
    <span className="text-base font-medium leading-snug text-primary md:text-lg">{question}</span>
    <ChevronDownIcon className="h-5 w-5 shrink-0 text-accent transition-transform" />
  </button>
  {/* AnimatePresence motion.div con height: 0 → auto */}
  <p className="border-t border-primary/6 px-6 pb-6 pt-4 text-base leading-relaxed text-primary/66" />
</div>
```

---

## 5. Spacing System

### Sezioni (py)

```
py-24 lg:py-32    → sezione standard
py-20 lg:py-28    → sezione compatta (CTA)
py-16 md:py-24    → sezione OpenDay
pt-28 sm:pt-32 lg:pt-36  → Hero (compensa navbar)
```

### Padding orizzontale (costante in tutto il sito)

```
px-6 lg:px-12
```

### Container principale

```
max-w-7xl mx-auto
```

### Max-width per testo

```
max-w-3xl   → h2 e intro testo
max-w-2xl   → paragrafi corpo
max-w-xl    → note secondarie
max-w-md    → caption / testi brevi
```

### Gap nelle griglie

```
gap-4    → items densi (approach cards, tags)
gap-6    → cards standard
gap-8    → grid principale con più whitespace
gap-10   → sezioni hero grid
gap-12   → grid footer
gap-14   → grid sezione con testo + immagine grande
```

### Margini interni alle sezioni

```
mb-14    → distanza tra header sezione e contenuto
mt-8     → sotto h1 hero per subtitle
mt-10    → sotto subtitle per CTAs
mt-16 / mt-20  → tra sezioni dello stesso componente page
```

---

## 6. Animazioni

### Framer Motion — easing standard

**Usare sempre questo cubic-bezier:**
```ts
ease: [0.16, 1, 0.3, 1]
```

È un custom ease-out aggressivo: parte lento, accelera e arriva morbidamente. Dà il senso di peso e qualità.

### Reveal scroll-triggered (pattern più comune)

```ts
const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
};

// Con stagger:
transition: { ...fadeUp.transition, delay: index * 0.08 }
```

### Entry animation (mount, senza scroll)

```ts
initial={{ opacity: 0, y: 24 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.8, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
```

Stagger multiplo in sequence: incrementa `delay` di 0.08s per ogni elemento.

### Accordion

```ts
// open
initial={{ height: 0, opacity: 0 }}
animate={{ height: 'auto', opacity: 1 }}
exit={{ height: 0, opacity: 0 }}
transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
```

### GSAP (usato nelle pagine OpenDay con ScrollTrigger)

```ts
// Reveal standard
gsap.fromTo(".element",
  { y: 20, opacity: 0 },
  { y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
    scrollTrigger: { trigger: comp.current, start: "top 75%" } }
)

// Timeline con overlap
tl.fromTo(".a", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 })
  .fromTo(".b", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.4")
```

ScrollTrigger è registrato globalmente in `App.tsx` — i componenti non devono importarlo.

### Parallax (Hero)

```ts
const { scrollY } = useScroll();
const textY = useTransform(scrollY, [0, 900], [0, 60]);    // testo scende lentamente
const imageY = useTransform(scrollY, [0, 900], [0, -40]);  // immagine sale lentamente
```

### Hover su immagini card dark

```tsx
className="transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
```

1400ms è deliberatamente lento — sembra che l'immagine "respiri".

### Regole animazione

- **MAI** `ease: "linear"` — non rispecchia l'estetica
- **MAI** `duration` superiore a 1s per reveal singoli (eccezione: image hover 1400ms)
- `viewport: { once: true }` — gli elementi non si re-animano in scroll-up
- Rispettare `prefers-reduced-motion` — il CSS in `index.css` setta `animation-duration: 0.01ms` globalmente quando attivo

---

## 7. Background e texture

### Sfondo body (globale)

```css
background-image:
  radial-gradient(circle at top left, rgba(217, 164, 59, 0.1), transparent 30%),
  radial-gradient(circle at bottom right, rgba(36, 52, 44, 0.08), transparent 28%),
  linear-gradient(180deg, rgba(255, 255, 255, 0.55), rgba(255, 255, 255, 0));
```

Applicato automaticamente via `body` in `index.css`.

### Noise overlay (effetto carta/texture)

```tsx
<div className="noise-overlay" aria-hidden="true" />
```

Classe in `index.css`: SVG fractalNoise, `opacity: 0.035`, `mix-blend-mode: multiply`. Applicato in `App.tsx` a livello globale — non duplicare.

### Page aura (sommità pagine interne)

```tsx
<div className="page-aura" aria-hidden="true" />
```

Gradiente radiale in cima: `rgba(217, 164, 59, 0.12)` a sinistra + `rgba(36, 52, 44, 0.12)` a destra. Sfuma verso il basso con `mask-image`.

### Blob decorativi nelle sezioni

```tsx
// Pattern standard glow blob
<div className="absolute left-[12%] top-[14%] h-48 w-48 rounded-full bg-accent/12 blur-3xl pointer-events-none" />
<div className="absolute bottom-[8%] right-[10%] h-64 w-64 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
```

Sempre: `pointer-events-none`, `aria-hidden="true"` sul contenitore, `absolute` con `z-0`.

---

## 8. Ombre (shadows)

| Contesto | Shadow |
|---|---|
| Card glassmorphism standard | `shadow-[0_24px_70px_-42px_rgba(31,42,36,0.18)]` |
| Card glassmorphism forte | `shadow-[0_30px_80px_-44px_rgba(31,42,36,0.24)]` |
| Image frame | `shadow-[0_34px_100px_-42px_rgba(30,38,33,0.35)]` |
| CTA block | `shadow-[0_36px_90px_-42px_rgba(36,52,44,0.48)]` |
| Bottone primary | `shadow-[0_22px_50px_-28px_rgba(36,52,44,0.45)]` |
| Bottone accent | `shadow-[0_18px_40px_-30px_rgba(217,164,59,0.55)]` |

Le ombre usano sempre: **blur grande, spread negativo, opacità bassa**. Non usare ombre a bordo netto (`box-shadow: 0 2px 4px black`).

---

## 9. Immagini

### Attributi obbligatori

Ogni `<img>` deve avere:

```tsx
<img
  src="/images/example.webp"
  alt="Descrizione accessibile"
  width={900}
  height={1125}
  loading="lazy"    // oppure "eager" per LCP
  decoding="async"
  className="..."
/>
```

### Quando usare `loading="eager"`

- Immagine above-the-fold visibile al primo caricamento (LCP candidate)
- Hero principale di ogni pagina
- Aggiungere anche `fetchPriority="high"` per la singola immagine LCP principale

### Aspect ratio standard

- Foto professionisti / team: `aspect-[4/5]` o `aspect-[4/4.5]`
- Hero image: `aspect-[4/5]` sm, `aspect-[5/6]` lg
- Servizi hero: `aspect-[4/4.3]`

### Placeholder image background

```tsx
<div className="bg-[#eadfce]">
  <img ... />
</div>
```

Usare `#eadfce` come sfondo del contenitore immagine — colore warm nude coerente mentre l'immagine carica.

---

## 10. Accessibilità

### Focus

```css
:where(a, button, input, textarea, select, [tabindex]):focus-visible {
  outline: 3px solid rgba(217, 164, 59, 0.95);
  outline-offset: 3px;
}
```

Definito in `index.css` — non sovrascrivere con `outline-none` senza aggiungere un focus custom.

### Text selection

```css
::selection { background-color: #d9a43b; color: #24342c; }
```

### Reduced motion

Tutte le animazioni sono azzerate via CSS quando `prefers-reduced-motion: reduce` è attivo. Non aggiungere animazioni in JavaScript che bypassano il CSS.

### Pattern aria

- Elementi decorativi: `aria-hidden="true"` (blob, noise, sfondi)
- Bottoni icona-only: `aria-label="..."`
- Sezione di navigazione mobile: `role="group" aria-label="Prenota il tuo posto"`

---

## 11. Regole da NON violare

1. **MAI** testo bianco puro su `bg-background` — non ha contrasto sufficiente
2. **MAI** colori fuori palette — neanche grigi system (`gray-500`); usare opacity di `primary`
3. **MAI** `ease: "linear"` per transizioni visibili all'utente
4. **MAI** `border-radius` inferiore a `rounded-[1.8rem]` per cards visibili (non per input)
5. **MAI** `font-drama` per blocchi di testo leggibili — solo per accenti headline
6. **MAI** `<img>` senza `width`, `height`, `loading`, `decoding` — causa CLS
7. **MAI** ombre a bordo netto — usare sempre blur grande e spread negativo
8. **MAI** rimuovere il `noise-overlay` o il `page-aura` — sono parte dell'estetica
9. **MAI** aggiungere colori con nomi `blue`, `red`, `green` dalle palette Tailwind default — eccezione: stati di errore (`red-500`) nei form
10. **MAI** `outline-none` senza sostituire il focus style — accessibilità obbligatoria

---

## 12. Grid e Layout

### Container standard

```tsx
<section className="px-6 py-24 lg:px-12 lg:py-32">
  <div className="mx-auto max-w-7xl">
    {/* content */}
  </div>
</section>
```

### Grid asimmetrico (testo + immagine)

```tsx
// Testo leggermente più largo
className="grid gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]"

// Immagine più larga
className="grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]"
```

### Grid 12 colonne (Features)

```tsx
<div className="grid gap-6 lg:grid-cols-12 lg:grid-rows-[minmax(0,1fr)_minmax(0,1fr)]">
  <article className="lg:col-span-7 lg:row-span-2"> {/* card grande */} </article>
  <article className="lg:col-span-5">               {/* card piccola top */} </article>
  <article className="lg:col-span-5">               {/* card piccola bottom */} </article>
</div>
```
