"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../_components/LanguageContext";

interface ProjectItem {
    id: number;
    client: string;
    title: string;
    image: string;
    category: "Branding" | "Web" | "UI/UX" | "Editorial";
    tags: string[];
}

const ALL_PROJECTS: ProjectItem[] = [
    {
        id: 1,
        client: "Orca Compute Systems",
        title: "Establishing institutional credibility for deep tech ecosystems.",
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop",
        category: "Branding",
        tags: ["Identity", "Design System", "3D Art"]
    },
    {
        id: 2,
        client: "Vela Architecture",
        title: "Reimagining architectural portfolios as breathing visual spaces.",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop",
        category: "Web",
        tags: ["Interactive UX", "React Redesign", "Lenis Scroll"]
    },
    {
        id: 3,
        client: "Vapor Frontier",
        title: "Pioneering fluid digital campaigns for web3 design platforms.",
        image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000&auto=format&fit=crop",
        category: "Branding",
        tags: ["Campaign", "3D Design", "Visual Assets"]
    },
    {
        id: 4,
        client: "Noire Magazine",
        title: "Elevating print editorial standards for independent visual artists.",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000&auto=format&fit=crop",
        category: "Editorial",
        tags: ["Typography", "Grid Systems", "Book Design"]
    },
    {
        id: 5,
        client: "Kudy Motion Studio",
        title: "Crafting fluid vector aesthetics for creative agency reels.",
        image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=1000&auto=format&fit=crop",
        category: "UI/UX",
        tags: ["Vector Art", "Interface Design", "Prototyping"]
    },
    {
        id: 6,
        client: "Amina Digital",
        title: "Bridging architectural styling with corporate web excellence.",
        image: "https://images.unsplash.com/photo-1586075010923-2dd45e9b2d4f?q=80&w=1000&auto=format&fit=crop",
        category: "Web",
        tags: ["Development", "Svelte Config", "Animations"]
    }
];

export default function WorkPage() {
    const { t } = useLanguage();
    const [filter, setFilter] = useState<"All" | "Branding" | "Web" | "UI/UX" | "Editorial">("All");

    const filteredProjects = ALL_PROJECTS.filter(
        (project) => filter === "All" || project.category === filter
    );

    return (
        <main className="bg-white text-[#0A0A0A] pt-32 md:pt-40 pb-24 px-6 md:px-12 min-h-screen">
            <div className="max-w-[1440px] mx-auto">
                
                {/* Header & Eyebrow */}


                <h1 className="text-5xl md:text-7xl font-normal font-display tracking-tight mb-12 max-w-[800px] leading-[0.95]" style={{ letterSpacing: "-0.045em" }}>
                    {t("Selected Projects", "Vybrané Projekty")}
                </h1>

                {/* Filter Pills */}
                <div className="flex flex-wrap items-center gap-2 mb-16 md:mb-24">
                    {(["All", "Branding", "Web", "UI/UX", "Editorial"] as const).map((cat) => {
                        const isActive = filter === cat;
                        return (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`text-xs font-semibold uppercase tracking-wider px-5 py-2.5 rounded-full border transition-all duration-300 font-body ${
                                    isActive
                                        ? "bg-[#E0218A] text-white border-[#E0218A]"
                                        : "bg-transparent text-[#8A8A8A] border-[#0A0A0A]/10 hover:border-[#0A0A0A]/30 hover:text-[#0A0A0A]"
                                }`}
                            >
                                {t(cat, cat === "All" ? "Vše" : cat)}
                            </button>
                        );
                    })}
                </div>

                {/* Portfolio Index Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-x-12 md:gap-y-16">
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project, idx) => (
                            <motion.div
                                layout
                                key={project.id}
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.98 }}
                                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                className="group flex flex-col justify-start cursor-none-v2"
                            >
                                {/* Media cover */}
                                <div className="relative aspect-[3/2] w-full overflow-hidden bg-[#0A0A0A]/5 border border-[#0A0A0A]/10">
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                        className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                                    />
                                    {/* Hover fuchsia accent outline */}
                                    <div className="absolute inset-0 border-0 group-hover:border-4 border-[#E0218A] transition-all duration-300 pointer-events-none" />
                                </div>

                                {/* Text information */}
                                <div className="mt-5 max-w-[450px]">
                                    <div className="flex flex-wrap items-center gap-2 mb-2">
                                        <span className="text-[10px] font-bold text-[#0A0A0A] font-mono uppercase mr-2">
                                            {t(project.category, project.category)}
                                        </span>
                                        {project.tags.slice(0, 2).map((tag) => (
                                            <span
                                                key={tag}
                                                className="text-[9px] font-bold text-[#0A0A0A] px-2 py-0.5 rounded-full border border-[#0A0A0A]/10 font-mono uppercase tracking-wider"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <h3 className="text-lg md:text-xl font-medium text-[#0A0A0A] font-display mb-1">
                                        {project.client}
                                    </h3>
                                    <p className="text-sm text-[#8A8A8A] font-normal leading-snug font-body">
                                        {project.title}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

            </div>
        </main>
    );
}
