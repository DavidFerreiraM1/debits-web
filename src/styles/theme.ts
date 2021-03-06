import { createMuiTheme } from '@material-ui/core';

export const themeDefault = createMuiTheme({
  typography: {
    fontFamily: ["'Roboto', sans-serif"].join(','),
  },
  overrides: {
    MuiButton: {
      containedPrimary: {
        backgroundColor: '#595959',
      },
    },
  },
});
