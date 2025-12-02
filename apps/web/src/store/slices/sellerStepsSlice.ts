import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

type currentType = {
  current: number;
  isLoading: boolean;
};

const initialState: currentType = {
  current: 1,
  isLoading: false,
};

export const sellerSteps = createSlice({
  name: "steps",
  initialState,
  reducers: {
    increment: (state) => {
      state.current += 1;
    },
    decrement: (state) => {
      state.current -= 1;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    reset: (state) => {
      state.current = 1;
    },
  },
});

export const { increment, decrement, setIsLoading, reset } =
  sellerSteps.actions;

export default sellerSteps.reducer;
