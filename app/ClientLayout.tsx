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
    // ✅ Auto-reload on chunk load failure
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

    const timer = setTimeout(() => setLoading(false), 100); // Or let Preloader handle real loading
    return () => {
      clearTimeout(timer);
      window.removeEventListener("error", onChunkError);
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
