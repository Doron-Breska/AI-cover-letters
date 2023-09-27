import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
// import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import store from "../src/store/store";
// import userReducer from "./slices/userSlice.tsx";

// const store = configureStore({
//   reducer: {
//     user: userReducer,
//   },
// });
// export type AppDispatch = typeof store.dispatch;
// export type RootState = ReturnType<typeof store.getState>;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
