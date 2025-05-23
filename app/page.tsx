// app/page.tsx

import Nav from "./Components/Nav";
import WeSection from "./Components/WeSection";
import { RevealLinks } from "./Components/SocialsLinks";
import WhyUs from "./Components/WhyUs";
import Hero from "./Components/Hero";
import Bigfontloop from "./Components/Bigfontloop";
import Expertise from "./Components/Expertise";
import Works from "./Components/Works";
import Footer from "./Components/Footer";

// ✅ This forces static generation
export const dynamic = "force-static";
export const revalidate = false;

export default async function Home() {
  return (
    <div>
      <Nav bgColor="" />
      <Hero />
      <Bigfontloop />
      <WeSection />
      <Works />
      <Expertise />
      <WhyUs />
      <RevealLinks />
      <Footer
        bgColorBottom="#141647"
        bgColorMid="#06060f"
        bgColorTop="#050505"
      />
    </div>
  );
}
