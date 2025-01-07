import { GridColDef, GridActionsCellItem } from '@mui/x-data-grid';
import { Edit2, Trash2 } from 'lucide-react';
import { Box } from '@mui/material';
import { Attendance } from '../../types/attendance';

export const getAttendanceColumns = (
  onEdit: (attendance: Attendance) => void,
  onDelete: (id: string) => void
): GridColDef[] => [
  { 
    field: 'employeeName', 
    headerName: 'Employee', 
    flex: 1,
    minWidth: 200
  },
  { 
    field: 'date', 
    headerName: 'Date', 
    flex: 1,
    minWidth: 150,
    valueFormatter: (params) => new Date(params.value).toLocaleDateString()
  },
  { 
    field: 'status', 
    headerName: 'Status', 
    flex: 0.8,
    minWidth: 100,
    renderCell: (params) => (
      <Box
        sx={{
          px: 2,
          py: 0.5,
          borderRadius: 1,
          bgcolor: params.value === 'present' ? 'success.light' : 
                   params.value === 'absent' ? 'error.light' :
                   params.value === 'late' ? 'warning.light' : 'info.light',
          color: params.value === 'present' ? 'success.dark' : 
                 params.value === 'absent' ? 'error.dark' :
                 params.value === 'late' ? 'warning.dark' : 'info.dark',
          textTransform: 'capitalize'
        }}
      >
        {params.value}
      </Box>
    )
  },
  { 
    field: 'checkInTime', 
    headerName: 'Check-in', 
    flex: 0.8,
    minWidth: 100
  },
  { 
    field: 'checkOutTime', 
    headerName: 'Check-out', 
    flex: 0.8,
    minWidth: 100
  },
  {
    field: 'actions',
    type: 'actions',
    headerName: 'Actions',
    width: 80,
    getActions: (params) => [
      <GridActionsCellItem
        icon={<Edit2 size={14} />}
        label="Edit"
        onClick={() => onEdit(params.row)}
        sx={{ '& .MuiSvgIcon-root': { fontSize: '1.1rem' } }}
      />,
      <GridActionsCellItem
        icon={<Trash2 size={14} />}
        label="Delete"
        onClick={() => onDelete(params.row.id)}
        sx={{ '& .MuiSvgIcon-root': { fontSize: '1.1rem' } }}
      />
    ]
  }
];
