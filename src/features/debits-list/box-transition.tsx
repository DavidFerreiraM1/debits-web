import React from 'react';

import { BoxTransitionProviderProps } from './interfaces';

const BoxTransitionContext = React.createContext<{
  dataDetails: {
    id: string;
    username: string;
    reason: string;
    debitValue: string;
  };
  transition: boolean;
  spread: (
    id: string,
    username: string,
    reason: string,
    debitValue: string,
  ) => void;
  retract: () => void;
}>({
  dataDetails: {
    id: '',
    username: '',
    reason: '',
    debitValue: '',
  },
  transition: false,
  spread: () => {
    /**/
  },
  retract: () => {
    /**/
  },
});

export function BoxTransitionProvider(props: BoxTransitionProviderProps) {
  const { children } = props;
  const [transition, setTransition] = React.useState(false);

  const [data, setData] = React.useState({
    id: '',
    username: '',
    reason: '',
    debitValue: '',
  });

  const spread = (
    id: string,
    username: string,
    reason: string,
    debitValue: string,
  ) => {
    // buscar na api pelo id
    setData({
      id,
      username,
      reason,
      debitValue,
    });
  };

  React.useEffect(() => {
    if (data.id) {
      setTransition(true);
    }
  }, [data]);

  const retract = () => {
    setData({
      id: '',
      username: '',
      reason: '',
      debitValue: '',
    });
    setTransition(false);
  };

  return (
    <BoxTransitionContext.Provider
      value={{
        dataDetails: data,
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
