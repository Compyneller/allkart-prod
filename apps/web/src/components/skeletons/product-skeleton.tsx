import { Skeleton } from "../ui/skeleton";

const ProductSkeleton = () => {
    return (
        <div className="w-full space-y-2 ">
            <div className="w-full flex items-center justify-between">
                <Skeleton className="h-6 w-28" />
                <Skeleton className="h-6 w-28" />
            </div>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-6">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i}>
                        <Skeleton className="h-[200px] w-full" />
                        <div className="p-3 space-y-1">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-3 w-full" />
                            <Skeleton className="h-8 w-24" />
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default ProductSkeleton