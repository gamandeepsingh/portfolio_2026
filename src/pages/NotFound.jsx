import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { FiArrowUpRight } from 'react-icons/fi';

const NotFound = () => {
    const containerRef = useRef(null);
    const glitchRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Entrance timeline
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

            tl.from('.nf-404', {
                opacity: 0,
                scale: 0.88,
                duration: 0.9,
            })
                .from(
                    '.nf-label',
                    { opacity: 0, y: 16, duration: 0.5 },
                    '-=0.4',
                )
                .from(
                    '.nf-message',
                    { opacity: 0, y: 14, duration: 0.5 },
                    '-=0.3',
                )
                .from(
                    '.nf-actions',
                    { opacity: 0, y: 12, duration: 0.5 },
                    '-=0.25',
                );

            // Subtle glitch pulse on the 404 number
            gsap.to(glitchRef.current, {
                skewX: 1.5,
                duration: 0.08,
                repeat: -1,
                repeatDelay: 4,
                yoyo: true,
                ease: 'none',
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div
            ref={containerRef}
            className="relative min-h-screen w-full bg-dark flex flex-col items-center justify-center px-6 overflow-hidden"
        >
            {/* Ambient glow */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-primary/4 rounded-full blur-[120px]" />
            </div>

            {/* Horizontal rule top */}
            <div className="absolute top-0 left-0 w-full h-px bg-white/4" />

            <div className="relative z-10 text-center max-w-lg">
                {/* 404 */}
                <div className="nf-404 mb-2 select-none">
                    <span
                        ref={glitchRef}
                        className="font-nohemi text-[clamp(7rem,20vw,14rem)] leading-none text-white/4 tracking-tight block"
                        aria-hidden="true"
                    >
                        404
                    </span>
                </div>

                {/* Label */}
                <div className="nf-label mb-4 -mt-6 sm:-mt-10">
                    <span className="inline-block px-3 py-1 rounded-full border border-white/8 bg-white/3 font-nohemi-thin text-[11px] text-gray-500 uppercase tracking-[0.2em]">
                        Page not found
                    </span>
                </div>

                {/* Message */}
                <p className="nf-message font-nohemi-thin text-gray-500 text-sm leading-relaxed mb-10 max-w-sm mx-auto">
                    Looks like this page wandered off into the void. It either moved, got deleted, or never existed.
                </p>

                {/* Actions */}
                <div className="nf-actions flex flex-col sm:flex-row items-center justify-center gap-3">
                    <Link
                        to="/"
                        className="group inline-flex items-center gap-2 bg-primary hover:bg-primary-light transition-colors duration-300 px-6 py-3 rounded-xl font-nohemi text-sm text-white shadow-[0_0_24px_rgba(37,85,220,0.25)]"
                    >
                        Back to Home
                        <FiArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                    </Link>

                    <Link
                        to="/projects"
                        className="inline-flex items-center gap-2 border border-white/8 hover:border-white/[0.14] hover:bg-white/3 transition-all duration-300 px-6 py-3 rounded-xl font-nohemi-thin text-sm text-gray-400 hover:text-white"
                    >
                        View Projects
                    </Link>
                </div>
            </div>

            {/* Horizontal rule bottom */}
            <div className="absolute bottom-0 left-0 w-full h-px bg-white/4" />
        </div>
    );
};

export default NotFound;
