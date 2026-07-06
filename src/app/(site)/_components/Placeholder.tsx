import Image from "next/image";

// Temporary stand-in image — swap each usage for real photography/case-study
// imagery later. Using one real photo (instead of a flat gray box) so hover
// zooms and other motion are visible while reviewing the site.
export default function Placeholder({
    dark = false,
    className = "",
}: {
    dark?: boolean;
    className?: string;
    iconClassName?: string;
}) {
    return (
        <div
            className={`absolute inset-0 overflow-hidden border ${
                dark ? "border-white/10" : "border-[#0A0A0A]/10"
            } ${className}`}
        >
            <Image
                src="/fotka.jpg"
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
            />
        </div>
    );
}
