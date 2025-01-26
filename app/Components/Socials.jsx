'use client';
import styles from '../styles/socials.module.css'
import MagneticIcons from './MagneticIcons';

export default function Socials() {
  return (
    <main className={styles.main}>

      <h1 className="text-xl font-bold">Socials</h1>

      <div className={styles.container}>
        <MagneticIcons>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <img src="/facebook.svg" alt="Facebook" />
          </a>
        </MagneticIcons>
        
        <MagneticIcons>
          <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer">
            <img src="/tik-tok.svg" alt="TikTok" />
          </a>
        </MagneticIcons>

        <MagneticIcons>
          <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
            <img src="/youtube.svg" alt="YouTube" />
          </a>
        </MagneticIcons>

        <MagneticIcons>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <img src="/instagram.svg" alt="Instagram" />
          </a>
        </MagneticIcons>
        
      </div>
    </main>
  );
}
