"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export interface FallingWord {
    text: string;
    left: number;
    top: number;
    width: number;
    height: number;
    fontSize: string;
}

/**
 * Drops the captured words as rigid bodies with real gravity. They collide with
 * each other and the walls, and settle on the floor (= bottom of the viewport).
 * Rendered fixed/full-screen via a portal so they fall over everything.
 */
export default function FallingWords({ words, onDone }: { words: FallingWord[]; onDone?: () => void }) {
    const elRefs = useRef<(HTMLSpanElement | null)[]>([]);
    const [visible, setVisible] = useState(true);
    const onDoneRef = useRef(onDone);
    onDoneRef.current = onDone;

    useEffect(() => {
        if (!words.length) return;
        let raf = 0;
        let stop = () => {};

        (async () => {
            const Matter = (await import("matter-js")).default;
            const { Engine, Runner, Bodies, Composite, Body } = Matter;

            const engine = Engine.create();
            engine.gravity.y = 1.4; // natural-feeling gravity

            const W = window.innerWidth;
            const H = window.innerHeight;
            const t = 240; // thick static bounds so fast bodies can't tunnel out

            const ground = Bodies.rectangle(W / 2, H + t / 2, W * 3, t, { isStatic: true });
            const leftWall = Bodies.rectangle(-t / 2, H / 2, t, H * 4, { isStatic: true });
            const rightWall = Bodies.rectangle(W + t / 2, H / 2, t, H * 4, { isStatic: true });

            const bodies = words.map((w) =>
                Bodies.rectangle(w.left + w.width / 2, w.top + w.height / 2, w.width, w.height, {
                    restitution: 0.3, // slight bounce
                    friction: 0.6,
                    frictionAir: 0.01,
                    density: 0.002,
                    chamfer: { radius: 6 },
                })
            );

            // give each a little life as it lets go
            bodies.forEach((b) => {
                Body.setAngularVelocity(b, (Math.random() - 0.5) * 0.18);
                Body.setVelocity(b, { x: (Math.random() - 0.5) * 3, y: Math.random() });
            });

            Composite.add(engine.world, [ground, leftWall, rightWall, ...bodies]);

            const runner = Runner.create();
            Runner.run(runner, engine);

            const update = () => {
                for (let i = 0; i < bodies.length; i++) {
                    const el = elRefs.current[i];
                    const b = bodies[i];
                    if (el) {
                        const x = b.position.x - words[i].width / 2;
                        const y = b.position.y - words[i].height / 2;
                        el.style.transform = `translate(${x}px, ${y}px) rotate(${b.angle}rad)`;
                    }
                }
                raf = requestAnimationFrame(update);
            };
            raf = requestAnimationFrame(update);

            stop = () => {
                Runner.stop(runner);
                Composite.clear(engine.world, false);
                Engine.clear(engine);
            };
        })();

        return () => {
            cancelAnimationFrame(raf);
            stop();
        };
    }, [words]);

    // Disappear 5s after the drop, with a soft fade-out, then tell the parent to unmount
    useEffect(() => {
        if (!words.length) return;
        setVisible(true);
        const fadeTimer = setTimeout(() => setVisible(false), 5000);
        const doneTimer = setTimeout(() => onDoneRef.current?.(), 5800);
        return () => {
            clearTimeout(fadeTimer);
            clearTimeout(doneTimer);
        };
    }, [words]);

    if (!words.length) return null;

    return createPortal(
        <div
            className="v2-root"
            style={{ position: "fixed", inset: 0, zIndex: 9999, pointerEvents: "none", overflow: "hidden", opacity: visible ? 1 : 0, transition: "opacity 0.8s ease" }}
            aria-hidden="true"
        >
            {words.map((w, i) => (
                <span
                    key={i}
                    ref={(el) => {
                        elRefs.current[i] = el;
                    }}
                    className="font-display font-medium tracking-tight uppercase select-none text-[#0A0A0A]"
                    style={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        width: w.width,
                        height: w.height,
                        fontSize: w.fontSize,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        whiteSpace: "nowrap",
                        transform: `translate(${w.left}px, ${w.top}px)`,
                        willChange: "transform",
                    }}
                >
                    {w.text}
                </span>
            ))}
        </div>,
        document.body
    );
}
