import React from 'react';
import { alpha, Toolbar, Typography, IconButton, Tooltip, Badge } from '@mui/material';
import { Download, Filter, UserPlus } from 'lucide-react';
import { FilterConfig } from '../../types/table';

interface EmployeeToolbarProps {
  onOpenFilter: () => void;
  onOpenAddEmployee: () => void;
  filters: FilterConfig;
}

export function EmployeeToolbar({ onOpenFilter, onOpenAddEmployee, filters }: EmployeeToolbarProps) {
  const activeFiltersCount = Object.keys(filters).reduce((count, key) => {
    if (key === 'salaryRange') {
      return count + (filters.salaryRange?.min ? 1 : 0) + (filters.salaryRange?.max ? 1 : 0);
    }
    return count + (filters[key as keyof FilterConfig] ? 1 : 0);
  }, 0);

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        bgcolor: (theme) =>
          alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
      }}
    >
      <Typography
        sx={{ flex: '1 1 100%' }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        Employee Data
      </Typography>
      <Tooltip title="Add employee">
        <IconButton onClick={onOpenAddEmployee}>
          <UserPlus />
        </IconButton>
      </Tooltip>
      <Tooltip title="Filter list">
        <IconButton onClick={onOpenFilter}>
          <Badge 
            badgeContent={activeFiltersCount} 
            color="primary"
            sx={{
              '& .MuiBadge-badge': {
                right: -3,
                top: 3,
              },
            }}
          >
            <Filter />
          </Badge>
        </IconButton>
      </Tooltip>
      <Tooltip title="Export data">
        <IconButton>
          <Download />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
}
