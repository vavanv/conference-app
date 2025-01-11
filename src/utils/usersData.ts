
    import { User } from '../types/user';
    
    const firstNames = ['John', 'Emma', 'Michael', 'Sarah', 'James', 'Lisa', 'David', 'Rachel'];
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis'];
    const roles = ['admin', 'presenter', 'attendee'];
    
    function getRandomElement<T>(array: T[]): T {
      return array[Math.floor(Math.random() * array.length)];
    }
    
    function generateEmail(firstName: string, lastName: string): string {
      return `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`;
    }
    
    function generatePhone(): string {
      return `+1 (${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`;
    }
    
    export function generateInitialUsers(): User[] {
      const users: User[] = [];
      
      