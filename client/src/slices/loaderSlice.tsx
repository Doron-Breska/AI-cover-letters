import { createSlice } from "@reduxjs/toolkit";

interface LoaderState {
  loading: boolean;
}

const initialState: LoaderState = {
  loading: false,
};

const loaderSlice = createSlice({
  name: "loader",
  initialState,
  reducers: {
    toggleLoading: (state) => {
      state.loading = !state.loading;
      console.log(state.loading);
    },
  },
});

export const { toggleLoading } = loaderSlice.actions;

export default loaderSlice.reducer;
