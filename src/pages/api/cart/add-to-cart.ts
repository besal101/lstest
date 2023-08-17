import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@libs/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { cartItems, userId } = req.body;

  try {
    const cartIds: number[] = [];
    for (const cartItem of cartItems) {
      const insertedCartItem = await prisma.cart.create({
        data: {
          userId,
          ItemCode: cartItem.ItemCode,
          productName: cartItem.productName,
          productAmount: cartItem.productAmount,
          productSlug: cartItem.productSlug,
          productQuantity: cartItem.productQuantity,
          productImage: cartItem.productImage,
          productId: cartItem.productID,
          productVariationId: cartItem.variationId,
          currency: cartItem.currency,
        },
      });
      cartIds.push(insertedCartItem.id);
    }

    res.status(200).json({ message: "Cart items added successfully", cartIds });
  } catch (error) {
    console.error("Error adding cart items:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
