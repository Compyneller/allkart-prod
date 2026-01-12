'use client'
import ProductCard from '@/components/product/product-card'
import ProductSkeleton from '@/components/skeletons/product-skeleton'
import StoreHeroSkeleton from '@/components/skeletons/store-hero-skeleton'
import StoreHero from '@/components/store-hero'
import Container from '@/components/ui/container'
import { fetchAllProductByStoreId } from 'data/fetchAllProductByStoreId'
import { fetchStoreDetails } from 'data/fetchStoreDetails'

const ProductLayout = ({ id }: { id: number }) => {
  const { data, isLoading } = fetchAllProductByStoreId(id)
  const { data: storedata, isLoading: StoreLoading } = fetchStoreDetails(id)

  if (isLoading && StoreLoading) {
    return (
      <div>
        <StoreHeroSkeleton />
        <ProductSkeleton />
      </div>
    )
  }


  return (
    <div>
      <StoreHero store={storedata!} />
      {data?.length === 0 ? <div className='border border-primary bg-primary/10 p-5 rounded-md text-center mt-5 w-fit mx-auto font-semibold text-primary'>No products found</div> : <Container>

        <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3'>
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
      </Container>}
    </div>
  )
}

export default ProductLayout