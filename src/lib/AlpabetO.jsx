import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { GiDiamonds } from "react-icons/gi";

const AlpabetO = () => {
  const [isHovered, setIsHovered] = useState(false);

  // Use em-based sizing for responsiveness
  const size = '1em'; // same as current font size
  const iconSize = 'text-[0.5em]'; // icon smaller than circle
  const particleDistance = 1.5; // distance in em units
  const particleSize = 'w-[0.25em] h-[0.25em]';

  const circleVariants = {
    initial: {
      scale: 1,
      backgroundColor: "#2555DC"
    },
    hover: {
      scale: 1.1,
      backgroundColor: "#333",
      transition: { duration: 0.3, ease: "easeInOut" }
    }
  };

  const iconVariants = {
    initial: { rotate: 0, scale: 1 },
    hover: {
      rotate: 180,
      scale: 1.2,
      transition: { duration: 0.4, ease: "easeInOut" }
    }
  };

  const particleCount = 8;
  const particles = Array.from({ length: particleCount });

  return (
    <motion.span
      className="bg-primary aspect-square rounded-full flex items-center justify-center relative overflow-visible mx-1"
      style={{ width: size, height: size }}
      variants={circleVariants}
      initial="initial"
      animate={isHovered ? "hover" : "initial"}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        variants={iconVariants}
        initial="initial"
        animate={isHovered ? "hover" : "initial"}
      >
        <GiDiamonds className={`${iconSize} text-white`} />
      </motion.div>

      {isHovered && particles.map((_, index) => (
        <motion.div
          key={index}
          className={`absolute ${particleSize} bg-white rounded-full`}
          initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
          animate={{
            x: `${Math.cos(index * (2 * Math.PI / particleCount)) * particleDistance}em`,
            y: `${Math.sin(index * (2 * Math.PI / particleCount)) * particleDistance}em`,
            opacity: 0,
            scale: 1.5
          }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        />
      ))}
    </motion.span>
  );
};

export default AlpabetO;
