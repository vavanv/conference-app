import { Speaker } from '../types/speaker';

const firstNames = ['John', 'Emma', 'Michael', 'Sarah', 'James', 'Lisa', 'David', 'Rachel'];
const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis'];
const organizations = Array.from({ length: 50 }, (_, i) => `Organization ${i + 1}`);

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function generateEmail(firstName: string, lastName: string): string {
  return `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`;
}

function generatePhone(): string {
  return `+1 (${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`;
}

export function generateInitialSpeakers(): Speaker[] {
  const speakers: Speaker[] = [];
  
  for (let i = 0; i < 50; i++) {
    const firstName = getRandomElement(firstNames);
    const lastName = getRandomElement(lastNames);
    
    speakers.push({
      id: crypto.randomUUID(),
      firstName,
      lastName,
      email: generateEmail(firstName, lastName),
      phone: generatePhone(),
      organization: getRandomElement(organizations),
      status: Math.random() > 0.2 ? 'active' : 'inactive'
    });
  }
  
  return speakers;
}
