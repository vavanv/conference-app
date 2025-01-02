import React from 'react';
import { Box, Skeleton } from '@mui/material';

export function EmployeeLoadingSkeleton() {
  return (
    <Box sx={{ width: '100%' }}>
      <Skeleton height={64} />
      {[...Array(5)].map((_, index) => (
        <Skeleton key={index} height={53} />
      ))}
    </Box>
  );
}