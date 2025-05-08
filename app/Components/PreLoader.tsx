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
  const wrapperRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  // ✅ Smooth loading progress loop
  useEffect(() => {
    let rafId: number;
    const tick = () => {
      setProgress((prev) => {
        const delta = targetProgress - prev;
        const step = Math.max(0.3, delta * 0.05);
        return Math.min(prev + step, targetProgress);
      });
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [targetProgress]);

  // ✅ Stage updates based on % progress
  useEffect(() => {
    if (progress < 25) setStageText("Hydrating app...");
    else if (progress < 50) setStageText("Loading fonts...");
    else if (progress < 90) setStageText("Loading images...");
    else if (progress < 100) setStageText("Finalizing...");
    else setStageText("Complete!");
  }, [progress]);

  // ✅ Cursor-following glow logic
  useEffect(() => {
    const move = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  // ✅ Preloader progress logic
  useEffect(() => {
    const logoPulse = gsap.to(logoRef.current, {
      scale: 1.05,
      opacity: 0.9,
      duration: 1.2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });

    setTargetProgress(25);

    document.fonts.ready.then(() => setTargetProgress(50));

    const images = Array.from(document.images);
    let loaded = 0;
    const total = images.length;
    const done = () => {
      loaded++;
      if (loaded === total) setTargetProgress(90);
    };

    if (total === 0) setTargetProgress(90);
    else {
      images.forEach((img) => {
        img.complete ? done() : (img.onload = img.onerror = done);
      });
    }

    const handleLoad = () => {
      setTargetProgress(100);
      logoPulse.kill();
      gsap
        .timeline()
        .to(logoRef.current, { scale: 1.2, duration: 0.5, ease: "power3.out" })
        .to(wrapperRef.current, {
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          onComplete: onFinish,
        });
    };

    window.addEventListener("load", handleLoad);

    return () => {
      logoPulse.kill();
      window.removeEventListener("load", handleLoad);
    };
  }, [onFinish]);

  return (
    <>
      <div
        ref={wrapperRef}
        className="preloader-wrapper fixed top-0 left-0 w-screen h-screen z-[9999] flex flex-col items-center justify-center text-white transition-opacity duration-500 overflow-hidden bg-gradient"
      >
        {/* ✨ Blue glow follows cursor */}
        <div
          ref={glowRef}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "250px",
            height: "250px",
            borderRadius: "9999px",
            backgroundColor: "rgba(59, 130, 246, 0.2)", // Tailwind blue-500
            filter: "blur(60px)",
            pointerEvents: "none",
            transform: "translate(-50%, -50%)",
            transition: "transform 0.1s ease",
            zIndex: 0,
          }}
        />

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

        {/* Progress */}
        <p className="mt-12 text-lg tracking-widest font-mono z-10">
          Loading... {Math.round(progress)}%
        </p>

        {/* Stage text */}
        <p className="mt-2 text-xs text-gray-400 animate-pulse z-10">
          {stageText}
        </p>
      </div>

      {/* 🌌 Background gradient animation */}
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

        .bg-gradient {
          background: linear-gradient(to top, #1e222b, #0a0a0a, #0e0e0f);
          background-size: 400% 400%;
          animation: gradientFlow 8s ease infinite;
        }
      `}</style>
    </>
  );
};

export default Preloader;
