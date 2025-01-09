import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import accountReducer from "./slices/accountSlice";
import eventsReducer from "./slices/eventsSlice";
import attendanceReducer from "./slices/attendanceSlice";
import presentersReducer from "./slices/presentersSlice";
import organizationsReducer from "./slices/organizationsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    account: accountReducer,
    events: eventsReducer,
    attendance: attendanceReducer,
    presenters: presentersReducer,
    organizations: organizationsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
