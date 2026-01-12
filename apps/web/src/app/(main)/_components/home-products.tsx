import ProductCard from "@/components/product/product-card";
import { ProductType } from "@repo/types";
const HomeProducts = ({ data }: { data: ProductType[] }) => {
  console.log(data)
  return (
    <div>
      <h5 className='text-xl mb-3 font-semibold'>Products</h5>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {data?.map((prod) => (
          <ProductCard
            pid={prod?.id}
            title={prod?.title}
            key={prod?.id}
            count={prod?._count?.variants!}
            data={prod?.variants[0]!}
          />
        ))}
      </div>
    </div>
  );
};

export default HomeProducts;
