import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Speaker, SpeakerFormData } from '../../types/speaker';
import { generateInitialSpeakers } from '../../utils/speakersData';

interface SpeakersState {
  items: Speaker[];
  loading: boolean;
  error: string | null;
}

const initialState: SpeakersState = {
  items: generateInitialSpeakers(),
  loading: false,
  error: null,
};

const speakersSlice = createSlice({
  name: 'speakers',
  initialState,
  reducers: {
    addSpeaker: (state, action: PayloadAction<SpeakerFormData>) => {
      state.items.push({
        id: crypto.randomUUID(),
        ...action.payload,
      });
    },
    updateSpeaker: (state, action: PayloadAction<{ id: string; data: SpeakerFormData }>) => {
      const index = state.items.findIndex(speaker => speaker.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload.data };
      }
    },
    deleteSpeaker: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(speaker => speaker.id !== action.payload);
    },
  },
});

export const { addSpeaker, updateSpeaker, deleteSpeaker } = speakersSlice.actions;
export default speakersSlice.reducer;
