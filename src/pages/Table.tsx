import React from 'react';
import { Box, Typography } from '@mui/material';
import DataTable from '../components/table/DataTable';

export default function Table() {
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column',
      height: 'calc(100vh - 100px)' // Account for header and padding
    }}>
      <Typography variant="h4" gutterBottom>
        Data Table
      </Typography>
      <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
        <DataTable />
      </Box>
    </Box>
  );
}