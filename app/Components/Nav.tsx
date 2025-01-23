"use client";

import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import Image from "next/image";

import logo from "../../public/assets/WebMinds Logo_WebMinds Blue.png";

import { HiMenuAlt1 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";

const Nav = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
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
      <div className="w-24 cursor-pointer z-20">
        <Image src={logo} alt="logo" />
      </div>

      {/* Desktop Navigation Links */}
      <nav className="hidden lg:flex">
        <ul className="flex items-center space-x-16 text-sm text-white font-semibold">
          {["Home", "Works", "Experties", "Careers", "Contact"].map(
            (item, index) => (
              <li key={index}>
                <Link
                  href={`/${item.toLowerCase()}`}
                  onMouseEnter={handleMouseEnter}
                  className="relative inline-block overflow-hidden hover:opacity-50"
                  style={{ perspective: "1000px", display: "inline-block" }}
                >
                  <span
                    className="block"
                    style={{
                      display: "inline-block",
                      transformOrigin: "center center", // Center the transform origin
                    }}
                  >
                    {item}
                  </span>
                </Link>
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
