import React, { useState } from 'react';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Contact, ContactFormData } from '../../types/contact';
import { ContactForm } from './ContactForm';
import { ContactsToolbar } from './ContactsToolbar';
import { ConfirmDialog } from '../common/ConfirmDialog';
import { useContacts } from '../../hooks/useContacts';
import { getContactColumns } from './columns';

export default function ContactsGrid() {
  const { contacts, addContact, updateContact, deleteContact } = useContacts();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editContact, setEditContact] = useState<Contact | null>(null);
  const [deleteContactId, setDeleteContactId] = useState<string | null>(null);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  });

  const handleEdit = (contact: Contact) => {
    setEditContact(contact);
  };

  const handleEditSubmit = (data: ContactFormData) => {
    if (editContact) {
      updateContact(editContact.id, data);
      setEditContact(null);
    }
  };

  const handleDeleteClick = (contactId: string) => {
    setDeleteContactId(contactId);
  };

  const handleDeleteConfirm = () => {
    if (deleteContactId) {
      deleteContact(deleteContactId);
      setDeleteContactId(null);
    }
  };

  const columns = getContactColumns(handleEdit, handleDeleteClick);
  const contactToDelete = contacts.find(c => c.id === deleteContactId);

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column',
      height: 'calc(100vh - 140px)'
    }}>
      <ContactsToolbar onAdd={() => setIsAddOpen(true)} />
      
      <Box sx={{ flex: 1, width: '100%', overflow: 'hidden' }}>
        <DataGrid
          rows={contacts}
          columns={columns}
          density="compact"
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[10, 25, 50]}
          disableRowSelectionOnClick
          sx={{
            height: '100%',
            border: 'none',
            '& .MuiDataGrid-cell': {
              borderColor: 'divider',
            },
            '& .MuiDataGrid-columnHeaders': {
              bgcolor: 'background.default',
              borderColor: 'divider',
            },
            '& .MuiDataGrid-footerContainer': {
              borderColor: 'divider',
            },
          }}
        />
      </Box>

      <ContactForm
        open={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSubmit={addContact}
        title="Add New Contact"
      />

      {editContact && (
        <ContactForm
          open={true}
          onClose={() => setEditContact(null)}
          onSubmit={handleEditSubmit}
          initialData={editContact}
          title="Edit Contact"
        />
      )}

      <ConfirmDialog
        open={!!deleteContactId}
        title="Delete Contact"
        message={contactToDelete ? `Are you sure you want to delete ${contactToDelete.firstName} ${contactToDelete.lastName}?` : ''}
        confirmLabel="Delete"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteContactId(null)}
      />
    </Box>
  );
}