import React, { useState } from 'react';
import { Paper, Box, Typography, IconButton, Tooltip, useTheme, useMediaQuery } from '@mui/material';
import { Settings, HelpCircle, Bell } from 'lucide-react';
import { SettingsForm } from '../SettingsForm';

interface BottomControlProps {
  drawerWidth: number;
  minDrawerWidth: number;
}

export default function BottomControl({ drawerWidth, minDrawerWidth }: BottomControlProps) {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <>
      <Paper
        elevation={0}
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
            height: 32,
          }}
        >
          <Typography 
            variant="caption" 
            color="text.secondary"
            sx={{ fontSize: '0.7rem' }}
          >
            © {new Date().getFullYear()} Your Company
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            <Tooltip title="Notifications">
              <IconButton size="small" color="inherit" sx={{ p: 0.5 }}>
                <Bell size={16} />
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Help">
              <IconButton size="small" color="inherit" sx={{ p: 0.5 }}>
                <HelpCircle size={16} />
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Settings">
              <IconButton 
                size="small" 
                color="inherit" 
                sx={{ p: 0.5 }}
                onClick={() => setSettingsOpen(true)}
              >
                <Settings size={16} />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Paper>

      <SettingsForm 
        open={settingsOpen} 
        onClose={() => setSettingsOpen(false)} 
      />
    </>
  );
}
