import { makeStyles } from '@material-ui/core';

export const styles = makeStyles(theme => ({
  root: {},
  boxListRoot: {
    position: 'absolute',
    zIndex: 1,
    height: 'calc(100vh - 120px)',
    width: '100%',
    maxWidth: 480,
    borderRadius: 8,
    left: '50%',
    transform: 'translateX(-50%)',
  },
  boxListPaper: {
    height: '100%',
    width: '100%',
  },
  elevation: {
    boxShadow: '0px 0px 16px -4px #404040',
  },
  paperContent: {
    padding: 16,
  },
  boxTransitionRoot: {
    [theme.breakpoints.up('lg')]: {
      transition: 'transform 1s',
      transitionTimingFunction: 'cubic-bezier(1,2,2,1)',
    },
  },
  boxTransitionToRight: {
    [theme.breakpoints.up('lg')]: {
      transform: 'translateX(-24%)',
    },
  },
  boxTransitionToLeft: {
    [theme.breakpoints.up('lg')]: {
      transform: 'translateX(-50%)',
    },
  },
  boxInfoItem: {
    height: 420,
    width: 320,
    position: 'absolute',
    zIndex: 0,
    top: 'calc(55% - 240px)',
    left: '50%',
  },
  boxInfoItemPaper: {
    height: '100%',
    width: '100%',
    borderRadius: '24px 0 0 24px',
  },
  paperInfoItemToRight: {
    [theme.breakpoints.up('lg')]: {
      transform: 'translateX(-136%)',
    },
  },
  paperInfoItemToLeft: {
    [theme.breakpoints.up('lg')]: {
      transform: 'translateX(-75%)',
    },
  },
}));
