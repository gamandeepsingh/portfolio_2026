import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { FiCode, FiLayers, FiZap, FiAward } from "react-icons/fi";
import { GiDiamonds } from "react-icons/gi";
import AlphabetO from "../../lib/AlpabetO";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const containerRef = useRef(null);
  const textRefs = useRef([]);
  const statsRef = useRef(null);
  const [textSize, setTextSize] = useState(window.innerWidth < 640 ? '5xl' : '9xl');

  const stats = [
    // Stat items
  ];

  const highlights = [
    "Currently building Web3 GPU.Net",
    "Tech lead at INNOGEEKS technical community",
    "Shipped 5+ Freelance Projects",
    "Winner of HackSphere Hackathon & SIH Finalist",
  ];

  useEffect(() => {
    const handleResize = () => {
      setTextSize(window.innerWidth < 640 ? '5xl' : '9xl');
    };
    
    window.addEventListener('resize', handleResize);

    const ctx = gsap.context(() => {
      // Animate the main text lines
      gsap.from(textRefs.current, {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // Animate stats
      gsap.from(statsRef.current?.children || [], {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      // Animate diamonds
      const diamonds = gsap.utils.toArray(".bg-diamond");
      diamonds.forEach((diamond, i) => {
        gsap.to(diamond, {
          rotation: 360,
          duration: 20 + i * 5,
          repeat: -1,
          ease: "none",
          opacity: 0.1 + i * 0.05
        });
      });
    }, containerRef);

    return () => {
      ctx.revert();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const addToRefs = (el) => {
    if (el && !textRefs.current.includes(el)) {
      textRefs.current.push(el);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-full bg-dark px-4 sm:px-8 py-24 sm:py-32"
      id="about"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        {/* Background Diamonds */}
        {[...Array(10)].map((_, i) => (
          <GiDiamonds
            key={i}
            className="bg-diamond absolute text-primary"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              fontSize: `${10 + Math.random() * 30}px`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 sm:mb-24"
        >
          <span className="text-gray-500 font-nohemi-thin text-sm tracking-widest uppercase mb-4 block">
            (About Me)
          </span>
        </motion.div>

        {/* Main Text */}
        <div className="mb-20 sm:mb-32">
          <h2 ref={addToRefs} className="font-nohemi text-3xl sm:text-5xl md:text-6xl lg:text-8xl text-white leading-tight">
            I BUILD
          </h2>
          <h2 ref={addToRefs} className="font-nohemi text-3xl sm:text-5xl md:text-6xl lg:text-8xl leading-tight flex items-center">
            <span className="text-primary mr-4">DIGITAL</span>
            <span className="text-white">PR</span>
            <AlphabetO textSize={textSize} />
            <span className="text-white">DUCTS</span>
          </h2>
          <h2 ref={addToRefs} className="font-nohemi text-3xl sm:text-5xl md:text-6xl lg:text-8xl text-white leading-tight ">
            THAT MAKE AN
          </h2>
          <h2 ref={addToRefs} className="font-nohemi text-3xl sm:text-5xl md:text-6xl lg:text-8xl text-primary leading-tight">
            IMPACT.
          </h2>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-20">
          {/* Left Column - Bio */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="font-nohemi-thin text-gray-400 text-lg leading-relaxed">
              I&apos;m a <span className="text-white">Full Stack Web3 Developer</span> based in Bengaluru, 
              currently pursuing my B.Tech in Computer Science at KIET Group of Institutions with a 
              <span className="text-white"> CGPA of 9/10</span>.
            </p>
            <p className="font-nohemi-thin text-gray-400 text-lg leading-relaxed">
              My expertise spans across <span className="text-white">React, Next.js, Node.js, and Web3 technologies</span>. 
              I&apos;m passionate about building scalable applications and contributing to open-source projects.
            </p>
            <p className="font-nohemi-thin text-gray-400 text-lg leading-relaxed">
              When I&apos;m not coding, I&apos;m either mentoring fellow developers, 
              or exploring the latest in blockchain technology.
            </p>
          </motion.div>

          {/* Right Column - Highlights */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="font-nohemi text-white text-xl mb-6">Current Highlights</h3>
            {highlights.map((highlight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start gap-4 group"
              >
                <span className="text-primary mt-1.5">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                    <rect width="12" height="12" rx="2" />
                  </svg>
                </span>
                <span className="font-nohemi-thin text-gray-400 group-hover:text-white transition-colors duration-300">
                  {highlight}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Stats Grid */}
        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              className="group relative p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 hover:bg-white/[0.04] "
              whileHover={{ y: -5 }}
            >
              <stat.icon className="text-primary mb-4 w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
              <div className="font-nohemi text-3xl sm:text-4xl text-white mb-2">
                {stat.number}
              </div>
              <div className="font-nohemi-thin text-gray-500 text-sm">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;