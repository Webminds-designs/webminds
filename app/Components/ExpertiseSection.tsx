import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import styles from "../styles/expertise.module.css";

gsap.registerPlugin(ScrollTrigger);

const expertiseData = [
  { title: "Web Design", description: "Building strong and lasting brands." },
  { title: "Social Media", description: "Creating impactful digital experiences." },
  { title: "Branding & design", description: "Producing engaging and original content." },
  { title: "Social Media", description: "Building communities and fostering growth." },
];

const ExpertiseSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const scroll = scrollRef.current;

    if (container && scroll) {
      gsap.to(scroll, {
        x: () => -(scroll.scrollWidth - container.offsetWidth),
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${scroll.scrollWidth - container.offsetWidth}`,
          scrub: true,
          pin: true,
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className={styles.expertiseContainer}>
      <div ref={scrollRef} className={styles.scrollWrapper}>
        {expertiseData.map((item, index) => (
          <div key={index} className={styles.card}>
            <h2 className={styles.title}>{item.title}</h2>
            <p className={styles.description}>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpertiseSection;
