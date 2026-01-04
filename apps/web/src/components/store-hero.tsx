import React, { useState } from 'react';
import { MapPin, Phone, Truck, Package, ShoppingBag, Clock, Info, CheckCircle } from 'lucide-react';
import { StoreTypes } from '@repo/types';

// Define interfaces for the data structure


const StoreHero = ({ store }: { store: StoreTypes }) => {
    // Simulating the provided JSON data with proper typing


    const [isCopied, setIsCopied] = useState<boolean>(false);

    // Helper to copy phone number
    const copyToClipboard = (text: string): void => {
        navigator.clipboard.writeText(text);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    return (
        <div className="w-full mb-5  flex items-center justify-center ">
            {/* Main Container */}
            <div className="w-full bg-card  shadow-xl overflow-hidden border border-border">

                {/* Banner / Gradient Background */}
                <div className="relative h-48 md:h-64 bg-accent dark:bg-accent/20 ">
                    <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLW9wYWNpdHk9IjAuMDUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')]"></div>

                    {/* Status Badge */}
                    <div className="absolute top-4 right-4 md:top-6 md:right-6">
                        <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold shadow-sm backdrop-blur-md ${store?.isActive
                            ? 'bg-green-500/20 text-primary-foreground border border-green-400/30'
                            : 'bg-destructive/20 text-destructive-foreground border border-destructive/30'
                            }`}>
                            <span className={`w-2 h-2 rounded-full mr-2 ${store?.isActive ? 'bg-green-400' : 'bg-red-400'}`}></span>
                            {store?.isActive ? 'Open Now' : 'Closed'}
                        </span>
                    </div>
                </div>

                {/* Content Section */}
                <div className="relative px-6 pb-8 md:px-10 md:pb-12">

                    {/* Logo / Category Icon Wrapper - Floating overlapping the banner */}
                    <div className="relative -mt-16 mb-6 flex justify-between items-end">
                        <div className="bg-card p-2 rounded-2xl shadow-lg inline-block">
                            <div className="bg-accent/50 w-24 h-24 md:w-32 md:h-32 rounded-xl flex items-center justify-center border border-border overflow-hidden">
                                {/* Fallback to text/icon if URL fails, but using the provided URL */}
                                <img
                                    src={store?.category?.url}
                                    alt={store?.category?.name}
                                    className="w-16 h-16 md:w-20 md:h-20 object-contain drop-shadow-sm"
                                    onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                        const target = e.target as HTMLImageElement;
                                        target.onerror = null;
                                        target.style.display = 'none';
                                        if (target.parentNode) {
                                            (target.parentNode as HTMLElement).innerHTML = '<svg class="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>';
                                        }
                                    }}
                                />
                            </div>
                        </div>

                        {/* Category Pill (Mobile: Hidden, Desktop: Visible here) */}
                        <div className="hidden md:flex items-center space-x-2 text-muted-foreground bg-muted px-4 py-2 rounded-full border border-border">
                            <Package size={18} className="text-primary" />
                            <span className="font-medium text-sm text-foreground">{store?.category?.name} Store</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">

                        {/* Main Details Column */}
                        <div className="md:col-span-2 space-y-6">
                            <div>
                                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2 tracking-tight">
                                    {store?.shop_name}
                                </h1>
                                <div className="flex items-center text-muted-foreground mb-4 md:hidden">
                                    <Package size={16} className="mr-1.5 text-primary" />
                                    <span className="text-sm font-medium">{store?.category?.name}</span>
                                </div>
                                <div className="flex items-start text-muted-foreground text-sm md:text-base leading-relaxed">
                                    <MapPin size={20} className="mr-2 mt-0.5 flex-shrink-0" />
                                    <p>
                                        {store?.address?.address},<br className="md:hidden" /> {store?.address?.city}, {store?.address?.state} - {store?.address?.pincode}
                                    </p>
                                </div>
                            </div>

                            {/* Delivery Stats Cards */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* Home Delivery Card */}
                                {store?.home_delivery && (
                                    <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 flex items-start space-x-3 transition hover:shadow-md">
                                        <div className="bg-card p-2 rounded-lg shadow-sm text-primary">
                                            <Truck size={20} />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-foreground text-sm">Home Delivery</p>
                                            <p className="text-muted-foreground text-xs mt-0.5">Available for all items</p>
                                        </div>
                                    </div>
                                )}

                                {/* Free Delivery Card */}
                                <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 flex items-start space-x-3 transition hover:shadow-md">
                                    <div className="bg-card p-2 rounded-lg shadow-sm text-primary">
                                        <ShoppingBag size={20} />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-foreground text-sm">Free Delivery</p>
                                        <p className="text-muted-foreground text-xs mt-0.5">
                                            On orders above <span className="font-bold text-foreground">₹{store?.free_delivery_after}</span>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Additional Delivery Info */}
                            <div className="flex flex-wrap gap-3 text-xs md:text-sm text-muted-foreground">
                                <div className="flex items-center bg-muted px-3 py-1.5 rounded-lg border border-border">
                                    <Info size={14} className="mr-1.5" />
                                    Delivery Charge: <span className="font-semibold text-foreground ml-1">₹{store?.delivery_charge}</span>
                                </div>
                                <div className="flex items-center bg-muted px-3 py-1.5 rounded-lg border border-border">
                                    <Info size={14} className="mr-1.5" />
                                    Handling: <span className="font-semibold text-foreground ml-1">₹{store?.handling_charge}</span>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar / Action Column */}
                        <div className="md:col-span-1 border-t md:border-t-0 md:border-l border-border pt-6 md:pt-0 md:pl-8 flex flex-col justify-center space-y-6">

                            {/* Contact Card */}
                            <div className="bg-card rounded-xl">
                                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                                    Store Contact
                                </p>
                                <div className="flex items-center justify-between p-4 bg-muted rounded-xl border border-border">
                                    <div className="flex items-center space-x-3">
                                        <div className="bg-primary/10 p-2 rounded-full text-primary">
                                            <Phone size={18} />
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground">Call for Support</p>
                                            <p className="font-bold text-foreground">{store?.address?.contact}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => copyToClipboard(store?.address?.contact!)}
                                        className="text-muted-foreground hover:text-primary transition"
                                        title="Copy number"
                                    >
                                        {isCopied ? <CheckCircle size={18} className="text-green-500" /> : <div className="text-xs font-medium border border-border bg-card px-2 py-1 rounded hover:bg-accent">Copy</div>}
                                    </button>
                                </div>
                            </div>

                            {/* Owner Info */}
                            <div>
                                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                                    Managed By
                                </p>
                                <div className="flex items-center space-x-3">
                                    <div className="h-10 w-10 rounded-full bg-linear-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold text-lg shadow-sm">
                                        {store?.address?.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-foreground">{store?.address?.name}</p>
                                        <p className="text-xs text-muted-foreground">Store Owner</p>
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


export default StoreHero