'use client';

import { useContext } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { TransitionContext } from './context/TransitionProvider';

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
  const { setIsTransitioning, setTransitionDestination } =
    useContext(TransitionContext);

  return (
    <>
      <NextLink
        href={href}
        onClick={(e) => {
          e.preventDefault();
          setIsTransitioning(true);

          const pageTItle =
            href.toString() === '/'
              ? 'ROGER DIRECTORS AGENCY'
              : href.toString().slice(1).replace(/-/g, ' ');

          setTransitionDestination(pageTItle);

          if (onClickHandler) onClickHandler();

          const url = href.toString();
          router.prefetch(url);
          setTimeout(() => {
            if (replace) {
              router.replace(url);
            } else {
              router.push(url);
            }
          }, 500);

          setTimeout(() => {
            setIsTransitioning(false);
          }, 3000);
        }}
        {...rest}
      >
        {children}
      </NextLink>
    </>
  );
}
