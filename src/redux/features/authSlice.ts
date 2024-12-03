import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the user state
interface User {
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  role: string | null;
  id: string | null;
  isEmailVerified: boolean | null;
  isActive: boolean | null;
  createdAt: string | null;
  updatedAt: string | null;
  homeAddress: string | null;
  deliveryAddress: string | null;
  phoneNumber: string | null;
  pickupPoint: string | null;
  company: string | null;
  fiscalCode: string | null;
  cardNumber: string | null;
  cardExpiry: string | null;
}

// Define a type for the slice state
interface AuthState {
  token: string | null;
  user: User | null;
  isSignedIn: boolean;
}

// Define the initial state using that type
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
