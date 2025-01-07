import React from 'react';
import {
  Drawer,
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  MenuItem,
  IconButton,
  Fade,
  Slide
} from '@mui/material';
import { X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { companySchema } from '../../schemas/company';
import { CompanyFormData } from '../../types/company';

interface CompanyFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CompanyFormData) => void;
  initialData?: CompanyFormData;
  title: string;
}

export function CompanyForm({ 
  open, 
  onClose, 
  onSubmit, 
  initialData, 
  title 
}: CompanyFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<CompanyFormData>({
    resolver: yupResolver(companySchema),
    defaultValues: initialData
  });

  const handleFormSubmit = (data: CompanyFormData) => {
    onSubmit(data);
    reset();
    onClose();
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { 
          width: { xs: '100%', sm: 400 },
          transition: (theme) => theme.transitions.create(['transform'], {
            duration: theme.transitions.duration.standard,
            easing: theme.transitions.easing.easeInOut,
          })
        }
      }}
      transitionDuration={400}
      SlideProps={{
        appear: true,
        direction: "left"
      }}
    >
      <Fade in={open} timeout={600}>
        <Box sx={{ p: 3 }}>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            mb: 3 
          }}>
            <Typography variant="h6">{title}</Typography>
            <IconButton onClick={onClose} size="small">
              <X />
            </IconButton>
          </Box>

          <Slide direction="left" in={open} timeout={500}>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <Stack spacing={3}>
                <TextField
                  size="small"
                  label="Company Name"
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  {...register('name')}
                  fullWidth
                />
                <TextField
                  size="small"
                  label="Industry"
                  error={!!errors.industry}
                  helperText={errors.industry?.message}
                  {...register('industry')}
                  fullWidth
                />
                <TextField
                  size="small"
                  select
                  label="Company Size"
                  error={!!errors.size}
                  helperText={errors.size?.message}
                  {...register('size')}
                  fullWidth
                >
                  <MenuItem value="1-10">1-10</MenuItem>
                  <MenuItem value="11-50">11-50</MenuItem>
                  <MenuItem value="51-200">51-200</MenuItem>
                  <MenuItem value="201-500">201-500</MenuItem>
                  <MenuItem value="501-1000">501-1000</MenuItem>
                  <MenuItem value="1001-5000">1001-5000</MenuItem>
                  <MenuItem value="5001+">5001+</MenuItem>
                </TextField>
                <TextField
                  size="small"
                  label="Location"
                  error={!!errors.location}
                  helperText={errors.location?.message}
                  {...register('location')}
                  fullWidth
                />
                <TextField
                  size="small"
                  label="Website"
                  error={!!errors.website}
                  helperText={errors.website?.message}
                  {...register('website')}
                  fullWidth
                />
                <TextField
                  size="small"
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

                <Button 
                  variant="contained" 
                  type="submit"
                  disabled={isSubmitting}
                  fullWidth
                >
                  {isSubmitting ? 'Saving...' : 'Save'}
                </Button>
              </Stack>
            </form>
          </Slide>
        </Box>
      </Fade>
    </Drawer>
  );
}
