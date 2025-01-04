import * as yup from 'yup';

export const loginSchema = yup.object({
  email: yup
    .string()
    .required('Email is required')
    .email('Invalid email address'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&#^()_+=[\]{}|\\,./<>:;~-]+$/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    )
});

export type LoginFormData = yup.InferType<typeof loginSchema>;
