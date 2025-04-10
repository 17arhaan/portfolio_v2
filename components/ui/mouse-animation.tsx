'use client';

import { useEffect, useRef } from 'react';

export function MouseAnimation() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        // Direct DOM manipulation for zero latency
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    // Use requestAnimationFrame for smooth updates
    let animationFrameId: number;
    const animate = () => {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed pointer-events-none z-[9999] mix-blend-difference will-change-transform"
      style={{
        left: '0',
        top: '0',
        transform: 'translate3d(0, 0, 0)',
      }}
    >
      <div
        className="bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.7)]"
        style={{
          width: '7px',
          height: '7px',
          transform: 'translate(-50%, -50%)',
          willChange: 'transform',
        }}
      />
    </div>
  );
} 