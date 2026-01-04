import { prisma } from "@repo/db"

export const getStoreDetailService = async (id: number) => {
    const response = await prisma.store.findUnique({
        where: {
            id: id
        },
        include: {
            address: true,
            category: true

        }
    })
    return response
}