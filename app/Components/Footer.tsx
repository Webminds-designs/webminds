import React from "react";

import Image from "next/image";
import Link from "next/link";

import logo from "../../public/assets/WebMinds Logo_WebMinds Blue.png";
import ParallaxText from "./ParallaxText";

interface FooterProp {
  bgColor: string;
}

const Footer: React.FC<FooterProp> = ({ bgColor }) => {
  return (
    <div
      className={`w-screen h-fit ${bgColor} z-10 relative font-AlbertSans_Regular`}
    >
      <div className="w-screen h-fit flex flex-col md:flex-row justify-between  md:p-24">
        <div className="w-fit h-fit">
          <div className="w-24 cursor-pointer z-40">
            <Image src={logo} alt="logo" />
          </div>
        </div>
        <div className="md:w-1/2 h-fill flex flex-col md:flex-row justify-center items-center md:justify-between md:items-start">
          <div className="w-fit h-fit flex-col justify-center items-center md:items-start mt-6">
            <div className="text-sm text-bold text-white text-center md:text-start mb-4 font-bold">
              Contact Us
            </div>
            <ul className="list-none text-text flex flex-col gap-2 text-sm  items-center md:items-start ">
              <li className="cursor-pointer">
                <a href="tel:+94762130015">+94 76 213 0015</a>
              </li>
              <li className="cursor-pointer">
                <a href="mailto:lg@webmindsdesign.com">
                  lg@webmindsdesigns.com
                </a>
              </li>
            </ul>
          </div>
          <div className="w-fit h-fit flex-col justify-center items-center md:items-start mt-6">
            <div className="text-sm text-bold text-white text-center md:text-start mb-4 font-bold">
              Experties
            </div>
            <ul className="list-none text-text flex flex-col gap-2 text-sm items-center md:items-start">
              <li>
                <Link
                  href="/Expertise/Digital-Marketing"
                  className="cursor-pointer hover:underline"
                >
                  Digital Marketing
                </Link>
              </li>
              <li>
                <Link
                  href="/Expertise/Web-Development"
                  className="cursor-pointer hover:underline"
                >
                  Website Development
                </Link>
              </li>
              <li>
                <Link
                  href="/Expertise/Social-Media-Management"
                  className="cursor-pointer hover:underline"
                >
                  Social Media
                </Link>
              </li>
              <li>
                <Link
                  href="/Expertise/Branding-n-Design"
                  className="cursor-pointer hover:underline"
                >
                  Branding & Design
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-fit h-fit flex-col justify-center items-start mt-6">
            <div className="text-sm text-bold text-white text-center md:text-start mb-4 font-bold">
              Pages
            </div>
            <ul className="list-none text-text flex flex-col gap-2 text-lg md:text-sm items-center md:items-start">
              <li className="cursor-pointer">Home</li>
              <li className="cursor-pointer">Works</li>
              <li className="cursor-pointer">About Us</li>
              <li className="cursor-pointer">Contact Us</li>
              <li className="cursor-pointer">Careers</li>
            </ul>
          </div>
          <div className="w-fit h-fit flex-col justify-center items-start mt-6">
            <div className="text-sm text-bold text-white text-center md:text-start mb-4 font-bold">
              Follow Us
            </div>
            <ul className="list-none text-text flex flex-col gap-2 text-lg md:text-sm items-center md:items-start">
              <li className="cursor-pointer">Instagran</li>
              <li className="cursor-pointer">Youtube</li>
              <li className="cursor-pointer">Facebook</li>
              <li className="cursor-pointer">Tiktok</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="w-full h-fit bg-green lg:px-24 opacity-80 flex justify-between items-center py-4 text-sm font-extralight text-text px-4 md:px-8 relative -bottom-8">
        <div>All rights reserved 2025 © webmindsdesign</div>
        <div className="flex justify-end gap-12 ">
          <div className="cursor-pointer">Privacy Policy</div>
          <div className="cursor-pointer">Terms of Service</div>
        </div>
      </div>
      <main className="flex flex-col items-center justify-center h-fit  bg-transparent text-text md:pb-2">
        <ParallaxText baseVelocity={-2} fontSize="text-[240px]">
          - Get In Touch -
        </ParallaxText>
      </main>
    </div>
  );
};

export default Footer;
