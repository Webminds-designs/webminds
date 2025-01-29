import { useScroll, useTransform } from "framer-motion";
import { motion } from "framer-motion";

const Section1 = ({ scrollYProgress }) => {
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.5]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -5]);

  return (
    <motion.div
      style={{ scale, rotate }}
      className="sticky top-0 h-screentext-[3.5vw] flex flex-col items-center justify-center text-white pb-[10vh]"
    >
      <div className="flex gap-4">
        <div className="relative w-full h-screen bg-[#f0f0f0] text-[3.5vw] flex flex-col items-center justify-center text-white">
          <p
            className="absolute left-10 bottom-0 text-[100px] font-semibold"
            style={{ fontFamily: 'eight, sans-serif', fontWeight: 400, fontStyle: 'normal' }}
          >
            Web Development
          </p>
          <img src="/Website.jpg" alt="img" className="w-full h-full object-cover" />
        </div>
      </div>
    </motion.div>
  );
};

export default Section1;
