"use client";

import { useState, useEffect, useRef, useCallback, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";

/* ================================================================
   ICONS
   ================================================================ */
function ArrowIcon({ size = 14 }: { size?: number }) {
	return (
		<svg width={size} height={size} viewBox="0 0 14 14" fill="none">
			<path
				d="M2 12L12 2M12 2H5M12 2V9"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

function PlusIcon() {
	return (
		<svg width="10" height="10" viewBox="0 0 10 10" fill="none">
			<path
				d="M5 1V9M1 5H9"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
			/>
		</svg>
	);
}

function ChevronLeft() {
	return (
		<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
			<path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	);
}

function ChevronRight() {
	return (
		<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
			<path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	);
}

/* ================================================================
   AOVA LOGO (inline SVG from AOVA1G.svg)
   ================================================================ */
function AovaLogo({ size = 24 }: { size?: number }) {
	return (
		<svg
			viewBox="0 0 171.27 171.27"
			fill="currentColor"
			width={size}
			height={size}
			aria-label="Aova"
		>
			<path d="M171.27,0v91c0,44.33-35.94,80.27-80.27,80.27h-31.96v-59.04h59.04v-59.04h-59.04v59.04H0v-31.96C0,35.94,35.94,0,80.27,0h91Z" />
		</svg>
	);
}

/* ================================================================
   SCROLL REVEAL
   ================================================================ */
function Reveal({
	children,
	delay = 0,
	className = "",
	immediate = false,
}: {
	children: ReactNode;
	delay?: number;
	className?: string;
	immediate?: boolean;
}) {
	const ref = useRef<HTMLDivElement>(null);
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		if (immediate) {
			const t = setTimeout(() => setVisible(true), 100);
			return () => clearTimeout(t);
		}

		const el = ref.current;
		if (!el) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setVisible(true);
					observer.unobserve(el);
				}
			},
			{ threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
		);

		observer.observe(el);
		return () => observer.disconnect();
	}, [immediate]);

	const delayClass = delay > 0 ? `reveal-delay-${delay}` : "";

	return (
		<div
			ref={ref}
			className={`reveal ${visible ? "visible" : ""} ${delayClass} ${className}`}
		>
			{children}
		</div>
	);
}

/* ================================================================
   CUSTOM CURSOR
   ================================================================ */
function CustomCursor() {
	const dotRef = useRef<HTMLDivElement>(null);
	const ringRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		let mx = 0,
			my = 0,
			rx = 0,
			ry = 0;

		const onMouseMove = (e: MouseEvent) => {
			mx = e.clientX;
			my = e.clientY;
		};

		let raf: number;
		const animate = () => {
			if (dotRef.current) {
				dotRef.current.style.left = mx + "px";
				dotRef.current.style.top = my + "px";
			}
			rx += (mx - rx) * 0.12;
			ry += (my - ry) * 0.12;
			if (ringRef.current) {
				ringRef.current.style.left = rx + "px";
				ringRef.current.style.top = ry + "px";
			}
			raf = requestAnimationFrame(animate);
		};

		document.addEventListener("mousemove", onMouseMove);
		raf = requestAnimationFrame(animate);

		return () => {
			document.removeEventListener("mousemove", onMouseMove);
			cancelAnimationFrame(raf);
		};
	}, []);

	return (
		<div className="cursor">
			<div className="cursor-ring" ref={ringRef} />
			<div className="cursor-dot" ref={dotRef} />
		</div>
	);
}

/* ================================================================
   NAVBAR
   ================================================================ */
function Navbar() {
	return (
		<nav className="site-nav">
			<a href="#" className="nav-logo">
				<AovaLogo size={22} />
			</a>
			<ul className="nav-links">
				<li><a href="#process">Process</a></li>
				<li><a href="#work">Work</a></li>
				<li><a href="#services">Services</a></li>
				<li><a href="#faq">FAQ</a></li>
			</ul>
			<a href="/book-a-call" className="nav-cta">
				Book a call
			</a>
		</nav>
	);
}

/* ================================================================
   HERO
   ================================================================ */
