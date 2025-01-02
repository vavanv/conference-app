import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Contact, ContactFormData } from '../../types/contact';
import { generateInitialContacts } from '../../utils/contactsData';

interface ContactsState {
  items: Contact[];
  loading: boolean;
  error: string | null;
}

const initialState: ContactsState = {
  items: generateInitialContacts(),
  loading: false,
  error: null,
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact: (state, action: PayloadAction<ContactFormData>) => {
      state.items.push({
        id: crypto.randomUUID(),
        ...action.payload,
      });
    },
    updateContact: (state, action: PayloadAction<{ id: string; data: ContactFormData }>) => {
      const index = state.items.findIndex(contact => contact.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload.data };
      }
    },
    deleteContact: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(contact => contact.id !== action.payload);
    },
  },
});

export const { addContact, updateContact, deleteContact } = contactsSlice.actions;
export default contactsSlice.reducer;