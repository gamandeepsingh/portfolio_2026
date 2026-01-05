import React, { useEffect, useRef, useState } from 'react';

const SmoothMouseTrail = () => {
  const canvasRef = useRef(null);
  const [points, setPoints] = useState([]);
  const animationRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Resize canvas to full screen
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    const drawSmoothCurve = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      if (points.length < 2) {
        animationRef.current = requestAnimationFrame(drawSmoothCurve);
        return;
      }
      
      // Set line properties
      ctx.lineWidth = 5;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      
      // Create a smooth curve through the points
      ctx.beginPath();
      
      // Start with the first point
      ctx.moveTo(points[0].x, points[0].y);
      
      // Use quadratic curves between points for smoother appearance
      for (let i = 0; i < points.length - 1; i++) {
        const currentPoint = points[i];
        const nextPoint = points[i + 1];
        
        // Calculate control point for the curve
        // This creates a smooth transition between points
        const cpX = (currentPoint.x + nextPoint.x) / 2;
        const cpY = (currentPoint.y + nextPoint.y) / 2;
        
        // Age-based opacity for fading effect
        const age = (Date.now() - currentPoint.time) / 1000; // age in seconds
        const alpha = Math.max(1 - age, 0);
        ctx.strokeStyle = `rgba(37, 85, 220, ${alpha})`;
        
        // Draw a smooth curve to the midpoint
        ctx.quadraticCurveTo(currentPoint.x, currentPoint.y, cpX, cpY);
        ctx.stroke();
        
        // Start a new path from the midpoint
        ctx.beginPath();
        ctx.moveTo(cpX, cpY);
      }
      
      // Animation loop
      animationRef.current = requestAnimationFrame(drawSmoothCurve);
    };
    
    // Start animation
    animationRef.current = requestAnimationFrame(drawSmoothCurve);
    
    // Sample mouse position at regular intervals for smoother curves
    const handleMouseMove = (e) => {
      // Throttle point addition
      const now = Date.now();
      const lastPoint = points[points.length - 1];
      
      // Only add points if they're significantly different or it's been some time
      if (!lastPoint || 
          now - lastPoint.time > 16 || // Approximately 60fps
          Math.abs(e.clientX - lastPoint.x) > 5 || 
          Math.abs(e.clientY - lastPoint.y) > 5) {
        setPoints(prevPoints => [
          ...prevPoints,
          { x: e.clientX, y: e.clientY, time: now }
        ]);
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Remove old points periodically
    const cleanup = setInterval(() => {
      const cutoff = Date.now() - 1000; // remove points older than 1 sec
      setPoints(prevPoints => prevPoints.filter(p => p.time > cutoff));
    }, 50);
    
    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resizeCanvas);
      clearInterval(cleanup);
    };
  }, [points]);
  
  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    />
  );
};

export default SmoothMouseTrail;