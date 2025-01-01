import React, { useState } from 'react';
import { Box } from '@mui/material';
import { DataGrid, GridColDef, GridActionsCellItem } from '@mui/x-data-grid';
import { Edit2, Trash2 } from 'lucide-react';
import { Contact, ContactFormData } from '../../types/contact';
import { ContactForm } from './ContactForm';
import { ContactsToolbar } from './ContactsToolbar';
import { useContacts } from '../../hooks/useContacts';

export default function ContactsGrid() {
  const { contacts, addContact, updateContact, deleteContact } = useContacts();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editContact, setEditContact] = useState<Contact | null>(null);

  const handleEdit = (contact: Contact) => {
    setEditContact(contact);
  };

  const handleEditSubmit = (data: ContactFormData) => {
    if (editContact) {
      updateContact(editContact.id, data);
      setEditContact(null);
    }
  };

  const columns: GridColDef[] = [
    { field: 'firstName', headerName: 'First Name', flex: 1 },
    { field: 'lastName', headerName: 'Last Name', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1.5 },
    { field: 'phone', headerName: 'Phone', flex: 1 },
    { field: 'company', headerName: 'Company', flex: 1 },
    { field: 'role', headerName: 'Role', flex: 1 },
    { field: 'status', headerName: 'Status', flex: 0.7 },
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
          onClick={() => deleteContact(params.row.id)}
        />
      ]
    }
  ];

  return (
    <Box sx={{ height: 'calc(100vh - 180px)', width: '100%' }}>
      <ContactsToolbar onAdd={() => setIsAddOpen(true)} />
      
      <DataGrid
        rows={contacts}
        columns={columns}
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        pageSizeOptions={[10, 25, 50]}
        disableRowSelectionOnClick
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
    </Box>
  );
}