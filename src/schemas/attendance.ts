import * as yup from 'yup';

export const attendanceSchema = yup.object({
  employeeId: yup.string()
    .required('Employee ID is required'),
  employeeName: yup.string()
    .required('Employee name is required'),
  date: yup.string()
    .required('Date is required'),
  status: yup.string()
    .oneOf(['present', 'absent', 'late', 'leave'], 'Invalid status')
    .required('Status is required'),
  checkInTime: yup.string()
    .when('status', {
      is: (status: string) => ['present', 'late'].includes(status),
      then: (schema) => schema.required('Check-in time is required'),
      otherwise: (schema) => schema.optional()
    }),
  checkOutTime: yup.string()
    .when('status', {
      is: (status: string) => ['present', 'late'].includes(status),
      then: (schema) => schema.required('Check-out time is required'),
      otherwise: (schema) => schema.optional()
    }),
  notes: yup.string()
    .optional()
    .max(500, 'Notes must be less than 500 characters')
});
