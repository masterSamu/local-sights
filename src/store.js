import { configureStore } from "@reduxjs/toolkit";
import sightReducer from "./reducers/sightReducer";

const store = configureStore({
  reducer: {
    sights: sightReducer
  },
});

export default store;