import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@libs/prisma";
const { sql } = require("@prisma/client");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { q } = req.query; // q will be the search query from the frontend

  try {
    const products = await prisma.$queryRaw(sql`
      SELECT p.*
      FROM Product p
      WHERE JSON_CONTAINS(p.metaKeywords, ${JSON.stringify([q])})
      OR p.name LIKE ${`%${q}%`};
    `);

    res.status(200).json({ products });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Something went wrong",
      errorType: error,
    });
  }
}
