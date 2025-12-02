import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { ProductResponseType } from "@repo/types";

const initialState: ProductResponseType[] = [];

export const productDetailSlice = createSlice({
  name: "productDetail",
  initialState,
  reducers: {
    setProductDetail: (state, action: PayloadAction<ProductResponseType>) => {
      state.push(action.payload);
    },
  },
});

export const { setProductDetail } = productDetailSlice.actions;

export default productDetailSlice.reducer;
