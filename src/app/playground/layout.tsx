import type { Metadata } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import "./playground.css";

const instrumentSerif = Instrument_Serif({
	variable: "--font-instrument",
	subsets: ["latin"],
	weight: "400",
	style: ["normal", "italic"],
});

const inter = Inter({
	variable: "--font-inter",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Aova — Playground",
	description: "Playground UI exploration for Aova.",
};

export default function PlaygroundLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className={`${instrumentSerif.variable} ${inter.variable} antialiased playground-root`}>
			{children}
		</div>
	);
}
