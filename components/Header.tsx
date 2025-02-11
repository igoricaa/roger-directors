'use client';

import styles from './Header.module.css';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import Link from '@/components/Link';
import { ThemeChanger } from '@/components/ThemeChanger';
import { useTheme } from 'next-themes';
import { usePathname, useRouter } from 'next/navigation';
import { routes } from '@/utils/data';

// TODO: router back button - odvoji u poseban komponent
// TODO: mobileMenu - odvoji u poseban komponent
export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [logoTransformed, setLogoTransformed] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const { resolvedTheme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();
  const burgerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback(
    (event: any) => {
      if (
        menuOpen &&
        menuRef.current &&
        !menuRef.current!.contains(event.target) &&
        !burgerRef.current!.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    },
    [menuOpen, menuRef, burgerRef]
  );

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined')
      setIsDesktop(window.matchMedia('(min-width: 1024px)').matches);

    if (isDesktop) {
      window.addEventListener('scroll', toggleLogos);
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      if (isDesktop) {
        window.removeEventListener('scroll', toggleLogos);
      }

      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside, isDesktop]);

  if (!mounted) {
    return null;
  }

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
              aria-label='Back button'
              title='Back button'
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
            <Link
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
            </Link>
          )}
          <Link
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
              sizes='(max-width: 680px) 110px, 284px'
              alt='Roger Directors logo'
              priority
            />
          </Link>
          <div className={styles.wrapRightCorner}>
            <div className={styles.burgerWrap}>
              <div
                className={styles.burger}
                ref={burgerRef}
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
        <div className={styles.modalBlock} ref={menuRef}>
          <div className={styles.modalBlockBackground} />
          <div className={styles.mobileMenuWrapper}>
            <span className={styles.modalSmallTitle}>Menu</span>
            <ul>
              {routes.map((route, index) => (
                <li
                  key={index}
                  className={
                    pathname == route.path && route.name !== 'Projects'
                      ? styles.active
                      : ''
                  }
                >
                  <Link
                    href={route.path}
                    onClickHandler={() => setMenuOpen(!menuOpen)}
                  >
                    {route.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className={styles.switchersWrapper}>
              <ThemeChanger />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.modalNavBackground} />
    </nav>
  );
}
