import { configureStore } from "@reduxjs/toolkit";
import sightReducer from "./reducers/sightReducer";
import userReducer from "./reducers/userReducer";
import notificationReducer from "./reducers/notificationReducer";

const store = configureStore({
  reducer: {
    sights: sightReducer,
    user: userReducer,
    notifications: notificationReducer,
  },
});

export default store;
