import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@libs/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    let category = await prisma.category.findMany({
      where: {
        parentCategory: null,
      },
      include: {
        subcategories: true,
      },
    });
    res.status(200).json({
      success: true,
      message: "Category fetched successfully",
      data: category,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Something went wrong",
      errorType: "server",
    });
  }
}
