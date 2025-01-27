import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Hero: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return; // Ensure code runs only on the client

    const video = videoRef.current;
    if (!video || !containerRef.current) return;

    const handleLoadedMetadata = () => {
      if (!isNaN(video.duration)) {
        console.log("Video metadata loaded"); // Debug log
        console.log("Video duration:", video.duration); // Debug log

        // Set initial video state
        video.currentTime = 0;
        video.pause();

        // Scroll-based animation
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top top", // Start when the top of the component hits the top of the viewport
          end: "bottom top", // End when the bottom of the component hits the top of the viewport
          scrub: true, // Smoothly scrub through the animation as the user scrolls
          onUpdate: (self) => {
            const time = self.progress * video.duration;
            video.currentTime = time;
          },
        });
      } else {
        console.error("Video duration is invalid");
      }
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("error", (e) => {
      console.error("Video error:", e); // Debug log
    });

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill()); // Clean up ScrollTrigger instances
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-black flex items-center justify-center -z-10"
      style={{ height: "100dvh" }} // Ensure full device height
    >
      <video
        ref={videoRef}
        src="/assets/0124.mp4" // Ensure the file path is correct
        className="w-full h-full object-cover"
        muted
        playsInline
      />
    </div>
  );
};

export default Hero;
