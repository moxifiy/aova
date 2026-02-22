import type { Metadata } from "next";
import { DM_Sans, JetBrains_Mono, DM_Serif_Display } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
	variable: "--font-dm-sans",
	subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
	variable: "--font-jetbrains",
	subsets: ["latin"],
});

const dmSerifDisplay = DM_Serif_Display({
	variable: "--font-dm-serif",
	subsets: ["latin"],
	weight: "400",
	style: ["normal", "italic"],
});

export const metadata: Metadata = {
	title: "Aova — Design & Motion Studio",
	description:
		"Boutique design studio specialising in brand identity, digital interfaces, and motion design for founders who refuse to settle for ordinary.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${dmSans.variable} ${jetbrainsMono.variable} ${dmSerifDisplay.variable} antialiased`}
			>
				{children}
			</body>
		</html>
	);
}
