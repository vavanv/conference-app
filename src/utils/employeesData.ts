import { Employee } from '../types/employee';

const firstNames = [
  'John', 'Emma', 'Michael', 'Sarah', 'James', 'Lisa', 'David', 'Rachel',
  'Kevin', 'Maria', 'Thomas', 'Anna', 'Robert', 'Sophie', 'Daniel', 'Emily'
];

const lastNames = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
  'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson'
];

const departments = [
  'Engineering',
  'Product',
  'Design',
  'Marketing',
  'Sales',
  'HR',
  'Finance',
  'Operations',
  'Customer Support',
  'Research'
];

const positions = [
  'Software Engineer',
  'Product Manager',
  'UX Designer',
  'Marketing Manager',
  'Sales Representative',
  'HR Manager',
  'Financial Analyst',
  'Operations Manager',
  'Support Specialist',
  'Research Scientist'
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

function generateEmail(firstName: string, lastName: string): string {
  return `${firstName.toLowerCase()}.${lastName.toLowerCase()}@company.com`;
}

export function generateInitialEmployees(): Employee[] {
  const employees: Employee[] = [];
  
  for (let i = 0; i < 50; i++) {
    const firstName = getRandomElement(firstNames);
    const lastName = getRandomElement(lastNames);
    
    employees.push({
      id: crypto.randomUUID(),
      firstName,
      lastName,
      email: generateEmail(firstName, lastName),
      department: getRandomElement(departments),
      position: getRandomElement(positions),
      location: getRandomElement(locations),
      status: Math.random() > 0.2 ? 'active' : 'inactive'
    });
  }
  
  return employees;
}