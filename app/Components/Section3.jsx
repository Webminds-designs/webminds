import { useScroll, useTransform, motion } from "framer-motion";
import Pic2 from "../../public/17-D3SNb3Aq.jpg";

const Section2 = ({scrollYProgress}) => {

  // Define transforms based on scrollYProgress
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -5]);

  return (
    <motion.div style={{ scale, rotate }} className="relative h-screen bg-[#C723f6] text-[3.5vw] flex flex-col items-center justify-center text-white pb-[10vh]">
    <p>Section3</p>
      <img 
        src={Pic2}
        alt="img"
        className="w-full h-full object-cover"
      />
    </motion.div>
  );
};

export default Section2;
