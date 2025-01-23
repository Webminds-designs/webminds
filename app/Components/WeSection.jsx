import styles from '../styles/pages.module.css';
import { useState } from 'react';  
import { motion } from 'framer-motion';
import useMousePosition from '../utils/useMousePosition';

export default function Home() {
  const [isHovered, setIsHovered] = useState(false);
  const { x, y } = useMousePosition();
  const size = isHovered ? 400 : 40;

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
          Blah Blah Blah a typical name
        </p>
      </motion.div>

      <div className={styles.body}>
        <p>
         We Are <span>WebMinds</span>
        </p>
      </div>
    </main>
  );
}
