import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const SelectedWork = () => {
  const containerRef = useRef(null);
  return (
    <div
      ref={containerRef}
      className="font-nohemi relative flex min-h-screen w-screen items-center justify-center overflow-hidden"
      style={{ background: 'transparent',pointerEvents: 'none' }}
    >
      <div className="absolute left-20 bottom-20 flex items-center justify-center z-10">
        <p 
          className="text-gray-300 drop-shadow-md"
          style={{ textShadow: '0 0 10px rgba(0,0,0,0.8)' }}
        >
          (Selected Works)
        </p>
      </div>
    </div>
  );
};

export default SelectedWork;