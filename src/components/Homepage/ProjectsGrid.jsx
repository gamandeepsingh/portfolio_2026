import React, { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import Globe from "../Shared/Globe";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiArrowUpRight, FiGithub, FiExternalLink } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

/* ─────────────── Floating Cursor Tooltip ─────────────── */
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
      style={{ willChange: "transform" }}
    >
      <div
        className={`flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 shadow-[0_0_24px_rgba(37,85,220,0.3)] transition-all duration-400 ease-out ${
          visible ? "scale-100 opacity-100" : "scale-0 opacity-0"
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
      className="project-card group relative"
      onMouseEnter={() => onEnter(project.title)}
      onMouseLeave={onLeave}
      onMouseMove={handleMouseMove}
      style={{ cursor: "none" }}
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
            {/* Light bottom gradient */}
            <div className="absolute inset-0 bg-linear-to-t from-dark via-dark/25 to-transparent" />

            {/* Top bar — status + year */}
            <div className="absolute top-0 inset-x-0 flex items-center justify-between px-5 pt-4">
              <div className="flex items-center gap-1.5">
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    project.status === "In Progress"
                      ? "bg-yellow-400"
                      : project.status === "Completed"
                      ? "bg-emerald-400"
                      : "bg-primary-light"
                  }`}
                />
                <span className="font-nohemi-thin text-[10px] text-white/40 uppercase tracking-[0.15em]">
                  {project.status}
                </span>
              </div>
              <span className="font-nohemi-thin text-[10px] text-white/25 tracking-wider">
                {project.year}
              </span>
            </div>

            {/* Index watermark */}
            <span className="absolute bottom-3 left-5 font-nohemi text-[11px] text-white/10 tracking-wider select-none pointer-events-none">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          {/* ── Content ── */}
          <div className="p-5">
            {/* Title + actions */}
            <div className="flex items-start justify-between gap-3 mb-2.5">
              <div className="min-w-0 flex-1">
                <h3 className="font-nohemi text-[17px] sm:text-lg text-white group-hover:text-primary transition-colors duration-300 leading-snug line-clamp-1">
                  {project.title}
                </h3>
                <p className="font-nohemi-thin text-gray-600 text-[12px] mt-1">
                  {project.subtitle}
                </p>
              </div>

              {/* Action icons — slide up on hover */}
              <div className="flex items-center gap-1 shrink-0 opacity-0 translate-y-1.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-75">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="w-7 h-7 rounded-md bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-500 hover:text-white transition-all duration-200"
                    style={{ cursor: "pointer" }}
                  >
                    <FiGithub size={13} />
                  </a>
                )}
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="w-7 h-7 rounded-md bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-500 hover:text-white transition-all duration-200"
                  style={{ cursor: "pointer" }}
                >
                  <FiExternalLink size={13} />
                </a>
              </div>
            </div>

            {/* Description */}
            <p className="font-nohemi-thin text-gray-500/80 text-[12.5px] leading-relaxed mb-4 line-clamp-2">
              {project.description}
            </p>

            {/* Divider */}
            <div className="h-px w-full bg-white/4 mb-3" />

            {/* Tech chips */}
            <div className="flex flex-wrap gap-1.5">
              {project.technologies?.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 rounded bg-white/3 text-[10px] text-gray-500 font-nohemi-thin tracking-wide"
                >
                  {tech}
                </span>
              ))}
              {project.technologies?.length > 4 && (
                <span className="px-2 py-0.5 rounded bg-white/3 text-[10px] text-gray-600 font-nohemi-thin">
                  +{project.technologies.length - 4}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

/* ─────────────── Main Grid ─────────────── */
const ProjectsGrid = forwardRef(({ globeContainerRef }, ref) => {
  const { items: projectData, status } = useSelector((state) => state.projects);
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  /* Cursor state */
  const [cursor, setCursor] = useState({
    visible: false,
    x: 0,
    y: 0,
    label: "View Project",
  });

  const handleEnter = useCallback((title) => {
    const short = title.length > 20 ? title.slice(0, 18) + "…" : title;
    setCursor((c) => ({ ...c, visible: true, label: `View — ${short}` }));
  }, []);
  const handleLeave = useCallback(() => {
    setCursor((c) => ({ ...c, visible: false }));
  }, []);
  const handleMove = useCallback((x, y) => {
    setCursor((c) => ({ ...c, x, y }));
  }, []);

  /* GSAP scroll reveal */
  useEffect(() => {
    if (status !== "succeeded") return;

    const ctx = gsap.context(() => {
      gsap.from(".pg-header", {
        opacity: 0,
        y: 20,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 82%",
          toggleActions: "play none none none",
        },
      });

      gsap.from(".project-card", {
        y: 50,
        opacity: 0,
        duration: 0.65,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 86%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [status]);

  const displayProjects = projectData?.slice(0, 6) || [];

  /* Loading skeleton */
  if (status === "loading" || !projectData || projectData.length === 0) {
    return (
      <div className="relative w-full bg-dark px-4 sm:px-8 py-24" id="projects">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
            {Array(6)
              .fill(null)
              .map((_, i) => (
                <div
                  key={i}
                  className="rounded-2xl bg-white/2 border border-white/4 overflow-hidden"
                >
                  <div className="aspect-16/10 bg-white/3 animate-pulse" />
                  <div className="p-5 space-y-3">
                    <div className="h-4 w-3/4 bg-white/4 rounded animate-pulse" />
                    <div className="h-3 w-1/2 bg-white/3 rounded animate-pulse" />
                    <div className="h-3 w-full bg-white/3 rounded animate-pulse" />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-dark px-4 sm:px-8 py-24 sm:py-32"
      id="projects"
    >
      {/* Floating cursor */}
      <FloatingCursor
        visible={cursor.visible}
        x={cursor.x}
        y={cursor.y}
        label={cursor.label}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* ── Header ── */}
        <div className="pg-header mb-14 sm:mb-16">
          <span className="text-gray-600 font-nohemi-thin text-xs tracking-[0.2em] uppercase mb-3 block">
            Featured Work
          </span>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2 className="font-nohemi text-4xl sm:text-5xl md:text-6xl text-white leading-tight">
              Selected <span className="text-primary">Projects</span>
            </h2>
            <Link
              to="/projects"
              className="group/link flex items-center gap-2 text-gray-400 hover:text-white font-nohemi-thin text-sm transition-colors duration-300"
            >
              View all projects
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full border border-white/10 group-hover/link:border-primary/40 group-hover/link:bg-primary/10 transition-all duration-300">
                <FiArrowUpRight className="w-3 h-3 group-hover/link:translate-x-px group-hover/link:-translate-y-px transition-transform duration-300" />
              </span>
            </Link>
          </div>
        </div>

        {/* ── Grid ── */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
          {displayProjects.map((project, index) => (
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
      </div>
    </section>
  );
});

ProjectsGrid.displayName = "ProjectsGrid";

export default ProjectsGrid;