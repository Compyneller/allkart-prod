'use client'
import ProductCard from '@/components/product/product-card'
import ProductCardSkeleton from '@/components/skeletons/product/product-card-skeleton'
import { fetchSearchResult } from 'data/fetchSearch'
import { useCoordinates } from 'hooks/useCoordinates'
import React from 'react'

const SearchLayout = ({ q }: { q: string }) => {
    const { location: coordinates } = useCoordinates()
    const { data, isLoading } = fetchSearchResult({ q, latitude: coordinates?.lat!, longitude: coordinates?.lng! })

    if (isLoading) {
        return <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {Array.from({ length: 12 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
            ))}
        </div>
    }

    if (data?.length === 0) {
        return <div className="flex items-center justify-center h-64">
            <p className="text-2xl font-semibold">No products found</p>
        </div>
    }

    return (
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
    )
}

export default SearchLayout