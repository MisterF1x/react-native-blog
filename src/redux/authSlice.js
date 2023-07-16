import { createSlice } from "@reduxjs/toolkit";

const initialState = { userInfo: {}, isLoading: false };

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout(state) {
      state.userInfo = initialState;
    },
    signUp(state, { payload }) {
      state.userInfo = payload;
    },
    setUserImg(state, { payload }) {
      state.userInfo.picture = payload;
    },
    setIsLoading(state, { payload }) {
      state.isLoading = payload;
    },
  },
});

export const authReducer = authSlice.reducer;
export const { logout, signUp, setIsLoading, setUserImg } = authSlice.actions;
