'use client';
import styles from '../styles/socials.module.css'
import MagneticIcons from './MagneticIcons';

export default function Socials() {
  return (
    <main className={styles.main}>

      {/* <h1 className="text-[150px] font-bold text-[#20a5e2]">SOCIALS</h1> */}

      <div className={styles.container}>
        <MagneticIcons>
          <a href="https://www.facebook.com/share/1DAHKSvb6y/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer">
            <img src="/facebook.svg" alt="Facebook" />
          </a>
        </MagneticIcons>
        
        <MagneticIcons>
          <a href="https://www.tiktok.com/@webminds_?_t=ZS-8tOO77I5S35&_r=1" target="_blank" rel="noopener noreferrer">
            <img src="/tik-tok.svg" alt="TikTok" />
          </a>
        </MagneticIcons>

        <MagneticIcons>
          <a href="https://www.youtube.com/@WebMindsuk" target="_blank" rel="noopener noreferrer">
            <img src="/youtube.svg" alt="YouTube" />
          </a>
        </MagneticIcons>

        <MagneticIcons>
          <a href="https://www.instagram.com/webminds.designs?igsh=MTdnNjR0MXhsZmR1bw%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer">
            <img src="/instagram.svg" alt="Instagram" />
          </a>
        </MagneticIcons>
        
      </div>
    </main>
  );
}
