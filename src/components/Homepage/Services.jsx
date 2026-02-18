import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiExternalLink } from 'react-icons/fi';
import { experience } from '../../utils/data';

gsap.registerPlugin(ScrollTrigger);

/* ────────────────────── Experience Card ────────────────────── */
const ExperienceCard = ({ job, index }) => (
    <div className="relative p-5 lg:p-6 rounded-2xl bg-white/2 border border-white/6 hover:border-primary/20 hover:bg-white/3 transition-all duration-500 group h-full flex flex-col">
        {/* Subtle index */}
        <span className="absolute top-5 right-5 font-nohemi text-[10px] text-white/6 select-none pointer-events-none">
            {String(index + 1).padStart(2, '0')}
        </span>

        {/* Company + Role */}
        <div className="flex items-center gap-3 mb-3">
            <img
                src={job.logo}
                alt={job.company}
                className="w-10 h-10 rounded-lg object-cover shrink-0 bg-white/5"
            />
            <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                    <h3 className="font-nohemi text-lg text-white group-hover:text-primary transition-colors duration-300 truncate">
                        {job.company}
                    </h3>
                    {job.link && (
                        <a
                            href={job.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white hover:text-primary/60 transition-colors duration-300 shrink-0"
                        >
                            <FiExternalLink className="w-3.5 h-3.5" />
                        </a>
                    )}
                </div>
                <p className="font-nohemi-thin text-gray-500 text-[13px]">{job.role}</p>
            </div>
        </div>

        {/* Type & Duration */}
        <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-[11px] font-nohemi-thin">
                {job.type}
            </span>
            <span className="text-gray-600 text-[11px] font-nohemi-thin">{job.duration}</span>
        </div>

        {/* Description */}
        <ul className="space-y-1.5 mb-3">
            {job.description.map((d, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-400/80 font-nohemi-thin text-[12.5px] leading-relaxed">
                    <span className="text-primary/40 mt-0.5 shrink-0">–</span>
                    <span>{d}</span>
                </li>
            ))}
        </ul>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5 mt-auto">
            {job.technologies.map((t) => (
                <span
                    key={t}
                    className="px-2 py-0.5 rounded bg-white/4 text-[10.5px] text-gray-500/80 font-nohemi-thin"
                >
                    {t}
                </span>
            ))}
        </div>
    </div>
);

/* ────────────────────── Main Component ────────────────────── */
const Services = () => {
    const sectionRef = useRef(null);
    const triggerRef = useRef(null);
    const panelRef = useRef(null);
    const progressRef = useRef(null);

    const [isMobile, setIsMobile] = useState(() =>
        typeof window !== 'undefined' ? window.innerWidth < 768 : false,
    );

    /* ── Responsive listener ── */
    useEffect(() => {
        let timer;
        const onResize = () => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                setIsMobile(window.innerWidth < 768);
                ScrollTrigger.refresh();
            }, 200);
        };
        window.addEventListener('resize', onResize);
        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', onResize);
        };
    }, []);

    /* ── Desktop: Horizontal pinned scroll ── */
    useEffect(() => {
        if (isMobile) return;

        const ctx = gsap.context(() => {
            const panel = panelRef.current;
            if (!panel) return;

            const scrollDist = () => panel.scrollWidth - window.innerWidth;

            // Main horizontal tween
            const tween = gsap.to(panel, {
                x: () => -(scrollDist()),
                ease: 'none',
                scrollTrigger: {
                    trigger: triggerRef.current,
                    pin: true,
                    scrub: 0.5,
                    end: () => `+=${scrollDist()}`,
                    invalidateOnRefresh: true,
                },
            });

            // Timeline progress fill
            gsap.to(progressRef.current, {
                scaleX: 1,
                ease: 'none',
                scrollTrigger: {
                    trigger: triggerRef.current,
                    scrub: 0.5,
                    start: 'top top',
                    end: () => `+=${scrollDist()}`,
                },
            });

            // Header fade-in
            gsap.from('.tl-header', {
                opacity: 0,
                y: 20,
                duration: 0.8,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: triggerRef.current,
                    start: 'top 80%',
                    toggleActions: 'play none none none',
                },
            });

            // Card reveals (scrubbed with horizontal scroll)
            gsap.utils.toArray('.tl-card').forEach((el) => {
                gsap.fromTo(
                    el,
                    { opacity: 0, y: 50 },
                    {
                        opacity: 1,
                        y: 0,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: el,
                            containerAnimation: tween,
                            start: 'left 90%',
                            end: 'left 60%',
                            scrub: true,
                        },
                    },
                );
            });

            // Dot pop-ins
            gsap.utils.toArray('.tl-dot').forEach((el) => {
                gsap.fromTo(
                    el,
                    { scale: 0 },
                    {
                        scale: 1,
                        ease: 'back.out(2)',
                        scrollTrigger: {
                            trigger: el,
                            containerAnimation: tween,
                            start: 'left 88%',
                            end: 'left 68%',
                            scrub: true,
                        },
                    },
                );
            });
        }, sectionRef);

        return () => ctx.revert();
    }, [isMobile]);

    /* ── Mobile: Vertical stagger animations ── */
    useEffect(() => {
        if (!isMobile) return;

        const ctx = gsap.context(() => {
            // Header
            gsap.from('.tl-header-m', {
                opacity: 0,
                y: 20,
                duration: 0.6,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.tl-header-m',
                    start: 'top 88%',
                    toggleActions: 'play none none none',
                },
            });

            // Cards
            gsap.utils.toArray('.tl-m-item').forEach((el) => {
                gsap.from(el, {
                    opacity: 0,
                    y: 30,
                    duration: 0.7,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 88%',
                        toggleActions: 'play none none none',
                    },
                });
            });

            // Vertical line draw
            gsap.from('.tl-vert-line', {
                scaleY: 0,
                transformOrigin: 'top',
                duration: 1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.tl-vert-line',
                    start: 'top 90%',
                    toggleActions: 'play none none none',
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, [isMobile]);

    /* ────────────────── Render ────────────────── */
    return (
        <section ref={sectionRef} className="relative bg-dark" id="experience">
            {!isMobile ? (
                /* ═══════════ DESKTOP — Horizontal Scroll ═══════════ */
                <div ref={triggerRef} className="h-screen overflow-hidden">
                    <div className="h-full flex flex-col justify-center">
                        {/* Section header */}
                        <div className="tl-header px-8 lg:px-16 xl:px-24 pt-16 lg:pt-20 pb-6">
                            <span className="text-gray-600 font-nohemi-thin text-xs tracking-[0.2em] uppercase mb-3 block">
                                Experience
                            </span>
                            <h2 className="font-nohemi text-4xl lg:text-5xl xl:text-6xl text-white leading-tight">
                                Where I&apos;ve{' '}
                                <span className="text-primary">Worked</span>
                            </h2>
                        </div>

                        {/* Scroll region */}
                        <div className=" relative">
                            {/* ── Scrolling panel ── */}
                            <div
                                ref={panelRef}
                                className="h-full flex items-stretch gap-6 lg:gap-8 pl-8 lg:pl-16 xl:pl-24"
                                style={{ paddingRight: '40vw' }}
                            >
                                {experience.map((job, i) => (
                                    <div
                                        key={job.id}
                                        className="tl-card shrink-0 w-85 lg:w-100 xl:w-110 flex flex-col"
                                        style={{ paddingBottom: '74px' }}
                                    >
                                        {/* Card */}
                                        <div className="flex-1">
                                            <ExperienceCard job={job} index={i} />
                                        </div>

                                        {/* Timeline node */}
                                        <div className="flex flex-col items-center mt-auto">
                                            <div className="w-px h-8 bg-white/8" />
                                            <div className="tl-dot w-3 h-3 rounded-full bg-primary shadow-[0_0_12px_rgba(37,85,220,0.5)] ring-[3px] ring-primary/10" />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* ── Horizontal baseline ── */}
                            <div
                                className="absolute left-0 w-full pointer-events-none"
                                style={{ bottom: '80px' }}
                            >
                                <div className="h-px w-full bg-white/5" />
                                <div
                                    ref={progressRef}
                                    className="absolute inset-0 h-px bg-linear-to-r from-primary/40 via-primary/20 to-transparent origin-left"
                                    style={{ transform: 'scaleX(0)' }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                /* ═══════════ MOBILE — Vertical Timeline ═══════════ */
                <div className="px-4 sm:px-6 py-20">
                    {/* Header */}
                    <div className="tl-header-m mb-10">
                        <span className="text-gray-600 font-nohemi-thin text-xs tracking-[0.2em] uppercase mb-3 block">
                            Experience
                        </span>
                        <h2 className="font-nohemi text-3xl sm:text-4xl text-white">
                            Where I&apos;ve{' '}
                            <span className="text-primary">Worked</span>
                        </h2>
                    </div>

                    <div className="relative">
                        {/* Vertical line */}
                        <div className="tl-vert-line absolute left-1.75 top-2 bottom-2 w-px bg-white/6" />

                        <div className="space-y-6">
                            {experience.map((job, i) => (
                                <div key={job.id} className="tl-m-item relative pl-8">
                                    {/* Node dot */}
                                    <div className="absolute left-0.75 top-7 w-2.25 h-2.25 rounded-full bg-primary shadow-[0_0_8px_rgba(37,85,220,0.4)]" />

                                    <ExperienceCard job={job} index={i} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Services;
                               