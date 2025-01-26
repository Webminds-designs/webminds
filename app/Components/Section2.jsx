import { useScroll, useTransform, motion } from "framer-motion";

const Section2 = ({ scrollYProgress }) => {
  // Define transforms based on scrollYProgress
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [5, 0]);

  return (
    <motion.div
      style={{ scale, rotate }}
      className="relative h-screen bg-[#f0f0f0] text-[3.5vw] flex flex-col items-center justify-center text-white"
    >
      <img
        src="/Social-Media.jpg"
        alt="img"
        className="w-full h-full object-cover"
      />
    </motion.div>
  );
};

export default Section2;
