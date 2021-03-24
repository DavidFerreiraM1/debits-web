import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { DialogDetailsProviderProps } from './interfaces';
import { Box, Hidden, Typography } from '@material-ui/core';
import { styles } from './styles';
import { useBoxTransition } from './box-transition';
import { formatMoney } from '../../utils/format-money';
import { useDebitFormContext } from '../debits-form';

const DialogDetailsContext = React.createContext<{
  open: () => void;
  close: () => void;
}>({
  open: () => {
    //
  },
  close: () => {
    //
  },
});

export default function DialogDetailsProvider(
  props: DialogDetailsProviderProps,
) {
  const classes = styles();
  const { children } = props;
  const { dataDetails, retract } = useBoxTransition();
  const { updateDebit } = useDebitFormContext();
  const [open, setOpen] = React.useState(false);

  const updateHandler = () => {
    if (dataDetails.id) {
      setOpen(false);
      retract();
      updateDebit(dataDetails.id);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    retract();
    setOpen(false);
  };

  return (
    <DialogDetailsContext.Provider
      value={{
        open: handleClickOpen,
        close: handleClose,
      }}
    >
      {children}
      <Hidden lgUp>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Detalhes da dívida</DialogTitle>
          <DialogContent>
            <Box className={classes.itemDetailsContent}>
              <Box className={classes.itemDetailsBody}>
                <Box className={classes.itemDetail}>
                  <Typography variant="subtitle2">Cliente</Typography>
                  <Typography component="span">
                    {dataDetails.username}
                  </Typography>
                </Box>
                <Box className={classes.itemDetail}>
                  <Typography variant="subtitle2">Motivo</Typography>
                  <Typography component="span">{dataDetails.reason}</Typography>
                </Box>
                <Box className={classes.itemDetail}>
                  <Typography variant="subtitle2">Valor</Typography>
                  <Typography component="span">
                    {dataDetails.debitValue
                      ? formatMoney(dataDetails.debitValue)
                      : ''}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="primary" onClick={updateHandler}>
              Editar
            </Button>
            <Button onClick={handleClose} color="primary" autoFocus>
              fechar
            </Button>
          </DialogActions>
        </Dialog>
      </Hidden>
    </DialogDetailsContext.Provider>
  );
}

export const useDialogDetails = () => React.useContext(DialogDetailsContext);
