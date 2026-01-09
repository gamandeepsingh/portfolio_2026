import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Tech stack with icons
const techStack = {
    languages: [
        { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
        { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
        { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
        { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
        { name: 'Solidity', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/solidity/solidity-original.svg' },
        { name: 'Rust', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-original.svg' },
        { name: 'C', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg' },
        { name: 'HTML', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
    ],
    frameworks: [
        { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
        { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
        { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
        { name: 'Express', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
        { name: 'Angular', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg' },
        { name: 'Flask', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg' },
        { name: 'Tailwind', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
        { name: 'SCSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg' },
        { name: 'GSAP', icon: 'https://gsap.com/favicon-32x32.png' },
    ],
    web3: [
        { name: 'Ethereum', icon: 'https://imgs.search.brave.com/PqznclUXrw6Y5vqNr7XATKe-zi6KQ2SP0qWlz4B1hIc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9ldGhl/cmV1bS5vcmcvX25l/eHQvaW1hZ2UvP3Vy/bD0vX25leHQvc3Rh/dGljL21lZGlhL2V0/aGVyZXVtLWxvZ28t/cG9ydHJhaXQtYmxh/Y2suZDVlMWMyYmQu/cG5nJnc9MTkyMCZx/PTc1' },
        { name: 'Solana', icon: 'https://imgs.search.brave.com/D9wv0jFDighhIW5LybAM2DDGszqhHPbuqHbOI4ZfO-w/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuc2Vla2xvZ28u/Y29tL2xvZ28tcG5n/LzY0LzIvc29sYW5h/LWxvZ28tcG5nX3Nl/ZWtsb2dvLTY0MDI2/Ni5wbmc' },
        { name: 'Web3.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/web3js/web3js-original.svg' },
        { name: 'Anchor', icon: 'https://imgs.search.brave.com/XIAxiQGygsukPiYXz_xnZNt1_HmrvvvY4b2Ia8AttG4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jYW1v/LmdpdGh1YnVzZXJj/b250ZW50LmNvbS9l/NDRjMzMzOWRiMmE4/YjU2ZGJiZmI4MDRm/ZGIxZjA3NmU3MzA0/NjkwOWE2NjZlMWE0/NTIyYWNmOWU0MTcz/N2Q3LzY4NzQ3NDcw/NzMzYTJmMmY3MDYy/NzMyZTc0Nzc2OTZk/NjcyZTYzNmY2ZDJm/NmQ2NTY0Njk2MTJm/NDY1NjU1NTY2MTRm/Mzk1ODQ1NDE0MTc1/NmM3NjRiM2Y2NjZm/NzI2ZDYxNzQzZDcw/NmU2NzI2NmU2MTZk/NjUzZDczNmQ2MTZj/NmM' },
    ],
    databases: [
        { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
        { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
        { name: 'Prisma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prisma/prisma-original.svg' },
        { name: 'Redis', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg' },
    ],
    tools: [
        { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
        { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
        { name: 'AWS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg' },
        { name: 'Vercel', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg' },
        { name: 'Postman', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg' },
        { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
        { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
        { name: 'Netlify', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/netlify/netlify-original.svg' },
    ],
};

const TechStack = () => {
    const sectionRef = useRef(null);
    const skillsRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.tech-item', {
                y: 30,
                opacity: 0,
                duration: 0.5,
                stagger: 0.03,
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
        { title: 'Languages', items: techStack.languages, gradient: 'from-yellow-500/20 to-orange-500/20' },
        { title: 'Frameworks', items: techStack.frameworks, gradient: 'from-cyan-500/20 to-blue-500/20' },
        { title: 'Web3', items: techStack.web3, gradient: 'from-purple-500/20 to-pink-500/20' },
        { title: 'Databases', items: techStack.databases, gradient: 'from-green-500/20 to-emerald-500/20' },
        { title: 'Tools', items: techStack.tools, gradient: 'from-red-500/20 to-rose-500/20' },
    ];

    return (
        <div ref={sectionRef} className="relative w-full bg-dark px-4 sm:px-8 py-24 sm:py-32" id="tech-stack">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px]" />
                <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[120px]" />
            </div>

            <div ref={skillsRef} className="relative z-10 max-w-7xl mx-auto">
                {/* Header */}
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

                {/* All Tech Items in Flowing Grid */}
                <div className="space-y-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
                    {skillCategories.map((category, categoryIndex) => (
                        <motion.div
                            key={category.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                            viewport={{ once: true }}
                        >
                            {/* Category Header */}
                            <div className="flex items-center gap-4 mb-8">
                                <h3 className="font-nohemi text-xl text-white/80">{category.title}</h3>
                                <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
                            </div>

                            {/* Tech Items */}
                            <div className="flex flex-wrap gap-4">
                                {category.items.map((tech) => (
                                    <motion.div
                                        key={tech.name}
                                        className="tech-item group relative"
                                        whileHover={{ scale: 1.05, y: -5 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                    >
                                        <div className={`relative flex items-center gap-3 px-3 py-2 rounded-sm backdrop-blur-sm border border-white/5 hover:border-primary/50 transition-all duration-300`}>
                                            
                                            {/* Icon */}
                                            <div className="relative w-6 h-6 flex-shrink-0">
                                                <img
                                                    src={tech.icon}
                                                    alt={tech.name}
                                                    className="w-full h-full object-contain filter group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] transition-all duration-300"
                                                    loading="lazy"
                                                />
                                            </div>

                                            {/* Name */}
                                            <span className="relative font-nohemi-thin text-sm text-white/80 group-hover:text-white transition-colors duration-300">
                                                {tech.name}
                                            </span>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom Decoration */}
                <motion.div 
                    className="mt-20 flex justify-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    viewport={{ once: true }}
                >
                    <div className="flex items-center gap-2 text-gray-500 font-nohemi-thin text-sm">
                        <span className="w-12 h-px bg-gradient-to-r from-transparent to-white/20" />
                        <span>& many more</span>
                        <span className="w-12 h-px bg-gradient-to-l from-transparent to-white/20" />
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default TechStack;
