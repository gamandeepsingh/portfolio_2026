import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Testimonials = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardRefs = useRef([]);
  const orbRefs = useRef([]);

  // Store refs in arrays for easier animation
  const addToCardRefs = (el) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el);
    }
  };

  const addToOrbRefs = (el) => {
    if (el && !orbRefs.current.includes(el)) {
      orbRefs.current.push(el);
    }
  };

  const testimonials = [
    {
      id: 1,
      text: "Currently developing responsive, high-performance frontends for Web3 dashboards at GPU.Net, where I collaborate with backend and blockchain teams to ship production-ready features. My expertise in React, Next.js, and TypeScript enables me to build scalable applications that bridge traditional web development with cutting-edge blockchain technology.",
      author: "Full Stack Developer",
      position: "GPU.Net • Oct 2025 - Present",
    },
    {
      id: 2,
      text: "Leading a team of 250+ members at INNOGEEKS technical community while mentoring fellow developers and organizing multiple technical events. Selected for Google Solution Challenge 2024 among 4000+ projects, demonstrating exceptional problem-solving skills and innovation in building impactful solutions.",
      author: "Technical Lead & Innovator",
      position: "INNOGEEKS • Google Solution Challenge Top 50",
    },
    {
      id: 3,
      text: "Built 12+ live projects spanning Web3, full-stack applications, and developer tools. From ChainUPI's revolutionary multi-chain crypto payments to PRISTINE UI component library, my work focuses on creating scalable solutions that solve real-world problems. Solved 100+ problems on LeetCode and won 1st position at HackSphere Hackathon.",
      author: "Builder & Problem Solver",
      position: "17+ Projects • 100+ LeetCode Problems",
    },
  ];

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      const moveX = (clientX - centerX) / centerX;
      const moveY = (clientY - centerY) / centerY;

      orbRefs.current.forEach((orb, index) => {
        const intensity = 10 + index * 2; // different levels of movement per orb
        gsap.to(orb, {
          x: moveX * intensity,
          y: moveY * intensity,
          duration: 1.2,
          ease: "power3.out",
        });
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    // Set initial states
    gsap.set([headerRef.current, ...cardRefs.current], {
      opacity: 0,
      y: 50,
    });

    // Create timeline for entrance animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });

    // Header animation
    tl.to(headerRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out",
    })
      // Stagger card animations
      .to(
        cardRefs.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.3,
          ease: "power2.out",
        },
        "-=0.5",
      );

    // Floating animations for orbs
    orbRefs.current.forEach((orb, index) => {
      const duration = 3 + index * 0.5;
      const delay = index * 0.3;

      gsap.to(orb, {
        y: index % 2 === 0 ? -15 : 15,
        duration: duration,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: delay,
      });

      gsap.to(orb, {
        x: index % 2 === 0 ? 10 : -10,
        duration: duration + 1,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: delay,
      });
    });

    // Card hover animations
    const cardHoverHandlers = new Map();
    
    cardRefs.current.forEach((card) => {
      const handleMouseEnter = () => {
        gsap.to(card, {
          scale: 1.02,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      const handleMouseLeave = () => {
        gsap.to(card, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      cardHoverHandlers.set(card, { handleMouseEnter, handleMouseLeave });
      card.addEventListener("mouseenter", handleMouseEnter);
      card.addEventListener("mouseleave", handleMouseLeave);
    });

    // Refresh ScrollTrigger after all elements are loaded
    ScrollTrigger.refresh();

    return () => {
      // Cleanup
      window.removeEventListener("mousemove", handleMouseMove);
      gsap.killTweensOf([
        headerRef.current,
        ...cardRefs.current,
        ...orbRefs.current,
      ]);
      cardRefs.current.forEach((card) => {
        const handlers = cardHoverHandlers.get(card);
        if (handlers) {
          card.removeEventListener("mouseenter", handlers.handleMouseEnter);
          card.removeEventListener("mouseleave", handlers.handleMouseLeave);
        }
      });
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="font-nohemi-c relative mt-20 flex h-full w-full flex-col items-center justify-center px-4 py-32"
    >
      {/* Blue Orb */}
      <div className="flex min-h-screen w-full max-w-screen items-center justify-center overflow-x-hidden">
        <div
          ref={(el) => addToOrbRefs(el)}
          className="bg-primary/30 absolute top-10 left-0 h-[900px] w-[900px] -translate-x-1/3 rounded-full"
          style={{
            background:
              "radial-gradient(circle,rgba(21, 137, 220, 1) 0%, rgba(4, 37, 127, 1) 50%, rgba(21, 137, 220, 1) 100%)",
            zIndex: 0,
            WebkitMaskImage:
              "linear-gradient(to left, black 0%, transparent 80%)",
            maskImage: "linear-gradient(to left, black 0%, transparent 80%)",
            filter: "blur(1px)",
            boxShadow: "0 0 20px rgba(21, 137, 220, 0.5)",
          }}
        ></div>

        {/* Header */}
        <div
          ref={headerRef}
          className="relative z-10 mx-auto mb-16 flex max-w-lg"
        >
          <h2 className="font-nohemi-c mb-2 text-3xl">
            <span className="text-gray mb-2 text-xs">(Testimonials) </span>
            Great things happen when creativity meets strategy. But don't just
            take our word for it—see what our clients have to say!
          </h2>
        </div>
      </div>

      <div className="relative min-h-screen w-full items-center justify-center space-y-28">
        {testimonials.map((testimonial, index) => (
          <div
            key={testimonial.id}
            ref={(el) => addToCardRefs(el)}
            className={`relative z-20 ${index === 1 ? "sm:translate-x-42" : index === 0 ? "sm:-translate-x-42" : ""}`}
          >
            <div className="text-light relative mx-auto max-w-lg rounded-lg bg-white/5 p-6">
              <p className="font-nohemi-c mb-4 tracking-wider">
                {testimonial.text}
              </p>
              <div>
                <p className="text-primary-light font-bold">
                  {testimonial.author}
                </p>
                <p className="text-sm">{testimonial.position}</p>
              </div>

              {/* Orbs for each card */}
              {index === 0 && (
                <div
                  ref={(el) => addToOrbRefs(el)}
                  className="bg-primary/30 absolute top-0 right-0 z-0 h-[300px] w-[300px] translate-x-1/3 rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle,rgba(21, 137, 220, 1) 0%, rgba(4, 37, 127, 1) 50%, rgba(21, 137, 220, 1) 100%)",
                    zIndex: 0,
                    WebkitMaskImage:
                      "linear-gradient(to left, black 0%, transparent 80%)",
                    maskImage:
                      "linear-gradient(to left, black 0%, transparent 80%)",
                    filter: "blur(1px)",
                    boxShadow: "0 0 20px rgba(21, 137, 220, 0.5)",
                  }}
                ></div>
              )}

              {index === 1 && (
                <>
                  <div
                    ref={(el) => addToOrbRefs(el)}
                    className="absolute -top-10 -left-1/3 z-0 h-[200px] w-[200px] translate-x-1/3 rounded-full bg-purple-500/30"
                    style={{
                      background:
                        "radial-gradient(68.12% 68.12% at 40.5% 31.88%, #2EE3C5 0%, #14746C 40%, #253346 70%, rgba(12, 23, 54, 0) 100%)",
                      zIndex: 0,
                      WebkitMaskImage:
                        "linear-gradient(to right, black 1%, transparent 100%)",
                      maskImage:
                        "linear-gradient(to right, black 1%, transparent 100%)",
                      filter: "blur(0.5px) brightness(1.3)",
                      boxShadow: "0 0 40px 10px rgba(46, 227, 197, 0.7)",
                    }}
                  ></div>
                  <div
                    ref={(el) => addToOrbRefs(el)}
                    className="absolute -right-0 -bottom-2 z-0 h-[200px] w-[200px] translate-x-1/3 rounded-full bg-purple-500/30"
                    style={{
                      background:
                        "radial-gradient(circle,rgba(168, 85, 247, 1) 0%, rgba(91, 33, 182, 1) 50%, rgba(168, 85, 247, 1) 100%)",
                      zIndex: 0,
                      WebkitMaskImage:
                        "linear-gradient(to left, black 1%, transparent 100%)",
                      maskImage:
                        "linear-gradient(to left, black 1%, transparent 100%)",
                      filter: "blur(0.5px) brightness(1.3)",
                      boxShadow: "0 0 40px 10px rgba(168, 85, 247, 0.7)",
                    }}
                  ></div>
                </>
              )}

              {index === 2 && (
                <>
                  <div
                    ref={(el) => addToOrbRefs(el)}
                    className="bg-primary/30 absolute -top-1/4 left-1/4 z-0 h-[172px] w-[172px] translate-x-1/3 rounded-full"
                    style={{
                      background:
                        "radial-gradient(circle,rgba(21, 137, 220, 1) 0%, rgba(4, 37, 127, 1) 50%, rgba(21, 137, 220, 1) 100%)",
                      zIndex: 0,
                      WebkitMaskImage:
                        "linear-gradient(to bottom, black 0%, transparent 80%)",
                      maskImage:
                        "linear-gradient(to bottom, black 0%, transparent 80%)",
                      filter: "blur(1px)",
                      boxShadow: "0 0 20px rgba(21, 137, 220, 0.5)",
                    }}
                  ></div>
                  <div
                    ref={(el) => addToOrbRefs(el)}
                    className="absolute -right-10 -bottom-10 z-0 h-[200px] w-[200px] translate-x-1/3 rounded-full bg-purple-500/30"
                    style={{
                      background:
                        "radial-gradient(68.12% 68.12% at 40.5% 31.88%, #2EE3C5 0%, #14746C 40%, #253346 70%, rgba(12, 23, 54, 0) 100%)",
                      zIndex: 0,
                      WebkitMaskImage:
                        "linear-gradient(to left, black 1%, transparent 100%)",
                      maskImage:
                        "linear-gradient(to left, black 1%, transparent 100%)",
                      filter: "blur(0.5px) brightness(1.3)",
                      boxShadow: "0 0 40px 10px rgba(46, 227, 197, 0.7)",
                    }}
                  ></div>
                  <div
                    ref={(el) => addToOrbRefs(el)}
                    className="absolute -bottom-full -left-1/2 z-0 h-[400px] w-[400px] translate-x-1/3 rounded-full bg-purple-500/30"
                    style={{
                      background:
                        "radial-gradient(circle,rgba(168, 85, 247, 1) 0%, rgba(91, 33, 182, 1) 50%, rgba(168, 85, 247, 1) 100%)",
                      zIndex: 0,
                      WebkitMaskImage:
                        "linear-gradient(to top, black 1%, transparent 100%)",
                      maskImage:
                        "linear-gradient(to top, black 1%, transparent 100%)",
                      filter: "blur(0.5px) brightness(1.3)",
                      boxShadow: "0 0 40px 10px rgba(168, 85, 247, 0.7)",
                    }}
                  ></div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
