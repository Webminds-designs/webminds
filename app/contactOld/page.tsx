"use client";

import React from "react";
import { motion } from "framer-motion";
import Nav from "../Components/Nav";
import Image from "next/image";
import bg from "../../public/assets/CONTANCT.png";
import { FaMessage } from "react-icons/fa6";
import { IoCall } from "react-icons/io5";
import { IoMdSend } from "react-icons/io";
import logo from "../../public/assets/Webminds-dark.webp";
import Footer from "../Components/Footer";

const page = () => {
  return (
    <>
      <Nav />
      {/* <CustomCursor hovering={hovering} /> */}
      <motion.div
        className=" bg-[#1a1a1a] md:w-screen h-fit  md:top-0"
        initial={{ opacity: 1, y: 1000 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        //   ref={containerRef}
      >
        <div className="w-screen h-full flex  flex-col  md:flex-row justify-between items-center relative top-28 md:top-0">
          <div className="w-screen md:w-2/5 text-white h-fit md:h-screen flex flex-col p-2 md:p-24 justify-center items-center gap-4 bg-[#1a1a1a]">
            <div
              className="text-6xl text-text "
              style={{
                display: "inline-block",
                fontFamily: "eight, sans-serif",
              }}
            >
              Contact
            </div>
            <div className="w-full flex flex-row p-5 gap-3 justify-between mt-3 border-[0.2px] border-text rounded-r-xl rounded-tl-xl rounded-bl-sm">
              {/* <FaMessage
                className="w-14 h-14"
                style={{ backgroundImage: `url(${logo})` }}
              /> */}
              <div className="w-14 h-14 rounded-r-xl rounded-tl-xl rounded-bl-sm bg-blue-500 border-2 p-2 border-blue-800 flex justify-center items-center">
                <Image alt="logo" src={logo} width={30} height={30} />
              </div>
              <div className="w-full h-fit text-sm text-gray-300 rounded-r-xl rounded-tl-xl rounded-bl-sm ">
                <span>
                  WebMinds — Your creative tech partners! 🚀 Got a project idea?
                  Email us at{" "}
                </span>
                <span className="font-bold"> info@webmindsdesigns.com,</span>{" "}
                <span>and let&apos;s make it happen! 💡✨</span>
              </div>
            </div>
            <div className="w-full flex justify-between items-center gap-4">
              <div className="md:w-full w-32 p-3 bg-[#242424] flex flex-col items-center justify-center gap-1 hover:bg-[#424242] cursor-pointer rounded-r-xl rounded-tl-xl rounded-bl-sm">
                <IoCall className="w-full text-center" />
                <div className="text-text text-center text-s">Call</div>
              </div>
              <div className="md:w-full w-32 p-3 bg-[#242424] flex flex-col items-center justify-center gap-1 hover:bg-[#424242] cursor-pointer rounded-r-xl rounded-tl-xl rounded-bl-sm">
                <FaMessage className="w-full text-center " />
                <div className="text-text text-center text-s">Email</div>
              </div>
              <div className="md:w-full w-32 p-3 bg-[#242424] flex flex-col items-center justify-center gap-1 hover:bg-[#424242] cursor-pointer rounded-r-xl rounded-tl-xl rounded-bl-sm">
                <IoMdSend className="w-full text-center -rotate-45" />
                <div className="text-text text-center text-s">Route</div>
              </div>
            </div>
            <div className="p-4 w-full h-fit flex-col items-start justify-center bg-[#242424]  rounded-r-xl rounded-tl-xl rounded-bl-sm">
              <div className="text-text">Phone</div>
              <div className="text-white text-lg ">+44 7983 637117</div>
            </div>
            <div className="p-4 w-full h-fit flex-col items-start justify-center bg-[#242424]  rounded-r-xl rounded-tl-xl rounded-bl-sm">
              <div className="text-text">Email</div>
              <div className="text-white text-lg ">
                damian@webmindsdesign.com
              </div>
            </div>
            <div className="p-4 w-full h-fit flex-col items-start justify-center bg-[#242424]  rounded-r-xl rounded-tl-xl rounded-bl-sm">
              <div className="text-text">Address</div>
              <div className="text-white text-lg flex flex-col items-start gap-0">
                <div>The Old Rectory,</div>
                <div>Taunton, Ta4 3jt,</div>
                <div>Somerset,</div>
                <div>United Kingdom.</div>
              </div>
            </div>
          </div>
          <div className="w-screen md:w-3/5 h-full md:h-screen">
            <Image
              src={bg}
              alt="bg image"
              className="object-cover w-full h-full opacity-80 relative"
            />
          </div>
        </div>
      </motion.div>
      <Footer bgColor="bg-[#AF3235]" />
    </>
  );
};

export default page;
