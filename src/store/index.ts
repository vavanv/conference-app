import { configureStore } from '@reduxjs/toolkit';
import organizationsReducer from './slices/organizationsSlice';
import eventsReducer from './slices/eventsSlice';
import speakersReducer from './slices/speakersSlice';
import contactsReducer from './slices/contactsSlice';
import authReducer from './slices/authSlice';
import accountReducer from './slices/accountSlice';

export const store = configureStore({
  reducer: {
    organizations: organizationsReducer,
    events: eventsReducer,
    speakers: speakersReducer,
    contacts: contactsReducer,
    auth: authReducer,
    account: accountReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
