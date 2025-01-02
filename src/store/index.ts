import { configureStore } from '@reduxjs/toolkit';
import employeesReducer from './slices/employeesSlice';
import contactsReducer from './slices/contactsSlice';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    employees: employeesReducer,
    contacts: contactsReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;