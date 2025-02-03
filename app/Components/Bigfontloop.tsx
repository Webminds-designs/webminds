import React from "react";
import ParallaxText from "./ParallaxText";

const Bigfontloop = () => {
  return (
    <>
      <main className="flex flex-col items-center justify-center h-fit  bg-transparent text-text absolute bottom-0 ">
        <ParallaxText baseVelocity={-0.5} fontSize="text-[200px]">
          Crafting Beyond Ordinary Minds - Crafting Beyond Ordinary Minds -
          Crafting Beyond Ordinary Minds -
        </ParallaxText>
      </main>
      {/* space for other content */}
      <div className="w-screen h-screen"></div>
    </>
  );
};

export default Bigfontloop;
