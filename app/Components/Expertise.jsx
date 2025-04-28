"use client";

import { useRef, useEffect, useState } from "react";
import { useScroll } from "framer-motion";
import Lenis from "@studio-freight/lenis";
import { useRouter } from 'next/navigation';

import Section1 from "./Section1";
import Section2 from "./Section2";
import Section3 from "./Section3";
import Section4 from "./Section5";

export default function Expertise() {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start start", "end end"],
    });

    const router = useRouter();

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

    const navigateTo = (path) => {
        router.push(path);
    };

    return (
        <main ref={container} className="relative h-[405vh] bg-[black]">
                <Section1 scrollYProgress={scrollYProgress} />
                <Section2 scrollYProgress={scrollYProgress} />
                <Section3 scrollYProgress={scrollYProgress} />
                <Section4 scrollYProgress={scrollYProgress} />

        <hr className="border-t-20 border-gray-800 w-[90%] mx-auto bg-black/75" />
        </main>
    );
}
