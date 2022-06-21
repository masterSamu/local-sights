import { createSlice } from "@reduxjs/toolkit";

const sightSlice = createSlice({
  name: "sights",
  initialState: [],
  reducers: {
    setSightsReducer(state, action) {
      return action.payload;
    },
  },
});

export const { setSightsReducer } = sightSlice.actions;

export const initializeSights = (sights) => {
    return async (dispatch) => {
        dispatch(setSightsReducer(sights));
    }
}

export default sightSlice.reducer;
