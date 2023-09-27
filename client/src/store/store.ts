import { configureStore } from '@reduxjs/toolkit';
import userReducer from "../slices/userSlice";
import coverLetterReducer from "../slices/coverLetterSlice";



const store = configureStore({
  reducer: {
        user: userReducer,
        cover: coverLetterReducer,

  },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;

