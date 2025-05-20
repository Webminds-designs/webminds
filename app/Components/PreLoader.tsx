// app/Components/PreLoader.tsx
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
  const [isSlowNetwork, setIsSlowNetwork] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  // We'll mirror the current progress here so our load-handler sees updates
  const progressRef = useRef(0);

  // 1️⃣ Smooth progress interpolation (runs whenever targetProgress changes)
  useEffect(() => {
    let rafId: number;
    const tick = () => {
      setProgress((prev) => {
        const delta = targetProgress - prev;
        const step = Math.max(0.3, delta * 0.05);
        const next = Math.min(prev + step, targetProgress);
        progressRef.current = next;
        return next;
      });
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [targetProgress]);

  // 2️⃣ Update the “stage” text based on progress
  useEffect(() => {
    if (progress < 25) setStageText("Hydrating app...");
    else if (progress < 50) setStageText("Loading fonts...");
    else if (progress < 90) setStageText("Loading images...");
    else if (progress < 100) setStageText("Finalizing...");
    else setStageText("Complete!");
  }, [progress]);

  // 3️⃣ Glow follows the cursor
  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  // 4️⃣ Main loader logic (runs once on mount)
  useEffect(() => {
    // — network-speed check
    // Define NetworkInformation type if not present
    type NetworkInformation = {
      effectiveType?: string;
    };

    const nav = navigator as Navigator & {
      connection?: NetworkInformation;
      mozConnection?: NetworkInformation;
      webkitConnection?: NetworkInformation;
    };
    const conn = nav.connection || nav.mozConnection || nav.webkitConnection;
    if (
      conn?.effectiveType &&
      ["slow-2g", "2g", "3g", "4g"].includes(conn.effectiveType)
    ) {
      setIsSlowNetwork(true);
    }

    // — chunk-error fallback
    const errorHandler = (e: ErrorEvent) => {
      if (e.message?.includes("ChunkLoadError")) setIsSlowNetwork(true);
    };
    window.addEventListener("error", errorHandler);

    // kick off at 25%
    setTargetProgress(25);

    // logo intro
    gsap.to(logoRef.current, {
      scale: 1,
      opacity: 1,
      duration: 1.2,
      ease: "power2.out",
    });

    // fonts →
    document.fonts.ready.then(() => setTargetProgress(50));

    // images + fallback
    const images = Array.from(document.images);
    let loadedCount = 0;
    const total = images.length;
    let fallbackTriggered = false;
    const fallbackTimeout = setTimeout(() => {
      fallbackTriggered = true;
      console.warn("Some images didn’t load in time—continuing anyway.");
      setTargetProgress(90);
    }, 7000);

    const markDone = () => {
      loadedCount++;
      if (loadedCount === total && !fallbackTriggered) {
        clearTimeout(fallbackTimeout);
        setTargetProgress(90);
      }
    };

    if (total === 0) {
      clearTimeout(fallbackTimeout);
      setTargetProgress(90);
    } else {
      images.forEach((img) => {
        if (img.complete) markDone();
        else {
          img.onload = markDone;
          img.onerror = markDone;
        }
      });
    }

    // final window.load → 100% + exit anim
    const handleLoad = () => {
      setTargetProgress(100);
      const chk = setInterval(() => {
        if (progressRef.current >= 99.9) {
          clearInterval(chk);
          gsap
            .timeline()
            .to(logoRef.current, {
              scale: 1.2,
              duration: 0.5,
              ease: "power3.out",
            })
            .to(wrapperRef.current, {
              opacity: 0,
              duration: 0.8,
              ease: "power2.out",
              onComplete: onFinish,
            });
        }
      }, 100);
    };
    window.addEventListener("load", handleLoad);

    return () => {
      window.removeEventListener("load", handleLoad);
      window.removeEventListener("error", errorHandler);
      clearTimeout(fallbackTimeout);
    };
  }, [onFinish]);

  return (
    <>
      <div
        ref={wrapperRef}
        className="preloader-wrapper fixed inset-0 z-[9999] flex flex-col items-center justify-center text-white overflow-hidden bg-gradient transition-opacity duration-500"
      >
        <div
          ref={glowRef}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "250px",
            height: "250px",
            borderRadius: "9999px",
            backgroundColor: "rgba(59, 130, 246, 0.2)",
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

        {/* % */}
        <p className="mt-12 text-lg tracking-widest font-mono z-10">
          Loading... {Math.round(progress)}%
        </p>

        {/* Stage */}
        <p className="mt-2 text-xs text-gray-400 animate-pulse z-10">
          {stageText}
        </p>

        {/* Slow-network warning */}
        {isSlowNetwork && (
          <p className="mt-4 text-xs text-red-400 text-center max-w-xs z-10">
            Your network seems slow. Please wait while we load the app.
          </p>
        )}
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
