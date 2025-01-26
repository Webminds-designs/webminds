"use client";

import Nav from "./Components/Nav";
// import ExpertiseSection from "./Components/ExpertiseSection";
import WeSection from "./Components/WeSection";
import Socials from "./Components/Socials";
import WhyUs from "./Components/WhyUs";
import Hero from "./Components/Hero";
// import Artwork from "./Components/Artwork";
import Bigfontloop from "./Components/Bigfontloop";
import Expertise from "./Components/Expertise";

export default function Home() {
  return (
    <div>
      <Nav />
      <Hero />
      <Bigfontloop />
      <WeSection />
      <Expertise />
      {/* <ExpertiseSection /> */}
      <WhyUs />
      <Socials />
      {/* <Artwork /> */}
    </div>
  );
}
