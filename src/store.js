import { configureStore } from "@reduxjs/toolkit";
import sightReducer from "./reducers/sightReducer";
import userReducer from "./reducers/userReducer";

const store = configureStore({
  reducer: {
    sights: sightReducer,
    user: userReducer
  },
});

export default store;