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
    // Fallback timeout for preloader
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 10000); // Max 7 seconds

    // Chunk load error fallback
    const handleChunkError = (e: ErrorEvent) => {
      if (/ChunkLoadError/.test(e.message)) {
        document.body.innerHTML = `
          <div style="color:white;text-align:center;padding-top:20%;background:black;height:100vh">
            <h2 style="font-family:sans-serif;">Connection is slow or interrupted.</h2>
            <button onclick="location.reload()" style="margin-top:20px;padding:10px 20px;font-size:16px;cursor:pointer;">Retry</button>
          </div>
        `;
      }
    };

    window.addEventListener("error", handleChunkError);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("error", handleChunkError);
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
