import React from 'react';
import { Box, Paper, Grid as MuiGrid, Typography } from '@mui/material';
import GridCard from '../components/grid/GridCard';
import { gridItems } from '../config/gridItems';

export default function Grid() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" gutterBottom>
        Grid Layout
      </Typography>
      <MuiGrid container spacing={3}>
        {gridItems.map((item, index) => (
          <MuiGrid item xs={12} sm={6} md={4} lg={3} key={index}>
            <GridCard {...item} />
          </MuiGrid>
        ))}
      </MuiGrid>
    </Box>
  );
}