import React, { useState } from 'react';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Employee, EmployeeFormData } from '../../types/employee';
import { EmployeeForm } from './EmployeeForm';
import { EmployeesToolbar } from './EmployeesToolbar';
import { ConfirmDialog } from '../common/ConfirmDialog';
import { useEmployees } from '../../hooks/useEmployees';
import { getEmployeeColumns } from './columns';

export default function EmployeesGrid() {
  const { employees, addEmployee, updateEmployee, deleteEmployee } = useEmployees();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editEmployee, setEditEmployee] = useState<Employee | null>(null);
  const [deleteEmployeeId, setDeleteEmployeeId] = useState<string | null>(null);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  });

  const handleEdit = (employee: Employee) => {
    setEditEmployee(employee);
  };

  const handleEditSubmit = (data: EmployeeFormData) => {
    if (editEmployee) {
      updateEmployee(editEmployee.id, data);
      setEditEmployee(null);
    }
  };

  const handleDeleteClick = (employeeId: string) => {
    setDeleteEmployeeId(employeeId);
  };

  const handleDeleteConfirm = () => {
    if (deleteEmployeeId) {
      deleteEmployee(deleteEmployeeId);
      setDeleteEmployeeId(null);
    }
  };

  const columns = getEmployeeColumns(handleEdit, handleDeleteClick);
  const employeeToDelete = employees.find(e => e.id === deleteEmployeeId);

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column',
      height: 'calc(100vh - 140px)'
    }}>
      <EmployeesToolbar onAdd={() => setIsAddOpen(true)} />
      
      <Box sx={{ flex: 1, width: '100%', overflow: 'hidden' }}>
        <DataGrid
          rows={employees}
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

      <EmployeeForm
        open={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSubmit={addEmployee}
        title="Add New Employee"
      />

      {editEmployee && (
        <EmployeeForm
          open={true}
          onClose={() => setEditEmployee(null)}
          onSubmit={handleEditSubmit}
          initialData={editEmployee}
          title="Edit Employee"
        />
      )}

      <ConfirmDialog
        open={!!deleteEmployeeId}
        title="Delete Employee"
        message={employeeToDelete ? `Are you sure you want to delete ${employeeToDelete.firstName} ${employeeToDelete.lastName}?` : ''}
        confirmLabel="Delete"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteEmployeeId(null)}
      />
    </Box>
  );
}