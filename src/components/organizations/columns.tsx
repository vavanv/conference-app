import { GridColDef, GridActionsCellItem } from '@mui/x-data-grid';
import { Edit2, Trash2 } from 'lucide-react';
import { Box } from '@mui/material';
import { Organization } from '../../types/organization';

export const getOrganizationColumns = (
  onEdit: (organization: Organization) => void,
  onDelete: (id: string) => void
): GridColDef[] => [
  { 
    field: 'name', 
    headerName: 'Name', 
    flex: 1,
    minWidth: 200
  },
  { 
    field: 'type', 
    headerName: 'Type', 
    flex: 1,
    minWidth: 150
  },
  { 
    field: 'contactEmail', 
    headerName: 'Email', 
    flex: 1.5,
    minWidth: 200
  },
  { 
    field: 'phone', 
    headerName: 'Phone', 
    flex: 1,
    minWidth: 150
  },
  { 
    field: 'address', 
    headerName: 'Address', 
    flex: 1.5,
    minWidth: 250
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
