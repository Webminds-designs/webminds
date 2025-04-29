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

  return (
    <div>
      <Nav />
      <Hero />
      <Bigfontloop />
      <WeSection />
      <Works />
      <Expertise />
      <WhyUs />
      <Socials />
      <Footer bgColor={"bg-[#212121]"} />
    </div>
  );
}
