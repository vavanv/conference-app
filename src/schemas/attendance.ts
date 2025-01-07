import * as yup from 'yup';

export const attendanceSchema = yup.object({
  eventId: yup.string().required('Event ID is required'),
  attendeeId: yup.string().required('Attendee ID is required'),
  checkInTime: yup.string().required('Check-in time is required'),
  status: yup.string()
    .oneOf(['present', 'absent', 'late'], 'Invalid status')
    .required('Status is required')
});

export type AttendanceFormData = yup.InferType<typeof attendanceSchema>;
