import React from 'react';
import { Box } from '@material-ui/core';
import { styles } from './styles';
import { Props } from './interfaces';
import { Header } from './header';

export function Background1(props: Props) {
  const classes = styles();
  const { children } = props;
  return (
    <Box className={classes.root}>
      <Header />
      {children}
    </Box>
  );
}
