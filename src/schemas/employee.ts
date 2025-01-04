import * as yup from 'yup';

export const employeeSchema = yup.object({
  firstName: yup.string()
    .required('First name is required')
    .min(2, 'First name must be at least 2 characters'),
  lastName: yup.string()
    .required('Last name is required')
    .min(2, 'Last name must be at least 2 characters'),
  email: yup.string()
    .required('Email is required')
    .email('Invalid email format'),
  department: yup.string()
    .required('Department is required'),
  position: yup.string()
    .required('Position is required'),
  location: yup.string()
    .required('Location is required'),
  status: yup.string()
    .oneOf(['active', 'inactive'], 'Invalid status')
    .required('Status is required')
});
