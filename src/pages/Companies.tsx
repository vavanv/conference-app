import React from 'react';
import { Typography, Box } from '@mui/material';
import { CompaniesGrid } from '../components/companies/CompaniesGrid';

export default function Companies() {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Companies
      </Typography>
      <CompaniesGrid />
    </Box>
  );
}
