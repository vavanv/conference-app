import { Attendance } from '../types/attendance';

const eventIds = Array.from({ length: 50 }, (_, i) => `event-${i + 1}`);
const attendeeIds = Array.from({ length: 200 }, (_, i) => `attendee-${i + 1}`);

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function generateCheckInTime(): string {
  const start = new Date(2023, 0, 1);
  const end = new Date(2023, 11, 31);
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toISOString();
}

export function generateInitialAttendance(): Attendance[] {
  const attendance: Attendance[] = [];
  
  for (let i = 0; i < 500; i++) {
    attendance.push({
      id: crypto.randomUUID(),
      eventId: getRandomElement(eventIds),
      attendeeId: getRandomElement(attendeeIds),
      checkInTime: generateCheckInTime(),
      status: Math.random() > 0.8 ? 'absent' : (Math.random() > 0.5 ? 'present' : 'late')
    });
  }
  
  return attendance;
}
