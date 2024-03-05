'use client';

import styles from './Header.module.css';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ThemeChanger } from '@/components/ThemeChanger';
import { useTheme } from 'next-themes';
import { usePathname, useRouter } from 'next/navigation';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [logoTransformed, setLogoTransformed] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const { resolvedTheme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined')
      setIsDesktop(window.matchMedia('(min-width: 991px)').matches);

    if (isDesktop) {
      window.addEventListener('scroll', toggleLogos);
    }
  }, [isDesktop]);

  if (!mounted) {
    return null;
  }

  const routes = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about-us' },
    { name: 'Meet the team', path: '/meet-the-team' },
    { name: 'Recycle bin', path: '/recycle-bin' },
    { name: 'Contact', path: '/contact' },
  ];

  const toggleLogos = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 50) {
      setLogoTransformed(true);
    } else if (scrolled <= 50) {
      setLogoTransformed(false);
    }
  };

  return (
    <nav
      className={[
        styles.mainNavigation,
        menuOpen ? styles.active : undefined,
      ].join(' ')}
    >
      <div className={styles.navLinks}>
        <div className={styles.navLinksWrapper}>
          {pathname !== '/' && isDesktop && (
            <button
              type='button'
              className={styles.backButton}
              onClick={router.back}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='17.854'
                height='32.708'
                viewBox='0 0 17.854 32.708'
              >
                <path
                  id='Path_9'
                  data-name='Path 9'
                  d='M12266.168,650.717l14.232,14.233-14.232,14.233'
                  transform='translate(12281.9 681.304) rotate(180)'
                  fill='none'
                  stroke='#232323'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='3'
                />
              </svg>
            </button>
          )}
          {isDesktop && (
            <a
              href='/'
              className={[
                styles.logoMarkWrapper,
                logoTransformed ? styles.active : '',
              ].join(' ')}
            >
              <Image
                src={`/roger_directors_logo_mark_${
                  resolvedTheme ? resolvedTheme : 'dark'
                }.svg`}
                width={79.5}
                height={67}
                alt='Roger Directors logo mark'
              />
            </a>
          )}
          <a
            href='/'
            className={[
              styles.logoWrapper,
              logoTransformed ? styles.active : '',
            ].join(' ')}
          >
            <Image
              src={`/roger-directors-logo-${
                resolvedTheme ? resolvedTheme : 'dark'
              }.svg`}
              fill
              alt='Roger Directors logo'
            />
          </a>
          <div className={styles.wrapRightCorner}>
            <div className={styles.burgerWrap}>
              <div
                className={styles.burger}
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <div className={styles.bar}></div>
                <div className={styles.bar}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.modalNavMobile}>
        <div className={styles.modalBlock}>
          <div className={styles.modalBlockBackground} />
          <ul className={styles.ulMobile}>
            <span className={styles.modalSmallTitle}>Menu</span>
            {routes.map((route, index) => (
              <li
                key={index}
                className={pathname == route.path ? styles.active : ''}
              >
                <Link href={route.path} onClick={() => setMenuOpen(!menuOpen)}>
                  <span>{route.name}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className={styles.modalBlockFooter}>
            <ThemeChanger />

            <div className={styles.langSwitcher}></div>
          </div>
        </div>
      </div>
      <div className={styles.modalNavBackground} />
    </nav>
  );
}
