import React from 'react';
import { 
  Typography, 
  Paper, 
  TextField, 
  Button, 
  Box 
} from '@mui/material';

export default function Login() {
  return (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '80vh' 
    }}>
      <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 400 }}>
        <Typography variant="h5" gutterBottom align="center">
          Login
        </Typography>
        <Box component="form" sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Email"
            margin="normal"
            variant="outlined"
            type="email"
          />
          <TextField
            fullWidth
            label="Password"
            margin="normal"
            variant="outlined"
            type="password"
          />
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3 }}
          >
            Sign In
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}