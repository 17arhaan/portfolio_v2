'use client';

import { useEffect, useRef, useState } from 'react';

export function MouseAnimation() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>();

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial check
    checkMobile();

    // Add resize listener
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    if (isMobile) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = (time: number) => {
      if (previousTimeRef.current !== undefined) {
        // Smooth cursor movement with easing
        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;

        if (cursorRef.current) {
          cursorRef.current.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
        }
      }
      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed pointer-events-none z-[9999] will-change-transform"
      style={{
        left: '0',
        top: '0',
        transform: 'translate3d(0, 0, 0)',
      }}
    >
      <div
        className="bg-primary rounded-full shadow-[0_0_15px_rgba(99,102,241,0.7)]"
        style={{
          width: '8px',
          height: '8px',
          transform: 'translate(-50%, -50%)',
          willChange: 'transform',
        }}
      />
    </div>
  );
} 