import { configureStore } from '@reduxjs/toolkit';
import employeesReducer from './slices/employeesSlice';
import contactsReducer from './slices/contactsSlice';
import authReducer from './slices/authSlice';
import accountReducer from './slices/accountSlice';
import companiesReducer from './slices/companiesSlice';

export const store = configureStore({
  reducer: {
    employees: employeesReducer,
    contacts: contactsReducer,
    auth: authReducer,
    account: accountReducer,
    companies: companiesReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
