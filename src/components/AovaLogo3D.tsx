"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { SVGLoader } from "three-stdlib";

const LOGO_PATH =
    "M171.27,0v91c0,44.33-35.94,80.27-80.27,80.27h-31.96v-59.04h59.04v-59.04h-59.04v59.04H0v-31.96C0,35.94,35.94,0,80.27,0h91Z";

/* ─── Procedural env map: bright multi-colour gradient for rich reflections ─ */
function useProceduralEnv() {
    const { gl } = useThree();
    return useMemo(() => {
        const pmrem = new THREE.PMREMGenerator(gl);
        pmrem.compileEquirectangularShader();
        const size = 64;
        const data = new Uint8Array(size * size * 4);
        for (let y = 0; y < size; y++) {
            for (let x = 0; x < size; x++) {
                const tx = x / size;   // 0→1 horizontal
                const ty = y / size;   // 0→1 vertical
                const i = (y * size + x) * 4;
                // Top-left: bright white/lavender → Top-right: bright pink
                // Bottom-left: deep purple → Bottom-right: teal/blue
                const r = Math.round(
                    255 * (0.9 - ty * 0.4) * (0.6 + tx * 0.4));
                const g = Math.round(
                    255 * (0.3 - ty * 0.2) * (0.4 - tx * 0.2));
                const b = Math.round(
                    255 * (0.9 - tx * 0.5) * (0.7 + ty * 0.2));
                data[i] = Math.min(255, r);
                data[i + 1] = Math.min(255, g);
                data[i + 2] = Math.min(255, b);
                data[i + 3] = 255;
            }
        }
        const eq = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
        eq.mapping = THREE.EquirectangularReflectionMapping;
        eq.needsUpdate = true;
        const env = pmrem.fromEquirectangular(eq).texture;
        pmrem.dispose();
        eq.dispose();
        return env;
    }, [gl]);
}

/* ─── Logo mesh ──────────────────────────────────────────────────────────── */
function LogoMesh({ mouse }: { mouse: React.MutableRefObject<[number, number]> }) {
    const meshRef = useRef<THREE.Mesh>(null);
    const envMap = useProceduralEnv();

    const geometry = useMemo(() => {
        const svgData = new SVGLoader().parse(
            `<svg xmlns="http://www.w3.org/2000/svg"><path d="${LOGO_PATH}"/></svg>`
        );
        const shapes = svgData.paths[0].toShapes(true);
        const geo = new THREE.ExtrudeGeometry(shapes[0], {
            depth: 30,
            bevelEnabled: true,
            bevelThickness: 12,   // thick bevel = smooth rounded edges like the reference
            bevelSize: 10,
            bevelSegments: 14,    // many segments = very smooth rounding
            curveSegments: 24,    // smooth curves on the circular parts
        });
        geo.center();
        return geo;
    }, []);

    const rot = useRef<[number, number]>([0.3, -0.25]);

    useFrame(() => {
        if (!meshRef.current) return;
        const [mx, my] = mouse.current;
        rot.current[0] += (my * 0.7 - rot.current[0]) * 0.05;
        rot.current[1] += (mx * 0.7 - rot.current[1]) * 0.05;
        meshRef.current.rotation.x = rot.current[0];
        meshRef.current.rotation.y = rot.current[1];
    });

    return (
        <Float speed={1.4} rotationIntensity={0.08} floatIntensity={0.4} floatingRange={[-0.2, 0.2]}>
            <mesh ref={meshRef} geometry={geometry} scale={[0.055, -0.055, 0.055]}>
                <meshPhysicalMaterial
                    color="#e0d8ff"
                    transparent
                    opacity={0.78}
                    metalness={0.1}
                    roughness={0.0}
                    iridescence={1.0}
                    iridescenceIOR={2.2}
                    iridescenceThicknessRange={[0, 900]}
                    sheen={0.8}
                    sheenColor="#d070ff"
                    sheenRoughness={0.0}
                    clearcoat={1.0}
                    clearcoatRoughness={0.0}
                    reflectivity={1.0}
                    envMap={envMap}
                    envMapIntensity={6.0}
                    side={THREE.DoubleSide}
                    depthWrite={false}
                />
            </mesh>
        </Float>
    );
}

/* ─── Lights matching the reference: cool-key + pink-fill + purple-rim ───── */
function Scene({ mouse }: { mouse: React.MutableRefObject<[number, number]> }) {
    return (
        <>
            <ambientLight intensity={0.1} />
            {/* Bright key — cool white from upper-left */}
            <directionalLight position={[-3, 5, 5]} intensity={6} color="#ffffff" />
            {/* Pink fill — matches the pink glow in the reference */}
            <pointLight position={[4, -2, 3]} intensity={8} color="#ff4488" />
            {/* Deep purple rim — back-lights the shape */}
            <pointLight position={[-2, 4, -4]} intensity={10} color="#9922ff" />
            {/* Cyan accent — creates the teal edge you can see in the reference */}
            <pointLight position={[3, -4, -3]} intensity={5} color="#22eeff" />
            {/* Warm top highlight */}
            <pointLight position={[0, 6, 2]} intensity={4} color="#ffccff" />

            <LogoMesh mouse={mouse} />
        </>
    );
}

/* ─── Public component: lazy-mount on scroll ─────────────────────────────── */
export default function AovaLogo3D({
    cardRef,
}: {
    cardRef: React.RefObject<HTMLElement | null>;
}) {
    const mouse = useRef<[number, number]>([0, 0]);
    const wrapRef = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    /* Activate WebGL only when card enters the viewport */
    useEffect(() => {
        const el = wrapRef.current;
        if (!el) return;
        const io = new IntersectionObserver(
            ([e]) => setVisible(e.isIntersecting),
            { rootMargin: "200px" }
        );
        io.observe(el);
        return () => io.disconnect();
    }, []);

    /* Mouse-relative tracking on the card */
    useEffect(() => {
        const card = cardRef.current;
        if (!card) return;
        const onMove = (e: MouseEvent) => {
            const r = card.getBoundingClientRect();
            mouse.current = [
                ((e.clientX - r.left) / r.width) * 2 - 1,
                -(((e.clientY - r.top) / r.height) * 2 - 1),
            ];
        };
        const onLeave = () => { mouse.current = [0, 0]; };
        card.addEventListener("mousemove", onMove);
        card.addEventListener("mouseleave", onLeave);
        return () => {
            card.removeEventListener("mousemove", onMove);
            card.removeEventListener("mouseleave", onLeave);
        };
    }, [cardRef]);

    return (
        <div ref={wrapRef} style={{ width: 100, height: 100, margin: "0 auto" }}>
            {visible && (
                <Canvas
                    camera={{ position: [0, 0, 15], fov: 38 }}
                    gl={{
                        alpha: true,
                        antialias: true,
                        powerPreference: "high-performance",
                        toneMapping: THREE.ACESFilmicToneMapping,
                        toneMappingExposure: 1.2,
                        premultipliedAlpha: false,
                    }}
                    style={{ background: "transparent", display: "block" }}
                    onCreated={({ gl }) => {
                        gl.setClearColor(new THREE.Color(0, 0, 0), 0);
                        gl.setClearAlpha(0);
                    }}
                >
                    <Scene mouse={mouse} />
                </Canvas>
            )}
        </div>
    );
}
