import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@libs/prisma";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const usersCart = await axios.get(
      "http://localhost:3000/api/user/getallcarts"
    );

    // Extracting the relevant data from the API response
    const Cart = usersCart.data.message;
    for (const cartEntry of Cart) {
      const ifuserExits = await prisma.user.findUnique({
        where: {
          id: cartEntry.user,
        },
      });

      if (ifuserExits) {
        const cartId = await prisma.cart.create({
          data: {
            id: cartEntry._id,
            status: cartEntry.status,
            userId: cartEntry.user,
            createdAt: cartEntry.createdAt,
            updatedAt: cartEntry.updatedAt,
          },
        });
        for (const cartItemEntry of cartEntry.cartItems) {
          const cartItem = await prisma.cartItem.create({
            data: {
              id: cartItemEntry._id,
              cartId: cartId.id,
              name: cartItemEntry.name,
              slug: cartItemEntry.slug,
              currency: cartItemEntry.currency,
              productCode: cartItemEntry.productCode[0],
              discountedPrice: cartItemEntry.discountedPrice,
              productImage: cartItemEntry.productImage,
              productQuantity: cartItemEntry.productQuantity,
            },
          });
        }
      }
    }
    res.status(200).json({ success: true, message: "successfully addded" });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Something went wrong",
      errorType: error,
    });
  }
}
