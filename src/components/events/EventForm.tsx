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
import { eventSchema } from '../../schemas/event';
import { EventFormData } from '../../types/event';

interface EventFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: EventFormData) => void;
  initialData?: EventFormData;
  title: string;
}

export function EventForm({ 
  open, 
  onClose, 
  onSubmit, 
  initialData, 
  title 
}: EventFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<EventFormData>({
    resolver: yupResolver(eventSchema),
    defaultValues: initialData
  });

  const handleFormSubmit = (data: EventFormData) => {
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
                  label="Event Name"
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  {...register('name')}
                  fullWidth
                />
                <TextField
                  size="small"
                  label="Date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  error={!!errors.date}
                  helperText={errors.date?.message}
                  {...register('date')}
                  fullWidth
                />
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
                  label="Organizer"
                  error={!!errors.organizer}
                  helperText={errors.organizer?.message}
                  {...register('organizer')}
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
