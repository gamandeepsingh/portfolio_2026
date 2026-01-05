import React, { forwardRef, useEffect, useRef } from "react";
import Globe from "../Shared/Globe";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiExternalLink, FiGithub, FiArrowUpRight } from "react-icons/fi";
import { motion } from 'framer-motion';
gsap.registerPlugin(ScrollTrigger);

const ProjectsGrid = forwardRef(({ globeContainerRef }, ref) => {
  const { items: projectData, status } = useSelector((state) => state.projects);
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.project-card', {
        y: 80,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [status]);

  // Get first 6 projects to display
  const displayProjects = projectData?.slice(0, 6) || [];

  if (status === 'loading' || !projectData || projectData.length === 0) {
    return (
      <div className="relative min-h-screen w-full bg-dark px-4 sm:px-8 py-24" id="projects">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(6).fill(null).map((_, index) => (
              <div key={index} className="aspect-[4/3] bg-white/5 rounded-2xl animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={sectionRef} className="relative min-h-screen w-full bg-dark px-4 sm:px-8 py-24 sm:py-32" id="projects">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 -left-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 -right-32 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 sm:mb-20"
        >
          <span className="text-gray-500 font-nohemi-thin text-sm tracking-widest uppercase mb-4 block">
            (Featured Work)
          </span>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <h2 className="font-nohemi text-4xl sm:text-5xl md:text-6xl text-white">
              Selected <span className="text-primary">Projects</span>
            </h2>
            <Link 
              to="/projects"
              className="group flex items-center gap-2 text-gray-400 hover:text-white font-nohemi-thin text-sm transition-colors"
            >
              View all projects
              <FiArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {displayProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className={`project-card group relative ${index === 0 || index === 3 ? 'md:col-span-2 lg:col-span-1' : ''}`}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.4 }}
            >
              <Link to={`/project/${project.slug?.current}`}>
                <div className="relative overflow-hidden rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all duration-500">
                  {/* Image Container */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                    
                    {/* Status Badge */}
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1.5 rounded-full text-xs font-nohemi-thin backdrop-blur-sm ${
                        project.status === 'In Progress' 
                          ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                          : project.status === 'Completed'
                          ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                          : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                      }`}>
                        {project.status}
                      </span>
                    </div>

                    {/* Year Badge */}
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1.5 rounded-full bg-white/10 text-white/70 text-xs font-nohemi-thin backdrop-blur-sm">
                        {project.year}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <h3 className="font-nohemi text-xl sm:text-2xl text-white group-hover:text-primary transition-colors mb-1">
                          {project.title}
                        </h3>
                        <p className="font-nohemi-thin text-gray-500 text-sm">
                          {project.subtitle}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                          >
                            <FiGithub size={18} />
                          </a>
                        )}
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                        >
                          <FiExternalLink size={18} />
                        </a>
                      </div>
                    </div>

                    <p className="font-nohemi-thin text-gray-400 text-sm mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {project.technologies?.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-md bg-white/5 text-xs text-gray-400 font-nohemi-thin"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies?.length > 4 && (
                        <span className="px-2.5 py-1 rounded-md bg-white/5 text-xs text-gray-500 font-nohemi-thin">
                          +{project.technologies.length - 4}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
});

ProjectsGrid.displayName = "ProjectsGrid";

export default ProjectsGrid;