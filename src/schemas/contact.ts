import * as yup from 'yup';

export const contactSchema = yup.object({
  firstName: yup.string()
    .required('First name is required')
    .min(2, 'First name must be at least 2 characters'),
  lastName: yup.string()
    .required('Last name is required')
    .min(2, 'Last name must be at least 2 characters'),
  email: yup.string()
    .required('Email is required')
    .email('Invalid email format'),
  phone: yup.string()
    .required('Phone is required')
    .matches(/^\+?[\d\s-()]+$/, 'Invalid phone number format'),
  company: yup.string()
    .required('Company is required'),
  role: yup.string()
    .required('Role is required'),
  status: yup.string()
    .oneOf(['active', 'inactive'], 'Invalid status')
    .required('Status is required')
});