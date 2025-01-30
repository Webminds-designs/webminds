"use client";

import React, { useEffect, useState } from "react";

interface CursorProps {
  hovering: boolean;
}

const CustomCursor: React.FC<CursorProps> = ({ hovering }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 w-24 h-24  bg-[#393CEC] bg-opacity-80 rounded-full flex items-center justify-center
      pointer-events-none transition-transform duration-150 
      ${hovering ? "opacity-100 scale-100" : "opacity-0 scale-50"}`}
      style={{
        transform: `translate(${position.x - 48}px, ${position.y - 48}px)`, // Center cursor
        zIndex: 50, // Ensure it's above other elements
      }}
    >
      <span className="text-white text-lg font-normal">View</span>
    </div>
  );
};

export default CustomCursor;
