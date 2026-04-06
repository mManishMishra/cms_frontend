import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice'; // Import your auth slice

// Combine reducers for all your slices
const rootReducer = combineReducers({
  auth: authReducer,
});

// Configure and create the Redux store with no persistence
export const store = configureStore({
  reducer: rootReducer, // Use the root reducer without persistence
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check if needed
    }),
});

// Type definitions for RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
