import type { Metadata } from "next";

// Archived version of the old site — keep it reachable but out of search engines
export const metadata: Metadata = {
    robots: { index: false, follow: false },
};

export default function V1Layout({ children }: { children: React.ReactNode }) {
    return children;
}
