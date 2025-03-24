'use client';

import { useEffect, useState } from 'react';

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updatePosition);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-50"
      style={{
        transform: `translate(${position.x - 4}px, ${position.y - 4}px)`,
      }}
    />
  );
} 