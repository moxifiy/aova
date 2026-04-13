"use client";

import { useEffect, useRef, useState, createContext, useContext } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useMotionTemplate, useSpring, useInView } from "framer-motion";
import { getCalApi } from "@calcom/embed-react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

const HeroLogo3D = dynamic<{ isDark: boolean }>(() => import("@/components/HeroLogo3D"), { ssr: false });
import Folder from '@/components/Folder';
import ThemeToggle from '@/components/ThemeToggle';
import CustomCursor from '@/components/CustomCursor';




/* ================================================================
   TRANSLATIONS
   ================================================================ */
type Lang = 'en' | 'cz';
const LangContext = createContext<Lang>('en');
const useT = () => T[useContext(LangContext)];

const T = {
  en: {
    nav: { work: 'Work', services: 'Services', process: 'Process', book: 'Book' },
    hero: {
      prefix: 'Design studio for',
      brands: 'brands',
      creators: 'creators',
      tagline: "Not an agency. Not a freelancer. A studio that treats your project like it's our own, and delivers like it.",
      cta: 'Reserve your spot',
    },
    marquee: [
      "Connecting selected creatives to selective brands.",
      "Where the right creators find the right canvas.",
      "Igniting brand potential with top-tier creative minds.",
      "Bespoke matchmaking for the creative industry.",
    ],
    work: {
      heading: 'Selected Work',
      sub: 'Immersion, identity, and scale built for the next generation of creative businesses.',
      archive: 'View Complete Archive',
    },
    services: {
      heading: 'Who are we building for?',
      creator: {
        tabLabel: 'For Creators',
        heroTitle: 'Content that grows. Channels that last.',
        heroDesc: "AOVA handles the full creative pipeline for creators — from zero-retention editing to algorithmic growth strategy. You focus on the camera, we build the engine.",
        cards: [
          { title: "Starter Pack", desc: "Full-spectrum content foundation.", features: ["1-2x longform videos", "6x shortform", "Basic repurposing (long → shorts)", "2 thumbnails per video", "Basic thumbnail style direction", "Mini content plan (1-2 weeks)", "10-15 hooks", "Basic posting plan"] },
          { title: "YouTube Engine", desc: "Full production & growth system.", features: ["4x longform videos", "10-15 shortform videos", "Full repurposing system", "Retention editing", "Narrative restructuring", "Hook optimization", "3–5 thumbnails per video", "Thumbnail system (style consistency)", "CTR-focused iteration", "Full content strategy blueprint", "30–50 hook library", "Content formats (repeatable structures)", "Competitor breakdown", "Content calendar"] },
          { title: "Scale Partner", desc: "Full-stack channel domination.", features: ["2x longform videos", "15–25 shortform videos", "Advanced repurposing (multi-platform)", "A/B shortform hooks", "Full narrative restructuring", "Storytelling optimization", "Pacing + retention engineering", "Full thumbnail system", "Continuous iteration based on performance", "Social assets (banners, posts)", "Full strategy system (pillars, positioning, tone/style)", "50–100 hook library", "Distribution strategy (YT / IG / TikTok split)", "Analytics + optimization loop", "CTA strategy", "Content → lead → sale funnel"] },
        ],
      },
      brand: {
        tabLabel: 'For Brands',
        heroTitle: 'Design that converts. Presence that compounds.',
        heroDesc: "AOVA builds brand infrastructure — not just visuals. We engineer systems that capture attention, drive action, and scale effortlessly as your business grows.",
        cards: [
          { title: "Brand Identity", desc: "You exist, now look like it.", features: ["Logo system (up to 5 concepts)", "Typography + color system", "Brand guidelines", "Social media kit", "Full ownership rights"] },
          { title: "Brand in Motion", desc: "Your identity, alive.", features: ["Everything in Pack 01", "Logo animation (intro + loop)", "Introduction video", "Motion system"] },
          { title: "Launch System", desc: "Built to go to market.", features: ["Everything in Pack 02", "Website design", "Social media template pack"] },
        ],
      },
      mostPopular: 'Most Popular',
      getStarted: 'Get Started',
      custom: {
        heading: "Can't find what you're looking for?",
        sub: "We don't just do packs. We also offer custom, standalone services tailored specifically to your individual needs.",
        items: [
          "Logo Design", "Brand Identity", "Landing Page", "App Icon Design", 
          "In-Game UI", "3D Modelling", "Brand Animation", "Motion Graphics", 
          "Animated Ad Creative", "Social Media Kit", "UI/UX Design", "Product Mockups"
        ],
        cta: "Request Custom Work"
      },
    },
    testimonials: {
      heading: 'Aova', accent: 'Love',
      sub: "Don't just take our word for it. Trusted by industry leaders constantly moving the needle.",
    },
    process: {
      heading: 'How it', accent: 'Works',
      sub: 'We keep things simple, transparent, and completely focused on your success.',
      steps: [
        { num: "01", title: "Discovery Call", desc: "We get on a call, learn your world, and figure out exactly what you need. No pitch, no pressure, just clarity." },
        { num: "02", title: "The Strategy", desc: "You get a clear plan: what we're building, how long it takes, and what it costs. Everything in writing before we touch a thing." },
        { num: "03", title: "The Build", desc: "We build. You stay in the loop at every milestone. Fast, intentional, and built to your standard, not ours." },
        { num: "04", title: "Handoff", desc: "Final assets, full ownership, and a roadmap for what's next. You walk away with everything you need to move." },
      ],
    },
    faq: {
      heading: 'Common', accent: 'Questions',
      getToKnow: 'Get to know us!',
      bookHeading: 'Book a 30-min\ndiscovery call',
      bookCta: 'Book a call',
      preferEmail: 'Prefer to email?',
      copied: 'Copied to clipboard',
      items: [
        { q: "What types of projects do you take on?", a: "We work across brand identity, UI/UX design, design systems, motion graphics, video production, and web development. We're selective — we take on fewer clients so each one gets our full attention and craft." },
        { q: "How long does a typical project take?", a: "Brand identity projects typically run 6–10 weeks. Web and product design engagements run 8–16 weeks. Video and motion work varies by scope, but most packages operate on a two-week sprint cadence." },
        { q: "What is your pricing structure?", a: "We work on a project-fee basis for one-off work, and a sprint retainer model for ongoing clients. Either way, you know the full cost upfront — no hourly billing, no surprises." },
        { q: "Do you work with early-stage brands?", a: "Yes. We have packages built specifically for founders and early-stage brands who need a strong foundation fast — brand identity, social kit, and motion assets — without the overhead of a full agency." },
        { q: "Who will I actually be working with?", a: "Leif and Kudy run every engagement directly. You'll deal with the founders on strategy, creative direction, and reviews — not account managers or junior staff. A production team handles execution under our oversight." },
        { q: "How does the sprint model work?", a: "We operate in two-week sprints. Each sprint starts with a scope call, we produce and deliver assets, then close with a review. Ongoing clients can book consecutive sprints at a locked retainer rate." },
        { q: "What does onboarding look like?", a: "It starts with a 30–45 minute discovery call. From there we build a strategy blueprint, present it to you, confirm scope, and kick off the first sprint — typically within a week of signing." },
        { q: "Can we work together on just one thing?", a: "Absolutely. You don't need a long-term commitment to start. We can suite a single project, deliver it, and go from there. A lot of our ongoing clients started with one sprint." },
        { q: "What if I need revisions?", a: "Revisions are part of the process, not a gotcha. We build feedback rounds into every sprint. For larger scopes, we align on revision rounds upfront so there's never ambiguity." },
        { q: "Do you handle distribution or posting?", a: "On the Creator Growth Engine side, yes — posting management and distribution strategy are available. On the Brand side, we'll give you distribution suggestions, but execution stays with your team." },
      ],
    },
    footer: {
      talkPrefix: "Let's t", talkExpand: "aaaaaa", talkSuffix: "lk",
      startProject: 'Start a project',
      allRights: 'All rights reserved.',
    },
  },
  cz: {
    nav: { work: 'Práce', services: 'Služby', process: 'Proces', book: 'Rezervovat' },
    hero: {
      prefix: 'Design studio pro',
      brands: 'značky',
      creators: 'tvůrce',
      tagline: "Nejsme agentura. Nejsme freelancer. Jsme studio, které k vašemu projektu přistupuje jako ke svému vlastnímu.",
      cta: 'Rezervujte místo',
    },
    marquee: [
      "Spojujeme výjimečné tvůrce s prémiovými značkami.",
      "Místo, kde správní tvůrci nacházejí své publikum.",
      "Akcelerujeme růst značek pomocí elitních kreativců.",
      "Design na míru pro novou generaci byznysu.",
    ],
    work: {
      heading: 'Vybrané projekty',
      sub: 'Identita a vizuální systémy pro novou generaci odvážných značek.',
      archive: 'Zobrazit celý archiv',
    },
    services: {
      heading: 'Pro koho stavíme?',
      creator: {
        tabLabel: 'Pro tvůrce',
        heroTitle: 'Obsah, který sbírá views. Kanály, které rostou.',
        heroDesc: "AOVA zajišťuje kompletní vizuální produkci pro tvůrce — od střihu pro maximální retenci až po vizuální styl miniatur. Vy se soustředíte na obsah, my stavíme vizuál.",
        cards: [
          { title: "Starter Pack", desc: "Kompletní obsahový základ.", features: ["1-2x dlouhá videa", "6x krátká videa", "Základní repurposing (dlouhé → krátké)", "2 miniatury na video", "Základní směr vizuálu miniatur", "Mini obsahový plán (1-2 týdny)", "10-15 háčků", "Základní plán zveřejňování"] },
          { title: "YouTube Engine", desc: "Kompletní produkce a systém růstu.", features: ["4x dlouhá videa", "10-15 krátkých videí", "Kompletní systém repurposingu", "Střih pro retenci", "Přestrukturování narace", "Optimalizace háčků", "3–5 miniatur na video", "Systém miniatur (konzistence stylu)", "Iterace zaměřená na CTR", "Kompletní blueprint obsahové strategie", "Knihovna 30–50 háčků", "Obsahové formáty (opakovatelné struktury)", "Analýza konkurence", "Obsahový kalendář"] },
          { title: "Scale Partner", desc: "Kompletní dominance kanálu.", features: ["2x dlouhá videa", "15–25 krátkých videí", "Pokročilý repurposing (multi-platforma)", "A/B háčky pro krátká videa", "Kompletní přestrukturování narace", "Optimalizace vyprávění", "Inženýring tempa a retence", "Kompletní systém miniatur", "Průběžná iterace na základě výkonu", "Sociální podklady (bannery, příspěvky)", "Kompletní strategický systém (pilíře, positioning, tón/styl)", "Knihovna 50–100 háčků", "Distribuční strategie (YT / IG / TikTok split)", "Analytika + optimalizační smyčka", "Strategie CTA", "Obsah → lead → prodej"] },
        ],
      },
      brand: {
        tabLabel: 'Pro značky',
        heroTitle: 'Design, který rezonuje. Přítomnost, která sílí.',
        heroDesc: "AOVA buduje brandovou infrastrukturu — nejen pěkné logo. Navrhujeme vizuální systémy, které přitahují pozornost a působí prémiově na každém kroku.",
        cards: [
          { title: "Brand Identity", desc: "Existujete, teď podle toho vypadejte.", features: ["Logo systém (až 5 konceptů)", "Typografie a barvy", "Brand guidelines", "Social media kit", "Plná vlastnická práva"] },
          { title: "Brand in Motion", desc: "Vaše identita, živě.", features: ["Vše z Pack 01", "Animace loga (úvod + smyčka)", "Úvodní video", "Motion systém"] },
          { title: "Launch System", desc: "Postaveno pro vstup na trh.", features: ["Vše z Pack 02", "Design webu", "Sada šablon pro sítě"] },
        ],
      },
      mostPopular: 'Nejoblíbenější',
      getStarted: 'Začít',
      custom: {
        heading: "Nenašli jste, co hledáte?",
        sub: "Neděláme jen balíčky. Tvoříme jednorázová a unikátní řešení přesně na míru vašim potřebám.",
        items: [
          "Logo design", "Brand identita", "Landing page", "Design ikon aplikací", 
          "Herní UI", "3D modelování", "Animace značky", "Motion grafika", 
          "Animovaná reklama", "Social media kit", "UI/UX design", "Produktové mockupy"
        ],
        cta: "Poptat práci na míru"
      },
    },
    testimonials: {
      heading: 'Aova', accent: 'Láska',
      sub: 'Nemusíte nám věřit na slovo. Důvěřují nám lídři odvětví, kteří neustále posouvají hranice.',
    },
    process: {
      heading: 'Jak to', accent: 'funguje',
      sub: 'Udržujeme věci jednoduché, transparentní a zcela zaměřené na váš úspěch.',
      steps: [
        { num: "01", title: "Úvodní hovor", desc: "Zavoláme si, poznáme váš svět a přesně zjistíme, co potřebujete. Žádný prodejní tlak, jen jasnost." },
        { num: "02", title: "Strategie", desc: "Dostanete jasný plán: co budujeme, jak dlouho to trvá a co to stojí. Vše písemně, než se do čehokoli pustíme." },
        { num: "03", title: "Realizace", desc: "Stavíme. Jste v obraze při každém milníku. Rychle, záměrně a podle vašich standardů." },
        { num: "04", title: "Předání", desc: "Finální podklady, plné vlastnictví a plán pro další kroky. Odcházíte se vším, co potřebujete." },
      ],
    },
    faq: {
      heading: 'Časté', accent: 'dotazy',
      getToKnow: 'Poznejte nás!',
      bookHeading: 'Rezervujte 30minutový\núvodní hovor',
      bookCta: 'Rezervovat hovor',
      preferEmail: 'Preferujete e-mail?',
      copied: 'Zkopírováno',
      items: [
        { q: "Jaké typy projektů přijímáte?", a: "Tvoříme brand identity, UI/UX design, vizuální systémy, motion grafiku a komplexní weby. Jsme cíleně selektivní — pracujeme jen s několika klienty najednou, aby každý dostal maximální péči." },
        { q: "Jak dlouho typický projekt trvá?", a: "Brand identita zabere obvykle 6–10 týdnů. Weby a produkty 8–16 týdnů. U obsahu a videa fungujeme formou pevných dvoutýdenních sprintů." },
        { q: "Jaká je vaše cenová struktura?", a: "U jednorázových projektů fungujeme s předem stanovenou pevnou částkou. Pro dlouhodobé partnery nabízíme model 'sprint retainer'. Vždy tak předem víte přesnou cenu – žádná hodinová sazba a nečekané výdaje." },
        { q: "Spolupracujete s mladými značkami?", a: "Ano, máme připravené balíčky přímo pro zakladatele, kteří potřebují profesionální základy opravdu rychle — brand identitu, sítě a motion podklady — aniž by museli platit režii velkých agentur." },
        { q: "S kým budu reálně komunikovat?", a: "Na všech projektech se podílí přímo Leif a Kudy. Vyjednávání, strategii i kreativu tak řešíte se samotnými zakladateli, ne s juniorními account manažery." },
        { q: "Jak funguje sprint model?", a: "Pracujeme ve dvoutýdenních cyklech. Začneme jasným zadáním, vytvoříme a odevzdáme podklady, a následně vše uzavřeme revizí. Dlouhodobí klienti si tyto sprinty často zamykají dopředu." },
        { q: "Jak vypadá onboarding?", a: "Začíná krátkým 30minutovým úvodním hovorem. Poté vymyslíme plán, naceníme spolupráci a do týdne od schválení otevíráme první sprint." },
        { q: "Můžeme spolupracovat jen na jednom videu/věci?", a: "Rozhodně. Nepotřebujeme se hned vázat na půl roku. Uděláme jeden projekt a na jeho základě uvidíme. Spousta našich dlouhodobých klientů začínala jedním malým sprintem." },
        { q: "A co revize?", a: "Revize jsou běžnou součástí procesu. Zahrnujeme kola zpětné vazby do každého bloku práce. Abyste měli jistotu, počty možných revizí u velkých projektů předem striktně domlouváme." },
        { q: "Řešíte i distribuci nebo vkládání na sítě?", a: "U Creator enginu můžeme nabídnout strategii a technickou správu příspěvků. Lidem z Brand sekce předáme doporučení na distribuci, ale samotná exekuce a klikání už zůstává na nich." },
      ],
    },
    footer: {
      talkPrefix: "Pojďme si popovíd", talkExpand: "aaaaaa", talkSuffix: "t",
      startProject: 'Začít projekt',
      allRights: 'Všechna práva vyhrazena.',
    },
  },
};

