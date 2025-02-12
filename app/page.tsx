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
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./store";

import { stopAnimation } from "./store/animationSlice";
import { useEffect } from "react";

export default function Home() {
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
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(stopAnimation());
  }, [dispatch]);

  const isAnimating = useSelector(
    (state: RootState) => state.animation.isAnimating
  );

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate={isAnimating ? "animate" : "initial"}
    >
      <Nav />
      <Hero />
      <Bigfontloop />
      <WeSection />
      <Works bgcolor="bg-black" />
      <Expertise />
      <WhyUs />
      <Socials />
      <Footer bgColor={"bg-[#212121]"} />
    </motion.div>
  );
}
