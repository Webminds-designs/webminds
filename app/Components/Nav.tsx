"use client";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import Image from "next/image";

// import logo from "../../public/assets/Webminds-dark.webp";

import { HiMenuAlt1 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { FaArrowDown } from "react-icons/fa6";

import im1 from "../../public/assets/DigitalMarketing.jpg";
import im2 from "../../public/assets/Website.jpg";
import im3 from "../../public/assets/Social-Media.jpg";
import im4 from "../../public/Branding.jpg";

import { motion } from "framer-motion";

interface NavProps {
  bgColor?: string;
  navTextColor?: string;
}

const Nav: React.FC<NavProps> = ({ bgColor, navTextColor }) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isExpertiesHovered, setExpertiesHovered] = useState(false);
  const [Hovered, setHovered] = useState("marketing");
  const menuRef = useRef(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    const textElement = event.currentTarget.querySelector("span");

    gsap.to(textElement, {
      y: -10,
      duration: 0.1,
      ease: "power1.out",
      onComplete: () => {
        gsap.set(textElement, { y: 20, opacity: 1 });
        gsap.to(textElement, {
          y: 0,
          duration: 0.1,
          ease: "power1.in",
        });
      },
    });
  };

  const toggleMenu = () => {
    if (isMobileMenuOpen) {
      // Animate closing
      gsap.to(menuRef.current, {
        scaleY: 0, // Scale down to 0
        duration: 0.8,
        ease: "power2.inOut",
        onComplete: () => setMobileMenuOpen(false), // Set state after animation
      });
    } else {
      setMobileMenuOpen(true); // Open state
    }
  };

  const toggleCloseDrop = () => {
    if (isExpertiesHovered) {
      // Move all content down quickly before closing
      gsap.to(contentRef.current!.children, {
        y: 100,
        opacity: 0,
        duration: 0.2, // Fast closing speed
        stagger: -0.05, // Make all items disappear together
        ease: "power2.in",
      });

      // Then close the dropdown container
      gsap.to(menuRef.current, {
        scaleY: 0,
        duration: 0.6, // Faster closing
        ease: "power2.inOut",
        onComplete: () => setExpertiesHovered(false),
      });
    }
  };

  useEffect(() => {
    if (isExpertiesHovered) {
      // Open the dropdown container
      gsap.fromTo(
        menuRef.current,
        { scaleY: 0, transformOrigin: "top center" },
        { scaleY: 1, duration: 0.5, ease: "power2.inOut" }
      );

      // Animate each child separately with different speeds
      gsap.fromTo(
        contentRef.current!.children,
        { y: 80, opacity: 0 }, // Start from bottom
        {
          y: 0,
          opacity: 1,
          duration: 0.8, // Default duration
          stagger: 0.2, // Stagger the animation for each child
          ease: "power2.out",
          delay: 0.1, // Slight delay
        }
      );
    }
  }, [isExpertiesHovered]);

  const hoverHandel = (link: string) => {
    setHovered(link);
  };

  useEffect(() => {
    if (isMobileMenuOpen) {
      // Animate opening
      gsap.fromTo(
        menuRef.current,
        { scaleY: 0, transformOrigin: "top center" }, // Scale starts from top
        { scaleY: 1, duration: 0.5, ease: "power2.inOut" } // Full height
      );
    }
  }, [isMobileMenuOpen]);

  return (
    // <div className="w-screen bg-transparent font-AlbertSans_Regular flex justify-between items-center px-6 lg:px-20 py-4 top-0 z-10 overflow-hidden fixed">
    <div
      className={`w-screen font-AlbertSans_Regular flex justify-between items-center px-6 lg:px-20 py-6 top-0 z-10 overflow-hidden fixed `}
    >
      {/* Logo Section */}
      <div
        className=" font-bold text-2xl leading-none tracking-wider flex items-start   z-20"
        style={{ color: navTextColor || "#f6f6f6" }}
      >
        <span className="font-Poppins">WebMinds</span>
        <span className="text-[10px] mt-[2px] align-top">™</span>
      </div>

      {/* Desktop Navigation Links */}
      <nav className="hidden lg:flex ">
        <ul
          className="flex items-center space-x-16 text-sm font-semibold tracking-wider"
          style={{ color: navTextColor || "#f6f6f6" }} // Default color if not provided
        >
          {["Home", "Works", "Expertise", "Careers", "Contact"].map(
            (item, index) => (
              <li key={index} className="group">
                <Link
                  href={
                    item === "Home"
                      ? "/"
                      : item === "Expertise"
                      ? "#"
                      : `/${item.toLowerCase()}`
                  }
                  onMouseEnter={(e) => {
                    handleMouseEnter(e);
                    if (item === "Expertise") setExpertiesHovered(true);
                  }}
                  onMouseLeave={() => {
                    if (item === "Expertise") {
                      setExpertiesHovered(false);
                    }
                  }}
                  className="relative overflow-hidden flex items-center hover:opacity-50 gap-2 z-40"
                  style={{ perspective: "1000px" }}
                >
                  <span
                    className="block "
                    style={{
                      display: "inline-block",
                      transformOrigin: "center center", // Center the transform origin
                    }}
                  >
                    {item}
                  </span>
                  {item === "Expertise" && (
                    <div
                      className={`flex items-center rounded-full bg-[#fffdfc] bg-opacity-20 p-1`}
                    >
                      <FaArrowDown className={`bg-opacity-100 w-2 h-2 `} />
                    </div>
                  )}
                </Link>
                {item === "Expertise" && isExpertiesHovered && (
                  <div
                    className="fixed top-0 left-0 w-screen"
                    ref={menuRef}
                    style={{
                      transformOrigin: "top center",
                      transform: "scaleY(0)",
                      backgroundColor: bgColor || "#2D2D2D",
                    }}
                    onMouseEnter={() => setExpertiesHovered(true)}
                    onMouseLeave={() => toggleCloseDrop()}
                  >
                    <div
                      className="mt-28 px-24 mb-20 w-full flex justify-between"
                      ref={contentRef}
                    >
                      <div>Our Expertise</div>
                      <ul
                        className="md:text-3xl lg:text-4xl font-AlbertSans_Bold"
                        style={{
                          display: "inline-block",
                        }}
                      >
                        <li
                          className="px-4 py-3"
                          onMouseEnter={() => hoverHandel("marketing")}
                        >
                          <Link href="/Expertise/Digital-Marketing">
                            Digital Marketing
                          </Link>
                        </li>
                        <li
                          className="px-4 py-3"
                          onMouseEnter={() => hoverHandel("web")}
                        >
                          <Link href="/Expertise/Web-Development">
                            Website Development
                          </Link>
                        </li>
                        <li
                          className="px-4 py-3"
                          onMouseEnter={() => hoverHandel("social")}
                        >
                          <Link href="/Expertise/Social-Media-Management">
                            Social Media Management
                          </Link>
                        </li>
                        <li
                          className="px-4 py-3"
                          onMouseEnter={() => hoverHandel("brand")}
                        >
                          <Link href="/Expertise/Branding-n-Design">
                            Branding & Design
                          </Link>
                        </li>
                      </ul>
                      <div className="w-96 h-fit">
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
          onClick={toggleMenu}
          className="text-white text-2xl focus:outline-none transition-transform duration-300"
        >
          {isMobileMenuOpen ? (
            <IoClose className="transform rotate-180" />
          ) : (
            <HiMenuAlt1 className="transform rotate-0" />
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
                  <Link
                    href={
                      item === "Home"
                        ? "/"
                        : item === "Expertise"
                        ? "#"
                        : `/${item.toLowerCase()}`
                    }
                    onClick={() => toggleMenu()} // Close menu on click
                    className="relative inline-block overflow-hidden hover:opacity-70"
                  >
                    <span
                      className="block"
                      style={{
                        display: "inline-block",
                        transformOrigin: "center center",
                      }}
                    >
                      {item}
                    </span>
                  </Link>
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
