"use client";

import { useEffect, useRef, useState } from "react";

// The whole volume scale is halved: slider at 100% = 50% of the file's real
// loudness. Playback starts with the slider at its midpoint (= 25% real volume).
const VOLUME_CEILING = 0.5;
const CONTROLS_HIDE_MS = 2200;

interface InlineVideoProps {
    src: string;
    poster?: string;
    /** Circle-cursor label while in ambient (muted loop) mode */
    cursorLabel: string;
    ariaLabel: string;
    /** Fill the parent (hero) instead of being a positioned block of its own */
    fill?: boolean;
    /** Darken + gradient while ambient (hero look) */
    dimmed?: boolean;
    /** Mobile tap hint shown while ambient */
    hint?: string;
    /** Sizing for the outer wrapper (e.g. "w-full max-w-[1100px]") */
    className?: string;
}

/**
 * A video that lives in the page. Ambient by default (muted, looping), and
 * clicking it starts a sound-on viewing *in place* — no fullscreen overlay.
 * Controls are minimal: a draggable scrub bar at the bottom and a vertical
 * volume pill outside the frame; both fade away when the mouse goes idle.
 * The video ending returns it to ambient.
 */
export default function InlineVideo({
    src,
    poster,
    cursorLabel,
    ariaLabel,
    fill = false,
    dimmed = false,
    hint,
    className = "",
}: InlineVideoProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const barRef = useRef<HTMLDivElement>(null);
    const fillRef = useRef<HTMLDivElement>(null);
    const activeRef = useRef(false);
    const scrubbingRef = useRef(false);
    const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [active, setActive] = useState(false);
    const [controlsVisible, setControlsVisible] = useState(true);
    const [volume, setVolume] = useState(0.5);

    // Drive the scrub fill straight from the video clock every animation frame —
    // the `timeupdate` event only fires ~4×/sec, which reads as a stuttering bar.
    useEffect(() => {
        if (!active) return;
        let raf = 0;
        const tick = () => {
            const v = videoRef.current;
            const fill = fillRef.current;
            if (v && fill && v.duration && !scrubbingRef.current) {
                fill.style.width = `${(v.currentTime / v.duration) * 100}%`;
            }
            raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [active]);

    // Only decode/play while on screen
    useEffect(() => {
        const v = videoRef.current;
        if (!v || !("IntersectionObserver" in window)) return;
        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    if (!activeRef.current) v.play().catch(() => {});
                } else {
                    v.pause();
                }
            },
            { threshold: 0.05 }
        );
        io.observe(v);
        return () => io.disconnect();
    }, []);

    useEffect(() => {
        return () => {
            if (hideTimer.current) clearTimeout(hideTimer.current);
        };
    }, []);

    // Controls appear on any mouse movement over the player and fade out after
    // a couple of idle seconds — clean frame while just watching.
    const poke = () => {
        setControlsVisible(true);
        if (hideTimer.current) clearTimeout(hideTimer.current);
        hideTimer.current = setTimeout(() => setControlsVisible(false), CONTROLS_HIDE_MS);
    };

    const activate = () => {
        const v = videoRef.current;
        if (!v) return;
        activeRef.current = true;
        v.loop = false;
        v.currentTime = 0;
        v.muted = false;
        v.volume = 0.5 * VOLUME_CEILING; // slider midpoint = 25% real volume
        setVolume(0.5);
        v.play().catch(() => {});
        setActive(true);
        poke();
    };

    const deactivate = () => {
        const v = videoRef.current;
        if (!v) return;
        activeRef.current = false;
        v.muted = true;
        v.loop = true;
        v.play().catch(() => {});
        setActive(false);
    };

    const togglePlay = () => {
        const v = videoRef.current;
        if (!v) return;
        if (v.paused) v.play().catch(() => {});
        else v.pause();
        poke();
    };

    // Draggable scrubbing — pointer capture so the drag keeps working even when
    // the cursor leaves the bar mid-drag.
    const scrubTo = (clientX: number) => {
        const v = videoRef.current;
        const bar = barRef.current;
        if (!v || !bar || !v.duration) return;
        const r = bar.getBoundingClientRect();
        const p = Math.min(1, Math.max(0, (clientX - r.left) / r.width));
        v.currentTime = p * v.duration;
        if (fillRef.current) fillRef.current.style.width = `${p * 100}%`;
    };

    const changeVolume = (val: number) => {
        const v = videoRef.current;
        if (!v) return;
        v.volume = val * VOLUME_CEILING;
        v.muted = val === 0;
        setVolume(val);
        poke();
    };

    const controlsCls = `transition-opacity duration-300 ${controlsVisible ? "opacity-100" : "opacity-0 pointer-events-none"}`;

    const video = (
        <div className={`relative overflow-hidden group ${fill ? "w-full h-full" : "flex-1 aspect-video bg-[#0A0A0A]"}`}>
            <video
                ref={videoRef}
                src={src}
                poster={poster}
                autoPlay
                muted
                loop
                playsInline
                preload={fill ? "auto" : "metadata"}
                disablePictureInPicture
                onClick={active ? togglePlay : undefined}
                onContextMenu={(e) => e.preventDefault()}
                onEnded={deactivate}
                className={`absolute inset-0 w-full h-full object-cover transition-[filter] duration-500 ${
                    dimmed && !active ? "brightness-[0.65] md:brightness-[0.75]" : ""
                }`}
            />

            {/* Ambient-mode dim gradient (hero) */}
            {dimmed && !active && (
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/85 via-[#0A0A0A]/20 to-[#0A0A0A]/40 pointer-events-none" />
            )}

            {/* Ambient: whole surface is the watch trigger */}
            {!active && (
                <button
                    onClick={activate}
                    aria-label={ariaLabel}
                    data-cursor-text={cursorLabel}
                    className="cursor-none-v2 absolute inset-0 z-10 w-full h-full"
                />
            )}

            {/* Mobile tap hint (no hover cursor on touch) */}
            {!active && hint && (
                <div className="md:hidden absolute bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
                    <span className="text-white/80 text-[11px] font-host font-medium tracking-[0.04em] whitespace-nowrap">
                        {hint}
                    </span>
                </div>
            )}

            {/* Bottom overlay — a draggable scrub bar, nothing else */}
            {active && (
                <div className={`absolute inset-x-0 bottom-0 z-20 px-4 md:px-8 pb-4 md:pb-5 pt-10 bg-gradient-to-t from-black/60 via-black/15 to-transparent ${controlsCls}`}>
                    <div
                        ref={barRef}
                        onPointerDown={(e) => {
                            e.currentTarget.setPointerCapture(e.pointerId);
                            scrubbingRef.current = true;
                            scrubTo(e.clientX);
                        }}
                        onPointerMove={(e) => {
                            if (scrubbingRef.current) scrubTo(e.clientX);
                        }}
                        onPointerUp={() => {
                            scrubbingRef.current = false;
                        }}
                        onPointerCancel={() => {
                            scrubbingRef.current = false;
                        }}
                        className="group/bar relative h-6 flex items-center cursor-pointer select-none touch-none"
                    >
                        <div className="relative w-full h-[3px] bg-white/25 rounded-full transition-[height] duration-200 group-hover/bar:h-[5px]">
                            <div ref={fillRef} className="absolute left-0 top-0 h-full bg-white rounded-full" style={{ width: "0%" }} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );

    // Vertical volume pill — icon + fader in one rounded capsule, outside the
    // frame: floating on the hero, a side column in whitespace on boxed video.
    const volumePill = (
            <div
                className={`flex flex-col items-center gap-2 rounded-full px-2 py-3 border ${controlsCls} ${
                    fill
                        ? "bg-white/10 border-white/25"
                        : "bg-[#0A0A0A]/[0.04] border-[#0A0A0A]/10"
                }`}
                style={fill ? { backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)" } : undefined}
            >
                <button
                    onClick={() => changeVolume(volume === 0 ? 0.5 : 0)}
                    aria-label={volume === 0 ? "Unmute" : "Mute"}
                    className={`transition-colors duration-300 ${fill ? "text-white/90 hover:text-white" : "text-[#0A0A0A]/70 hover:text-[#0A0A0A]"}`}
                >
                    {volume === 0 ? (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-4.5 h-4.5">
                            <path d="M11 5L6 9H3v6h3l5 4V5z" fill="currentColor" stroke="none" />
                            <path d="M16 9l5 6M21 9l-5 6" />
                        </svg>
                    ) : (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-4.5 h-4.5">
                            <path d="M11 5L6 9H3v6h3l5 4V5z" fill="currentColor" stroke="none" />
                            <path d="M15.5 8.5a5 5 0 010 7" />
                            <path d="M18.5 6a9 9 0 010 12" opacity={volume > 0.55 ? 1 : 0.35} />
                        </svg>
                    )}
                </button>
                <div style={{ width: 24, height: 84 }} className="flex items-center justify-center">
                    <input
                        type="range"
                        min={0}
                        max={1}
                        step={0.05}
                        value={volume}
                        onChange={(e) => changeVolume(parseFloat(e.target.value))}
                        aria-label="Volume"
                        aria-orientation="vertical"
                        className={`aova-vol ${fill ? "" : "aova-vol-dark"}`}
                        style={{
                            width: 84,
                            height: 4,
                            transform: "rotate(-90deg)",
                            background: `linear-gradient(to right, ${fill ? "#fff" : "#0A0A0A"} ${volume * 100}%, ${
                                fill ? "rgba(255,255,255,0.25)" : "rgba(10,10,10,0.18)"
                            } ${volume * 100}%)`,
                        }}
                    />
                </div>
            </div>
    );

    if (fill) {
        return (
            <div
                className={`absolute inset-0 overflow-hidden ${className}`}
                onPointerMove={active ? poke : undefined}
            >
                {video}
                {/* floats over the frame — doesn't affect the video's size */}
                {active && (
                    <div className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20">
                        {volumePill}
                    </div>
                )}
            </div>
        );
    }

    return (
        <div
            className={`flex items-stretch gap-3 md:gap-4 ${className}`}
            onPointerMove={active ? poke : undefined}
        >
            {video}
            {/* Reserved side column — always present so the video never resizes
                when the pill appears on play */}
            <div className="flex items-center shrink-0 w-11 md:w-14">
                {active && volumePill}
            </div>
        </div>
    );
}
