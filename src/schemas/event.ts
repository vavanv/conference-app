import * as yup from 'yup';

export const eventSchema = yup.object({
  name: yup.string()
    .required('Event name is required')
    .min(2, 'Event name must be at least 2 characters'),
  description: yup.string()
    .required('Description is required')
    .min(10, 'Description must be at least 10 characters'),
  startDate: yup.string()
    .required('Start date is required'),
  endDate: yup.string()
    .required('End date is required')
    .test(
      'is-after-start',
      'End date must be after start date',
      function(value) {
        return new Date(value) > new Date(this.parent.startDate);
      }
    ),
  location: yup.string()
    .required('Location is required'),
  organizer: yup.string()
    .required('Organizer is required'),
  status: yup.string()
    .oneOf(['scheduled', 'ongoing', 'completed', 'cancelled'], 'Invalid status')
    .required('Status is required')
});
