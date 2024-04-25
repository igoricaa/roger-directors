'use client';

import { useContext, useEffect } from 'react';
import styles from './SplashScreen.module.css';
import { TransitionContext } from './context/TransitionProvider';
import { usePathname } from 'next/navigation';

const SplashScreen = () => {
  const {
    isTransitioning,
    transitionDestination,
    isHomeInitialLoad,
    setIsHomeInitialLoad,
    transitionColor,
  } = useContext(TransitionContext);
  const pathname = usePathname();

  useEffect(() => {
    if (isHomeInitialLoad === true) {
      setTimeout(() => {
        setIsHomeInitialLoad(false);
      }, 2800);
    }
  }, [pathname, isHomeInitialLoad, setIsHomeInitialLoad]);

  const isHome =
    !transitionDestination ||
    transitionDestination === 'ROGER DIRECTORS AGENCY';

  const singleWords: string[] = transitionDestination
    ? transitionDestination.split(' ')
    : ['ROGER', 'DIRECTORS', 'AGENCY'];

  return (
    <div className={styles.splashScreenContainer}>
      {(isTransitioning || isHomeInitialLoad) && (
        <div
          className={[
            styles.splashScreen,
            styles[transitionColor],
            isHomeInitialLoad ? styles.initialSplash : '',
          ].join(' ')}
        >
          <h3 className={!isHome ? styles.isNotHome : ''}>
            {singleWords.map((singleWord, index) => (
              <span key={index} className={styles.singleWord}>
                {singleWord.toLocaleUpperCase()}
              </span>
            ))}
          </h3>
        </div>
      )}
    </div>
  );
};

export default SplashScreen;
