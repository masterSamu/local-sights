import { createSlice } from "@reduxjs/toolkit";

const sightSlice = createSlice({
  name: "sights",
  initialState: [],
  reducers: {
    setSightsReducer(state, action) {
      return action.payload;
    },
    setSightReducer(state, action) {
      const updatedSight = action.payload;
      return state.map((sight) =>
        sight.id !== updatedSight.id ? sight : updatedSight
      );
    },
  },
});

export const { setSightsReducer, setSightReducer } = sightSlice.actions;

export const initializeSights = (sights) => {
  return async (dispatch) => {
    dispatch(setSightsReducer(sights));
  };
};

export const updateSight = (sight) => {
    return (dispatch) => {
        dispatch(setSightReducer(sight));
    }
}

export default sightSlice.reducer;
