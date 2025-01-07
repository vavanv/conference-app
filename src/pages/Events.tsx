import React from 'react';
import { Typography, Box } from '@mui/material';
import EventsGrid from '../components/events/EventsGrid';

export default function Events() {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Events
      </Typography>
      <EventsGrid />
    </Box>
  );
}
