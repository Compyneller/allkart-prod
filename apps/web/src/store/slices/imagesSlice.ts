import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { ProductImage } from "@repo/types";

const initialState: Omit<ProductImage, "storeId">[] = [];

export const imageSlice = createSlice({
  name: "images",
  initialState,
  reducers: {
    setImage: (state, action: PayloadAction<ProductImage>) => {
      return [...state, action.payload];
    },
    deleteImageState: (state, action: PayloadAction<string>) => {
      return state.filter((image) => image.publicId !== action.payload);
    },
    clearImage: (state) => {
      return [];
    },
  },
});

export const { setImage, deleteImageState, clearImage } = imageSlice.actions;

export default imageSlice.reducer;
