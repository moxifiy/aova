"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ServicesTeaser() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        if (containerRef.current) {
            const cards = containerRef.current.querySelectorAll(".services-card");
            gsap.fromTo(
                cards,
                { opacity: 0, y: 100 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.2,
                    stagger: 0.15,
                    ease: "expo.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 85%",
                        toggleActions: "play none none none"
                    }
                }
            );
        }

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    return (
        <section className="bg-white text-[#0A0A0A] py-16 md:py-32 px-6 md:px-12 relative overflow-hidden border-t border-[#0A0A0A]/5">
            <div className="max-w-[1440px] mx-auto" ref={containerRef}>
                
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 md:mb-24">
                    <div>

                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight font-display text-balance">
                            Tailored systems for growth.
                        </h2>
                    </div>

                    <Link 
                        href="/v2/services" 
                        className="text-sm font-bold uppercase tracking-wider text-[#0A0A0A] hover:text-[#E0218A] transition-colors duration-300 border-b border-[#0A0A0A] hover:border-[#E0218A] pb-1 font-mono self-start md:self-auto"
                    >
                        View Strategy &rarr;
                    </Link>
                </div>

                {/* Offerings Split Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                    
                    {/* Left Column: Creators Segment */}
                    <div className="services-card flex flex-col justify-between p-8 md:p-12 border border-[#0A0A0A]/10 hover:border-[#E0218A] transition-colors duration-300">
                        <div>
                            <div className="flex items-center justify-between mb-8">
                                <span className="text-xs font-bold text-[#E0218A] tracking-wider uppercase font-mono">
                                    // Studio Model A
                                </span>
                                <span className="text-[10px] font-bold text-[#0A0A0A] rounded-full border border-[#0A0A0A]/10 px-3 py-1 font-mono uppercase bg-white">
                                    For Creators
                                </span>
                            </div>
                            <h3 className="text-3xl md:text-4xl font-medium tracking-tight font-display mb-6">
                                Maximizing attention and visual presence.
                            </h3>
                            <p className="text-sm md:text-base text-[#8A8A8A] font-body font-normal leading-relaxed mb-8">
                                Creators are premium brands operating at light speed. We elevate your assets to studio standards—ensuring that every asset builds momentum and trust.
                            </p>
                        </div>
                        
                        {/* Capabilities List */}
                        <ul className="flex flex-col gap-4 border-t border-[#0A0A0A]/10 pt-8 font-body">
                            <li className="flex items-center justify-between text-sm md:text-base font-medium">
                                <span className="text-[#0A0A0A]">Video Editing & Rhythms</span>
                                <span className="text-[#8A8A8A] text-xs">Retainers available</span>
                            </li>
                            <li className="flex items-center justify-between text-sm md:text-base font-medium">
                                <span className="text-[#0A0A0A]">Custom Eye-Catching Thumbnails</span>
                                <span className="text-[#8A8A8A] text-xs">High click rates</span>
                            </li>
                            <li className="flex items-center justify-between text-sm md:text-base font-medium">
                                <span className="text-[#0A0A0A]">Editorial Creator Branding</span>
                                <span className="text-[#8A8A8A] text-xs">Wordmarks & Logos</span>
                            </li>
                        </ul>
                    </div>

                    {/* Right Column: Brands Segment */}
                    <div className="services-card flex flex-col justify-between p-8 md:p-12 border border-[#0A0A0A]/10 hover:border-[#E0218A] transition-colors duration-300">
                        <div>
                            <div className="flex items-center justify-between mb-8">
                                <span className="text-xs font-bold text-[#E0218A] tracking-wider uppercase font-mono">
                                    // Studio Model B
                                </span>
                                <span className="text-[10px] font-bold text-[#0A0A0A] rounded-full border border-[#0A0A0A]/10 px-3 py-1 font-mono uppercase bg-white">
                                    For Businesses & Brands
                                </span>
                            </div>
                            <h3 className="text-3xl md:text-4xl font-medium tracking-tight font-display mb-6">
                                Securing authority and trust on the web.
                            </h3>
                            <p className="text-sm md:text-base text-[#8A8A8A] font-body font-normal leading-relaxed mb-8">
                                Premium brands require absolute execution. We construct bespoke digital identities, robust layout grids, and interactive interfaces that translate quality without compromises.
                            </p>
                        </div>

                        {/* Capabilities List */}
                        <ul className="flex flex-col gap-4 border-t border-[#0A0A0A]/10 pt-8 font-body">
                            <li className="flex items-center justify-between text-sm md:text-base font-medium">
                                <span className="text-[#0A0A0A]">Bespoke Identity & Guidelines</span>
                                <span className="text-[#8A8A8A] text-xs">Vector & Assets</span>
                            </li>
                            <li className="flex items-center justify-between text-sm md:text-base font-medium">
                                <span className="text-[#0A0A0A]">Next.js Interactive Redesigns</span>
                                <span className="text-[#8A8A8A] text-xs">Turbopack / Framer</span>
                            </li>
                            <li className="flex items-center justify-between text-sm md:text-base font-medium">
                                <span className="text-[#0A0A0A]">High-Conversion Motion Ads</span>
                                <span className="text-[#8A8A8A] text-xs">Paid campaign assets</span>
                            </li>
                        </ul>
                    </div>

                </div>

            </div>
        </section>
    );
}

