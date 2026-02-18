import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiMail, FiMapPin, FiPhone, FiGithub, FiLinkedin, FiTwitter, FiArrowUpRight } from "react-icons/fi";
import { personalInfo } from "../../utils/data";
import { motion } from 'framer-motion';
import AlphabetO from "../../lib/AlpabetO";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const containerRef = useRef(null);
  const textRefs = useRef([]);
  const [textSize, setTextSize] = useState(window.innerWidth < 640 ? '5xl' : '9xl');

  const socialLinks = [
    { icon: FiGithub, href: personalInfo.github, label: "GitHub" },
    { icon: FiLinkedin, href: personalInfo.linkedin, label: "LinkedIn" },
    { icon: FiTwitter, href: personalInfo.twitter, label: "Twitter" },
  ];

  const contactInfo = [
    { icon: FiMail, label: "Email", value: personalInfo.email, href: `mailto:${personalInfo.email}` },
    { icon: FiMapPin, label: "Location", value: personalInfo.location, href: null },
  ];

  useEffect(() => {
    const handleResize = () => {
      setTextSize(window.innerWidth < 640 ? '5xl' : '9xl');
    };
    
    window.addEventListener('resize', handleResize);
    const ctx = gsap.context(() => {
      gsap.from(textRefs.current, {
        y: 80,
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
      id="contact"
      className="relative min-h-screen w-full bg-dark px-4 sm:px-8 py-24 sm:py-32"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px]" />
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[120px]" />
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
            (Get in Touch)
          </span>
        </motion.div>

        {/* Main CTA Text */}
        <div className="mb-20 sm:mb-32">
          <h2 ref={addToRefs} className="font-nohemi text-3xl sm:text-5xl md:text-6xl lg:text-8xl text-white leading-tight">
            Let&apos;s Build
          </h2>
          <h2 ref={addToRefs} className="font-nohemi text-3xl sm:text-5xl md:text-6xl lg:text-8xl leading-tight flex items-center">
            <span className="text-primary">S</span>
            <AlphabetO textSize={textSize} />
            <span className="text-primary">mething</span>
          </h2>
          <h2 ref={addToRefs} className="font-nohemi text-3xl sm:text-5xl md:text-6xl lg:text-8xl text-white leading-tight ">
            Amazing
          </h2>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left Column - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <p className="font-nohemi-thin text-gray-400 text-lg leading-relaxed max-w-lg">
              I&apos;m always excited to collaborate on interesting projects. 
              Whether you have a project in mind or just want to say hi, feel free to reach out!
            </p>

            {/* Contact Details */}
            <div className="space-y-4">
              {contactInfo.map((item) => (
                <motion.div
                  key={item.label}
                  className="group flex items-center gap-4"
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                    <item.icon className="text-primary w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-gray-500 text-sm font-nohemi-thin block">{item.label}</span>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-white font-nohemi-thin text-lg hover:text-primary transition-colors"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span className="text-white font-nohemi-thin text-lg">{item.value}</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <div className="pt-8 border-t border-white/10">
              <span className="text-gray-500 text-sm font-nohemi-thin block mb-4">Follow me</span>
              <div className="flex items-center gap-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                    whileHover={{ y: -4, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <social.icon size={20} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column - CTA Button */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center"
          >
            <motion.a
              href={`mailto:${personalInfo.email}`}
              className="group relative p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/10 hover:border-white/20 transition-all duration-500 overflow-hidden"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-gray-400 font-nohemi-thin text-sm">Start a conversation</span>
                  <FiArrowUpRight className="text-white w-6 h-6 group-hover:rotate-45 transition-transform duration-300" />
                </div>
                
                <h3 className="font-nohemi text-3xl sm:text-4xl text-white mb-4">
                  Say Hello! to meee 👋
                </h3>
              </div>
            </motion.a>

            {/* Additional Links */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                to="projects"
                className="flex-1 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 hover:bg-white/[0.04] transition-all text-center group"
                whileHover={{ y: -2 }}
              >
                <span className="text-gray-400 font-nohemi-thin text-sm group-hover:text-white transition-colors flex items-center justify-center gap-2">
                  View my Projects <FiArrowUpRight className="text-gray-400 w-6 h-6 group-hover:text-white group-hover:rotate-45 transition-transform duration-300" />
                </span>
              </Link>
              
              <motion.a
                href="https://drive.google.com/file/d/1dfMjLGdrJGh04ZXEi7lFTFm_CnAKXhJn/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 hover:bg-white/[0.04] transition-all text-center group"
                whileHover={{ y: -2 }}
              >
                <span className="text-gray-400 font-nohemi-thin text-sm group-hover:text-white transition-colors flex items-center justify-center gap-2">
                  Wanna see my Resume <FiArrowUpRight className="text-gray-400 w-6 h-6 group-hover:text-white group-hover:rotate-45 transition-transform duration-300" />
                </span>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
