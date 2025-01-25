import styles from '../styles/socials.module.scss'
import MagneticIcons from './MagneticIcons';
import facebook from '../../public/Icons/facebook-app-symbol.svg';
import Insta from '../../public/Icons/instagram.svg';
import tikt from '../../public/Icons/tik-tok.svg';
import yout from '../../public/Icons/youtube.svg'; 

export default function Socials() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <MagneticIcons>
          <img src={facebook} alt="Facebook Icon" aria-label="Social Icon 1" />
        </MagneticIcons>

        <MagneticIcons>
          <img src={Insta} alt="Instagram Icon" aria-label="Social Icon 2" />
        </MagneticIcons>

        <MagneticIcons>
          <img src={tikt} alt="TikTok Icon" aria-label="Social Icon 3" />
        </MagneticIcons>

        <MagneticIcons>
          <img src={yout} alt="YouTube Icon" aria-label="Social Icon 4" />
        </MagneticIcons>
      </div>
    </main>
  )
}
