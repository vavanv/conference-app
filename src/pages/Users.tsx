import React from 'react';
    import { Typography, Box } from '@mui/material';
    import UsersGrid from '../components/users/UsersGrid';
    
    export default function Users() {
      return (
        <Box>
          <Typography variant="h5" gutterBottom>
            Users
          </Typography>
          <UsersGrid />
        </Box>
      );
    }
