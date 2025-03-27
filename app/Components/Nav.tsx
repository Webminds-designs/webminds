"use client";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import Image from "next/image";

import logo from "../../public/assets/Webminds-dark.webp";

import { HiMenuAlt1 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { FaArrowDown } from "react-icons/fa6";

import im1 from "../../public/assets/DigitalMarketing.jpg";
import im2 from "../../public/assets/Website.jpg";
import im3 from "../../public/assets/Social-Media.jpg";
import im4 from "../../public/assets/tembrand.png";

import { motion } from "framer-motion";

const Nav = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isExpertiesHovered, setExpertiesHovered] = useState(false);
  const [Hovered, setHovered] = useState("marketing");

  const menuRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

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
      if (menuRef.current) {
        gsap.to(menuRef.current, {
          scaleY: 0,
          duration: 0.8,
          ease: "power2.inOut",
          onComplete: () => setMobileMenuOpen(false),
        });
      }
    } else {
      setMobileMenuOpen(true);
    }
  };

  const toggleCloseDrop = () => {
    if (isExpertiesHovered && contentRef.current && menuRef.current) {
      gsap.to(contentRef.current.children, {
        y: 100,
        opacity: 0,
        duration: 0.2,
        stagger: -0.05,
        ease: "power2.in",
      });

      gsap.to(menuRef.current, {
        scaleY: 0,
        duration: 0.6,
        ease: "power2.inOut",
        onComplete: () => setExpertiesHovered(false),
      });
    }
  };

  useEffect(() => {
    if (isExpertiesHovered && menuRef.current && contentRef.current) {
      gsap.fromTo(
        menuRef.current,
        { scaleY: 0, transformOrigin: "top center" },
        { scaleY: 1, duration: 0.5, ease: "power2.inOut" }
      );

      gsap.fromTo(
        contentRef.current.children,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          delay: 0.1,
        }
      );
    }
  }, [isExpertiesHovered]);

  useEffect(() => {
    if (isMobileMenuOpen && menuRef.current) {
      gsap.fromTo(
        menuRef.current,
        { scaleY: 0, transformOrigin: "top center" },
        { scaleY: 1, duration: 0.5, ease: "power2.inOut" }
      );
    }
  }, [isMobileMenuOpen]);

  const hoverHandel = (link: string) => {
    setHovered(link);
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
                <Link
                  href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  onMouseEnter={(e) => {
                    handleMouseEnter(e);
                    if (item === "Experties") setExpertiesHovered(true);
                  }}
                  onMouseLeave={() => {
                    if (item === "Experties") {
                      setExpertiesHovered(false);
                    }
                  }}
                  className="relative overflow-hidden flex items-center hover:opacity-50 gap-2 z-40"
                  style={{ perspective: "1000px" }}
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
                  {item === "Experties" && (
                    <div className="flex items-center rounded-full bg-white bg-opacity-30 p-1">
                      <FaArrowDown className="text-white w-2 h-2" />
                    </div>
                  )}
                </Link>
                {item === "Experties" && isExpertiesHovered && (
                  <div
                    className="fixed top-0 left-0 w-screen flex items-center justify-between bg-[#212121] shadow-lg opacity-100 transition-opacity duration-300 z-30"
                    ref={menuRef}
                    style={{
                      transformOrigin: "top center",
                      transform: "scaleY(0)",
                    }}
                    onMouseEnter={() => setExpertiesHovered(true)}
                    onMouseLeave={() => toggleCloseDrop()}
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
                      <div className="w-96 h-fit">
                        {Hovered === "web" ? (
                          <motion.div className="w-full h-fit">
                            <Image
                              src={im2}
                              alt="Web"
                              className="w-full h-auto"
                            />
                          </motion.div>
                        ) : Hovered === "marketing" ? (
                          <Image
                            src={im1}
                            alt="Marketing"
                            className="w-full h-auto"
                          />
                        ) : Hovered === "social" ? (
                          <Image
                            src={im3}
                            alt="Social"
                            className="w-full h-auto"
                          />
                        ) : Hovered === "brand" ? (
                          <Image
                            src={im4}
                            alt="Branding"
                            className="w-full h-auto"
                          />
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
          style={{ transformOrigin: "top center", transform: "scaleY(0)" }}
        >
          <ul className="space-y-3 text-white text-4xl font-bold text-start">
            {["Home", "Works", "Experties", "Careers", "Contact"].map(
              (item, index) => (
                <li key={index}>
                  <Link
                    href={`/${item.toLowerCase()}`}
                    onClick={() => toggleMenu()}
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
