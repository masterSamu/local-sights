import { createSlice } from "@reduxjs/toolkit";

/**
 * Set state for sight order or filtering.
 */
const sightStateSlice = createSlice({
  name: "sightState",
  initialState: "byPositiveLikes",
  reducers: {
   setState(state, action) {
    return action.payload;
   },
   clearState(state, action) {
    return "";
   }
  },
});

export const {setState, clearState } = sightStateSlice.actions;

export const setSightState = (state) => {
  return async (dispatch) => {
    dispatch(setState(state));
  };
};

export const clearSightState = () => {
  return async (dispatch) => {
    dispatch(clearState);
  };
};



export default sightStateSlice.reducer;
