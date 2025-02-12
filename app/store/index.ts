"use client";
import { configureStore } from "@reduxjs/toolkit";
import animationReducer from "./animationSlice"; // Import the animation slice

export const store = configureStore({
  reducer: {
    animation: animationReducer, // Add animation reducer
  },
});

// Types for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
