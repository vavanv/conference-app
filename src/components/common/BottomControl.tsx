import React from 'react';
import { Paper, Box, Typography, IconButton, Tooltip, useTheme, useMediaQuery } from '@mui/material';
import { Settings, HelpCircle, Bell } from 'lucide-react';

const drawerWidth = 240;
const minDrawerWidth = 73;

export default function BottomControl() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Paper
      elevation={3}
      sx={{
        position: 'fixed',
        bottom: 0,
        left: { xs: 0, sm: isDesktop ? minDrawerWidth : 0 },
        right: 0,
        zIndex: 1000,
        borderRadius: 0,
        bgcolor: 'background.paper',
        borderTop: '1px solid',
        borderColor: 'divider',
        transition: theme.transitions.create(['left'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 2,
          py: 1,
          height: 48
        }}
      >
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} Your Company
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Tooltip title="Notifications">
            <IconButton size="small" color="inherit">
              <Bell size={20} />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Help">
            <IconButton size="small" color="inherit">
              <HelpCircle size={20} />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Settings">
            <IconButton size="small" color="inherit">
              <Settings size={20} />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </Paper>
  );
}