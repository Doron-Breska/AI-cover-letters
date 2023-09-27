import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Cover {
  c_v_id: number;
  content: string;
  company_name: string;
  job_title: string;
  user_id: number;
}

interface CoverState {
  letters: Cover[];
  // isAuthenticated: boolean;
}

const initialState: CoverState = {
  letters: [],
};

const coverLetterSlice = createSlice({
  name: "cover",
  initialState,
  reducers: {
    getLetters: (state, action: PayloadAction<Cover[]>) => {
      state.letters = action.payload;
      // state.isAuthenticated = true;
    },
    removeLetters: (state) => {
      state.letters = [];
      // state.isAuthenticated = false;
    },
  },
});

export const { getLetters, removeLetters } = coverLetterSlice.actions;

export default coverLetterSlice.reducer;
