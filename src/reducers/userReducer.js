import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUserReducer(state, action) {
      return action.payload;
    },
  },
});

export default userSlice.reducer;
export const { setUserReducer } = userSlice.actions;

export const setUser = (user) => {
  return (dispatch) => {
    dispatch(setUserReducer(user));
  };
};
