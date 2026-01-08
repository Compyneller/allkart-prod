import { CartProductType } from "@repo/types";
import Quantity from "./quantity";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "store/hook";
import { setIsOpen } from "store/slices/dialogSlice";

const CartCard = ({ data }: { data: CartProductType }) => {
  const { isOpen } = useAppSelector((state) => state.dialog)
  const dispatch = useAppDispatch()


  return (
    <div className=" p-2 rounded-lg border grid gap-3   grid-cols-8" >
      <div className="col-span-6" onClick={() => dispatch(setIsOpen(!isOpen))}>
        <Link
          className=" grid grid-cols-6 gap-3"
          href={`/product/${data?.productId}/variant/${data?.variantId}`}>
          <div className="col-span-2 items-center">
            <img
              className="h-12 w-full object-contain"
              src={data?.variant?.prod_img[0]?.url}
              alt=""
            />
          </div>
          <div className="col-span-4 text-sm">
            <p className="text-sm font-semibold">{data?.variant?.Product?.title}</p>
            <p className="text-sm text-muted-foreground">
              {data?.variant?.unit_value} {data?.variant?.unit}
            </p>

            <div className="flex items-center gap-2">
              <p className="text-primary">₹{Number(data?.variant?.selling_price)}</p>
              <p className=" line-through">₹{Number(data?.variant?.mrp)}</p>
              <p className="text-green-500 italic">
                {Math.round(
                  ((Number(data?.variant?.mrp) - Number(data?.variant?.selling_price)) /
                    Number(data?.variant?.mrp)) *
                  100
                )}
                % off
              </p>
            </div>
          </div>
        </Link>
      </div>
      <div className="col-span-2 flex items-center justify-center">
        <Quantity count={data?.quantity} productId={data?.productId} variantId={data?.variantId} stock={data?.variant?.stock} />
      </div>
    </div>
  );
};

export default CartCard;
