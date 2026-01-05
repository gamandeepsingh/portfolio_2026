// SolarBallSection.jsx
import React from 'react';

const SolarBallSection = () => {
  return (
    <div className="relative flex items-center justify-center min-h-screen px-4 text-center overflow-hidden">
      {/* Central Text */}
      <h1 className="text-2xl sm:text-4xl md:text-6xl font-semibold z-10 relative leading-snug sm:leading-tight">
        Hi, I’m Ghost — I build fast, scalable, <br/> and elegant web solutions.
      </h1>

      {/* Left Orbits */}
      <div className="absolute left-0 top-0 h-full w-full -translate-x-1/2 pointer-events-none ">
        <svg viewBox="0 0 628 403" className="h-full w-full absolute left-0">
          <path
            id="leftOrbit1"
            d="M78.7686 0.25C230.368 0.25 367.606 22.7501 466.934 59.1201C516.599 77.3055 556.773 98.9544 584.526 122.98C612.28 147.007 627.589 173.389 627.589 201.048C627.589 228.707 612.28 255.09 584.526 279.116C556.773 303.142 516.599 324.79 466.934 342.976C367.606 379.346 230.368 401.847 78.7686 401.847C-72.8312 401.847 -210.069 379.346 -309.396 342.976C-359.061 324.79 -399.235 303.142 -426.988 279.116C-454.742 255.09 -470.051 228.707 -470.051 201.048C-470.051 173.389 -454.742 147.007 -426.988 122.98C-399.235 98.9544 -359.061 77.3055 -309.396 59.1201C-210.069 22.7501 -72.8312 0.250036 78.7686 0.25Z"
            stroke="#5B5B5B"
            strokeWidth="0.5"
            fill="none"
          />
          <path
            id="leftOrbit2"
            d="M78.7695 379.171C-52.0976 379.171 -170.564 357.978 -256.305 323.723C-299.175 306.595 -333.853 286.206 -357.808 263.579C-381.762 240.952 -394.979 216.104 -394.979 190.048C-394.978 163.992 -381.762 139.144 -357.808 116.518C-333.853 93.8903 -299.176 73.501 -256.305 56.3731C-170.564 22.118 -52.0976 0.924858 78.7695 0.924846C209.637 0.924848 328.103 22.1179 413.844 56.3731C456.715 73.501 491.392 93.8903 515.347 116.518C539.301 139.144 552.517 163.992 552.518 190.048C552.518 216.104 539.301 240.952 515.347 263.579C491.392 286.206 456.715 306.595 413.844 323.723C328.103 357.978 209.637 379.171 78.7695 379.171Z"
            stroke="#5B5B5B"
            strokeWidth="0.5"
            fill="none"
          />

          <circle r="6" fill="var(--color-primary)">
            <animateMotion dur="10s" repeatCount="indefinite" rotate="auto">
              <mpath href="#leftOrbit1" />
            </animateMotion>
          </circle>
          <circle r="6" fill="var(--color-primary)">
            <animateMotion dur="12s" repeatCount="indefinite" rotate="auto">
              <mpath href="#leftOrbit2" />
            </animateMotion>
          </circle>
        </svg>
      </div>
      {/* Right Orbits */}
      <div className="absolute left-0 top-0 h-full w-full rotate-180 translate-x-1/2 pointer-events-none">
        <svg viewBox="0 0 628 403" className="h-full w-full absolute left-0">
          <path
            id="leftOrbit1"
            d="M78.7686 0.25C230.368 0.25 367.606 22.7501 466.934 59.1201C516.599 77.3055 556.773 98.9544 584.526 122.98C612.28 147.007 627.589 173.389 627.589 201.048C627.589 228.707 612.28 255.09 584.526 279.116C556.773 303.142 516.599 324.79 466.934 342.976C367.606 379.346 230.368 401.847 78.7686 401.847C-72.8312 401.847 -210.069 379.346 -309.396 342.976C-359.061 324.79 -399.235 303.142 -426.988 279.116C-454.742 255.09 -470.051 228.707 -470.051 201.048C-470.051 173.389 -454.742 147.007 -426.988 122.98C-399.235 98.9544 -359.061 77.3055 -309.396 59.1201C-210.069 22.7501 -72.8312 0.250036 78.7686 0.25Z"
            stroke="#5B5B5B"
            strokeWidth="0.5"
            fill="none"
          />
          <path
            id="leftOrbit2"
            d="M78.7695 379.171C-52.0976 379.171 -170.564 357.978 -256.305 323.723C-299.175 306.595 -333.853 286.206 -357.808 263.579C-381.762 240.952 -394.979 216.104 -394.979 190.048C-394.978 163.992 -381.762 139.144 -357.808 116.518C-333.853 93.8903 -299.176 73.501 -256.305 56.3731C-170.564 22.118 -52.0976 0.924858 78.7695 0.924846C209.637 0.924848 328.103 22.1179 413.844 56.3731C456.715 73.501 491.392 93.8903 515.347 116.518C539.301 139.144 552.517 163.992 552.518 190.048C552.518 216.104 539.301 240.952 515.347 263.579C491.392 286.206 456.715 306.595 413.844 323.723C328.103 357.978 209.637 379.171 78.7695 379.171Z"
            stroke="#5B5B5B"
            strokeWidth="0.5"
            fill="none"
          />

          <circle r="6" fill="var(--color-primary)">
            <animateMotion dur="10s" repeatCount="indefinite" rotate="auto">
              <mpath href="#leftOrbit1" />
            </animateMotion>
          </circle>
          <circle r="6" fill="var(--color-primary)">
            <animateMotion dur="12s" repeatCount="indefinite" rotate="auto">
              <mpath href="#leftOrbit2" />
            </animateMotion>
          </circle>
        </svg>
      </div>
    </div>
  );
};

export default SolarBallSection;
