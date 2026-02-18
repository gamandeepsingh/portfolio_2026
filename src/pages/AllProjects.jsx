import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiArrowUpRight, FiGithub, FiExternalLink } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

/* ─────────────── Floating Cursor ─────────────── */
const FloatingCursor = ({ visible, x, y, label }) => {
  const ref = useRef(null);
  const pos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    pos.current = { x, y };
  }, [x, y]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf;
    const lerp = () => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      gsap.set(el, {
        x: `+=${(pos.current.x - cx) * 0.15}`,
        y: `+=${(pos.current.y - cy) * 0.15}`,
      });
      raf = requestAnimationFrame(lerp);
    };
    raf = requestAnimationFrame(lerp);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed top-0 left-0 z-50"
      style={{ willChange: 'transform' }}
    >
      <div
        className={`flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 shadow-[0_0_24px_rgba(37,85,220,0.3)] transition-all duration-400 ease-out ${
          visible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
        }`}
      >
        <span className="font-nohemi text-[11px] tracking-wide text-white whitespace-nowrap select-none">
          {label}
        </span>
        <FiArrowUpRight className="w-3 h-3 text-white/70" />
      </div>
    </div>
  );
};

/* ─────────────── Project Card ─────────────── */
const ProjectCard = ({ project, index, onEnter, onLeave, onMove }) => {
  const handleMouseMove = useCallback(
    (e) => onMove(e.clientX, e.clientY),
    [onMove],
  );

  return (
    <div
      className="ap-card group relative"
      onMouseEnter={() => onEnter(project.title)}
      onMouseLeave={onLeave}
      onMouseMove={handleMouseMove}
      style={{ cursor: 'none' }}
    >
      <Link to={`/project/${project.slug?.current}`} className="block h-full">
        <div className="relative h-full overflow-hidden rounded-2xl bg-white/2 border border-white/5 hover:border-primary/20 transition-all duration-500 hover:shadow-[0_8px_40px_rgba(37,85,220,0.06)]">
          {/* ── Image ── */}
          <div className="relative aspect-16/10 overflow-hidden bg-white/2">
            <img
              src={project.image}
              alt={project.title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-linear-to-t from-dark via-dark/25 to-transparent" />

            {/* Top bar */}
            <div className="absolute top-0 inset-x-0 flex items-center justify-between px-4 pt-3.5">
              <div className="flex items-center gap-1.5">
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    project.status === 'In Progress'
                      ? 'bg-yellow-400'
                      : project.status === 'Completed'
                      ? 'bg-emerald-400'
                      : 'bg-primary-light'
                  }`}
                />
                <span className="font-nohemi-thin text-[10px] text-white/40 uppercase tracking-[0.15em]">
                  {project.status}
                </span>
              </div>
              <span className="font-nohemi-thin text-[10px] text-white/20 uppercase tracking-wider">
                {project.category}
              </span>
            </div>

            {/* Index */}
            <span className="absolute bottom-3 left-4 font-nohemi text-[11px] text-white/10 tracking-wider select-none pointer-events-none">
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>

          {/* ── Content ── */}
          <div className="p-4 sm:p-5">
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="min-w-0 flex-1">
                <h3 className="font-nohemi text-[15px] sm:text-base text-white group-hover:text-primary transition-colors duration-300 leading-snug line-clamp-1">
                  {project.title}
                </h3>
                <p className="font-nohemi-thin text-gray-600 text-[11px] mt-0.5">
                  {project.subtitle}
                </p>
              </div>

              {/* Icons — reveal on hover */}
              <div className="flex items-center gap-1 shrink-0 opacity-0 translate-y-1.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-75">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="w-7 h-7 rounded-md bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-500 hover:text-white transition-all duration-200"
                    style={{ cursor: 'pointer' }}
                  >
                    <FiGithub size={12} />
                  </a>
                )}
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="w-7 h-7 rounded-md bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-500 hover:text-white transition-all duration-200"
                    style={{ cursor: 'pointer' }}
                  >
                    <FiExternalLink size={12} />
                  </a>
                )}
              </div>
            </div>

            <p className="font-nohemi-thin text-gray-500/80 text-[12px] leading-relaxed mb-3 line-clamp-2">
              {project.description}
            </p>

            <div className="h-px w-full bg-white/4 mb-3" />

            <div className="flex flex-wrap gap-1.5">
              {project.technologies?.slice(0, 3).map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 rounded bg-white/3 text-[10px] text-gray-500 font-nohemi-thin tracking-wide"
                >
                  {tech}
                </span>
              ))}
              {project.technologies?.length > 3 && (
                <span className="px-2 py-0.5 rounded bg-white/3 text-[10px] text-gray-600 font-nohemi-thin">
                  +{project.technologies.length - 3}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

/* ─────────────── Main Page ─────────────── */
const AllProjects = () => {
  const { items: projectData, status } = useSelector((state) => state.projects);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredProjects, setFilteredProjects] = useState([]);
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'web3', label: 'Web3' },
    { id: 'web', label: 'Web Apps' },
    { id: 'tool', label: 'Tools' },
    { id: 'ui', label: 'UI/UX' },
    { id: 'ai', label: 'AI/ML' },
  ];

  /* Floating cursor */
  const [cursor, setCursor] = useState({
    visible: false,
    x: 0,
    y: 0,
    label: 'View Project',
  });

  const handleEnter = useCallback((title) => {
    const short = title.length > 20 ? title.slice(0, 18) + '…' : title;
    setCursor((c) => ({ ...c, visible: true, label: `View — ${short}` }));
  }, []);
  const handleLeave = useCallback(() => {
    setCursor((c) => ({ ...c, visible: false }));
  }, []);
  const handleMove = useCallback((x, y) => {
    setCursor((c) => ({ ...c, x, y }));
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (projectData) {
      if (selectedCategory === 'all') {
        setFilteredProjects(projectData);
      } else {
        setFilteredProjects(projectData.filter((p) => p.category === selectedCategory));
      }
    }
  }, [selectedCategory, projectData]);

  /* GSAP reveal */
  useEffect(() => {
    if (!filteredProjects.length) return;

    const ctx = gsap.context(() => {
      gsap.from('.ap-card', {
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [filteredProjects]);

  /* Loading */
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark">
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4 animate-spin" />
          <p className="text-gray-500 font-nohemi-thin text-sm">Loading projects…</p>
        </div>
      </div>
    );
  }

  return (
    <div ref={sectionRef} className="min-h-screen bg-dark pt-24 sm:pt-32 pb-20">
      {/* Floating cursor */}
      <FloatingCursor visible={cursor.visible} x={cursor.x} y={cursor.y} label={cursor.label} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
        {/* ── Header ── */}
        <div className="mb-10 sm:mb-14">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-gray-500 hover:text-white font-nohemi-thin text-[13px] mb-8 transition-colors duration-300 group/back"
          >
            <span className="group-hover/back:-translate-x-0.5 transition-transform duration-300">←</span>
            Back to Home
          </Link>
          <h1 className="font-nohemi text-4xl sm:text-5xl md:text-6xl text-white mb-3 leading-tight">
            All <span className="text-primary">Projects</span>
          </h1>
          <p className="font-nohemi-thin text-gray-500 text-sm sm:text-base max-w-xl leading-relaxed">
            {projectData?.length || 0} projects spanning Web3, full-stack applications, and developer tools.
          </p>
        </div>

        {/* ── Filters ── */}
        <div className="mb-10 sm:mb-12">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const count =
                cat.id === 'all'
                  ? projectData?.length || 0
                  : projectData?.filter((p) => p.category === cat.id).length || 0;

              if (cat.id !== 'all' && count === 0) return null;

              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-1.5 rounded-full font-nohemi-thin text-[12px] tracking-wide transition-all duration-300 ${
                    selectedCategory === cat.id
                      ? 'bg-primary text-white shadow-[0_0_16px_rgba(37,85,220,0.25)]'
                      : 'bg-white/4 text-gray-500 hover:bg-white/7 hover:text-gray-300'
                  }`}
                >
                  {cat.label}
                  <span className="ml-1.5 text-[10px] opacity-50">{count}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Grid ── */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {filteredProjects?.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onEnter={handleEnter}
              onLeave={handleLeave}
              onMove={handleMove}
            />
          ))}
        </div>

        {/* Empty state */}
        {filteredProjects?.length === 0 && (
          <div className="text-center py-24">
            <p className="text-gray-600 font-nohemi-thin text-sm mb-1">No projects found</p>
            <p className="text-gray-700 font-nohemi-thin text-[12px]">Try a different filter.</p>
          </div>
        )}

        {/* ── Bottom CTA ── */}
        <div className="mt-20 pt-12 border-t border-white/5 text-center">
          <p className="font-nohemi-thin text-gray-600 text-[13px] uppercase tracking-[0.15em] mb-3">
            Like what you see?
          </p>
          <h3 className="font-nohemi text-2xl sm:text-3xl text-white mb-3">
            Let&apos;s work together
          </h3>
          <p className="font-nohemi-thin text-gray-500 text-sm mb-8 max-w-md mx-auto leading-relaxed">
            Open to new projects, creative ideas, or opportunities to be part of your vision.
          </p>
          <Link
            to="/#contact"
            className="group/cta inline-flex items-center gap-2 px-7 py-3 bg-primary hover:bg-primary-light transition-colors duration-300 rounded-xl font-nohemi text-sm text-white shadow-[0_0_24px_rgba(37,85,220,0.2)]"
          >
            Get In Touch
            <FiArrowUpRight className="w-4 h-4 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AllProjects;
