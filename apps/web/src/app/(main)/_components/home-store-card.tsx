import OpenMap from '@/components/open-map';
import { Card, CardContent } from '@/components/ui/card';
import { FC } from 'react';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import Link from 'next/link';
import { StoreWithAddress } from 'data/fetchStores';

const HomeStoreCard: FC<{
    data: StoreWithAddress
}> = ({ data }) => {
    return (
        <Card>
            <CardContent className='space-y-3'>
                <p className='text-lg font-semibold text-primary truncate'>{data.shop_name}</p>
                <div className='space-y-1'>
                    <p className='text-muted-foreground text-sm '>{data.address}</p>
                    <p className='text-muted-foreground text-sm '><span className='text-primary'>Home Delivery:</span> {data.home_delivery ? 'Yes' : 'No'}</p>
                    {
                        data.home_delivery && (
                            <>
                                <p className='text-muted-foreground text-sm '><span className='text-primary'>Delivery Charge:</span> {data.delivery_charge}</p>
                                <p className='text-muted-foreground text-sm '><span className='text-primary'>Free Delivery After:</span> {data.free_delivery_after}</p></>
                        )
                    }
                </div>
                <div className='space-y-1'>
                    <OpenMap lat={data.lat!} lng={data.long!} />
                    <Link href={`/store/${data.id}`}>
                        <Button size='sm' className='w-full' variant='outline'><Eye /> View Products</Button>
                    </Link>
                </div>
            </CardContent>
        </Card>
    )
}

export default HomeStoreCard