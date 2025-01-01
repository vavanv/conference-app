import React from 'react';
import { Box } from '@mui/material';
import HomeCarousel from '../components/HomeCarousel';

export default function Home() {
  return (
    <Box sx={{ height: '100%' }}>
      <HomeCarousel />
    </Box>
  );
}