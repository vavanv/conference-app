import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  typography: {
    fontSize: 12, // Base font size changed to 12px
    h1: {
      fontSize: '2.25rem', // 27px
    },
    h2: {
      fontSize: '1.875rem', // 22.5px
    },
    h3: {
      fontSize: '1.5rem', // 18px
    },
    h4: {
      fontSize: '1.25rem', // 15px
    },
    h5: {
      fontSize: '1.125rem', // 13.5px
    },
    h6: {
      fontSize: '1rem', // 12px
    },
    body1: {
      fontSize: '0.833rem', // 10px
    },
    body2: {
      fontSize: '0.75rem', // 9px
    },
    button: {
      fontSize: '0.833rem', // 10px
    },
    caption: {
      fontSize: '0.667rem', // 8px
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