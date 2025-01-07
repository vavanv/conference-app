import React, { useState } from 'react';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Company, CompanyFormData } from '../../types/company';
import { CompanyForm } from './CompanyForm';
import { ConfirmDialog } from '../common/ConfirmDialog';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { addCompany, updateCompany, deleteCompany } from '../../store/slices/companiesSlice';
import { getCompanyColumns } from './columns';
import { CustomGridToolbar } from '../common/CustomGridToolbar';

export function CompaniesGrid() {
  const dispatch = useAppDispatch();
  const companies = useAppSelector(state => state.companies.items);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editCompany, setEditCompany] = useState<Company | null>(null);
  const [deleteCompanyId, setDeleteCompanyId] = useState<string | null>(null);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 25,
    page: 0,
  });

  const handleEdit = (company: Company) => {
    setEditCompany(company);
  };

  const handleEditSubmit = (data: CompanyFormData) => {
    if (editCompany) {
      dispatch(updateCompany({ id: editCompany.id, data }));
      setEditCompany(null);
    }
  };

  const handleDeleteClick = (companyId: string) => {
    setDeleteCompanyId(companyId);
  };

  const handleDeleteConfirm = () => {
    if (deleteCompanyId) {
      dispatch(deleteCompany(deleteCompanyId));
      setDeleteCompanyId(null);
    }
  };

  const handleAddCompany = (data: CompanyFormData) => {
    dispatch(addCompany(data));
    setIsAddOpen(false);
  };

  const columns = getCompanyColumns(handleEdit, handleDeleteClick);
  const companyToDelete = companies.find(c => c.id === deleteCompanyId);

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column',
      height: 'calc(100vh - 140px)'
    }}>      
      <Box sx={{ flex: 1, width: '100%', overflow: 'hidden' }}>
        <DataGrid
          rows={companies}
          columns={columns}
          density="compact"
          components={{
            Toolbar: (props) => (
              <CustomGridToolbar {...props} onAdd={() => setIsAddOpen(true)} addButtonText="Add Company" />
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

      <CompanyForm
        open={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSubmit={handleAddCompany}
        title="Add New Company"
      />

      {editCompany && (
        <CompanyForm
          open={true}
          onClose={() => setEditCompany(null)}
          onSubmit={handleEditSubmit}
          initialData={editCompany}
          title="Edit Company"
        />
      )}

      <ConfirmDialog
        open={!!deleteCompanyId}
        title="Delete Company"
        message={companyToDelete ? `Are you sure you want to delete ${companyToDelete.name}?` : ''}
        confirmLabel="Delete"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteCompanyId(null)}
      />
    </Box>
  );
}
