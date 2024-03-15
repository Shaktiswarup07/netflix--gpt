import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../utils/userSlice";
import moviesReducer from "../utils/movieSlice";
import gptReducer from "../utils/gptSlice";
import languageReducer from "../utils/languageSlice";
const appStore = configureStore({
  reducer: {
    user: userReducer,
    movies: moviesReducer,
    gpt: gptReducer,
    lang: languageReducer,
  },
});
export default appStore;
