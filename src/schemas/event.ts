import * as yup from 'yup';

export const eventSchema = yup.object({
  name: yup.string()
    .required('Event name is required')
    .min(5, 'Event name must be at least 5 characters'),
  date: yup.string()
    .required('Date is required'),
  location: yup.string()
    .required('Location is required')
    .min(3, 'Location must be at least 3 characters'),
  organizer: yup.string()
    .required('Organizer is required')
    .min(3, 'Organizer must be at least 3 characters'),
  status: yup.string()
    .oneOf(['active', 'inactive'], 'Invalid status')
    .required('Status is required')
});

export type EventFormData = yup.InferType<typeof eventSchema>;
