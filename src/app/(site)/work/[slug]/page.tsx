import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CASE_STUDIES } from "../projects";
import CaseStudyClient from "./CaseStudyClient";

export function generateStaticParams() {
    return CASE_STUDIES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const project = CASE_STUDIES.find((p) => p.slug === slug);
    if (!project) return {};
    return {
        title: project.client,
        description: project.title.en,
        alternates: { canonical: `https://aova.studio/work/${project.slug}` },
        openGraph: {
            title: `${project.client} — Aova Studio`,
            description: project.title.en,
            images: [{ url: "/og.jpg", width: 1200, height: 630, alt: project.client }],
        },
    };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const project = CASE_STUDIES.find((p) => p.slug === slug);
    if (!project) notFound();
    return <CaseStudyClient project={project} />;
}
