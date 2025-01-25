import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const Bigfontloop = () => {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const textElement = textRef.current;

    if (textElement) {
      const chars = textElement.querySelectorAll("span");

      // Step 1: Character-by-character animation on load
      gsap.fromTo(
        chars,
        { opacity: 0, y: 50 }, // Initial state
        {
          opacity: 1,
          y: 0, // Final state
          duration: 0.5, // Duration for each character
          stagger: 0.05, // Stagger animation for each character
          ease: "power2.out",
          onStart: () => {
            // Step 2: Start Infinite Slide Animation
            gsap.to(textElement, {
              x: "-100%", // Slide the text off the left
              duration: 60, // Duration for one loop
              repeat: -1, // Infinite loop
              ease: "linear", // Smooth constant speed
            });
          },
        }
      );
    }
  }, []);

  return (
    <>
      <div className="w-screen overflow-hidden absolute bottom-0 pb-8">
        <div
          ref={textRef}
          className="text-[180px] opacity-65 font-semibold whitespace-nowrap pl-"
          style={{ display: "inline-block" }}
        >
          {/* Wrap each character in a <span> for individual animations */}
          {"Crafting Beyond Ordinary Minds - Crafting Beyond Ordinary Minds - Crafting Beyond Ordinary Minds -"
            .split("")
            .map((char, index) => (
              <span
                key={index}
                className="inline-block" // Ensures proper alignment of characters
              >
                {char === " " ? "\u00A0" : char} {/* Handle spaces */}
              </span>
            ))}
        </div>
      </div>
      {/* space for other contect */}
      <div className="w-screen h-screen"></div>
    </>
  );
};

export default Bigfontloop;
