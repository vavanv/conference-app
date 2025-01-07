export interface Attendance {
  id: string;
  eventId: string;
  attendeeId: string;
  checkInTime: string;
  status: 'present' | 'absent' | 'late';
}

export interface AttendanceFormData extends Omit<Attendance, 'id'> {}
