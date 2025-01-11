import * as yup from 'yup';

export const userSchema = yup.object({
  firstName: yup.string()
    .required('First name is required')
    .min(2, 'First name must be at least 2 characters'),
  lastName: yup.string()
    .required('Last name is required')
    .min(2, 'Last name must be at least 2 characters'),
  username: yup.string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters'),
  password: yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    ),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
  email: yup.string()
    .required('Email is required')
    .email('Invalid email format'),
  phone: yup.string()
    .required('Phone is required')
    .matches(/^\+?[\d\s-()]+$/, 'Invalid phone number format'),
  role: yup.string()
    .required('Role is required')
    .oneOf(['admin', 'presenter', 'attendee'], 'Invalid role'),
  status: yup.string()
    .oneOf(['active', 'inactive'], 'Invalid status')
    .required('Status is required')
});

export type UserFormData = yup.InferType<typeof userSchema>;
