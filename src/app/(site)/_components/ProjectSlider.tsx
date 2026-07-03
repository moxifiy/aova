"use client";

import { useEffect, useRef, useState } from "react";
import VideoLightbox from "./VideoLightbox";
import { useLanguage } from "./LanguageContext";

export default function ProjectSlider() {
    const { t } = useLanguage();
    const [watching, setWatching] = useState(false);
    const watchingRef = useRef(false);
    const bgVideoRef = useRef<HTMLVideoElement>(null);

    // Pause the background loop while the sound-on player is open
    useEffect(() => {
        watchingRef.current = watching;
        const bg = bgVideoRef.current;
        if (watching) bg?.pause();
        else bg?.play().catch(() => {});
    }, [watching]);

    // Pause the background loop while the hero is scrolled out of view (saves decode work)
    useEffect(() => {
        const bg = bgVideoRef.current;
        if (!bg || !("IntersectionObserver" in window)) return;
        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    if (!watchingRef.current) bg.play().catch(() => {});
                } else {
                    bg.pause();
                }
            },
            { threshold: 0.05 }
        );
        io.observe(bg);
        return () => io.disconnect();
    }, []);

    return (
        <section className="relative w-full h-screen overflow-hidden bg-[#0A0A0A]">

            {/* Hover: circular WATCH SHOWREEL cursor. Click: watch with sound. */}
            <button
                onClick={() => setWatching(true)}
                aria-label={t("Watch showreel with sound", "Přehrát showreel se zvukem")}
                data-cursor-text={t("Watch Showreel", "Přehrát showreel")}
                className="absolute inset-0 z-10 w-full h-full cursor-none-v2"
            />

            {/* Background showreel — always muted, looping */}
            <div className="absolute inset-0 w-full h-full">
                <video
                    ref={bgVideoRef}
                    src="/no-outro.mp4"
                    poster="/showreel-poster.jpg"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    disablePictureInPicture
                    className="object-cover w-full h-full brightness-[0.65] md:brightness-[0.75]"
                />
                {/* Elegant overlay gradient to keep the frame rich and legible */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/85 via-[#0A0A0A]/20 to-[#0A0A0A]/40 pointer-events-none" />
            </div>

            {/* Touch affordance — no hover cursor on phones */}
            <div className="md:hidden absolute bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
                <span className="text-white/80 text-[11px] font-host font-medium uppercase tracking-[0.3em] whitespace-nowrap">
                    {t("Tap to watch showreel", "Klepnutím přehrajete showreel")}
                </span>
            </div>

            {/* Sound-on player */}
            <VideoLightbox src="/no-outro.mp4" open={watching} onClose={() => setWatching(false)} />

        </section>
    );
}
