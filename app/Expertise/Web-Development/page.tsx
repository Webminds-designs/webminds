'use client';

import React, { useLayoutEffect, useRef, useState } from "react";
import Nav from "../../Components/Nav";
import Footer from "../../Components/Footer";
import Image from "next/image";
import styles from "./slider.module.css";

import WhyUs from "./WhyUs.jsx";
import gsap from "gsap";
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: 'Conceptual Design/Wireframing',
    description: 'We help you structure your ideas and create wireframes to visualize the website flow and layout.',
  },
  {
    title: 'Web Design',
    description: 'Our design approach combines aesthetics with user experience, ensuring your website stands out and functions smoothly.',
  },
  {
    title: 'Web Development',
    description: 'We bring your website to life with custom coding, responsive designs, and seamless functionality.',
  },
  {
    title: 'SEO Strategies',
    description: 'Our SEO strategies help increase your visibility, drive traffic, and improve search engine rankings.',
  },
];

const Page: React.FC = () => {
  const firstText = useRef<HTMLParagraphElement>(null);
  const secondText = useRef<HTMLParagraphElement>(null);
  const slider = useRef<HTMLDivElement>(null);

  const headingRef = useRef<HTMLHeadingElement>(null);
  const paraRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const sliderTextRef = useRef<HTMLDivElement>(null);

  const animationFrame = useRef<number | null>(null);
  let xPercent = 0;
  let direction = 1;

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Scroll-based slider movement
      gsap.to(slider.current, {
        scrollTrigger: {
          trigger: document.documentElement,
          scrub: 0.25,
          start: 0,
          end: window.innerHeight,
          onUpdate: (e) => direction = e.direction * -1,
        },
        x: "-300px",
      });

      animateSlider();

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
    });

    function animateSlider() {
      if (xPercent < -100) {
        xPercent = 0;
      } else if (xPercent > 0) {
        xPercent = -100;
      }

      gsap.set(firstText.current, { xPercent });
      gsap.set(secondText.current, { xPercent });

      animationFrame.current = requestAnimationFrame(animateSlider);
      xPercent += 0.2 * direction;
    }

    return () => {
      ctx.revert();
      if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
    };
  }, []);

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

      <section className="relative text-white py-20 bg-black">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-start justify-between gap-10">
          <h2
            ref={headingRef}
            className="text-lg md:text-xl font-bold"
          >
            Where Creativity
            <br />
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

  <hr className="border-t-20 border-gray-500 w-[75%] mx-auto bg-black/75" />

      <section className="min-h-content text-white px-6 md:px-20 py-20  bg-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16">
          {/* Left Side: Heading */}
          <div className="md:w-1/3">
            <div className="text-sm tracking-widest font-bold uppercase">
              What we offer
            </div>
          </div>

          {/* Right Side: Expandable Tiles */}
          <div className="md:w-2/3">
            {services.map((service, index) => {
              const [open, setOpen] = useState(false);

              return (
                <div
                  key={index}
                  onClick={() => setOpen(!open)}
                  className="relative group border-t border-white/10 pt-6 pb-6 cursor-pointer overflow-hidden transition-all duration-500"
                >
                  {/* Animated background layer */}
                  <div className="absolute inset-0 bg-gray-800 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-0" />

                  {/* Content above background */}
                  <div className="relative z-10">
                  <h2 className="text-2xl md:text-3xl font-semibold flex justify-between items-center">
                    <span className="transform transition-transform duration-500 group-hover:translate-x-2">
                      {service.title}
                    </span>
                    <span className="text-white text-xl">
                      {open ? "–" : "+"}
                    </span>
                  </h2>

                    <div
                      className={`overflow-hidden transition-all duration-200 ease-in-out ${
                        open ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <p className="text-white/70 mt-4 text-base font-light leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>
<hr className="border-t-2 border-gray-500 w-[75%] mx-auto" />

      <WhyUs/>


<hr className="border-t-2 border-gray-500 w-[95%] mx-auto" />

      <Footer bgColor="bg-gradient-to-t from-[#0504AA] to-[#3b82f6]" />
    </>
  );
};

export default Page;
