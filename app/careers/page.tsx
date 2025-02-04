import React from "react";
import bg from "../asserts/careerBg.png"; // Ensure the path is correct
import bg2 from "../asserts/careerBg2.png"; // Ensure the path is correct
import Image from "next/image";
import Nav from "../Components/Nav";
import Footer from "../Components/Footer";

const CareersPage = () => {
  return (
    <>
      <Nav />
      <div className="relative bg-black w-screen h-fit">
        <Image
          src={bg}
          alt="bg image"
          layout="cover"
          objectFit="fill"
          className="opacity-80"
        />

        <div className="w-screen h-screen flex justify-center items-center absolute top-0">
          <div
            className=" text-[300px] opacity-80 "
            style={{
              display: "inline-block",
              fontFamily: "eight, sans-serif",
            }}
          >
            Careers .
          </div>
        </div>
        <div className="w-fit h-fit p-24 text-2xl md:text-4xl lg:text-6xl text-white absolute top-[100vh]">
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
      <div className="relative bg-black w-screen h-fit">
        <Image
          src={bg2}
          alt="bg image"
          layout="cover"
          objectFit="fill"
          className="opacity-80"
        />

        <div className="w-fit h-fit p-24 text-2xl md:text-4xl lg:text-6xl text-white absolute top-20">
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
      </div>
      <Footer bgColor="bg-[#0B5E6B]" />
    </>
  );
};

export default CareersPage;
