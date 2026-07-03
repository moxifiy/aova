"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScroll() {
    useEffect(() => {
        if (typeof window === "undefined") return;

        gsap.registerPlugin(ScrollTrigger);
        // Smooth glide — noticeable but controlled
        const lenis = new Lenis({ lerp: 0.075, smoothWheel: true, wheelMultiplier: 1 });
        // expose so the footer's back-to-top can scroll smoothly through Lenis
        (window as unknown as { lenis?: Lenis }).lenis = lenis;

        lenis.on("scroll", ScrollTrigger.update);
        const ticker = (time: number) => lenis.raf(time * 1000);
        gsap.ticker.add(ticker);
        gsap.ticker.lagSmoothing(0);

        return () => {
            gsap.ticker.remove(ticker);
            lenis.destroy();
        };
    }, []);

    return null;
}