const NAV_HEIGHT = 80;

function scrollToId(id: string, center: boolean = false) {
    const el = document.getElementById(id);
    if (!el) return;
    let targetTop = el.getBoundingClientRect().top + window.scrollY;
    if (center) {
        targetTop = targetTop - (window.innerHeight / 2) + (el.offsetHeight / 2);
    } else {
        targetTop = targetTop - NAV_HEIGHT;
    }
    
    // Clamp to max scroll
    const maxScroll = Math.max(0, document.body.scrollHeight - window.innerHeight);
    targetTop = Math.min(Math.max(0, targetTop), maxScroll);

    const start = window.scrollY;
    const distance = targetTop - start;
    const duration = 400;
    let startTime: number | null = null;

    const step = (time: number) => {
        if (!startTime) startTime = time;
        const progress = Math.min((time - startTime) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        window.scrollTo(0, start + distance * ease);
        if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
}

const NAV_EASE = [0.16, 1, 0.3, 1] as const;

// Previously NavThemeIcon lived here, now using ThemeToggle

/* Crossfades text while keeping the button at the width of its longest option */
function NavLabel({ en, cz }: { en: string; cz: string }) {
    const lang = useContext(LangContext);
    const text = lang === 'en' ? en : cz;
    const spacer = en.length >= cz.length ? en : cz;
    return (
        <span className="relative inline-flex items-center justify-center">
            {/* Invisible spacer holds the max width */}
            <span className="invisible whitespace-nowrap" aria-hidden>{spacer}</span>
            {/* Crossfading label */}
            <AnimatePresence mode="wait">
                <motion.span
                    key={lang}
                    className="absolute inset-0 flex items-center justify-center whitespace-nowrap"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.18 }}
                >
                    {text}
                </motion.span>
            </AnimatePresence>
        </span>
    );
}

