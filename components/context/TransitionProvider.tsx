import { ReactNode, createContext, useState } from 'react';

type transitionContextType = {
  isTransitioning: boolean;
  setIsTransitioning: (isTransitioning: boolean) => void;
  transitionDestination: string;
  setTransitionDestination: (destination: string) => void;
  isHomeInitialLoad: boolean;
  setIsHomeInitialLoad: (isHomeInitialLoad: boolean) => void;
  transitionColor: string;
  setTransitionColor: (color: string) => void;
};

const transitionContextDefaultValues: transitionContextType = {
  isTransitioning: false,
  setIsTransitioning: () => {},
  transitionDestination: '',
  setTransitionDestination: () => {},
  isHomeInitialLoad: true,
  setIsHomeInitialLoad: () => {},
  transitionColor: 'green',
  setTransitionColor: () => {},
};

const TransitionContext = createContext<transitionContextType>(
  transitionContextDefaultValues
);

const TransitionProvider = ({ children }: { children: ReactNode }) => {
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [transitionDestination, setTransitionDestination] =
    useState<string>('');
  const [isHomeInitialLoad, setIsHomeInitialLoad] = useState<boolean>(true);
  const [transitionColor, setTransitionColor] = useState<string>('green');

  return (
    <TransitionContext.Provider
      value={{
        isTransitioning,
        setIsTransitioning,
        transitionDestination,
        setTransitionDestination,
        isHomeInitialLoad,
        setIsHomeInitialLoad,
        transitionColor,
        setTransitionColor,
      }}
    >
      {children}
    </TransitionContext.Provider>
  );
};

export { TransitionProvider, TransitionContext };
