import { Event } from '../types/event';

const eventNames = [
  'Annual Tech Conference',
  'Marketing Summit',
  'Leadership Workshop',
  'Product Launch Event',
  'Industry Networking Night',
  'Innovation Expo',
  'Digital Transformation Forum',
  'Future of Work Symposium',
  'AI & Machine Learning Conference',
  'Cybersecurity Summit'
];

const allLocations = [
  'Main Hall',
  'Conference Room A',
  'Conference Room B',
  'Auditorium',
  'Exhibition Hall',
  'Workshop Room 1',
  'Workshop Room 2',
  'Networking Lounge',
  'Panel Discussion Room',
  'Keynote Hall'
];

const organizers = [
  'Tech Innovators Inc.',
  'Global Marketing Association',
  'Leadership Academy',
  'Product Visionaries',
  'Industry Connect',
  'Innovation Hub',
  'Digital Futures',
  'Workplace Evolution',
  'AI Pioneers',
  'Cyber Shield'
];

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomLocations(): string[] {
  const count = Math.floor(Math.random() * 3) + 1; // 1-3 locations per event
  const locations = new Set<string>();
  
  while (locations.size < count) {
    locations.add(getRandomElement(allLocations));
  }
  
  return Array.from(locations);
}

function generateRandomDate(start: Date, end: Date): string {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString();
}

export function generateInitialEvents(count: number): Event[] {
  const events: Event[] = [];
  const now = new Date();
  const futureDate = new Date(now.getFullYear() + 1, now.getMonth(), now.getDate());
  
  for (let i = 0; i < count; i++) {
    const startDate = generateRandomDate(now, futureDate);
    const endDate = generateRandomDate(new Date(startDate), futureDate);
    
    events.push({
      id: crypto.randomUUID(),
      organizationId: '', // Will be set by the organization generator
      name: getRandomElement(eventNames),
      description: `Join us for an exciting event about ${getRandomElement(['technology', 'marketing', 'leadership', 'innovation'])}`,
      startDate,
      endDate,
      locations: getRandomLocations(),
      organizer: getRandomElement(organizers),
      status: Math.random() > 0.2 ? 'scheduled' : 'cancelled'
    });
  }
  
  return events;
}
