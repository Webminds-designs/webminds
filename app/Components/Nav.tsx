"use client";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import Image from "next/image";

import logo from "../../public/assets/Webminds-dark.webp";

import { HiMenuAlt1 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { FaArrowDown } from "react-icons/fa6";

import { useDispatch } from "react-redux";
import { startAnimation } from "../store/animationSlice";
import { usePathname, useRouter } from "next/navigation";

import im1 from "../../public/assets/DigitalMarketing.jpg";
import im2 from "../../public/assets/Website.jpg";
import im3 from "../../public/assets/Social-Media.jpg";
import im4 from "../../public/assets/tembrand.png";

import { motion } from "framer-motion";

const Nav = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isExpertiesHovered, setExpertiesHovered] = useState(false);
  const [Hovered, setHovered] = useState("marketing");
  const menuRef = useRef(null); // Ref for the dropdown container
  const contentRef = useRef(null); // Ref for the dropdown content

  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname(); // ✅ Get current page

  // Prevents navigation if the user clicks on the current page
  const handleNavigation = (item: string) => {
    const targetPath = item === "Home" ? "/" : `/${item.toLowerCase()}`;

    if (pathname === targetPath) {
      return; // ✅ Prevent navigation if already on the page
    }

    dispatch(startAnimation()); // Start animation
    router.push(targetPath);
    // setTimeout(() => {
    //   router.push(targetPath);
    // }, 800); // Match delay with animation duration
  };

  return (
    <div className="w-screen bg-transparent font-FunnelDisplayRegular flex justify-between items-center px-6 lg:px-20 py-4 fixed top-0 z-10 overflow-hidden">
      {/* Logo Section */}
      <div className="w-12 cursor-pointer z-40">
        <Image src={logo} alt="logo" />
      </div>

      {/* Desktop Navigation Links */}
      <nav className="hidden lg:flex">
        <ul className="flex items-center space-x-16 text-sm text-white font-semibold">
          {["Home", "Works", "Experties", "Careers", "Contact"].map(
            (item, index) => (
              <li key={index} className="group">
                <div
                  onMouseEnter={(e) => {
                    if (item === "Experties") setExpertiesHovered(true);
                  }}
                  onMouseLeave={() => {
                    if (item === "Experties") {
                      setExpertiesHovered(false);
                    }
                  }}
                  className="relative overflow-hidden flex items-center hover:opacity-50 gap-2 z-40 cursor-pointer"
                  style={{ perspective: "1000px" }}
                  onClick={() => handleNavigation(item)} // ✅ Updated click function
                >
                  <span className="block">{item}</span>
                  {item === "Experties" && (
                    <div className="flex items-center rounded-full bg-white bg-opacity-30 p-1">
                      <FaArrowDown className="text-white bg-opacity-100 w-2 h-2 " />
                    </div>
                  )}
                </div>

                {/* Dropdown Menu for "Experties" */}
                {item === "Experties" && isExpertiesHovered && (
                  <div
                    className="fixed top-0 left-0 w-screen flex items-center justify-between bg-[#212121] shadow-lg opacity-100 transition-opacity duration-300 z-30"
                    ref={menuRef}
                    style={{
                      transformOrigin: "top center",
                      transform: "scaleY(0)",
                    }}
                    onMouseEnter={() => setExpertiesHovered(true)}
                    onMouseLeave={() => setExpertiesHovered(false)}
                  >
                    <div
                      className="mt-28 px-24 mb-20 w-full flex justify-between"
                      ref={contentRef}
                    >
                      <div>Our Experties</div>
                      <ul
                        className="md:text-3xl lg:text-4xl"
                        style={{
                          display: "inline-block",
                          fontFamily: "eight, sans-serif",
                        }}
                      >
                        {[
                          {
                            name: "Digital Marketing",
                            path: "/experties/marketing",
                          },
                          {
                            name: "Website Development",
                            path: "/experties/development",
                          },
                          {
                            name: "Social Media",
                            path: "/experties/socialmedia",
                          },
                          {
                            name: "Branding & Design",
                            path: "/experties/branding",
                          },
                        ].map((exp, i) => (
                          <li
                            key={i}
                            className="px-4 py-3 cursor-pointer"
                            onMouseEnter={() =>
                              setHovered(exp.name.toLowerCase())
                            }
                            onClick={() => handleNavigation(exp.name)}
                          >
                            {exp.name}
                          </li>
                        ))}
                      </ul>
                      <div className="w-96 h-fit">
                        {Hovered === "website development" ? (
                          <Image
                            src={im2}
                            alt="marketing img"
                            className="w-full h-auto"
                          />
                        ) : Hovered === "digital marketing" ? (
                          <Image
                            src={im1}
                            alt="web img"
                            className="w-full h-auto"
                          />
                        ) : Hovered === "social media" ? (
                          <Image
                            src={im3}
                            alt="social img"
                            className="w-full h-auto"
                          />
                        ) : Hovered === "branding & design" ? (
                          <Image
                            src={im4}
                            alt="branding and design img"
                            className="w-full h-auto"
                          />
                        ) : null}

                        {Hovered === "web" ? (
                          <motion.div className="w-full h-fit">
                            <Image
                              src={im2}
                              alt="marketing img"
                              className="w-full h-auto"
                            />
                          </motion.div>
                        ) : Hovered === "marketing" ? (
                          <div className="w-full h-full">
                            <Image
                              src={im1}
                              alt="web img"
                              className="w-full h-auto"
                            />
                          </div>
                        ) : Hovered === "social" ? (
                          <div className="w-full h-full ">
                            <Image
                              src={im3}
                              alt="social img"
                              className="w-full h-auto"
                            />
                          </div>
                        ) : Hovered === "brand" ? (
                          <div className="w-full h-full ">
                            <Image
                              src={im4}
                              alt="banding and design img"
                              className="w-full h-auto"
                            />
                          </div>
                        ) : (
                          <div className="w-full h-full bg-transparent"></div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </li>
            )
          )}
        </ul>
      </nav>

      {/* Mobile Menu Button */}
      <div className="lg:hidden z-40">
        <button
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          className="text-white text-2xl focus:outline-none transition-transform duration-300"
        >
          {isMobileMenuOpen ? (
            <IoClose className="transform rotate-180" />
          ) : (
            <HiMenuAlt1 />
          )}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div
          ref={menuRef}
          className="fixed top-0 left-0 w-full h-full bg-[#212121] flex flex-col items-start justify-center z-30 px-8"
          style={{ transformOrigin: "top center", transform: "scaleY(0)" }} // Ensure scale starts from top
        >
          <ul className="space-y-3 text-white text-4xl font-bold text-start">
            {["Home", "Works", "Experties", "Careers", "Contact"].map(
              (item, index) => (
                <li key={index}>
                  <div
                    className="relative inline-block overflow-hidden hover:opacity-70 cursor-pointer"
                    onClick={() => handleNavigation(item)}
                  >
                    <span className="block">{item}</span>
                  </div>
                </li>
              )
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Nav;
