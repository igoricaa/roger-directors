'use client';

import { useEffect, useState } from 'react';
import styles from './BackToTopButton.module.css';

export default function BackToTopButton() {
  const [visible, setVisible] = useState(false);
  const [isAtFooter, setIsAtFooter] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMobile(window.matchMedia('(max-width: 680px)').matches);

      if (!isMobile) window.addEventListener('scroll', toggleVisible);
    }
    return () => {
      window.removeEventListener('scroll', toggleVisible);
    };
  }, [isMobile]);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const transformButton = () => {
    const footer: HTMLElement = document.getElementById('footer')!;
    const footerTop: HTMLElement = document.getElementById('footerTop')!;
    // const backToTopButton: HTMLElement =
    //   document.getElementById('backToTopButton')!;

    // const footerPosition = footer.getBoundingClientRect();
    // const backToTopButtonPosition =
    //   backToTopButton.offsetTop + backToTopButton.offsetHeight;

    // let footerTopPadding = window
    //   .getComputedStyle(footer)
    //   .getPropertyValue('padding-top');

    // footerTopPadding = footerTopPadding.substring(
    //   0,
    //   footerTopPadding.length - 2
    // );

    // if (
    //   backToTopButtonPosition >
    //   footerPosition.y + Number(footerTopPadding) + backToTopButton.offsetHeight
    // ) {
    //   setIsAtFooter(true);
    //   backToTopButton.style.bottom = `${footerPosition.height - 183}px`;
    // } else {
    //   setIsAtFooter(false);
    // }

    const callback = (entries: any[], observer: any) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsAtFooter(true);
        } else {
          setIsAtFooter(false);
        }
      });
    };

    // const options = {
    //   root: footer,
    //   rootMargin: '105px 0px 0px 0px',
    // }

    const observer = new IntersectionObserver(callback);
    observer.observe(footerTop);
  };

  if (!isMobile) {
    window.onscroll = function () {
      transformButton();
    };
  }

  return (
    <button
      id='backToTopButton'
      className={[
        styles.backToTopButton,
        visible ? styles.visible : '',
        isAtFooter ? styles.transformed : '',
        isMobile ? styles.mobile : '',
      ].join(' ')}
      onClick={scrollToTop}
    >
      <span>{isAtFooter || isMobile ? 'back to top' : ''}</span>
      {!isMobile && (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='34.324'
          height='19.283'
          viewBox='0 0 34.324 19.283'
        >
          <g
            id='Group_64'
            data-name='Group 64'
            transform='translate(-558.379 245.191) rotate(-90)'
          >
            <line
              id='Line_7'
              data-name='Line 7'
              x2='15.041'
              y2='15.041'
              transform='translate(228.029 560.5)'
              fill='none'
              stroke='#fff'
              strokeLinecap='round'
              strokeWidth='3'
            />
            <line
              id='Line_8'
              data-name='Line 8'
              y1='15.041'
              x2='15.041'
              transform='translate(228.029 575.541)'
              fill='none'
              stroke='#fff'
              strokeLinecap='round'
              strokeWidth='3'
            />
          </g>
        </svg>
      )}
    </button>
  );
}
