import { createTheme, Theme } from '@mui/material/styles';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#9c27b0',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    // Your existing typography settings
  },
  components: {
    // Your existing component overrides
  }
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#ce93d8',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
  },
  typography: {
    // Your existing typography settings
  },
  components: {
    // Your existing component overrides
  }
});

export type ThemeMode = 'light' | 'dark';

export const getTheme = (mode: ThemeMode): Theme => {
  return mode === 'light' ? lightTheme : darkTheme;
};
