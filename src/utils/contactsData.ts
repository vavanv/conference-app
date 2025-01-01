import { Contact } from '../types/contact';

export const generateInitialContacts = (): Contact[] => [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    company: 'Tech Corp',
    role: 'Software Engineer',
    status: 'active'
  },
  {
    id: '2',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    phone: '+1 (555) 987-6543',
    company: 'Design Studio',
    role: 'UX Designer',
    status: 'active'
  }
];