import React, { useState, useEffect } from "react";
import logo from "/ghost2.png";
import { scroller } from 'react-scroll';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";
import { personalInfo } from "../../utils/data";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled]     = useState(false);
  const location  = useLocation();
  const navigate  = useNavigate();
  const isHomePage = location.pathname === '/';

  const navLinks = [
    { name: "Experience", to: "experience", type: "scroll" },
    { name: "About",      to: "about",      type: "scroll" },
    { name: "Projects",   to: "/projects",  type: "route"  },
    { name: "Contact",    to: "contact",    type: "scroll" },
  ];

  /* ── Scroll detection ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Body scroll lock ── */
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const props = ['overflow', 'touchAction', 'overscrollBehavior'];
    if (isMenuOpen) {
      props.forEach(p => { html.style[p] = p === 'overflow' ? 'hidden' : 'none'; body.style[p] = html.style[p]; });
    } else {
      props.forEach(p => { html.style[p] = ''; body.style[p] = ''; });
    }
    return () => props.forEach(p => { html.style[p] = ''; body.style[p] = ''; });
  }, [isMenuOpen]);

  /* ── Close on route change ── */
  useEffect(() => { setIsMenuOpen(false); }, [location.pathname]);

  const handleScrollLink = (to) => {
    if (isHomePage) {
      scroller.scrollTo(to, { smooth: true, duration: 800, offset: -80 });
    } else {
      navigate('/');
      setTimeout(() => scroller.scrollTo(to, { smooth: true, duration: 800, offset: -80 }), 100);
    }
    setIsMenuOpen(false);
  };

  const handleMobileLink = (link) => {
    if (link.type === "route") { navigate(link.to); setIsMenuOpen(false); }
    else handleScrollLink(link.to);
  };

  /* ── Neumorphic pill classes ── */
  const pillClass = scrolled
    ? 'bg-[#111111]/80 border-white/[0.1] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_12px_40px_rgba(0,0,0,0.55)]'
    : 'bg-[#0d0d0d]/55 border-white/[0.06] shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_4px_20px_rgba(0,0,0,0.28)]';

  return (
    <>
      {/* ════════════════ Floating Pill ════════════════ */}
      <motion.div
        className="fixed top-0 inset-x-0 z-40 flex justify-center px-4 pt-4 pointer-events-none"
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      >
        <nav
          className={`pointer-events-auto flex items-center h-11 px-2 rounded-full border backdrop-blur-2xl transition-all duration-500 ${pillClass}`}
        >

          {/* ── Left links (desktop) ── */}
          <div className="hidden md:flex items-center">
            <NavBtn onClick={() => handleScrollLink('experience')}>Experience</NavBtn>
            <NavBtn onClick={() => handleScrollLink('about')}>About</NavBtn>
          </div>

          {/* ── Logo ── */}
          <RouterLink
            to="/"
            className="mx-1 shrink-0 rounded-full p-1.5 hover:bg-white/6 transition-colors duration-200"
          >
            <img
              src={logo}
              alt="logo"
              loading="lazy"
              className="h-6.5 w-6.5 rounded-full object-contain"
            />
          </RouterLink>

          {/* ── Right links (desktop) ── */}
          <div className="hidden md:flex items-center">
            <RouterLink
              to="/projects"
              className="px-3 py-1.5 rounded-full font-nohemi-thin text-[13px] text-white/50
                hover:text-white hover:bg-white/5 transition-all duration-200"
            >
              Projects
            </RouterLink>
            <button
              onClick={() => handleScrollLink('contact')}
              className="ml-1 px-3.5 py-1.5 rounded-full font-nohemi-thin text-[13px] text-white/75
                bg-white/7 hover:bg-white/11
                border border-white/9 hover:border-white/15
                shadow-[inset_0_1px_0_rgba(255,255,255,0.07)]
                transition-all duration-200 cursor-pointer"
            >
              Contact
            </button>
          </div>

          {/* ── Mobile hamburger ── */}
          <button
            onClick={() => setIsMenuOpen(o => !o)}
            className="md:hidden flex flex-col items-center justify-center w-9 h-9 gap-1.5 ml-1 rounded-full
              hover:bg-white/4 focus:outline-none transition-colors duration-200"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            <motion.span
              animate={isMenuOpen ? { rotate: 45, y: 3.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="block h-px w-5 bg-white/70 rounded-full"
            />
            <motion.span
              animate={isMenuOpen ? { rotate: -45, y: -3.5, width: 20 } : { rotate: 0, y: 0, width: 14 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="block h-px bg-white/70 rounded-full"
            />
          </button>

        </nav>
      </motion.div>

      {/* ════════════════ Mobile Full-screen Overlay ════════════════ */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            key="mobile-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.2, delay: 0.08 } }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[9999] md:hidden flex flex-col"
            style={{ backgroundColor: '#0C0C0C' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 pt-5">
              <RouterLink to="/" onClick={() => setIsMenuOpen(false)}>
                <img
                  src={logo}
                  alt="logo"
                  loading="lazy"
                  className="h-9 w-9 rounded-full object-contain"
                />
              </RouterLink>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full
                  bg-white/5 border border-white/7
                  focus:outline-none transition-colors duration-200 hover:bg-white/9"
                aria-label="Close menu"
              >
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                  <path d="M1 1l9 9M10 1L1 10" stroke="rgba(255,255,255,0.6)" strokeWidth="1.4" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            {/* Nav links */}
            <div className="flex-1 flex flex-col justify-center px-7">
              <nav className="space-y-0.5">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6, transition: { duration: 0.12 } }}
                    transition={{ delay: 0.04 + i * 0.055, duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <button
                      onClick={() => handleMobileLink(link)}
                      className="group flex items-baseline gap-4 w-full text-left py-3.5"
                    >
                      <span className="font-nohemi-thin text-[10px] text-white/20 tracking-widest tabular-nums select-none">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-nohemi text-[clamp(1.9rem,7.5vw,3rem)] text-white/70 leading-none tracking-tight
                        group-hover:text-white transition-colors duration-150">
                        {link.name}
                      </span>
                    </button>
                    {i < navLinks.length - 1 && (
                      <div className="h-px w-full bg-white/4 ml-9" />
                    )}
                  </motion.div>
                ))}
              </nav>
            </div>

            {/* Footer */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, transition: { duration: 0.1 } }}
              transition={{ delay: 0.3, duration: 0.35, ease: 'easeOut' }}
              className="px-7 pb-10 pt-5 border-t border-white/5"
            >
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="font-nohemi-thin text-[9px] text-white/25 uppercase tracking-[0.2em] mb-1.5">
                    Get in touch
                  </p>
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="font-nohemi-thin text-[13px] text-white/35 hover:text-white/65 transition-colors duration-200"
                  >
                    {personalInfo.email}
                  </a>
                </div>
                <div className="flex items-center gap-4">
                  {[
                    { label: 'GH', href: personalInfo.github },
                    { label: 'LI', href: personalInfo.linkedin },
                    { label: 'X',  href: personalInfo.twitter },
                  ].filter(s => s.href).map(s => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-nohemi-thin text-[11px] text-white/30 hover:text-white/60 transition-colors duration-200"
                    >
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

/* ─── Reusable nav button (scroll targets) ─── */
const NavBtn = ({ children, onClick }) => (
  <button
    onClick={onClick}
    className="px-3 py-1.5 rounded-full font-nohemi-thin text-[13px] text-white/50
      hover:text-white hover:bg-white/5 transition-all duration-200 cursor-pointer"
  >
    {children}
  </button>
);

export default Navbar;
