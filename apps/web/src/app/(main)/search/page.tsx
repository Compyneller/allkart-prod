import Container from '@/components/ui/container'
import React from 'react'
import SearchLayout from './_components/search-layout'

const SearchPage = async ({ searchParams }: { searchParams: { q: string } }) => {
    const { q } = await searchParams
    return (
        <Container className='py-10'>

            <h5 className='mb-5'>
                Serach Result: <span className=' underline italic'>{q}</span>
            </h5>

            <SearchLayout q={q} />




        </Container>
    )
}

export default SearchPage