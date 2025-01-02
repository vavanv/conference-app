import React from 'react';
import { Typography, Box } from '@mui/material';
import EmployeesGrid from '../components/employees/EmployeesGrid';

export default function Employees() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Employees
      </Typography>
      <EmployeesGrid />
    </Box>
  );
}