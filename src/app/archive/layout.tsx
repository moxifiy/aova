import type { Metadata } from "next";

// Internal archive — keep it reachable but out of search engines
export const metadata: Metadata = {
    robots: { index: false, follow: false },
};

export default function ArchiveLayout({ children }: { children: React.ReactNode }) {
    return children;
}
