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
          onComplete: () => {
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

      // GSAP hover effect
      const handleMouseEnter = () => {
        gsap.to(textElement, {
          color: "transparent", // Change text color
          webkitTextStroke: "3px #afa18f", // Add white stroke
          duration: 0.3,
        });
      };

      const handleMouseLeave = () => {
        gsap.to(textElement, {
          color: "", // Reset text color
          webkitTextStroke: "0px", // Remove stroke
          duration: 0.3,
        });
      };

      // Add event listeners for hover effects
      textElement.addEventListener("mouseenter", handleMouseEnter);
      textElement.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        // Cleanup event listeners
        textElement.removeEventListener("mouseenter", handleMouseEnter);
        textElement.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, []);

  return (
    <>
      <div className="w-screen overflow-hidden absolute bottom-0 pb-8">
        <div
          ref={textRef}
          className="text-[180px] opacity-65 text-text font-semibold whitespace-nowrap"
          style={{ display: "inline-block", fontFamily: "eight, sans-serif" }}
          // style={{ fontFamily: 'eight, sans-serif', fontWeight: 400, fontStyle: 'normal' }}
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
      {/* space for other content */}
      <div className="w-screen h-screen"></div>
    </>
  );
};

export default Bigfontloop;
