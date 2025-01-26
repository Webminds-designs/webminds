import { useRef, useEffect } from "react";
import { useScroll } from "framer-motion";
import dynamic from 'next/dynamic';

const Lenis = dynamic(() => import('@studio-freight/lenis'), { ssr: false });

import Section1 from "./Section1";
import Section2 from "./Section2";
import Section3 from "./Section3";
import Section4 from "./Section4";

export default function Expertise() {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start start", "end end"]
    });

    useEffect(() => {
        const lenis = new Lenis({
            smoothWheel: true,
            smoothTouch: true,
            lerp: 0.1
        });

        // Lenis instance doesn't need explicit start() — raf is called directly
        function animate(time) {
            lenis.raf(time);
            requestAnimationFrame(animate);
        }

        // Start the animation loop
        requestAnimationFrame(animate);

        // Cleanup on component unmount
        return () => {
            lenis.destroy();
        };
    }, []);

    return (
        <main ref={container} className="relative h-[400vh]">
            <Section1 scrollYProgress={scrollYProgress} />
            <Section2 scrollYProgress={scrollYProgress} />
            <Section3 scrollYProgress={scrollYProgress} />
            <Section4 scrollYProgress={scrollYProgress} />
        </main>
    );
}
