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

export default function Home() {
  return (
    <div>
      <Nav bgColor="" />
      <Hero />
      <Bigfontloop />
      <WeSection />
      <Works bgcolor="#fffff" />
      <Expertise />
      <WhyUs />
      <Socials />
      <Footer bgColor={"bg-[#212121]"} />
    </div>
  );
}
