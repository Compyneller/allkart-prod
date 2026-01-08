import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { CartProductType } from "@repo/types";


const initialState: CartProductType[] = [];

export const guestCartSlice = createSlice({
    name: "guest_cart",
    initialState,
    reducers: {
        // Set the entire cart (useful for initialization)
        setCart: (state, action: PayloadAction<CartProductType[]>) => {
            return action.payload;
        },
        // Add or increment item in cart
        addToCart: (state, action: PayloadAction<CartProductType>) => {
            const existingItemIndex = state.findIndex(
                (item) =>
                    item.productId === action.payload.productId &&
                    item.variantId === action.payload.variantId
            );

            if (existingItemIndex !== -1 && state[existingItemIndex]) {
                state[existingItemIndex].quantity = (state[existingItemIndex].quantity || 0) + (action.payload.quantity || 1);
            } else {
                state.push(action.payload);
            }
        },
        // Decrement or remove item from cart
        decrementCart: (state, action: PayloadAction<{ productId: number; variantId: string }>) => {
            const existingItemIndex = state.findIndex(
                (item) =>
                    item.productId === action.payload.productId &&
                    item.variantId === action.payload.variantId
            );

            if (existingItemIndex !== -1 && state[existingItemIndex]) {
                if ((state[existingItemIndex].quantity || 0) > 1) {
                    state[existingItemIndex].quantity = (state[existingItemIndex].quantity || 0) - 1;
                } else {
                    state.splice(existingItemIndex, 1);
                }
            }
        },
        // Clear cart
        clearCart: () => {
            return [];
        },
    },
});

export const { setCart, addToCart, decrementCart, clearCart } = guestCartSlice.actions;

export default guestCartSlice.reducer;
