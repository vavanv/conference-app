import React from 'react';
import { Typography, Box } from '@mui/material';
import AttendanceGrid from '../components/attendance/AttendanceGrid';

export default function Attendance() {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Attendance
      </Typography>
      <AttendanceGrid />
    </Box>
  );
}
