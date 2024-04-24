'use client';

import { useContext, useEffect, useState } from 'react';
import styles from './SplashScreen.module.css';
import { TransitionContext } from './context/TransitionProvider';
import { usePathname } from 'next/navigation';

const SplashScreen = () => {
  const {
    isTransitioning,
    transitionDestination,
    isHomeInitialLoad,
    setIsHomeInitialLoad,
  } = useContext(TransitionContext);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === '/' && isHomeInitialLoad === true) {
      setTimeout(() => {
        setIsHomeInitialLoad(false);
      }, 2800);
    }
  }, [pathname, isHomeInitialLoad, setIsHomeInitialLoad]);

  return (
    <div className={styles.splashScreenContainer}>
      {(isTransitioning || isHomeInitialLoad) && (
        <div
          className={[
            styles.splashScreen,
            isHomeInitialLoad ? styles.initialSplash : '',
          ].join(' ')}
        >
          <h3>
            {transitionDestination
              ? transitionDestination.toLocaleUpperCase()
              : 'ROGER DIRECTORS AGENCY'}
          </h3>
        </div>
      )}
    </div>
  );
};

export default SplashScreen;
