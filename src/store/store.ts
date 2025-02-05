import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSlice";
import editorReducer from "./slices/editorSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    editor: editorReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
