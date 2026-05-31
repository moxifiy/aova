"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface ProjectItem {
    id: number;
    client: string;
    title: string;
    image: string;
    hoverImage: string;
    category: string;
    tags: string[];
    link: string;
}

const PROJECTS: ProjectItem[] = [
    {
        id: 1,
        client: "Orca Compute Systems",
        title: "Establishing institutional credibility for deep tech ecosystems.",
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop",
        hoverImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop",
        category: "Branding / Identity",
        tags: ["Identity", "Design System", "3D Art"],
        link: "/v2/work/orca"
    },
    {
        id: 2,
        client: "Vela Architecture",
        title: "Reimagining architectural portfolios as breathing visual spaces.",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop",
        hoverImage: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000&auto=format&fit=crop",
        category: "Web / Front-end",
        tags: ["Interactive UX", "React Redesign", "Lenis Scroll"],
        link: "/v2/work/vela"
    },
    {
        id: 3,
        client: "Vapor Frontier",
        title: "Pioneering fluid digital campaigns for web3 design platforms.",
        image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000&auto=format&fit=crop",
        hoverImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000&auto=format&fit=crop",
        category: "Visual Identity",
        tags: ["Campaign", "3D Design", "Visual Assets"],
        link: "/v2/work/vapor"
    },
    {
        id: 4,
        client: "Noire Magazine",
        title: "Elevating print editorial standards for independent visual artists.",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000&auto=format&fit=crop",
        hoverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop",
        category: "Print / Editorial",
        tags: ["Typography", "Grid Systems", "Book Design"],
        link: "/v2/work/noire"
    }
];

export default function SelectedWork() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        if (containerRef.current) {
            const cards = containerRef.current.querySelectorAll(".work-card");
            cards.forEach((card) => {
                gsap.fromTo(
                    card,
                    { opacity: 0, y: 100 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1.2,
                        ease: "expo.out",
                        scrollTrigger: {
                            trigger: card,
                            start: "top 88%",
                            toggleActions: "play none none none"
                        }
                    }
                );
            });
        }

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    return (
        <section className="bg-white text-[#0A0A0A] pt-16 md:pt-24 pb-16 md:pb-32 px-6 md:px-12 relative overflow-hidden border-t border-[#0A0A0A]/5">
            <div className="max-w-[1440px] mx-auto" ref={containerRef}>
                
                {/* Section header */}
                <div className="mb-16 md:mb-24">
                    <h2 className="group/arrow text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight font-display text-balance uppercase flex items-center gap-3.5 cursor-default select-none">
                        <span>See for yourselves</span>
                        <span
                            aria-hidden="true"
                            className="v2-wink inline-block origin-center text-[#0A0A0A] group-hover/arrow:[animation:v2-wink_0.6s_cubic-bezier(0.34,1.56,0.64,1)]"
                        >
                            ;)
                        </span>
                    </h2>
                </div>

                {/* Staggered asymmetric 2-column grid layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-x-16 md:gap-y-32">
                    {PROJECTS.map((project, idx) => {
                        // Offset the even cards to create the staggered print look!
                        const isEven = idx % 2 === 1;
                        return (
                            <Link
                                key={project.id}
                                href={project.link}
                                className={`work-card group flex flex-col justify-start ${
                                    isEven ? "md:mt-24" : ""
                                }`}
                            >
                                {/* Image — minimal subtle zoom on hover. Custom cursor only here. */}
                                <div className="relative aspect-[3/2] w-full overflow-hidden bg-[#F2F2F2] border border-[#0A0A0A]/10 cursor-none-v2">
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                                    />
                                </div>

                                {/* Caption — just the project name, bold + uppercase */}
                                <div className="mt-5">
                                    <h3 className="text-xl md:text-2xl font-semibold uppercase tracking-tight text-[#0A0A0A] transition-colors duration-300">
                                        {project.client}
                                    </h3>
                                </div>
                            </Link>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}

