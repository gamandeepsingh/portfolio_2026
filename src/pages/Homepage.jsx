import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hero from "../components/Homepage/Hero";
import About from "../components/Homepage/About";
import SolarBall from "../components/Homepage/SolarBall";
import ProjectsGrid from "../components/Homepage/ProjectsGrid";
import Services from "../components/Homepage/Services";
import Testimonials from "../components/Homepage/Testimonials";
import Contact from "../components/Homepage/Contact";
import MouseMoveLineDrawing from "../components/Shared/MouseMoveLineDrawing";

gsap.registerPlugin(ScrollTrigger);

const Homepage = () => {
  const globeRef = useRef();
  const projectsGridRef = useRef();
  const selectedWorkRef = useRef();
  const globeContainerRef = useRef();

  useEffect(() => {
    if (
      !globeRef.current ||
      !projectsGridRef.current ||
      !selectedWorkRef.current
    )
      return;

    // Set initial state - globe in its grid position
    gsap.set(globeContainerRef.current, {
      position: "relative",
      zIndex: 1,
      transformOrigin: "center center",
    });

    gsap.set(globeRef.current, {
      scale: 1,
      opacity: 1,
      transformOrigin: "center center",
    });

    ScrollTrigger.create({
      trigger: selectedWorkRef.current,
      start: "top bottom", // when the top of the section hits the bottom of the viewport
      onLeave: () => {
        gsap.set(globeContainerRef.current, {
          opacity: 0,
          pointerEvents: "none",
        });
      },
      onEnterBack: () => {
        gsap.set(globeContainerRef.current, {
          opacity: 1,
          pointerEvents: "auto",
        });
      },
    });

    // Create the main timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: projectsGridRef.current,
        start: "center center", // Start when grid center hits viewport center
        end: () =>
          `+=${projectsGridRef.current.offsetHeight * 2}`, // End after twice the grid height
        scrub: 1.2, // Smoother scrubbing
        pin: false,
        markers: false, // Set to true for debugging
        onUpdate: (self) => {
          const progress = self.progress;

          // Smooth transition phases
          if (progress < 0.2) {
            // Phase 1: Globe stays in grid position (delay start)
            gsap.set(globeContainerRef.current, {
              position: "relative",
              zIndex: 10,
              pointerEvents: 'auto'
            });
          } else if (progress >= 0.2 && progress < 0.8) {
            // Phase 2: Globe transitions to fixed center position

            // Smooth transition from grid position to center
            gsap.set(globeContainerRef.current, {
              position: "fixed",
              top: "50%",
              left: "50%",
              xPercent: -50,
              yPercent: -50,
              zIndex: -10, // Behind content but visible
              scale: 1 + (progress - 0.2), // Scale up smoothly
            });
          } else {
            // Phase 3: Globe as background element
            gsap.set(globeContainerRef.current, {
              position: "fixed",
              top: "50%",
              left: "50%",
              xPercent: -50,
              yPercent: -50,
              zIndex: -10,
            });
          }
        },
        onLeave: () => {
          // Keep globe as background when scrolling past
          gsap.set(globeContainerRef.current, {
            position: "fixed",
            top: "50%",
            left: "50%",
            xPercent: -50,
            yPercent: -50,
            zIndex: 0,
          });
        },
        onLeaveBack: () => {
          // Return globe to grid when scrolling back up
          gsap.set(globeContainerRef.current, {
            position: "relative",
            zIndex: 1,
          });
          gsap.set(globeRef.current, {
            scale: 1,
            opacity: 1,
          });
        },
      },
    });

    // Smooth scaling animation with better easing
    tl.to(
      globeRef.current,
      {
      scale: 2.5,
      opacity: 1,
      duration: 0.5,
      ease: "power1.inOut",
      },
      0.2
    )
      .to(
      globeRef.current,
      {
        scale: 6,
        opacity: 0.5,
        duration: 0.8,
        ease: "power1.inOut",
      },
      0.4
      )
      .to(
      globeRef.current,
      {
        scale: 10,
        opacity: 0.15,
        duration: 0.7,
        ease: "power1.inOut",
      },
      0.8
      );

    // Cleanup function
    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="relative">
      <MouseMoveLineDrawing />
      <Hero />
      <About />
      <SolarBall />
      {/* <TunnelAnimation/> */}
      {/* Projects Grid Section */}
      <div ref={projectsGridRef} className="relative z-10">
        <ProjectsGrid ref={globeRef} globeContainerRef={globeContainerRef} />
      </div>

      <div className="max-w-screen overflow-x-hidden relative z-30 bg-transparent">
        {/* <StackProject /> */}
        <Services />
        <Testimonials />
        <Contact />
      </div>
    </div>
  );
};

export default Homepage;
