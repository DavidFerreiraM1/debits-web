import React from 'react';
import { Box, Button, IconButton, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { styles } from './styles';
import { useBoxTransition } from './box-transition';

export function ItemDetails() {
  const { retract } = useBoxTransition();
  const classes = styles();

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
            <Typography component="span">Fulano de tal</Typography>
          </Box>
          <Box className={classes.itemDetail}>
            <Typography variant="subtitle2">Motivo</Typography>
            <Typography component="span">Fulano de tal</Typography>
          </Box>
          <Box className={classes.itemDetail}>
            <Typography variant="subtitle2">Valor</Typography>
            <Typography component="span">RS 3.000,00</Typography>
          </Box>
        </Box>
      </Box>
      <Box className={classes.itemDetailAction}>
        <Button>Editar</Button>
      </Box>
    </Box>
  );
}
