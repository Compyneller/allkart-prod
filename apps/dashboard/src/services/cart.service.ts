import { prisma } from "@repo/db";

export const getCartService = async (userId: string) => {


  const cartItems = await prisma.cart.findMany({
    where: { userId: userId },
    include: {
      variant: {
        include: {
          prod_img: true,
          Product: {
            select: {
              id: true,
              title: true,
            },
          },
        },
      },
    },
  });
  return cartItems;
};

export const addToCartService = async ({
  userId,
  productId,
  variantId,
}: {
  userId: string;
  productId: number;
  variantId: string;
}) => {
  const response = await prisma.cart.upsert({
    where: {
      userId_productId_variantId: {
        userId: userId,
        productId: productId,
        variantId: variantId,
      },
    },
    create: {
      quantity: 1,
      productId: productId,
      variantId: variantId,
      userId: userId,
    },
    update: {
      quantity: {
        increment: 1,
      },
    },
  });

  return response;
};





export const decrementCartService = async ({
  userId,
  productId,
  variantId,
}: {
  userId: string;
  productId: number;
  variantId: string;
}) => {
  // 1. First, find the existing cart item to check its current quantity
  const existingCartItem = await prisma.cart.findUnique({
    where: {
      userId_productId_variantId: {
        userId: userId,
        productId: productId,
        variantId: variantId,
      },
    },
  });

  // If item doesn't exist, we can't decrement it. Return null or throw error.
  if (!existingCartItem) {
    throw new Error("Item not found in cart");
  }

  // 2. Logic: If quantity is 1, delete the item. If > 1, decrement.
  if (existingCartItem.quantity === 1) {
    const response = await prisma.cart.delete({
      where: {
        userId_productId_variantId: {
          userId: userId,
          productId: productId,
          variantId: variantId,
        },
      },
    });
    return response;
  } else {
    const response = await prisma.cart.update({
      where: {
        userId_productId_variantId: {
          userId: userId,
          productId: productId,
          variantId: variantId,
        },
      },
      data: {
        quantity: {
          decrement: 1,
        },
      },
    });
    return response;
  }
};

