import React, { useState } from "react";
import logo from "../../assets/logo.png";
import { Link as ScrollLink, scroller } from 'react-scroll';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

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
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';

  const navLinks = [
    { name: "Home", to: "", type: "scroll" },
    { name: "About", to: "about", type: "scroll" },
    { name: "Projects", to: "/projects", type: "route" },
    { name: "Contact", to: "contact", type: "scroll" },
  ];

  const handleScrollLink = (to) => {
    if (isHomePage) {
      scroller.scrollTo(to, {
        smooth: true,
        duration: 1000,
        offset: 0,
      });
    } else {
      navigate('/');
      setTimeout(() => {
        scroller.scrollTo(to, {
          smooth: true,
          duration: 1000,
          offset: 0,
        });
      }, 100);
    }
    setIsMenuOpen(false);
  };

  return (
    <motion.nav
    variants={navVariants}
      initial="hidden"
      animate="visible"
      className="bg-dark-blur absolute top-0 right-0 left-0 z-40 flex max-h-20 w-full items-center justify-between mx-auto py-6 backdrop-blur-sm px-3 md:px-0"
    >
      
      <div className="flex w-full max-w-7xl mx-auto items-center justify-between">
        {/* Left Links */}
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

      {/* Logo Center */}
      <motion.div
        variants={logoVariants}
        initial="hidden"
        animate="visible"
        className="flex max-h-12 flex-1 items-center justify-start md:justify-center"
      >
        <RouterLink to="/">
          <img
            src={logo}
            alt="Elanine Creatives"
            loading="lazy"
            className="aspect-square rounded-full max-h-12 object-contain"
          />
        </RouterLink>
      </motion.div>

      {/* Right Links */}
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

      {/* Mobile menu toggle */}
      <div className="md:hidden">
        <motion.button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-white focus:outline-none"
          whileTap={{ scale: 0.9 }}
        >
          {isMenuOpen ? "Close" : "Menu"}
        </motion.button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="absolute top-full right-0 left-0 bg-black p-4 md:hidden"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={mobileMenuVariants}
          >
            <div className="flex flex-col space-y-4">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  custom={i}
                  variants={linkVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {link.type === "route" ? (
                    <RouterLink
                      to={link.to}
                      onClick={() => setIsMenuOpen(false)}
                      className="group hover:text-opacity-80 font-nohemi-thin group flex items-center text-sm tracking-wider text-white transition-colors cursor-pointer"
                    >
                      {link.name}
                      <motion.div 
                        className="absolute -bottom-1 left-0 h-0.5 w-0 bg-primary group-hover:w-full transition-all duration-300"
                        whileHover={{ width: "100%" }}
                      />
                    </RouterLink>
                  ) : (
                    <span
                      onClick={() => handleScrollLink(link.to)}
                      className="group hover:text-opacity-80 font-nohemi-thin group flex items-center text-sm tracking-wider text-white transition-colors cursor-pointer"
                    >
                      {link.name}
                      <motion.div 
                        className="absolute -bottom-1 left-0 h-0.5 w-0 bg-primary group-hover:w-full transition-all duration-300"
                        whileHover={{ width: "100%" }}
                      />
                      {link.name === "Contact" && (
                        <svg
                          className="ml-1 h-4 w-4 -rotate-45 transform transition-transform duration-300 group-hover:rotate-0"
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
                        </svg>
                      )}
                    </span>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;