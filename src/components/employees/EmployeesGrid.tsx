import React, { useState } from 'react';
import { Box } from '@mui/material';
import { DataGrid, GridColDef, GridActionsCellItem } from '@mui/x-data-grid';
import { Edit2, Trash2 } from 'lucide-react';
import { Employee, EmployeeFormData } from '../../types/employee';
import { EmployeeForm } from './EmployeeForm';
import { EmployeesToolbar } from './EmployeesToolbar';
import { ConfirmDialog } from '../common/ConfirmDialog';
import { useEmployees } from '../../hooks/useEmployees';

export default function EmployeesGrid() {
  const { employees, addEmployee, updateEmployee, deleteEmployee } = useEmployees();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editEmployee, setEditEmployee] = useState<Employee | null>(null);
  const [deleteEmployeeId, setDeleteEmployeeId] = useState<string | null>(null);

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

  const columns: GridColDef[] = [
    { 
      field: 'firstName', 
      headerName: 'First Name', 
      flex: 1,
      minWidth: 130
    },
    { 
      field: 'lastName', 
      headerName: 'Last Name', 
      flex: 1,
      minWidth: 130
    },
    { 
      field: 'email', 
      headerName: 'Email', 
      flex: 1.5,
      minWidth: 200
    },
    { 
      field: 'department', 
      headerName: 'Department', 
      flex: 1,
      minWidth: 130
    },
    { 
      field: 'position', 
      headerName: 'Position', 
      flex: 1,
      minWidth: 150
    },
    { 
      field: 'location', 
      headerName: 'Location', 
      flex: 1,
      minWidth: 120
    },
    { 
      field: 'status', 
      headerName: 'Status', 
      flex: 0.7,
      minWidth: 100,
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

  const employeeToDelete = employees.find(e => e.id === deleteEmployeeId);

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column',
      height: 'calc(100vh - 180px - 48px)' // Subtract bottom control height
    }}>
      <EmployeesToolbar onAdd={() => setIsAddOpen(true)} />
      
      <Box sx={{ flex: 1, minHeight: 0 }}>
        <DataGrid
          rows={employees}
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
            height: '100%',
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