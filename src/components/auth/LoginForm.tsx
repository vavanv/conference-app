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
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { loginStart, loginSuccess, loginFailure } from '../../store/slices/authSlice';
import type { LoginFormData } from '../../types/auth';

export function LoginForm() {
  const [showPassword, setShowPassword] = React.useState(false);
  const dispatch = useAppDispatch();
  const { error, loading } = useAppSelector(state => state.auth);
  const navigate = useNavigate();

  const { 
    register, 
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    mode: 'onBlur'
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      dispatch(loginStart());
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      dispatch(loginSuccess(data));
      navigate('/');
    } catch (err) {
      dispatch(loginFailure('An error occurred during login'));
    }
  };

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
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <TextField
          fullWidth
          size="small"
          label="Email"
          error={!!errors.email}
          helperText={errors.email?.message}
          {...register('email')}
          sx={{ mb: 2 }}
        />
        
        <TextField
          fullWidth
          size="small"
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
          disabled={loading}
          sx={{ py: 1 }}
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </Button>
      </Box>
    </>
  );
}