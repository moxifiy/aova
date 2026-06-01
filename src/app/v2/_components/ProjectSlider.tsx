"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Project {
    id: number;
    client: string;
    title: string;
    image: string;
    video?: string;
}

const PROJECTS: Project[] = [
    {
        id: 1,
        client: "New York Botanical Garden",
        title: "Renewing a New York institution",
        image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=1920&auto=format&fit=crop"
    },
    {
        id: 2,
        client: "Orca Compute Systems",
        title: "Architecting the identity of next-gen computing",
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1920&auto=format&fit=crop",
        video: "https://assets.mixkit.co/videos/preview/mixkit-abstract-laser-lights-background-loop-41857-large.mp4"
    },
    {
        id: 3,
        client: "Vela Architecture",
        title: "Reimagining modern spaces with organic materials",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1920&auto=format&fit=crop"
    },
    {
        id: 4,
        client: "Vapor Motion",
        title: "Bridging digital frontier design with human emotion",
        image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1920&auto=format&fit=crop",
        video: "https://assets.mixkit.co/videos/preview/mixkit-glass-spheres-moving-slowly-42636-large.mp4"
    },
    {
        id: 5,
        client: "Noire Editorial",
        title: "High-contrast print systems for global creators",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1920&auto=format&fit=crop"
    }
];

export default function ProjectSlider() {
    const [index, setIndex] = useState(0);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    // Auto-swipe every 6 seconds to give videos/images more focus
    useEffect(() => {
        const startTimer = () => {
            timerRef.current = setInterval(() => {
                setIndex((prevIndex) => (prevIndex + 1) % PROJECTS.length);
            }, 6000);
        };

        startTimer();

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, []);

    // Manual slide navigation
    const handleNext = () => {
        if (timerRef.current) clearInterval(timerRef.current);
        setIndex((prevIndex) => (prevIndex + 1) % PROJECTS.length);
    };

    const handlePrev = () => {
        if (timerRef.current) clearInterval(timerRef.current);
        setIndex((prevIndex) => (prevIndex - 1 + PROJECTS.length) % PROJECTS.length);
    };

    const handleSliderClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const width = rect.width;
        
        // Left 35% click goes prev, right 35% click goes next, middle 30% does nothing.
        if (x < width * 0.35) {
            handlePrev();
        } else if (x > width * 0.65) {
            handleNext();
        }
    };

    const currentProject = PROJECTS[index];

    return (
        <section className="relative w-full h-screen overflow-hidden bg-[#0A0A0A] flex flex-col justify-end">
            
            {/* Custom Interactive Click & Hover Overlay for both Desktop & Mobile */}
            <div 
                onClick={handleSliderClick}
                className="absolute inset-0 z-10 cursor-none-v2 slider-trigger-zone pointer-events-auto"
                aria-label="Navigate Slide"
            />

            {/* Background video */}
            <div className="absolute inset-0 w-full h-full">
                <video
                    src="/no-outro.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    className="object-cover w-full h-full brightness-[0.65] md:brightness-[0.75]"
                />
                {/* Elegant overlay gradient to ensure text contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/85 via-[#0A0A0A]/20 to-[#0A0A0A]/40 pointer-events-none" />
            </div>

            {/* Bottom Content Row: Left Project details, Right Pagination */}
            <div className="relative z-20 w-full px-4 md:px-6 pb-6 md:pb-8 flex flex-col md:flex-row md:items-end justify-between gap-8 pointer-events-none">
                
                {/* Bottom Left: Project Name */}
                <div className="max-w-[700px] w-full">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentProject.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        >
                            {/* Project Name */}
                            <h2
                                className="text-4xl md:text-6xl lg:text-7xl text-white font-normal leading-[0.95] tracking-tight font-display"
                                style={{ letterSpacing: "-0.045em" }}
                            >
                                {currentProject.client}
                            </h2>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Bottom Right: Slide Pagination Index */}
                <div className="flex items-end self-end md:self-auto">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentProject.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.3 }}
                            className="text-2xl md:text-3xl font-mono font-medium text-white tracking-widest"
                        >
                            {String(index + 1).padStart(2, "0")}
                        </motion.div>
                    </AnimatePresence>
                </div>

            </div>

        </section>
    );
}


