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

// Mockup data for testing
export const mockEvents: Event[] = [
  {
    id: 'event-001',
    organizationId: 'org-001',
    name: 'Tech Innovators Summit',
    description: 'Annual gathering of technology leaders and innovators',
    startDate: '2024-03-15T09:00:00Z',
    endDate: '2024-03-17T18:00:00Z',
    locations: ['Main Hall', 'Conference Room A'],
    organizer: 'Tech Innovators Inc.',
    status: 'scheduled'
  },
  {
    id: 'event-002',
    organizationId: 'org-002',
    name: 'Digital Marketing Conference',
    description: 'Learn the latest trends in digital marketing',
    startDate: '2024-04-10T10:00:00Z',
    endDate: '2024-04-11T17:00:00Z',
    locations: ['Auditorium'],
    organizer: 'Global Marketing Association',
    status: 'scheduled'
  },
  {
    id: 'event-003',
    organizationId: 'org-003',
    name: 'AI & Machine Learning Workshop',
    description: 'Hands-on workshop on AI and ML technologies',
    startDate: '2024-05-20T13:00:00Z',
    endDate: '2024-05-21T16:00:00Z',
    locations: ['Workshop Room 1', 'Workshop Room 2'],
    organizer: 'AI Pioneers',
    status: 'scheduled'
  },
  {
    id: 'event-004',
    organizationId: 'org-004',
    name: 'Cybersecurity Symposium',
    description: 'Exploring the latest in cybersecurity threats and solutions',
    startDate: '2024-06-05T08:30:00Z',
    endDate: '2024-06-07T17:00:00Z',
    locations: ['Keynote Hall', 'Panel Discussion Room'],
    organizer: 'Cyber Shield',
    status: 'scheduled'
  }
];
