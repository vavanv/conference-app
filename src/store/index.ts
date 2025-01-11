import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import eventsReducer from "./slices/eventsSlice";
import attendanceReducer from "./slices/attendanceSlice";
import presentersReducer from "./slices/presentersSlice";
import organizationsReducer from "./slices/organizationsSlice";
import usersReducer from "./slices/usersSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    events: eventsReducer,
    attendance: attendanceReducer,
    presenters: presentersReducer,
    organizations: organizationsReducer,
    users: usersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
