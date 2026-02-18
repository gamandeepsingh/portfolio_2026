import React from "react";
import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiTwitter, FiMail, FiArrowUp } from "react-icons/fi";
import { Link as ScrollLink } from "react-scroll";
import { personalInfo } from "../../utils/data";
import { BiHeart } from "react-icons/bi";
import ghostImage from "../../assets/ghost.png";

const Footer = () => {

  const socialLinks = [
    { icon: FiGithub, href: personalInfo.github, label: "GitHub" },
    { icon: FiLinkedin, href: personalInfo.linkedin, label: "LinkedIn" },
    { icon: FiTwitter, href: personalInfo.twitter, label: "Twitter" },
    { icon: FiMail, href: `mailto:${personalInfo.email}`, label: "Email" },
  ];

  const navLinks = [
    { name: "Home", to: "hero" },
    { name: "About", to: "about" },
    { name: "Projects", to: "projects" },
    { name: "Experience", to: "services" },
    { name: "Contact", to: "contact" },
  ];

  return (
    <footer className="relative w-full border-t border-white/5 bg-dark px-4 sm:px-8 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto">
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-16">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="font-nohemi text-2xl text-white">Gamandeep Singh</h3>
            <p className="font-nohemi-thin text-gray-500 text-sm max-w-xs">
              Full Stack Developer crafting digital experiences.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-wrap gap-6 sm:gap-8">
            {navLinks.map((link) => (
              <ScrollLink
                key={link.name}
                to={link.to}
                smooth={true}
                duration={1000}
                offset={-80}
                className="font-nohemi-thin text-gray-400 text-sm hover:text-white transition-colors cursor-pointer"
              >
                {link.name}
              </ScrollLink>
            ))}
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <social.icon size={18} />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Large Name Display */}
        <div className="w-full mb-12 overflow-hidden flex justify-center">
          <motion.div
            className="font-nohemi text-[15vw] sm:text-[12vw] lg:text-[10vw] text-white/5 leading-none select-none"
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            TECHIE GHOST
          </motion.div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 pt-8 border-t border-white/5">
          <p className="">
          </p>

          {/* Back to Top */}
          <ScrollLink to="hero" smooth={true} duration={1000} offset={-80}>
            <motion.button
              className="flex items-center gap-2 text-gray-500 hover:text-white font-nohemi-thin text-sm transition-colors"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Back to top
              <FiArrowUp size={14} />
            </motion.button>
          </ScrollLink>
        </div>
      </div>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 hidden sm:block">
        <img src={ghostImage} className="w-48 md:w-64 pointer-events-none" alt="" />
      </div>
    </footer>
  );
};

export default Footer;
