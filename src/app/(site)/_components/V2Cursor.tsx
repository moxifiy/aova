"use client";

import { useEffect, useRef } from "react";

export default function V2Cursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const scaleRef = useRef<HTMLDivElement>(null);
    const rotateRef = useRef<HTMLDivElement>(null);
    const reelRef = useRef<HTMLDivElement>(null);
    const reelLabelRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        const scale = scaleRef.current;
        const rotate = rotateRef.current;
        const reel = reelRef.current;
        const reelLabel = reelLabelRef.current;
        if (!cursor || !scale || !rotate || !reel || !reelLabel) return;

        let logoActive = false;
        let reelActive = false;
        let lastTarget: HTMLElement | null = null;

        const updatePosition = (clientX: number, clientY: number) => {
            // Center the 80x80 cursor on the mouse pointer exactly
            cursor.style.transform = `translate3d(${clientX - 40}px, ${clientY - 40}px, 0)`;
        };

        const onMouseMove = (e: MouseEvent) => {
            updatePosition(e.clientX, e.clientY);

            const target = e.target as HTMLElement;

            // Skip closest() lookups while the mouse stays over the same element
            if (target === lastTarget) return;
            lastTarget = target;

            const workZone = target ? target.closest(".cursor-none-v2") : null;

            if (workZone) {
                // Zones with data-cursor-text get the circle cursor with that label
                const label = workZone.getAttribute("data-cursor-text");
                if (label) {
                    if (reelLabel.textContent !== label) reelLabel.textContent = label;
                    if (!reelActive) {
                        reelActive = true;
                        reel.style.transform = "translate(-50%, -50%) scale(1)";
                    }
                    if (logoActive) {
                        logoActive = false;
                        scale.style.transform = "scale(0)";
                    }
                } else {
                    // Default pink logo cursor
                    if (!logoActive) {
                        logoActive = true;
                        scale.style.transform = "scale(1)";
                        rotate.style.transform = "rotate(-90deg) scale(1.2)";
                    }
                    if (reelActive) {
                        reelActive = false;
                        reel.style.transform = "translate(-50%, -50%) scale(0)";
                    }
                }
            } else {
                if (logoActive) {
                    logoActive = false;
                    scale.style.transform = "scale(0)";
                }
                if (reelActive) {
                    reelActive = false;
                    reel.style.transform = "translate(-50%, -50%) scale(0)";
                }
            }
        };

        const onMouseLeave = () => {
            logoActive = false;
            reelActive = false;
            scale.style.transform = "scale(0)";
            reel.style.transform = "translate(-50%, -50%) scale(0)";
            lastTarget = null;
        };

        const onMouseEnter = (e: MouseEvent) => {
            updatePosition(e.clientX, e.clientY);
        };

        window.addEventListener("mousemove", onMouseMove, { passive: true });
        document.addEventListener("mouseleave", onMouseLeave);
        document.addEventListener("mouseenter", onMouseEnter);

        // Start hidden and out of view
        scale.style.transform = "scale(0)";
        reel.style.transform = "translate(-50%, -50%) scale(0)";
        cursor.style.transform = `translate3d(-100px, -100px, 0)`;

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseleave", onMouseLeave);
            document.removeEventListener("mouseenter", onMouseEnter);
        };
    }, []);

    return (
        <div
            ref={cursorRef}
            className="pointer-events-none fixed top-0 left-0 z-[99999] hidden md:block"
            style={{ width: 80, height: 80, willChange: "transform" }}
        >
            {/* Pink AOVA logo cursor (default interactive zones) */}
            <div
                ref={scaleRef}
                style={{
                    width: "100%",
                    height: "100%",
                    transition: "transform 0s",
                    transformOrigin: "center",
                }}
            >
                <div
                    ref={rotateRef}
                    style={{
                        width: "100%",
                        height: "100%",
                        transition: "transform 0s",
                        transformOrigin: "center",
                    }}
                >
                    <svg viewBox="0 0 1000 1000" className="w-full h-full fill-[#ff42a0]">
                        <g transform="translate(224, 225)">
                            <path d="M551.17,287.09c-1.79,144.25-119.83,262.29-265.43,262.29h-88.58c-4.29,0-7.78-3.48-7.78-7.78v-173.83c0-4.29,3.48-7.78,7.78-7.78h173.83c4.29,0,7.78-3.48,7.78-7.78v-173.83c0-4.29-3.48-7.78-7.78-7.78h-173.83c-4.29,0-7.78,3.48-7.78,7.78v173.83c0,4.29-3.48,7.78-7.78,7.78H7.78c-4.29,0-7.78-3.48-7.78-7.78v-88.57C0,118.04,118.04,0,263.65,0l279.15,1.33c4.6.02,8.33,3.76,8.33,8.36l.05,277.4Z" />
                        </g>
                    </svg>
                </div>
            </div>

            {/* Circle text cursor (label set from the hovered zone's data-cursor-text).
                Frosted glass over the video — bold type, see-through, sharp. */}
            <div
                ref={reelRef}
                className="absolute left-1/2 top-1/2 flex items-center justify-center rounded-full bg-white/10 text-white border border-white/30 px-6"
                style={{
                    width: 148,
                    height: 148,
                    transform: "translate(-50%, -50%) scale(0)",
                    transformOrigin: "center",
                    transition: "transform 350ms cubic-bezier(0.16, 1, 0.3, 1)",
                    backdropFilter: "blur(12px) saturate(1.4)",
                    WebkitBackdropFilter: "blur(12px) saturate(1.4)",
                }}
            >
                <span ref={reelLabelRef} className="font-host font-extrabold text-[14px] uppercase tracking-[0.16em] text-center leading-[1.35]">
                    Watch Showreel
                </span>
            </div>
        </div>
    );
}
