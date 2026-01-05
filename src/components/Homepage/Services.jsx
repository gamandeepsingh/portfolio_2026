import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiExternalLink, FiBriefcase, FiCalendar } from 'react-icons/fi';
import { experience, skills } from '../../utils/data';

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
    const sectionRef = useRef(null);
    const experienceRef = useRef(null);
    const skillsRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate experience cards
            gsap.from('.experience-card', {
                y: 60,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: experienceRef.current,
                    start: 'top 80%',
                    toggleActions: 'play none none none',
                },
            });

            // Animate skill categories
            gsap.from('.skill-category', {
                y: 40,
                opacity: 0,
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
        <div ref={sectionRef} className="relative min-h-screen w-full bg-dark px-4 sm:px-8 py-24 sm:py-32" id="services">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[120px]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Experience Section */}
                <div ref={experienceRef} className="mb-32">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="mb-16"
                    >
                        <span className="text-gray-500 font-nohemi-thin text-sm tracking-widest uppercase mb-4 block">
                            (Experience)
                        </span>
                        <h2 className="font-nohemi text-4xl sm:text-5xl md:text-6xl text-white">
                            Where I&apos;ve <span className="text-primary">Worked</span>
                        </h2>
                    </motion.div>

                    {/* Experience Timeline */}
                    <div className="space-y-6">
                        {experience.map((job) => (
                            <motion.div
                                key={job.id}
                                className="experience-card group relative"
                                whileHover={{ x: 10 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="relative p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 hover:bg-white/[0.04] transition-all duration-500">
                                    {/* Top Row */}
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-xl flex items-center justify-center">
                                                <img src={job.logo} className='w-full h-full rounded' alt="" />
                                            </div>
                                            <div>
                                                <h3 className="font-nohemi text-xl sm:text-2xl text-white group-hover:text-primary transition-colors">
                                                    {job.company}
                                                </h3>
                                                <p className="font-nohemi-thin text-gray-400 text-sm">
                                                    {job.role}
                                                </p>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center gap-4">
                                            <span className="flex items-center gap-2 text-gray-500 text-sm font-nohemi-thin">
                                                <FiCalendar className="w-4 h-4" />
                                                {job.duration}
                                            </span>
                                            <span className="px-3 py-1 rounded-full bg-white/5 text-xs text-gray-400 font-nohemi-thin">
                                                {job.type}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <ul className="space-y-2 mb-4">
                                        {job.description.map((item, i) => (
                                            <li key={i} className="flex items-start gap-3 text-gray-400 font-nohemi-thin text-sm">
                                                <span className="text-primary mt-1.5 flex-shrink-0">•</span>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>

                                    {/* Technologies */}
                                    <div className="flex flex-wrap gap-2">
                                        {job.technologies.map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-3 py-1.5 rounded-lg bg-white/5 text-xs text-gray-300 font-nohemi-thin hover:bg-white/10 transition-colors"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    {/* External Link */}
                                    {job.link && (
                                        <a
                                            href={job.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors"
                                        >
                                            <FiExternalLink className="w-5 h-5" />
                                        </a>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Skills Section */}
                <div ref={skillsRef}>
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
                                className=" p-6 rounded-2xl bg-white/10 border border-white/10 hover:border-primary transition-all duration-500"
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
        </div>
    );
};

export default Services;
                               