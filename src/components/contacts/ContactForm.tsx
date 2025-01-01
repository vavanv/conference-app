import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
  MenuItem
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { contactSchema } from '../../schemas/contact';
import { ContactFormData } from '../../types/contact';

interface ContactFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: ContactFormData) => void;
  initialData?: ContactFormData;
  title: string;
}

export function ContactForm({ 
  open, 
  onClose, 
  onSubmit, 
  initialData, 
  title 
}: ContactFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactFormData>({
    resolver: yupResolver(contactSchema),
    defaultValues: initialData
  });

  const handleFormSubmit = (data: ContactFormData) => {
    onSubmit(data);
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <DialogContent>
          <Stack spacing={2}>
            <TextField
              label="First Name"
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
              {...register('firstName')}
              fullWidth
            />
            <TextField
              label="Last Name"
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
              {...register('lastName')}
              fullWidth
            />
            <TextField
              label="Email"
              error={!!errors.email}
              helperText={errors.email?.message}
              {...register('email')}
              fullWidth
            />
            <TextField
              label="Phone"
              error={!!errors.phone}
              helperText={errors.phone?.message}
              {...register('phone')}
              fullWidth
            />
            <TextField
              label="Company"
              error={!!errors.company}
              helperText={errors.company?.message}
              {...register('company')}
              fullWidth
            />
            <TextField
              label="Role"
              error={!!errors.role}
              helperText={errors.role?.message}
              {...register('role')}
              fullWidth
            />
            <TextField
              select
              label="Status"
              error={!!errors.status}
              helperText={errors.status?.message}
              {...register('status')}
              fullWidth
            >
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
            </TextField>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">Save</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}