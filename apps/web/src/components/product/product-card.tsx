import { ProductType, ProductVariant } from "@repo/types";
import Image from "next/image";
import Link from "next/link";
import AddToCart from "../add-to-cart-button";
import { Separator } from "../ui/separator";
import { VariantDrawer } from "./variant-drawer";

const ProductCard = ({
  pid,
  title,
  data,
  product,
  options = true,
}: {
  options?: boolean;
  pid: number;
  title: string;
  data: ProductVariant;
  product: ProductType;
}) => {
  return (
    <div className="w-full group rounded-lg prod-card relative">
      <Link
        className="flex flex-col justify-center mb-3 gap-2"
        href={`/product/${product.id}/variant/${data?.id}`}
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
          <p className="font-semibold text-lg capitalize">{title}</p>
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
      {product?.variants?.length > 1 && options ? (
        <VariantDrawer
          pid={pid}
          title={product?.title}
          variants={product?.variants!}
        />
      ) : (
        <AddToCart
          stock={data?.stock}
          size="sm"
          variantId={data.id!}
          productId={pid}
        />
      )}
    </div>
  );
};

export default ProductCard;
