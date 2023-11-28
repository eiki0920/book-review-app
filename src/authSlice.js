import { createSlice } from "@reduxjs/toolkit";
import { Cookies } from "react-cookie";

const cookie = new Cookies();

const initialState = {
  isSignIn: cookie.get("token") !== undefined,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn: (state) => {
      const mode = state;
      mode.isSignIn = true;
    },
    signOut: (state) => {
      const mode = state;
      mode.isSignIn = false;
    },
  },
});

export const { signIn, signOut } = authSlice.actions;
