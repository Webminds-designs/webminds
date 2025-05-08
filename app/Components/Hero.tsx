import React, { useRef, useEffect, useState } from "react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import animationweb from "../../public/animation2.json";
import animationmob from "../../public/animation2mobi.json";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [isPotrait, setIsPotrait] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsPotrait(window.innerWidth < window.innerHeight);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!lottieRef.current || !containerRef.current) return;

    const totalFrames = lottieRef.current.getDuration(true);

    const reverseAnimation = () => {
      let currentFrame: number = totalFrames || 0;
      const interval = setInterval(() => {
        if (currentFrame <= 0) {
          clearInterval(interval);
        } else {
          currentFrame -= 1;
          lottieRef.current?.goToAndStop(currentFrame, true);
        }
      }, 100);
    };

    reverseAnimation();

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom 50%",
      scrub: true,
      onUpdate: (self) => {
        const frame = Math.floor(self.progress * (totalFrames ?? 0));
        lottieRef.current?.goToAndStop(frame, true);
      },
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-screen h-screen bg-black fixed top-0 left-0 flex items-center justify-center -z-10 overflow-hidden"
    >
      <div className="w-screen h-full overflow-hidden">
        <Lottie
          lottieRef={lottieRef}
          animationData={isPotrait ? animationmob : animationweb}
          loop={false}
          autoplay={false}
          className="w-screen object-cover overflow-hidden"
        />
      </div>
    </div>
  );
};

export default Hero;
