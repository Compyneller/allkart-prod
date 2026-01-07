import { Skeleton } from "../ui/skeleton";

const StoreHeroSkeleton = () => {
    return (
        <div className="w-full mb-5 flex items-center justify-center">
            {/* Main Container */}
            <div className="w-full bg-card shadow-xl overflow-hidden border border-border">

                {/* Banner Skeleton */}
                <div className="relative h-48 md:h-64 bg-accent dark:bg-accent/20">
                    <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLW9wYWNpdHk9IjAuMDUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')]"></div>

                    {/* Status Badge Skeleton */}
                    <div className="absolute top-4 right-4 md:top-6 md:right-6">
                        <Skeleton className="h-8 w-24 rounded-full" />
                    </div>
                </div>

                {/* Content Section */}
                <div className="relative px-6 pb-8 md:px-10 md:pb-12">

                    {/* Logo / Category Wrapper */}
                    <div className="relative -mt-16 mb-6 flex justify-between items-end">
                        {/* Logo Skeleton */}
                        <div className="bg-card p-2 rounded-2xl shadow-lg inline-block">
                            <Skeleton className="w-24 h-24 md:w-32 md:h-32 rounded-xl" />
                        </div>

                        {/* Category Pill Skeleton (Desktop) */}
                        <div className="hidden md:block">
                            <Skeleton className="h-10 w-40 rounded-full" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">

                        {/* Main Details Column */}
                        <div className="md:col-span-2 space-y-6">
                            {/* Shop Name & Address Section */}
                            <div>
                                {/* Shop Name Skeleton */}
                                <Skeleton className="h-10 md:h-12 w-3/4 mb-2" />

                                {/* Mobile Category Skeleton */}
                                <div className="mb-4 md:hidden">
                                    <Skeleton className="h-5 w-32" />
                                </div>

                                {/* Address Skeleton */}
                                <div className="flex items-start space-x-2">
                                    <Skeleton className="h-5 w-5 mt-0.5 flex-shrink-0" />
                                    <div className="flex-1 space-y-2">
                                        <Skeleton className="h-4 w-full" />
                                        <Skeleton className="h-4 w-2/3" />
                                    </div>
                                </div>
                            </div>

                            {/* Delivery Stats Cards Skeleton */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* Home Delivery Card Skeleton */}
                                <div className="bg-primary/10 border border-primary/20 rounded-xl p-4">
                                    <div className="flex items-start space-x-3">
                                        <Skeleton className="h-10 w-10 rounded-lg" />
                                        <div className="flex-1 space-y-2">
                                            <Skeleton className="h-4 w-28" />
                                            <Skeleton className="h-3 w-32" />
                                        </div>
                                    </div>
                                </div>

                                {/* Free Delivery Card Skeleton */}
                                <div className="bg-primary/10 border border-primary/20 rounded-xl p-4">
                                    <div className="flex items-start space-x-3">
                                        <Skeleton className="h-10 w-10 rounded-lg" />
                                        <div className="flex-1 space-y-2">
                                            <Skeleton className="h-4 w-28" />
                                            <Skeleton className="h-3 w-36" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Additional Delivery Info Skeleton */}
                            <div className="flex flex-wrap gap-3">
                                <Skeleton className="h-8 w-40 rounded-lg" />
                                <Skeleton className="h-8 w-32 rounded-lg" />
                            </div>
                        </div>

                        {/* Sidebar / Action Column */}
                        <div className="md:col-span-1 border-t md:border-t-0 md:border-l border-border pt-6 md:pt-0 md:pl-8 flex flex-col justify-center space-y-6">

                            {/* Contact Card Skeleton */}
                            <div className="bg-card rounded-xl">
                                <Skeleton className="h-4 w-28 mb-3" />
                                <div className="p-4 bg-muted rounded-xl border border-border">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3 flex-1">
                                            <Skeleton className="h-10 w-10 rounded-full" />
                                            <div className="flex-1 space-y-2">
                                                <Skeleton className="h-3 w-24" />
                                                <Skeleton className="h-4 w-28" />
                                            </div>
                                        </div>
                                        <Skeleton className="h-8 w-14 rounded" />
                                    </div>
                                </div>
                            </div>

                            {/* Owner Info Skeleton */}
                            <div>
                                <Skeleton className="h-4 w-24 mb-2" />
                                <div className="flex items-center space-x-3">
                                    <Skeleton className="h-10 w-10 rounded-full" />
                                    <div className="flex-1 space-y-2">
                                        <Skeleton className="h-4 w-32" />
                                        <Skeleton className="h-3 w-20" />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StoreHeroSkeleton;
