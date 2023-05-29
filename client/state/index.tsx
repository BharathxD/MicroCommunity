import { configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import { authReducer } from "./auth";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

// Create a storage object that acts as a mock when running in a non-browser environment
const createNoopStorage = () => {
  return {
    getItem(_key: string) {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: string) {
      return Promise.resolve();
    },
  };
};

// Determine the appropriate storage to use based on the environment (browser or non-browser)
const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

// Configuration object for persisting the Redux state
const persistConfig = { key: "root", storage, version: 1 };

// Create a persisted reducer by wrapping the authReducer with the persistReducer function
const persistedReducer = persistReducer(persistConfig, authReducer);

// Create the Redux store with the persisted reducer and middleware
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // Configure the serializableCheck middleware to ignore certain actions
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;
