import React, { useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjects } from '../store/slices/projectSlice';
import { FiArrowLeft, FiExternalLink, FiGithub, FiCalendar, FiTag, FiArrowRight } from 'react-icons/fi';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Projectdetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items: projects, status } = useSelector((state) => state.projects);
  const heroRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProjects());
    }
  }, [status, dispatch]);

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      // Hero image parallax
      gsap.to('.hero-image', {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, [status]);

  // Find project by slug
  const project = projects.find((p) => p.slug?.current === slug);
  
  // Find next and previous projects
  const currentIndex = projects.findIndex((p) => p.slug?.current === slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];
  const prevProject = projects[(currentIndex - 1 + projects.length) % projects.length];

  // Loading state
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="w-12 h-12 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4 animate-spin" />
          <p className="text-gray-400 font-nohemi-thin">Loading project...</p>
        </motion.div>
      </div>
    );
  }

  // Not found state
  if (!project && status === 'succeeded') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark px-4">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-nohemi text-6xl text-white mb-4">404</h1>
          <p className="text-gray-400 font-nohemi-thin mb-8">Project not found</p>
          <Link
            to="/#projects"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg font-nohemi-thin transition-all"
          >
            <FiArrowLeft />
            Back to Projects
          </Link>
        </motion.div>
      </div>
    );
  }

  if (!project) return null;

  return (
    <div className="min-h-screen bg-dark text-white">
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      {/* Navigation Bar */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 py-4"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="group flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-gray-300 hover:text-white hover:bg-white/10 transition-all font-nohemi-thin text-sm"
          >
            <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            Back
          </button>

          <div className="flex items-center gap-3">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-gray-300 hover:text-white hover:bg-white/10 transition-all"
              >
                <FiGithub size={18} />
              </a>
            )}
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 rounded-full text-dark font-nohemi text-sm transition-all"
            >
              Live Site
              <FiExternalLink size={16} />
            </a>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative h-[70vh] sm:h-[80vh] overflow-hidden">
        <div className="hero-image absolute inset-0">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/60 to-dark/30" />
        </div>

        {/* Hero Content */}
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 pb-12 sm:pb-20 w-full">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className={`px-3 py-1.5 rounded-full text-xs font-nohemi-thin ${
                  project.status === 'In Progress' 
                    ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                    : project.status === 'Completed'
                    ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                    : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                }`}>
                  {project.status}
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 text-white/70 text-xs font-nohemi-thin">
                  <FiCalendar size={12} />
                  {project.year}
                </span>
                {project.category && (
                  <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 text-white/70 text-xs font-nohemi-thin">
                    <FiTag size={12} />
                    {project.category}
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="font-nohemi text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-4">
                {project.title}
              </h1>

              {/* Subtitle */}
              <p className="font-nohemi-thin text-lg sm:text-xl text-gray-300 max-w-2xl">
                {project.subtitle}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section ref={contentRef} className="relative z-10 bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 sm:py-24">
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Main Content */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="font-nohemi text-2xl sm:text-3xl text-white mb-6">
                About the Project
              </h2>
              <div className="prose prose-invert max-w-none">
                <p className="font-nohemi-thin text-gray-300 text-lg leading-relaxed mb-6">
                  {project.description}
                </p>
                {project.longDescription && (
                  <p className="font-nohemi-thin text-gray-400 leading-relaxed">
                    {project.longDescription}
                  </p>
                )}
              </div>

              {/* Features/Highlights */}
              {project.highlights && project.highlights.length > 0 && (
                <motion.div
                  className="mt-12"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <h3 className="font-nohemi text-xl text-white mb-6">Key Features</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {project.highlights.map((highlight, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-4 bg-white/[0.02] border border-white/5 rounded-xl"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <p className="font-nohemi-thin text-gray-300 text-sm">{highlight}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* Sidebar */}
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {/* Project Info Card */}
              <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 sticky top-24">
                <h3 className="font-nohemi text-lg text-white mb-6">Project Details</h3>

                {/* Role */}
                {project.role && (
                  <div className="mb-6">
                    <span className="text-gray-500 text-xs uppercase tracking-wider font-nohemi-thin">Role</span>
                    <p className="font-nohemi text-white mt-1">{project.role}</p>
                  </div>
                )}

                {/* Timeline */}
                {project.timeline && (
                  <div className="mb-6">
                    <span className="text-gray-500 text-xs uppercase tracking-wider font-nohemi-thin">Timeline</span>
                    <p className="font-nohemi text-white mt-1">{project.timeline}</p>
                  </div>
                )}

                {/* Technologies */}
                <div className="mb-6">
                  <span className="text-gray-500 text-xs uppercase tracking-wider font-nohemi-thin">Technologies</span>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {project.technologies?.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 bg-white/5 text-gray-300 text-xs rounded-lg font-nohemi-thin"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Keywords */}
                {project.keywords && project.keywords.length > 0 && (
                  <div className="mb-6">
                    <span className="text-gray-500 text-xs uppercase tracking-wider font-nohemi-thin">Keywords</span>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {project.keywords.map((keyword) => (
                        <span
                          key={keyword}
                          className="px-2 py-1 text-primary/80 text-xs font-nohemi-thin"
                        >
                          #{keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="pt-6 border-t border-white/5 space-y-3">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary hover:bg-primary/90 text-dark font-nohemi rounded-xl transition-all"
                  >
                    View Live Site
                    <FiExternalLink size={16} />
                  </a>
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white/5 hover:bg-white/10 text-white font-nohemi rounded-xl transition-all"
                    >
                      View Source Code
                      <FiGithub size={16} />
                    </a>
                  )}
                  {project.extraLink && (
                    <div className="text-center">
                      <a
                        href={project.extraLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline font-nohemi-thin"
                      >
                        Read More
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Project Navigation */}
      <section className="relative z-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2">
            {/* Previous Project */}
            <Link
              to={`/project/${prevProject?.slug?.current}`}
              className="group p-8 sm:p-12 border-r border-white/5 hover:bg-white/[0.02] transition-all"
            >
              <span className="text-gray-500 text-xs uppercase tracking-wider font-nohemi-thin flex items-center gap-2 mb-4">
                <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                Previous Project
              </span>
              <h3 className="font-nohemi text-xl sm:text-2xl text-white group-hover:text-primary transition-colors">
                {prevProject?.title}
              </h3>
            </Link>

            {/* Next Project */}
            <Link
              to={`/project/${nextProject?.slug?.current}`}
              className="group p-8 sm:p-12 text-right hover:bg-white/[0.02] transition-all"
            >
              <span className="text-gray-500 text-xs uppercase tracking-wider font-nohemi-thin flex items-center justify-end gap-2 mb-4">
                Next Project
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </span>
              <h3 className="font-nohemi text-xl sm:text-2xl text-white group-hover:text-primary transition-colors">
                {nextProject?.title}
              </h3>
            </Link>
          </div>
        </div>
      </section>

      {/* Back to Projects CTA */}
      <section className="relative z-10 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-500 font-nohemi-thin mb-6">Want to see more work?</p>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-xl font-nohemi transition-all group"
            >
              View All Projects
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Projectdetail;