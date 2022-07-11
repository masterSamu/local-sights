import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notifications",
  initialState: [],
  reducers: {
    initializeNotifications(state, action) {
      return action.payload;
    },
    appendNotification(state, action) {
      state.push(action.payload);
    },
    removeNotification(state, action) {
      const id = action.payload;
      return state.filter((notification) => notification.id !== id);
    },
  },
});

export const {
  initializeNotifications,
  appendNotification,
  removeNotification,
} = notificationSlice.actions;

/**
 * Initialize the state array
 * @param {array} notifications
 */
export const setNotifications = (notifications) => {
  return (dispatch) => {
    dispatch(initializeNotifications(notifications));
  };
};

/**
 * Add notification to notifications state array
 * @param {object} notification
 * @param {string} notification.id
 * @param {string} notification.message
 * @param {"error" | "success" | "info" | "warning"} notification.type
 */
export const createNotification = (notification) => {
  return (dispatch) => {
    dispatch(appendNotification(notification));
  };
};

/**
 * Delete notification from state array with defined id
 * @param {string} id
 */
export const deleteNotification = (id) => {
  return (dispatch) => {
    dispatch(removeNotification(id));
  };
};

export default notificationSlice.reducer;