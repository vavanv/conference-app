import React from 'react';
import {
  Drawer,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Stack,
  Slide,
  Fade
} from '@mui/material';
import { X } from 'lucide-react';
import { TableData } from '../../types/table';

interface EditDrawerProps {
  open: boolean;
  record: TableData | null;
  onClose: () => void;
  onSave: (data: TableData) => void;
}

export function EditDrawer({ open, record, onClose, onSave }: EditDrawerProps) {
  const [formData, setFormData] = React.useState<TableData | null>(null);

  React.useEffect(() => {
    setFormData(record);
  }, [record]);

  if (!formData) return null;

  const handleChange = (field: keyof TableData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prev) => 
      prev ? {
        ...prev,
        [field]: field === 'salary' ? Number(e.target.value) : e.target.value
      } : null
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData) {
      onSave(formData);
      onClose();
    }
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
            mb: 3,
            opacity: 1,
            transition: (theme) => theme.transitions.create(['opacity'], {
              duration: theme.transitions.duration.standard,
              delay: theme.transitions.duration.shortest,
            })
          }}>
            <Typography variant="h6">Edit Employee</Typography>
            <IconButton onClick={onClose} size="small">
              <X />
            </IconButton>
          </Box>
          
          <Slide direction="left" in={open} timeout={500}>
            <form onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  size="small"
                  label="Name"
                  value={formData.name}
                  onChange={handleChange('name')}
                  fullWidth
                />
                <TextField
                  size="small"
                  label="Position"
                  value={formData.position}
                  onChange={handleChange('position')}
                  fullWidth
                />
                <TextField
                  size="small"
                  label="Location"
                  value={formData.location}
                  onChange={handleChange('location')}
                  fullWidth
                />
                <TextField
                  size="small"
                  label="Salary"
                  type="number"
                  value={formData.salary}
                  onChange={handleChange('salary')}
                  fullWidth
                  InputProps={{
                    startAdornment: '$'
                  }}
                />
                <Button 
                  variant="contained" 
                  type="submit"
                  fullWidth
                >
                  Save Changes
                </Button>
              </Stack>
            </form>
          </Slide>
        </Box>
      </Fade>
    </Drawer>
  );
}