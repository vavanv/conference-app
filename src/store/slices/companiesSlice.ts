import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Company, CompanyFormData } from '../../types/company';
import { generateInitialCompanies } from '../../utils/companiesData';

interface CompaniesState {
  items: Company[];
  loading: boolean;
  error: string | null;
}

const initialState: CompaniesState = {
  items: generateInitialCompanies(),
  loading: false,
  error: null,
};

const companiesSlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {
    addCompany: (state, action: PayloadAction<CompanyFormData>) => {
      state.items.push({
        id: crypto.randomUUID(),
        ...action.payload,
      });
    },
    updateCompany: (state, action: PayloadAction<{ id: string; data: CompanyFormData }>) => {
      const index = state.items.findIndex(company => company.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload.data };
      }
    },
    deleteCompany: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(company => company.id !== action.payload);
    },
  },
});

export const { addCompany, updateCompany, deleteCompany } = companiesSlice.actions;
export default companiesSlice.reducer;
