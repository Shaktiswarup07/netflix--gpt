import { createSlice } from "@reduxjs/toolkit";

const languageSlice = createSlice({
  name: "lang",
  initialState: {
    language: "en",
  },
  reducers: {
    changePageLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
});

export default languageSlice.reducer;
export const { changePageLanguage } = languageSlice.actions;
