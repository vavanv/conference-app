import React, { useState } from 'react';
import { Box } from '@mui/material';
import { DataGrid, GridColDef, GridActionsCellItem } from '@mui/x-data-grid';
import { Edit2, Trash2 } from 'lucide-react';
import { Contact, ContactFormData } from '../../types/contact';
import { ContactForm } from './ContactForm';
import { ContactsToolbar } from './ContactsToolbar';
import { ConfirmDialog } from '../common/ConfirmDialog';
import { useContacts } from '../../hooks/useContacts';

export default function ContactsGrid() {
  const { contacts, addContact, updateContact, deleteContact } = useContacts();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editContact, setEditContact] = useState<Contact | null>(null);
  const [deleteContactId, setDeleteContactId] = useState<string | null>(null);

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

  const columns: GridColDef[] = [
    { field: 'firstName', headerName: 'First Name', flex: 1 },
    { field: 'lastName', headerName: 'Last Name', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1.5 },
    { field: 'phone', headerName: 'Phone', flex: 1 },
    { field: 'company', headerName: 'Company', flex: 1 },
    { field: 'role', headerName: 'Role', flex: 1 },
    { 
      field: 'status', 
      headerName: 'Status', 
      flex: 0.7,
      renderCell: (params) => (
        <Box
          sx={{
            px: 2,
            py: 0.5,
            borderRadius: 1,
            bgcolor: params.value === 'active' ? 'success.light' : 'error.light',
            color: params.value === 'active' ? 'success.dark' : 'error.dark',
            textTransform: 'capitalize'
          }}
        >
          {params.value}
        </Box>
      )
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<Edit2 size={20} />}
          label="Edit"
          onClick={() => handleEdit(params.row)}
        />,
        <GridActionsCellItem
          icon={<Trash2 size={20} />}
          label="Delete"
          onClick={() => handleDeleteClick(params.row.id)}
        />
      ]
    }
  ];

  const contactToDelete = contacts.find(c => c.id === deleteContactId);

  return (
    <Box sx={{ height: 'calc(100vh - 180px)', width: '100%' }}>
      <ContactsToolbar onAdd={() => setIsAddOpen(true)} />
      
      <DataGrid
        rows={contacts}
        columns={columns}
        density="compact"
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
          sorting: {
            sortModel: [{ field: 'lastName', sort: 'asc' }],
          },
        }}
        pageSizeOptions={[10, 25, 50]}
        disableRowSelectionOnClick
        sx={{
          '& .MuiDataGrid-cell': {
            borderColor: 'divider',
          },
          '& .MuiDataGrid-columnHeaders': {
            bgcolor: 'background.default',
            borderColor: 'divider',
          },
        }}
      />

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