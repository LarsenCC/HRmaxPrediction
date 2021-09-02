import { createTheme } from '@material-ui/core/styles';

const hrmaxRed = "#F76F72"

export default createTheme({
  palette: {
    common: {
      red: `${hrmaxRed}`,
    },
    primary: {
      main: `${hrmaxRed}`,
    },
  },
  typography: {
    tab: {
      fontFamily: 'Raleway',
      textTransform: 'none',
      fontWeight: 700,
      fontSize: '1rem',
    },
    h5: {
      fontWeight: 500,
    },
  }
});