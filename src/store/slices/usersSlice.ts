import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, UserFormData } from '../../types/user';
import { generateInitialUsers } from '../../utils/usersData';

interface UsersState {
  items: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  items: generateInitialUsers(),
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<UserFormData>) => {
      state.items.push({
        id: crypto.randomUUID(),
        ...action.payload,
      });
    },
    updateUser: (state, action: PayloadAction<{ id: string; data: UserFormData }>) => {
      const index = state.items.findIndex(user => user.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload.data };
      }
    },
    deleteUser: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(user => user.id !== action.payload);
    },
  },
});

export const { addUser, updateUser, deleteUser } = usersSlice.actions;
export default usersSlice.reducer;
