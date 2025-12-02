import { prisma } from "@repo/db";

export const getCategoriesService = async () => {
    try {
        const response = await prisma.category.findMany();
        return response;
    } catch (error) {
        throw error;
    }
};