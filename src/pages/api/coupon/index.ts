// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@libs/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
  const { code, device, discountPercent, status } = req.body;

  try {
    const findCoupon = await prisma.coupon.findUnique({
      where: {
        code: code,
      },
    });

    if (findCoupon) {
      res.status(200).json({
        success: false,
        message: "Coupon already exists",
      });
      return;
    }

    const coupon = await prisma.coupon.create({
      data: {
        code,
        device: JSON.stringify(device),
        discountPercent: discountPercent,
        status,
      },
    });

    res.status(201).json({ coupon });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
}
