'use client';

import React, { useLayoutEffect, useRef, useState, useEffect } from "react";

import styles from "../styles/socials.module.css";
import gsap from "gsap";

import MagneticIcons from './MagneticIcons';

gsap.registerPlugin(ScrollTrigger);
import { ScrollTrigger } from 'gsap/all';

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface PageProps {
  bgcolor?: string;
}

const Page: React.FC<PageProps> = ({ bgcolor }) => {
  const firstText = useRef<HTMLParagraphElement>(null);
  const secondText = useRef<HTMLParagraphElement>(null);
  const slider = useRef<HTMLDivElement>(null);

  const headingRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const paraRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  const imageRef = useRef<HTMLDivElement>(null);
  const sliderTextRef = useRef<HTMLDivElement>(null);


  let xPercent = 0;
  let direction = -1;

  const [hovering, setHovering] = useState(false);
  const router = useRouter();

  const handleImageClick = (img: string, id: number) => {
    setHovering(false);
    router.push(`/projects/${id}`);
  };

  useEffect(() => {
    gsap.to(slider.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        scrub: 0.25,
        start: 0,
        end: window.innerHeight,
        onUpdate: e => direction = e.direction * -1
      },
      x: "-500px",
    });
    requestAnimationFrame(animate);
  }, []);

  const animate = () => {
    if (xPercent < -100) {
      xPercent = 0;
    } else if (xPercent > 0) {
      xPercent = -100;
    }
    gsap.set(firstText.current, { xPercent: xPercent });
    gsap.set(secondText.current, { xPercent: xPercent });
    requestAnimationFrame(animate);
    xPercent += 0.1 * direction;
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      headingRefs.current.forEach((ref) => {
        if (ref) {
          gsap.from(ref, {
            scrollTrigger: {
              trigger: ref,
              start: "top 80%",
            },
            opacity: 0,
            y: 30,
            duration: 1,
            ease: "power2.out"
          });
        }
      });

      if (sliderTextRef.current) {
        gsap.from(sliderTextRef.current, {
          scrollTrigger: {
            trigger: sliderTextRef.current,
            start: "top 80%",
          },
          opacity: 0,
          y: 50,
          duration: 1,
          ease: "power2.out"
        });
      }

      if (imageRef.current) {
        gsap.from(imageRef.current, {
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 80%",
          },
          opacity: 0,
          y: 50,
          duration: 1,
          ease: "power2.out",
          delay: 0.3,
        });
      }

      paraRefs.current.forEach((ref) => {
        if (ref) {
          gsap.from(ref, {
            scrollTrigger: {
              trigger: ref,
              start: "top 85%",
            },
            opacity: 0,
            y: 20,
            duration: 1,
            delay: 0.2,
            ease: "power2.out"
          });
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>

    <main className={styles.main}>

    <h1
      ref={(el) => { headingRefs.current[0] = el; }}
      className="text-7xl pl-20 w-full md:text-[100px] lg:text-[220px] opacity-80 font-AlbertSans_Bold text-start mt-6 md:mt-10 text-text"
    >
      Our Socials
      <span className="block text-sm md:text-base lg:text-lg mt-2 ml-6 opacity-60 font-normal">
        hover the icons please!
      </span>
    </h1>



    <div className={styles.container}>
    <MagneticIcons>
        <a href="https://www.facebook.com/share/1DAHKSvb6y/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer">
        <img src="/facebook.svg" alt="Facebook" />
        </a>
    </MagneticIcons>

    <MagneticIcons>
        <a href="https://www.tiktok.com/@webminds_?_t=ZS-8tOO77I5S35&_r=1" target="_blank" rel="noopener noreferrer">
        <img src="/tik-tok.svg" alt="TikTok" />
        </a>
    </MagneticIcons>

    <MagneticIcons>
        <a href="https://www.youtube.com/@WebMindsuk" target="_blank" rel="noopener noreferrer">
        <img src="/youtube.svg" alt="YouTube" />
        </a>
    </MagneticIcons>

    <MagneticIcons>
        <a href="https://www.instagram.com/webminds.designs?igsh=MTdnNjR0MXhsZmR1bw%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer">
        <img src="/instagram.svg" alt="Instagram" />
        </a>
    </MagneticIcons>
    </div>

    <hr className="border-t-20 border-gray-800 w-[90%] mx-auto bg-black/75" />

    <section className="relative text-white bg-black">

    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start justify-between gap-20">
        <h2
        ref={(el) => { headingRefs.current[0] = el; }}
        className="text-lg md:text-xl font-semibold"
        >
        We Speak
        <br />
        Fluent
        Social
        </h2>

        <div
        ref={(el) => { paraRefs.current[0] = el; }}
        className="md:w-3/5 text-2xl font-light leading-relaxed"
        >
        <p>
        Vibes and a whole lot of personality — your brand, but make it scroll-
stopping. We blend aesthetic precision with smart storytelling to craft social
content that resonates. Whether it’s an Instagram series, TikTok campaign,
or a full-blown digital narrative, we ensure your presence is as polished as it
is powerful
 </p>
        </div>
    </div>

    </section>

    </main>

      <hr className="border-t-20 border-gray-800 w-[90%] mx-auto bg-black/75" />

    </>
  );
};

export default Page;
