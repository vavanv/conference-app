import React from 'react';
import { Box, Typography, TextField, Button, Stack, InputAdornment, IconButton } from '@mui/material';
import { useAccount } from '../hooks/useAccount';
import { Eye, EyeOff } from 'lucide-react';

export default function Account() {
  const {
    control,
    errors,
    showPassword,
    handleSubmit,
    onSubmit,
    togglePasswordVisibility
  } = useAccount();

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
                        onClick={togglePasswordVisibility}
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
