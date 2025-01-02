import React from 'react';
import { Box, Paper } from '@mui/material';
import LoginForm from '../components/auth/LoginForm';

export default function Login() {
  return (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100%'
    }}>
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4, 
          width: '100%', 
          maxWidth: 400,
          bgcolor: 'background.paper'
        }}
      >
        <LoginForm />
      </Paper>
    </Box>
  );
}