import React, { useState } from 'react';
import { Box } from '@mui/material';
import { DataGrid, GridColDef, GridActionsCellItem, GridRowParams } from '@mui/x-data-grid';
import { Edit2, Trash2 } from 'lucide-react';
import { useEmployeeData } from '../../hooks/useEmployeeData';
import { EmployeeToolbar } from './EmployeeToolbar';
import { EditEmployeeDrawer } from './EditEmployeeDrawer';
import { FilterEmployeeDrawer } from './FilterEmployeeDrawer';
import { AddEmployeeDrawer } from './AddEmployeeDrawer';
import { TableData } from '../../types/table';
import { formatCurrency } from '../../utils/formatters';

export default function EmployeeTable() {
  const [selectedEmployee, setSelectedEmployee] = useState<TableData | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isAddEmployeeOpen, setIsAddEmployeeOpen] = useState(false);
  
  const { 
    data, 
    isLoading,
    filters,
    addEmployee,
    updateRecord,
    handleFilter,
    deleteEmployee
  } = useEmployeeData();

  const handleEdit = (params: GridRowParams) => {
    setSelectedEmployee(params.row);
  };

  const columns: GridColDef[] = [
    { 
      field: 'name', 
      headerName: 'Name', 
      flex: 1,
      minWidth: 180 
    },
    { 
      field: 'position', 
      headerName: 'Position', 
      flex: 1,
      minWidth: 200 
    },
    { 
      field: 'location', 
      headerName: 'Location', 
      flex: 1,
      minWidth: 150 
    },
    { 
      field: 'salary', 
      headerName: 'Salary',
      type: 'number',
      flex: 1,
      minWidth: 130,
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
          onClick={() => handleEdit(params)}
        />,
        <GridActionsCellItem
          icon={<Trash2 size={20} />}
          label="Delete"
          onClick={() => deleteEmployee(params.id)}
        />
      ]
    }
  ];

  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      <EmployeeToolbar 
        onOpenFilter={() => setIsFilterOpen(true)}
        onOpenAddEmployee={() => setIsAddEmployeeOpen(true)}
        filters={filters}
      />
      
      <DataGrid
        rows={data}
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
        autoHeight
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
        record={selectedEmployee}
        onClose={() => setSelectedEmployee(null)}
        onSave={updateRecord}
      />
      
      <FilterEmployeeDrawer
        open={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApplyFilters={handleFilter}
        currentFilters={filters}
      />

      <AddEmployeeDrawer
        open={isAddEmployeeOpen}
        onClose={() => setIsAddEmployeeOpen(false)}
        onAdd={addEmployee}
      />
    </Box>
  );
}