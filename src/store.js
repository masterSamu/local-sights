import { configureStore } from "@reduxjs/toolkit";
import sightReducer from "./reducers/sightReducer";
import userReducer from "./reducers/userReducer";
import notificationReducer from "./reducers/notificationReducer";
import sightStateReducer from "./reducers/sightStateReducer";

const store = configureStore({
  reducer: {
    sights: sightReducer,
    sightState: sightStateReducer,
    user: userReducer,
    notifications: notificationReducer,
  },
});

export default store;
