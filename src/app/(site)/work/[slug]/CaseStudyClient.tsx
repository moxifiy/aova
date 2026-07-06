"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "../../_components/LanguageContext";
import Placeholder from "../../_components/Placeholder";
import { CASE_STUDIES, COVER_TITLE, COVER_DESCRIPTION, type CaseStudy } from "../projects";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

export default function CaseStudyClient({ project }: { project: CaseStudy }) {
    const { t, lang } = useLanguage();
    const L = lang === "EN" ? "en" : "cz";

    const idx = CASE_STUDIES.findIndex((p) => p.slug === project.slug);
    const next = CASE_STUDIES[(idx + 1) % CASE_STUDIES.length];

    return (
        <main className="bg-white text-[#0A0A0A] pt-28 md:pt-36 pb-24 md:pb-36 min-h-screen">
            <div className="max-w-[1440px] mx-auto px-6 md:px-12">

                {/* Back link */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: EASE }}
                >
                    <Link
                        href="/work"
                        className="inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.04em] text-[#8A8A8A] font-mono hover:text-[#0A0A0A] transition-colors duration-300"
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                            <path d="M15 18l-6-6 6-6" />
                        </svg>
                        {t("All work", "Všechny projekty")}
                    </Link>
                </motion.div>

                {/* Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, ease: EASE, delay: 0.05 }}
                    className="mt-8 md:mt-12 text-4xl md:text-6xl lg:text-7xl font-medium font-display tracking-tight leading-[0.98] max-w-[1000px]"
                    style={{ marginLeft: "-0.04em" }}
                >
                    {COVER_TITLE}
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
                    className="mt-5 text-lg md:text-xl text-[#8A8A8A] font-body max-w-[640px] leading-relaxed"
                >
                    {COVER_DESCRIPTION}
                </motion.p>

                {/* Meta row */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: EASE, delay: 0.25 }}
                    className="mt-10 md:mt-12 flex flex-wrap gap-x-16 gap-y-6 border-t border-[#0A0A0A]/10 pt-6"
                >
                    <div>
                        <span className="block text-[11px] font-medium tracking-[0.04em] text-[#8A8A8A] font-mono mb-1.5">
                            {t("Category", "Kategorie")}
                        </span>
                        <span className="text-sm md:text-base font-medium font-body">{project.category}</span>
                    </div>
                    <div>
                        <span className="block text-[11px] font-medium tracking-[0.04em] text-[#8A8A8A] font-mono mb-1.5">
                            {t("Year", "Rok")}
                        </span>
                        <span className="text-sm md:text-base font-medium font-body">{project.year}</span>
                    </div>
                    <div>
                        <span className="block text-[11px] font-medium tracking-[0.04em] text-[#8A8A8A] font-mono mb-1.5">
                            {t("Services", "Služby")}
                        </span>
                        <span className="text-sm md:text-base font-medium font-body">{project.services[L].join(" · ")}</span>
                    </div>
                </motion.div>
            </div>

            {/* Hero image — full bleed */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: EASE, delay: 0.3 }}
                className="mt-12 md:mt-16 relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden"
            >
                <Placeholder iconClassName="w-16 h-16 md:w-20 md:h-20" />
            </motion.div>

            <div className="max-w-[1440px] mx-auto px-6 md:px-12">
                {/* Intro */}
                <motion.p
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.8, ease: EASE }}
                    className="mt-20 md:mt-28 max-w-[820px] text-lg md:text-[22px] leading-[1.6] text-[#0A0A0A] font-body font-medium"
                >
                    {project.intro[L]}
                </motion.p>

                {/* Image pair */}
                <motion.div
                    initial={{ opacity: 0, y: 32 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.8, ease: EASE }}
                    className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
                >
                    {[0, 1].map((i) => (
                        <div key={i} className="relative aspect-[4/3] w-full overflow-hidden">
                            <Placeholder />
                        </div>
                    ))}
                </motion.div>

                {/* Outcome */}
                <motion.p
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.8, ease: EASE }}
                    className="mt-16 md:mt-24 max-w-[820px] text-lg md:text-[22px] leading-[1.6] text-[#8A8A8A] font-body"
                >
                    {project.outcome[L]}
                </motion.p>

                {/* Next project */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.8, ease: EASE }}
                    className="mt-24 md:mt-36 border-t border-[#0A0A0A]/10 pt-10 md:pt-14"
                >
                    <span className="block text-[11px] font-medium tracking-[0.04em] text-[#8A8A8A] font-mono mb-4">
                        {t("Next project", "Další projekt")}
                    </span>
                    <Link
                        href={`/work/${next.slug}`}
                        className="group inline-flex items-center gap-4 text-3xl md:text-5xl font-medium font-display tracking-tight leading-none hover:text-[#E0218A] transition-colors duration-300"
                    >
                        {COVER_TITLE}
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 md:w-9 md:h-9 transition-transform duration-300 group-hover:translate-x-2">
                            <path d="M5 12h14M13 6l6 6-6 6" />
                        </svg>
                    </Link>
                </motion.div>
            </div>
        </main>
    );
}
