"use client";

import Nav from "./Components/Nav";
import ExpertiseSection from "./Components/ExpertiseSection";
import WeSection from "./Components/WeSection";

export default function Home() {
  return (
    <div>
      <Nav />
      {/* <h1>Let's begin</h1> */}
      <WeSection />
      <ExpertiseSection />
      <WeSection />

    </div>
  );
}
