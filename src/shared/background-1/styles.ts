import { makeStyles } from '@material-ui/core';
import DebitsLogo from '../../assets/svg/debits.svg';

export const styles = makeStyles({
  root: {
    backgroundColor: '#343434',
    height: '100vh',
    width: '100%',
    padding: 0,
    margin: 0,
    paddingTop: 64,
  },
  header: {
    width: '100%',
    position: 'fixed',
    top: 0,
  },
  headerLogo: {
    backgroundImage: `url(${DebitsLogo})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'auto',
    backgroundBlendMode: 'lighten',
    height: 56,
    width: 124,
  },
});
