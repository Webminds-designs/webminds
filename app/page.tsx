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
import Works from "./Components/Works";
import Footer from "./Components/Footer";

export default function Home() {
  return (
    <div>
      <Nav />
      <Hero />
      <Bigfontloop />
      <WeSection />
      <Works />
      <Expertise />
      {/* <ExpertiseSection /> */}
      <WhyUs />
      <Socials />
      {/* <Artwork /> */}
      <Footer bgColor={"bg-[#212121]"} />
    </div>
  );
}
