import { useScroll, useTransform } from "framer-motion";
import { motion } from "framer-motion";
import { useEffect } from "react";

const Section4 = ({ scrollYProgress }) => {
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 5]);

  useEffect(() => {
    scrollYProgress.onChange((v) => console.log("Scroll Progress:", v));
  }, [scrollYProgress]);

  return (
    <motion.div
      style={{ scale, rotate }}
      className="relative top-0 h-screen bg-[#000000] text-[3.5vw] flex flex-col items-center justify-center text-white pb-[10vh]"
    >
      <div className="relative w-full h-full flex items-center justify-center text-white">
        <p
          className="absolute left-10 bottom-0 text-[100px] font-semibold"
          style={{ fontFamily: 'eight, sans-serif', fontWeight: 400, fontStyle: 'normal', lineHeight: '90px' }}
        >
          Branding & Design
        </p>
        <img src="/Brand3.jpg" alt="img" className="w-full h-full object-cover" />
      </div>
    </motion.div>
  );
};

export default Section4;
