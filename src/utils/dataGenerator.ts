import { TableData } from '../types/table';

const firstNames = ['John', 'Emma', 'Michael', 'Sarah', 'James', 'Lisa', 'David', 'Rachel', 'Kevin', 'Maria', 'Thomas', 'Anna', 'Robert', 'Sophie', 'Daniel', 'Emily', 'William', 'Olivia', 'Henry', 'Ava'];
const lastNames = ['Smith', 'Wilson', 'Brown', 'Davis', 'Johnson', 'Anderson', 'Martinez', 'Chen', 'Patel', 'Garcia', 'Wright', 'Kim', 'Taylor', 'Martin', 'Lee', 'Thompson', 'White', 'Harris', 'Clark', 'Lewis'];
const positions = ['Software Engineer', 'Product Manager', 'UX Designer', 'Data Analyst', 'DevOps Engineer', 'Frontend Developer', 'Backend Developer', 'Full Stack Developer', 'Systems Architect', 'QA Engineer', 'Cloud Engineer', 'Mobile Developer', 'Security Engineer', 'Data Scientist', 'ML Engineer'];
const locations = ['New York', 'San Francisco', 'Chicago', 'Boston', 'Seattle', 'Austin', 'Miami', 'San Diego', 'Denver', 'Portland', 'Atlanta', 'Los Angeles', 'Washington DC', 'Dallas', 'Houston'];

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function generateSalary(): number {
  return Math.floor(Math.random() * (150000 - 70000) + 70000);
}

export function generateEmployeeData(count: number): TableData[] {
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    name: `${getRandomElement(firstNames)} ${getRandomElement(lastNames)}`,
    position: getRandomElement(positions),
    location: getRandomElement(locations),
    salary: generateSalary()
  }));
}