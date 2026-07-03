import type { MetadataRoute } from "next";
import { CASE_STUDIES } from "./(site)/work/projects";

export default function sitemap(): MetadataRoute.Sitemap {
	const lastModified = new Date();
	const caseStudies: MetadataRoute.Sitemap = CASE_STUDIES.map((p) => ({
		url: `https://aova.studio/work/${p.slug}`,
		lastModified,
		changeFrequency: "monthly",
		priority: 0.7,
	}));
	return [
		{
			url: "https://aova.studio",
			lastModified,
			changeFrequency: "weekly",
			priority: 1,
		},
		{
			url: "https://aova.studio/work",
			lastModified,
			changeFrequency: "weekly",
			priority: 0.9,
		},
		{
			url: "https://aova.studio/services",
			lastModified,
			changeFrequency: "monthly",
			priority: 0.9,
		},
		{
			url: "https://aova.studio/about",
			lastModified,
			changeFrequency: "monthly",
			priority: 0.8,
		},
		{
			url: "https://aova.studio/contact",
			lastModified,
			changeFrequency: "monthly",
			priority: 0.8,
		},
		...caseStudies,
	];
}
