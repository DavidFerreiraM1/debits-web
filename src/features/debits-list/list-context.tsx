import React from 'react';
import { IDebit } from '../../core/interfaces';
import { ListContextProviderProps } from './interfaces';
import { getAllDebitsService } from './services';

const DebitListContext = React.createContext<{
  debitList: IDebit[];
  updateDebitList: () => void;
}>({
  debitList: [],
  updateDebitList: () => {
    // ==>
  },
});

export function ListContextProvider(props: ListContextProviderProps) {
  const { children } = props;
  const [debitList, setDebitList] = React.useState<IDebit[]>([]);

  const updateList = () => {
    const getAllDebits = async () => {
      const { data } = await getAllDebitsService();
      if (data) {
        setDebitList(data);
      }
    };

    getAllDebits();
  };

  React.useEffect(() => {
    updateList();
  }, []);

  return (
    <DebitListContext.Provider
      value={{
        debitList,
        updateDebitList: updateList,
      }}
    >
      {children}
    </DebitListContext.Provider>
  );
}

export const useDebitListContext = () => React.useContext(DebitListContext);
