'use client';

import Image from 'next/image';
import styles from './Footer.module.css';
import Link from '@/components/Link';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import BackToTopButton from './BackToTopButton';
import { routes } from '@/utils/data';

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

      <div id='footerTop' className={styles.footerTop}>
        <ul className={styles.footerMenu}>
          {routes.map((route, index) => (
            <li key={index}>
              <Link href={route.path}>{route.name}</Link>
            </li>
          ))}
        </ul>
        <div className={styles.contact}>
          <h3>Contact</h3>
          <div>
            <a href='https://maps.app.goo.gl/cXYtDYMmb9Ymaxqu8' target='_blank'>
              <p>Resavska 33.</p>
              <p>11000 Belgrade</p>
              <p>Serbia</p>
            </a>
            <div>
              <a href='mailto:office@roger.rs'>office@roger.rs</a>
              <a href='tel:00381604200410'>+ 381 60 42 00 410</a>
              <a href='tel:00381641177187'>+ 381 64 11 77 187</a>
            </div>
          </div>
        </div>
        <div className={styles.socials}>
          <h3>Find us on</h3>
          <a href='https://www.instagram.com/roger.directors' target='_blank'>
            Instagram
          </a>
          <a
            href='https://www.linkedin.com/company/roger-directors'
            target='_blank'
          >
            LinkedIn
          </a>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <Link href='/' className={styles.logoWrapper}>
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
        </Link>
      </div>
    </footer>
  );
};
