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
import { attendanceSchema } from '../../schemas/attendance';
import { AttendanceFormData } from '../../types/attendance';

interface AttendanceFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: AttendanceFormData) => void;
  initialData?: AttendanceFormData;
  title: string;
}

export function AttendanceForm({ 
  open, 
  onClose, 
  onSubmit, 
  initialData, 
  title 
}: AttendanceFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<AttendanceFormData>({
    resolver: yupResolver(attendanceSchema),
    defaultValues: initialData
  });

  const handleFormSubmit = (data: AttendanceFormData) => {
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
                  label="Employee Name"
                  error={!!errors.employeeName}
                  helperText={errors.employeeName?.message}
                  {...register('employeeName')}
                  fullWidth
                />
                <TextField
                  size="small"
                  label="Date"
                  type="date"
                  error={!!errors.date}
                  helperText={errors.date?.message}
                  {...register('date')}
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
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
                  <MenuItem value="present">Present</MenuItem>
                  <MenuItem value="absent">Absent</MenuItem>
                  <MenuItem value="late">Late</MenuItem>
                  <MenuItem value="leave">Leave</MenuItem>
                </TextField>
                <TextField
                  size="small"
                  label="Check-in Time"
                  type="time"
                  error={!!errors.checkInTime}
                  helperText={errors.checkInTime?.message}
                  {...register('checkInTime')}
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  size="small"
                  label="Check-out Time"
                  type="time"
                  error={!!errors.checkOutTime}
                  helperText={errors.checkOutTime?.message}
                  {...register('checkOutTime')}
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  size="small"
                  label="Notes"
                  error={!!errors.notes}
                  helperText={errors.notes?.message}
                  {...register('notes')}
                  fullWidth
                  multiline
                  rows={3}
                />

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
