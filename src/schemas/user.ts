import * as yup from 'yup';
    
    export const userSchema = yup.object({
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
      role: yup.string()
        .required('Role is required')
        .oneOf(['admin', 'presenter', 'attendee'], 'Invalid role'),
      status: yup.string()
        .oneOf(['active', 'inactive'], 'Invalid status')
        .required('Status is required')
    });
    
    export type UserFormData = yup.InferType<typeof userSchema>;
