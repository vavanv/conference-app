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

const locations = [
  'New York Convention Center',
  'San Francisco Marriott',
  'London Excel',
  'Berlin Congress Center',
  'Tokyo International Forum',
  'Singapore Expo',
  'Sydney Convention Centre',
  'Toronto Metro Convention Center',
  'Paris Expo Porte de Versailles',
  'Amsterdam RAI'
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

function generateRandomDate(start: Date, end: Date): string {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString();
}

export function generateInitialEvents(): Event[] {
  const events: Event[] = [];
  const now = new Date();
  const futureDate = new Date(now.getFullYear() + 1, now.getMonth(), now.getDate());
  
  for (let i = 0; i < 50; i++) {
    const startDate = generateRandomDate(now, futureDate);
    const endDate = generateRandomDate(new Date(startDate), futureDate);
    
    events.push({
      id: crypto.randomUUID(),
      name: getRandomElement(eventNames),
      description: `Join us for an exciting event about ${getRandomElement(['technology', 'marketing', 'leadership', 'innovation'])}`,
      startDate,
      endDate,
      location: getRandomElement(locations),
      organizer: getRandomElement(organizers),
      status: Math.random() > 0.2 ? 'scheduled' : 'cancelled'
    });
  }
  
  return events;
}
