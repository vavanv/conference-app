import { Event } from '../types/event';

const eventNames = [
  'Tech Conference 2023',
  'AI Summit',
  'Cloud Computing Expo',
  'Data Science Workshop',
  'Blockchain Forum',
  'DevOps Days',
  'Cybersecurity Symposium',
  'Mobile Development Conference',
  'UX Design Summit',
  'Product Management Workshop'
];

const locations = ['New York', 'San Francisco', 'Chicago', 'Boston', 'Seattle'];

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function generateDate(): string {
  const start = new Date(2023, 0, 1);
  const end = new Date(2023, 11, 31);
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toISOString().split('T')[0];
}

export function generateInitialEvents(): Event[] {
  const events: Event[] = [];
  
  for (let i = 0; i < 50; i++) {
    const name = getRandomElement(eventNames);
    const location = getRandomElement(locations);
    
    events.push({
      id: crypto.randomUUID(),
      name: `${name} ${i + 1}`,
      date: generateDate(),
      location,
      organizer: `Organization ${Math.floor(Math.random() * 50) + 1}`,
      status: Math.random() > 0.2 ? 'active' : 'inactive'
    });
  }
  
  return events;
}
