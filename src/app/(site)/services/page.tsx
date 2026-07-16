"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siBlender, siCinema4d, siFigma, siFramer, siHtml5, siCss, siJavascript } from "simple-icons";
import { useLanguage } from "../_components/LanguageContext";
import Placeholder from "../_components/Placeholder";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

// Optical alignment for big display type (left side-bearing scales with size)
const OPTICAL = { marginLeft: "-0.04em" };

interface Service {
    title: string;
    paragraph: string;
    bullets: string[];
}

export default function ServicesPage() {
    const { t } = useLanguage();
    const [open, setOpen] = useState<number | null>(null);

    const SERVICES: Service[] = [
        {
            title: t("Brand Strategy", "Strategie značky"),
            paragraph: t(
                "Every brand people fall in love with started with someone asking the right questions first. We spend real time understanding your market, your audience, and what makes you different before a single design decision gets made. The strategy isn't a formality, it's the foundation everything else stands on. When it's right, the identity almost designs itself.",
                "Každá značka, do které se lidé zamilují, začala tím, že se někdo nejdřív ptal na správné otázky. Než padne jediné designové rozhodnutí, věnujeme skutečný čas pochopení vašeho trhu, publika a toho, v čem jste jiní. Strategie u nás není formalita — je to základ, na kterém stojí všechno ostatní. A když sedí, identita se skoro navrhne sama."
            ),
            bullets: [
                t("Positioning", "Positioning"),
                t("Purpose, mission, vision", "Smysl, mise, vize"),
                t("Naming", "Naming"),
                t("Market & audience research", "Průzkum trhu a publika"),
                t("Competitor analysis", "Analýza konkurence"),
                t("Brand voice & tone", "Hlas a tón značky"),
                t("Messaging & narrative direction", "Messaging a směr příběhu"),
            ],
        },
        {
            title: t("Brand Creation", "Tvorba značky"),
            paragraph: t(
                "This is where your brand becomes something people recognize before they even read the name. We build every piece of your identity to work as one system, so it feels just as strong on a phone screen as it does on a storefront. It's yours completely, no restrictions, no needing us to make it work. Just a brand that finally looks like it means business.",
                "Tady se z vaší značky stává něco, co lidé poznají dřív, než si přečtou jméno. Každou část identity stavíme jako jeden systém, aby působila stejně silně na displeji telefonu jako na výloze. A je celá vaše — žádná omezení, žádná závislost na nás. Prostě značka, která konečně vypadá, že to myslí vážně."
            ),
            bullets: [
                t("Logo design & concepts", "Design loga a koncepty"),
                t("Typography systems", "Typografické systémy"),
                t("Color systems", "Barevné systémy"),
                t("Brand guidelines", "Brand guidelines"),
                t("Social media kit", "Kit pro sociální sítě"),
                t("Full ownership rights", "Plná vlastnická práva"),
            ],
        },
        {
            title: t("Web Design", "Web design"),
            paragraph: t(
                "Your website is often the first real conversation someone has with your brand, so it needs to say the right things fast. We design sites that carry the same feeling as your identity while actually guiding people toward a decision. Nothing generic, nothing borrowed from a template library. Just something built specifically to represent you and move people to act.",
                "Web je často první opravdový rozhovor, který s vaší značkou někdo vede — musí proto rychle říct to podstatné. Navrhujeme weby, které nesou stejný pocit jako vaše identita a zároveň vedou návštěvníky k rozhodnutí. Nic generického, nic ze šablony. Jen web postavený přesně pro vás, který přiměje lidi jednat."
            ),
            bullets: [
                t("Website design", "Design webu"),
                t("UI/UX design", "UI/UX design"),
                t("Landing pages", "Landing pages"),
                t("Conversion-focused structure", "Struktura zaměřená na konverze"),
                t("Built on your brand system", "Postaveno na vašem brand systému"),
            ],
        },
        {
            title: t("Brand in Motion", "Značka v pohybu"),
            paragraph: t(
                "A brand that only exists as a static logo is a brand that's already behind. We give your identity movement, so it feels alive across video, social, and every screen it touches. The same energy, the same personality, just in motion. It's the difference between a brand people notice and one they remember.",
                "Značka, která existuje jen jako statické logo, je už teď pozadu. Dáme vaší identitě pohyb, aby žila ve videu, na sítích i na každé obrazovce, které se dotkne. Stejná energie, stejná osobnost — jen v pohybu. To je rozdíl mezi značkou, které si lidé všimnou, a značkou, kterou si zapamatují."
            ),
            bullets: [
                t("Logo animation", "Animace loga"),
                t("Brand / intro video", "Brand / intro video"),
                t("Motion systems", "Motion systémy"),
                t("Animated social assets", "Animované assety pro sítě"),
                t("Website motion design", "Motion design webu"),
            ],
        },
        {
            title: t("Social & Content Systems", "Sociální sítě a content systémy"),
            paragraph: t(
                "People experience your brand in fragments, a story here, a post there, so those fragments need to feel like they came from the same place. We build the systems and templates that keep your presence consistent everywhere it shows up, without slowing you down. So every post looks intentional, not improvised.",
                "Lidé vaši značku vnímají po kouscích — tady story, tam příspěvek — a ty kousky musí působit, jako by vyšly z jedné ruky. Stavíme systémy a šablony, díky kterým je vaše prezentace konzistentní všude, kde se objeví, a přitom vás nezpomalí. Každý příspěvek pak vypadá záměrně, ne narychlo."
            ),
            bullets: [
                t("Social templates & kits", "Šablony a kity pro sítě"),
                t("Content system design", "Design content systému"),
                t("Platform-specific formatting", "Formáty pro jednotlivé platformy"),
                t("Launch content batches", "Startovací dávky obsahu"),
            ],
        },
    ];

    return (
        <main className="bg-white text-[#0A0A0A] pt-32 md:pt-44 pb-0 px-6 md:px-12 min-h-screen overflow-x-clip">
            <div className="max-w-[1440px] mx-auto">

                {/* Page title */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, ease: EASE }}
                    style={OPTICAL}
                    className="text-5xl md:text-7xl lg:text-[80px] font-medium font-display tracking-tight leading-[0.98] mb-24 md:mb-36"
                >
                    {t("Our core solutions", "Naše klíčová řešení")}
                </motion.h1>

                {/* Service accordions — click a title to open its details */}
                <div className="border-t border-[#0A0A0A]/10">
                    {SERVICES.map((s, i) => {
                        const isOpen = open === i;
                        return (
                            <section key={s.title} className="border-b border-[#0A0A0A]/10">
                                {/* Title row */}
                                <button
                                    onClick={() => setOpen(isOpen ? null : i)}
                                    aria-expanded={isOpen}
                                    className="w-full flex items-center justify-between gap-6 py-8 md:py-12 text-left group"
                                >
                                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium font-display tracking-tight leading-none transition-colors duration-300 group-hover:text-[#8A8A8A]">
                                        {s.title}
                                    </h2>
                                    {/* Plus → cross */}
                                    <span
                                        className="relative shrink-0 w-8 h-8 md:w-10 md:h-10 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                                        style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
                                        aria-hidden="true"
                                    >
                                        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[2px] bg-[#0A0A0A]" />
                                        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-full w-[2px] bg-[#0A0A0A]" />
                                    </span>
                                </button>

                                {/* Expandable content */}
                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.55, ease: EASE }}
                                            className="overflow-hidden"
                                        >
                                            <div className="pb-12 md:pb-16">
                                                {/* Paragraph left (~60%), bullets right (~40%) vertically centered */}
                                                <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-10 md:gap-16 items-center">
                                                    <p className="text-base md:text-lg text-[#8A8A8A] font-body leading-relaxed max-w-[640px]">
                                                        {s.paragraph}
                                                    </p>
                                                    <ul className="flex flex-col gap-2.5 md:gap-3">
                                                        {s.bullets.map((b) => (
                                                            <li
                                                                key={b}
                                                                className="flex items-baseline gap-3 text-sm md:text-base font-medium font-body"
                                                            >
                                                                <span className="w-1 h-1 rounded-full bg-[#0A0A0A] shrink-0 translate-y-[-2px]" aria-hidden="true" />
                                                                {b}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                {/* References — swap each placeholder for real work samples */}
                                                <div className="mt-12 md:mt-16">
                                                    <span className="block text-[11px] font-medium tracking-[0.04em] text-[#8A8A8A] font-mono mb-4">
                                                        {t("References", "Reference")}
                                                    </span>
                                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                                                        {Array.from({ length: 4 }).map((_, r) => (
                                                            <div key={r} className="group relative aspect-[4/3] w-full">
                                                                <Placeholder />
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </section>
                        );
                    })}
                </div>

                {/* ───────────── TOOLS IN OUR ARSENAL ───────────── */}
                <section className="mt-32 md:mt-48 text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease: EASE }}
                        className="text-4xl md:text-5xl lg:text-6xl font-medium font-display tracking-tight uppercase mb-14 md:mb-20"
                    >
                        {t("Tools in our arsenal", "Nástroje v našem arzenálu")}
                    </motion.h2>

                    {/* 4×3 grid of marks — no tiles, no labels; tooltips carry the names.
                        select-none + drag guard keep the marks from being copied.
                        One staggered parent (not per-icon observers) and framer-driven
                        hover scale so transforms never fight each other. */}
                    <motion.div
                        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.045 } } }}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-60px" }}
                        className="grid grid-cols-3 md:grid-cols-4 gap-y-12 md:gap-y-16 gap-x-6 max-w-[900px] mx-auto select-none"
                        onContextMenu={(e) => e.preventDefault()}
                        onDragStart={(e) => e.preventDefault()}
                    >
                        {TOOLS.map((tool) => (
                            <motion.div
                                key={tool.name}
                                variants={{
                                    hidden: { opacity: 0, y: 14 },
                                    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
                                }}
                                className="flex items-center justify-center text-[#0A0A0A]"
                            >
                                {/* hover lives on the mark itself, not the whole grid cell */}
                                <motion.span
                                    initial={{ opacity: 0.75, scale: 1 }}
                                    whileHover={{ opacity: 1, scale: 1.1 }}
                                    transition={{ duration: 0.3, ease: EASE }}
                                    title={tool.name}
                                    aria-label={tool.name}
                                    className="inline-flex"
                                >
                                    {tool.icon}
                                </motion.span>
                            </motion.div>
                        ))}
                    </motion.div>
                </section>

            </div>

            {/* ───────────── CLUTCH — full-bleed dark band ───────────── */}
            <section className="relative left-1/2 w-screen -translate-x-1/2 bg-[#0A0A0A] text-white mt-32 md:mt-48">
                <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-20 md:py-28 flex flex-col items-center text-center gap-6">
                    <h2 className="text-3xl md:text-5xl font-medium font-display tracking-tight leading-[1.05] max-w-[560px]">
                        {t("Find us on Clutch", "Najdete nás na Clutch")}
                    </h2>
                    <p className="text-white/50 text-sm md:text-base max-w-[440px]">
                        {t(
                            "Our profile is live and we're just getting started — client reviews will land here soon.",
                            "Náš profil je živý a teprve začínáme — recenze od klientů zde brzy najdete."
                        )}
                    </p>
                    <a
                        href="https://clutch.co/profile/aova-studio"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 font-host font-normal text-sm md:text-[15px] px-8 py-3.5 bg-white rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.2)] hover:bg-white/90 transition-colors"
                    >
                        <span className="text-[#0A0A0A]">{t("View our Clutch profile", "Zobrazit profil na Clutch")}</span>
                    </a>
                </div>
            </section>
        </main>
    );
}


