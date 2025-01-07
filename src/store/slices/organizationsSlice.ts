import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Organization, OrganizationFormData } from '../../types/organization';
import { generateInitialOrganizations } from '../../utils/organizationsData';

interface OrganizationsState {
  items: Organization[];
  loading: boolean;
  error: string | null;
}

const initialState: OrganizationsState = {
  items: generateInitialOrganizations(),
  loading: false,
  error: null,
};

const organizationsSlice = createSlice({
  name: 'organizations',
  initialState,
  reducers: {
    addOrganization: (state, action: PayloadAction<OrganizationFormData>) => {
      state.items.push({
        id: crypto.randomUUID(),
        ...action.payload,
      });
    },
    updateOrganization: (state, action: PayloadAction<{ id: string; data: OrganizationFormData }>) => {
      const index = state.items.findIndex(org => org.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload.data };
      }
    },
    deleteOrganization: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(org => org.id !== action.payload);
    },
  },
});

export const { addOrganization, updateOrganization, deleteOrganization } = organizationsSlice.actions;
export default organizationsSlice.reducer;
