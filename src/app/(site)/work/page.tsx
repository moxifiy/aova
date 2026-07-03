"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../_components/LanguageContext";
import { CASE_STUDIES } from "./projects";

export default function WorkPage() {
    const { t, lang } = useLanguage();
    const L = lang === "EN" ? "en" : "cz";
    const [filter, setFilter] = useState<"All" | "Branding" | "Web" | "UI/UX" | "Editorial">("All");

    const filteredProjects = CASE_STUDIES.filter(
        (project) => filter === "All" || project.category === filter
    );

    return (
        <main className="bg-[#0A0A0A] text-white pt-32 md:pt-40 pb-24 md:pb-36 px-6 md:px-12 min-h-screen">
            <div className="max-w-[1440px] mx-auto">

                <h1 className="text-5xl md:text-7xl font-normal font-display tracking-tight mb-12 max-w-[800px] leading-[0.95]" style={{ letterSpacing: "-0.045em" }}>
                    {t("Selected Projects", "Vybrané projekty")}
                </h1>

                {/* Filter Pills */}
                <div className="flex flex-wrap items-center gap-2 mb-16 md:mb-20">
                    {(["All", "Branding", "Web", "UI/UX", "Editorial"] as const).map((cat) => {
                        const isActive = filter === cat;
                        return (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`text-xs font-semibold uppercase tracking-wider px-5 py-2.5 rounded-full border transition-all duration-300 font-body ${
                                    isActive
                                        ? "bg-[#E0218A] text-white border-[#E0218A]"
                                        : "bg-transparent text-white/50 border-white/15 hover:border-white/40 hover:text-white"
                                }`}
                            >
                                {t(cat, cat === "All" ? "Vše" : cat)}
                            </button>
                        );
                    })}
                </div>

                {/* Two-up editorial grid — sharp corners, hover reveals project info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project) => (
                            <motion.div
                                layout
                                key={project.slug}
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.98 }}
                                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            >
                                {/* Custom cursor lives on the image only */}
                                <Link
                                    href={`/work/${project.slug}`}
                                    className="group relative block aspect-[4/3] w-full overflow-hidden cursor-none-v2"
                                >
                                    <Image
                                        src={project.hero}
                                        alt={`${project.client} — ${project.title.en}`}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                                    />

                                    {/* Hover: name + view project */}
                                    <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-8 bg-[#0A0A0A]/65 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div>
                                            <h3 className="text-2xl md:text-3xl font-medium font-display tracking-tight text-white">
                                                {project.client}
                                            </h3>
                                            <p className="mt-2 text-sm md:text-base text-white/60 font-body max-w-[420px]">
                                                {project.title[L]}
                                            </p>
                                        </div>
                                        <span className="inline-flex items-center gap-2 text-sm md:text-base font-semibold font-body text-white">
                                            {t("View Project", "Zobrazit projekt")}
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1">
                                                <path d="M9 6l6 6-6 6" />
                                            </svg>
                                        </span>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

            </div>
        </main>
    );
}
