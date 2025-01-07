import { GridColDef, GridActionsCellItem } from '@mui/x-data-grid';
import { Edit2, Trash2 } from 'lucide-react';
import { Box } from '@mui/material';
import { Attendance } from '../../types/attendance';

export const getAttendanceColumns = (
  onEdit: (attendance: Attendance) => void,
  onDelete: (id: string) => void
): GridColDef[] => [
  { 
    field: 'eventId', 
    headerName: 'Event ID', 
    flex: 1,
    minWidth: 120
  },
  { 
    field: 'attendeeId', 
    headerName: 'Attendee ID', 
    flex: 1,
    minWidth: 120
  },
  { 
    field: 'checkInTime', 
    headerName: 'Check-in Time', 
    flex: 1,
    minWidth: 180,
    valueFormatter: (params) => new Date(params.value).toLocaleString()
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
          bgcolor: params.value === 'present' ? 'success.light' : 
                   params.value === 'late' ? 'warning.light' : 'error.light',
          color: params.value === 'present' ? 'success.dark' : 
                 params.value === 'late' ? 'warning.dark' : 'error.dark',
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
