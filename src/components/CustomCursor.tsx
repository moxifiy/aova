"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
    const dotRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let mouseX = 0;
        let mouseY = 0;
        let rafId: number;

        const updateCursor = () => {
            if (dotRef.current) {
                // Direct hardware-accelerated transform inside render loop
                dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
            }
            rafId = requestAnimationFrame(updateCursor);
        };

        const onMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX - 2;
            mouseY = e.clientY - 2;
        };

        window.addEventListener("mousemove", onMouseMove, { passive: true });
        rafId = requestAnimationFrame(updateCursor);

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            cancelAnimationFrame(rafId);
        };
    }, []);

    return (
        <div className="pg-cursor-dot" ref={dotRef}>
            <svg viewBox="0 0 171.27 171.27" fill="currentColor" className="w-5 h-5 -rotate-90 origin-center">
                <path d="M171.27,0v91c0,44.33-35.94,80.27-80.27,80.27h-31.96v-59.04h59.04v-59.04h-59.04v59.04H0v-31.96C0,35.94,35.94,0,80.27,0h91Z" />
            </svg>
        </div>
    );
}