function LangToggle({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
    return (
        <div className="flex items-center rounded-full bg-black/[0.06] dark:bg-white/[0.07] p-0.5 gap-0.5">
            {(['en', 'cz'] as const).map((l) => (
                <button
                    key={l}
                    onClick={() => setLang(lang === l ? (l === 'en' ? 'cz' : 'en') : l)}
                    className={`px-2 py-1 rounded-full text-[10px] font-semibold uppercase tracking-widest transition-all duration-200 ${
                        lang === l
                            ? 'bg-[var(--text)] text-[var(--surface)]'
                            : 'text-[var(--muted)] hover:text-[var(--text)]'
                    }`}
                >
                    {l}
                </button>
            ))}
        </div>
    );
}

function Navbar({ isDark, toggleDark, lang, setLang }: { isDark: boolean; toggleDark: () => void; lang: Lang; setLang: (l: Lang) => void }) {
    const [isAtTop, setIsAtTop] = useState(true);

    useEffect(() => {
        const handleScroll = () => setIsAtTop(window.scrollY < 80);
        handleScroll();
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const pillBg = isDark ? 'rgba(20,20,20,0.92)' : 'rgba(255,255,255,0.92)';
    const pillBdr = isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.10)';
    const pillStyle = { backgroundColor: pillBg, borderColor: pillBdr, borderWidth: 1, borderStyle: 'solid' as const };

    const btnCls = "px-3 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-widest text-[var(--muted)] hover:text-[var(--text)] hover:bg-black/[0.06] dark:hover:bg-white/[0.08] transition-all duration-150";
    const iconCls = "w-8 h-8 rounded-full flex items-center justify-center text-[var(--muted)] hover:text-[var(--text)] hover:bg-black/[0.06] dark:hover:bg-white/[0.08] transition-colors duration-150";
    const bookCls = "px-3 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-widest bg-[var(--text)] text-[var(--surface)] hover:opacity-80 transition-opacity duration-150";
    const divCls = "w-px h-4 mx-0.5 bg-black/[0.08] dark:bg-white/[0.1]";

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="fixed top-6 inset-x-0 z-50 pointer-events-none"
        >
            <AnimatePresence mode="wait">
                {isAtTop ? (
                    /* ── SPLIT STATE (at top) ── */
                    <motion.div key="split" className="flex items-center justify-between px-6 md:px-10">
                        {/* Left pill — arrow */}
                        <motion.div layoutId="nav-left" layoutDependency={isAtTop} style={pillStyle} className="flex items-center pointer-events-auto rounded-full backdrop-blur-xl p-1.5 shadow-lg">
                            <button onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })} className={iconCls} aria-label="Scroll to bottom">
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="12" y1="5" x2="12" y2="19" /><polyline points="19 12 12 19 5 12" />
                                </svg>
                            </button>
                        </motion.div>

                        {/* Center pill — nav links + lang toggle on right */}
                        <motion.div layoutId="nav-center" layoutDependency={isAtTop} style={pillStyle} className="flex items-center gap-1 pointer-events-auto rounded-full backdrop-blur-xl px-2 py-1.5 shadow-lg">
                            <button onClick={() => scrollToId('work')} className={btnCls}><NavLabel en="Work" cz="Práce" /></button>
                            <button onClick={() => scrollToId('services')} className={btnCls}><NavLabel en="Services" cz="Služby" /></button>
                            <button onClick={() => scrollToId('process')} className={btnCls}><NavLabel en="Process" cz="Proces" /></button>
                            <div className={divCls} />
                            <LangToggle lang={lang} setLang={setLang} />
                        </motion.div>

                        {/* Right pill — book + theme */}
                        <motion.div layoutId="nav-right" layoutDependency={isAtTop} style={pillStyle} className="flex items-center gap-1 pointer-events-auto rounded-full backdrop-blur-xl px-2 py-1.5 shadow-lg">
                            <button onClick={triggerBookingSpark} className={bookCls}><NavLabel en="Book" cz="Rezervovat" /></button>
                            <ThemeToggle isDark={isDark} onToggle={toggleDark} />
                        </motion.div>
                    </motion.div>
                ) : (
                    /* ── MERGED STATE (scrolled) ── */
                    <motion.div key="merged" className="flex justify-center">
                        <motion.div layoutId="nav-center" layoutDependency={isAtTop} style={pillStyle} className="flex items-center gap-1 pointer-events-auto rounded-full backdrop-blur-xl px-2 py-1.5 shadow-xl">
                            <motion.div layoutId="nav-left" layoutDependency={isAtTop} className="flex items-center">
                                <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className={iconCls} aria-label="Scroll to top">
                                    <svg style={{ transform: 'rotate(180deg)' }} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="12" y1="5" x2="12" y2="19" /><polyline points="19 12 12 19 5 12" />
                                    </svg>
                                </button>
                                <div className={divCls} />
                            </motion.div>

                            <button onClick={() => scrollToId('work')} className={btnCls}><NavLabel en="Work" cz="Práce" /></button>
                            <button onClick={() => scrollToId('services')} className={btnCls}><NavLabel en="Services" cz="Služby" /></button>
                            <button onClick={() => scrollToId('process')} className={btnCls}><NavLabel en="Process" cz="Proces" /></button>

                            <motion.div layoutId="nav-right" layoutDependency={isAtTop} className="flex items-center gap-1">
                                <div className={divCls} />
                                <LangToggle lang={lang} setLang={setLang} />
                                <div className={divCls} />
                                <button onClick={triggerBookingSpark} className={bookCls}><NavLabel en="Book" cz="Rezervovat" /></button>
                                <ThemeToggle isDark={isDark} onToggle={toggleDark} />
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}

const triggerBookingSpark = (e?: React.MouseEvent | any) => {
    if (e && e.preventDefault) e.preventDefault();
    // Scroll directly to the widget and center it vertically in the viewport
    scrollToId('booking-widget', true);
    const widget = document.getElementById('booking-widget');
    if (widget) {
        widget.classList.remove('animate-spark-flash');
        void widget.offsetWidth;
        widget.classList.add('animate-spark-flash');
    }
};

function Hero({ isDark }: { isDark: boolean }) {
    const t = useT();
    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], [0, 300]);

    return (
        <section className="relative min-h-[100svh] flex flex-col items-start justify-center pt-32 pb-20 px-8 md:px-16 lg:px-24 overflow-hidden">

            {/* Decorative ambient gradients — sits behind hero heading */}
            <div className={`absolute top-1/2 left-[38%] -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[450px] md:h-[450px] lg:w-[600px] lg:h-[600px] bg-gradient-to-tr rounded-full blur-[100px] -z-10 animate-pulse pointer-events-none ${isDark ? 'from-white/5 to-white/3' : 'from-white/80 to-white/20'}`} />

            {/* Interactive 3D glass logo element */}
            <HeroLogo3D isDark={isDark} />

            {/* Subtle decorative crosses */}
            <div className="absolute top-32 left-12 md:left-24 text-[var(--text)]/20 text-xl font-light pointer-events-none">+</div>
            <div className="absolute bottom-32 right-12 md:right-24 text-[var(--text)]/20 text-xl font-light pointer-events-none">+</div>

            <motion.div
                style={{ y, opacity: useTransform(scrollYProgress, [0, 0.25], [1, 0]) }}
                className="pg-inner text-left z-10"
            >
                {/* Headline: bold sans + italic serif accents */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="text-6xl md:text-8xl lg:text-[96px] leading-[0.92] mb-8 text-[var(--text)]"
                >
                    <span style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.06em', textTransform: 'none', marginLeft: '-0.09em' }}>{t.hero.prefix}</span><br />
                    <span className="font-serif italic" style={{ letterSpacing: '-0.06em', display: 'inline-block', padding: '0 0.08em 0.12em 0', margin: '0 -0.08em -0.12em 0', backgroundImage: isDark ? 'linear-gradient(135deg, #7a7a7a 0%, #e0e0e0 45%, #888 100%)' : 'linear-gradient(135deg, #444 0%, #888 45%, #111 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{t.hero.creators}</span>
                    <span style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.06em', textTransform: 'none', margin: '0 0.08em' }}>&amp;</span>
                    <span className="font-serif italic" style={{ letterSpacing: '-0.06em', display: 'inline-block', padding: '0 0.08em 0.12em 0', margin: '0 -0.08em -0.12em 0', backgroundImage: isDark ? 'linear-gradient(135deg, #888 0%, #e0e0e0 45%, #7a7a7a 100%)' : 'linear-gradient(135deg, #111 0%, #555 45%, #333 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{t.hero.brands}</span>
                    <span style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.06em', textTransform: 'none' }}>.</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="text-base md:text-lg text-[var(--muted)] max-w-lg mb-10 leading-relaxed"
                >
                    {t.hero.tagline}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="flex items-center gap-4 pointer-events-auto"
                >
                    <motion.button
                        onClick={triggerBookingSpark}
                        whileHover={{
                            scale: 1.05,
                            rotateX: 12,
                            rotateY: -8,
                            y: -5,
                            boxShadow: "0 25px 50px -12px rgba(180, 180, 200, 0.45)"
                        }}
                        whileTap={{ scale: 0.95, rotateX: 0, rotateY: 0 }}
                        style={{ transformStyle: "preserve-3d", perspective: 1000 }}
                        className="pg-btn pg-btn-primary text-base group shadow-xl transition-shadow duration-300"
                    >
                        <span style={{ transform: "translateZ(20px)" }} className="flex items-center gap-2">
                            {t.hero.cta}
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300">
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                <polyline points="12 5 19 12 12 19"></polyline>
                            </svg>
                        </span>
                    </motion.button>
                </motion.div>
            </motion.div>
        </section>
    );
}




function Marquee() {
    const t = useT();
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % t.marquee.length);
        }, 11000); // 11 seconds delay
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="pg-marquee-wrap flex items-center justify-center relative h-16 px-6">
            <div className="font-serif italic text-base md:text-lg flex items-center justify-center gap-4 md:gap-8 overflow-hidden max-w-7xl mx-auto w-full">
                {/* Left Star (Static) */}
                <span className="text-[var(--accent)] text-sm shrink-0">✦</span>

                {/* Dynamic Text Container */}
                <div className="relative flex-1 flex items-center justify-center h-8 md:h-10">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                            className="absolute text-center w-full"
                        >
                            {t.marquee[index]}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Right Star (Static) */}
                <span className="text-[var(--accent)] text-lg shrink-0">✦</span>
            </div>
        </div>
    );
}


const SERVICES_DATA = {
    creator: {
        theme: "text-[#FF3366]",
        accent: "bg-[#FF3366]",
        hoverAccent: "hover:bg-[#FF3366]/10",
        bgAccent: "bg-[#FF3366]/10",
        tabLabel: "For Creators",
        hero: {
            title: "Content that grows. Channels that last.",
            desc: "AOVA handles the full creative pipeline for creators — from zero-retention editing to algorithmic growth strategy. You focus on the camera, we build the engine.",
            color: "bg-[#FF3366]/5 border-[#FF3366]/10",
        },
        pricingCards: [
            {
                title: "Starter Pack",
                desc: "Full-spectrum content foundation.",
                features: ["1-2x longform videos", "6x shortform", "Basic repurposing (long → shorts)", "2 thumbnails per video", "Basic thumbnail style direction", "Mini content plan (1-2 weeks)", "10-15 hooks", "Basic posting plan"],
                price: "$1,000",
                period: "/2 weeks",
                featured: false
            },
            {
                title: "YouTube Engine",
                desc: "Full production & growth system.",
                features: ["4x longform videos", "10-15 shortform videos", "Full repurposing system", "Retention editing", "Narrative restructuring", "Hook optimization", "3–5 thumbnails per video", "Thumbnail system (style consistency)", "CTR-focused iteration", "Full content strategy blueprint", "30–50 hook library", "Content formats (repeatable structures)", "Competitor breakdown", "Content calendar"],
                price: "$2,000",
                period: "/2 weeks",
                featured: true
            },
            {
                title: "Scale Partner",
                desc: "Full-stack channel domination.",
                features: ["2x longform videos", "15–25 shortform videos", "Advanced repurposing (multi-platform)", "A/B shortform hooks", "Full narrative restructuring", "Storytelling optimization", "Pacing + retention engineering", "Full thumbnail system", "Continuous iteration based on performance", "Social assets (banners, posts)", "Full strategy system (pillars, positioning, tone/style)", "50–100 hook library", "Distribution strategy (YT / IG / TikTok split)", "Analytics + optimization loop", "CTA strategy", "Content → lead → sale funnel"],
                price: "$3,500",
                period: "/2 weeks",
                featured: false
            }
        ]
    },
    brand: {
        theme: "text-[var(--text)]",
        accent: "bg-[var(--text)]",
        hoverAccent: "hover:bg-[var(--text)]/10",
        bgAccent: "bg-[var(--text)]/10",
        tabLabel: "For Brands",
        hero: {
            title: "Design that converts. Presence that compounds.",
            desc: "AOVA builds brand infrastructure — not just visuals. We engineer systems that capture attention, drive action, and scale effortlessly as your business grows.",
            color: "bg-[var(--text)]/5 border-[var(--text)]/10",
        },
        pricingCards: [
            {
                title: "Brand Identity",
                desc: "You exist, now look like it.",
                features: ["Logo system (up to 5 concepts)", "Typography + color system", "Brand guidelines", "Social media kit", "Full ownership rights"],
                price: "$1,500",
                period: "fixed",
                featured: false
            },
            {
                title: "Brand in Motion",
                desc: "Your identity, alive.",
                features: ["Everything in Pack 01", "Logo animation (intro + loop)", "Introduction video", "Motion system"],
                price: "$3,000",
                period: "fixed",
                featured: true
            },
            {
                title: "Launch System",
                desc: "Built to go to market.",
                features: ["Everything in Pack 02", "Website design", "Social media template pack"],
                price: "$5,000",
                period: "fixed",
                featured: false
            }
        ]
    }
};

