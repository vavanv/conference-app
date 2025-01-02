import React from 'react';
import { 
  Typography, 
  TextField, 
  Button, 
  Box,
  InputAdornment,
  IconButton,
  Alert,
  Collapse
} from '@mui/material';
import { Eye, EyeOff } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '../../schemas/login';
import { useLogin } from '../../hooks/useLogin';
import type { LoginFormData } from '../../types/auth';

export default function LoginForm() {
  const [showPassword, setShowPassword] = React.useState(false);
  const { login, error, isLoading } = useLogin();

  const { 
    register, 
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    mode: 'onBlur'
  });

  return (
    <>
      <Typography 
        variant="h6" 
        align="center"
        sx={{ mb: 2 }}
      >
        Sign In
      </Typography>

      <Collapse in={!!error}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      </Collapse>

      <Box 
        component="form" 
        onSubmit={handleSubmit(login)}
        noValidate
      >
        <TextField
          fullWidth
          label="Email"
          error={!!errors.email}
          helperText={errors.email?.message}
          {...register('email')}
          sx={{ mb: 2 }}
        />
        
        <TextField
          fullWidth
          label="Password"
          type={showPassword ? 'text' : 'password'}
          error={!!errors.password}
          helperText={errors.password?.message}
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
            ),
          }}
          {...register('password')}
          sx={{ mb: 3 }}
        />

        <Button
          fullWidth
          variant="contained"
          type="submit"
          disabled={isLoading}
          sx={{ 
            fontSize: '11px',
            py: 1
          }}
        >
          {isLoading ? 'Signing in...' : 'Sign In'}
        </Button>
      </Box>
    </>
  );
}