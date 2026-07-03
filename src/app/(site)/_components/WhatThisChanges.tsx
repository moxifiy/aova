"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import BrandDNA from "./BrandDNA";

const COLUMNS = [
    { label: "CLARITY", src: "/clarity.svg", scale: 0.9, desc: "You stop guessing who you are. Your brand finally knows what it stands for." },
    { label: "PRESENCE", src: "/presence.svg", scale: 0.95, desc: "Attention turns into trust. A site and identity that earn the second look." },
    { label: "MEMORY", src: "/memory.svg", scale: 0.9, desc: "People remember you. An identity system that holds up everywhere." },
    { label: "EASE", src: "/ease.svg", scale: 1.12, desc: "Interfaces that feel effortless. Products people actually want to use." },
];

const FUCHSIA = "#E0218A";
const GRAY = "#A8A8A8";
const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

// Measure the exact artwork bounds (not the viewBox padding) so the hitbox is the icon itself
interface IconMetrics { vbW: number; vbH: number; bw: number; bh: number; cx: number; cy: number }
const metricsCache = new Map<string, IconMetrics>();
async function measureIcon(src: string): Promise<IconMetrics> {
    const cached = metricsCache.get(src);
    if (cached) return cached;
    let result: IconMetrics = { vbW: 100, vbH: 100, bw: 100, bh: 100, cx: 50, cy: 50 };
    try {
        const text = await (await fetch(src)).text();
        const holder = document.createElement("div");
        holder.style.cssText = "position:absolute;left:-99999px;top:0;width:400px;height:400px;opacity:0;pointer-events:none";
        holder.innerHTML = text;
        document.body.appendChild(holder);
        const svg = holder.querySelector("svg") as SVGSVGElement | null;
        if (svg) {
            const vb = svg.viewBox.baseVal;
            const vbW = vb && vb.width ? vb.width : 100;
            const vbH = vb && vb.height ? vb.height : 100;
            let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
            svg.querySelectorAll("path,rect,circle,ellipse,polygon,line").forEach((el) => {
                try {
                    const b = (el as SVGGraphicsElement).getBBox();
                    minX = Math.min(minX, b.x); minY = Math.min(minY, b.y);
                    maxX = Math.max(maxX, b.x + b.width); maxY = Math.max(maxY, b.y + b.height);
                } catch { /* ignore */ }
            });
            result = minX !== Infinity
                ? { vbW, vbH, bw: maxX - minX, bh: maxY - minY, cx: (minX + maxX) / 2, cy: (minY + maxY) / 2 }
                : { vbW, vbH, bw: vbW, bh: vbH, cx: vbW / 2, cy: vbH / 2 };
        }
        document.body.removeChild(holder);
    } catch { /* fallback stays */ }
    metricsCache.set(src, result);
    return result;
}

