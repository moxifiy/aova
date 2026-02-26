"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { SVGLoader } from "three-stdlib";

// The exact SVG path for the Aova logo
const LOGO_SVG_PATH = "M171.27,0v91c0,44.33-35.94,80.27-80.27,80.27h-31.96v-59.04h59.04v-59.04h-59.04v59.04H0v-31.96C0,35.94,35.94,0,80.27,0h91Z";

function LogoShape({ isDark }: { isDark: boolean }) {
    const meshRef = useRef<THREE.Mesh>(null);

    // Parse the SVG path into a Three.js Shape
    const geometry = useMemo(() => {
        const svgPath = new SVGLoader().parse(`<svg><path d="${LOGO_SVG_PATH}"/></svg>`);
        const shapePath = svgPath.paths[0];
        const shapes = shapePath.toShapes(true);

        // Extrude the 2D shape into a 3D geometry with much lower complexity to prevent WebGL crashes
        const extrudeSettings = {
            depth: 20, // Less depth
            bevelEnabled: false, // Turn off bevel completely for complex SVGs to save geometry
            curveSegments: 2, // Keep curve segments very low
            steps: 1, // Only one step of depth
        };

        const geo = new THREE.ExtrudeGeometry(shapes[0], extrudeSettings);
        geo.center(); // Center the geometry geometry so it spins around its true center
        return geo;
    }, []);

    // Make the logo gently follow the mouse
    useFrame((state) => {
        if (!meshRef.current) return;

        // Calculate target rotation based on normalized mouse coordinates (-1 to +1)
        const targetX = (state.pointer.y * Math.PI) / 8; // Gentle tilt up/down
        const targetY = (state.pointer.x * Math.PI) / 6; // Gentle turn left/right

        // Smoothly interpolate current rotation towards target rotation
        meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetX, 0.05);
        meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetY, 0.05);
    });

    return (
        <Float
            speed={2} // Animation speed
            rotationIntensity={0.2} // XYZ rotation intensity
            floatIntensity={0.5} // Up/down float intensity
            floatingRange={[-0.5, 0.5]}
        >
            {/* Massively scaled up 3D Logo */}
            <mesh ref={meshRef} geometry={geometry} scale={[0.1, -0.1, 0.1]}>
                <meshBasicMaterial
                    color={isDark ? "#ffffff" : "#000000"} // White lines in dark mode
                    transparent={true}
                    opacity={isDark ? 0.12 : 0.07} // Slightly brighter on dark bg
                    wireframe={true} // Creates the cool geometric pattern
                    wireframeLinewidth={1.5}
                />
            </mesh>
        </Float>
    );
}

export default function HeroLogo3D({ isDark = false }: { isDark?: boolean }) {
    const [reducedMotion, setReducedMotion] = useState(false);

    useEffect(() => {
        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        setReducedMotion(mq.matches);
        const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
        mq.addEventListener("change", handler);
        return () => mq.removeEventListener("change", handler);
    }, []);

    if (reducedMotion) return null;

    return (
        <div className="absolute inset-x-0 top-0 h-[100svh] z-0 flex items-center justify-center opacity-70 pointer-events-none overflow-hidden">
            {/* The Canvas itself needs pointer-events so useFrame(state.pointer) works, but we don't want it stealing clicks from the UI */}
            <div className="w-full h-[150vh] flex items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <Canvas
                    camera={{ position: [0, 0, 15], fov: 45 }}
                    style={{ pointerEvents: 'auto' }}
                    dpr={[1, 1.5]}
                >
                    <LogoShape isDark={isDark} />
                </Canvas>
            </div>
        </div>
    );
}
