export interface Organization {
  id: string;
  name: string;
  type: string;
  contactEmail: string;
  phone: string;
  address: string;
  status: 'active' | 'inactive';
  events?: Event[]; // Optional array of events
}

export interface OrganizationFormData extends Omit<Organization, 'id' | 'events'> {}
