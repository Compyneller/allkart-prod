import { prisma } from "@repo/db"

export const variantsService = async (id: number) => {
    const response = await prisma.variants.findMany({
        where: {
            productId: id
        },
        include: {
            Product: {
                select: {
                    title: true,
                }
            },
            prod_img: {
                take: 1,
                select: {
                    url: true
                }
            }
        }
    })

    return response
}