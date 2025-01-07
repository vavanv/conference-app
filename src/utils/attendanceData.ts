import { Attendance } from '../types/attendance';
import { generateInitialEmployees } from './employeesData';

const statuses = ['present', 'absent', 'late', 'leave'];
const employees = generateInitialEmployees();

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function generateRandomTime(startHour: number, endHour: number): string {
  const hour = Math.floor(Math.random() * (endHour - startHour)) + startHour;
  const minute = Math.floor(Math.random() * 60);
  return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
}

export function generateInitialAttendance(): Attendance[] {
  const attendance: Attendance[] = [];
  const now = new Date();
  
  for (let i = 0; i < 100; i++) {
    const employee = getRandomElement(employees);
    const status = getRandomElement(statuses);
    
    attendance.push({
      id: crypto.randomUUID(),
      employeeId: employee.id,
      employeeName: `${employee.firstName} ${employee.lastName}`,
      date: new Date(now.getTime() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      status,
      checkInTime: ['present', 'late'].includes(status) ? generateRandomTime(8, 10) : undefined,
      checkOutTime: ['present', 'late'].includes(status) ? generateRandomTime(16, 19) : undefined,
      notes: Math.random() > 0.8 ? 'Additional notes about attendance' : undefined
    });
  }
  
  return attendance;
}
