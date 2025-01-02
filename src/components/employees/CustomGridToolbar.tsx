import React from 'react';
import { Box, Button } from '@mui/material';
import { GridToolbarContainer, GridToolbar } from '@mui/x-data-grid';
import { UserPlus } from 'lucide-react';

interface CustomGridToolbarProps {
  onAdd: () => void;
}

export function CustomGridToolbar({ onAdd }: CustomGridToolbarProps) {
  return (
    <GridToolbarContainer>
      <GridToolbar />
      <Box sx={{ ml: 'auto' }}>
        <Button
          variant="contained"
          startIcon={<UserPlus size={14} />}
          onClick={onAdd}
          size="small"
        >
          Add Employee
        </Button>
      </Box>
    </GridToolbarContainer>
  );
}