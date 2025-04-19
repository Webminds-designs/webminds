'use client';

import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import Nav from "../../Components/Nav";
import Footer from "../../Components/Footer";
import Image from "next/image";
import styles from "./slider.module.css";
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

  const headingRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const paraRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  const imageRef = useRef<HTMLDivElement>(null);
  const sliderTextRef = useRef<HTMLDivElement>(null);

  const [openStates, setOpenStates] = useState<boolean[]>(services.map(() => false));

  let xPercent = 0;
  let direction = -1;

  const toggleOpen = (index: number) => {
    setOpenStates((prev) =>
      prev.map((open, i) => (i === index ? !open : open))
    );
  };

  useEffect( () => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(slider.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        scrub: 0.25,
        start: 0,
        end: window.innerHeight,
        onUpdate: e => direction = e.direction * -1
      },
      x: "-500px",
    })
    requestAnimationFrame(animate);
  }, [])


  const animate = () => {
    if(xPercent < -100){
      xPercent = 0;
    }
    else if(xPercent > 0){
      xPercent = -100;
    }
    gsap.set(firstText.current, {xPercent: xPercent})
    gsap.set(secondText.current, {xPercent: xPercent})
    requestAnimationFrame(animate);
    xPercent += 0.1 * direction;
  }

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
      <Nav />

      <main className={styles.main}>

      <div
          ref={imageRef}
          style={{
            position: "relative",
            width: "100%",
            height: "120vh", // reduced height
            overflow: "hidden"
          }}
        >
          <Image
            src="/DigitalMarketing.jpg"
            alt="Web Development"
            fill
            style={{ objectFit: "cover", objectPosition: "top" }} // crop from bottom
          />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              height: "30%",
              background: "linear-gradient(to top, rgba(0,0,0,1), transparent)",
              pointerEvents: "none"
            }}
          />
      </div>



        <div className={styles.sliderContainer} ref={sliderTextRef}>
          <div className={styles.slider} ref={slider}>
            <p ref={firstText}>Digital Marketing - </p>
            <p ref={secondText}>Digital Marketing -</p>
          </div>
        </div>
      </main>

      {/* <WhyUs /> */}

      <section className="relative text-white py-20 bg-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start justify-between gap-20">
          <h2
            ref={(el) => { headingRefs.current[0] = el; }}
            className="text-lg md:text-xl font-semibold"
          >
            Where Creativity
            <br />
            meets Code
          </h2>

          <div
            ref={(el) => { paraRefs.current[0] = el; }}
            className="md:w-3/5 text-2xl font-light leading-relaxed"
          >
            <p>
              At WebMinds, we don’t just build websites — we build digital experiences that work seamlessly across all devices, drive engagement, and elevate your brand. Whether you're a startup, small business, or established enterprise, we tailor every line of code to your unique needs.
            </p>
          </div>
        </div>
      </section>

      <hr className="border-t-20 border-gray-800 w-[90%] mx-auto bg-black/75" />

      <section className="min-h-content text-white px-6 md:px-20 py-20 bg-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16">
          <div className="md:w-1/3">
            <div className="text-sm tracking-widest font-bold uppercase">
              What we offer
            </div>
          </div>

          <div className="md:w-2/3 flex flex-col">
            {services.map((service, index) => (
              <div
                key={index}
                onClick={() => toggleOpen(index)}
                className="relative group border-t border-white/10 pt-6 pb-6 cursor-pointer overflow-hidden transition-all duration-500"
              >
                <div className="absolute inset-0 bg-gray-800 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-0" />
                <div className="relative z-10">
                  <h2
                    ref={(el) => { headingRefs.current[index + 1] = el; }}
                    className="text-2xl md:text-3xl font-semibold flex justify-between items-center"
                  >
                    <span className="transform transition-transform duration-200 group-hover:translate-x-4">
                      {service.title}
                    </span>
                    <span className="text-white text-xl">
                      {openStates[index] ? "–" : "+"}
                    </span>
                  </h2>

                  <div
                    className={`overflow-hidden transition-all duration-200 ease-in-out ${
                      openStates[index] ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p
                      ref={(el) => { paraRefs.current[index + 1] = el; }}
                      className="text-white/70 mt-4 text-base font-light leading-relaxed"
                    >
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="border-t-20 border-gray-800 w-[90%] mx-auto bg-black/75" />

      <section className="min-h-content text-white px-6 md:px-20 py-20 bg-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16">
          <div className="md:w-1/3">
            <div className="text-sm tracking-widest font-bold uppercase">
            The story unfolds beneath this line.            
            </div>
          </div>
        </div>
      </section>

      <hr className="border-t-20 border-gray-800 w-[90%] mx-auto bg-black/75" />

      <section className="bg-black py-16 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="bg-gray-800 rounded-lg shadow-md h-[600px] w-full"></div>
          <div className="bg-gray-800 rounded-lg shadow-md h-[600px] w-full"></div>
          <div className="bg-gray-800 rounded-lg shadow-md h-[600px] w-full"></div>
          <div className="bg-gray-800 rounded-lg shadow-md h-[600px] w-full"></div>
          <div className="bg-gray-800 rounded-lg shadow-md h-[600px] w-full"></div>
          <div className="bg-gray-800 rounded-lg shadow-md h-[600px] w-full"></div>
          <div className="bg-gray-800 rounded-lg shadow-md h-[600px] w-full"></div>
          <div className="bg-gray-800 rounded-lg shadow-md h-[600px] w-full"></div>
        </div>
      </section>

      {/* <hr className="border-t-2 border-gray-500 w-[80%] mx-auto" /> */}

      <Footer bgColor="bg-gradient-to-t from-[#0504AA] to-[#3b82f6]" />
    </>
  );
};

export default Page;
