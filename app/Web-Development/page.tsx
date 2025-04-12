'use client';

import React, { useEffect, useRef } from "react";
import Nav from "../Components/Nav";
import Footer from "../Components/Footer";
import Image from "next/image";
import styles from "./slider.module.css";

import gsap from "gsap";
import { ScrollTrigger } from 'gsap/all';

const page = () => {
  const firstText = useRef(null);
  const secondText = useRef(null);
  const slider = useRef(null);

  const headingRef = useRef(null);
  const paraRef = useRef(null);
  const imageRef = useRef(null);
  const sliderTextRef = useRef(null);

  let xPercent = 0;
  let direction = 1;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Scroll-based slider
    gsap.to(slider.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        scrub: 0.25,
        start: 0,
        end: window.innerHeight,
        onUpdate: e => direction = e.direction * -1
      },
      x: "-300px",
    });
    requestAnimationFrame(animate);

    // Reveal animations
    gsap.from(imageRef.current, {
      opacity: 0,
      scale: 1.05,
      duration: 1.5,
      ease: "power2.out"
    });

    gsap.from(sliderTextRef.current, {
      opacity: 0,
      y: 30,
      duration: 1,
      delay: 0.3,
      ease: "power2.out"
    });

    gsap.from(headingRef.current, {
      scrollTrigger: {
        trigger: headingRef.current,
        start: "top 80%",
      },
      opacity: 0,
      y: 40,
      duration: 1,
      ease: "power3.out"
    });

    gsap.from(paraRef.current, {
      scrollTrigger: {
        trigger: paraRef.current,
        start: "top 85%",
      },
      opacity: 0,
      y: 30,
      duration: 1.2,
      delay: 0.2,
      ease: "power3.out"
    });

  }, []);

  const animate = () => {
    if (xPercent < -100) {
      xPercent = 0;
    } else if (xPercent > 0) {
      xPercent = -100;
    }
    gsap.set(firstText.current, { xPercent });
    gsap.set(secondText.current, { xPercent });
    requestAnimationFrame(animate);
    xPercent += 0.2 * direction;
  };

  return (
    <>
      <Nav />

      <main className={styles.main}>
      <div
        ref={imageRef}
        style={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden" }}
      >
        <Image
          src="/assets/WebSites.jpg"
          alt="Web Development"
          fill
          style={{ objectFit: "cover" }}
        />
      </div>

        <div className={styles.sliderContainer} ref={sliderTextRef}>
          <div className={styles.slider} ref={slider}>
            <p ref={firstText}>Web Development -</p>
            <p ref={secondText}>Web Development -</p>
          </div>
        </div>
      </main>

      <section className="relative text-white py-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-start justify-between gap-10">
          <h2
            ref={headingRef}
            className="text-lg md:text-xl font-bold"
          >
            Where Creativity 
            <br/>
            meets Code
          </h2>

          <div
            ref={paraRef}
            className="md:w-3/5 text-lg font-light leading-relaxed"
          >
            <p>
            At WebMinds, we don’t just build websites — we build digital experiences that work seamlessly across all devices, drive engagement, and elevate your brand. Whether you're a startup, small business, or established enterprise, we tailor every line of code to your unique needs.
            </p>
          </div>
        </div>
      </section>

      <Footer bgColor="bg-[#0504AA]" />
    </>
  );
};

export default page;
