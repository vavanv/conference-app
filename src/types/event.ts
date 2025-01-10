export interface Event {
  id: string;
  organizationId: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  organizer: string;
  status: "scheduled" | "ongoing" | "completed" | "cancelled";
}

export interface EventFormData extends Omit<Event, "id"> {}
