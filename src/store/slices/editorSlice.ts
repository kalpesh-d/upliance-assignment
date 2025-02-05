import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialContent } from "../../../content";

const STORAGE_KEY = "editorContent";

interface EditorState {
  content: string;
  hasUnsavedChanges: boolean;
}

const initialState: EditorState = {
  content: localStorage.getItem(STORAGE_KEY) || initialContent,
  hasUnsavedChanges: false,
};

export const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    setContent: (state, action: PayloadAction<string>) => {
      state.content = action.payload;
      state.hasUnsavedChanges = true;
    },
    setHasUnsavedChanges: (state, action: PayloadAction<boolean>) => {
      state.hasUnsavedChanges = action.payload;
    },
    saveContent: (state) => {
      localStorage.setItem(STORAGE_KEY, state.content);
      state.hasUnsavedChanges = false;
    },
  },
});

export const { setContent, setHasUnsavedChanges, saveContent } =
  editorSlice.actions;
export default editorSlice.reducer;
