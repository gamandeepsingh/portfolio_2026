import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { blogs } from "../utils/data";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiArrowUpRight, FiArrowLeft } from "react-icons/fi";
import Navbar from "../components/Shared/Navbar";
import Footer from "../components/Shared/Footer";

gsap.registerPlugin(ScrollTrigger);

const Blog = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      gsap.from(".blog-header", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-dark">
      <div className="pt-32 pb-24 px-4 sm:px-8" ref={sectionRef}>
        <div className="max-w-4xl mx-auto">
          
          <div className="blog-header mb-16">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white font-nohemi-thin text-sm mb-8 transition-colors duration-300 group"
            >
              <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>
            
            <h1 className="font-nohemi text-4xl md:text-5xl lg:text-6xl text-white mb-6">
              Writings & <span className="text-primary italic">Thoughts</span>
            </h1>
            <p className="font-nohemi-thin text-gray-400 text-lg max-w-2xl leading-relaxed">
              Sharing my experiences, tutorials, and insights on Web3, frontend development, and software engineering.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {blogs.map((blog, index) => (
              <a
                key={index}
                href={blog.link}
                target="_blank"
                rel="noopener noreferrer"
                className="blog-card group flex flex-col bg-[#0a0a0a] border border-white/5 rounded-3xl hover:border-primary/30 transition-all duration-500 overflow-hidden"
              >
                {/* Image Section */}
                <div className="w-full aspect-16/10 overflow-hidden relative border-b border-white/5">
                   {/* Overlay */}
                   <div className="absolute inset-0 bg-linear-to-t from-dark/60 to-transparent z-10 opacity-70 group-hover:opacity-40 transition-opacity duration-500" />
                   <img 
                      src={blog.image} 
                      alt={blog.title} 
                      className="w-full h-full object-cover transform group-hover:scale-[1.04] transition-transform duration-700 ease-[cubic-bezier(0.33,1,0.68,1)]"
                   />
                   <div className="absolute top-4 left-4 z-20">
                       <span className="px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 shadow-[0_4px_12px_rgba(0,0,0,0.1)] text-[10px] font-nohemi-thin text-white uppercase tracking-widest">
                         {blog.tag}
                       </span>
                   </div>
                </div>

                {/* Content Section */}
                <div className="flex-1 flex flex-col p-6 sm:p-8 relative">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-nohemi-thin text-[11px] text-gray-500 tracking-widest uppercase">
                      {blog.date}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-gray-700" />
                    <span className="font-nohemi-thin text-[11px] text-gray-500 tracking-widest uppercase">
                      {blog.readTime || "5 MIN READ"}
                    </span>
                  </div>

                  <h3 className="font-nohemi text-[22px] sm:text-2xl leading-snug text-white/90 group-hover:text-primary transition-colors duration-300 mb-4 line-clamp-2 pr-4">
                    {blog.title}
                  </h3>
                  
                  <p className="font-nohemi-thin text-[14px] text-gray-400 leading-relaxed mb-8 line-clamp-2">
                    {blog.shortDescription}
                  </p>
                  
                  {/* Footer / Read link */}
                  <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-5">
                     <span className="font-nohemi text-[12px] text-white/50 group-hover:text-white transition-colors duration-300 flex items-center gap-2 tracking-widest uppercase">
                       Read Article
                     </span>
                     <span className="w-9 h-9 rounded-full bg-white/4 group-hover:bg-primary group-hover:text-white flex items-center justify-center text-gray-500 transition-all duration-500">
                        <FiArrowUpRight className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-500" size={15} />
                     </span>
                  </div>
                </div>
              </a>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Blog;
