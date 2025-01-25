"use client";

import Nav from "./Components/Nav";
import ExpertiseSection from "./Components/ExpertiseSection";
import WeSection from "./Components/WeSection";
import WhyUs from "./Components/WhyUs";
import Hero from "./Components/Hero";
import Bigfontloop from "./Components/Bigfontloop";

export default function Home() {
  return (
    <div>
      <Nav />
      <Hero />
      <Bigfontloop />
      {/* <h1>Let's begin</h1> */}
      <WeSection />
      <ExpertiseSection />
      <WhyUs />
    </div>
  );
}
