import { Company } from '../types/company';

const industries = [
  'Technology',
  'Finance',
  'Healthcare',
  'Manufacturing',
  'Retail',
  'Education',
  'Energy',
  'Transportation',
  'Media',
  'Telecommunications'
];

const sizes = [
  '1-10',
  '11-50',
  '51-200',
  '201-500',
  '501-1000',
  '1001-5000',
  '5001+'
];

const locations = [
  'New York',
  'San Francisco',
  'London',
  'Berlin',
  'Tokyo',
  'Singapore',
  'Sydney',
  'Toronto',
  'Paris',
  'Amsterdam'
];

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function generateWebsite(name: string): string {
  const domain = name.toLowerCase().replace(/\s+/g, '');
  return `https://www.${domain}.com`;
}

export function generateInitialCompanies(): Company[] {
  const companies: Company[] = [];
  
  for (let i = 0; i < 50; i++) {
    const name = `Company ${i + 1}`;
    
    companies.push({
      id: crypto.randomUUID(),
      name,
      industry: getRandomElement(industries),
      size: getRandomElement(sizes),
      location: getRandomElement(locations),
      website: generateWebsite(name),
      status: Math.random() > 0.2 ? 'active' : 'inactive'
    });
  }
  
  return companies;
}
