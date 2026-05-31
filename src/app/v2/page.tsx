"use client";

import ProjectSlider from "./_components/ProjectSlider";
import Statement from "./_components/Statement";
import SelectedWork from "./_components/SelectedWork";
import ServicesTeaser from "./_components/ServicesTeaser";
import CTA from "./_components/CTA";

export default function V2Page() {
    return (
        <div className="relative">
            {/* Big Screen Auto-Swiping Hero Project Slider */}
            <ProjectSlider />

            {/* Brand Manifesto Statement & Focus Columns */}
            <Statement />

            {/* Asymmetrical Staggered Project Showcase Grid */}
            <SelectedWork />

            {/* Creative Services Teaser Segment */}
            <ServicesTeaser />

            {/* Initiation Call-to-Action Panel */}
            <CTA />
        </div>
    );
}
