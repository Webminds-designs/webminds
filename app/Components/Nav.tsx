"use client";

import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import Image from "next/image";

import logo from "../../public/assets/WebMinds Logo_WebMinds Blue.png";

import { HiMenuAlt1 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { FaArrowDown } from "react-icons/fa6";

const Nav = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isExpertiesHovered, setExpertiesHovered] = useState(false);
  const [Hovered, setHovered] = useState("marketing");
  const menuRef = useRef(null);

  const handleMouseEnter = (event) => {
    const textElement = event.currentTarget.querySelector("span");

    gsap.to(textElement, {
      y: -10, // Move the text up
      duration: 0.2,
      ease: "power1.out",
      onComplete: () => {
        // After it moves up, reset to bottom position and animate back up
        gsap.set(textElement, { y: 20 }); // Reset to below the original position
        gsap.to(textElement, {
          y: 0, // Animate it back to its original position
          duration: 0.2,
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
        duration: 0.5,
        ease: "power2.inOut",
        onComplete: () => setMobileMenuOpen(false), // Set state after animation
      });
    } else {
      setMobileMenuOpen(true); // Open state
    }
  };

  const toggleCloseDrop = () => {
    if (isExpertiesHovered) {
      // Closing the dropdown
      gsap.to(menuRef.current, {
        scaleY: 0, // Scale down to 0
        duration: 0.5,
        ease: "power2.inOut",
        onComplete: () => setExpertiesHovered(false), // Set state after animation
      });
    }
  };

  useEffect(() => {
    if (isExpertiesHovered) {
      // Opening the dropdown
      gsap.fromTo(
        menuRef.current,
        { scaleY: 0, transformOrigin: "top center" }, // Start from scaleY 0
        { scaleY: 1, duration: 0.5, ease: "power2.inOut" } // Scale to full height
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
    <div className="w-full bg-transparent font-FunnelDisplayRegular flex justify-between items-center px-6 lg:px-20 py-4 relative">
      {/* Logo Section */}
      <div className="w-24 cursor-pointer z-30">
        <Image src={logo} alt="logo" />
      </div>

      {/* Desktop Navigation Links */}
      <nav className="hidden lg:flex ">
        <ul className="flex items-center space-x-16 text-sm text-white font-semibold">
          {["Home", "Works", "Experties", "Careers", "Contact"].map(
            (item, index) => (
              <li key={index} className="group">
                <Link
                  href={`/${item.toLowerCase()}`}
                  onMouseEnter={(e) => {
                    handleMouseEnter(e);
                    if (item === "Experties") setExpertiesHovered(true);
                  }}
                  onMouseLeave={() => {
                    if (item === "Experties") {
                      setExpertiesHovered(false);
                    }
                  }}
                  className="relative overflow-hidden flex items-center hover:opacity-50 gap-2 z-30"
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
                  {item === "Experties" && (
                    <div className="flex items-center rounded-full bg-gray-700 p-1">
                      <FaArrowDown className="text-white w-2 h-2 " />
                    </div>
                  )}
                </Link>
                {item === "Experties" && isExpertiesHovered && (
                  <div
                    className="fixed top-0 left-0 w-screen flex items-center justify-between bg-[#212121] shadow-lg opacity-100 transition-opacity duration-300 z-10"
                    ref={menuRef}
                    style={{ transformOrigin: "top center", scaleY: 0 }}
                    onMouseEnter={() => setExpertiesHovered(true)}
                    onMouseLeave={() => toggleCloseDrop()}
                  >
                    <div className="mt-28 px-24 mb-20 w-full flex justify-between">
                      <div>Our Experties</div>
                      <ul className="md:text-3xl lg:text-5xl ">
                        <li
                          className="px-4 py-3"
                          onMouseEnter={() => hoverHandel("marketing")}
                        >
                          <Link href="/experties/marketing">
                            Digital Marketing
                          </Link>
                        </li>
                        <li
                          className="px-4 py-3"
                          onMouseEnter={() => hoverHandel("web")}
                        >
                          <Link href="/experties/development">
                            Website Development
                          </Link>
                        </li>
                        <li
                          className="px-4 py-3"
                          onMouseEnter={() => hoverHandel("social")}
                        >
                          <Link href="/experties/socialmedia">
                            Social Media
                          </Link>
                        </li>
                        <li
                          className="px-4 py-3"
                          onMouseEnter={() => hoverHandel("brand")}
                        >
                          <Link href="/experties/branding">
                            Branding & Design
                          </Link>
                        </li>
                      </ul>
                      <div className="w-80 h-80">
                        {Hovered === "web" ? (
                          <div className="w-full h-full bg-slate-400">
                            Development
                          </div>
                        ) : Hovered === "marketing" ? (
                          <div className="w-full h-full bg-green-200">
                            Social Media marketing
                          </div>
                        ) : Hovered === "social" ? (
                          <div className="w-full h-full bg-red-400">
                            Social Media Haandling
                          </div>
                        ) : Hovered === "brand" ? (
                          <div className="w-full h-full bg-yellow-100">
                            Branding and Design
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
      <div className="lg:hidden z-20">
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
          className="fixed top-0 left-0 w-full h-full bg-[#212121] flex flex-col items-start justify-center z-10 px-8"
          style={{ transformOrigin: "top center", scaleY: 0 }} // Ensure scale starts from top
        >
          <ul className="space-y-3 text-white text-4xl font-bold text-start">
            {["Home", "Works", "Experties", "Careers", "Contact"].map(
              (item, index) => (
                <li key={index}>
                  <Link
                    href={`/${item.toLowerCase()}`}
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
