import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Employee, EmployeeFormData } from '../../types/employee';
import { generateInitialEmployees } from '../../utils/employeesData';

interface EmployeesState {
  items: Employee[];
  loading: boolean;
  error: string | null;
}

const initialState: EmployeesState = {
  items: generateInitialEmployees(),
  loading: false,
  error: null,
};

const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    addEmployee: (state, action: PayloadAction<EmployeeFormData>) => {
      state.items.push({
        id: crypto.randomUUID(),
        ...action.payload,
      });
    },
    updateEmployee: (state, action: PayloadAction<{ id: string; data: EmployeeFormData }>) => {
      const index = state.items.findIndex(emp => emp.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload.data };
      }
    },
    deleteEmployee: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(emp => emp.id !== action.payload);
    },
  },
});

export const { addEmployee, updateEmployee, deleteEmployee } = employeesSlice.actions;
export default employeesSlice.reducer;