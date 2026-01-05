import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

// Service labels with their positions along the path (0-1)
const labels = [
  { name: "Branding", position: 0.15, color: "#F3C950" },
  { name: "Web Design & Development", position: 0.3, color: "#9A3FE0" },
  { name: "Shopify Conversions & Analytics", position: 0.42, color: "#2ED392" },
  { name: "SEO", position: 0.58, color: "#FF7E33" },
  { name: "Full-stack Development", position: 0.7, color: "#C742E0" },
  { name: "App Development", position: 0.82, color: "#FF4C4C" },
  { name: "SAAS", position: 0.95, color: "#2ACCC8" },
];

const TunnelAnimation = () => {
  const containerRef = useRef(null);
  const tunnelRef = useRef(null);
  const ballRef = useRef(null);
  const labelsRef = useRef([]);

  useEffect(() => {
    // Get the path element for motion path animation
    const path = tunnelRef.current.querySelector("path");
    const ctx = gsap.context(() => {
      // Create a timeline for the animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=4000", // Scrolling distance
          scrub: 1.5, // More responsive to scroll
          pin: true,
          anticipatePin: 1,
          markers: false,
        },
      });

      // Animate ball ONLY from top to bottom along the tunnel path
      tl.to(ballRef.current, {
        duration: 10,
        motionPath: {
          path: path,
          align: path,
          alignOrigin: [0.5, 0.5],
          autoRotate: false,
        },
        ease: "none", // Linear movement to match scroll exactly
      });

      // For each label, create animations that trigger as the ball passes their position
      labels.forEach((label, index) => {
        // First make the label appear with a pop effect
        tl.to(
          labelsRef.current[index],
          {
            opacity: 1,
            scale: 1.1,
            duration: 0.3,
            ease: "power2.out",
          },
          label.position * 10
        );
        
        // Then quickly scale back to normal size
        tl.to(
          labelsRef.current[index],
          {
            scale: 1,
            duration: 0.2,
          },
          label.position * 10 + 0.3
        );
        
        // Make the label disappear after a short while
        tl.to(
          labelsRef.current[index],
          {
            opacity: 0,
            scale: 0.9,
            duration: 0.3,
          },
          label.position * 10 + 1.5
        );
      });
    }, containerRef);

    return () => ctx.revert(); // Cleanup animation on unmount
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ height: "100vh" }}
    >
      <div className="mx-auto h-full px-4 pt-12">
        <div className="mb-12 max-w-md text-white">
          <p className="text-lg">
            Our team guides you from ideation to launch, ensuring seamless
            project management and tailored solutions.
          </p>
        </div>

        {/* Service Labels - positioned very close to the ball path */}
        <div className="pointer-events-none absolute inset-0 flex justify-center">
          <div className="relative h-full w-full" style={{ maxWidth: "90vh" }}>
            {labels.map((label, index) => (
              <div
                key={index}
                ref={(el) => (labelsRef.current[index] = el)}
                className="absolute scale-75 transform-gpu rounded-lg bg-gray-800 px-4 py-2 text-sm opacity-0 shadow-lg transition-all duration-300"
                style={{
                  // Position vertically based on progress
                  top: `${5 + label.position * 85}%`,
                  // Position horizontally very close to the center (ball path)
                  left: "52%",
                  borderLeft: `4px solid ${label.color}`,
                  color: "white",
                  transform: "translateX(-50%) scale(0.75)",
                  zIndex: 20,
                  maxWidth: "200px",
                  // Add a subtle glow effect
                  boxShadow: `0 0 10px 2px ${label.color}40`,
                  // Position slightly to the left or right randomly
                  marginLeft: `${Math.random() * 40 - 20}px`,
                }}
              >
                <span
                  className="mr-2 inline-block h-3 w-3 rounded-full"
                  style={{ backgroundColor: label.color }}
                ></span>
                {label.name}
              </div>
            ))}
          </div>
        </div>

        {/* SVG Container */}
        <div className="relative flex h-full w-full items-center justify-center">
          {/* Ball - made larger and brighter */}
          <div
            ref={ballRef}
            className="absolute z-10 h-16 w-16 rounded-full bg-blue-500 shadow-lg"
            style={{
              top: "1%",
              boxShadow: "0 0 15px 5px rgba(59, 130, 246, 0.6)",
            }}
          />

          {/* Tunnel SVG */}
          <svg
            ref={tunnelRef}
            className="flex h-full w-full items-center justify-center"
            viewBox="0 0 887 1092"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ maxWidth: "90vh", maxHeight: "90vh" }}
          >
            <g clipPath="url(#clip0_3001_1635)">
              <path
                d="M453.941 1.08228C454.54 2.12132 453.561 71.3778 454.061 78.3115C461.308 178.54 568.647 225.097 653.782 246.957C655 231.251 659.353 215.586 663.726 200.539C673.369 167.47 691.139 140.974 725.541 129.864C754.612 120.473 786.857 125.848 812.074 142.832C819.322 147.728 825.971 153.503 831.861 159.997C865.424 196.943 864.066 256.988 836.473 296.911C802.231 346.426 735.804 342.03 689.482 310.439C688.124 339.672 674.028 380.634 669.915 388.187C652.125 420.798 621.357 442.018 586.017 451.949C551.655 461.62 515.397 461.44 479.697 461.181C357.225 460.301 234.772 459.402 112.299 458.523C98.5025 458.423 84.2866 458.403 71.5082 463.598C42.6371 475.328 40.0615 511.674 69.9708 524.822C82.1901 530.197 95.9868 530.437 109.344 530.017C143.107 528.938 177.868 524.203 209.974 534.753C245.973 546.582 274.724 578.293 283.01 615.299C318.25 621.434 353.511 627.568 388.751 633.702C391.187 634.122 430.52 578.193 436.171 572.379C481.035 526.201 548.281 523.623 608.579 524.902C692.417 526.68 773.959 530.597 834.297 596.676C886.189 653.504 899.966 745.12 869.837 815.556C849.231 863.712 808.68 898.2 767.15 928.113C720.569 961.662 673.369 994.352 626.768 1027.86C603.028 1044.93 571.142 1078.51 543.769 1087.19C522.704 1093.86 489.72 1087.19 467.418 1087.19C507.45 1058.31 547.482 1029.44 587.515 1000.57C645.217 958.944 702.919 917.342 760.622 875.721C822.437 831.141 856.819 771.976 832.44 695.126C812.154 631.165 755.63 578.193 687.166 573.298C633.896 569.481 577.791 564.366 525.2 576.675C508.708 580.531 492.875 586.765 478.559 595.957C472.23 600.013 434.953 641.295 434.793 641.295C474.027 640.716 523.982 654.204 551.436 683.776C581.026 715.647 591.608 762.544 578.61 804.026C560.82 860.774 502.838 886.411 446.513 876.799C352.772 860.794 313.598 752.414 366.529 676.363C366.529 676.363 286.664 663.775 286.464 663.755C287.922 663.975 279.496 691.749 278.897 693.308C270.172 716.087 255.417 736.328 235.231 750.216C148.598 809.821 44.8933 693.508 125.177 619.895C153.35 594.059 197.754 597.975 231.617 607.366C227.804 606.307 218.439 590.422 214.446 587.265C189.349 567.323 151.074 573.018 121.164 572.838C69.4118 572.538 18.1785 567.563 3.28373 508.697C3.28373 508.697 -10.7924 455.286 41.8385 423.375C64.4402 409.668 93.9303 413.724 119.068 413.744C151.293 413.764 183.539 413.804 215.764 413.844C304.753 413.944 393.603 414.403 482.552 416.981C540.814 418.659 613.371 414.244 636.392 349.923C636.392 349.923 646.036 315.054 645.297 292.795C645.097 286.7 568.147 263.402 558.943 259.625C528.914 247.357 499.064 233.09 473.927 212.269C409.037 158.538 408.078 79.0508 408.078 1.14222C408.078 1.14222 451.245 1.14222 453.961 1.14222L453.941 1.08228Z"
                stroke="#646464"
                strokeWidth="3"
                strokeMiterlimit="10"
              />
              <path
                d="M695.611 265.04C695.731 260.764 696.31 255.569 696.809 252.492C700.663 237.266 701.342 221.36 707.112 206.614C708.15 203.956 709.408 201.379 710.845 198.921C728.336 169.388 767.609 162.514 795.322 182.196C821.838 201.019 822.496 236.906 807.083 262.722C797.259 279.167 778.391 286.501 759.862 286.201C737.321 285.821 715.817 273.493 695.571 265.06L695.611 265.04Z"
                stroke="#646464"
                strokeWidth="3"
                strokeMiterlimit="10"
              />
              <path
                d="M414.548 684.696C406.342 701.5 395.82 717.566 391.167 735.869C386.935 752.454 389.47 768.699 394.462 784.784C394.462 784.784 409.297 832.66 471.491 833.619C521.287 834.379 554.032 775.652 532.388 732.212C512.123 691.53 453.961 688.732 414.548 684.696Z"
                stroke="#646464"
                strokeWidth="3"
                strokeMiterlimit="10"
              />
              <path
                d="M243.178 654.523L178.527 644.573C178.527 644.573 147.2 642.075 140.731 675.924C140.731 675.924 138.235 716.726 175.532 722.201C175.532 722.201 219.298 738.127 243.158 654.523H243.178Z"
                stroke="#646464"
                strokeWidth="3"
                strokeMiterlimit="10"
              />
            </g>
            <defs>
              <clipPath id="clip0_3001_1635">
                <rect
                  width="886"
                  height="1091"
                  fill="white"
                  transform="translate(0.587891 0.0632324)"
                />
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default TunnelAnimation;