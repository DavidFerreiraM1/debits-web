import React from 'react';
import { Box } from '@material-ui/core';
import { styles } from './styles';

export function Header() {
  const classes = styles();

  return (
    <Box component="header" className={classes.header}>
      <Box className={classes.headerLogo} />
    </Box>
  );
}
