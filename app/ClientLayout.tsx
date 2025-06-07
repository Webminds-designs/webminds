"use client";

import { useEffect, useState } from "react";
import Preloader from "./Components/PreLoader";
import ScrollToTop from "./Components/ScrollToTop";
import LiveNoise from "./Components/LiveNoise";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ✅ Handle chunk load errors
    const onChunkError = (e: ErrorEvent) => {
      if (
        e?.message?.includes("Loading chunk") ||
        e?.filename?.includes(".js")
      ) {
        console.warn("Chunk load failed, reloading...");
        window.location.reload();
      }
    };

    window.addEventListener("error", onChunkError);

    // ✅ Failsafe: Automatically finish preloader after 60 seconds
    const timeout = setTimeout(() => {
      setLoading(false);
      console.warn("Preloader timeout — forcing page load after 60s.");
    }, 60000); // ⏱ 60,000ms = 60 seconds

    return () => {
      window.removeEventListener("error", onChunkError);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <>
      <ScrollToTop />
      <LiveNoise />
      {loading ? <Preloader onFinish={() => setLoading(false)} /> : children}
    </>
  );
}