// ────────────────────────────────────────────────────────
// DATA — TOOLS (brand marks) & REVIEWS
// Adobe removed its marks from icon libraries, so Ps/Ai/Ae/Pr/Lr
// use the official rounded-square lettermark style, drawn inline.
// The rest are official paths from simple-icons.
// ────────────────────────────────────────────────────────

function AdobeMark({ letters }: { letters: string }) {
    return (
        <svg viewBox="0 0 24 24" className="h-9 md:h-11 w-auto" role="img" aria-hidden="true">
            <rect x="1.5" y="1.5" width="21" height="21" rx="4.5" fill="currentColor" />
            <text x="12" y="16" textAnchor="middle" fontSize="10" fontWeight="700" fontFamily="var(--font-host), system-ui, sans-serif" fill="#fff">
                {letters}
            </text>
        </svg>
    );
}

function SiMark({ d }: { d: string }) {
    return (
        <svg viewBox="0 0 24 24" className="h-9 md:h-11 w-auto" role="img" aria-hidden="true" fill="currentColor">
            <path d={d} />
        </svg>
    );
}

const TOOLS: { name: string; icon: React.ReactNode }[] = [
    { name: "Photoshop", icon: <AdobeMark letters="Ps" /> },
    { name: "Illustrator", icon: <AdobeMark letters="Ai" /> },
    { name: "After Effects", icon: <AdobeMark letters="Ae" /> },
    { name: "Premiere Pro", icon: <AdobeMark letters="Pr" /> },
    { name: "Lightroom", icon: <AdobeMark letters="Lr" /> },
    { name: "Blender", icon: <SiMark d={siBlender.path} /> },
    { name: "Cinema 4D", icon: <SiMark d={siCinema4d.path} /> },
    { name: "Figma", icon: <SiMark d={siFigma.path} /> },
    { name: "Framer", icon: <SiMark d={siFramer.path} /> },
    { name: "HTML", icon: <SiMark d={siHtml5.path} /> },
    { name: "CSS", icon: <SiMark d={siCss.path} /> },
    { name: "JavaScript", icon: <SiMark d={siJavascript.path} /> },
];

