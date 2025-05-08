"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface PreloaderProps {
  onFinish: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);
  const [stageText, setStageText] = useState("Initializing...");

  const logoRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame: number;

    const updateProgress = (target: number, speed = 0.5) => {
      frame = requestAnimationFrame(() => {
        setProgress((prev) => {
          const next = prev + speed;

          if (next >= 0 && next < 25) setStageText("Hydrating app...");
          else if (next >= 25 && next < 50) setStageText("Loading fonts...");
          else if (next >= 50 && next < 90) setStageText("Loading images...");
          else if (next >= 90 && next < 100) setStageText("Finalizing...");

          if (next < target) {
            updateProgress(target, speed);
            return next;
          } else {
            return target;
          }
        });
      });
    };

    updateProgress(25);

    const logoPulse = gsap.to(logoRef.current, {
      scale: 1.05,
      opacity: 0.9,
      duration: 1.2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });

    document.fonts.ready.then(() => updateProgress(50));

    const allImages = Array.from(document.images);
    let loadedImages = 0;

    if (allImages.length === 0) {
      updateProgress(90);
    } else {
      allImages.forEach((img) => {
        if (img.complete) {
          loadedImages++;
          if (loadedImages === allImages.length) updateProgress(90);
        } else {
          img.onload = img.onerror = () => {
            loadedImages++;
            if (loadedImages === allImages.length) updateProgress(90);
          };
        }
      });
    }

    const handleLoad = () => {
      updateProgress(100);
      logoPulse.kill();

      const tl = gsap.timeline();

      tl.to(logoRef.current, {
        scale: 1.2,
        duration: 0.5,
        ease: "power3.out",
      }).to(wrapperRef.current, {
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        onComplete: onFinish,
      });
    };

    window.addEventListener("load", handleLoad);

    return () => {
      cancelAnimationFrame(frame);
      logoPulse.kill();
      window.removeEventListener("load", handleLoad);
    };
  }, [onFinish]);

  return (
    <>
      <div
        ref={wrapperRef}
        className="preloader-wrapper fixed top-0 left-0 w-screen h-screen z-[9999] flex flex-col items-center justify-center text-white transition-opacity duration-500 overflow-hidden animate-gradient"
      >
        {/* Logo */}
        <div
          ref={logoRef}
          className="font-bold md:text-6xl text-3xl tracking-wider scale-50 opacity-0 transition-all duration-500 z-10"
          style={{ color: "#f6f6f6" }}
        >
          <span className="font-Poppins">WebMinds</span>
          <span className="text-[10px] md:text-[30px] mt-[2px] align-top">
            ™
          </span>
        </div>

        {/* Progress Counter */}
        <p className="mt-12 text-lg tracking-widest font-mono z-10">
          Loading... {Math.min(Math.round(progress), 100)}%
        </p>

        {/* Stage Message */}
        <p className="mt-2 text-xs text-gray-400 animate-pulse z-10">
          {stageText}
        </p>
      </div>

      {/* 🔥 Gradient animation styles */}
      <style jsx global>{`
        @keyframes gradientFlow {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-gradient {
          background: linear-gradient(to top, #1e222b, #0a0a0a, #0e0e0f);
          background-size: 400% 400%;
          animation: gradientFlow 8s ease infinite;
        }
      `}</style>
    </>
  );
};

export default Preloader;
