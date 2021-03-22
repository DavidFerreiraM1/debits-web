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

export function ItemList() {
  const { spread } = useBoxTransition();

  return (
    <ListItem component="li" button onClick={spread}>
      <ListItemIcon>
        <LocalAtmIcon />
      </ListItemIcon>
      <ListItemText primary="Fulano de tal" secondary="R$ 3.000,00" />
      <ListItemSecondaryAction>
        <IconButton>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

export function List() {
  return (
    <MuiList component="ul">
      <ItemList />
      <ItemList />
      <ItemList />
      <ItemList />
    </MuiList>
  );
}
