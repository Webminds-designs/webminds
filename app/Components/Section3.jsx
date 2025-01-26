import { useScroll, useTransform, motion } from "framer-motion";
import Pic2 from "../../public/mask.svg";

const Section2 = ({scrollYProgress}) => {

  // Define transforms based on scrollYProgress
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -5]);

  return (
    <motion.div style={{ scale, rotate }} className="relative h-screen bg-[#C723f6] text-[3.5vw] flex flex-col items-center justify-center text-white">
      <img
        src="/DigitalMarketing.jpg"
        alt="img"
        className="w-full h-full object-cover"
      />
    </motion.div>
  );
};

export default Section2;
