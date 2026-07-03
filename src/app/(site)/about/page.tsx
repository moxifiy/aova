"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useLanguage } from "../_components/LanguageContext";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

// Scroll-triggered orchestration: stagger children in, no bounce
const groupV: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
};
const lineV: Variants = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

// Big display type carries left side-bearing that scales with font size; pull it back
// so its first letter optically lines up with the body copy beneath it.
const OPTICAL = { marginLeft: "-0.04em" };

export default function AboutPage() {
    const { t } = useLanguage();
    const [officeOpen, setOfficeOpen] = useState(false);

    // Office viewer: freeze scroll while open, Escape closes
    useEffect(() => {
        const lenis = (window as unknown as { lenis?: { stop: () => void; start: () => void } }).lenis;
        if (officeOpen) {
            lenis?.stop();
            document.body.style.overflow = "hidden";
        } else {
            lenis?.start();
            document.body.style.overflow = "";
        }
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOfficeOpen(false);
        };
        if (officeOpen) window.addEventListener("keydown", onKey);
        return () => {
            window.removeEventListener("keydown", onKey);
            lenis?.start();
            document.body.style.overflow = "";
        };
    }, [officeOpen]);

    const team = [
        { name: t("Leif Schanche", "Leif Schanche"), role: t("Graphic Designer", "Grafický designér") },
        { name: t("Kudy", "Kudy"), role: t("Motion Designer", "Motion designér") },
        { name: t("Vapor", "Vapor"), role: t("Strategist", "Stratég") },
        { name: t("Michael", "Michael"), role: t("Video Editor", "Střihač videa") },
        { name: t("Filip", "Filip"), role: t("Photographer", "Fotograf") },
    ];

    return (
        <main className="bg-white text-[#0A0A0A] pt-32 md:pt-44 pb-24 md:pb-40 px-6 md:px-12 min-h-screen">
            <div className="max-w-[1440px] mx-auto">

                {/* ───────────── OPENING ───────────── */}
                <section className="pb-24 md:pb-32">
                    <div className="max-w-[1100px]">
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.9, ease: EASE }}
                            style={OPTICAL}
                            className="text-5xl md:text-7xl lg:text-[80px] font-medium font-display tracking-tight leading-[0.98]"
                        >
                            {t(
                                "The engine behind brands that outgrow their competition",
                                "Motor značek, kterým konkurence nestačí"
                            )}
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.9, ease: EASE, delay: 0.12 }}
                            className="mt-8 md:mt-10 max-w-[680px] text-lg md:text-xl text-[#8A8A8A] font-body leading-relaxed"
                        >
                            {t(
                                "We handle everything that makes a brand impossible to ignore. Strategy, identity, motion, and how you show up across every platform. Built by founders, not committees. The kind of presence competitors can't catch up to.",
                                "Řešíme všechno, co dělá značku nepřehlédnutelnou. Strategii, identitu, motion i to, jak vystupujete na každé platformě. Tvoří ji zakladatelé, ne komise. Náskok, který konkurence nedožene."
                            )}
                        </motion.p>
                    </div>
                </section>

                {/* ───────────── TEAM ───────────── */}
                <motion.section
                    variants={groupV}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    <motion.p
                        variants={lineV}
                        style={OPTICAL}
                        className="max-w-[1000px] text-2xl md:text-4xl lg:text-[44px] font-medium font-display tracking-tight leading-[1.12]"
                    >
                        {t(
                            "A small team of selected creatives who excel in their field. That's what makes what we do possible.",
                            "Malý tým vybraných kreativců, z nichž každý je špičkou ve svém oboru. Přesně díky tomu je možné to, co děláme."
                        )}
                    </motion.p>

                    {/* Team — picture placeholders with name + role (swap each box for a real portrait) */}
                    <motion.div
                        variants={groupV}
                        className="mt-16 md:mt-24 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-12"
                    >
                        {team.map((member) => (
                            <motion.div key={member.name} variants={lineV} className="group">
                                <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#0A0A0A]/[0.04] border border-[#0A0A0A]/10 flex items-center justify-center transition-colors duration-300 group-hover:bg-[#0A0A0A]/[0.06]">
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.4"
                                        className="w-9 h-9 md:w-10 md:h-10 text-[#0A0A0A]/15"
                                    >
                                        <circle cx="12" cy="9" r="3.2" />
                                        <path d="M5.5 19c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6" strokeLinecap="round" />
                                    </svg>
                                </div>
                                <div className="mt-4">
                                    <h3 className="text-base md:text-lg font-medium font-display tracking-[0.01em] leading-tight">
                                        {member.name}
                                    </h3>
                                    <p className="mt-1.5 text-[11px] font-medium tracking-[0.03em] text-[#8A8A8A] font-mono">
                                        {member.role}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.section>

                {/* ───────────── WHY AOVA EXISTS ───────────── */}
                <motion.section
                    variants={groupV}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="pt-28 md:pt-44"
                >
                    <div className="max-w-[860px] flex flex-col gap-7 md:gap-9">
                        <motion.p variants={lineV} className="text-lg md:text-[22px] leading-[1.6] text-[#0A0A0A] font-body font-medium">
                            {t(
                                "Most brand projects fall apart in the same place: the handoff. Not the idea, not the first draft, but the point where something that started sharp gets passed along enough hands that it loses what made it worth doing in the first place. Everyone's seen it happen. A strong direction going in, something flat and safe coming out.",
                                "Většina brandových projektů se rozpadne na stejném místě: u předávky. Ne u nápadu, ne u prvního návrhu, ale ve chvíli, kdy něco, co začalo ostře, projde tolika rukama, že ztratí přesně to, proč to vůbec stálo za to dělat. Každý to zná. Dovnitř jde silný směr, ven vyjde něco plochého a bezpečného."
                            )}
                        </motion.p>
                        <motion.p variants={lineV} className="text-lg md:text-[22px] leading-[1.6] text-[#8A8A8A] font-body">
                            {t(
                                "We built AOVA around avoiding that exact failure point. Every project moves through the same small group from strategy to final delivery, so nothing gets reinterpreted, softened, or lost in translation along the way. What you approve in the first call is still recognizable in the last file you receive.",
                                "AOVA jsme postavili přesně proto, abychom se tomuhle bodu selhání vyhnuli. Každý projekt jde od strategie až po finální dodání rukama stejné malé skupiny lidí, takže se cestou nic špatně nepřeloží, nezměkčí ani neztratí. To, co schválíte na prvním hovoru, poznáte i v posledním souboru, který od nás dostanete."
                            )}
                        </motion.p>
                        <motion.p variants={lineV} className="text-lg md:text-[22px] leading-[1.6] text-[#8A8A8A] font-body">
                            {t(
                                "That also means we're selective about who we take on. We'd rather turn down work that doesn't fit than stretch ourselves thin trying to be everything to everyone. Fewer clients, more attention, work that actually holds up once it's out in the world.",
                                "Znamená to taky, že si vybíráme, s kým pracujeme. Radši odmítneme projekt, který nesedí, než abychom se roztahovali do šířky a snažili se být vším pro všechny. Méně klientů, víc pozornosti — a práce, která obstojí i potom, co vyjde do světa."
                            )}
                        </motion.p>
                        <motion.p variants={lineV} className="text-lg md:text-[22px] leading-[1.6] text-[#0A0A0A] font-body font-medium">
                            {t(
                                "If you've worked with a studio before and walked away with something technically fine but forgettable, that's the exact outcome we're built to avoid.",
                                "Jestli jste už někdy od studia odešli s výsledkem, který byl technicky v pořádku, ale zapomenutelný — přesně tomu jsme tady, abychom předešli."
                            )}
                        </motion.p>
                    </div>
                </motion.section>

                {/* ───────────── OUR OFFICES ───────────── */}
                <motion.section
                    variants={groupV}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="pt-28 md:pt-44"
                >
                    <motion.div variants={lineV}>
                        <span className="block text-[11px] font-bold uppercase tracking-[0.24em] text-[#8A8A8A] font-mono mb-6">
                            {t("Our offices", "Naše kanceláře")}
                        </span>
                    </motion.div>
                    <motion.h2
                        variants={lineV}
                        style={OPTICAL}
                        className="text-5xl md:text-7xl lg:text-[80px] font-medium font-display tracking-tight leading-[0.98] mb-10 md:mb-14"
                    >
                        BRNO
                    </motion.h2>
                    <motion.div variants={lineV}>
                        <button
                            onClick={() => setOfficeOpen(true)}
                            aria-label={t("View our Brno office", "Prohlédnout si naši kancelář v Brně")}
                            data-cursor-text={t("View", "Prohlédnout")}
                            className="cursor-none-v2 group relative block w-full max-w-[1100px] aspect-[16/9] overflow-hidden bg-[#0A0A0A]/5"
                        >
                            <Image
                                src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=1600&auto=format&fit=crop"
                                alt={t("Aova Studio office in Brno", "Kancelář Aova Studia v Brně")}
                                fill
                                sizes="(max-width: 768px) 100vw, 1100px"
                                className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                            />
                        </button>
                    </motion.div>
                </motion.section>

            </div>

            {/* Office viewer */}
            <AnimatePresence>
                {officeOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed inset-0 z-[10000] bg-[#0A0A0A]/95 flex items-center justify-center px-5 md:px-10"
                        onClick={() => setOfficeOpen(false)}
                    >
                        <div className="w-full max-w-[1000px]" onClick={(e) => e.stopPropagation()}>
                            <div className="relative w-full aspect-[16/9] overflow-hidden">
                                <Image
                                    src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=1920&auto=format&fit=crop"
                                    alt={t("Aova Studio office in Brno", "Kancelář Aova Studia v Brně")}
                                    fill
                                    sizes="(max-width: 1024px) 100vw, 1000px"
                                    className="object-cover"
                                />
                            </div>
                            <div className="mt-6 md:mt-8 flex flex-col md:flex-row md:items-start gap-3 md:gap-12">
                                <h3 className="text-2xl md:text-3xl font-medium font-display tracking-tight text-white shrink-0">
                                    {t("Brno, Czech Republic", "Brno, Česká republika")}
                                </h3>
                                <p className="text-base md:text-lg text-white/60 font-body leading-relaxed max-w-[520px]">
                                    {t(
                                        "Most of our team is based in Brno — the studio's home. Strategy, design, and motion come together here under one roof, and from here we work with brands and creators anywhere in the world.",
                                        "Většina našeho týmu sídlí v Brně — tady je studio doma. Strategie, design i motion tu vznikají pod jednou střechou a odsud pracujeme se značkami a tvůrci kdekoliv na světě."
                                    )}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => setOfficeOpen(false)}
                            aria-label={t("Close", "Zavřít")}
                            className="absolute top-5 right-5 md:top-8 md:right-8 w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/10 border border-white/25 text-white flex items-center justify-center transition-colors duration-300 hover:bg-white/25"
                            style={{ backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)" }}
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" className="w-5 h-5">
                                <path d="M6 6l12 12M18 6L6 18" />
                            </svg>
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}
