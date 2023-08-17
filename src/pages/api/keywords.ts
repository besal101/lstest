import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@libs/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { q } = req.query; // q will be the search query from the frontend

  try {
    // Fetch all keywords that contain the search query
    const keywords = await prisma.keyword.findMany({
      where: {
        name: {
          contains: q as string,
        },
      },
      select: { name: true },
    });

    const keywordList = keywords.map((keyword) => keyword.name);

    res.status(200).json({ keywords: keywordList });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
}
