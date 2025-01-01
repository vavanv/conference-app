import React from 'react';
import {
  Drawer,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Stack,
  InputAdornment
} from '@mui/material';
import { X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { employeeSchema, EmployeeFormData } from '../../schemas/employee';
import { TableData } from '../../types/table';

interface AddEmployeeDrawerProps {
  open: boolean;
  onClose: () => void;
  onAdd: (employee: TableData) => void;
}

export function AddEmployeeDrawer({ open, onClose, onAdd }: AddEmployeeDrawerProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<EmployeeFormData>({
    resolver: yupResolver(employeeSchema),
    mode: 'onBlur'
  });

  const onSubmit = async (data: EmployeeFormData) => {
    const newEmployee: TableData = {
      id: Date.now(), // Simple ID generation
      ...data
    };
    onAdd(newEmployee);
    reset();
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
          <Typography variant="h6">Add New Employee</Typography>
          <IconButton onClick={onClose} size="small">
            <X />
          </IconButton>
        </Box>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            <TextField
              label="Name"
              error={!!errors.name}
              helperText={errors.name?.message}
              {...register('name')}
              fullWidth
            />

            <TextField
              label="Position"
              error={!!errors.position}
              helperText={errors.position?.message}
              {...register('position')}
              fullWidth
            />

            <TextField
              label="Location"
              error={!!errors.location}
              helperText={errors.location?.message}
              {...register('location')}
              fullWidth
            />

            <TextField
              label="Salary"
              type="number"
              error={!!errors.salary}
              helperText={errors.salary?.message}
              {...register('salary')}
              fullWidth
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>
              }}
            />

            <Button 
              variant="contained" 
              type="submit"
              disabled={isSubmitting}
              fullWidth
            >
              Add Employee
            </Button>
          </Stack>
        </form>
      </Box>
    </Drawer>
  );
}