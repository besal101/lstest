import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@libs/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { productId, userIP } = req.body;

  try {
    // Check if the product visit data exists in the database
    const productVisit = await prisma.productVisit.findFirst({
      where: {
        productId: productId,
        userIP: userIP,
      },
    });

    if (productVisit) {
      // If the product visit data exists, update the visit count and lastVisitedAt
      await prisma.productVisit.update({
        where: {
          id: productVisit.id,
        },
        data: {
          visitCount: productVisit.visitCount + 1,
          lastVisitedAt: new Date(),
        },
      });
    } else {
      // If the product visit data doesn't exist, insert a new record
      await prisma.productVisit.create({
        data: {
          productId: productId,
          visitCount: 1,
          lastVisitedAt: new Date(),
          userIP: userIP,
        },
      });
    }

    res.status(200).json({
      success: true,
      message: "Product visit tracked successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to track product visit",
      errorType: error,
    });
  }
}
