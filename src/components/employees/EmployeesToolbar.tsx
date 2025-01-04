import React from 'react';
import { Box, Button } from '@mui/material';
import { UserPlus } from 'lucide-react';

interface EmployeesToolbarProps {
  onAdd: () => void;
}

export function EmployeesToolbar({ onAdd }: EmployeesToolbarProps) {
  return (
    <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-end' }}>
      <Button
        variant="contained"
        startIcon={<UserPlus size={14} />}
        onClick={onAdd}
        size="small"
      >
        Add Employee
      </Button>
    </Box>
  );
}
