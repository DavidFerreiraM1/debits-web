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
import { IClientUser } from '../../core/interfaces';
import { getUsersService } from './services';
import { formatMoney } from '../../utils/format-money';

export function ItemList(props: ItemListDebitProps) {
  const { spread } = useBoxTransition();
  const { id, username, debitValue, openModal } = props;

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
    <ListItem component="li" button onClick={() => spread(id)}>
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

  const [users, setUsers] = React.useState<IClientUser[]>([]);
  React.useEffect(() => {
    const getUsers = async () => {
      const { data } = await getUsersService();

      if (data && data.length > 0) {
        setUsers(data);
      }
    };

    getUsers();
  }, []);

  const getUser = React.useCallback(
    (id: string) => {
      return users.find(usr => usr.id === parseInt(id, 10));
    },
    [users],
  );

  return (
    <>
      <MuiList component="ul">
        {debitList.map((deb, key) => {
          return (
            <ItemList
              key={key}
              id={`${deb?.id}`}
              username={getUser(`${deb?.idUsuario}`)?.name || ''}
              debitValue={deb.valor.toString()}
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
