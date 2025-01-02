import { Contact } from '../types/contact';

const firstNames = [
  'John', 'Emma', 'Michael', 'Sarah', 'James', 'Lisa', 'David', 'Rachel',
  'Kevin', 'Maria', 'Thomas', 'Anna', 'Robert', 'Sophie', 'Daniel', 'Emily',
  'William', 'Olivia', 'Henry', 'Ava', 'Charles', 'Isabella', 'Joseph', 'Mia',
  'Christopher', 'Charlotte', 'Andrew', 'Amelia', 'Matthew', 'Harper'
];

const lastNames = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
  'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson',
  'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Thompson', 'White',
  'Harris', 'Clark', 'Lewis', 'Robinson', 'Walker', 'Young', 'Allen'
];

const companies = [
  'Tech Innovators',
  'Digital Solutions Inc.',
  'Cloud Systems Corp',
  'Data Dynamics',
  'Future Software Ltd.',
  'Smart Analytics',
  'Web Wizards',
  'Mobile Masters',
  'AI Solutions',
  'Cyber Security Pro',
  'Quantum Computing Co.',
  'DevOps Experts',
  'Blockchain Ventures',
  'IoT Innovations',
  'ML Research Labs'
];

const roles = [
  'Software Engineer',
  'Product Manager',
  'UX Designer',
  'Data Scientist',
  'DevOps Engineer',
  'Project Manager',
  'Business Analyst',
  'Marketing Manager',
  'Sales Director',
  'Technical Lead',
  'Cloud Architect',
  'Security Engineer',
  'Full Stack Developer',
  'ML Engineer',
  'QA Engineer'
];

const domains = [
  'company.com',
  'tech.co',
  'systems.io',
  'solutions.net',
  'corp.com',
  'group.com',
  'enterprise.com',
  'digital.io',
  'labs.co',
  'innovations.com'
];

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function generateEmail(firstName: string, lastName: string): string {
  const emailFormats = [
    () => `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${getRandomElement(domains)}`,
    () => `${firstName.toLowerCase()[0]}${lastName.toLowerCase()}@${getRandomElement(domains)}`,
    () => `${firstName.toLowerCase()}${lastName.toLowerCase()[0]}@${getRandomElement(domains)}`,
    () => `${lastName.toLowerCase()}.${firstName.toLowerCase()}@${getRandomElement(domains)}`
  ];
  return getRandomElement(emailFormats)();
}

function generatePhone(): string {
  const formats = [
    '+1 (###) ###-####',
    '+1-###-###-####',
    '(###) ###-####',
    '###-###-####'
  ];
  
  return getRandomElement(formats).replace(/#/g, () => 
    Math.floor(Math.random() * 10).toString()
  );
}

function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function generateInitialContacts(): Contact[] {
  const contacts: Contact[] = [];
  
  // Generate 123 unique contacts
  for (let i = 0; i < 123; i++) {
    const firstName = getRandomElement(firstNames);
    const lastName = getRandomElement(lastNames);
    const company = getRandomElement(companies);
    
    contacts.push({
      id: crypto.randomUUID(),
      firstName,
      lastName,
      email: generateEmail(firstName, lastName),
      phone: generatePhone(),
      company,
      role: getRandomElement(roles),
      status: Math.random() > 0.2 ? 'active' : 'inactive' // 80% active, 20% inactive
    });
  }
  
  // Shuffle the array to randomize the order
  return shuffleArray(contacts);
}