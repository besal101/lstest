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
    const Order = usersCart.data.message;
    for (const orderEntry of Order) {
      const ifuserExits = await prisma.user.findUnique({
        where: {
          id: orderEntry.user,
        },
      });

      if (ifuserExits) {
        const cartId = await prisma.order.create({
          data: {
            id: orderEntry._id,
            userId: orderEntry.user,
            status: orderEntry.status,
            shippingid: orderEntry.shippingid,
            invoiceNumber: orderEntry.invoiceNumber,
            subtotal: orderEntry.subtotal,
            shippingCharge: orderEntry.shipping,
            totalAmount: orderEntry.totalAmount,
            cartId: orderEntry.cartitems,
            currency: orderEntry.currency,
            reedemedPoints: orderEntry.reedemedPoints,
            PointsAmount: orderEntry.smilepoints,
            paymentStatus: orderEntry.paymentStatus,
            paymentType: orderEntry.paymentType,
            discount: Number(orderEntry.discount),
            couponCode: orderEntry.coupon,
            customerNotes: orderEntry.customerNotes,
            userAgent: orderEntry.userAgent,
            source: "old",
            createdAt: orderEntry.createdAt,
            updatedAt: orderEntry.updatedAt,
          },
        });
        for (const orderStatusEntry of orderEntry.orderStatus) {
          if (orderStatusEntry.isCompleted === true) {
            const cartItem = await prisma.orderStatus.create({
              data: {
                id: orderStatusEntry._id,
                orderId: cartId.id,
                status: orderStatusEntry.type,
                createdAt: orderStatusEntry.createdAt,
              },
            });
          }
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
