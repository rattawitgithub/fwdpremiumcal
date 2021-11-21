import { createTheme } from '@material-ui/core';
import shadows from './shadows';
import typography from './typography';

const theme = createTheme({
  palette: {
    background: {
      dark: '#212121',
      paper: '#424242'
    },
    primary: {
      main: '#ff5722'
    },
    secondary: {
      main: '#f5f5f5'
    },
    type: 'dark'
  },
  shadows,
  typography
});

export default theme;
