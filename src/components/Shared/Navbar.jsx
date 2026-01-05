import React, { useState } from "react";
import { Link as ScrollLink } from 'react-scroll';
import { Link } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { FiGithub, FiLinkedin, FiTwitter } from "react-icons/fi";

const navVariants = {
  hidden: { y: -80, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { 
      type: "spring", 
      stiffness: 60, 
      delay: 0.2 
    }
  }
};

const linkVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1 },
  }),
};

const mobileMenuVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 30 },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.2 },
  },
};

const logoVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: { 
      delay: 0.4, 
      type: "spring", 
      stiffness: 80 
    }
  }
};


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", to: "hero" },
    { name: "About", to: "about" },
    { name: "Work", to: "projects" },
    { name: "Contact", to: "contact" },
  ];

  const socialLinks = [
    { icon: FiGithub, href: "https://github.com/gamandeepsingh", label: "GitHub" },
    { icon: FiLinkedin, href: "https://www.linkedin.com/in/gamandeep-singh-344001256/", label: "LinkedIn" },
    { icon: FiTwitter, href: "https://x.com/gamandeepsingh4", label: "Twitter" },
  ];

  return (
    <motion.nav
    variants={navVariants}
      initial="hidden"
      animate="visible"
      className="bg-dark/80 fixed top-0 right-0 left-0 z-50 flex max-h-20 w-screen items-center justify-between mx-auto py-4 backdrop-blur-md px-4 md:px-8 border-b border-white/5"
    >
      
      <div className="flex w-full max-w-7xl mx-auto items-center justify-between">
        {/* Logo/Name */}
        <motion.div
          variants={logoVariants}
          initial="hidden"
          animate="visible"
          className="flex items-center"
        >
          <Link to="/" className="group flex items-center gap-2">
            <div className="relative">
              <span className="font-nohemi text-xl font-bold text-white tracking-tight">
                GHOST
              </span>
              <motion.div 
                className="absolute -bottom-1 left-0 h-0.5 w-0 bg-primary group-hover:w-full transition-all duration-300"
                whileHover={{ width: "100%" }}
              />
            </div>
          </Link>
        </motion.div>

        {/* Center Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, i) => (
            <motion.div
              key={link.name}
              variants={linkVariants}
              custom={i}
              initial="hidden"
              animate="visible"
            >
              <ScrollLink
                to={link.to}
                smooth={true}
                duration={1000}
                offset={-80}
                className="relative font-nohemi-thin text-sm tracking-wider text-gray-300 hover:text-white transition-colors cursor-pointer group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
              </ScrollLink>
            </motion.div>
          ))}
        </div>

        {/* Social Links & Resume */}
        <div className="hidden md:flex items-center gap-4">
          {socialLinks.map((social) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <social.icon size={18} />
            </motion.a>
          ))}
          <motion.a
            href="mailto:gamandeepsingh6@gmail.com"
            className="ml-4 px-4 py-2 text-sm font-nohemi-thin bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-full text-white transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Let&apos;s Talk
          </motion.a>
        </div>

      {/* Mobile menu toggle */}
      <div className="md:hidden">
        <motion.button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-white focus:outline-none font-nohemi-thin text-sm"
          whileTap={{ scale: 0.9 }}
        >
          {isMenuOpen ? "Close" : "Menu"}
        </motion.button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed top-20 right-0 left-0 bg-dark/95 backdrop-blur-lg p-6 md:hidden border-b border-white/5"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={mobileMenuVariants}
          >
            <div className="flex flex-col space-y-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  custom={i}
                  variants={linkVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <ScrollLink
                    to={link.to}
                    smooth={true}
                    duration={1000}
                    offset={-80}
                    onClick={() => setIsMenuOpen(false)}
                    className="font-nohemi-thin text-lg tracking-wider text-gray-300 hover:text-white transition-colors cursor-pointer"
                  >
                    {link.name}
                  </ScrollLink>
                </motion.div>
              ))}
              
              {/* Mobile Social Links */}
              <div className="flex items-center gap-6 pt-4 border-t border-white/10">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <social.icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;