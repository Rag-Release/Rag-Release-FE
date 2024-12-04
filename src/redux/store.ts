import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import authReducer from "./features/authSlice";
import { TypedUseSelectorHook, useSelector } from "react-redux";

// Configure persist
const persistConfig = {
  key: "root",
  storage,
  // Optionally, you can add a whitelist or blacklist here
  // whitelist: ['authReducer'], // Only persist authReducer
  // blacklist: [] // Do not persist these reducers
};

const persistedReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    authReducer: persistedReducer,
  },
  //   middleware: (getDefaultMiddleware) =>
  //     getDefaultMiddleware({
  //       serializableCheck: false, // Disable serializability checks temporarily
  //     }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
