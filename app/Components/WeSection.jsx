import { useState } from "react";
import { motion } from "framer-motion";
import useMousePosition from "../utils/useMousePosition";
import styles from "../styles/pages.module.css";

export default function Home() {
  const [isHovered, setIsHovered] = useState(false);
  const { x, y } = useMousePosition();
  const size = isHovered ? 500 : 40;

  return (
    <main className={styles.main}>
      <motion.div
        className={styles.mask}
        style={{
          WebkitMaskPosition: `${x - size / 2}px ${y - size / 2}px`,
          maskPosition: `${x - size / 2}px ${y - size / 2}px`,
          WebkitMaskSize: `${size}px`,
          maskSize: `${size}px`,
        }}
        animate={{
          WebkitMaskSize: `${size}px`,
          maskSize: `${size}px`,
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.5 }}
      >
        <p
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="w-[90%] p-[40px]"
        >
          We’re WebMinds—innovative to the point of exhaustion. We whip up
          websites, babysit social media, and sprinkle in some branding and
          digital marketing magic. Our mission? To turn your half-baked ideas
          into digital wonders that mostly work. Creative? Sure. Passionate? If
          the Wi-Fi holds up. We’re WebMinds, and we’re here to help.
        </p>
      </motion.div>

      <div className={styles.body}>
        <p className="w-[90%] p-[40px]">
          We Are{" "}
          <span
            style={{
              fontFamily: "eight, sans-serif",
              fontWeight: 400,
              fontStyle: "normal",
            }}
          >
            WebMinds
          </span>
          —innovative, dynamic, and results-driven. We specialize in{" "}
          <span
            style={{
              fontFamily: "eight, sans-serif",
              fontWeight: 400,
              fontStyle: "normal",
            }}
          >
            website creation
          </span>
          ,
          <span
            style={{
              fontFamily: "eight, sans-serif",
              fontWeight: 400,
              fontStyle: "normal",
            }}
          >
            {" "}
            social media management
          </span>
          ,
          <span
            style={{
              fontFamily: "eight, sans-serif",
              fontWeight: 400,
              fontStyle: "normal",
            }}
          >
            {" "}
            branding
          </span>
          ,
          <span
            style={{
              fontFamily: "eight, sans-serif",
              fontWeight: 400,
              fontStyle: "normal",
            }}
          >
            design
          </span>
          ,<span> </span>and
          <span
            style={{
              fontFamily: "eight, sans-serif",
              fontWeight: 400,
              fontStyle: "normal",
            }}
          >
            {" "}
            digital marketing
          </span>
          . Our mission is to turn ideas into engaging digital experiences. From
          strategy to execution, we deliver with creativity and precision. We
          work thoughtfully, creatively, and passionately.
        </p>
      </div>
    </main>
  );
}
