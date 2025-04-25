import styles from '../styles/pages.module.css';
import { useState } from 'react';  
import { motion } from 'framer-motion';
import useMousePosition from '../utils/useMousePosition';

export default function Home() {
  const [isHovered, setIsHovered] = useState(false);
  const { x, y } = useMousePosition();
  const size = isHovered ? 500 : 40;

  return (
    <main className={styles.main}>
      <motion.div 
        className={styles.mask}
        style={{
          WebkitMaskPosition: `${x- size / 2}px ${y- size / 2}px`,
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
        >
      Why Us—We turn your wildest ideas into something that works (most of the time). Fueled by 
      coffee, creativity, and a touch of chaos, we craft designs that dazzle, content that clicks, 
      and solutions that stick. From brainstorming to launch, we deliver exceptional results—Wi-Fi 
      tantrums permitting.        
      </p>
      </motion.div>

      <div className={styles.body}>
        <p>
         <span style={{ fontFamily: 'sans-serif', fontWeight: 400, fontStyle: 'normal' }} >Why Us</span>—At WebMinds, we combine innovation, creativity, and expertise 
         to bring your vision to life. From strategy to execution, we deliver tailored digital 
         solutions that drive results and make an impact. With a commitment to precision and 
         excellence, we’re here to help you succeed.
        </p>
      </div>
    </main>
  );
}
