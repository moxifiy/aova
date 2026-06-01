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
                    className="cta-animate text-4xl md:text-6xl lg:text-7xl font-normal tracking-tight font-display mb-12 max-w-[1200px] leading-[1.0] uppercase"
                    style={{ letterSpacing: "-0.045em" }}
                >
                    Have a vision?<br />Let&rsquo;s architect it together.
                </h2>

                {/* Primary pill button — matches the studio button (no flowers) */}
                <Link
                    href="/v2/contact"
                    className="cta-animate inline-block font-host font-normal text-sm md:text-[15px] px-8 py-3.5 bg-[#2C2C2C] rounded-full transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.12)] hover:bg-[#1A1A1A]"
                >
                    <span className="text-white">CONTACT US</span>
                </Link>

            </div>
        </section>
    );
}
