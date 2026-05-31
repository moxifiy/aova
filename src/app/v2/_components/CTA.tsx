"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function CTA() {
    const ctaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        if (ctaRef.current) {
            gsap.fromTo(
                ctaRef.current.querySelectorAll(".cta-animate"),
                { opacity: 0, y: 100 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.2,
                    stagger: 0.15,
                    ease: "expo.out",
                    scrollTrigger: {
                        trigger: ctaRef.current,
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
        <section ref={ctaRef} className="bg-white text-[#0A0A0A] py-24 md:py-40 px-6 md:px-12 relative overflow-hidden border-t border-[#0A0A0A]/5">
            <div className="max-w-[1440px] mx-auto text-center flex flex-col items-center justify-center">
                
                {/* Micro Header Tag */}


                {/* Oversized Statement */}
                <h2
                    className="cta-animate text-4xl md:text-6xl lg:text-7xl font-normal tracking-tight font-display mb-10 max-w-[900px] leading-[0.95]"
                    style={{ letterSpacing: "-0.045em" }}
                >
                    Have a vision? Let&rsquo;s architect it together.
                </h2>

                {/* Custom Bespoke Button with Signature Fuchsia Hover Accent */}
                <Link
                    href="/v2/contact"
                    className="cta-animate transition-all duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] hover:scale-[1.02] text-sm md:text-base font-semibold px-10 py-5 inline-flex items-center gap-3 font-body bg-[#0A0A0A] text-white border border-[#0A0A0A] hover:bg-transparent hover:text-[#0A0A0A]"
                >
                    <span>Start a Project</span>
                    <span className="text-lg">&rarr;</span>
                </Link>

            </div>
        </section>
    );
}
