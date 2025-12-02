import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ProductResponseType } from "@repo/types";

const initialState = {};

export const variantSlice = createSlice({
  name: "variantSlice",
  initialState,
  reducers: {
    setVariant: (state, action: PayloadAction<ProductResponseType>) => {
      return action.payload;
    },
  },
});

export const { setVariant } = variantSlice.actions;

export default variantSlice.reducer;
