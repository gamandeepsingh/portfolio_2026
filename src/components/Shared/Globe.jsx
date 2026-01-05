import React, { useRef, useEffect, forwardRef } from 'react';
import GlobeGL from 'react-globe.gl';

const Globe = forwardRef(({ width = 350, height = 350 }, ref) => {
  const globeEl = useRef();

  useEffect(() => {
    if (!globeEl.current) return;

    // Configure globe controls
    globeEl.current.controls().enableZoom = false;
    globeEl.current.controls().autoRotate = true;
    globeEl.current.controls().autoRotateSpeed = 0.3;

    // Add error handling for globe initialization
    try {
      globeEl.current.pointOfView({ lat: 0, lng: 0, altitude: 1.5 });
    } catch (error) {
      console.error('Globe initialization error:', error);
    }
  }, []);


  return (
    <div ref={ref} style={{
      width: `${width}px`,
      height: `${height}px`,
      pointerEvents: 'auto',
      transformOrigin: 'center center'
    }}>
      <GlobeGL
        ref={globeEl}
        width={width}
        height={height}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        backgroundColor="rgba(0,0,0,0)"
        pathPoints="coords"
        pathColor={() => 'rgba(255, 255, 255, 0.3)'}
        pathStroke={() => 0.5}
        pathDashLength={0}
        pathDashGap={0}
        animateIn={false}
        enablePointerInteraction={true}
        onGlobeReady={() => console.log('Globe ready')}
        onGlobeClick={() => console.log('Globe clicked')}
      />
    </div>
  );
});

export default Globe;