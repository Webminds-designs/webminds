import { useScroll,useTransform } from "framer-motion";
import { motion } from "framer-motion";
import Pic1 from "../../public/17-D3SNb3Aq.jpg"

const Section4 = ({scrollYProgress}) => {

  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [5, 0]);

    return (
      <motion.div style={{scale, rotate}} className="sticky top-0 h-screen bg-[#494136] text-[3.5vw] flex flex-col items-center justify-center text-white pb-[10vh]">
        <div className="flex gap-4">
          <p>Section4</p>
          <div className="relative w-[12.5vw]">
            <img 
              src={Pic1}
              alt="img"
            />
          </div>
        </div>
      </motion.div>
    )
}

export default Section4;
