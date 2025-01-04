import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { LoginFormData } from '../types/auth';

export function useLogin() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const login = async (data: LoginFormData) => {
    try {
      setError(null);
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, always succeed
      console.log('Login successful:', data);
      navigate('/');
      
    } catch (err) {
      setError('An error occurred during login. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return { login, error, isLoading };
}
