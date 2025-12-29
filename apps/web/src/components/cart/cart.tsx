"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { fetchCart } from "data/fetchCart";
import { List, ShoppingBag } from "lucide-react";
import { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "store/hook";
import { Spinner } from "../ui/spinner";
import CartCard from "./cart-card";
import { setIsOpen } from "store/slices/dialogSlice";
import api from "@/lib/axios-instance";

export function Cart() {
  const { data, isLoading } = fetchCart();

  const { isOpen } = useAppSelector((state) => state.dialog);
  const dispatch = useAppDispatch();

  if (isLoading) {
    return <Spinner />;
  }

  const cartLength = data?.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice: number = data?.reduce(
    (acc, item) =>
      acc + Number(item?.variant?.selling_price) * Number(item?.quantity),
    0,
  );
  const savedPrice: number = data?.reduce(
    (acc, item) => acc + Number(item?.variant?.mrp) * Number(item?.quantity),
    0,
  );

  const handleCheckout = async () => {
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
          {data?.map((item, index) => (
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
            Checkout
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
