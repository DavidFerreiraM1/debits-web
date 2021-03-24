import React from 'react';
import { Paper, Box, Hidden, Typography, Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import { DebitsFormProvider, useDebitFormContext } from '../debits-form';
import { styles } from './styles';
import { BoxTransitionProvider, useBoxTransition } from './box-transition';
import { List } from './list';
import { ItemDetails } from './item-details';
import { ListContextProvider } from './list-context';
import DialogDetailsProvider from './dialog-details';

function DebitsListComponent() {
  const { transition } = useBoxTransition();
  const { newDebit } = useDebitFormContext();
  const classes = styles();

  const setStyleTransition = () => {
    return transition
      ? classes.boxTransitionToRight
      : classes.boxTransitionToLeft;
  };

  const setStyleTransitionToPaperItem = () => {
    return transition
      ? classes.paperInfoItemToRight
      : classes.paperInfoItemToLeft;
  };

  return (
    <>
      <Hidden mdDown>
        <Box
          className={`
          ${classes.boxTransitionRoot}
          ${classes.boxInfoItem}
          ${setStyleTransitionToPaperItem()}
        `}
        >
          <Paper
            variant="elevation"
            elevation={3}
            classes={{
              root: classes.boxInfoItemPaper,
              elevation3: classes.elevation,
            }}
          >
            <ItemDetails />
          </Paper>
        </Box>
      </Hidden>
      <Box
        className={`
            ${classes.boxListRoot}
            ${classes.boxTransitionRoot}
            ${setStyleTransition()}
          `}
      >
        <Paper
          variant="elevation"
          elevation={3}
          classes={{
            root: classes.boxListPaper,
            elevation3: classes.elevation,
          }}
        >
          <Box className={classes.boxListPaperTitle}>
            <Typography component="h5">Lista de devedores</Typography>
          </Box>
          <Box className={classes.boxListPaperContent}>
            <List />
          </Box>
          <Box className={classes.createDebitBox}>
            <Fab onClick={newDebit} color="primary">
              <AddIcon />
            </Fab>
          </Box>
        </Paper>
      </Box>
    </>
  );
}

export const DebitsList = () => {
  return (
    <ListContextProvider>
      <DebitsFormProvider>
        <BoxTransitionProvider>
          <DialogDetailsProvider>
            <DebitsListComponent />
          </DialogDetailsProvider>
        </BoxTransitionProvider>
      </DebitsFormProvider>
    </ListContextProvider>
  );
};
