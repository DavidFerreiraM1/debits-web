import React from 'react';
import { Paper, Box, Hidden, Typography } from '@material-ui/core';
import { styles } from './styles';
import { BoxTransitionProvider, useBoxTransition } from './box-transition';
import { List } from './list';
import { ItemDetails } from './item-details';

function DebitsListComponent() {
  const { transition } = useBoxTransition();
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
        </Paper>
      </Box>
    </>
  );
}

export const DebitsList = () => {
  return (
    <BoxTransitionProvider>
      <DebitsListComponent />
    </BoxTransitionProvider>
  );
};