type AudienceType = 'creator' | 'brand';

function PricingCard({ meta, card, audience, t, onOpen, index }: any) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const cardRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const handleGlobalMouseMove = (e: MouseEvent) => {
            if (!cardRef.current) return;
            const { left, top } = cardRef.current.getBoundingClientRect();
            mouseX.set(e.clientX - left);
            mouseY.set(e.clientY - top);
        };
        
        window.addEventListener('mousemove', handleGlobalMouseMove);
        return () => window.removeEventListener('mousemove', handleGlobalMouseMove);
    }, [mouseX, mouseY]);

    return (
        <motion.button
            ref={cardRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => onOpen(index)}
            className={`group relative text-left flex flex-col p-8 rounded-[32px] overflow-visible transition-all duration-500 w-full bg-[var(--surface)] border hover:-translate-y-2 hover:shadow-xl ${meta.featured ? `border-[var(--text)] z-10` : 'border-[var(--border)] z-0 hover:z-10 shadow-sm'}`}
            style={{ isolation: 'isolate' }}
        >
            {/* === GLOW EFFECTS MASK === */}
            <div className="absolute inset-0 z-0 pointer-events-none rounded-[32px] overflow-hidden">
                {/* Base ambient glow for featured cards to be "eye catching" automatically */}
                {meta.featured && (
                    <div 
                        className="absolute inset-0 pointer-events-none mix-blend-screen dark:mix-blend-screen" 
                        style={{ background: `radial-gradient(ellipse closest-side at 50% 50%, ${audience === 'creator' ? 'rgba(255, 51, 102, 0.15)' : 'rgba(255, 255, 255, 0.08)'}, transparent 120%)` }} 
                    />
                )}

                {/* Interactive Spotlight Glow */}
                <motion.div
                    className="absolute inset-0 transition duration-300 mix-blend-screen dark:mix-blend-screen"
                    style={{
                        background: useMotionTemplate`
                            radial-gradient(
                                250px circle at ${mouseX}px ${mouseY}px,
                                ${audience === 'creator' ? 'rgba(255, 51, 102, 0.12)' : 'rgba(255, 255, 255, 0.08)'},
                                transparent 100%
                            )
                        `,
                    }}
                />
            </div>
            {/* ======================= */}

            {/* STICKER: Floating 'Most Popular' badge so it doesn't break layout */}
            {meta.featured && (
                <div className={`absolute -top-3 -right-3 md:-right-6 md:-top-4 rotate-[6deg] px-4 py-1.5 rounded-full text-white text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] shadow-xl z-20 ${SERVICES_DATA[audience as AudienceType].accent}`}>
                    <span className="relative z-10 text-[var(--bg)]">{t.services.mostPopular}</span>
                    {/* Tiny tape/highlight effect physically on sticker */}
                    <div className="absolute inset-0 bg-white/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
            )}

            <div className="flex-1 relative z-10 w-full mb-8 pt-2">
                <h4 className="text-2xl font-semibold text-[var(--text)] mb-2 leading-tight">{card.title}</h4>
                <p className="text-sm text-[var(--muted)] mb-8">{card.desc}</p>

                <ul className="space-y-3">
                    {card.features.slice(0, 4).map((feat: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-3 text-[var(--text)] opacity-80 text-sm">
                            <span className={`w-1.5 h-1.5 rounded-full shrink-0 mt-1.5 ${SERVICES_DATA[audience as AudienceType].theme.replace('text-', 'bg-')}`} />
                            <span className="leading-snug">{feat}</span>
                        </li>
                    ))}
                    {card.features.length > 4 && (
                        <li className={`text-sm italic ${SERVICES_DATA[audience as AudienceType].theme} opacity-80 pl-4 mt-3`}>+{card.features.length - 4} more included</li>
                    )}
                </ul>
            </div>

            <div className="relative z-10 w-full pt-6 border-t border-[var(--border)] group-hover:border-[var(--text)] transition-colors flex items-end justify-between">
                <div className="flex flex-col">
                    <span className="text-[var(--muted)] text-[10px] font-bold uppercase tracking-widest mb-1">from</span>
                    <div className="flex items-baseline gap-1.5">
                        <span className="text-3xl text-[var(--text)] tracking-tight leading-none" style={{ fontFamily: 'var(--font-display)' }}>{meta.price}</span>
                        <span className="text-[var(--muted)] text-[11px] font-medium tracking-wide uppercase">{meta.period}</span>
                    </div>
                </div>
                
                <div className={`w-12 h-12 rounded-[14px] bg-[var(--bg)] border border-[var(--border)] flex items-center justify-center transition-all duration-300 group-hover:bg-[var(--text)] group-hover:border-[var(--text)] group-hover:text-[var(--surface)] group-hover:shadow-lg ${meta.featured ? `text-${SERVICES_DATA[audience as AudienceType].theme.replace('text-', '')}` : 'text-[var(--muted)]'}`}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:-rotate-45">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                </div>
            </div>
        </motion.button>
    );
}

function InteractiveServices() {
    const t = useT();
    const [audience, setAudience] = useState<AudienceType | null>('creator');
    const [openCard, setOpenCard] = useState<number | null>(null);
    const [userInteracted, setUserInteracted] = useState(false);

    useEffect(() => {
        if (userInteracted || audience !== 'creator') return;
        const timer = setTimeout(() => setAudience('brand'), 5000);
        return () => clearTimeout(timer);
    }, [userInteracted, audience]);

    const handleTabClick = (type: AudienceType) => {
        setUserInteracted(true);
        setAudience(audience === type ? null : type);
    };

    return (
        <>
        <section className="relative py-24" id="services-interactive">
            <div className="absolute inset-0 bg-dots opacity-[0.03] pointer-events-none -z-10" />
            <div className="pg-inner max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-8 text-[var(--text)]" style={{ fontFamily: 'var(--font-display)' }}>{t.services.heading}</h2>
                    <div className="inline-flex flex-col md:flex-row p-1.5 bg-[var(--surface)] border border-[var(--border)] rounded-[32px] md:rounded-full gap-2 relative w-full md:w-auto shadow-sm">
                        {(['creator', 'brand'] as AudienceType[]).map((type) => (
                            <button
                                key={type}
                                onClick={() => handleTabClick(type)}
                                className={`px-8 py-3 rounded-full text-sm md:text-base font-medium transition-all duration-500 w-full md:w-auto ${audience === type
                                    ? `${SERVICES_DATA[type].accent} text-[var(--bg)] shadow-lg`
                                    : 'hover:bg-[var(--bg)] text-[var(--muted)] hover:text-[var(--text)]'}`}
                            >
                                {t.services[type].tabLabel}
                            </button>
                        ))}
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    {audience && (
                        <motion.div
                            key={audience}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        >
                            {/* Animated Subheader replacing the heavy Box */}
                            <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                                className="max-w-2xl mx-auto text-center mb-16 relative"
                            >
                                <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[100px] rounded-full blur-[80px] pointer-events-none opacity-20 ${SERVICES_DATA[audience as AudienceType].accent}`} />
                                <h4 className={`text-2xl md:text-3xl font-serif italic mb-4 leading-tight ${SERVICES_DATA[audience as AudienceType].theme}`}>{t.services[audience].heroTitle}</h4>
                                <p className="text-base text-[var(--muted)] leading-relaxed text-center">{t.services[audience].heroDesc}</p>
                            </motion.div>

                            {/* Minimalist Glass Card Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                                {t.services[audience].cards.map((card, i) => {
                                    const meta = SERVICES_DATA[audience as AudienceType].pricingCards[i];
                                    return (
                                        <PricingCard key={i} meta={meta} card={card} audience={audience} t={t} onOpen={setOpenCard} index={i} />
                                    );
                                })}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>

        {/* Card detail OS-like Modal */}
        <AnimatePresence>
            {openCard !== null && audience && (() => {
                const card = t.services[audience].cards[openCard];
                const meta = SERVICES_DATA[audience as AudienceType].pricingCards[openCard];
                return (
                    <motion.div
                        initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                        animate={{ opacity: 1, backdropFilter: 'blur(16px)' }}
                        exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                        transition={{ duration: 0.4 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60"
                        onClick={() => setOpenCard(null)}
                    >
                        <div className="relative w-full max-w-xl flex flex-col items-center justify-center gap-6">

                            <motion.div
                                key={`card-${openCard}`}
                                initial={{ opacity: 0, scale: 0.95, x: 20 }}
                                animate={{ opacity: 1, scale: 1, x: 0 }}
                                exit={{ opacity: 0, scale: 0.95, x: -20 }}
                                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                onClick={(e) => e.stopPropagation()}
                                className={`relative w-full bg-white/[0.03] backdrop-blur-2xl rounded-[40px] border p-10 overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.8)] ${meta.featured ? 'border-white/[0.15]' : 'border-white/[0.08]'}`}
                            >
                            {/* Ambient modal glow */}
                            <div className="absolute -top-32 -left-32 w-64 h-64 bg-white/10 blur-[80px] rounded-full pointer-events-none" />
                            <div className={`absolute -bottom-32 -right-32 w-64 h-64 blur-[100px] rounded-full pointer-events-none opacity-20 ${SERVICES_DATA[audience as AudienceType].accent}`} />

                            <button
                                onClick={() => setOpenCard(null)}
                                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors border border-white/5"
                            >
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 1l12 12M13 1L1 13" stroke="white" strokeWidth="1.5" strokeLinecap="round"/></svg>
                            </button>

                            <div className="relative z-10">
                                {meta.featured && (
                                    <div className={`inline-block px-4 py-1 rounded-full text-black text-[10px] font-bold uppercase tracking-[0.2em] mb-6 ${SERVICES_DATA[audience as AudienceType].accent}`}>
                                        {t.services.mostPopular}
                                    </div>
                                )}

                                <h3 className={`text-4xl font-medium mb-3 tracking-tight ${SERVICES_DATA[audience as AudienceType].theme}`} style={{ fontFamily: 'var(--font-display)' }}>{card.title}</h3>
                                <p className="text-base text-white/50 mb-10 max-w-sm">{card.desc}</p>

                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mb-12">
                                    {card.features.map((feat: string, idx: number) => (
                                        <li key={idx} className="flex items-start gap-3 text-white text-sm">
                                            <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 bg-white/5 border border-white/10 ${SERVICES_DATA[audience as AudienceType].theme}`}>
                                                <svg width="10" height="10" viewBox="0 0 14 14" fill="none"><path d="M2 7l3 3 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                            </div>
                                            <span className="leading-snug opacity-80">{feat}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="pt-8 border-t border-white/[0.08]">
                                    <div className="flex items-end gap-3 mb-8">
                                        <div className="flex flex-col">
                                            <span className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em] mb-1">Total Investment</span>
                                            <span className="text-5xl text-white tracking-tight leading-none" style={{ fontFamily: 'var(--font-display)' }}>{meta.price}</span>
                                        </div>
                                        <span className="text-white/40 text-sm font-medium uppercase pb-1 tracking-widest">{meta.period}</span>
                                    </div>
                                    <button
                                        onClick={(e) => { setOpenCard(null); triggerBookingSpark(e); }}
                                        className={`w-full py-5 rounded-[20px] font-medium text-lg transition-all duration-300 shadow-xl ${meta.featured ? `${SERVICES_DATA[audience as AudienceType].accent} text-black hover:scale-[1.02]` : 'bg-white text-black hover:bg-white/90 hover:scale-[1.02]'}`}
                                    >
                                        {t.services.getStarted}
                                    </button>
                                </div>
                            </div>
                        </motion.div>

                        {/* Navigation Arrows safely docked right beneath the card */}
                        <div className="flex items-center gap-4 z-[110]">
                            {openCard > 0 ? (
                                <button 
                                    onClick={(e) => { e.stopPropagation(); setOpenCard(openCard - 1); }}
                                    className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all duration-300 hover:scale-110 backdrop-blur-xl shadow-lg"
                                    aria-label="Previous Package"
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                                </button>
                            ) : <div className="w-12 h-12" />}

                            {openCard < t.services[audience].cards.length - 1 ? (
                                <button 
                                    onClick={(e) => { e.stopPropagation(); setOpenCard(openCard + 1); }}
                                    className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all duration-300 hover:scale-110 backdrop-blur-xl shadow-lg"
                                    aria-label="Next Package"
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                                </button>
                            ) : <div className="w-12 h-12" />}
                        </div>
                    </div>
                </motion.div>
            );
        })()}
    </AnimatePresence>
        </>
    );
}

