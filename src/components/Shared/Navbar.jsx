import React, { useState, useEffect } from "react";
import logo from "../../assets/logo.png";
import { scroller } from 'react-scroll';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";
import { personalInfo } from "../../utils/data";

/* ─── Desktop animation variants (unchanged) ─── */
const navVariants = {
  hidden: { y: -80, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 60, delay: 0.2 },
  },
};

const linkVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1 },
  }),
};

const logoVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { delay: 0.4, type: "spring", stiffness: 80 },
  },
};

/* ─── Mobile overlay variants ─── */
const overlayVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.25, ease: "easeIn", delay: 0.15 },
  },
};

const mobileLinkVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.08 + i * 0.07,
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
  exit: { opacity: 0, x: -10, transition: { duration: 0.15 } },
};

const mobileFooterVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.4, duration: 0.4, ease: "easeOut" },
  },
  exit: { opacity: 0, transition: { duration: 0.12 } },
};


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';

  const navLinks = [
    { name: "Experience", to: "experience", type: "scroll" },
    { name: "About", to: "about", type: "scroll" },
    { name: "Projects", to: "/projects", type: "route" },
    { name: "Contact", to: "contact", type: "scroll" },
  ];

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    if (isMenuOpen) {
      html.style.overflow = "hidden";
      body.style.overflow = "hidden";
      html.style.touchAction = "none";
      body.style.touchAction = "none";
      html.style.overscrollBehavior = "none";
      body.style.overscrollBehavior = "none";
    } else {
      html.style.overflow = "";
      body.style.overflow = "";
      html.style.touchAction = "";
      body.style.touchAction = "";
      html.style.overscrollBehavior = "";
      body.style.overscrollBehavior = "";
    }
    return () => {
      html.style.overflow = "";
      body.style.overflow = "";
      html.style.touchAction = "";
      body.style.touchAction = "";
      html.style.overscrollBehavior = "";
      body.style.overscrollBehavior = "";
    };
  }, [isMenuOpen]);

  /* Close menu on route change */
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const handleScrollLink = (to) => {
    if (isHomePage) {
      scroller.scrollTo(to, { smooth: true, duration: 1000, offset: 0 });
    } else {
      navigate('/');
      setTimeout(() => {
        scroller.scrollTo(to, { smooth: true, duration: 1000, offset: 0 });
      }, 100);
    }
    setIsMenuOpen(false);
  };

  const handleMobileLink = (link) => {
    if (link.type === "route") {
      navigate(link.to);
      setIsMenuOpen(false);
    } else {
      handleScrollLink(link.to);
    }
  };

  return (
    <>
      <motion.nav
        variants={navVariants}
        initial="hidden"
        animate="visible"
        className="bg-dark-blur absolute top-0 right-0 left-0 z-40 flex max-h-20 w-full items-center justify-between mx-auto py-6 backdrop-blur-sm px-3 md:px-0"
      >
        <div className="flex w-full max-w-7xl mx-auto items-center justify-between">
          {/* ═══════ Left Links (Desktop) ═══════ */}
          <div className="hidden flex-1 items-center justify-between md:flex">
            <motion.div
              variants={linkVariants}
              initial="hidden"
              animate="visible"
              className="flex items-center space-x-2"
            >
              <span
                onClick={() => handleScrollLink(navLinks[0].to)}
                className="group hover:text-opacity-80 font-nohemi-thin text-sm tracking-wider text-white transition-colors cursor-pointer"
              >
                {navLinks[0].name}
                <motion.div
                  className="absolute -bottom-1 left-0 h-0.5 w-0 bg-primary group-hover:w-full transition-all duration-300"
                  whileHover={{ width: "100%" }}
                />
              </span>
            </motion.div>
            <div className="text-opacity-50 text-white">/</div>
            <motion.div
              variants={linkVariants}
              initial="hidden"
              animate="visible"
              className="flex items-center space-x-2"
            >
              <span
                onClick={() => handleScrollLink(navLinks[1].to)}
                className="group hover:text-opacity-80 font-nohemi-thin text-sm tracking-wider text-white transition-colors cursor-pointer"
              >
                {navLinks[1].name}
                <motion.div
                  className="absolute -bottom-1 left-0 h-0.5 w-0 bg-primary group-hover:w-full transition-all duration-300"
                  whileHover={{ width: "100%" }}
                />
              </span>
            </motion.div>
          </div>

          {/* ═══════ Logo Center ═══════ */}
          <motion.div
            variants={logoVariants}
            initial="hidden"
            animate="visible"
            className="flex max-h-12 flex-1 items-center justify-start md:justify-center"
          >
            <RouterLink to="/">
              <img
                src={logo}
                alt="Gamandeep Singh"
                loading="lazy"
                className="aspect-square rounded-full max-h-12 object-contain"
              />
            </RouterLink>
          </motion.div>

          {/* ═══════ Right Links (Desktop) ═══════ */}
          <div className="hidden flex-1 items-center justify-between md:flex">
            <motion.div
              variants={linkVariants}
              initial="hidden"
              animate="visible"
              className="flex items-center space-x-2"
            >
              <RouterLink
                to={navLinks[2].to}
                className="group hover:text-opacity-80 font-nohemi-thin text-sm tracking-wider text-white transition-colors cursor-pointer"
              >
                {navLinks[2].name}
                <motion.div
                  className="absolute -bottom-1 left-0 h-0.5 w-0 bg-primary group-hover:w-full transition-all duration-300"
                  whileHover={{ width: "100%" }}
                />
              </RouterLink>
            </motion.div>
            <div className="text-opacity-50 text-white">/</div>
            <motion.div
              variants={linkVariants}
              initial="hidden"
              animate="visible"
              className="flex items-center space-x-2"
            >
              <span
                onClick={() => handleScrollLink(navLinks[3].to)}
                className="group flex hover:text-opacity-80 font-nohemi-thin text-sm tracking-wider text-white transition-colors cursor-pointer"
              >
                {navLinks[3].name}
                <motion.div
                  className="absolute -bottom-1 left-0 h-0.5 w-0 bg-primary group-hover:w-full transition-all duration-300"
                  whileHover={{ width: "100%" }}
                />
                <motion.svg
                  initial={{ rotate: -45 }}
                  animate={{ rotate: 0 }}
                  transition={{ duration: 0.3 }}
                  className="ml-1 h-4 w-4 transform transition-transform group-hover:rotate-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </motion.svg>
              </span>
            </motion.div>
          </div>

          {/* ═══════ Mobile Hamburger Button ═══════ */}
          <button
            onClick={() => setIsMenuOpen((o) => !o)}
            className="relative z-[99999] flex md:hidden flex-col items-end justify-center w-10 h-10 gap-1.75 focus:outline-none"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            <motion.span
              animate={isMenuOpen ? { rotate: 45, y: 4.5, width: 24 } : { rotate: 0, y: 0, width: 24 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="block h-[1.5px] bg-white rounded-full origin-center"
            />
            <motion.span
              animate={isMenuOpen ? { rotate: -45, y: -4.5, width: 24 } : { rotate: 0, y: 0, width: 16 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="block h-[1.5px] bg-white rounded-full origin-center"
            />
          </button>
        </div>
      </motion.nav>

      {/* ═══════ Mobile Full-screen Overlay (moved OUTSIDE nav) ═══════ */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            key="mobile-overlay"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-[9999] md:hidden flex flex-col"
            style={{ backgroundColor: '#0C0C0C' }}
          >
            {/* ── Close Button ── */}
  <div className="flex items-center justify-between px-2.5 sm:px-6 pt-4">
    <RouterLink to="/" onClick={() => setIsMenuOpen(false)}>
      <img
        src={logo}
        alt="Gamandeep Singh"
        loading="lazy"
        className="aspect-square rounded-full max-h-12 object-contain"
      />
    </RouterLink>
    <button
      onClick={() => setIsMenuOpen(false)}
      className="flex flex-col items-center justify-center w-10 h-10 focus:outline-none"
      aria-label="Close menu"
    >
      <motion.span
        initial={{ rotate: 0 }}
        animate={{ rotate: 45, y: 1 }}
        className="block h-[1.5px] w-6 bg-white rounded-full origin-center"
      />
      <motion.span
        initial={{ rotate: 0 }}
        animate={{ rotate: -45, y: -1 }}
        className="block h-[1.5px] w-6 bg-white rounded-full origin-center"
      />
    </button>
  </div>
            {/* Nav links — vertically centered */}
            <div className="flex-1 flex flex-col justify-center px-8 sm:px-12">
              <nav className="space-y-2">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    custom={i}
                    variants={mobileLinkVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <button
                      onClick={() => handleMobileLink(link)}
                      className="group flex items-baseline gap-4 w-full text-left py-3"
                    >
                      <span className="font-nohemi-thin text-[11px] text-gray-600 tracking-wider tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-nohemi text-[clamp(2rem,7vw,3.2rem)] text-white leading-none tracking-tight group-active:text-primary transition-colors duration-200">
                        {link.name}
                      </span>
                      {link.type === "route" && (
                        <svg
                          className="w-5 h-5 text-gray-600 group-active:text-primary transition-colors -translate-y-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 17L17 7M17 7H7M17 7v10" />
                        </svg>
                      )}
                    </button>
                    {i < navLinks.length - 1 && (
                      <div className="h-px w-full bg-white/5 ml-10" />
                    )}
                  </motion.div>
                ))}
              </nav>
            </div>

            {/* Footer — email + socials */}
            <motion.div
              variants={mobileFooterVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="px-8 sm:px-12 pb-10 pt-4 border-t border-white/5"
            >
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="font-nohemi-thin text-[10px] text-gray-600 uppercase tracking-[0.2em] mb-2">
                    Get in touch
                  </p>
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="font-nohemi-thin text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {personalInfo.email}
                  </a>
                </div>
                <div className="flex items-center gap-4">
                  {personalInfo.github && (
                    <a
                      href={personalInfo.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-white transition-colors text-[13px] font-nohemi-thin"
                    >
                      GH
                    </a>
                  )}
                  {personalInfo.linkedin && (
                    <a
                      href={personalInfo.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-white transition-colors text-[13px] font-nohemi-thin"
                    >
                      LI
                    </a>
                  )}
                  {personalInfo.twitter && (
                    <a
                      href={personalInfo.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-white transition-colors text-[13px] font-nohemi-thin"
                    >
                      X
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;