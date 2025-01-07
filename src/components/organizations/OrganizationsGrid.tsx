import React, { useState } from 'react';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Organization, OrganizationFormData } from '../../types/organization';
import OrganizationForm from './OrganizationForm';
import { ConfirmDialog } from '../common/ConfirmDialog';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { addOrganization, updateOrganization, deleteOrganization } from '../../store/slices/organizationsSlice';
import { getOrganizationColumns } from './columns';
import { CustomGridToolbar } from '../common/CustomGridToolbar';

export function OrganizationsGrid() {
  const dispatch = useAppDispatch();
  const organizations = useAppSelector(state => state.organizations.items);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editOrganization, setEditOrganization] = useState<Organization | null>(null);
  const [deleteOrganizationId, setDeleteOrganizationId] = useState<string | null>(null);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 25,
    page: 0,
  });

  const handleEdit = (organization: Organization) => {
    setEditOrganization(organization);
  };

  const handleEditSubmit = (data: OrganizationFormData) => {
    if (editOrganization) {
      dispatch(updateOrganization({ id: editOrganization.id, data }));
      setEditOrganization(null);
    }
  };

  const handleDeleteClick = (organizationId: string) => {
    setDeleteOrganizationId(organizationId);
  };

  const handleDeleteConfirm = () => {
    if (deleteOrganizationId) {
      dispatch(deleteOrganization(deleteOrganizationId));
      setDeleteOrganizationId(null);
    }
  };

  const handleAddOrganization = (data: OrganizationFormData) => {
    dispatch(addOrganization(data));
    setIsAddOpen(false);
  };

  const columns = getOrganizationColumns(handleEdit, handleDeleteClick);
  const organizationToDelete = organizations.find(o => o.id === deleteOrganizationId);

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column',
      height: 'calc(100vh - 140px)'
    }}>      
      <Box sx={{ flex: 1, width: '100%', overflow: 'hidden' }}>
        <DataGrid
          rows={organizations}
          columns={columns}
          density="compact"
          components={{
            Toolbar: (props) => (
              <CustomGridToolbar {...props} onAdd={() => setIsAddOpen(true)} addButtonText="Add Organization" />
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

      <OrganizationForm
        open={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSubmit={handleAddOrganization}
        title="Add New Organization"
      />

      {editOrganization && (
        <OrganizationForm
          open={true}
          onClose={() => setEditOrganization(null)}
          onSubmit={handleEditSubmit}
          initialData={editOrganization}
          title="Edit Organization"
        />
      )}

      <ConfirmDialog
        open={!!deleteOrganizationId}
        title="Delete Organization"
        message={organizationToDelete ? `Are you sure you want to delete ${organizationToDelete.name}?` : ''}
        confirmLabel="Delete"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteOrganizationId(null)}
      />
    </Box>
  );
}
