import React from 'react';
import { Box, Button } from '@mui/material';
import { GridToolbarContainer, GridToolbar } from '@mui/x-data-grid';
import { UserPlus } from 'lucide-react';

interface CustomGridToolbarProps {
  onAdd: () => void;
  addButtonText: string;
}

export function CustomGridToolbar({ onAdd, addButtonText }: CustomGridToolbarProps) {
  return (
    <GridToolbarContainer>
      <GridToolbar />
      <Box sx={{ ml: 'auto' }}>
        <Button
          variant="text"
          startIcon={<UserPlus size={14} />}
          onClick={onAdd}
          size="small"
          sx={{
            backgroundColor: 'transparent',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.04)'
            }
          }}
        >
          {addButtonText}
        </Button>
      </Box>
    </GridToolbarContainer>
  );
}