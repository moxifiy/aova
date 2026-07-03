"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export interface DropItem {
    text: string;
    left: number;
    top: number;
    width: number;
    height: number;
    fontSize: string;
    color?: string;
    gentle?: boolean;
    onRemoved?: () => void;
}

interface ActiveWord {
    id: number;
    text: string;
    left: number;
    top: number;
    width: number;
    height: number;
    fontSize: string;
    color: string;
    fading: boolean;
}

const LIFETIME = 5000; // ms a word stays before fading out
const FADE = 600; // ms fade duration

/**
 * Persistent, shared physics layer. Anything on the page can drop text into it
 * by dispatching `new CustomEvent("v2-drop", { detail: { items: DropItem[] } })`.
 * Dropped words fall with gravity, collide with each other (so new ones stack on
 * whatever is already piled up), then fade out individually 5s after they land.
 *
 * Mounted once in the v2 layout. The engine only steps while bodies exist.
 */
export default function FallingWords() {
    const [active, setActive] = useState<ActiveWord[]>([]);
    const elRefs = useRef<Map<number, HTMLSpanElement>>(new Map());
    const matterRef = useRef<typeof import("matter-js") | null>(null);
    const engineRef = useRef<Matter.Engine | null>(null);
    const bodiesRef = useRef<Map<number, { body: Matter.Body; w: number; h: number }>>(new Map());
    const rafRef = useRef<number>(0);
    const runningRef = useRef(false);
    const idRef = useRef(0);

    const ensureRunning = useCallback(() => {
        if (runningRef.current) return;
        const Matter = matterRef.current;
        const engine = engineRef.current;
        if (!Matter || !engine) return;
        runningRef.current = true;

        const step = () => {
            Matter.Engine.update(engine, 1000 / 60);
            bodiesRef.current.forEach(({ body, w, h }, id) => {
                const el = elRefs.current.get(id);
                if (el) {
                    el.style.transform = `translate(${body.position.x - w / 2}px, ${body.position.y - h / 2}px) rotate(${body.angle}rad)`;
                }
            });
            if (bodiesRef.current.size > 0) {
                rafRef.current = requestAnimationFrame(step);
            } else {
                runningRef.current = false;
            }
        };
        rafRef.current = requestAnimationFrame(step);
    }, []);

    const removeWord = useCallback((id: number, onRemoved?: () => void) => {
        // fade out
        setActive((prev) => prev.map((a) => (a.id === id ? { ...a, fading: true } : a)));
        setTimeout(() => {
            const Matter = matterRef.current;
            const engine = engineRef.current;
            const entry = bodiesRef.current.get(id);
            if (Matter && engine && entry) {
                Matter.Composite.remove(engine.world, entry.body);
            }
            bodiesRef.current.delete(id);
            elRefs.current.delete(id);
            setActive((prev) => prev.filter((a) => a.id !== id));
            onRemoved?.();
        }, FADE);
    }, []);

    const onDrop = useCallback(
        (e: Event) => {
            const Matter = matterRef.current;
            const engine = engineRef.current;
            if (!Matter || !engine) return;
            const detail = (e as CustomEvent<{ items: DropItem[] }>).detail;
            if (!detail?.items?.length) return;

            const { Bodies, Composite, Body } = Matter;
            const newActives: ActiveWord[] = [];

            detail.items.forEach((item) => {
                const id = ++idRef.current;
                const body = Bodies.rectangle(
                    item.left + item.width / 2,
                    item.top + item.height / 2,
                    item.width,
                    item.height,
                    { restitution: 0.25, friction: 0.6, frictionAir: 0.03, density: 0.002, chamfer: { radius: 6 } }
                );
                // "gentle" drops start from rest and let gravity ease them down (smooth);
                // others get a soft little kick as they let go
                Body.setAngularVelocity(body, item.gentle ? 0 : (Math.random() - 0.5) * 0.1);
                Body.setVelocity(body, item.gentle ? { x: 0, y: 0 } : { x: (Math.random() - 0.5) * 1.2, y: 0 });
                Composite.add(engine.world, body);
                bodiesRef.current.set(id, { body, w: item.width, h: item.height });
                newActives.push({
                    id,
                    text: item.text,
                    left: item.left,
                    top: item.top,
                    width: item.width,
                    height: item.height,
                    fontSize: item.fontSize,
                    color: item.color ?? "#0A0A0A",
                    fading: false,
                });
                setTimeout(() => removeWord(id, item.onRemoved), LIFETIME);
            });

            setActive((prev) => [...prev, ...newActives]);
            ensureRunning();
        },
        [ensureRunning, removeWord]
    );

    useEffect(() => {
        let disposed = false;
        let cleanup = () => {};

        (async () => {
            const Matter = (await import("matter-js")).default as unknown as typeof import("matter-js");
            if (disposed) return;
            matterRef.current = Matter;
            const { Engine, Bodies, Composite } = Matter;
            const engine = Engine.create();
            engine.gravity.y = 0.6;
            engineRef.current = engine;

            const W = window.innerWidth;
            const H = window.innerHeight;
            const t = 240; // thick static bounds so fast bodies cannot tunnel through
            Composite.add(engine.world, [
                Bodies.rectangle(W / 2, H + t / 2, W * 3, t, { isStatic: true }),
                Bodies.rectangle(-t / 2, H / 2, t, H * 4, { isStatic: true }),
                Bodies.rectangle(W + t / 2, H / 2, t, H * 4, { isStatic: true }),
            ]);

            window.addEventListener("v2-drop", onDrop as EventListener);
            cleanup = () => {
                window.removeEventListener("v2-drop", onDrop as EventListener);
                cancelAnimationFrame(rafRef.current);
                Matter.Composite.clear(engine.world, false);
                Matter.Engine.clear(engine);
            };
        })();

        return () => {
            disposed = true;
            cleanup();
        };
    }, [onDrop]);

    return (
        <div
            className="v2-root"
            style={{ position: "fixed", inset: 0, zIndex: 9999, pointerEvents: "none", overflow: "hidden" }}
            aria-hidden="true"
        >
            {active.map((a) => (
                <span
                    key={a.id}
                    ref={(el) => {
                        if (el) elRefs.current.set(a.id, el);
                    }}
                    className="font-display font-medium tracking-tight uppercase select-none"
                    style={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        width: a.width,
                        height: a.height,
                        fontSize: a.fontSize,
                        color: a.color,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        whiteSpace: "nowrap",
                        transform: `translate(${a.left}px, ${a.top}px)`,
                        opacity: a.fading ? 0 : 1,
                        transition: `opacity ${FADE}ms ease`,
                        willChange: "transform, opacity",
                    }}
                >
                    {a.text}
                </span>
            ))}
        </div>
    );
}
