import React, { useRef, useEffect } from "react";
import Lottie from "lottie-react";
import animation from "../../public/animation.json";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const lottieRef = useRef<any>(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!lottieRef.current || !containerRef.current) return;

    const totalFrames = lottieRef.current.getDuration(true);

    // Reverse the animation from last frame to first on load
    const reverseAnimation = () => {
      let currentFrame = totalFrames - 3;
      const interval = setInterval(() => {
        if (currentFrame <= 0) {
          clearInterval(interval);
        } else {
          currentFrame -= 1;
          lottieRef.current.goToAndStop(currentFrame, true);
        }
      }, 250); // Adjust speed of reversal
    };

    reverseAnimation();

    // Set up GSAP ScrollTrigger
    ScrollTrigger.create({
      trigger: containerRef.current, // Trigger animation when this element is in view
      start: "top top", // Start when the top of the component hits the top of the viewport
      end: "bottom top", // End when the bottom of the component hits the top of the viewport
      scrub: true, // Smoothly scrub through the animation as the user scrolls
      onUpdate: (self) => {
        // Calculate the frame based on scroll progress
        const frame = Math.floor(self.progress * totalFrames);
        lottieRef.current.goToAndStop(frame, true);
      },
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-fit h-screen bg-black fixed top-0 left-0 flex items-center justify-center -z-10 overflow-hidden"
    >
      <div className="w-fit h-full overflow-hidden">
        <Lottie
          lottieRef={lottieRef}
          animationData={animation}
          loop={false}
          autoplay={false}
          className="w-screen  object-cover overflow-hidden"
        />
      </div>
    </div>
  );
};

export default Hero;
