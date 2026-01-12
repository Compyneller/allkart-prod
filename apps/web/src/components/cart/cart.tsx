"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import api from "@/lib/axios-instance";
import { CartProductType } from "@repo/types";
import { fetchCart } from "data/fetchCart";
import { useUserSession } from "hooks/useUserSession";
import { List, ShoppingBag } from "lucide-react";
import { useAppDispatch, useAppSelector } from "store/hook";
import { setIsOpen } from "store/slices/dialogSlice";
import { Spinner } from "../ui/spinner";
import CartCard from "./cart-card";
import { useEffect } from "react";
import { clearCart } from "store/slices/cartSlice";



export function Cart() {
  const { user } = useUserSession();
  const guestCartData = useAppSelector((state) => state.guestCart);
  const dispatch = useAppDispatch()
  const simplifiedCart = guestCartData.map(item => ({
    productId: item.productId,
    variantId: item.variantId,
    quantity: item.quantity
  }));
  useEffect(() => {
    const handleBulkCart = async () => {
      if (user) {
        if (simplifiedCart.length > 0) {
          const { data } = await api.post("/api/v1/bulk-cart", simplifiedCart)
          dispatch(clearCart())
        }
      }
    }
    handleBulkCart()
  }, [user])



  const { data: serverCartData, isLoading: serverLoading } = fetchCart();

  // Get guest cart from Redux state

  const cartData: CartProductType[] = user ? (serverCartData || []) : guestCartData;
  const isLoading = user ? serverLoading : false;

  const { isOpen } = useAppSelector((state) => state.dialog);

  if (isLoading) {
    return <Spinner />;
  }

  const cartLength = cartData?.reduce((acc, item) => acc + item.quantity, 0) || 0;
  const totalPrice: number = cartData?.reduce(
    (acc, item) =>
      acc + Number(item?.variant?.selling_price) * Number(item?.quantity),
    0,
  ) || 0;
  const savedPrice: number = cartData?.reduce(
    (acc, item) => acc + Number(item?.variant?.mrp) * Number(item?.quantity),
    0,
  ) || 0;

  const handleCheckout = async () => {
    if (!user) {
      // Redirect to login or show login modal for guest users
      alert("Please login to proceed with checkout");
      return;
    }

    const { data } = await api.get("/api/v1/dasboard/checkout");
    console.log(data);
  };

  return (
    <Sheet onOpenChange={() => dispatch(setIsOpen(!isOpen))}>
      <SheetTrigger asChild>
        <Button
          asChild
          size="sm"
          className="text-sm"
          onClick={() => dispatch(setIsOpen(!isOpen))}
        >
          <span className="flex items-center gap-1">
            <ShoppingBag className="add-to-cart-icon" />
            <span className="font-semibold text-xs ">{cartLength}</span>
          </span>
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto ">
        <SheetHeader>
          <SheetTitle>Cart ({cartLength})</SheetTitle>
        </SheetHeader>
        <div className="space-y-1 px-4">
          {cartData?.map((item, index) => (
            <CartCard data={item} key={index} />
          ))}
        </div>

        <SheetFooter className="sticky bg-accent bottom-0 ">
          <div className="space-y-1 mb-3 text-sm">
            <p className=" font-semibold mb-2">Bill Details</p>
            <div className="flex items-center justify-between">
              <p className="flex items-center gap-1 ">
                <List size={14} /> Item Total
              </p>
              <p>{totalPrice}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="flex items-center gap-1 ">
                <List size={14} /> You Saved
              </p>
              <p>{savedPrice - totalPrice}</p>
            </div>
          </div>

          <Button type="submit" onClick={handleCheckout}>
            {user ? "Checkout" : "Login to Checkout"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
