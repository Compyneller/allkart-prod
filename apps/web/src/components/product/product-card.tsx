import { ProductType, ProductVariant } from "@repo/types";
import Image from "next/image";
import Link from "next/link";
import AddToCart from "../add-to-cart-button";
import { Separator } from "../ui/separator";
import { VariantDrawer } from "./variant-drawer";
import { Button } from "../ui/button";

const ProductCard = ({
  pid,
  title,
  data,
  count,
  options = true,
}: {
  options?: boolean;
  pid: number;
  title: string;
  data: ProductVariant;
  count: number;
}) => {
  return (
    <div className="w-full group rounded-lg prod-card relative">
      <Link
        className="flex flex-col justify-center mb-3 gap-2"
        href={`/product/${pid}/variant/${data?.id}`}
      >
        <div className="aspect-square relative bg-accent flex items-center justify-center w-full rounded-t-lg">
          <Image
            fill
            src={data?.prod_img[0]?.url!}
            alt={`Variant Image`}
            className="w-full prod-image aspect-square object-cover rounded-md"
          />
        </div>
        <div className=" space-y-0.5">
          <p className="font-semibold  capitalize">{title}</p>
          <Separator />
          <div className="flex items-center text-muted-foreground justify-between gap-2">
            <p>
              {data.unit_value} {data.unit}
            </p>
            <p>
              <span className=" text-primary">
                ₹{Number(data.selling_price)}
              </span>{" "}
              <span className="text-xs">M.R.P</span>{" "}
              <span className="line-through italic">₹{Number(data.mrp)}</span>
            </p>
          </div>
        </div>
      </Link>
      {count > 1 && options ? (
        <VariantDrawer
          pid={pid}
          count={count}
        />
      ) : (
        <AddToCart
          stock={data?.stock}
          size="sm"
          variantId={data.id!}
          productId={pid}
          data={data}
        />
      )}
    </div>
  );
};

export default ProductCard;
