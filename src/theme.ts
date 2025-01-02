import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  typography: {
    fontSize: 12,
    h1: {
      fontSize: '2.25rem',
    },
    h2: {
      fontSize: '1.875rem',
    },
    h3: {
      fontSize: '1.5rem',
    },
    h4: {
      fontSize: '1.25rem',
    },
    h5: {
      fontSize: '1.125rem',
    },
    h6: {
      fontSize: '1rem',
    },
    body1: {
      fontSize: '0.833rem',
    },
    body2: {
      fontSize: '0.75rem',
    },
    button: {
      fontSize: '0.6875rem', // 11px
      textTransform: 'uppercase',
    },
    caption: {
      fontSize: '0.667rem',
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
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '0.6875rem', // 11px
          padding: '6px 16px',
          textTransform: 'uppercase',
        },
        sizeSmall: {
          fontSize: '0.6875rem', // 11px
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          minHeight: 48,
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        regular: {
          minHeight: 48,
          '@media (min-width: 600px)': {
            minHeight: 48,
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'standard',
      },
      styleOverrides: {
        root: {
          '& .MuiInputBase-root': {
            fontSize: '0.875rem',
          },
          '& .MuiInputLabel-root': {
            fontSize: '0.875rem',
          },
          '& .MuiFormHelperText-root': {
            fontSize: '0.75rem',
          },
        },
      },
    },
  },
});