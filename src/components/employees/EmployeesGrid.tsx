import React, { useState } from 'react';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Employee, EmployeeFormData } from '../../types/employee';
import { EmployeeForm } from './EmployeeForm';
import { ConfirmDialog } from '../common/ConfirmDialog';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { addEmployee, updateEmployee, deleteEmployee } from '../../store/slices/employeesSlice';
import { getEmployeeColumns } from './columns';
import { CustomGridToolbar } from '../common/CustomGridToolbar';

export function EmployeesGrid() {
  const dispatch = useAppDispatch();
  const employees = useAppSelector(state => state.employees.items);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editEmployee, setEditEmployee] = useState<Employee | null>(null);
  const [deleteEmployeeId, setDeleteEmployeeId] = useState<string | null>(null);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 25,
    page: 0,
  });

  const handleEdit = (employee: Employee) => {
    setEditEmployee(employee);
  };

  const handleEditSubmit = (data: EmployeeFormData) => {
    if (editEmployee) {
      dispatch(updateEmployee({ id: editEmployee.id, data }));
      setEditEmployee(null);
    }
  };

  const handleDeleteClick = (employeeId: string) => {
    setDeleteEmployeeId(employeeId);
  };

  const handleDeleteConfirm = () => {
    if (deleteEmployeeId) {
      dispatch(deleteEmployee(deleteEmployeeId));
      setDeleteEmployeeId(null);
    }
  };

  const handleAddEmployee = (data: EmployeeFormData) => {
    dispatch(addEmployee(data));
    setIsAddOpen(false);
  };

  const columns = getEmployeeColumns(handleEdit, handleDeleteClick);
  const employeeToDelete = employees.find(e => e.id === deleteEmployeeId);

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column',
      height: 'calc(100vh - 140px)'
    }}>      
      <Box sx={{ flex: 1, width: '100%', overflow: 'hidden' }}>
        <DataGrid
          rows={employees}
          columns={columns}
          density="compact"
          components={{
            Toolbar: (props) => (
              <CustomGridToolbar {...props} onAdd={() => setIsAddOpen(true)} addButtonText="Add Employee" />
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

      <EmployeeForm
        open={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSubmit={handleAddEmployee}
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