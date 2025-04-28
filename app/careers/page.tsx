"use client";

import React from "react";
import bg from "../asserts/Lbg2.jpg"; // Ensure the path is correct
import bg2 from "../asserts/careerBg3.png"; // Ensure the path is correct
import Image from "next/image";
import Nav from "../Components/Nav";
import Footer from "../Components/Footer";
import vacancyData from "./vacancyData";
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import { motion } from "framer-motion";

const CareersPage = () => {
  const title = "Careers";

  return (
    <>
      <Nav />
      <motion.div
        className="relative bg-black md:w-screen h-screen md:h-fit"
        initial={{ opacity: 1, y: "10%" }}
        animate={{ opacity: 1, y: 10 }}
        transition={{ duration: 0.8 }}
      >
        <Image
          src={bg}
          alt="bg image"
          layout="cover"
          objectFit="fill"
          className="opacity-80 relative -top-40"
        />

        <div className="w-screen h-screen flex justify-center pt-20 md:pl-16 items-start md:items-start absolute top-24 md:top-0">
          <div className="text-5xl w-full h-screen md:text-[100px] lg:text-[220px]  font-AlbertSans_Bold text-start mt-20 md:mt-10 text-text flex">
            {title.split("").map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
                className="inline-block"
              >
                {char}
              </motion.span>
            ))}
          </div>
        </div>

        <div className="w-fit h-screen px-8 md:px-24 text-2xl md:text-4xl lg:text-5xl text-white  font-AlbertSans_Regular">
          <span
            style={{
              display: "inline-block",
            }}
            className="font-AlbertSans_Bold text-blue-500"
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
      </motion.div>

      <div className="relative bg-black md:w-screen h-screen md:h-fit">
        <Image
          src={bg2}
          alt="bg image"
          layout="cover"
          objectFit="fill"
          className="opacity-80 -z-50"
        />

        <div className="w-fit h-fit p-8 md:p-24 text-2xl md:text-4xl lg:text-5xl text-white absolute top-8">
          <span
            style={{
              display: "inline-block",
            }}
            className="font-AlbertSans_Bold text-blue-500"
          >
            Our Spirit -
          </span>
          . At WebMinds, we don’t just follow the rules—we write our own. You
          won’t catch us in suits; we measure passion, not papers. Your
          creativity counts more than any credential. We don’t fit into boxes;
          we think outside of them. As a team, we aren’t just building
          websites—we’re shaping the digital landscape of tomorrow, today.
        </div>

        <div className="flex flex-wrap gap-8 justify-center p-4 md:p-24 absolute md:bottom-0  ">
          {vacancyData.map((vacancy) => (
            <div
              key={vacancy.id}
              className="md:w-[420px] w-[200px] border-2 border-slate-500 flex flex-col items-start justify-between gap-2 md:gap-6 p-2 md:p-8 rounded-lg text-text 
              transition-colors duration-700 ease-in-out hover:bg-slate-500 hover:text-white"
            >
              <h2
                className="text-2xl md:text-4xl lg:text-6xl text-wrap text-start font-light font-AlbertSans_Bold"
                style={{
                  display: "inline-block",
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
