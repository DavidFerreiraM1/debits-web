import React from 'react';
import { Box, Button, IconButton, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { styles } from './styles';
import { useBoxTransition } from './box-transition';
import { useDebitFormContext } from '../debits-form';
import { formatMoney } from '../../utils/format-money';

export function ItemDetails() {
  const { retract, dataDetails } = useBoxTransition();
  const { updateDebit } = useDebitFormContext();

  const classes = styles();

  const updateHandler = () => {
    if (dataDetails.id) {
      updateDebit(dataDetails.id);
    }
  };

  return (
    <Box className={classes.itemDetailsRoot}>
      <Box className={classes.itemDetailActionHeader}>
        <IconButton onClick={retract}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Box className={classes.itemDetailsContent}>
        <Box className={classes.itemDetailsBody}>
          <Box className={classes.itemDetail}>
            <Typography variant="subtitle2">Cliente</Typography>
            <Typography component="span">{dataDetails.username}</Typography>
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
      <Box className={classes.itemDetailAction}>
        <Button onClick={updateHandler}>Editar</Button>
      </Box>
    </Box>
  );
}
