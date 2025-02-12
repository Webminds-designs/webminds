"use client";
import { createSlice } from "@reduxjs/toolkit";

interface AnimationState {
  isAnimating: boolean;
}

const initialState: AnimationState = {
  isAnimating: false,
};

const animationSlice = createSlice({
  name: "animation",
  initialState,
  reducers: {
    startAnimation: (state) => {
      state.isAnimating = true;
    },
    stopAnimation: (state) => {
      state.isAnimating = false;
    },
  },
});

export const { startAnimation, stopAnimation } = animationSlice.actions;
export default animationSlice.reducer;
