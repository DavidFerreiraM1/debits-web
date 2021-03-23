import { makeStyles } from '@material-ui/core';

export const styles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
    backgroundColor: '#595959',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  containerForm: {
    paddingTop: 32,
  },
  formBottom: {},
  alert: {
    position: 'fixed',
    top: 72,
    right: 0,
    margin: 24,
    zIndex: 20000,
  },
}));
