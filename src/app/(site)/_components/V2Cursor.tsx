"use client";

import { useEffect, useRef } from "react";

export default function V2Cursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const scaleRef = useRef<HTMLDivElement>(null);
    const rotateRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        const scale = scaleRef.current;
        const rotate = rotateRef.current;
        if (!cursor || !scale || !rotate) return;

        let active = false;
        let currentRotation = -90; // Default middle rotation (points top-left)
        let lastTarget: HTMLElement | null = null;
        let isSlider = false;

        const updatePosition = (clientX: number, clientY: number) => {
            // Center the 80x80 cursor on the mouse pointer exactly
            cursor.style.transform = `translate3d(${clientX - 40}px, ${clientY - 40}px, 0)`;
        };

        const onMouseMove = (e: MouseEvent) => {
            updatePosition(e.clientX, e.clientY);

            const target = e.target as HTMLElement;
            
            // Performance Optimization: Skip target.closest() calls if mouse stays over same element
            if (target === lastTarget) {
                if (active && isSlider) {
                    const width = window.innerWidth;
                    if (e.clientX < width * 0.35) {
                        if (currentRotation !== -135) {
                            currentRotation = -135;
                            rotate.style.transform = "rotate(-135deg) scale(0.85)";
                        }
                    } else if (e.clientX > width * 0.65) {
                        if (currentRotation !== 45) {
                            currentRotation = 45;
                            rotate.style.transform = "rotate(45deg) scale(0.85)";
                        }
                    } else {
                        if (currentRotation !== -90) {
                            currentRotation = -90;
                            rotate.style.transform = "rotate(-90deg) scale(1.2)";
                        }
                    }
                }
                return;
            }

            lastTarget = target;
            
            // Check if hovering over an element that triggers the V2 cursor
            const workZone = target ? target.closest(".cursor-none-v2") : null;

            if (workZone) {
                if (!active) {
                    active = true;
                    scale.style.transform = "scale(1)";
                }

                isSlider = workZone.classList.contains("slider-trigger-zone");
                if (isSlider) {
                    const width = window.innerWidth;
                    if (e.clientX < width * 0.35) {
                        if (currentRotation !== -135) {
                            currentRotation = -135;
                            rotate.style.transform = "rotate(-135deg) scale(0.85)";
                        }
                    } else if (e.clientX > width * 0.65) {
                        if (currentRotation !== 45) {
                            currentRotation = 45;
                            rotate.style.transform = "rotate(45deg) scale(0.85)";
                        }
                    } else {
                        if (currentRotation !== -90) {
                            currentRotation = -90;
                            rotate.style.transform = "rotate(-90deg) scale(1.2)";
                        }
                    }
                } else {
                    if (currentRotation !== -90 || rotate.style.transform.includes("scale(0.4)")) {
                        currentRotation = -90;
                        rotate.style.transform = "rotate(-90deg) scale(1.2)";
                    }
                }
            } else {
                if (active) {
                    active = false;
                    scale.style.transform = "scale(0)";
                    isSlider = false;
                }
            }
        };

        const onMouseLeave = () => {
            active = false;
            scale.style.transform = "scale(0)";
            lastTarget = null;
        };

        const onMouseEnter = (e: MouseEvent) => {
            updatePosition(e.clientX, e.clientY);
        };

        window.addEventListener("mousemove", onMouseMove, { passive: true });
        document.addEventListener("mouseleave", onMouseLeave);
        document.addEventListener("mouseenter", onMouseEnter);

        // Ensure the cursor starts hidden (scale 0) and out of view
        scale.style.transform = "scale(0)";
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
        </div>
    );
}

