import { useRef, useEffect } from "react";
import { useScroll } from "framer-motion";
import Lenis from '@studio-freight/lenis';

import Section1 from "./Section1";
import Section2 from "./Section2";
import Section3 from "./Section3";
import Section4 from "./Section5";

export default function Expertise() {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start start", "end end"]
    });

    useEffect(() => {
        if (typeof window === 'undefined') return; // Ensure code runs only on the client

        const lenis = new Lenis({
            smoothWheel: true,
            smoothTouch: true,
            lerp: 0.1, // Adjust smoothness
        });

        // Animation loop
        const animate = (time) => {
            lenis.raf(time); // Use raf to integrate Lenis with requestAnimationFrame
            requestAnimationFrame(animate); // Recursively call animate
        };

        // Start the animation loop
        requestAnimationFrame(animate);

        // Cleanup on unmount
        return () => {
            lenis.destroy();
        };
    }, []);

    return (
        <main ref={container} className="relative h-[400vh] bg-[black]">
            <Section1 scrollYProgress={scrollYProgress} />
            <Section2 scrollYProgress={scrollYProgress} />
            <Section3 scrollYProgress={scrollYProgress} />
            <Section4 scrollYProgress={scrollYProgress} />
        </main>
    );
}
