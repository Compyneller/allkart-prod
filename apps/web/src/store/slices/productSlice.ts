import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { ProductType, ProductVariant } from "@repo/types";

const newVariantInitialState: ProductVariant = {
  id: "",
  selling_price: 0,
  mrp: 0,
  unit: "",
  unit_value: "",
  stock: 0,
  sku: "",
  prod_img: [{
    id: "", url: "",
    original_filename: "",
    bytes: 0,
    publicId: ""
  }],
};

const initialState: ProductType = {
  id: 0,
  storeId: 0,
  title: "",
  categoryId: "",
  description: "",
  variants: [newVariantInitialState],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProduct: (state, action: PayloadAction<Partial<ProductType>>) => {
      return { ...state, ...action.payload };
    },
    clearProduct: (state) => {
      return initialState;
    },
    clearVariants: (state) => {
      return {
        ...state,
        variants: [],
      };
    },
  },
});

export const { setProduct, clearProduct, clearVariants } = productSlice.actions;

export default productSlice.reducer;
