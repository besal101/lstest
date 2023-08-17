import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@libs/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { q } = req.query; // q will be the search query from the frontend

  try {
    // Fetch all keywords that contain the search query
    const keywords = await prisma.cart.findMany({
      include: {
        cartItems: true,
      },
    });

    res.status(200).json({ keywords });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
}
