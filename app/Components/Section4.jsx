import { useScroll,useTransform } from "framer-motion";
import { motion } from "framer-motion";

const Section4 = ({scrollYProgress}) => {

  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [5, 0]);

    return (
      <motion.div style={{scale, rotate}} className="sticky top-0 h-screen bg-[#000000] text-[3.5vw] flex flex-col items-center justify-center text-white pb-[10vh]">
        <div className="flex gap-4">
          <div className="relative w-full h-full">
          <img
            src="/Social-Media2.jpg"
            alt="img"
            className="w-full h-full object-cover"
          />
          </div>
        </div>
      </motion.div>
    )
}

export default Section4;
