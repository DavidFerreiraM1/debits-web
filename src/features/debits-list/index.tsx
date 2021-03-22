import React from 'react';
import { Paper, Box, Button, Hidden } from '@material-ui/core';
import { styles } from './styles';
import { BoxTransitionProvider, useBoxTransition } from './box-transition';

function DebitsListComponent() {
  const { spread, retract, transition } = useBoxTransition();
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

  const handleTransition = () => {
    if (transition) {
      retract();
    } else {
      spread();
    }
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
            <Box />
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
          <Box className={classes.paperContent}>
            <Button onClick={handleTransition}>Testar animação</Button>
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
