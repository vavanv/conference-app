import { createTheme, Theme } from '@mui/material/styles';

const lightTheme = createTheme({
  // ... existing light theme configuration ...
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
      paper: '#303A47', // Changed from previous value
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.7)',
    },
  },
  typography: {
    // ... existing typography configuration ...
  },
  components: {
    MuiButton: {
      // ... existing button configuration ...
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#111827',
        },
      },
    },
    MuiDrawer: {
      // ... existing drawer configuration ...
    },
    MuiDataGrid: {
      // ... existing DataGrid configuration ...
    },
    MuiListItemButton: {
      // ... existing list item button configuration ...
    },
    MuiListItemIcon: {
      // ... existing list item icon configuration ...
    },
    MuiDivider: {
      // ... existing divider configuration ...
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          '&.MuiBottomControl-root': {
            backgroundColor: '#111827',
            borderTop: '1px solid #374151',
          },
        },
      },
    },
  }
});

export type ThemeMode = 'light' | 'dark';

export const getTheme = (mode: ThemeMode): Theme => {
  return mode === 'light' ? lightTheme : darkTheme;
};
