import { Skeleton } from "../../ui/skeleton";

const ProductCardSkeleton = () => {
  return (
    <div className="w-full border rounded-lg">
      <Skeleton className="h-[200px] flex mb-5 items-center justify-center w-full rounded-t-lg" />
      <div className="p-3 space-y-1">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-8 w-24" />
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
