import * as yup from 'yup';

export const employeeSchema = yup.object({
  name: yup.string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters'),
  position: yup.string()
    .required('Position is required')
    .min(2, 'Position must be at least 2 characters'),
  location: yup.string()
    .required('Location is required'),
  salary: yup.number()
    .required('Salary is required')
    .min(30000, 'Minimum salary is $30,000')
    .max(500000, 'Maximum salary is $500,000')
});

export type EmployeeFormData = yup.InferType<typeof employeeSchema>;