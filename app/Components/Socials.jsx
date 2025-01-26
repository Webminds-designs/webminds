'use client';
import styles from '../styles/socials.module.css'
import MagneticIcons from './MagneticIcons';

export default function Socials() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
          <MagneticIcons>
            <img src="/facebook.svg" alt="Icon 1" />
          </MagneticIcons>
          
          <MagneticIcons>
            <img src="/instagram.svg" alt="Icon 2" />
          </MagneticIcons>
          
          <MagneticIcons>
            <img src="/youtube.svg" alt="Icon 4" />
          </MagneticIcons>
          
          <MagneticIcons>
            <img src="/tik-tok.svg" alt="Icon 3" />
          </MagneticIcons>
          
        </div>
      </main>
  );
}