/* ================================================================
   CUSTOM SERVICES (A LA CARTE)
   ================================================================ */
function CustomServicesSection() {
    const t = useT();
    // Use an optional fallback in case dictionary isn't loaded properly
    const data = t.services.custom || {
        heading: "Can't find what you're looking for?",
        sub: "We don't just do packs. We also offer custom, standalone services tailored specifically to your individual needs.",
        items: ["Product Design", "Business Card", "Logo", "Tattoo Design", "Landing Page", "Advertisement Image", "Social Media Graphics"],
        cta: "Request Custom Work"
    };

    return (
        <section className="relative py-24 pb-32 z-10" id="custom-services">
            <div className="max-w-6xl mx-auto px-6 relative z-10 flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-medium mb-6 tracking-tight text-[var(--text)]" style={{ fontFamily: 'var(--font-display)' }}>
                        {data.heading}
                    </h2>
                    <p className="text-lg text-[var(--muted)] max-w-2xl mx-auto leading-relaxed">
                        {data.sub}
                    </p>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-4xl mx-auto mb-16"
                >
                    {data.items.map((item: string, i: number) => (
                        <div 
                            key={i} 
                            className="px-6 py-3 rounded-full bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--text)] hover:bg-[var(--bg)] hover:scale-[1.05] hover:z-10 transition-all duration-300 shadow-sm hover:shadow-xl cursor-default group relative overflow-hidden"
                        >
                            <span className="relative z-10 text-[var(--text)] opacity-70 font-medium text-sm md:text-base tracking-wide group-hover:opacity-100 transition-opacity">{item}</span>
                        </div>
                    ))}
                </motion.div>

                <motion.button
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05, rotateX: 12, rotateY: -8, y: -5, boxShadow: "0 25px 50px -12px rgba(180, 180, 200, 0.45)" }}
                    whileTap={{ scale: 0.95, rotateX: 0, rotateY: 0 }}
                    style={{ transformStyle: "preserve-3d", perspective: 1000 }}
                    transition={{ duration: 0.3 }}
                    onClick={(e) => {
                        e.preventDefault();
                        const widget = document.getElementById("booking-widget");
                        if (widget) {
                            let targetTop = widget.getBoundingClientRect().top + window.scrollY;
                            targetTop = targetTop - (window.innerHeight / 2) + (widget.offsetHeight / 2);
                            window.scrollTo({ top: targetTop, behavior: 'smooth' });
                            setTimeout(() => {
                                widget.classList.remove("animate-spark-flash");
                                void widget.offsetWidth;
                                widget.classList.add("animate-spark-flash");
                            }, 450);
                        }
                    }}
                    className="pg-btn bg-[var(--text)] text-[var(--surface)] hover:bg-[#FF3366] hover:text-white hover:border-[#FF3366] !text-lg !px-8 !py-4 shadow-xl transition-colors duration-300"
                >
                    <span style={{ transform: "translateZ(20px)" }} className="block">
                        {data.cta}
                    </span>
                </motion.button>
            </div>
        </section>
    );
}


/* ================================================================
   PROJECTS
   ================================================================ */
const workProjects = [
    { num: "01", name: "Placeholder", category: "Brand Identity", image: "/aovaplaceholder.png" },
    { num: "02", name: "Placeholder", category: "Web Design", image: "/aovaplaceholder.png" },
    { num: "03", name: "Placeholder", category: "Product UX", image: "/aovaplaceholder.png" },
];



function WorkSection() {
    const t = useT();
    const router = useRouter();
    return (
        <section id="work" className="py-32">
            <div className="pg-inner space-y-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <h2 className="text-5xl md:text-7xl">{t.work.heading}</h2>
                    <p className="text-[var(--muted)] max-w-sm text-sm">{t.work.sub}</p>
                </div>

                {/* Card grids — gap-4 between all rows and columns */}
                <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {workProjects.map((p) => (
                            <div key={p.num} className="group relative h-[240px] sm:h-[360px] md:h-[480px] overflow-hidden rounded-2xl bg-[var(--border)] cursor-pointer">
                                <img
                                    src={p.image}
                                    alt={p.name}
                                    className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                                />
                                {/* Category tag — top left */}
                                <div className="absolute top-4 left-4 z-20">
                                    <span className="px-3 py-1.5 bg-white/10 backdrop-blur-md text-white text-xs font-semibold rounded-full border border-white/20">
                                        {p.category}
                                    </span>
                                </div>
                                {/* Index — top right */}
                                <span className="absolute top-4 right-4 z-20 text-white/40 text-xs font-mono">{p.num}</span>
                                {/* Bottom gradient + title */}
                                <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/75 to-transparent z-10 pointer-events-none" />
                                <div className="absolute bottom-5 left-5 z-20">
                                    <h3 className="text-white text-xl leading-tight">{p.name}</h3>
                                </div>
                            </div>
                        ))}
                    </div>


                </div>

                <div className="flex justify-center pt-8">
                    <motion.button
                        onClick={() => router.push('/archive')}
                        whileHover={{
                            scale: 1.05,
                            rotateX: 12,
                            rotateY: -8,
                            y: -5,
                            boxShadow: "0 25px 50px -12px rgba(180, 180, 200, 0.45)"
                        }}
                        whileTap={{ scale: 0.95, rotateX: 0, rotateY: 0 }}
                        style={{ transformStyle: "preserve-3d", perspective: 1000 }}
                        className="pg-btn pg-btn-primary group shadow-xl transition-shadow duration-300"
                    >
                        <span style={{ transform: "translateZ(20px)" }} className="flex items-center gap-2">
                            {t.work.archive}
                            <span className="group-hover:translate-x-1 transition-transform duration-300">&rarr;</span>
                        </span>
                    </motion.button>
                </div>
            </div>
        </section>
    );
}

/* ================================================================
   TESTIMONIALS
   ================================================================ */
