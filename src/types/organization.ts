export interface Organization {
  id: string;
  name: string;
  type: string;
  contactEmail: string;
  phone: string;
  address: string;
  status: 'active' | 'inactive';
}

export interface OrganizationFormData extends Omit<Organization, 'id'> {}
