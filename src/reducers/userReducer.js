import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";

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

export const loginUser = (email, password) => {
  return async (dispatch) => {
    try {
      const loggedUser = await loginService.login(email, password);
      console.log("red: ", loggedUser);
      if (loggedUser) {
        window.localStorage.setItem(
          "loggedLocalSightUser",
          JSON.stringify(loggedUser)
        );
        dispatch(setUser(loggedUser));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const setUser = (user) => {
  return (dispatch) => {
    dispatch(setUserReducer(user));
  };
};
