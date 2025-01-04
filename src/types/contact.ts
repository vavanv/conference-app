export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  role: string;
  status: 'active' | 'inactive';
}

export interface ContactFormData extends Omit<Contact, 'id'> {}
