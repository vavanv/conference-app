export interface Event {
  id: string;
  organizationId: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  locations: string[]; // Changed to array of locations
  organizer: string;
  status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled';
}

export interface EventFormData extends Omit<Event, 'id'> {}
