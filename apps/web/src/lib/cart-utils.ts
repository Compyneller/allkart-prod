import { CartProductType, ProductVariant } from "@repo/types";
import api from "./axios-instance";
import { authClient } from "./auth-client";
import { store } from "../store/store";
import { addToCart, decrementCart as decrementCartAction } from "../store/slices/cartSlice";



export const handleAddToCart = async ({ stock,
    productId,
    variantId,
    data }: { stock?: number, productId: number, variantId: string, data?: ProductVariant }) => {
    const { data: userData } = await authClient.getSession();
    if (userData) {
        const { data } = await api.post("/api/v1/cart", {
            productId,
            variantId,
        });
        return data;
    } else {
        addToCartGuest({ productId: productId, variantId: variantId, quantity: 1, variant: data! })
        return { message: "Product added to cart" };
    }
};


export const handleDecrementCart = async ({ productId, variantId }: { productId: number, variantId: string }) => {
    const { data: userData } = await authClient.getSession();

    if (userData) {
        const { data } = await api.post("/api/v1/decrement-cart", {
            productId,
            variantId,
        });
        return data;
    } else {
        removeItemFromCartGuest({ productId, variantId })
    }
};




// -------------------------------------for guest user ------------------------------------------------

export const addToCartGuest = ({ productId, variantId, quantity, variant }: { productId: number, variantId: string, quantity: number, variant: ProductVariant }) => {
    // Dispatch Redux action
    store.dispatch(addToCart({ productId, variantId, quantity, variant }));

    // Sync with localStorage
    const currentState = store.getState().guestCart;
    localStorage.setItem("guest_cart", JSON.stringify(currentState));
}


export const removeItemFromCartGuest = ({ productId, variantId }: { productId: number, variantId: string }) => {


    // Dispatch Redux action
    store.dispatch(decrementCartAction({ productId, variantId }));

    // Sync with localStorage
    const currentState = store.getState().guestCart;
    localStorage.setItem("guest_cart", JSON.stringify(currentState));
}