function Column({
    col,
    index,
    onActive,
}: {
    col: typeof COLUMNS[number];
    index: number;
    onActive: (i: number | null) => void;
}) {
    const stageRef = useRef<HTMLDivElement>(null);
    const iconRef = useRef<HTMLDivElement>(null);
    const phaseRef = useRef<"float" | "physics">("float");
    const mouse = useRef({ x: 0, y: 0, inside: false });
    const hoveredRef = useRef(false);
    const floatPos = useRef({ x: 0, y: 0 });
    const rafRef = useRef(0);
    const cleanupRef = useRef<() => void>(() => {});
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const bodyRef = useRef<any>(null);
    const rotAmp = useRef(3 + Math.random() * 3.5);

    const paint = (icon: HTMLDivElement) => {
        icon.style.backgroundColor = hoveredRef.current ? FUCHSIA : GRAY;
    };

    const startFloat = useCallback(() => {
        phaseRef.current = "float";
        const stage = stageRef.current;
        const icon = iconRef.current;
        if (!stage || !icon) return;
        const start = performance.now();
        const loop = () => {
            if (phaseRef.current !== "float") return;
            const t = (performance.now() - start) / 1000;
            const r = stage.getBoundingClientRect();
            let tx = 0;
            let ty = 0;
            if (mouse.current.inside) {
                const cx = r.left + r.width / 2;
                const cy = r.top + r.height / 2;
                tx = clamp((mouse.current.x - cx) * 0.45, -r.width * 0.18, r.width * 0.18);
                ty = clamp((mouse.current.y - cy) * 0.45, -r.height * 0.16, r.height * 0.16);
            }
            const thetaY = t * (0.5 + index * 0.06) + index * 1.9;
            const dX = Math.sin(t * (0.28 + index * 0.05) + index * 1.3) * 5;
            const dY = Math.sin(thetaY) * 14;
            const rot = Math.cos(thetaY) * rotAmp.current;
            floatPos.current.x += (tx - floatPos.current.x) * 0.08;
            floatPos.current.y += (ty - floatPos.current.y) * 0.08;
            icon.style.transform = `translate(${(floatPos.current.x + dX).toFixed(2)}px, ${(floatPos.current.y + dY).toFixed(2)}px) rotate(${rot.toFixed(2)}deg) scale(${col.scale})`;
            paint(icon);
            rafRef.current = requestAnimationFrame(loop);
        };
        rafRef.current = requestAnimationFrame(loop);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [index, col.scale]);

    useEffect(() => {
        startFloat();
        return () => {
            cancelAnimationFrame(rafRef.current);
            cleanupRef.current();
        };
    }, [startFloat]);

    const resetToFloat = (offX = 0, offY = 0) => {
        cleanupRef.current();
        cleanupRef.current = () => {};
        bodyRef.current = null;
        floatPos.current = { x: offX, y: offY };
        startFloat();
    };

    const drop = async () => {
        if (phaseRef.current === "physics") return;
        const stage = stageRef.current;
        const icon = iconRef.current;
        if (!stage || !icon) return;
        const m = await measureIcon(col.src);
        if (phaseRef.current !== "float") return; // bailed out meanwhile

        const sRect = stage.getBoundingClientRect();
        const W = sRect.width;
        const H = sRect.height;
        const D = icon.offsetWidth || 200;
        const s = (D / Math.max(m.vbW, m.vbH)) * col.scale; // contain fit × visual scale
        const bodyW = m.bw * s;
        const bodyH = m.bh * s;
        const halfW = bodyW / 2;
        const halfH = bodyH / 2;
        // offset of the artwork's centre from the icon-box centre
        const offX = (m.cx - m.vbW / 2) * s;
        const offY = (m.cy - m.vbH / 2) * s;

        phaseRef.current = "physics";
        cancelAnimationFrame(rafRef.current);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const Matter: any = (await import("matter-js")).default;
        const { Engine, Bodies, Composite, Body } = Matter;
        const engine = Engine.create();
        engine.gravity.y = 1.1;
        engine.positionIterations = 12;
        engine.velocityIterations = 12;

        const wt = 300;
        const body = Bodies.rectangle(W / 2 + offX + floatPos.current.x, H / 2 + offY + floatPos.current.y, bodyW, bodyH, {
            restitution: 0.35,
            friction: 0.4,
            frictionAir: 0.012,
            chamfer: { radius: Math.min(8, halfH * 0.4, halfW * 0.4) },
        });
        bodyRef.current = body;
        Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.25);

        const walls = [
            Bodies.rectangle(W / 2, H + wt / 2, W + wt * 2, wt, { isStatic: true }),
            Bodies.rectangle(W / 2, -wt / 2, W + wt * 2, wt, { isStatic: true }),
            Bodies.rectangle(-wt / 2, H / 2, wt, H * 3, { isStatic: true }),
            Bodies.rectangle(W + wt / 2, H / 2, wt, H * 3, { isStatic: true }),
        ];
        Composite.add(engine.world, [body, ...walls]);

        let raf = 0;
        const sync = () => {
            Engine.update(engine, 1000 / 60);
            const mgn = 6;
            let px = body.position.x;
            let py = body.position.y;
            let fix = false;
            if (px < halfW - mgn) { px = halfW; fix = true; } else if (px > W - halfW + mgn) { px = W - halfW; fix = true; }
            if (py < halfH - mgn) { py = halfH; fix = true; } else if (py > H - halfH + mgn) { py = H - halfH; fix = true; }
            if (fix) { Body.setPosition(body, { x: px, y: py }); Body.setVelocity(body, { x: 0, y: 0 }); }
            // sync the icon box so the artwork lands exactly on the body
            icon.style.transform = `translate(${(body.position.x - offX - W / 2).toFixed(2)}px, ${(body.position.y - offY - H / 2).toFixed(2)}px) rotate(${body.angle}rad) scale(${col.scale})`;
            paint(icon);
            raf = requestAnimationFrame(sync);
        };
        raf = requestAnimationFrame(sync);
        cleanupRef.current = () => {
            cancelAnimationFrame(raf);
            Composite.clear(engine.world, false);
            Engine.clear(engine);
        };
    };

    // Click: floating → drop; fallen → glide back up into floating
    const handleClick = () => {
        if (phaseRef.current === "float") {
            drop();
            return;
        }
        const stage = stageRef.current;
        const body = bodyRef.current;
        if (stage && body) {
            const r = stage.getBoundingClientRect();
            // current icon-box offset → ease the float back from there
            const tr = (iconRef.current?.style.transform || "").match(/translate\(([-0-9.]+)px,\s*([-0-9.]+)px\)/);
            const ox = tr ? parseFloat(tr[1]) : body.position.x - r.width / 2;
            const oy = tr ? parseFloat(tr[2]) : body.position.y - r.height / 2;
            resetToFloat(ox, oy);
        } else {
            resetToFloat();
        }
    };

    return (
        <div
            ref={stageRef}
            onMouseEnter={() => { mouse.current.inside = true; hoveredRef.current = true; onActive(index); }}
            onMouseLeave={() => { mouse.current.inside = false; hoveredRef.current = false; onActive(null); }}
            onMouseMove={(e) => { mouse.current.x = e.clientX; mouse.current.y = e.clientY; mouse.current.inside = true; }}
            onClick={handleClick}
            className="relative h-[420px] md:h-[520px] overflow-hidden cursor-pointer md:border-l border-[#E5E5E5] first:md:border-l-0"
        >
            <span className="absolute top-8 left-1/2 -translate-x-1/2 z-10 text-xl md:text-2xl font-bold uppercase tracking-tight font-display text-[#0A0A0A] pointer-events-none">
                {col.label}
            </span>

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div
                    ref={iconRef}
                    className="w-48 h-48 md:w-60 md:h-60"
                    style={{
                        backgroundColor: GRAY,
                        WebkitMaskImage: `url(${col.src})`,
                        maskImage: `url(${col.src})`,
                        WebkitMaskRepeat: "no-repeat",
                        maskRepeat: "no-repeat",
                        WebkitMaskPosition: "center",
                        maskPosition: "center",
                        WebkitMaskSize: "contain",
                        maskSize: "contain",
                        transition: "background-color 300ms ease",
                        willChange: "transform",
                    }}
                />
            </div>
        </div>
    );
}

export default function WhatThisChanges() {
    const [active, setActive] = useState<number | null>(null);

    useEffect(() => {
        if (typeof window === "undefined") return;
        import("matter-js"); // preload physics
        COLUMNS.forEach((c) => measureIcon(c.src)); // precompute exact bounds
    }, []);

    return (
        <div>
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight font-display leading-[1.05] max-w-[680px] mb-8 md:mb-12 uppercase">
                What working with us actually changes.
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-4">
                {COLUMNS.map((col, i) => (
                    <Column key={col.label} col={col} index={i} onActive={setActive} />
                ))}
            </div>

            <BrandDNA active={active} items={COLUMNS} />
        </div>
    );
}
