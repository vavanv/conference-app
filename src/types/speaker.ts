export interface Speaker {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  organization: string;
  status: 'active' | 'inactive';
}

export interface SpeakerFormData extends Omit<Speaker, 'id'> {}
