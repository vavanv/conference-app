import { GridColDef, GridActionsCellItem } from '@mui/x-data-grid';
import { Edit2, Trash2 } from 'lucide-react';
import { Box } from '@mui/material';
import { Company } from '../../types/company';

export const getCompanyColumns = (
  onEdit: (company: Company) => void,
  onDelete: (id: string) => void
): GridColDef[] => [
  { 
    field: 'name', 
    headerName: 'Name', 
    flex: 1,
    minWidth: 200
  },
  { 
    field: 'industry', 
    headerName: 'Industry', 
    flex: 1,
    minWidth: 150
  },
  { 
    field: 'size', 
    headerName: 'Size', 
    flex: 0.8,
    minWidth: 100
  },
  { 
    field: 'location', 
    headerName: 'Location', 
    flex: 1,
    minWidth: 150
  },
  { 
    field: 'website', 
    headerName: 'Website', 
    flex: 1.5,
    minWidth: 200,
    renderCell: (params) => (
      <a 
        href={params.value} 
        target="_blank" 
        rel="noopener noreferrer"
        style={{ color: '#1976d2', textDecoration: 'none' }}
      >
        {params.value}
      </a>
    )
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
