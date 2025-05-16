'use client';

import React, { useRef } from "react";
import { motion } from "framer-motion";

const DURATION = 0.25;
const STAGGER = 0.025;

export const RevealLinks = () => {
  const headingRefs = useRef([]);

  return (
    <>
      <section className="grid place-content-center gap-2 px-8 py-24 text-[#f6f6f6] bg-[#050505]">
        <FlipLink href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer">
          Tiktok
        </FlipLink>
        <FlipLink href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
          Youtube
        </FlipLink>
        <FlipLink href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
          Facebook
        </FlipLink>
        <FlipLink
          href="https://www.instagram.com/webminds.designs?igsh=ZHVhaXdmNGY1emFz"
          target="_blank"
          rel="noopener noreferrer"
        >
          Instagram
        </FlipLink>
      </section>

      <hr className="border-t-20 border-gray-800 w-[90%] mx-auto bg-black/75" />

    </>
  );
};

const FlipLink = ({ children, href, ...props }) => {
  return (
    <motion.a
      initial="initial"
      whileHover="hovered"
      href={href}
      {...props}
      className="relative block overflow-hidden whitespace-nowrap text-4xl font-black uppercase sm:text-7xl md:text-8xl lg:text-9xl"
      style={{ lineHeight: 0.8 }}
    >
      <div>
        {children.split("").map((l, i) => (
          <motion.span
            variants={{
              initial: { y: 0 },
              hovered: { y: "-100%" },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            className="inline-block"
            key={`top-${i}`}
          >
            {l}
          </motion.span>
        ))}
      </div>
      <div className="absolute inset-0">
        {children.split("").map((l, i) => (
          <motion.span
            variants={{
              initial: { y: "100%" },
              hovered: { y: 0 },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            className="inline-block"
            key={`bottom-${i}`}
          >
            {l}
          </motion.span>
        ))}
      </div>
    </motion.a>
  );
};
