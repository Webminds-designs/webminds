"use client";

import Nav from "./Components/Nav";
import WeSection from "./Components/WeSection";
import Socials from "./Components/Socials";
import WhyUs from "./Components/WhyUs";
import Hero from "./Components/Hero";
import Bigfontloop from "./Components/Bigfontloop";
import Expertise from "./Components/Expertise";
import Works from "./Components/Works";
import Footer from "./Components/Footer";

import { motion } from "framer-motion";
import { useState } from "react";

export default function Home() {
  const [navigationAnimation, setNavigationAnimation] = useState(false);

  const pageVariants = {
    initial: {
      y: 0,
      scale: 1,
      opacity: 1,
    },
    animate: {
      y: "-20%",
      scale: 0.8,
      opacity: 0,
      transition: {
        duration: 1.2,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate={navigationAnimation ? "animate" : "initial"} // ✅ Apply condition here
    >
      <Nav />
      <Hero />
      <Bigfontloop />
      <WeSection />
      <Works
        bgcolor="bg-black"
        setNavigationAnimation={setNavigationAnimation}
      />
      <Expertise />
      <WhyUs />
      <Socials />
      <Footer bgColor={"bg-[#212121]"} />
    </motion.div>
  );
}
