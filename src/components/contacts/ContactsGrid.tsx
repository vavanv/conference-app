import React, { useState } from 'react';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Contact, ContactFormData } from '../../types/contact';
import { ContactForm } from './ContactForm';
import { ConfirmDialog } from '../common/ConfirmDialog';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { addContact, updateContact, deleteContact } from '../../store/slices/contactsSlice';
import { getContactColumns } from './columns';
import { CustomGridToolbar } from '../common/CustomGridToolbar';

export function ContactsGrid() {
  const dispatch = useAppDispatch();
  const contacts = useAppSelector(state => state.contacts.items);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editContact, setEditContact] = useState<Contact | null>(null);
  const [deleteContactId, setDeleteContactId] = useState<string | null>(null);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 25,
    page: 0,
  });

  const handleEdit = (contact: Contact) => {
    setEditContact(contact);
  };

  const handleEditSubmit = (data: ContactFormData) => {
    if (editContact) {
      dispatch(updateContact({ id: editContact.id, data }));
      setEditContact(null);
    }
  };

  const handleDeleteClick = (contactId: string) => {
    setDeleteContactId(contactId);
  };

  const handleDeleteConfirm = () => {
    if (deleteContactId) {
      dispatch(deleteContact(deleteContactId));
      setDeleteContactId(null);
    }
  };

  const handleAddContact = (data: ContactFormData) => {
    dispatch(addContact(data));
    setIsAddOpen(false);
  };

  const columns = getContactColumns(handleEdit, handleDeleteClick);
  const contactToDelete = contacts.find(c => c.id === deleteContactId);

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column',
      height: 'calc(100vh - 140px)'
    }}>      
      <Box sx={{ flex: 1, width: '100%', overflow: 'hidden' }}>
        <DataGrid
          rows={contacts}
          columns={columns}
          density="compact"
          components={{
            Toolbar: (props) => (
              <CustomGridToolbar {...props} onAdd={() => setIsAddOpen(true)} addButtonText="Add Contact" />
            ),
          }}
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
        onSubmit={handleAddContact}
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