import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@libs/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const orderId = Number(req.query.id);

  if (isNaN(orderId)) {
    return res.status(400).json({ message: "Invalid orderId provided" });
  }

  try {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        coupon: true,
        cart: true,
        address: true,
      },
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
