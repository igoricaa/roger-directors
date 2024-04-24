import { ReactNode, createContext, useState } from 'react';

type transitionContextType = {
  isTransitioning: boolean;
  setIsTransitioning: (isTransitioning: boolean) => void;
  transitionDestination: string;
  setTransitionDestination: (destination: string) => void;
  isHomeInitialLoad: boolean;
  setIsHomeInitialLoad: (isHomeInitialLoad: boolean) => void;
};

const transitionContextDefaultValues: transitionContextType = {
  isTransitioning: false,
  setIsTransitioning: () => {},
  transitionDestination: '',
  setTransitionDestination: () => {},
  isHomeInitialLoad: true,
  setIsHomeInitialLoad: () => {},
};

const TransitionContext = createContext<transitionContextType>(
  transitionContextDefaultValues
);

const TransitionProvider = ({ children }: { children: ReactNode }) => {
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [transitionDestination, setTransitionDestination] =
    useState<string>('');
  const [isHomeInitialLoad, setIsHomeInitialLoad] = useState<boolean>(true);

  return (
    <TransitionContext.Provider
      value={{
        isTransitioning,
        setIsTransitioning,
        transitionDestination,
        setTransitionDestination,
        isHomeInitialLoad,
        setIsHomeInitialLoad,
      }}
    >
      {children}
    </TransitionContext.Provider>
  );
};

export { TransitionProvider, TransitionContext };
