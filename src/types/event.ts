export interface Event {
  id: string;
  name: string;
  date: string;
  location: string;
  organizer: string;
  status: 'active' | 'inactive';
}

export interface EventFormData extends Omit<Event, 'id'> {}
