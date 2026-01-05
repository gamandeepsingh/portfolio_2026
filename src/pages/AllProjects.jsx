import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiExternalLink, FiGithub, FiFilter } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

const AllProjects = () => {
  const { items: projectData, status } = useSelector((state) => state.projects);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredProjects, setFilteredProjects] = useState([]);
  const sectionRef = useRef(null);

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'web3', label: 'Web3' },
    { id: 'web', label: 'Web Apps' },
    { id: 'tool', label: 'Tools' },
    { id: 'ui', label: 'UI/UX' },
    { id: 'ai', label: 'AI/ML' },
  ];

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (projectData) {
      if (selectedCategory === 'all') {
        setFilteredProjects(projectData);
      } else {
        setFilteredProjects(projectData.filter(p => p.category === selectedCategory));
      }
    }
  }, [selectedCategory, projectData]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.project-card', {
        y: 60,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [filteredProjects]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="w-12 h-12 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4 animate-spin" />
          <p className="text-gray-400 font-nohemi-thin">Loading projects...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark pt-24 sm:pt-32 pb-16">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <motion.div
          className="mb-12 sm:mb-16"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white font-nohemi-thin text-sm mb-6 transition-colors"
          >
            ← Back to Home
          </Link>
          <h1 className="font-nohemi text-4xl sm:text-5xl md:text-6xl text-white mb-4">
            All <span className="text-primary">Projects</span>
          </h1>
          <p className="font-nohemi-thin text-gray-400 text-lg max-w-2xl">
            A collection of {projectData?.length || 0} projects I've built over the years, 
            spanning Web3, full-stack applications, and tools.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <FiFilter className="text-gray-500" />
            <span className="text-gray-500 font-nohemi-thin text-sm">Filter by:</span>
          </div>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg font-nohemi-thin text-sm transition-all ${
                  selectedCategory === category.id
                    ? 'bg-primary text-dark'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                {category.label}
                {category.id !== 'all' && (
                  <span className="ml-2 text-xs opacity-60">
                    ({projectData?.filter(p => p.category === category.id).length || 0})
                  </span>
                )}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div ref={sectionRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredProjects?.map((project, index) => (
            <motion.div
              key={project.id}
              className="project-card group"
              whileHover={{ y: -8 }}
            >
              <Link to={`/project/${project.slug?.current}`}>
                <div className="relative overflow-hidden rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 h-full">
                  {/* Image */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
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

                    {/* Category Badge */}
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1.5 rounded-full bg-white/10 text-white/70 text-xs font-nohemi-thin backdrop-blur-sm uppercase">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex-1">
                        <h3 className="font-nohemi text-xl text-white group-hover:text-primary transition-colors mb-1 line-clamp-1">
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
                            className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                          >
                            <FiGithub size={16} />
                          </a>
                        )}
                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                          >
                            <FiExternalLink size={16} />
                          </a>
                        )}
                      </div>
                    </div>

                    <p className="font-nohemi-thin text-gray-400 text-sm mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {project.technologies?.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-md bg-white/5 text-xs text-gray-400 font-nohemi-thin"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies?.length > 3 && (
                        <span className="px-2.5 py-1 rounded-md bg-white/5 text-xs text-gray-500 font-nohemi-thin">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects?.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-gray-500 font-nohemi-thin text-lg">
              No projects found in this category.
            </p>
          </motion.div>
        )}

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16 pt-16 border-t border-white/5"
        >
          <h3 className="font-nohemi text-2xl text-white mb-4">
            Interested in working together?
          </h3>
          <p className="font-nohemi-thin text-gray-400 mb-8 max-w-xl mx-auto">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>
          <Link
            to="/#contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-primary/90 text-dark rounded-xl font-nohemi transition-all"
          >
            Get In Touch
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default AllProjects;
