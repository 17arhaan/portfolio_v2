'use client';

import { useEffect, useState } from 'react';

export function MouseAnimation() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      className="fixed pointer-events-none z-50 mix-blend-difference"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <div
        className="bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.7)]"
        style={{
          width: '7px',
          height: '7px',
        }}
      />
    </div>
  );
} 