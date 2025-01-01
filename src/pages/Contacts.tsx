import React from 'react';
import { Typography, Box } from '@mui/material';
import ContactsGrid from '../components/contacts/ContactsGrid';

export default function Contacts() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Contacts
      </Typography>
      <ContactsGrid />
    </Box>
  );
}