'use client';

import Image from 'next/image';
import styles from './Footer.module.css';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import BackToTopButton from './BackToTopButton';

export const Footer = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <footer id='footer' className={styles.footer}>
      <BackToTopButton />

      <div className={styles.footerTop}>
        <ul className={styles.footerMenu}>
          <li>
            <Link href='/'>
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link href='/about-us'>
              <span>About Us</span>
            </Link>
          </li>
          <li>
            <Link href='/meet-the-team'>
              <span>Meet the team</span>
            </Link>
          </li>
          <li>
            <Link href='/recycle-bin'>
              <span>Recycle bin</span>
            </Link>
          </li>
          <li>
            <Link href='/contact'>
              <span>Contact</span>
            </Link>
          </li>
        </ul>
        <div className={styles.contact}>
          <h4>Contact</h4>
          <div>
            <a href='https://maps.app.goo.gl/fKqcc55W631hDPdm6' target='_blank'>
              <p>Bulevar Mihaila</p>
              <p>Pupina 13/37</p>
              <p>11070 Beograd,</p>
              <p>Srbija</p>
            </a>
            <div>
              <a href='mailto:office@roger.rs'>office@roger.rs</a>
              <a href='tel:555-555-5555'>555-555-5555</a>
            </div>
          </div>
        </div>
        <div className={styles.socials}>
          <h4>Find us on</h4>
          <a href='' target='_blank'>
            Instagram
          </a>
          <a href='' target='_blank'>
            LinkedIn
          </a>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <a href='/' className={styles.logoWrapper}>
          <Image
            src={`/roger-directors-logo-${
              resolvedTheme
                ? resolvedTheme === 'dark'
                  ? 'light'
                  : 'dark'
                : 'light'
            }.svg`}
            fill
            sizes='(max-width: 768px) 135px, 172px'
            alt='Roger Directors logo'
          />
        </a>
      </div>
    </footer>
  );
};
