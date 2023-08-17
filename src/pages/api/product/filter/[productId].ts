import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@libs/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method !== "GET") {
    res.status(405).end("Method Not Allowed");
    return;
  }
  const { productId, productVariation } = req.query;
  try {
    const product = await prisma.product.findUnique({
      where: { id: Number(productId) },
      include: {
        variations: {
          where: { id: Number(productVariation) },
        },
      },
    });

    if (!product) {
      return res.status(404).json({ error: "Product not found." });
    }
    res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      data: { ...product },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Something went wrong",
      errorType: error,
    });
  }
}
