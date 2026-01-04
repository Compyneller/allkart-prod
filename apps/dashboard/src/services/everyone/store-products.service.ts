import { prisma } from "@repo/db"

export const getStoreProducts = async (id: number) => {

    const response = await prisma.product.findMany({
        where: {
            storeId: id
        },
        include: {
            variants: {
                include: {
                    prod_img: true
                }
            },
        }
    })


    return response

}