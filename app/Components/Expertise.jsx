import { useRef, useEffect } from "react";
import { useScroll } from "framer-motion";
import dynamic from 'next/dynamic';  // If you're using Next.js

const Lenis = dynamic(() => import('@studio-freight/lenis'), { ssr: false });

import Section1 from "./Section1";
import Section2 from "./Section2";
import Section3 from "./Section3";
import Section4 from "./Section4";

export default function Expertise() {
    const container = useRef();
    const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"]
    })

    useEffect( () => {
        const lenis = new Lenis()
        function raf(time) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }
        requestAnimationFrame(raf)    
        }, [])

    return (
      <main ref={container} className="relative h-[400vh]">
        <Section1 scrollYProgress={scrollYProgress} />
        <Section2  scrollYProgress={scrollYProgress}/>
        <Section3 scrollYProgress={scrollYProgress} />
        <Section4  scrollYProgress={scrollYProgress}/>
      </main>
    );
}