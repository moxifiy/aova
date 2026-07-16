"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScroll() {
    const pathname = usePathname();

    // Stop the browser from restoring the previous scroll position on refresh —
    // it races with Lenis's own init and can leave the page a few px short of 0.
    useEffect(() => {
        if ("scrollRestoration" in window.history) {
            window.history.scrollRestoration = "manual";
        }
    }, []);

    // Every page opens at the top — never inherit the previous page's scroll
    useEffect(() => {
        const l = (window as unknown as { lenis?: { scrollTo: (t: number, o?: object) => void } }).lenis;
        if (l) l.scrollTo(0, { immediate: true });
        window.scrollTo(0, 0);
    }, [pathname]);

    useEffect(() => {
        if (typeof window === "undefined") return;

        gsap.registerPlugin(ScrollTrigger);
        // Smooth glide — noticeable but controlled
        const lenis = new Lenis({ lerp: 0.075, smoothWheel: true, wheelMultiplier: 1 });
        // expose so the footer's back-to-top can scroll smoothly through Lenis
        (window as unknown as { lenis?: Lenis }).lenis = lenis;
        // Force-sync to 0 on init — on refresh the browser may have already
        // nudged native scrollTop before Lenis took over.
        lenis.scrollTo(0, { immediate: true });

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
