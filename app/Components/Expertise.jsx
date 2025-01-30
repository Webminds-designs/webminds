import { useRef, useEffect, useState } from "react";
import { useScroll } from "framer-motion";
import Lenis from "@studio-freight/lenis";
import Section1 from "./Section1";
import Section2 from "./Section2";
import Section3 from "./Section3";
import Section4 from "./Section5";
import CustomCursor from "./CustomCursor";

export default function Expertise() {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start start", "end end"],
    });

    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const lenis = new Lenis({
            smoothWheel: true,
            smoothTouch: true,
            lerp: 0.1,
        });

        const animate = (time) => {
            lenis.raf(time);
            requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate);

        return () => {
            lenis.destroy();
        };
    }, []);

    return (
        <main ref={container} className="relative h-[405vh] bg-[black]">
            <CustomCursor isHovering={isHovering} />
            <div
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
            >
                <Section1 scrollYProgress={scrollYProgress} />
                <Section2 scrollYProgress={scrollYProgress} />
                <Section3 scrollYProgress={scrollYProgress} />
                <Section4 scrollYProgress={scrollYProgress} />
            </div>
        </main>
    );
}
