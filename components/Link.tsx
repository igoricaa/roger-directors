'use client';

import { useContext } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { TransitionContext } from './context/TransitionProvider';
import { getAnimationLength, randomIntFromInterval } from '@/utils/utils';

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
  const { setIsTransitioning, setTransitionDestination, setTransitionColor } =
    useContext(TransitionContext);

  return (
    <>
      <NextLink
        href={href}
        onClick={(e) => {
          e.preventDefault();

          setIsTransitioning(true);

          const transitionDestination = getPageTitleFromUrl(href.toString());
          setTransitionDestination(transitionDestination);

          setTransitionColor(getRandomColor());

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

          const animationLength: string = getAnimationLength(
            transitionDestination
          );

          setTimeout(
            () => {
              setIsTransitioning(false);
            },
            animationLength === 'short'
              ? 2900
              : animationLength === 'medium'
              ? 3400
              : 3900
          );
        }}
        {...rest}
      >
        {children}
      </NextLink>
    </>
  );
}

const getRandomColor = () => {
  const randomInt = randomIntFromInterval(0, 1);
  const colors = ['yellow', 'green'];

  return colors[randomInt];
};

const getPageTitleFromUrl = (href: string) => {
  let pageTitle =
    href === '/' ? 'ROGER DIRECTORS AGENCY' : href.slice(1).replace(/-/g, ' ');

  if (pageTitle.includes('projects/')) {
    pageTitle = pageTitle.replace('projects/', '');
  }

  return pageTitle;
};
