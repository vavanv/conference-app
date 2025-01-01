import { Contact } from '../types/contact';

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
  'Cyber Security Pro'
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
  'Technical Lead'
];

export const generateInitialContacts = (): Contact[] => [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@techinnovators.com',
    phone: '+1 (555) 123-4567',
    company: 'Tech Innovators',
    role: 'Software Engineer',
    status: 'active'
  },
  {
    id: '2',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@digitalsolutions.com',
    phone: '+1 (555) 987-6543',
    company: 'Digital Solutions Inc.',
    role: 'Product Manager',
    status: 'active'
  },
  {
    id: '3',
    firstName: 'Michael',
    lastName: 'Johnson',
    email: 'm.johnson@cloudsystems.com',
    phone: '+1 (555) 234-5678',
    company: 'Cloud Systems Corp',
    role: 'DevOps Engineer',
    status: 'active'
  },
  {
    id: '4',
    firstName: 'Emily',
    lastName: 'Brown',
    email: 'emily.b@datadynamics.com',
    phone: '+1 (555) 345-6789',
    company: 'Data Dynamics',
    role: 'Data Scientist',
    status: 'active'
  },
  {
    id: '5',
    firstName: 'David',
    lastName: 'Wilson',
    email: 'd.wilson@futuresoftware.com',
    phone: '+1 (555) 456-7890',
    company: 'Future Software Ltd.',
    role: 'Technical Lead',
    status: 'inactive'
  },
  {
    id: '6',
    firstName: 'Sarah',
    lastName: 'Davis',
    email: 'sarah.d@smartanalytics.com',
    phone: '+1 (555) 567-8901',
    company: 'Smart Analytics',
    role: 'Business Analyst',
    status: 'active'
  },
  {
    id: '7',
    firstName: 'James',
    lastName: 'Taylor',
    email: 'j.taylor@webwizards.com',
    phone: '+1 (555) 678-9012',
    company: 'Web Wizards',
    role: 'UX Designer',
    status: 'active'
  },
  {
    id: '8',
    firstName: 'Lisa',
    lastName: 'Anderson',
    email: 'l.anderson@mobilemasters.com',
    phone: '+1 (555) 789-0123',
    company: 'Mobile Masters',
    role: 'Project Manager',
    status: 'active'
  },
  {
    id: '9',
    firstName: 'Robert',
    lastName: 'Martinez',
    email: 'r.martinez@aisolutions.com',
    phone: '+1 (555) 890-1234',
    company: 'AI Solutions',
    role: 'Marketing Manager',
    status: 'inactive'
  },
  {
    id: '10',
    firstName: 'Jennifer',
    lastName: 'Garcia',
    email: 'j.garcia@cybersecurity.com',
    phone: '+1 (555) 901-2345',
    company: 'Cyber Security Pro',
    role: 'Sales Director',
    status: 'active'
  }
];