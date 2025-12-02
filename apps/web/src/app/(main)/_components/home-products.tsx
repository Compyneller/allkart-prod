import ProductCard from "@/components/product/product-card";
import { CategoryType } from "@repo/types";
import Link from "next/link";
const HomeProducts = ({ data }: { data: CategoryType[] }) => {
  return (
    <>
      {data?.map((cat) => (
        <div key={cat.id}>
          {cat?.products?.length! > 0 && (
            <div className="mb-5 space-y-2">
              <div className="flex items-center justify-between">
                <h5 className="text-2xl font-semibold">{cat.name}</h5>
                <Link
                  href={`/cat/${cat?.id}`}
                  className="text-primary font-semibold">
                  See All
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-6">
                {cat?.products?.map((product) => (
                  <ProductCard
                    pid={product?.id}
                    title={product?.title}
                    data={product?.variants[0]!}
                    product={product}
                    key={product.id}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default HomeProducts;
