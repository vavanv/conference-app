import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Presenter, PresenterFormData } from '../../types/presenter';
import { generateInitialPresenters } from '../../utils/presentersData';

interface PresentersState {
  items: Presenter[];
  loading: boolean;
  error: string | null;
}

const initialState: PresentersState = {
  items: generateInitialPresenters(),
  loading: false,
  error: null,
};

const presentersSlice = createSlice({
  name: 'presenters',
  initialState,
  reducers: {
    addPresenter: (state, action: PayloadAction<PresenterFormData>) => {
      state.items.push({
        id: crypto.randomUUID(),
        ...action.payload,
      });
    },
    updatePresenter: (state, action: PayloadAction<{ id: string; data: PresenterFormData }>) => {
      const index = state.items.findIndex(presenter => presenter.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload.data };
      }
    },
    deletePresenter: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(presenter => presenter.id !== action.payload);
    },
  },
});

export const { addPresenter, updatePresenter, deletePresenter } = presentersSlice.actions;
export default presentersSlice.reducer;
