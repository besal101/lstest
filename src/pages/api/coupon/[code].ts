import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@libs/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const { code, device } = req.query;
    const coupon = await prisma.coupon.findUnique({
      where: { code: code as string },
    });
    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: "Coupon Not Found",
        coupon: null,
      });
    }
    const availableDevice = JSON.parse(coupon.device);
    const ifexists = availableDevice.includes(device as string);
    if (!ifexists) {
      return res.status(404).json({
        success: false,
        message: "Coupon Not Found",
        coupon: null,
      });
    }
    return res.status(200).json({
      success: true,
      message: "Coupon Found",
      coupon: coupon,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Something went wrong",
      errorType: error,
    });
  }
}
