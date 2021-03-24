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
import { deleteDebitService } from '../debits-form/service';
import { useAlertContext } from '../../components/alert';
import { useDialogDetails } from './dialog-details';

export function ItemList(props: ItemListDebitProps) {
  const { spread } = useBoxTransition();
  const { open } = useDialogDetails();
  const { id, username, reason, debitValue, openModal } = props;
  const openModalHandler = () => {
    openModal(
      'Excluir Dívida',
      `Confirmar exclusão da dívida de ${username.toUpperCase()} no valor de ${formatMoney(
        debitValue.toString(),
      )}?`,
      id,
    );
  };

  return (
    <ListItem
      onClick={() => {
        open();
        spread(id, username, reason, debitValue);
      }}
      component="li"
      button
    >
      <ListItemIcon>
        <LocalAtmIcon />
      </ListItemIcon>
      <ListItemText primary={username} secondary={formatMoney(debitValue)} />
      <ListItemSecondaryAction>
        <IconButton onClick={openModalHandler}>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

export function List() {
  const modal = React.createRef<DialogRefProps>();
  const { debitList, updateDebitList } = useDebitListContext();
  const { retract } = useBoxTransition();
  const { close } = useDialogDetails();
  const { handleRenderAlert } = useAlertContext();

  const openModal = async (title: string, text: string, id: string) => {
    retract();
    close();
    modal.current?.open({
      title,
      text,
      onConfirm: () => {
        const deleteDebit = async () => {
          const { success } = await deleteDebitService(id);
          if (success) {
            updateDebitList();
            modal.current?.close();
            handleRenderAlert('success', 'Dívida excluída com sucesso!');
          } else {
            modal.current?.close();
            handleRenderAlert('error', 'Não foi possível excluir a dívida!');
          }
        };
        deleteDebit();
      },
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
        setDebits(values);
      }
    };
    getUsers();
  }, [debitList]);

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
        {debits.length === 0 && (
          <ListItem>
            <ListItemText secondary="Sem Dívidas para visualizar." />
          </ListItem>
        )}
      </MuiList>
      <>
        <ModalDialog ref={modal} />
      </>
    </>
  );
}