function Hero() {
	return (
		<section className="hero" id="hero">
			{/* Animated grid pattern — spans full width */}
			<div className="hero-grid-wrap">
				<AnimatedGridPattern
					numSquares={30}
					maxOpacity={0.08}
					duration={3}
					repeatDelay={1}
					className={cn(
						"text-[#E8FF47]",
						"fill-[#E8FF47]/5 stroke-[#333]",
					)}
				/>
			</div>

			{/* Ambient blobs */}
			<div
				className="hero-blob"
				style={{
					width: 500,
					height: 500,
					top: -100,
					left: -150,
					background:
						"radial-gradient(circle, #f0e8d8 0%, transparent 70%)",
				}}
			/>
			<div
				className="hero-blob"
				style={{
					width: 400,
					height: 400,
					bottom: -50,
					right: -100,
					background:
						"radial-gradient(circle, #dce8f0 0%, transparent 70%)",
				}}
			/>

			<div className="hero-inner">
				<Reveal immediate>
					<div className="hero-badge">
						<span className="hero-badge-dot" />
						Design partner for startups
					</div>
				</Reveal>

				<Reveal immediate delay={1}>
					<h1 className="hero-headline">
						Design studio committed to <em>elevating startups</em> with
						intentional branding.
					</h1>
				</Reveal>

				<Reveal immediate delay={2}>
					<p className="hero-sub">
						Modern web experiences crafted with precision, for founders who
						care about how their brand looks and feels.
					</p>
				</Reveal>

				<Reveal immediate delay={3}>
					<a href="/book-a-call" className="hero-cta">
						Reserve your spot
						<span className="hero-cta-icon">
							<svg viewBox="0 0 10 10" fill="none">
								<path
									d="M1 9L9 1M9 1H3M9 1V7"
									stroke="currentColor"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</span>
					</a>
				</Reveal>

				<Reveal immediate delay={4}>
					<p className="hero-avail">Booking for Q1 2026</p>
				</Reveal>
			</div>
		</section>
	);
}

/* ================================================================
   MARQUEE
   ================================================================ */
const MARQUEE_ITEMS = [
	"Brand Identity",
	"UI/UX Design",
	"Motion & Animation",
	"Design Systems",
	"Web Development",
	"Art Direction",
];

function Marquee() {
	return (
		<div className="marquee-wrap">
			<div className="marquee-track">
				{[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
					<span key={i} className="marquee-item">
						{item}
					</span>
				))}
			</div>
		</div>
	);
}

/* ================================================================
   PROCESS
   ================================================================ */
const PROCESS_STEPS = [
	{
		num: "01",
		title: "Discovery",
		desc: "We start by understanding your brand, your audience, and your goals. Deep research and strategic thinking before a single pixel is placed.",
	},
	{
		num: "02",
		title: "Design",
		desc: "Iterative design process with regular check-ins. We craft every detail with intention — from typography to micro-interactions.",
	},
	{
		num: "03",
		title: "Delivery",
		desc: "Pixel-perfect handoff with production-ready assets, design systems, and documentation. We stay involved through launch and beyond.",
	},
];

function ProcessSection() {
	return (
		<section className="process" id="process">
			<Reveal>
				<div className="section-header-center">
					<p className="section-tag">How we work</p>
					<h2 className="section-title">
						A proven <em>process</em>
					</h2>
				</div>
			</Reveal>

			<div className="process-grid">
				{PROCESS_STEPS.map((step, i) => (
					<Reveal key={step.num} delay={i + 1}>
						<div className="process-card">
							<span className="process-num">{step.num}</span>
							<h3 className="process-card-title">{step.title}</h3>
							<p className="process-card-desc">{step.desc}</p>
						</div>
					</Reveal>
				))}
			</div>
		</section>
	);
}

/* ================================================================
   WORK / PROJECT GALLERIES
   ================================================================ */
const PROJECTS = [
	{
		title: "Lumara — Redefining Sustainable Luxury",
		tags: ["Brand Identity", "2024"],
		desc: "Full brand overhaul, packaging, and digital presence for a next-gen sustainable fashion label.",
		images: ["vis-1", "vis-2", "vis-3"],
	},
	{
		title: "Orion Analytics Dashboard",
		tags: ["UI / UX", "SaaS"],
		desc: "A zero-friction data platform for Series-B fintech startup Orion.",
		images: ["vis-2", "vis-4", "vis-1"],
	},
	{
		title: "Halo — Brand in Motion",
		tags: ["Motion", "Branding"],
		desc: "Dynamic brand identity system with animated assets for digital-first wellness brand Halo.",
		images: ["vis-3", "vis-1", "vis-5"],
	},
];

