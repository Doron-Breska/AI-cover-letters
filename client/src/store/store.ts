import { configureStore } from '@reduxjs/toolkit';
import userReducer from "../slices/userSlice";
import coverLetterReducer from "../slices/coverLetterSlice";
import loaderReducer from "../slices/loaderSlice"



const store = configureStore({
  reducer: {
        user: userReducer,
        cover: coverLetterReducer,
        loader: loaderReducer

  },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;

