import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@libs/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const { slug, color, size } = req.query;
    const product = await prisma.product.findUnique({
      where: { slug: slug as string },
      include: {
        variations: true,
        category: true,
        reviews: true,
      },
    });

    if (!product) {
      return res.status(404).json({ error: "Product not found." });
    }

    let filteredVariations = {};
    if (color && size) {
      filteredVariations = product.variations.filter(
        (variation) => variation.name === color && variation.size === size
      );
    } else if (color) {
      filteredVariations = product.variations.filter(
        (variation) => variation.name === color
      );
    } else if (size) {
      filteredVariations = product.variations.filter(
        (variation) => variation.size === size
      );
    } else {
      filteredVariations =
        product.variations.length > 0 ? [product.variations[0]] : [];
    }

    if (product) {
      res.status(200).json({
        success: true,
        message: "Product fetched successfully",
        data: { ...product, selected: filteredVariations },
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Product not found",
        data: null,
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Something went wrong",
      errorType: error,
    });
  }
}
