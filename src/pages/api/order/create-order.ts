import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@libs/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { userId, cartIds, totalAmount, paymentMethod, couponId, addressId } =
    req.body;

  console.log(req.body);

  try {
    const order = await prisma.order.create({
      data: {
        userId: userId,
        totalAmount,
        paymentMethod,
        couponId: couponId,
        addressId,
      },
    });
    await prisma.cart.updateMany({
      where: { id: { in: cartIds } },
      data: {
        orderId: order.id,
      },
    });
    // Decrease the quantity of products or product variations in the cart
    for (const cartId of cartIds) {
      const cart = await prisma.cart.findUnique({
        where: { id: cartId },
        include: { productVariation: true, product: true },
      });
      if (!cart) {
        console.warn(`Cart with id ${cartId} not found`);
        continue;
      }
      if (cart.productVariationId) {
        await prisma.productVariation.update({
          where: { id: cart.productVariationId },
          data: { quantity: { decrement: cart.productQuantity || 0 } },
        });
      } else if (cart.productId) {
        await prisma.product.update({
          where: { id: cart.productId },
          data: { quantity: { decrement: cart.productQuantity || 0 } },
        });
      }
    }

    res.status(200).json({ message: "Cart items added successfully", order });
  } catch (error) {
    console.error("Error adding cart items:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
