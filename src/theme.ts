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
    fontFamily: 'Roboto, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
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
      default: '#1f2937',
      paper: '#1f2937',
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.7)',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
      color: '#ffffff',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
      color: '#ffffff',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
      color: '#ffffff',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          color: '#ffffff',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#1f2937',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#1f2937',
          borderRight: 'none',
        },
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          backgroundColor: '#1f2937',
          border: 'none',
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#1f2937',
            borderBottom: '1px solid #374151',
          },
          '& .MuiDataGrid-cell': {
            borderBottom: '1px solid #374151',
          },
          '& .MuiDataGrid-footerContainer': {
            backgroundColor: '#1f2937',
            borderTop: '1px solid #374151',
          },
          '& .MuiDataGrid-toolbarContainer': {
            backgroundColor: '#1f2937',
          },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: '#374151',
            '&:hover': {
              backgroundColor: '#374151',
            },
          },
          '&:hover': {
            backgroundColor: '#374151',
          },
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: 'inherit',
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: '#374151',
        },
      },
    },
  }
});

export type ThemeMode = 'light' | 'dark';

export const getTheme = (mode: ThemeMode): Theme => {
  return mode === 'light' ? lightTheme : darkTheme;
};
