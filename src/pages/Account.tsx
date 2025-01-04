import React from 'react';
import { Box, Typography, TextField, Button, Stack, InputAdornment, IconButton } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { accountSchema, AccountFormData } from '../schemas/account';
import { Eye, EyeOff } from 'lucide-react';

export default function Account() {
  const [showPassword, setShowPassword] = React.useState(false);
  const { control, handleSubmit, formState: { errors } } = useForm<AccountFormData>({
    resolver: yupResolver(accountSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      username: '',
      password: ''
    }
  });

  const onSubmit = (data: AccountFormData) => {
    console.log('Form data:', data);
    // Add your form submission logic here
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Account Settings
      </Typography>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="First Name"
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
                fullWidth
                size="small"
              />
            )}
          />

          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Last Name"
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
                fullWidth
                size="small"
              />
            )}
          />

          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Username"
                error={!!errors.username}
                helperText={errors.username?.message}
                fullWidth
                size="small"
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type={showPassword ? 'text' : 'password'}
                label="Password"
                error={!!errors.password}
                helperText={errors.password?.message}
                fullWidth
                size="small"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        size="small"
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            )}
          />

          <Button 
            type="submit" 
            variant="contained" 
            size="large"
            sx={{ mt: 2 }}
          >
            Save Changes
          </Button>
        </Stack>
      </form>
    </Box>
  );
}
