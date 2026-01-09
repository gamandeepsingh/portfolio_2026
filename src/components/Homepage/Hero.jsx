import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import AnimatedBG from "../Shared/AnimatedBg";
import { FiArrowDown, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { Link as ScrollLink } from "react-scroll";

const Hero = () => {
  const rippleRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const socialLinks = [
    { icon: FiGithub, href: "https://github.com/gamandeepsingh", label: "GitHub" },
    { icon: FiLinkedin, href: "https://www.linkedin.com/in/gamandeep-singh-344001256/", label: "LinkedIn" },
    { icon: FiMail, href: "mailto:gamandeepsingh6@gmail.com", label: "Email" },
  ];

  return (
    <div
      ref={rippleRef}
      id="hero"
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden pt-20"
    >
      <AnimatedBG />
      
      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-dark/80 pointer-events-none z-10" />
      
      {/* Main Content */}
      <motion.div
        className="relative z-20 flex flex-col items-center justify-center text-center px-4 max-w-5xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{
          transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`,
        }}
      >

        {/* Main Heading */}
        <motion.div variants={itemVariants} className="mb-4">
          <span className="font-nohemi-thin tex-base sm:text-lg text-gray-400 tracking-wide">
            Hi, I&apos;m
          </span>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="font-nohemi text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-white mb-4 tracking-tight"
        >
          Gamandeep
        </motion.h1>

        <motion.h2
          variants={itemVariants}
          className="font-nohemi text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-8"
        >
          Singh
        </motion.h2>

        {/* Role Tags */}
        <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-3 mb-8">
          {["Full Stack Developer", "Open Source"].map((tag) => (
            <span
              key={tag}
              className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300 font-nohemi-thin hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-default"
            >
              {tag}
            </span>
          ))}
        </motion.div>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="font-nohemi-thin text-base sm:text-lg text-gray-400 max-w-2xl mb-10 leading-relaxed"
        >
          Building scalable applications with modern technologies. Currently crafting 
          <span className="text-white"> Web3 solutions</span> at 
          <a
            href="https://gpu.net/about"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white underline hover:text-gray-300 transition-colors duration-300 mx-1"
          >
            GPU.NET
          </a>
          .
        </motion.p>

        {/* CTA Buttons */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-4 mb-12">
          <ScrollLink to="projects" smooth={true} duration={1000} offset={-80}>
            <motion.button
              className="group px-8 py-4 bg-white text-dark font-nohemi text-sm rounded-full flex items-center gap-2 hover:bg-gray-100 transition-all duration-300"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              View My Work
              <FiArrowDown className="group-hover:translate-y-1 transition-transform" />
            </motion.button>
          </ScrollLink>
          
          <motion.a
            href="mailto:gamandeepsingh6@gmail.com"
            className="px-8 py-4 bg-transparent text-white font-nohemi text-sm rounded-full border border-white/20 hover:bg-white/5 hover:border-white/30 transition-all duration-300"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            Get in Touch
          </motion.a>
        </motion.div>

        {/* Social Links */}
        <motion.div variants={itemVariants} className="flex items-center gap-6">
          {socialLinks.map((social) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors duration-300"
              whileHover={{ scale: 1.2, y: -4 }}
              whileTap={{ scale: 0.9 }}
            >
              <social.icon size={22} />
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;
