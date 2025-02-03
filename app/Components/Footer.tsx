import React from "react";
import Bigfontloop from "./Bigfontloop";
import BigFotterText from "./BigFotterText";
import Image from "next/image";

import logo from "../../public/assets/WebMinds Logo_WebMinds Blue.png";
import ParallaxText from "./ParallaxText";
const Footer = () => {
  return (
    <div className="w-screen h-fit bg-[#212121] ">
      <div className="w-screen h-[450px] flex md:flex-row justify-between md:p-24">
        <div className="w-fit h-fit">
          <div className="w-24 cursor-pointer z-40">
            <Image src={logo} alt="logo" />
          </div>
        </div>
        <div className="md:w-1/2 h-fill flex md:flex-row md:justify-between">
          <div className="w-fit h-fit flex-col justify-center items-start">
            <div className="text-sm text-bold text-white mb-4">Contact Us</div>
            <ul className="list-none text-text flex flex-col gap-2 text-sm">
              <li className="cursor-pointer">+44 7983 637117</li>
              <li className="cursor-pointer">damian@webmindsdesign.com</li>
            </ul>
          </div>
          <div className="w-fit h-fit flex-col justify-center items-start">
            <div className="text-sm text-bold text-white mb-4">Experties</div>
            <ul className="list-none text-text flex flex-col gap-2 text-sm">
              <li className="cursor-pointer">Digital Marketing</li>
              <li className="cursor-pointer">Website Development</li>
              <li className="cursor-pointer">Social Media</li>
              <li className="cursor-pointer">Branding & Design</li>
            </ul>
          </div>
          <div className="w-fit h-fit flex-col justify-center items-start">
            <div className="text-sm text-bold text-white mb-4">Pages</div>
            <ul className="list-none text-text flex flex-col gap-2 text-sm">
              <li className="cursor-pointer">Home</li>
              <li className="cursor-pointer">Experties</li>
              <li className="cursor-pointer">Works</li>
              <li className="cursor-pointer">About Us</li>
              <li className="cursor-pointer">Contact Us</li>
              <li className="cursor-pointer">Careers</li>
            </ul>
          </div>
          <div className="w-fit h-fit flex-col justify-center items-start">
            <div className="text-sm text-bold text-white mb-4">Follow Us</div>
            <ul className="list-none text-text flex flex-col gap-2 text-sm">
              <li className="cursor-pointer">Instagran</li>
              <li className="cursor-pointer">Youtube</li>
              <li className="cursor-pointer">Facebook</li>
              <li className="cursor-pointer">Tiktok</li>
            </ul>
          </div>
        </div>
      </div>

      <main className="flex flex-col items-center justify-center h-fit  bg-transparent text-text">
        <ParallaxText baseVelocity={-5}>Framer Motion</ParallaxText>
      </main>
    </div>
  );
};

export default Footer;
