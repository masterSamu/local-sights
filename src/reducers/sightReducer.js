import { createSlice } from "@reduxjs/toolkit";

const sightSlice = createSlice({
  name: "sights",
  initialState: [],
  reducers: {
    setSights(state, action) {
      return action.payload;
    },
    setSight(state, action) {
      const updatedSight = action.payload;
      return state.map((sight) =>
        sight.id !== updatedSight.id ? sight : updatedSight
      );
    },
    appendSights(state, action) {
      state.push(action.payload);
    },
  },
});

export const { setSights, setSight, appendSights } = sightSlice.actions;

export const initializeSights = (sights) => {
  return async (dispatch) => {
    dispatch(setSights(sights));
  };
};

export const createSight = (sight) => {
  return async (dispatch) => {
    dispatch(appendSights(sight));
  };
};

export const updateSight = (sight) => {
  return (dispatch) => {
    dispatch(setSight(sight));
  };
};

export default sightSlice.reducer;
