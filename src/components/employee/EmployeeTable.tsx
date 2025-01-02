import React, { useState } from 'react';
import { Box } from '@mui/material';
import { DataGrid, GridColDef, GridActionsCellItem } from '@mui/x-data-grid';
import { Edit2, Trash2 } from 'lucide-react';
import { useEmployeeData } from '../../hooks/useEmployeeData';
import { EmployeeToolbar } from './EmployeeToolbar';
import { EditEmployeeDrawer } from './EditEmployeeDrawer';
import { FilterEmployeeDrawer } from './FilterEmployeeDrawer';
import { AddEmployeeDrawer } from './AddEmployeeDrawer';
import { ConfirmDialog } from '../common/ConfirmDialog';
import { formatCurrency } from '../../utils/formatters';
import { Employee } from '../../types/employee';

export default function EmployeeTable() {
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [deleteEmployeeId, setDeleteEmployeeId] = useState<number | null>(null);
  
  const { 
    employees, 
    isLoading,
    filters,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    handleFilter
  } = useEmployeeData();

  const handleEdit = (employee: Employee) => {
    setSelectedEmployee(employee);
  };

  const handleDeleteClick = (employeeId: number) => {
    setDeleteEmployeeId(employeeId);
  };

  const handleDeleteConfirm = () => {
    if (deleteEmployeeId) {
      deleteEmployee(deleteEmployeeId);
      setDeleteEmployeeId(null);
    }
  };

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'position', headerName: 'Position', flex: 1 },
    { field: 'location', headerName: 'Location', flex: 1 },
    { 
      field: 'salary', 
      headerName: 'Salary',
      type: 'number',
      flex: 0.7,
      valueFormatter: (params) => formatCurrency(params.value)
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
    <Box sx={{ height: 'calc(100vh - 180px)', width: '100%' }}>
      <EmployeeToolbar 
        onAdd={() => setIsAddOpen(true)}
        onOpenFilter={() => setIsFilterOpen(true)}
        filters={filters}
      />
      
      <DataGrid
        rows={employees}
        columns={columns}
        loading={isLoading}
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
          sorting: {
            sortModel: [{ field: 'name', sort: 'asc' }],
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
      
      <EditEmployeeDrawer
        open={!!selectedEmployee}
        onClose={() => setSelectedEmployee(null)}
        onSubmit={updateEmployee}
        initialData={selectedEmployee}
        title="Edit Employee"
      />
      
      <FilterEmployeeDrawer
        open={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApplyFilters={handleFilter}
        currentFilters={filters}
      />

      <AddEmployeeDrawer
        open={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSubmit={addEmployee}
        title="Add New Employee"
      />

      <ConfirmDialog
        open={!!deleteEmployeeId}
        title="Delete Employee"
        message={employeeToDelete ? `Are you sure you want to delete ${employeeToDelete.name}?` : ''}
        confirmLabel="Delete"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteEmployeeId(null)}
      />
    </Box>
  );
}