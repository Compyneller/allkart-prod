import { prisma } from "@repo/db";

export const getStoreService = async ({ id }: { id: string }) => {
  try {
    const storeData = await prisma.store.findMany({
      orderBy: {
        id: "asc",
      },
      where: {
        userId: id,
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
        address: true,
      },
    });

    return storeData;
  } catch (error) {
    if (error instanceof Error) {
      throw Error(error.message);
    }
  }
};
