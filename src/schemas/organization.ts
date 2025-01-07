import * as yup from 'yup';

export const organizationSchema = yup.object({
  name: yup.string()
    .required('Organization name is required')
    .min(3, 'Organization name must be at least 3 characters'),
  type: yup.string()
    .required('Type is required')
    .oneOf(['Corporate', 'Non-Profit', 'Educational', 'Government', 'Startup'], 'Invalid organization type'),
  contactEmail: yup.string()
    .required('Contact email is required')
    .email('Invalid email format'),
  phone: yup.string()
    .required('Phone is required')
    .matches(/^\+?[\d\s-()]+$/, 'Invalid phone number format'),
  address: yup.string()
    .required('Address is required')
    .min(5, 'Address must be at least 5 characters'),
  status: yup.string()
    .oneOf(['active', 'inactive'], 'Invalid status')
    .required('Status is required')
});

export type OrganizationFormData = yup.InferType<typeof organizationSchema>;
