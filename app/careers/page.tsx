"use client";
import React, { useEffect, useRef } from "react";
import bg from "../asserts/careerBg.png"; // Ensure the path is correct
import bg2 from "../asserts/careerBg3.png"; // Ensure the path is correct
import Image from "next/image";
import Nav from "../Components/Nav";
import Footer from "../Components/Footer";
import vacancyData from "./vacancyData";
import { IoArrowForwardCircleOutline } from "react-icons/io5";
// import CustomCursor from "../Components/CustomCursor";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const CareersPage = () => {
  // const [hovering, setHovering] = useState(false);

  const containerRef = useRef(null);
  const containerRef2 = useRef(null);

  const mainTitleRef = useRef(null);
  const image1Ref = useRef(null);
  const image2Ref = useRef(null);
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);

  // const cardContainerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // ✅ Make text overlay scroll faster
      gsap.to(mainTitleRef.current, {
        y: "-10vh", // Moves text up more
        ease: "power1.out",
        scrollTrigger: {
          trigger: mainTitleRef.current,
          start: "top 30%",
          end: "top 40%",
          scrub: 3, // Moves faster
        },
      });
      gsap.to(image1Ref.current, {
        y: "30vh", // Moves text up more
        ease: "power1.out",
        scrollTrigger: {
          trigger: image1Ref.current,
          start: "top 30%",
          end: "bottom 40%",
          scrub: 3,
        },
      });
      gsap.to(text1Ref.current, {
        y: "-10vh", // Moves text up more
        ease: "power1.out",
        scrollTrigger: {
          trigger: text1Ref.current,
          start: "top 30%",
          end: "bottom 40%",
          scrub: 3,
        },
      });
    }, containerRef);

    let ctx2 = gsap.context(() => {
      gsap.to(image2Ref.current, {
        y: "30vh", // Moves text up more
        ease: "power1.out",
        scrollTrigger: {
          trigger: image2Ref.current,
          start: "top top",
          end: "bottom 40%",
          scrub: 3,
        },
      });
      gsap.to(text2Ref.current, {
        y: "-30vh", // Moves text up more
        ease: "power1.out",
        scrollTrigger: {
          trigger: text2Ref.current,
          start: "bottom bottom",
          end: "bottom 40%",
          scrub: 3,
        },
      });
    });

    return () => {
      ctx.revert();
      ctx2.revert();
    };
  });

  return (
    <>
      <Nav />
      {/* <CustomCursor hovering={hovering} /> */}
      <div
        className="relative bg-black md:w-screen h-screen md:h-fit"
        ref={containerRef}
      >
        <Image
          src={bg}
          alt="bg image"
          layout="cover"
          objectFit="fill"
          className="opacity-80 relative -top-40"
          ref={image1Ref}
        />

        <div className="w-screen h-screen flex justify-center items-start md:items-center absolute top-24 md:top-0">
          <div
            className="text-5xl md:text-[100px] lg:text-[250px]  opacity-80 "
            style={{
              display: "inline-block",
              fontFamily: "eight, sans-serif",
            }}
            ref={mainTitleRef}
          >
            Careers .
          </div>
        </div>
        <div
          className="w-fit h-fit px-8 md:px-24 text-2xl md:text-4xl lg:text-5xl text-white absolute bottom-0 md:top-[100vh]"
          ref={text1Ref}
        >
          <span
            style={{
              display: "inline-block",
              fontFamily: "eight, sans-serif",
            }}
          >
            This is WebMinds -
          </span>
          . In our team of eighteen, creativity meets purpose, and modern ideas
          blend seamlessly with timeless vision. We’re not just a team; we’re a
          platform for bold thinkers and innovative doers. Living at the pulse
          of the digital world, we thrive on redefining what’s possible. That’s
          why our partners trust us to elevate their brands, build stunning
          websites, and craft campaigns that leave an impression. We don’t just
          follow trends—we create them.
        </div>
      </div>
      <div
        className="relative bg-black md:w-screen h-screen md:h-fit"
        /// <reference path="" />
        ref={containerRef2}
      >
        <Image
          src={bg2}
          alt="bg image"
          layout="cover"
          objectFit="fill"
          className="opacity-80 -z-50"
          ref={image2Ref}
        />

        <div
          className="w-fit h-fit p-8 md:p-24 text-2xl md:text-4xl lg:text-6xl text-white absolute top-2"
          ref={text2Ref}
        >
          <span
            style={{
              display: "inline-block",
              fontFamily: "eight, sans-serif",
            }}
          >
            Our Spirit -
          </span>
          . At WebMinds, we don’t just follow the rules—we write our own. You
          won’t catch us in suits; we measure passion, not papers. Your
          creativity counts more than any credential. We don’t fit into boxes;
          we think outside of them. As a team, we aren’t just building
          websites—we’re shaping the digital landscape of tomorrow, today.
        </div>
        <div className="flex flex-wrap gap-8 justify-center p-4 md:p-24 absolute bottom-0 md:bottom-60">
          {vacancyData.map((vacancy) => (
            <div
              key={vacancy.id}
              className="md:w-[420px] w-[200px] border-2 border-slate-500 flex flex-col items-start justify-between gap-2 md:gap-6 p-2 md:p-8 rounded-lg text-text 
           transition-colors duration-700 ease-in-out hover:bg-slate-500 hover:text-white"
              // onMouseEnter={() => setHovering(true)}
              // onMouseLeave={() => setHovering(false)}
            >
              <h2
                className="text-2xl md:text-4xl lg:text-6xl text-wrap text-start font-bold"
                style={{
                  display: "inline-block",
                  fontFamily: "eight, sans-serif",
                }}
              >
                {vacancy.title}
              </h2>
              <div className="w-full h-fit flex justify-end">
                <IoArrowForwardCircleOutline className="text-2xl md:text-6xl -rotate-45" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer bgColor="bg-[#0B5E6B]" />
    </>
  );
};

export default CareersPage;
