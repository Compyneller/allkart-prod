'use client'
import Loader from '@/components/loader'
import ProductCard from '@/components/product/product-card'
import StoreHero from '@/components/store-hero'
import Container from '@/components/ui/container'
import { fetchAllProductByStoreId } from 'data/fetchAllProductByStoreId'
import { fetchStoreDetails } from 'data/fetchStoreDetails'
import { ClipboardList } from 'lucide-react'
import React from 'react'

const ProductLayout = ({ id }: { id: number }) => {
  const { data, isLoading } = fetchAllProductByStoreId(id)
  const { data: storedata, isLoading: StoreLoading } = fetchStoreDetails(id)

  if (isLoading) return <Loader />


  return (
    <div>
      <StoreHero store={storedata!} />
      {data?.length === 0 ? <div className='border border-primary bg-primary/10 p-5 rounded-md text-center mt-5 w-fit mx-auto font-semibold text-primary'>No products found</div> : <Container>

        <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3'>
          {data?.map((product) => (
            <ProductCard
              pid={product?.id}
              title={product?.title}
              data={product?.variants[0]!}
              product={product}
              key={product.id}
            />
          ))}
        </div>
      </Container>}
    </div>
  )
}

export default ProductLayout