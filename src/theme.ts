import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  typography: {
    fontSize: 14,
    h1: {
      fontSize: '2.5rem',
    },
    h2: {
      fontSize: '2rem',
    },
    h3: {
      fontSize: '1.75rem',
    },
    h4: {
      fontSize: '1.5rem',
    },
    h5: {
      fontSize: '1.25rem',
    },
    h6: {
      fontSize: '1rem',
    },
    body1: {
      fontSize: '0.875rem',
    },
    body2: {
      fontSize: '0.75rem',
    },
    button: {
      fontSize: '0.875rem',
    },
    caption: {
      fontSize: '0.75rem',
    },
  },
  palette: {
    primary: {
      main: '#9e9e9e',
      light: '#cfcfcf',
      dark: '#707070',
    },
    background: {
      default: '#f5f5f5',
    },
  },
});