export interface Company {
  id: string;
  name: string;
  industry: string;
  size: string;
  location: string;
  website: string;
  status: 'active' | 'inactive';
}

export interface CompanyFormData extends Omit<Company, 'id'> {}
