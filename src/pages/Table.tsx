import React from 'react';
import { Box } from '@mui/material';
import DataTable from '../components/table/DataTable';

export default function Table() {
  return (
    <Box sx={{ 
      height: 'calc(100vh - 84px)',
      overflow: 'hidden'
    }}>
      <DataTable />
    </Box>
  );
}