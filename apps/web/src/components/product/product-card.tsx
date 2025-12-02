import { ProductType, ProductVariant } from "@repo/types";
import AddToCart from "../add-to-cart-button";
import CardCarousel from "./card-carousel";
import { VariantDrawer } from "./variant-drawer";
import Link from "next/link";
import { Separator } from "../ui/separator";

const ProductCard = ({
  pid,
  title,
  data,
  product,
}: {
  pid: number;
  title: string;
  data: ProductVariant;
  product: ProductType;
}) => {
  return (
    <div className="w-full rounded-lg">
      <Link
        className="flex flex-col justify-center mb-3 gap-2"
        href={`/product/${product.id}/variant/${data?.id}`}>


        <div className="aspect-[1/1] bg-accent flex items-center justify-center w-full rounded-t-lg">
          <CardCarousel images={data?.prod_img} />
        </div>
        <div className=" space-y-0.5">
          <p className="font-semibold text-lg capitalize">{title}</p>
          <Separator />
          <div className="flex items-center text-muted-foreground justify-between gap-2">
            <p>
              {data.unit_value} {data.unit}
            </p>
            <p>
              <span className=" text-primary">₹{Number(data.selling_price)}</span> <span className="text-xs">M.R.P</span>{" "}
              <span className="line-through italic" >₹{Number(data.mrp)}</span>
            </p>
          </div>
        </div>
      </Link>
      {product?.variants?.length > 1 ? (
        <VariantDrawer
          pid={pid}
          title={product?.title}
          variants={product?.variants!}
        />
      ) : (
        <AddToCart stock={data?.stock} size="sm" variantId={data.id!} productId={pid} />
      )}
    </div >
  );
};

export default ProductCard;
