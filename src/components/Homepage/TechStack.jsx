import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { skills } from '../../utils/data';

gsap.registerPlugin(ScrollTrigger);

const TechStack = () => {
    const sectionRef = useRef(null);
    const skillsRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate skill categories
            gsap.from('.skill-category', {
                y: 40,
                duration: 0.6,
                stagger: 0.1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: skillsRef.current,
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const skillCategories = [
        { title: 'Languages', items: skills.languages },
        { title: 'Frameworks', items: skills.frameworks },
        { title: 'Web3', items: skills.web3 },
        { title: 'Databases', items: skills.databases },
        { title: 'Tools', items: skills.tools },
    ];

    return (
        <div ref={sectionRef} className="relative w-full bg-dark px-4 sm:px-8 py-24 sm:py-32" id="tech-stack">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[120px]" />
            </div>

            <div ref={skillsRef} className="relative z-10 max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <span className="text-gray-500 font-nohemi-thin text-sm tracking-widest uppercase mb-4 block">
                        (Skills)
                    </span>
                    <h2 className="font-nohemi text-4xl sm:text-5xl md:text-6xl text-white">
                        Tech <span className="text-primary">Stack</span>
                    </h2>
                </motion.div>

                {/* Skills Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {skillCategories.map((category) => (
                        <motion.div
                            key={category.title}
                            className="skill-category p-6 rounded-2xl bg-white/10 border border-white/10 hover:border-primary transition-all duration-500"
                            whileHover={{ y: -5 }}
                        >
                            <h3 className="font-nohemi text-lg mb-4 text-primary">
                                {category.title}
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {category.items.map((skill) => (
                                    <span
                                        key={skill}
                                        className="px-3 py-1.5 rounded-lg bg-white/10 text-sm text-white font-nohemi-thin hover:bg-primary hover:text-dark transition-colors cursor-default"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TechStack;
