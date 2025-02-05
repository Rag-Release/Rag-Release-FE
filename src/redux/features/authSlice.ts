import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "./authTypes";

interface AuthState {
  token: string | null;
  user: User | null;
  isSignedIn: boolean;
}

const initialState: AuthState = {
  token: null,
  user: null,
  isSignedIn: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isSignedIn = true;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    signOut: (state) => {
      state.token = null;
      state.user = null;
      state.isSignedIn = false;
    },
  },
});

export const { setToken, setUser, signOut } = authSlice.actions;
export default authSlice.reducer;
