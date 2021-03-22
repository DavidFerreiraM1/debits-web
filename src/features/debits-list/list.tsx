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
      <ListItemText primary={username} secondary={debitValue} />
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
  const openModal = (title: string, text: string, onConfirm: () => void) => {
    modal.current?.open({
      title,
      text,
      onConfirm,
    });
  };
  return (
    <>
      <MuiList component="ul">
        <ItemList
          id="0"
          username="Fulano de tal"
          debitValue="R$ 3.000,00"
          openModal={openModal}
        />
        <ItemList
          id="1"
          username="Fulano de tal"
          debitValue="R$ 3.000,00"
          openModal={openModal}
        />
        <ItemList
          id="2"
          username="Fulano de tal"
          debitValue="R$ 3.000,00"
          openModal={openModal}
        />
        <ItemList
          id="3"
          username="Fulano de tal"
          debitValue="R$ 3.000,00"
          openModal={openModal}
        />
      </MuiList>
      <>
        <ModalDialog ref={modal} />
      </>
    </>
  );
}
