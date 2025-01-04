import React from 'react';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Stack,
  FormControlLabel,
  Switch
} from '@mui/material';
import { X } from 'lucide-react';
import { useThemeContext } from '../context/ThemeContext';

interface SettingsFormProps {
  open: boolean;
  onClose: () => void;
}

export function SettingsForm({ open, onClose }: SettingsFormProps) {
  const { themeMode, toggleTheme } = useThemeContext();

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { 
          width: 350,
          borderLeft: '1px solid',
          borderColor: 'divider',
        }
      }}
    >
      <Box sx={{ p: 3 }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 3
        }}>
          <Typography variant="h6">Settings</Typography>
          <IconButton onClick={onClose} size="small">
            <X />
          </IconButton>
        </Box>

        <Stack spacing={2}>
          <FormControlLabel
            control={
              <Switch
                checked={themeMode === 'dark'}
                onChange={toggleTheme}
                color="primary"
              />
            }
            label="Dark Mode"
            sx={{
              '& .MuiFormControlLabel-label': {
                fontSize: '14px'
              }
            }}
          />
          {/* Add more settings here */}
        </Stack>
      </Box>
    </Drawer>
  );
}
