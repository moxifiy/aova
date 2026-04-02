"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

/* ─── Procedural env map: neutral studio HDRI for chrome reflections ────── */
function useStudioEnv() {
    const { gl } = useThree();
    return useMemo(() => {
        const pmrem = new THREE.PMREMGenerator(gl);
        pmrem.compileEquirectangularShader();
        const size = 128;
        const data = new Uint8Array(size * size * 4);
        for (let y = 0; y < size; y++) {
            for (let x = 0; x < size; x++) {
                const ty = y / size;
                const tx = x / size;
                const i = (y * size + x) * 4;
                const horizon = 1.0 - Math.abs(ty - 0.45) * 2.2;
                const horizonBand = Math.max(0, horizon) * 0.6;
                const topLight = Math.max(0, 1.0 - ty * 1.8) * 0.9;
                const bottomDark = Math.max(0, ty - 0.6) * 0.3;
                const sideGrad = 0.05 * Math.sin(tx * Math.PI);
                const base = topLight + horizonBand - bottomDark + sideGrad;
                const val = Math.round(Math.min(255, Math.max(0, base * 255)));
                data[i] = val;
                data[i + 1] = val;
                data[i + 2] = Math.round(Math.min(255, val * 1.03));
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

/* ─── Logo mesh from glTF ──────────────────────────────────────────────── */
function LogoModel() {
    const gltf = useGLTF("/aovalo.gltf");
    const envMap = useStudioEnv();

    const logoGroup = useMemo(() => {
        // Find only the "Fill" mesh — the actual logo (skip C4D light planes)
        let fillMesh: THREE.Mesh | null = null;
        gltf.scene.traverse((child) => {
            if ((child as THREE.Mesh).isMesh && child.name === "Fill") {
                fillMesh = child as THREE.Mesh;
            }
        });

        if (!fillMesh) {
            gltf.scene.traverse((child) => {
                if ((child as THREE.Mesh).isMesh && !fillMesh) {
                    fillMesh = child as THREE.Mesh;
                }
            });
        }

        if (!fillMesh) return new THREE.Group();

        const cloned = (fillMesh as THREE.Mesh).clone(true);

        (fillMesh as THREE.Mesh).updateWorldMatrix(true, false);
        cloned.applyMatrix4((fillMesh as THREE.Mesh).matrixWorld);

        // Front face: bright chrome
        cloned.material = new THREE.MeshPhysicalMaterial({
            color: "#b0c4de",
            metalness: 0.9,
            roughness: 0.08,
            iridescence: 1.0,
            iridescenceIOR: 1.8,
            iridescenceThicknessRange: [300, 800],
            sheen: 1.0,
            sheenColor: new THREE.Color("#ff66b2"),
            sheenRoughness: 0.15,
            clearcoat: 1.0,
            clearcoatRoughness: 0.0,
            reflectivity: 1.0,
            envMap: envMap,
            envMapIntensity: 3.0,
            side: THREE.FrontSide,
        });

        // Dark extrusion sides via back-face mesh
        const backClone = cloned.clone(true);
        backClone.material = new THREE.MeshPhysicalMaterial({
            color: "#1a1a2e",
            metalness: 0.95,
            roughness: 0.3,
            clearcoat: 0.5,
            clearcoatRoughness: 0.1,
            envMap: envMap,
            envMapIntensity: 0.5,
            side: THREE.BackSide,
        });

        const group = new THREE.Group();
        group.add(cloned);
        group.add(backClone);

        // Center
        const box = new THREE.Box3().setFromObject(group);
        const center = box.getCenter(new THREE.Vector3());
        group.position.sub(center);

        // Normalize to ~6 units
        const boxSize = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(boxSize.x, boxSize.y, boxSize.z);
        const scale = 6 / maxDim;
        group.scale.setScalar(scale);

        // Recenter after scaling
        const box2 = new THREE.Box3().setFromObject(group);
        const center2 = box2.getCenter(new THREE.Vector3());
        group.position.sub(center2);

        return group;
    }, [gltf.scene, envMap]);

    return (
        <group rotation={[0.3, -0.25, 0]}>
            <primitive object={logoGroup} />
        </group>
    );
}

/* ─── Lights ───────────────────────────────────────────────────────────── */
function Scene() {
    return (
        <>
            <ambientLight intensity={0.1} />
            <directionalLight position={[-4, 6, 8]} intensity={7} color="#ffffff" castShadow />
            <pointLight position={[5, -5, 4]} intensity={18} color="#ff007f" />
            <pointLight position={[-3, -6, -2]} intensity={12} color="#ff33cc" />
            <pointLight position={[-6, 4, -5]} intensity={14} color="#6633ff" />
            <pointLight position={[6, 5, -4]} intensity={8} color="#00ffff" />
            <LogoModel />
        </>
    );
}

/* ─── Public component ─────────────────────────────────────────────────── */
export default function AovaLogo3D({
    size = 100,
    className = "",
}: {
    size?: number;
    className?: string;
}) {
    const wrapRef = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

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

    return (
        <div
            ref={wrapRef}
            className={`pointer-events-none ${className}`}
            style={{ width: size, height: size, margin: "0 auto" }}
        >
            {visible && (
                <Canvas
                    camera={{ position: [0, 0, 22], fov: 32 }}
                    dpr={[1, 1.5]}
                    frameloop="demand"
                    gl={{
                        alpha: true,
                        antialias: true,
                        powerPreference: "high-performance",
                        toneMapping: THREE.ACESFilmicToneMapping,
                        toneMappingExposure: 1.0,
                        premultipliedAlpha: false,
                    }}
                    style={{ background: "transparent", display: "block" }}
                >
                    <Scene />
                </Canvas>
            )}
        </div>
    );
}

useGLTF.preload("/aovalo.gltf");
