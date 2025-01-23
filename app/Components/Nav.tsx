"use client";

import Link from "next/link";
import React from "react";
import { gsap } from "gsap";

const Nav = () => {
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

  return (
    <div className="w-full bg-transparent font-FunnelDisplayRegular flex justify-between items-center px-20 py-12">
      {/* Logo Section */}
      <div className="text-xl font-extrabold tracking-wide text-white">
        WebMinds
      </div>

      {/* Navigation Links */}
      <nav className="flex ">
        <ul className="flex items-center space-x-16 text-sm  text-white font-semibold ">
          <li>
            <Link
              href="/"
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
                Home
              </span>
            </Link>
          </li>
          <li>
            <Link
              href="/works"
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
                Works
              </span>
            </Link>
          </li>
          <li>
            <Link
              href="/experties"
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
                Experties
              </span>
            </Link>
          </li>
          <li>
            <Link
              href="/careers"
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
                Careers
              </span>
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
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
                Contact
              </span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Nav;
