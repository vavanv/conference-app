import React, { useEffect } from 'react';
import { Box, Typography, TextField, Button, Stack, InputAdornment, IconButton, MenuItem } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { accountSchema, AccountFormData } from '../schemas/account';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { updateAccount } from '../store/slices/accountSlice';
import { Eye, EyeOff } from 'lucide-react';

export default function Account() {
  const [showPassword, setShowPassword] = React.useState(false);
  const dispatch = useAppDispatch();
  const account = useAppSelector(state => state.account);
  
  const { control, handleSubmit, formState: { errors }, reset } = useForm<AccountFormData>({
    resolver: yupResolver(accountSchema),
    defaultValues: account
  });

  useEffect(() => {
    reset(account);
  }, [account, reset]);

  const onSubmit = (data: AccountFormData) => {
    dispatch(updateAccount(data));
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Account Settings
      </Typography>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          {/* ... existing form fields ... */}
        </Stack>
      </form>
    </Box>
  );
}
