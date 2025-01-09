import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Event, EventFormData } from '../../types/event';

interface EventsState {
  items: Event[];
  loading: boolean;
  error: string | null;
}

const initialState: EventsState = {
  items: [],
  loading: false,
  error: null,
};

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    addEvent: (state, action: PayloadAction<EventFormData>) => {
      state.items.push({
        id: crypto.randomUUID(),
        ...action.payload,
      });
    },
    updateEvent: (state, action: PayloadAction<{ id: string; data: EventFormData }>) => {
      const index = state.items.findIndex(event => event.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload.data };
      }
    },
    deleteEvent: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(event => event.id !== action.payload);
    },
    setOrganizationEvents: (state, action: PayloadAction<{ organizationId: string; events: Event[] }>) => {
      // Remove existing events for this organization
      state.items = state.items.filter(event => event.organizationId !== action.payload.organizationId);
      // Add new events
      state.items.push(...action.payload.events);
    }
  },
});

export const { addEvent, updateEvent, deleteEvent, setOrganizationEvents } = eventsSlice.actions;
export default eventsSlice.reducer;
