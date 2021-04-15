import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import noteReducer from "./slices/noteSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    note: noteReducer,
  },
});

export { store };