function ProjectCard({
	project,
	index,
}: {
	project: (typeof PROJECTS)[0];
	index: number;
}) {
	const [current, setCurrent] = useState(0);
	const total = project.images.length;

	const prev = () => setCurrent((c) => (c - 1 + total) % total);
	const next = () => setCurrent((c) => (c + 1) % total);

	return (
		<Reveal delay={index + 1}>
			<div className="project-card">
				<div className="project-slider">
					<div
						className="project-slides"
						style={{ transform: `translateX(-${current * 100}%)` }}
					>
						{project.images.map((img, i) => (
							<div key={i} className={`project-slide ${img}`} />
						))}
					</div>

					<div className="project-slider-controls">
						<button className="slider-btn" onClick={prev} aria-label="Previous slide">
							<ChevronLeft />
						</button>
						<span className="slider-counter">
							{String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
						</span>
						<button className="slider-btn" onClick={next} aria-label="Next slide">
							<ChevronRight />
						</button>
					</div>
				</div>

				<div className="project-info">
					<div className="project-tags">
						{project.tags.map((tag) => (
							<span key={tag} className="project-tag">
								{tag}
							</span>
						))}
					</div>
					<h3 className="project-title">{project.title}</h3>
					<p className="project-desc">{project.desc}</p>
				</div>
			</div>
		</Reveal>
	);
}

function WorkSection() {
	return (
		<section className="work" id="work">
			<Reveal>
				<div className="section-header">
					<div>
						<p className="section-tag">Selected Work</p>
						<h2 className="section-title">
							Recent <em>projects</em>
						</h2>
					</div>
					<a href="#" className="section-link">
						All work
						<ArrowIcon />
					</a>
				</div>
			</Reveal>

			<div className="projects-grid">
				{PROJECTS.map((project, i) => (
					<ProjectCard key={project.title} project={project} index={i} />
				))}
			</div>
		</section>
	);
}

/* ================================================================
   SERVICES
   ================================================================ */
const SERVICES = [
	{
		title: "Brand Identity",
		desc: "Logo, visual language, brand guidelines, and strategic positioning.",
	},
	{
		title: "UI / UX Design",
		desc: "User research, wireframes, prototyping, and high-fidelity design.",
	},
	{
		title: "Web Development",
		desc: "Custom websites built with modern frameworks, optimized for performance.",
	},
	{
		title: "Ads",
		desc: "Scroll-stopping graphic and motion ads for social, display, and video campaigns.",
	},
	{
		title: "Motion & Animation",
		desc: "Micro-interactions, transitions, and animated brand assets.",
	},
];

function ServicesSection() {
	return (
		<section className="services" id="services">
			<div className="services-inner">
				<Reveal>
					<div className="section-header-center">
						<p className="section-tag">What we do</p>
						<h2 className="section-title">
							Our <em>services</em>
						</h2>
					</div>
				</Reveal>

				<div className="services-list">
					{SERVICES.map((service, i) => (
						<Reveal key={service.title} delay={i + 1}>
							<div className="service-item">
								<div className="service-left">
									<span className="service-num">
										{String(i + 1).padStart(2, "0")}
									</span>
									<h3 className="service-title">{service.title}</h3>
								</div>
								<p className="service-desc">{service.desc}</p>
								<div className="service-arrow">
									<ArrowIcon size={12} />
								</div>
							</div>
						</Reveal>
					))}
				</div>
			</div>
		</section>
	);
}

/* ================================================================
   TESTIMONIALS
   ================================================================ */
const TESTIMONIALS = [
	{
		quote: "Aova transformed our entire brand presence. The attention to detail and strategic thinking behind every design decision was exceptional.",
		name: "Sarah Chen",
		role: "CEO, Lumara",
		featured: true,
	},
	{
		quote: "Working with Aova felt like having an in-house design team that truly understands startup culture and speed.",
		name: "Marcus Rivera",
		role: "Founder, Orion",
		featured: false,
	},
	{
		quote: "The design system they built for us has been transformative. Our development velocity doubled overnight.",
		name: "Aya Tanaka",
		role: "CTO, Quanta",
		featured: false,
	},
	{
		quote: "They don't just make things look good — they make them work. Every interaction, every transition, every detail is considered.",
		name: "David Park",
		role: "Head of Product, Halo",
		featured: false,
	},
];

function TestimonialsSection() {
	return (
		<section className="testimonials" id="testimonials">
			<Reveal>
				<div className="section-header-center">
					<p className="section-tag">Testimonials</p>
					<h2 className="section-title">
						Client <em>words</em>
					</h2>
				</div>
			</Reveal>

			<Reveal delay={1}>
				<div className="testimonials-grid">
					{TESTIMONIALS.map((t, i) => (
						<div
							key={i}
							className={`testimonial-card ${t.featured ? "testimonial-featured" : ""}`}
						>
							<p className="testimonial-quote">&ldquo;{t.quote}&rdquo;</p>
							<div className="testimonial-author">
								<div className="testimonial-avatar">
									{t.name.charAt(0)}
								</div>
								<div>
									<p className="testimonial-name">{t.name}</p>
									<p className="testimonial-role">{t.role}</p>
								</div>
							</div>
						</div>
					))}
				</div>
			</Reveal>
		</section>
	);
}

/* ================================================================
   FAQ
   ================================================================ */
const FAQS = [
	{
		q: "What types of projects do you take on?",
		a: "We work across brand identity, UI/UX design, design systems, motion graphics, and web development. We're selective — we take on fewer projects so we can give each one our full attention and craft.",
	},
	{
		q: "How long does a typical project take?",
		a: "Brand identity projects typically take 6–10 weeks. Web and product design engagements run 8–16 weeks. We always agree on a clear timeline before starting, and we stick to it.",
	},
	{
		q: "What does the process look like?",
		a: "We follow a three-phase approach: Discovery → Design → Delivery. You'll be involved at key decision points throughout, with regular check-ins and shared Figma files so you always know where things stand.",
	},
	{
		q: "What is your pricing structure?",
		a: "We work on a project-fee basis, not hourly. This means you know the full cost upfront with no surprises. Projects typically start from $12,000 for brand identity, and $24,000 for full product design engagements.",
	},
	{
		q: "Do you offer ongoing retainers?",
		a: "Yes — we offer monthly retainers for ongoing design support. These are reserved for existing clients and cover design iterations, new feature work, and asset creation. Slots are limited.",
	},
];

function FaqItem({
	q,
	a,
	isOpen,
	onToggle,
}: {
	q: string;
	a: string;
	isOpen: boolean;
	onToggle: () => void;
}) {
	const innerRef = useRef<HTMLParagraphElement>(null);
	const [height, setHeight] = useState(0);

	useEffect(() => {
		if (innerRef.current) {
			setHeight(innerRef.current.scrollHeight);
		}
	}, [a]);

	return (
		<div className={`faq-item ${isOpen ? "open" : ""}`}>
			<button className="faq-trigger" onClick={onToggle}>
				<span className="faq-trigger-text">{q}</span>
				<span className="faq-icon">
					<PlusIcon />
				</span>
			</button>
			<div
				className="faq-answer"
				style={{ maxHeight: isOpen ? height : 0 }}
			>
				<p ref={innerRef} className="faq-answer-inner">
					{a}
				</p>
			</div>
		</div>
	);
}

function FaqSection() {
	const [openIndex, setOpenIndex] = useState<number | null>(null);

	const toggle = useCallback(
		(i: number) => setOpenIndex((prev) => (prev === i ? null : i)),
		[]
	);

	return (
		<section className="faq" id="faq">
			<Reveal>
				<div className="section-header-center">
					<p className="section-tag">FAQ</p>
					<h2 className="section-title">
						Common <em>questions</em>
					</h2>
				</div>
			</Reveal>

			<Reveal delay={1}>
				<div className="faq-list-centered">
					{FAQS.map((faq, i) => (
						<FaqItem
							key={i}
							q={faq.q}
							a={faq.a}
							isOpen={openIndex === i}
							onToggle={() => toggle(i)}
						/>
					))}
				</div>
			</Reveal>
		</section>
	);
}

/* ================================================================
   CTA
   ================================================================ */
function CtaSection() {
	return (
		<section className="cta-section">
			<Reveal>
				<div className="cta-inner">
					<h2 className="cta-headline">
						Start your new project with <em>Aova</em> today.
					</h2>
					<a href="/book-a-call" className="hero-cta">
						Book a call
						<span className="hero-cta-icon">
							<svg viewBox="0 0 10 10" fill="none">
								<path
									d="M1 9L9 1M9 1H3M9 1V7"
									stroke="currentColor"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</span>
					</a>
				</div>
			</Reveal>
		</section>
	);
}

/* ================================================================
   FOUNDER
   ================================================================ */
function FounderSection() {
	return (
		<section className="founders" id="team">
			<Reveal>
				<div className="section-header-center">
					<p className="section-tag">The team</p>
					<h2 className="section-title">
						Meet the <em>founders</em>
					</h2>
				</div>
			</Reveal>

			<div className="founders-grid">
				<Reveal delay={1}>
					<div className="founder-card">
						<div className="founder-avatar">
							<span className="founder-initial">N</span>
						</div>
						<div className="founder-info">
							<p className="founder-label">Co-founder</p>
							<h3 className="founder-name">Noir&eacute;</h3>
							<p className="founder-bio">
								Graphic designer specializing in brand identity and UI/UX.
								Noir&eacute; crafts visual systems that feel intentional — from
								logos and brand guidelines to full product interfaces.
							</p>
							<div className="founder-links">
								<a href="#" className="founder-link">Twitter <ArrowIcon size={10} /></a>
								<a href="#" className="founder-link">LinkedIn <ArrowIcon size={10} /></a>
							</div>
						</div>
					</div>
				</Reveal>

				<Reveal delay={2}>
					<div className="founder-card">
						<div className="founder-avatar">
							<span className="founder-initial">K</span>
						</div>
						<div className="founder-info">
							<p className="founder-label">Co-founder</p>
							<h3 className="founder-name">Kudy</h3>
							<p className="founder-bio">
								Motion designer bringing brands to life through animation.
								Kudy creates micro-interactions, animated ads, and dynamic
								brand assets that captivate and convert.
							</p>
							<div className="founder-links">
								<a href="#" className="founder-link">Twitter <ArrowIcon size={10} /></a>
								<a href="#" className="founder-link">LinkedIn <ArrowIcon size={10} /></a>
							</div>
						</div>
					</div>
				</Reveal>
			</div>
		</section>
	);
}

/* ================================================================
   FOOTER
   ================================================================ */
function Footer() {
	return (
		<footer className="site-footer">
			<div className="footer-inner">
				<div className="footer-col footer-col-brand">
					<div className="footer-logo-mark">
						<AovaLogo size={28} />
					</div>
					<p className="footer-tagline">
						Premium design studio for startups who care about craft.
					</p>
				</div>

				<div className="footer-col">
					<p className="footer-col-title">Navigation</p>
					<ul className="footer-nav">
						<li><a href="#process">Process</a></li>
						<li><a href="#work">Work</a></li>
						<li><a href="#services">Services</a></li>
						<li><a href="#faq">FAQ</a></li>
						<li><a href="/book-a-call">Book a Call</a></li>
					</ul>
				</div>

				<div className="footer-col">
					<p className="footer-col-title">Connect</p>
					<ul className="footer-nav">
						<li><a href="#">Twitter</a></li>
						<li><a href="#">Instagram</a></li>
						<li><a href="#">LinkedIn</a></li>
					</ul>
				</div>
			</div>

			<div className="footer-bottom">
				<span className="footer-copy">
					&copy; {new Date().getFullYear()} Aova Studio. All rights
					reserved.
				</span>
				<span className="footer-copy">
					Crafted with intention.
				</span>
			</div>
		</footer>
	);
}

/* ================================================================
   PAGE
   ================================================================ */
export default function Home() {
	return (
		<>
			<CustomCursor />
			<Navbar />
			<Hero />
			<Marquee />
			<ProcessSection />
			<WorkSection />
			<ServicesSection />
			<TestimonialsSection />
			<FaqSection />
			<CtaSection />
			<FounderSection />
			<Footer />
		</>
	);
}
