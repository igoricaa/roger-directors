'use client';

import { useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import SplashScreen from './SplashScreen';
import { createPortal } from 'react-dom';

type CustomLink = {
  onClickHandler?: () => void;
} & Parameters<typeof NextLink>[0];

export default function Link({
  href,
  children,
  replace,
  onClickHandler,
  ...rest
}: CustomLink) {
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);

  if (isTransitioning) {
    return createPortal(<SplashScreen />, document.body);
  }

  return (
    <NextLink
      href={href}
      onClick={(e) => {
        e.preventDefault();
        if (onClickHandler) onClickHandler();
        setIsTransitioning(true);
        // setTimeout(() => {
        //   setIsTransitioning(false);
        // }, 3000);
        const url = href.toString();
        setTimeout(() => {
          if (replace) {
            router.replace(url);
          } else {
            router.push(url);
          }
        }, 500);
      }}
      {...rest}
    >
      {children}
    </NextLink>
  );
}
