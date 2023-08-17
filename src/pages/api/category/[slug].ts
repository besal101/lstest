import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@libs/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const { slug } = req.query;

    const category = await prisma.category.findUnique({
      where: { slug: slug as string },
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        subcategories: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
    });

    if (!category) {
      return res.status(404).json({ error: "Category not found." });
    }
    res.status(200).json({
      success: true,
      message: "Category fetched successfully",
      data: category,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Something went wrong",
      errorType: error,
    });
  }
}
