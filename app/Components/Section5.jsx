import { useScroll, useTransform, motion } from "framer-motion";

const Section2 = ({ scrollYProgress }) => {
  // Define transforms based on scrollYProgress
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const rotate = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <motion.div
      style={{ scale, rotate }}
      className=" sticky top-0 relative h-screen bg-[#f0f0f0] text-[3.5vw] flex flex-col items-center justify-center text-white"
    >
      <p className="absolute left-10 bottom-0 text-[100px] font-semibold"
      style={{ fontFamily: 'eight, sans-serif', fontWeight: 400, fontStyle: 'normal' }}
      >Branding & Design</p>

      <img
        src="/Brand3.jpg"
        alt="img"
        className="w-full h-full object-cover"
      />
    </motion.div>
  );
};

export default Section2;
