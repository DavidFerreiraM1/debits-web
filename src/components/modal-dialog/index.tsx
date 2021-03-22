import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  PaperProps,
} from '@material-ui/core';

import { DialogRefProps, OpenFuncParam, Props } from './interface';

function PaperComponent(props: PaperProps) {
  return <Paper {...props} />;
}

function ModaDialogWithRef(props: Props, ref: React.Ref<DialogRefProps>) {
  const [dialog, setDialog] = React.useState({
    render: false,
    title: '',
    text: '',
    onConfirm: () => {
      //
    },
  });

  const handleClose = () => {
    setDialog({
      ...dialog,
      render: false,
      title: '',
      text: '',
      onConfirm: () => {
        //
      },
    });
  };

  React.useImperativeHandle(ref, () => ({
    open: ({ title, text, onConfirm }: OpenFuncParam) => {
      setDialog({
        ...dialog,
        title,
        text,
        render: true,
        onConfirm,
      });
    },
    close: () => handleClose(),
  }));

  return (
    <Dialog
      open={dialog.render}
      onClose={handleClose}
      PaperComponent={PaperComponent}
    >
      <DialogTitle id="dialog-title">{dialog.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{dialog.text}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose} color="primary">
          Cancelar
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            handleClose();
            dialog.onConfirm();
          }}
        >
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export const ModalDialog = React.forwardRef<DialogRefProps, Props>(
  ModaDialogWithRef,
);
