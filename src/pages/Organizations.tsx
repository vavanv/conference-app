import React from 'react';
import { Typography, Box } from '@mui/material';
import { OrganizationsGrid } from '../components/organizations/OrganizationsGrid';

export default function Organizations() {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Organizations
      </Typography>
      <OrganizationsGrid />
    </Box>
  );
}
