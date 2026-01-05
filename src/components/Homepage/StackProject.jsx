import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { projectData } from "../../utils/data";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const StackProject = () => {
  const stackRef = useRef(null);
  const projectRefs = useRef([]);

 useEffect(() => {
  projectRefs.current = projectRefs.current.slice(0, projectData.length);
  gsap.registerPlugin(ScrollTrigger);

  const numProjects = projectData.length;
  const maxYOffset = 40;

  const setInitialStates = () => {
    projectRefs.current.forEach((el, i) => {
      gsap.set(el, {
        y: i * maxYOffset,
        scale: 1 - i * 0.03,
        zIndex: numProjects - i,
      });
    });
  };

  setInitialStates();

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: stackRef.current,
      start: "top top",
      end: `+=${projectData.length * 300}`, // adjust for smoother scroll
      scrub: true,
      pin: true,
    },
  });

  projectRefs.current.forEach((el, i) => {
    const yOffset = (i + 1) * maxYOffset;
    const scale = 1;
    // if scale is needed, uncomment the line below
    // const scale = 1 - (i + 1) * 0.03;
    tl.to(el, {
      y: i/yOffset,
      scale,
      zIndex: numProjects + i,
      duration: 1,
      ease: "power2.inOut",
    }, i);
  });

  return () => {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  };
}, []);


  return (
    <div
      className="relative flex h-screen w-full items-center justify-center"
      ref={stackRef}
    >
      <div className="w-full max-w-7xl">
        {projectData.slice(0,7).map((project, index) => (
          <div
            key={project.id}
            ref={(el) => (projectRefs.current[index] = el)}
            data-project-id={project.id}
            className="absolute top-0 left-0 w-full cursor-pointer shadow-lg transition-all duration-500"
          >
            <div className="relative overflow-hidden rounded-t-2xl">
              {/* Project Image */}
              <div className="relative overflow-hidden h-[100vh]">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.target.src = "https://res.cloudinary.com/dib0peewu/image/upload/v1705732694/samples/landscapes/girl-urban-view.jpg";
                  }}
                />

                {/* Project info overlay - similar to the reference image */}
                { (
                  <div className="absolute right-0 bottom-0 bg-black/60 p-4 backdrop-blur-sm">
                    <h3 className="text-lg font-nohemi-c">
                      {project.title} • {new Date().getFullYear()}
                    </h3>

                    <div className="mt-2 flex flex-wrap gap-2 font-nohemi-c">
                      <span className="border-[1px] border-light rounded-full px-[20px] py-[8px] text-sm">
                        UI Design
                      </span>
                      <span className="border-[1px] border-light rounded-full px-[20px] py-[8px] text-sm">
                        Development
                      </span>
                    </div>

                    <div className="mt-4 flex items-center justify-end p-5">
                      
                      <a
                        href={project.link}
                        className="flex items-center justify-end gap-1 text-sm font-medium font-nohemi-c"
                      >
                        View Project
                        <svg
                          className="h-4 w-4"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            d="M7 17L17 7M17 7H7M17 7V17"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                )}
                
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StackProject;