const TESTIMONIALS = [
    { text: "Aova absolutely transformed our digital presence. They didn't just design a website, they built a machine that converts.", author: "L. Jenkins", brand: "Founder of Lumara", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop" },
    { text: "The editing quality and turnaround time are unmatched. We've seen a 30% increase in retention since working with Aova.", author: "A. Abdaal", brand: "Creator", avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=150&auto=format&fit=crop" },
    { text: "Insane attention to detail. The brand identity they delivered gave us the confidence to scale aggressively.", author: "S. Rossi", brand: "Founder of Halo", avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=150&auto=format&fit=crop" },
    { text: "Simply the best creative partner we've ever worked with. Fast, communicative, and constantly delivering heat.", author: "M. Chen", brand: "TechFlow", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop" },
];

function Testimonials() {
    const t = useT();
    return (
        <section className="pt-16 pb-32 overflow-hidden bg-transparent text-[var(--text)] relative mt-0" id="testimonials">
            <div className="pg-inner mb-16 relative z-10">
                <h2 className="text-5xl md:text-7xl tracking-tight mb-6">{t.testimonials.heading} <span className="font-serif italic text-[#FF3366]">{t.testimonials.accent}</span></h2>
                <p className="text-[var(--muted)] text-lg max-w-xl">{t.testimonials.sub}</p>
            </div>

            <div className="flex overflow-hidden relative w-full h-full group">
                {/* Edge fade gradients */}
                <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[var(--bg)] to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[var(--bg)] to-transparent z-10 pointer-events-none" />

                <div className="flex gap-8 group-hover:[animation-play-state:paused] py-4" style={{ width: "max-content", animation: "scroll 40s linear infinite" }}>
                    {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
                        <div key={i} className="w-[320px] sm:w-[400px] md:w-[500px] flex flex-col bg-[var(--surface)] border-2 border-[var(--border)] shadow-[0_4px_0_0_rgba(0,0,0,0.05)] p-6 sm:p-8 md:p-10 rounded-[24px] md:rounded-[32px] shrink-0 transition-transform duration-300 hover:-translate-y-2 hover:border-[var(--border-hover)]">
                            
                            {/* Profile Header Section */}
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-4">
                                    <img 
                                        src={t.avatar} 
                                        alt={t.author} 
                                        className="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover shrink-0 border border-[var(--border)]" 
                                    />
                                    <div className="flex flex-col gap-0.5">
                                        <span className="font-bold tracking-tight text-lg md:text-xl text-[var(--text)] leading-none">{t.author}</span>
                                        <span className="text-[var(--muted)] text-sm md:text-base leading-none">{t.brand}</span>
                                    </div>
                                </div>
                                {/* Optional Right-Aligned Logo Placeholder */}
                                <div className="w-10 h-10 md:w-12 md:h-12 text-[var(--muted)] opacity-40 flex items-center justify-center shrink-0">
                                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                                        <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="4" />
                                        <path d="M26 14L14 26" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                                        <path d="M26 26V14H14" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </div>

                            {/* Stars */}
                            <div className="flex gap-1 mb-6 text-[#FF3366]">
                                {[1, 2, 3, 4, 5].map(star => (
                                    <svg key={star} width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                    </svg>
                                ))}
                            </div>

                            <p className="text-xl md:text-2xl font-serif italic text-[var(--text)] whitespace-normal leading-snug">&ldquo;{t.text}&rdquo;</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ================================================================
   BUYING PROCESS
   ================================================================ */
function BuyingProcess() {
    const t = useT();
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["0.2 1", "0.8 0.5"]
    });
    
    // Smooth out the progress line
    const scale = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <section ref={containerRef} className="relative py-32 border-t border-[var(--border)] overflow-hidden" id="process">
            {/* Decorative background block */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 bg-dots opacity-[0.08] -rotate-12 pointer-events-none -z-10" />

            <div className="pg-inner relative">
                <div className="text-center mb-20">
                    <h2 className="text-5xl md:text-7xl tracking-tight mb-6">{t.process.heading} <span className="font-serif italic text-[#FF3366]">{t.process.accent}</span></h2>
                    <p className="text-[var(--muted)] text-lg max-w-xl mx-auto">{t.process.sub}</p>
                </div>

                <div className="relative w-full">
                    {/* Horizontal Track Line (Desktop) */}
                    <div className="hidden md:block absolute top-[27px] left-[10%] right-[10%] h-[2px] bg-[var(--border)] z-0 overflow-hidden">
                        <motion.div className="h-full bg-[#FF3366] origin-left" style={{ scaleX: scale }} />
                    </div>

                    {/* Vertical Track Line (Mobile) */}
                    <div className="block md:hidden absolute left-[27px] top-[24px] bottom-[24px] w-[2px] bg-[var(--border)] z-0 overflow-hidden">
                        <motion.div className="w-full h-full bg-[#FF3366] origin-top" style={{ scaleY: scale }} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 lg:gap-8 relative z-10 w-full">
                        {t.process.steps.map((step, i) => (
                            <div key={step.num} className="flex flex-row md:flex-col items-start md:items-center relative w-full">
                                {/* The node waypoint */}
                                <motion.div 
                                    initial={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg)', color: 'var(--muted)' }}
                                    whileInView={{ borderColor: '#FF3366', backgroundColor: '#FF3366', color: '#111111' }}
                                    viewport={{ margin: "-20%" }}
                                    transition={{ duration: 0.6 }}
                                    className="w-14 h-14 shrink-0 rounded-full border-2 md:border-4 shadow-sm flex items-center justify-center text-lg font-bold z-10 transition-colors md:mb-8 bg-[var(--surface)]"
                                >
                                    {step.num}
                                </motion.div>

                                {/* The content card */}
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-10%" }}
                                    transition={{ duration: 0.6, delay: i * 0.1 }}
                                    className="relative ml-6 md:ml-0 p-6 lg:p-8 rounded-3xl bg-[var(--surface)] border border-[var(--border)] shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 w-full text-left md:text-center shrink min-w-0"
                                >
                                    <h3 className="text-xl lg:text-2xl font-bold mb-3">{step.title}</h3>
                                    <p className="text-[var(--muted)] text-sm leading-relaxed">{step.desc}</p>
                                </motion.div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ================================================================
   FAQ
   ================================================================ */
function FaqItem({ q, a, isOpen, onToggle }: { q: string, a: string, isOpen: boolean, onToggle: () => void }) {
    return (
        <div className="mb-4 w-full rounded-2xl overflow-hidden border border-[var(--border)] hover:border-[var(--border-hover)] transition-colors duration-300 bg-[var(--surface)]">
            <div className="p-6 w-full">
                <button
                    onClick={onToggle}
                    className="w-full flex items-center justify-between text-left focus:outline-none cursor-pointer"
                >
                    <span className={`text-xl md:text-2xl transition-colors ${isOpen ? "text-[var(--text)]" : "text-[var(--muted)]"}`} style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.03em' }}>{q}</span>
                    <span className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all shrink-0 ml-4 ${isOpen ? "bg-[var(--text)] text-[var(--surface)] border-[var(--text)] rotate-45" : "border-[var(--border)] text-[var(--muted)]"}`}>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                            <line x1="6" y1="2" x2="6" y2="10" />
                            <line x1="2" y1="6" x2="10" y2="6" />
                        </svg>
                    </span>
                </button>
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                        >
                            <p className="pt-4 text-[var(--muted)] text-lg max-w-2xl">{a}</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

function FaqSection() {
    const t = useT();
    const [openIndices, setOpenIndices] = useState<number[]>([]);
    const [folderOpen, setFolderOpen] = useState(false);
    const [selectedMember, setSelectedMember] = useState<number | null>(null);
    const faqRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(faqRef);

    useEffect(() => {
        if (!isInView && folderOpen) {
            setFolderOpen(false);
            if (selectedMember !== null) setSelectedMember(null);
        }
    }, [isInView, folderOpen, selectedMember]);

    const teamMembers = [
        {
            name: 'Vapor', role: 'Creative Director', avatar: '/vapor.webp',
            quote: '"Great design starts with a really good question."',
            bio: 'Vapor leads the creative vision at AOVA, shaping the studio\'s aesthetic language across brand, digital, and motion work. With 10 years in the industry, she believes in restraint, intentionality, and work that resonates long after first glance.',
            skills: ['Brand Identity', 'Art Direction', 'Typography', 'Creative Strategy'],
            location: 'Amsterdam, NL',
        },
        {
            name: 'Marcus', role: 'Lead Engineer', avatar: 'marcus_aova',
            quote: '"Code is design. Every function has a form."',
            bio: 'Marcus builds the technical backbone of every AOVA project — from pixel-perfect web experiences to interactive 3D environments. He champions performance, accessibility, and code that reads as cleanly as the designs it serves.',
            skills: ['React / Next.js', 'WebGL / Three.js', 'TypeScript', 'DevOps'],
            location: 'Berlin, DE',
        },
        {
            name: 'Leif', role: 'Design Lead', avatar: '/Noire.png',
            quote: '"Systems thinking is just empathy at scale."',
            bio: 'Leif architects design systems and product interfaces that feel effortless by design. He bridges strategy and craft, ensuring every component, interaction, and pixel is considered as part of a larger whole.',
            skills: ['UI / UX', 'Design Systems', 'Figma', 'Interaction Design'],
            location: 'Barcelona, ES',
        },
        {
            name: 'Kudy', role: 'Motion Designer', avatar: '/Kudy.png',
            quote: '"Animation is the punctuation of digital experience."',
            bio: 'Kudy creates the motion layer that gives AOVA\'s work its signature energy. From micro-interactions to full motion identities, he makes interfaces feel alive without overwhelming the underlying message.',
            skills: ['After Effects', 'CSS Animation', 'Lottie', 'Framer'],
            location: 'London, UK',
        },
        {
            name: 'Filip', role: 'Creative', avatar: '/filip.jpg',
            quote: '"Every detail matters when crafting an experience."',
            bio: 'Filip brings a meticulous eye to every project, ensuring thoughtful execution from the underlying architecture down to the final pixels.',
            skills: ['Design', 'Creative Direction'],
            location: 'Prague, CZ',
        },
        {
            name: 'Amina', role: 'Brand Strategist', avatar: 'amina_aova',
            quote: '"Your brand is what people say when you leave the room."',
            bio: 'Amina brings clarity to complex positioning challenges, helping clients articulate who they are and why it matters. She leads workshops, naming projects, and brand narrative work that grounds everything AOVA creates.',
            skills: ['Brand Strategy', 'Positioning', 'Copywriting', 'Research'],
            location: 'Nairobi, KE',
        },
    ];

    const [copied, setCopied] = useState(false);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const x = useMotionValue(0.5);
    const y = useMotionValue(0.5);

    const springConfig = { damping: 20, stiffness: 100 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);
    const rotateX = useTransform(springY, [0, 1], [30, -30]);
    const rotateY = useTransform(springX, [0, 1], [-30, 30]);

    const handleMouseMove = ({ currentTarget, clientX, clientY }: React.MouseEvent) => {
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        const localX = clientX - left;
        const localY = clientY - top;
        mouseX.set(localX);
        mouseY.set(localY);
        x.set(localX / width);
        y.set(localY / height);
    };

    const handleMouseLeave = () => {
        x.set(0.5);
        y.set(0.5);
    };

    const handleCopy = (e: React.MouseEvent) => {
        e.preventDefault();
        navigator.clipboard.writeText("aovastudio@gmail.com");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    useEffect(() => {
        (async function () {
            const cal = await getCalApi();
            cal("ui", { "styles": { "branding": { "brandColor": "#FF3366" } }, "hideEventTypeDetails": false, "layout": "month_view" });
        })();
    }, []);

    return (
        <>
            {/* Team Member Deck Modal */}
            <AnimatePresence>
                {selectedMember !== null && (
                    <motion.div
                        key="member-modal-backdrop"
                        className="fixed inset-0 z-[1000] flex items-center justify-center overflow-hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => setSelectedMember(null)}
                    >
                        {/* Backdrop */}
                        <div className="absolute inset-0 bg-black/75 backdrop-blur-md" />

                        {/* Card deck */}
                        <div className="relative z-10" style={{ width: 380, height: 560 }} onClick={e => e.stopPropagation()}>
                            {teamMembers.map((member, idx) => {
                                const total = teamMembers.length;
                                let d = ((idx - (selectedMember ?? 0)) % total + total) % total;
                                if (d > total / 2) d = d - total;
                                const absD = Math.abs(d);
                                return (
                                    <motion.div
                                        key={idx}
                                        className="absolute inset-0 bg-white/[0.02] backdrop-blur-2xl rounded-[32px] border border-white/[0.08] shadow-[0_20px_40px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col"
                                        animate={{ x: d * 165, scale: 1 - absD * 0.11, opacity: absD === 0 ? 1 : Math.max(0.45, 0.78 - absD * 0.18), zIndex: 10 - absD, rotate: d * -2.5, y: absD * 12 }}
                                        transition={{ type: 'spring', stiffness: 340, damping: 32 }}
                                        style={{ cursor: absD > 0 ? 'pointer' : 'default', isolation: 'isolate' }}
                                        onClick={() => { if (absD > 0) setSelectedMember(idx); }}
                                    >
                                        {absD === 0 && (
                                            <div className="absolute inset-0 z-0 pointer-events-none opacity-30" style={{ background: 'radial-gradient(circle at 50% 20%, rgba(255,51,102,0.3), transparent 60%)' }} />
                                        )}
                                        
                                        <div className="relative z-10 flex-1 flex flex-col items-center px-8 pt-10 pb-8 text-center h-full">
                                            {absD === 0 && (
                                                <button onClick={e => { e.stopPropagation(); setSelectedMember(null); }} className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/[0.08] hover:bg-white/20 border border-white/10 flex items-center justify-center transition-colors shadow-lg">
                                                    <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M1 1l12 12M13 1L1 13" stroke="white" strokeWidth="2" strokeLinecap="round" /></svg>
                                                </button>
                                            )}
                                            
                                            <div className={`relative rounded-full mb-4 ${absD === 0 ? 'w-24 h-24 p-1.5 border border-white/10 bg-white/5' : 'w-16 h-16 p-1 border border-white/5 bg-white/5 mt-4'}`}>
                                                <img src={member.avatar.startsWith('/') ? member.avatar : `https://i.pravatar.cc/200?u=${member.avatar}`} alt={member.name} className="w-full h-full rounded-full object-cover" />
                                            </div>
                                            
                                            <h2 className={`font-semibold text-white tracking-tight leading-tight ${absD === 0 ? 'text-3xl' : 'text-xl'}`} style={{ fontFamily: 'var(--font-display)' }}>{member.name}</h2>
                                            <p className="text-white/40 text-xs font-semibold uppercase tracking-[0.15em] mt-1 mb-1">{member.role}</p>
                                            {absD === 0 && <p className="text-[#FF3366]/80 text-[11px] font-medium tracking-wide flex items-center justify-center gap-1.5"><svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" /><circle cx="12" cy="9" r="2.5" /></svg>{member.location}</p>}
                                            
                                            {absD === 0 && (
                                                <div className="flex flex-col flex-1 justify-center w-full mt-6">
                                                    <p className="font-serif italic text-white/80 text-base leading-snug mb-5">
                                                        {member.quote}
                                                    </p>
                                                    <p className="text-white/50 text-sm leading-relaxed mb-6">
                                                        {member.bio}
                                                    </p>
                                                    
                                                    <div className="flex flex-wrap gap-2 justify-center mt-auto">
                                                        {member.skills.map(skill => <span key={skill} className="px-3 py-1.5 rounded-full bg-white/[0.04] text-white/60 text-[11px] font-semibold tracking-wide border border-white/5">{skill}</span>)}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Dot indicators */}
                        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                            {teamMembers.map((_, idx) => (
                                <button key={idx} onClick={e => { e.stopPropagation(); setSelectedMember(idx); }} className={`rounded-full transition-all duration-300 ${idx === selectedMember ? 'w-6 h-2 bg-white' : 'w-2 h-2 bg-white/40 hover:bg-white/70'}`} />
                            ))}
                        </div>
                    </motion.div>
                )}

            </AnimatePresence>

            <section className="py-32 overflow-visible" id="faq">
                <div className="pg-inner grid grid-cols-1 lg:grid-cols-12 gap-16 items-start overflow-visible">

                    {/* Left Column Component: FAQ */}
                    <div className="lg:col-span-7">
                        <h2 className="text-5xl md:text-7xl tracking-tight mb-16">
                            {t.faq.heading} <span className="font-serif italic text-[#FF3366]">{t.faq.accent}</span>
                        </h2>
                        <div>
                            {t.faq.items.map((faq, i) => (
                                <FaqItem
                                    key={i}
                                    q={faq.q}
                                    a={faq.a}
                                    isOpen={openIndices.includes(i)}
                                    onToggle={() => setOpenIndices(prev => prev.includes(i) ? prev.filter(idx => idx !== i) : [...prev, i])}
                                />
                            ))}
                        </div>


                    </div>

                    {/* Right Column Component: Sticky Booking Widget */}
                    <div id="booking-section-target" className="lg:col-span-5 relative overflow-visible">
                        <div className="sticky top-32 w-full overflow-visible">

                            {/* TEAM Folder ─ top of sticky column */}
                            <div ref={faqRef} className="relative flex justify-center overflow-visible" style={{ paddingTop: '110px', marginTop: '-110px' }}>
                                {/* Annotation: positioned so right edge clears folder's left edge */}
                                <div
                                    className={`absolute top-1/2 translate-y-4 flex flex-col items-end gap-1 rotate-[-10deg] pointer-events-none transition-opacity duration-300 ${folderOpen ? 'opacity-0' : 'opacity-100'
                                        }`}
                                    style={{ zIndex: 1, right: 'calc(50% + 140px)' }}
                                >
                                    <span className="font-serif italic text-3xl text-[#FF3366] whitespace-nowrap leading-tight">{t.faq.getToKnow}</span>
                                    {/* Arrow sweeps from bottom-left (below text) curving right → toward folder */}
                                    <svg width="88" height="56" viewBox="0 0 110 70" fill="none" xmlns="http://www.w3.org/2000/svg" className="self-end mr-2">
                                        <path d="M8 8 Q20 65 82 58" stroke="#FF3366" strokeWidth="4" fill="none" strokeDasharray="6,5" strokeLinecap="round" />
                                        <path d="M88 47 L100 55 L88 63" stroke="#FF3366" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>

                                {/* Folder – z-index: 2 ensures it stacks above annotation (z:1) */}
                                <div style={{ position: 'relative', zIndex: 2 }}>
                                    <Folder
                                        size={1.8}
                                        color="#FF3366"
                                        onOpenChange={setFolderOpen}
                                        onCardClick={i => setSelectedMember(i)}
                                        items={[
                                            <div key="t1" className="flex flex-col items-center justify-center p-1 group pointer-events-auto cursor-pointer rounded-xl">
                                                <div className="rounded-full overflow-hidden w-[52px] h-[52px] mb-2 shadow-sm ring-2 ring-[var(--border)] group-hover:ring-[var(--text)] transition-all duration-300">
                                                    <img src="/vapor.webp" alt="Vapor" className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500" />
                                                </div>
                                                <p className="font-serif italic text-[13px] text-[var(--text)] opacity-80 leading-none tracking-wide">Vapor</p>
                                            </div>,
                                            <div key="t2" className="flex flex-col items-center justify-center p-1 group pointer-events-auto cursor-pointer rounded-xl">
                                                <div className="rounded-full overflow-hidden w-[52px] h-[52px] mb-2 shadow-sm ring-2 ring-[var(--border)] group-hover:ring-[var(--text)] transition-all duration-300">
                                                    <img src="https://i.pravatar.cc/150?u=marcus_aova" alt="Marcus" className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500" />
                                                </div>
                                                <p className="font-serif italic text-[13px] text-[var(--text)] opacity-80 leading-none tracking-wide">Marcus</p>
                                            </div>,
                                            <div key="t3" className="flex flex-col items-center justify-center p-1 group pointer-events-auto cursor-pointer rounded-xl">
                                                <div className="rounded-full overflow-hidden w-[52px] h-[52px] mb-2 shadow-sm ring-2 ring-[var(--border)] group-hover:ring-[var(--text)] transition-all duration-300">
                                                    <img src="/Noire.png" alt="Leif" className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500" />
                                                </div>
                                                <p className="font-serif italic text-[13px] text-[var(--text)] opacity-80 leading-none tracking-wide">Leif</p>
                                            </div>,
                                            <div key="t4" className="flex flex-col items-center justify-center p-1 group pointer-events-auto cursor-pointer rounded-xl">
                                                <div className="rounded-full overflow-hidden w-[52px] h-[52px] mb-2 shadow-sm ring-2 ring-[var(--border)] group-hover:ring-[var(--text)] transition-all duration-300">
                                                    <img src="/Kudy.png" alt="Kudy" className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500" />
                                                </div>
                                                <p className="font-serif italic text-[13px] text-[var(--text)] opacity-80 leading-none tracking-wide">Kudy</p>
                                            </div>,
                                            <div key="t5" className="flex flex-col items-center justify-center p-1 group pointer-events-auto cursor-pointer rounded-xl">
                                                <div className="rounded-full overflow-hidden w-[52px] h-[52px] mb-2 shadow-sm ring-2 ring-[var(--border)] group-hover:ring-[var(--text)] transition-all duration-300">
                                                    <img src="/filip.jpg" alt="Filip" className="w-full h-full object-cover object-[center_35%] filter grayscale group-hover:grayscale-0 transition-all duration-500" />
                                                </div>
                                                <p className="font-serif italic text-[13px] text-[var(--text)] opacity-80 leading-none tracking-wide">Filip</p>
                                            </div>,
                                            <div key="t6" className="flex flex-col items-center justify-center p-1 group pointer-events-auto cursor-pointer rounded-xl">
                                                <div className="rounded-full overflow-hidden w-[52px] h-[52px] mb-2 shadow-sm ring-2 ring-[var(--border)] group-hover:ring-[var(--text)] transition-all duration-300">
                                                    <img src="https://i.pravatar.cc/150?u=amina_aova" alt="Amina" className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500" />
                                                </div>
                                                <p className="font-serif italic text-[13px] text-[var(--text)] opacity-80 leading-none tracking-wide">Amina</p>
                                            </div>
                                        ]}
                                    />
                                </div>
                            </div>

                            {/* Booking Widget ─ below the folder */}
                            <style>{`
                                .bk-ray {
                                    width: 250px;
                                    height: 40px;
                                    border-radius: 100px;
                                    position: absolute;
                                    background-color: #ffffff;
                                    opacity: 0.15;
                                    box-shadow: 0 0 50px #ffffff;
                                    filter: blur(12px);
                                    transform-origin: 0%;
                                    top: -2%;
                                    left: -2%;
                                    transform: rotate(35deg);
                                }
                            `}</style>
                            <motion.div
                                id="booking-widget"
                                onMouseMove={handleMouseMove}
                                onMouseLeave={handleMouseLeave}
                                whileHover={{ scale: 1.02, boxShadow: "0 20px 40px -10px rgba(0,0,0,0.6)" }}
                                transition={{ duration: 0.3 }}
                                className="w-full rounded-[40px] p-[1px] relative shadow-2xl group mt-8 overflow-hidden bg-[var(--booking-bg)]"
                                style={{ 
                                    rotateX, 
                                    rotateY, 
                                    transformStyle: "preserve-3d", 
                                    perspective: 1000
                                }}
                            >
                                {/* Animated edge beam */}
                                <div className="absolute inset-[-100%] animate-[spin_8s_linear_infinite] opacity-30 group-hover:opacity-60 transition-opacity duration-700 pointer-events-none z-0" 
                                    style={{ background: 'conic-gradient(from 0deg, transparent 0, transparent 75%, rgba(255,255,255,0.4) 100%)' }} 
                                />

                                {/* Main Inner Card Content */}
                                <div className="relative w-full h-full rounded-[39px] p-8 md:p-12 overflow-hidden z-10" 
                                    style={{ backgroundImage: "var(--booking-grad)" }}
                                >
                                    {/* Premium details from the cool card */}
                                    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 rounded-[39px]">
                                        <div className="bk-ray" />
                                    </div>

                                    {/* Dynamic Hover Spotlight Glow */}
                                    <motion.div
                                        className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100 z-0"
                                        style={{
                                            background: useMotionTemplate`
                                            radial-gradient(
                                                600px circle at ${mouseX}px ${mouseY}px,
                                                rgba(255, 255, 255, 0.1),
                                                transparent 80%
                                            )
                                        `,
                                        }}
                                    />

                                    {/* Inner grain overlay */}
                                    <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none z-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

                                    <div className="relative z-10 flex flex-col h-full items-center text-center w-full" style={{ transform: "translateZ(30px)" }}>
                                        <div className="flex-1 flex flex-col items-center justify-center w-full">
                                            <div className="flex justify-center -space-x-6 mb-6">
                                                <div className="w-[84px] h-[84px] rounded-full border-4 border-[var(--booking-inner)] overflow-hidden shadow-lg relative z-10 bg-[var(--booking-inner)]">
                                                    <img src="/Kudy.png" alt="Profile" className="w-full h-full object-cover" />
                                                </div>
                                                <div className="w-[84px] h-[84px] rounded-full border-4 border-[var(--booking-inner)] overflow-hidden shadow-lg relative z-0 bg-[var(--booking-inner)]">
                                                    <img src="/Noire.png" alt="Profile" className="w-full h-full object-cover" />
                                                </div>
                                            </div>

                                            <h3 className="text-4xl md:text-5xl font-serif font-medium leading-[1.1] tracking-tight mb-6 w-full text-[#FF3366]">
                                                <span className="bg-[var(--booking-inner)] md:bg-transparent md:backdrop-blur-none bg-opacity-70 backdrop-blur-md px-4 py-2 rounded-xl inline-block whitespace-pre-line">{t.faq.bookHeading}</span>
                                            </h3>

                                            <motion.button
                                                data-cal-namespace=""
                                                data-cal-link="rick/get-rick-rolled"
                                                data-cal-config='{"layout":"month_view"}'
                                                whileHover={{
                                                    scale: 1.05,
                                                    rotateX: 12,
                                                    rotateY: -8,
                                                    y: -5,
                                                    boxShadow: "0 25px 50px -12px rgba(180, 180, 200, 0.45)"
                                                }}
                                                whileTap={{ scale: 0.95, rotateX: 0, rotateY: 0 }}
                                                style={{ transformStyle: "preserve-3d", perspective: 1000 }}
                                                className="w-full bg-[var(--text)] text-[var(--surface)] hover:bg-[var(--text)]/90 font-semibold text-lg py-5 rounded-2xl shadow-xl transition-all duration-300"
                                            >
                                                <span style={{ transform: "translateZ(20px)" }} className="block">
                                                    {t.faq.bookCta}
                                                </span>
                                            </motion.button>
                                        </div>

                                        {/* Footer Email Note */}
                                        <button onClick={handleCopy} className="group/email flex flex-col items-center justify-center w-full bg-[var(--booking-email-bg)] rounded-[24px] py-8 mt-10 transition-all duration-300 hover:bg-[var(--booking-email-hover)] hover:shadow-lg border border-[var(--border)] hover:border-[#FF3366]/30 relative z-20 shrink-0">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={`mb-4 transition-colors duration-300 ${copied ? 'text-[#FF3366]' : 'text-[var(--muted)] group-hover/email:text-[#FF3366]'}`}>
                                                {copied ? (
                                                    <path d="M20 6L9 17l-5-5"></path>
                                                ) : (
                                                    <>
                                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                                        <polyline points="22,6 12,13 2,6"></polyline>
                                                    </>
                                                )}
                                            </svg>
                                            <span className="text-xs font-semibold text-[var(--muted)] uppercase tracking-widest mb-2 transition-colors">{copied ? t.faq.copied : t.faq.preferEmail}</span>
                                            <span className="text-lg md:text-xl text-[var(--text)] group-hover/email:text-[#FF3366] transition-colors" style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.03em' }}>aovastudio@gmail.com</span>
                                        </button>
                                    </div>
                                </div>
                            </motion.div>

                        </div>
                    </div>

                </div>

            </section>
        </>
    );
}

/* ================================================================
   FOOTER
   ================================================================ */
function Footer() {
    const t = useT();
    const [isHovered, setIsHovered] = useState(false);

    return (
        <footer className="relative bg-[#111111] text-white py-20 rounded-t-[40px] md:rounded-t-[80px] mt-20 overflow-hidden">
            <div className="absolute inset-0 bg-dots opacity-[0.05] pointer-events-none -z-10 mix-blend-overlay" />
            <div className="pg-inner flex flex-col items-center text-center">
                <h2 className="text-6xl md:text-[120px] leading-none font-serif italic tracking-tight mb-12 text-[#FF3366] text-center pointer-events-none">
                    <span
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        className="cursor-default pointer-events-auto"
                        style={{ lineHeight: 0.8, display: "inline", padding: 0, verticalAlign: "baseline" }}
                    >
                        {t.footer.talkPrefix}
                        <span className="inline-block relative">
                            {t.footer.talkExpand[0]}
                            <motion.span
                                initial={{ width: 0 }}
                                animate={{ width: isHovered ? "auto" : 0 }}
                                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                className="overflow-hidden inline-flex whitespace-nowrap align-bottom absolute left-full top-0 h-full"
                            >
                                {t.footer.talkExpand.slice(1)}
                            </motion.span>
                        </span>
                        <motion.span
                            initial={{ width: 0 }}
                            animate={{ width: isHovered ? "auto" : 0 }}
                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden inline-flex whitespace-nowrap align-bottom opacity-0 pointer-events-none select-none"
                            aria-hidden="true"
                        >
                            {t.footer.talkExpand.slice(1)}
                        </motion.span>
                        {t.footer.talkSuffix}{isHovered ? '!' : '.'}
                    </span>
                </h2>
                <motion.button
                    onClick={triggerBookingSpark}
                    whileHover={{ scale: 1.05, rotateX: 12, rotateY: -8, y: -5, boxShadow: "0 25px 50px -12px rgba(180, 180, 200, 0.45)" }}
                    whileTap={{ scale: 0.95, rotateX: 0, rotateY: 0 }}
                    style={{ transformStyle: "preserve-3d", perspective: 1000 }}
                    className="pg-btn bg-white text-black hover:bg-[#FF3366] hover:text-white hover:border-[#FF3366] !text-lg !px-8 !py-4 mb-32 shadow-xl transition-colors duration-300"
                >
                    <span style={{ transform: "translateZ(20px)" }}>
                        {t.footer.startProject}
                    </span>
                </motion.button>

                <div className="w-full flex flex-col md:flex-row items-center justify-between border-t border-white/10 pt-10 pb-4 gap-8">
                    {/* AOVASTUDIO.svg Logo (Left) */}
                    <div className="flex items-center flex-1 justify-center md:justify-start">
                        <img src="/AOVASTUDIO.svg" alt="Aova Studio" className="h-5 md:h-7 w-auto invert opacity-90 transition-opacity hover:opacity-100" />
                    </div>

                    {/* Centered Social Links (All next to each other on one row) */}
                    <div className="flex gap-4 md:gap-8 text-[11px] md:text-sm text-white/50 uppercase tracking-widest font-medium justify-center shrink-0">
                        <a href="#" className="hover:text-white transition-colors whitespace-nowrap">X</a>
                        <a href="#" className="hover:text-white transition-colors whitespace-nowrap">Instagram</a>
                        <a href="#" className="hover:text-white transition-colors whitespace-nowrap">LinkedIn</a>
                        <a href="#" className="hover:text-white transition-colors whitespace-nowrap">Discord</a>
                    </div>

                    {/* Balanced Copyright block (Right) */}
                    <div className="flex flex-col items-center md:items-end text-white/30 text-[10px] md:text-xs flex-1 mt-2 md:mt-0">
                        <span className="whitespace-nowrap">&copy; 2026 Aova Design Studio.</span>
                        <span className="whitespace-nowrap">{t.footer.allRights}</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default function HomePage() {
    const [isDark, setIsDark] = useState(false);
    const [lang, setLang] = useState<Lang>('en');

    useEffect(() => {
        const mq = window.matchMedia("(prefers-color-scheme: dark)");
        setIsDark(mq.matches);
        const handler = (e: MediaQueryListEvent) => setIsDark(e.matches);
        mq.addEventListener("change", handler);
        return () => mq.removeEventListener("change", handler);
    }, []);

    useEffect(() => {
        if (isDark) {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
    }, [isDark]);

    return (
        <LangContext.Provider value={lang}>
        <main className="relative">
            <CustomCursor />
            <Navbar isDark={isDark} toggleDark={() => setIsDark(!isDark)} lang={lang} setLang={setLang} />
            <Hero isDark={isDark} />
            <WorkSection />
            <InteractiveServices />
            <CustomServicesSection />


            <Testimonials />

            <BuyingProcess />
            <FaqSection />
            <Footer />
        </main>
        </LangContext.Provider>
    );
}
