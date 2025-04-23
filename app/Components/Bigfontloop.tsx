import React from "react";
import ParallaxText from "./ParallaxText";

const Bigfontloop = () => {
  return (
    <>
      <main className="flex flex-col items-center justify-center h-fit  bg-transparent text-text absolute bottom-0 ">
        <div className="flex w-full px-4 md:px-8 justify-between font-AlbertSans_Bold relative -bottom-10 tracking-tighter">
          <div className=" white">beyond</div>
          <div className=" white">ordinary</div>
          <div className="white">minds</div>
        </div>
        <ParallaxText baseVelocity={-0.4} fontSize="text-[200px]">
          Crafting Beyond Ordinary Minds - Crafting Beyond Ordinary Minds -
          Crafting Beyond Ordinary Minds -
        </ParallaxText>
      </main>
      {/* space for other content */}
      <div className="w-screen  md:h-20 bg-transparent"></div>
      <div className="w-screen  md:h-80 bg-transparent"></div>
      <div className="w-screen h-screen"></div>
    </>
  );
};

export default Bigfontloop;
