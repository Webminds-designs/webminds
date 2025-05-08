"use client";

import { useState, useEffect } from "react";
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
    // fallback timeout (in case GSAP onComplete never fires)
    const timer = setTimeout(() => setLoading(false), 3500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <Preloader onFinish={() => setLoading(false)} />
      ) : (
        <>
          <ScrollToTop />
          <LiveNoise />
          {children}
        </>
      )}
    </>
  );
}
