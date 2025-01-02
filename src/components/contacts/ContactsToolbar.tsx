import React from 'react';
import { Box, Button } from '@mui/material';
import { UserPlus } from 'lucide-react';

interface ContactsToolbarProps {
  onAdd: () => void;
}

export function ContactsToolbar({ onAdd }: ContactsToolbarProps) {
  return (
    <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-end' }}>
      <Button
        variant="contained"
        startIcon={<UserPlus size={14} />}
        onClick={onAdd}
        size="small"
      >
        Add Contact
      </Button>
    </Box>
  );
}