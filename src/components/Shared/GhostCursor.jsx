import { useEffect, useRef } from 'react';

const GhostCursor = () => {
  const ghostRef = useRef(null);
  const eyesRef = useRef(null);
  const mouthRef = useRef(null);

  useEffect(() => {
    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let clicked = false;

    const getMouse = (e) => {
      mouse.x = e.clientX ?? e.pageX ?? (e.touches?.[0]?.pageX ?? window.innerWidth / 2);
      mouse.y = e.clientY ?? e.pageY ?? (e.touches?.[0]?.pageY ?? window.innerHeight / 2);
    };

    const onMouseDown = (e) => { e.preventDefault(); clicked = true; };
    const onMouseUp = () => { clicked = false; };

    ['mousemove', 'touchstart', 'touchmove'].forEach(ev => window.addEventListener(ev, getMouse));
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    const map = (num, inMin, inMax, outMin, outMax) =>
      (num - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;

    let rafId;

    const follow = () => {
      const distX = mouse.x - pos.x;
      const distY = mouse.y - pos.y;

      const velX = distX / 8;
      const velY = distY / 8;

      pos.x += distX / 10;
      pos.y += distY / 10;

      const skewX     = map(velX, 0, 100, 0, -50);
      const scaleY    = map(velY, 0, 100, 1, 2.0);
      const scaleEyeX = map(Math.abs(velX), 0, 100, 1, 1.2);
      let scaleEyeY   = map(Math.abs(velX * 2), 0, 100, 1, 0.1);
      let scaleMouth  = Math.min(
        Math.max(
          map(Math.abs(velX * 1.5), 0, 100, 0, 10),
          map(Math.abs(velY * 1.2), 0, 100, 0, 5)
        ),
        2
      );

      if (clicked) {
        scaleEyeY = 0.4;
        scaleMouth = -scaleMouth;
      }

      if (ghostRef.current) {
        ghostRef.current.style.transform =
          `translate(${pos.x}px, ${pos.y}px) scale(.7) skew(${skewX}deg) rotate(${-skewX}deg) scaleY(${scaleY})`;
      }
      if (eyesRef.current) {
        eyesRef.current.style.transform =
          `translateX(-50%) scale(${scaleEyeX}, ${scaleEyeY})`;
      }
      if (mouthRef.current) {
        mouthRef.current.style.transform =
          `translate(${-skewX * 0.5 - 10}px) scale(${scaleMouth})`;
      }

      rafId = requestAnimationFrame(follow);
    };

    rafId = requestAnimationFrame(follow);

    return () => {
      cancelAnimationFrame(rafId);
      ['mousemove', 'touchstart', 'touchmove'].forEach(ev => window.removeEventListener(ev, getMouse));
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  return (
    <>
      <div id="ghost" ref={ghostRef} className="ghost">
        <div className="ghost__head">
          <div ref={eyesRef} className="ghost__eyes" />
          <div ref={mouthRef} className="ghost__mouth" />
        </div>
        <div className="ghost__tail">
          <div className="ghost__rip" />
        </div>
      </div>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}
      >
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="ghost-blur" />
            <feColorMatrix
              in="ghost-blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 16 -7"
              result="ghost-gooey"
            />
          </filter>
        </defs>
      </svg>
    </>
  );
};

export default GhostCursor;
