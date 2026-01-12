import { prisma } from "@repo/db";

export const getProductsForFeed = async ({ storeIds, page = 1 }: { storeIds: number[], page?: number }) => {
    // ... setup code ...

    const products = await prisma.product.findMany({
        where: {
            storeId: { in: storeIds },
            variants: { some: { stock: { gt: 0 } } } // Only show items with stock
        },
        take: 20,
        skip: (page - 1) * 20,
        select: {
            id: true,
            title: true,

            // 1. GET THE COUNT (Super fast, no object fetching)
            _count: {
                select: { variants: true }
            },

            // 2. GET ONLY THE "DISPLAY" VARIANT
            variants: {
                where: { stock: { gt: 0 } },
                orderBy: { selling_price: 'asc' }, // Show the "Starting at" price
                take: 1, // <--- Only fetch ONE
                select: {
                    id: true,
                    selling_price: true,
                    mrp: true,
                    unit: true,       // "kg", "size"
                    unit_value: true, // "1", "XL"
                    prod_img: {
                        take: 1, // Only fetch ONE image
                        select: { url: true }
                    }
                }
            }
        }
    });

    // 3. MAP TO CARD
    // return products.map(p => {
    //     const mainVariant = p.variants[0];

    //     return {
    //         id: p.id,
    //         title: p.title,
    //         image: mainVariant?.prod_img[0]?.url || 'default.png',
    //         price: mainVariant?.selling_price,
    //         mrp: mainVariant?.mrp,

    //         // 4. THE UI LOGIC
    //         // We use the count to decide the button type
    //         hasMultipleOptions: p._count.variants > 1, 
    //         defaultVariantId: mainVariant?.id // Needed for "Add to Cart" if only 1 option
    //     };
    // });

    return products
}