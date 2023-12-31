import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  user_id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  tech_info: string;
  personal_info: object;
  personal_text: string | null;
  img: string;
}

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  user: null,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
