import React from 'react';

import { BoxTransitionProviderProps } from './interfaces';

const BoxTransitionContext = React.createContext<{
  transition: boolean;
  retract: () => void;
  spread: () => void;
}>({
  transition: false,
  retract: () => {
    /**/
  },
  spread: () => {
    /**/
  },
});

export function BoxTransitionProvider(props: BoxTransitionProviderProps) {
  const { children } = props;
  const [transition, setTransition] = React.useState(false);

  const spread = () => {
    setTransition(true);
  };

  const retract = () => {
    setTransition(false);
  };

  return (
    <BoxTransitionContext.Provider
      value={{
        transition,
        spread,
        retract,
      }}
    >
      {children}
    </BoxTransitionContext.Provider>
  );
}

export const useBoxTransition = () => React.useContext(BoxTransitionContext);
