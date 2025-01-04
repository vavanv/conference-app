import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { accountSchema, AccountFormData } from '../schemas/account';

export function useAccount() {
  const [showPassword, setShowPassword] = useState(false);
  
  const { 
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<AccountFormData>({
    resolver: yupResolver(accountSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      username: '',
      password: '',
      accountType: 'user' // Default to user
    }
  });

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const onSubmit = (data: AccountFormData) => {
    console.log('Form data:', data);
    // Add your form submission logic here
    // Example: API call to update account
  };

  return {
    control,
    errors,
    showPassword,
    handleSubmit,
    onSubmit,
    togglePasswordVisibility,
    reset
  };
}
