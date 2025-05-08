"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface PreloaderProps {
  onFinish: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);
  const [targetProgress, setTargetProgress] = useState(0);
  const [stageText, setStageText] = useState("Initializing...");

  const logoRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId: number;

    const tick = () => {
      setProgress((prev) => {
        const delta = targetProgress - prev;
        const step = Math.max(0.3, delta * 0.05);
        const next = Math.min(prev + step, targetProgress);
        return next;
      });
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafId);
  }, [targetProgress]);

  useEffect(() => {
    const logoPulse = gsap.to(logoRef.current, {
      scale: 1.05,
      opacity: 0.9,
      duration: 1.2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });

    setTargetProgress(25); // Initial hydration

    document.fonts.ready.then(() => {
      setStageText("Loading fonts...");
      setTargetProgress(50);
    });

    const allImages = Array.from(document.images);
    let loaded = 0;
    const total = allImages.length;

    if (total === 0) {
      setStageText("Loading images...");
      setTargetProgress(90);
    } else {
      allImages.forEach((img) => {
        if (img.complete) {
          loaded++;
          if (loaded === total) {
            setStageText("Loading images...");
            setTargetProgress(90);
          }
        } else {
          img.onload = img.onerror = () => {
            loaded++;
            if (loaded === total) {
              setStageText("Loading images...");
              setTargetProgress(90);
            }
          };
        }
      });
    }

    window.addEventListener("load", () => {
      setStageText("Finalizing...");
      setTargetProgress(100);

      const tl = gsap.timeline();

      logoPulse.kill();

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
    });

    return () => {
      logoPulse.kill();
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
          Loading... {Math.round(progress)}%
        </p>

        {/* Stage Message */}
        <p className="mt-2 text-xs text-gray-400 animate-pulse z-10">
          {stageText}
        </p>
      </div>

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
