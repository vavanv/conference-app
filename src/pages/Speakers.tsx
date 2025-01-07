import React from 'react';
import { Typography, Box } from '@mui/material';
import SpeakersGrid from '../components/speakers/SpeakersGrid';

export default function Speakers() {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Speakers
      </Typography>
      <SpeakersGrid />
    </Box>
  );
}
