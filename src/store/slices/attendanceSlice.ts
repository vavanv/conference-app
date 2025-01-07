import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Attendance, AttendanceFormData } from '../../types/attendance';
import { generateInitialAttendance } from '../../utils/attendanceData';

interface AttendanceState {
  items: Attendance[];
  loading: boolean;
  error: string | null;
}

const initialState: AttendanceState = {
  items: generateInitialAttendance(),
  loading: false,
  error: null,
};

const attendanceSlice = createSlice({
  name: 'attendance',
  initialState,
  reducers: {
    addAttendance: (state, action: PayloadAction<AttendanceFormData>) => {
      state.items.push({
        id: crypto.randomUUID(),
        ...action.payload,
      });
    },
    updateAttendance: (state, action: PayloadAction<{ id: string; data: AttendanceFormData }>) => {
      const index = state.items.findIndex(attendance => attendance.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload.data };
      }
    },
    deleteAttendance: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(attendance => attendance.id !== action.payload);
    },
  },
});

export const { addAttendance, updateAttendance, deleteAttendance } = attendanceSlice.actions;
export default attendanceSlice.reducer;
