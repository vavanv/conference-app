import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AccountFormData } from '../../types/account';

interface AccountState {
  firstName: string;
  lastName: string;
  username: string;
  accountType: string;
}

const initialState: AccountState = {
  firstName: '',
  lastName: '',
  username: '',
  accountType: 'user'
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    updateAccount: (state, action: PayloadAction<AccountFormData>) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.username = action.payload.username;
      state.accountType = action.payload.accountType;
    },
    resetAccount: (state) => {
      state.firstName = '';
      state.lastName = '';
      state.username = '';
      state.accountType = 'user';
    }
  }
});

export const { updateAccount, resetAccount } = accountSlice.actions;
export default accountSlice.reducer;
