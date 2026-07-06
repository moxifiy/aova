"use client";

import Link from "next/link";
import { useRef } from "react";

/**
 * Pill link with the same 3D cursor-tilt as the footer's back-to-top circle:
 * it leans toward the cursor and springs flat again on leave.
 */
export default function TiltLink({
    href,
    className = "",
    children,
}: {
    href: string;
    className?: string;
    children: React.ReactNode;
}) {
    const ref = useRef<HTMLAnchorElement>(null);

    const onMove = (e: React.MouseEvent) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
        const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
        el.style.transform = `rotateX(${(-dy * 12).toFixed(1)}deg) rotateY(${(dx * 12).toFixed(1)}deg) scale(1.05)`;
    };
    const onLeave = () => {
        if (ref.current) ref.current.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
    };

    return (
        <span style={{ perspective: "600px", display: "inline-block" }}>
            <Link
                ref={ref}
                href={href}
                onMouseMove={onMove}
                onMouseLeave={onLeave}
                className={`inline-block ${className}`}
                style={{
                    transformStyle: "preserve-3d",
                    transition: "transform 250ms cubic-bezier(0.16,1,0.3,1)",
                    willChange: "transform",
                }}
            >
                {children}
            </Link>
        </span>
    );
}
