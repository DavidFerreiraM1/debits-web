import React from 'react';
import { Box } from '@material-ui/core';

import { BoxTransitionProps, BoxTransitionProviderProps } from './interfaces';
import { styles } from './styles';

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

export function BoxTransitionRight(props: BoxTransitionProps) {
  const { transition } = useBoxTransition();
  const { children } = props;
  const classes = styles();

  const setStyleTransition = () => {
    return transition ? classes.boxTransitionToRight : '';
  };

  return (
    <Box className={`${classes.boxTransitionRoot} ${setStyleTransition()}`}>
      {children}
    </Box>
  );
}

export function BoxTransitionLeft(props: BoxTransitionProps) {
  const { transition } = useBoxTransition();
  const { children } = props;
  const classes = styles();

  const setStyleTransition = () => {
    return transition ? classes.boxTransitionToRight : '';
  };

  return (
    <Box className={`${classes.boxTransitionRoot} ${setStyleTransition()}`}>
      {children}
    </Box>
  );
}
