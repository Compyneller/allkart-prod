import React from 'react'
import { Skeleton } from '../ui/skeleton'

const CatCardSkeleton = () => {
    return (
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-10 gap-1 py-10">
            {Array.from({ length: 10 }).map((_, i) => (
                <div className="w-full rounded-lg overflow-clip " key={i}>
                    <Skeleton className="h-[100px] mb-2 w-full" />
                    <Skeleton className="h-4 w-full" />
                </div>
            ))}

        </div>
    )
}

export default CatCardSkeleton

