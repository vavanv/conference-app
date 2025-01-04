import React from 'react';
import { Box } from '@mui/material';
import EmployeeTable from '../components/employee/EmployeeTable';

export default function Employee() {
  return (
    <Box sx={{ 
      height: 'calc(100vh - 84px)',
      overflow: 'hidden'
    }}>
      <EmployeeTable />
    </Box>
  );
}
