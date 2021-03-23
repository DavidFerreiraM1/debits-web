/* eslint-disable no-underscore-dangle */
/* eslint-disable no-plusplus */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import {
  IconButton,
  List as MuiList,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core';

import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import DeleteIcon from '@material-ui/icons/Delete';

import { useBoxTransition } from './box-transition';
import { ItemListDebitProps } from './interfaces';

import { DialogRefProps } from '../../components/modal-dialog/interface';
import { ModalDialog } from '../../components';
import { useDebitListContext } from './list-context';
import { getUsersService } from './services';
import { formatMoney } from '../../utils/format-money';

export function ItemList(props: ItemListDebitProps) {
  const { spread } = useBoxTransition();
  const { id, username, reason, debitValue, openModal } = props;
  const onConfirm = () => {
    openModal(
      'Excluir Dívida',
      `Confirmar exclusão da dívida de ${username.toUpperCase()} no valor de ${debitValue}?`,
      () => {
        // console.log('');
      },
    );
  };

  return (
    <ListItem
      component="li"
      button
      onClick={() => spread(id, username, reason, debitValue)}
    >
      <ListItemIcon>
        <LocalAtmIcon />
      </ListItemIcon>
      <ListItemText primary={username} secondary={formatMoney(debitValue)} />
      <ListItemSecondaryAction>
        <IconButton onClick={onConfirm}>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

export function List() {
  const modal = React.createRef<DialogRefProps>();
  const { debitList } = useDebitListContext();

  const openModal = (title: string, text: string, onConfirm: () => void) => {
    modal.current?.open({
      title,
      text,
      onConfirm,
    });
  };

  const [debits, setDebits] = React.useState<
    {
      id: string;
      username: string;
      reason: string;
      debitValue: string;
    }[]
  >([]);

  React.useEffect(() => {
    const getUsers = async () => {
      const { data: users } = await getUsersService();
      if (users && users.length > 0) {
        // data = users
        const values: any = [];
        for (let i = 0; i < users.length - 1; i++) {
          const usr = users[i];
          const debit = debitList.find(deb => {
            return usr.id === deb.idUsuario;
          });

          if (debit) {
            values.push({
              id: `${debit._id}`,
              username: usr.name,
              reason: `${debit.motivo}`,
              debitValue: `${debit.valor}`,
            });
          }
        }
        // users.map(usr => {

        // });

        setDebits(values);
      }
    };
    getUsers();
  }, []);

  return (
    <>
      <MuiList component="ul">
        {debits.length > 0 &&
          debits.map((deb, key) => {
            return (
              <ItemList
                key={key}
                id={`${deb.id}`}
                username={deb.username}
                reason={deb.reason}
                debitValue={deb.debitValue}
                openModal={openModal}
              />
            );
          })}
      </MuiList>
      <>
        <ModalDialog ref={modal} />
      </>
    </>
  );
}
