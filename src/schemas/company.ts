import * as yup from 'yup';

export const companySchema = yup.object({
  name: yup.string()
    .required('Company name is required')
    .min(2, 'Company name must be at least 2 characters'),
  industry: yup.string()
    .required('Industry is required'),
  size: yup.string()
    .required('Company size is required'),
  location: yup.string()
    .required('Location is required'),
  website: yup.string()
    .required('Website is required')
    .url('Invalid website URL'),
  status: yup.string()
    .oneOf(['active', 'inactive'], 'Invalid status')
    .required('Status is required')
});
