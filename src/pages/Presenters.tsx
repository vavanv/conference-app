import React from 'react';
import { Typography, Box } from '@mui/material';
import { PresentersGrid } from '../components/presenters/PresentersGrid';

export default function Presenters() {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Presenters
      </Typography>
      <PresentersGrid />
    </Box>
  );
}
