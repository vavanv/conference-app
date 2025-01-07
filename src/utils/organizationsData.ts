import { Organization } from '../types/organization';

const organizationTypes = ['Corporate', 'Non-Profit', 'Educational', 'Government', 'Startup'];
const cities = ['New York', 'San Francisco', 'Chicago', 'Boston', 'Seattle'];

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function generatePhone(): string {
  return `+1 (${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`;
}

export function generateInitialOrganizations(): Organization[] {
  const organizations: Organization[] = [];
  
  for (let i = 0; i < 50; i++) {
    const name = `Organization ${i + 1}`;
    const type = getRandomElement(organizationTypes);
    const city = getRandomElement(cities);
    
    organizations.push({
      id: crypto.randomUUID(),
      name,
      type,
      contactEmail: `contact@${name.toLowerCase().replace(/ /g, '')}.com`,
      phone: generatePhone(),
      address: `${Math.floor(Math.random() * 1000) + 1} ${city} St, ${city}`,
      status: Math.random() > 0.2 ? 'active' : 'inactive'
    });
  }
  
  return organizations;
}
