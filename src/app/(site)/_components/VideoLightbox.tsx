"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function fmt(s: number) {
    if (!isFinite(s) || s < 0) return "0:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
}

// The whole volume scale is halved: slider at 100% = 50% of the file's real
// loudness, so nothing ever plays uncomfortably loud. Playback starts with the
// slider at its midpoint (= 25% real volume).
const VOLUME_CEILING = 0.5;

/**
 * Shared sound-on video player overlay with custom minimal controls that match
 * the site (thin white lines, Host Grotesk labels, no browser chrome).
 * Starts at 50% volume; Escape or the close button dismisses it.
 */
export default function VideoLightbox({
    src,
    open,
    onClose,
}: {
    src: string;
    open: boolean;
    onClose: () => void;
}) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [playing, setPlaying] = useState(true);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(0.5);

    // Freeze page scroll while the player is open
    useEffect(() => {
        const lenis = (window as unknown as { lenis?: { stop: () => void; start: () => void } }).lenis;
        if (open) {
            lenis?.stop();
            document.body.style.overflow = "hidden";
        } else {
            lenis?.start();
            document.body.style.overflow = "";
        }
        return () => {
            lenis?.start();
            document.body.style.overflow = "";
        };
    }, [open]);

    // Escape closes
    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open, onClose]);

    const togglePlay = () => {
        const v = videoRef.current;
        if (!v) return;
        if (v.paused) v.play().catch(() => {});
        else v.pause();
    };

    const seek = (e: React.MouseEvent<HTMLDivElement>) => {
        const v = videoRef.current;
        if (!v || !duration) return;
        const r = e.currentTarget.getBoundingClientRect();
        const p = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
        v.currentTime = p * duration;
        setProgress(p * duration);
    };

    const changeVolume = (val: number) => {
        const v = videoRef.current;
        if (!v) return;
        v.volume = val * VOLUME_CEILING;
        v.muted = val === 0;
        setVolume(val);
    };

    const pct = duration ? (progress / duration) * 100 : 0;

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="fixed inset-0 z-[10000] bg-black flex items-center justify-center"
                >
                    <video
                        ref={videoRef}
                        src={src}
                        autoPlay
                        playsInline
                        disablePictureInPicture
                        onClick={togglePlay}
                        onContextMenu={(e) => e.preventDefault()}
                        onLoadedMetadata={(e) => {
                            const v = e.currentTarget;
                            v.volume = 0.5 * VOLUME_CEILING; // slider midpoint = 25% real volume
                            setVolume(0.5);
                            setDuration(v.duration || 0);
                        }}
                        onTimeUpdate={(e) => setProgress(e.currentTarget.currentTime)}
                        onPlay={() => setPlaying(true)}
                        onPause={() => setPlaying(false)}
                        onEnded={() => setPlaying(false)}
                        className="w-full h-full object-contain"
                    />

                    {/* Close — frosted, matches the watch cursor */}
                    <button
                        onClick={onClose}
                        aria-label="Close video"
                        className="absolute top-5 right-5 md:top-8 md:right-8 w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/10 border border-white/25 text-white flex items-center justify-center transition-colors duration-300 hover:bg-white/25"
                        style={{ backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)" }}
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" className="w-5 h-5">
                            <path d="M6 6l12 12M18 6L6 18" />
                        </svg>
                    </button>

                    {/* Custom minimal controls */}
                    <div className="absolute inset-x-0 bottom-0 px-5 md:px-10 pb-5 md:pb-7 pt-20 bg-gradient-to-t from-black/75 via-black/30 to-transparent">
                        {/* Timeline */}
                        <div onClick={seek} className="group relative h-5 flex items-center cursor-pointer select-none">
                            <div className="relative w-full h-[2px] bg-white/25 transition-[height] duration-200 group-hover:h-[4px]">
                                <div className="absolute left-0 top-0 h-full bg-white" style={{ width: `${pct}%` }} />
                            </div>
                        </div>

                        <div className="mt-2 flex items-center gap-4 md:gap-6">
                            {/* Play / pause */}
                            <button onClick={togglePlay} aria-label={playing ? "Pause" : "Play"} className="text-white/90 hover:text-white transition-colors">
                                {playing ? (
                                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                        <rect x="6" y="5" width="4" height="14" />
                                        <rect x="14" y="5" width="4" height="14" />
                                    </svg>
                                ) : (
                                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                        <path d="M7 4.5l13 7.5-13 7.5z" />
                                    </svg>
                                )}
                            </button>

                            {/* Time */}
                            <span className="text-[11px] font-host font-medium tracking-[0.15em] text-white/60 tabular-nums whitespace-nowrap">
                                {fmt(progress)} / {fmt(duration)}
                            </span>

                            {/* Volume */}
                            <div className="ml-auto flex items-center gap-3">
                                <button
                                    onClick={() => changeVolume(volume === 0 ? 0.5 : 0)}
                                    aria-label={volume === 0 ? "Unmute" : "Mute"}
                                    className="text-white/90 hover:text-white transition-colors"
                                >
                                    {volume === 0 ? (
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                                            <path d="M11 5L6 9H3v6h3l5 4V5z" fill="currentColor" stroke="none" />
                                            <path d="M16 9l5 6M21 9l-5 6" />
                                        </svg>
                                    ) : (
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                                            <path d="M11 5L6 9H3v6h3l5 4V5z" fill="currentColor" stroke="none" />
                                            <path d="M15.5 8.5a5 5 0 010 7" />
                                            <path d="M18.5 6a9 9 0 010 12" opacity={volume > 0.55 ? 1 : 0.35} />
                                        </svg>
                                    )}
                                </button>
                                <input
                                    type="range"
                                    min={0}
                                    max={1}
                                    step={0.05}
                                    value={volume}
                                    onChange={(e) => changeVolume(parseFloat(e.target.value))}
                                    aria-label="Volume"
                                    className="aova-vol w-20 md:w-28"
                                    style={{
                                        background: `linear-gradient(to right, #fff ${volume * 100}%, rgba(255,255,255,0.25) ${volume * 100}%)`,
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
