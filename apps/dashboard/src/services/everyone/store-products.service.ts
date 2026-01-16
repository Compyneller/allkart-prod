import { prisma } from "@repo/db"

export const getStoreProducts = async (id: number) => {

    const response = await prisma.product.findMany({
        where: {
            storeId: id
        },
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




    return response

}