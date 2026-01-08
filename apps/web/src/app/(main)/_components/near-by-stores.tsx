import OpenMap from '@/components/open-map'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { StoreWithAddress } from 'data/fetchStores'
import { Banknote, Eye, MapPin, Navigation, Truck } from 'lucide-react'
import Link from 'next/link'
import { FC } from 'react'


const NearByStores: FC<{ data: StoreWithAddress[] }> = ({ data }) => {
    return (
        <div className='mb-10'>
            <h5 className='text-xl mb-3 font-semibold'>Nearby Stores</h5>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
                {data?.map((store) => (
                    <StoreCard key={store.id} store={store} />
                    // <HomeStoreCard key={store.id} data={store} />
                ))}
            </div>
        </div>
    )
}

export default NearByStores



const StoreCard = ({ store }: { store: StoreWithAddress }) => {
    // Format distance
    const distanceText = store.distance < 1
        ? `${(store.distance * 1000).toFixed(0)}m`
        : `${store.distance.toFixed(1)} km`;

    return (
        <Card className="relative group flex flex-col justify-between h-full hover:shadow-lg transition-all duration-300">
            <CardContent className="space-y-4">
                {/* Active Badge */}
                <div className="absolute top-4 right-4 z-10">
                    {store.isActive ? (
                        <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-1 rounded-full border border-primary/20 shadow-sm flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                            OPEN
                        </span>
                    ) : (
                        <span className="bg-muted text-muted-foreground text-[10px] font-bold px-2 py-1 rounded-full border border-border">
                            CLOSED
                        </span>
                    )}
                </div>

                <div>
                    {/* Header: Icon, Name, Address */}
                    <div className="flex items-start gap-4 mb-5">
                        <div className="w-14 h-14 rounded-xl bg-primary/10 border-primary/20  flex items-center justify-center text-primary shrink-0 border shadow-sm">
                            <Truck size={28} strokeWidth={1.5} />
                        </div>

                        <div className="flex-1 pr-14">
                            <h3 className="font-bold text-foreground text-lg leading-tight mb-1 line-clamp-1" title={store.shop_name}>
                                {store.shop_name}
                            </h3>
                            <p className="text-xs text-muted-foreground flex items-center gap-1 mb-2">
                                <MapPin size={12} className="shrink-0" />
                                <span className="truncate max-w-[160px]">{store.address}</span>
                            </p>
                        </div>
                    </div>

                    {/* Info Grid - Modernized Metrics */}
                    <div className="bg-muted rounded-xl border border-border p-3 mb-5 space-y-3">
                        {/* Top Row: Distance & Home Delivery Status */}
                        <div className="flex items-center justify-between border-b border-border pb-2">
                            <div className="flex items-center gap-2">
                                <div className="bg-primary/10 p-1.5 rounded-lg text-primary">
                                    <Navigation size={14} />
                                </div>
                                <div>
                                    <span className="text-[10px] font-medium text-muted-foreground block uppercase tracking-wider">Distance</span>
                                    <span className="text-xs font-bold text-foreground">{distanceText}</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 text-right">
                                <div>
                                    <span className="text-[10px] font-medium text-muted-foreground block uppercase tracking-wider">Home Delivery</span>
                                    <span className={`text-xs font-bold ${store.home_delivery ? 'text-primary' : 'text-muted-foreground'}`}>
                                        {store.home_delivery ? 'Available' : 'Not Available'}
                                    </span>
                                </div>
                                <div className={`p-1.5 rounded-lg ${store.home_delivery ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                                    <Truck size={14} />
                                </div>
                            </div>
                        </div>

                        {/* Bottom Row: Delivery Costs (Conditional) */}

                        <div className="flex items-center justify-between pt-1">
                            <div className="flex items-center gap-2">
                                <div className="bg-primary/10 p-1.5 rounded-lg text-primary">
                                    <Banknote size={14} />
                                </div>
                                <div>
                                    <span className="text-[10px] font-medium text-muted-foreground block uppercase tracking-wider">Charge</span>
                                    {
                                        store.home_delivery ? store.delivery_charge === 0 ? (
                                            <span className="text-xs font-bold text-primary">Free</span>
                                        ) : (
                                            <span className="text-xs font-bold text-foreground">₹{store.delivery_charge}</span>
                                        ) : (
                                            <span className="text-xs font-bold text-muted-foreground">Not Available</span>
                                        )
                                    }
                                </div>
                            </div>

                            {store?.delivery_charge! > 0 && (
                                <div className="text-right">
                                    <span className="text-[10px] font-medium text-muted-foreground block uppercase tracking-wider">Free After</span>
                                    {
                                        store.home_delivery ? (
                                            <span className="text-xs font-bold text-primary">₹{store.free_delivery_after}</span>
                                        ) : (
                                            <span className="text-xs font-bold text-muted-foreground">Not Available</span>
                                        )
                                    }
                                </div>
                            )}
                        </div>

                    </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3 mt-auto">
                    <OpenMap lat={store?.lat!} lng={store?.long!} />
                    <Link href={`/store/${store?.id}`} >
                        <Button size="sm" className="w-full ">
                            <Eye /> View Products
                        </Button>
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
};