export interface Attendance {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string;
  status: 'present' | 'absent' | 'late' | 'leave';
  checkInTime?: string;
  checkOutTime?: string;
  notes?: string;
}

export interface AttendanceFormData extends Omit<Attendance, 'id'> {}
