import React from 'react';
import {
  Drawer,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Stack,
  Divider,
  InputAdornment
} from '@mui/material';
import { X, RefreshCw } from 'lucide-react';
import { FilterConfig } from '../../types/table';

interface FilterDrawerProps {
  open: boolean;
  onClose: () => void;
  onApplyFilters: (filters: FilterConfig) => void;
  currentFilters: FilterConfig;
}

export function FilterDrawer({ 
  open, 
  onClose, 
  onApplyFilters, 
  currentFilters 
}: FilterDrawerProps) {
  const [filters, setFilters] = React.useState<FilterConfig>(currentFilters);

  React.useEffect(() => {
    setFilters(currentFilters);
  }, [currentFilters]);

  const handleChange = (field: keyof FilterConfig) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (field === 'salaryRange') {
      const [type, bound] = e.target.name.split('-');
      setFilters(prev => ({
        ...prev,
        salaryRange: {
          ...prev.salaryRange,
          [bound]: e.target.value ? Number(e.target.value) : undefined
        }
      }));
    } else {
      setFilters(prev => ({
        ...prev,
        [field]: e.target.value || undefined
      }));
    }
  };

  const handleReset = () => {
    setFilters({});
    onApplyFilters({});
  };

  const handleApply = () => {
    onApplyFilters(filters);
    onClose();
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { width: { xs: '100%', sm: 400 } }
      }}
    >
      <Box sx={{ p: 3 }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 3 
        }}>
          <Typography variant="h6">Filter Data</Typography>
          <IconButton onClick={onClose} size="small">
            <X />
          </IconButton>
        </Box>

        <Stack spacing={3}>
          <TextField
            size="small"
            label="Name"
            value={filters.name || ''}
            onChange={handleChange('name')}
            fullWidth
          />
          
          <TextField
            size="small"
            label="Position"
            value={filters.position || ''}
            onChange={handleChange('position')}
            fullWidth
          />
          
          <TextField
            size="small"
            label="Location"
            value={filters.location || ''}
            onChange={handleChange('location')}
            fullWidth
          />
          
          <Typography variant="subtitle2" color="text.secondary">
            Salary Range
          </Typography>
          
          <Stack direction="row" spacing={2}>
            <TextField
              size="small"
              label="Min"
              type="number"
              name="salary-min"
              value={filters.salaryRange?.min || ''}
              onChange={handleChange('salaryRange')}
              fullWidth
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>
              }}
            />
            <TextField
              size="small"
              label="Max"
              type="number"
              name="salary-max"
              value={filters.salaryRange?.max || ''}
              onChange={handleChange('salaryRange')}
              fullWidth
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>
              }}
            />
          </Stack>

          <Divider />
          
          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              onClick={handleReset}
              startIcon={<RefreshCw />}
              fullWidth
            >
              Reset
            </Button>
            <Button 
              variant="contained"
              onClick={handleApply}
              fullWidth
            >
              Apply Filters
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Drawer>
  );
}