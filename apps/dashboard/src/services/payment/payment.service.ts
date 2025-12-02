import { prisma } from "@repo/db";
import { razorpayConfig } from "../../config/razorpay.config";
import { CartProductType } from "@repo/types";

export const paymentService = async ({ userId }: { userId: string }) => {
  const razorpayInstance = razorpayConfig;
  const cartItems = await prisma.cart.findMany({
    where: { userId: userId },
    include: {
      variant: {
        include: {
          prod_img: false,

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

  const product = cartItems.map((item: CartProductType) => {
    return {
      name: item.variant?.Product?.title,
      quantity: item.quantity,
      price: item.variant?.selling_price,
      variantId: item.variantId,
      productId: item.productId,
    };
  });

  const amount: number = cartItems.reduce(
    (acc: number, item: CartProductType) => {
      return (
        acc + Number(item?.variant?.selling_price) * Number(item?.quantity)
      );
    },
    0
  );

  const options = {
    amount: amount * 100,
    currency: "INR",
    receipt: "order_123",
    notes: {
      userId: userId,
      product: JSON.stringify(product),
    },
  };

  razorpayInstance.orders.create(options, function (err, order) {
    if (err) {
      console.log(err);
    } else {
      console.log(order);
    }
  });
};
