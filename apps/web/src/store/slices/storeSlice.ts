import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

type StoreState = {
  storeId: number | null;
};

const initialState: StoreState = {
  storeId: null,
};
export const storeSlice = createSlice({
  name: "store",
  initialState,
  reducers: {
    setStore: (state, action: PayloadAction<number>) => {
      // Update the storeId in state
      state.storeId = action.payload;
    },
    clearStore: (state) => {
      state.storeId = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setStore, clearStore } = storeSlice.actions;

export default storeSlice.reducer;
