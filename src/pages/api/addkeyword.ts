import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@libs/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const products = await prisma.product.findMany();
    const allKeywords = products.flatMap((product) => product.metaKeywords);
    const uniqueKeywords = [...new Set(allKeywords)].filter(
      (keyword) => typeof keyword === "string" // Filter out non-string values
    );

    // Create a new array to store keywords that don't already exist in the database
    const newKeywords: string[] = [];

    for (const keyword of uniqueKeywords) {
      const existingKeyword = await prisma.keyword.findUnique({
        where: { name: keyword as string },
      });

      if (!existingKeyword) {
        newKeywords.push(keyword as string);
      }
    }

    // Convert newKeywords to an array of promises
    const createKeywordPromises = newKeywords.map((keyword) =>
      prisma.keyword.create({
        data: { name: keyword },
      })
    );

    // Execute all promises using Promise.all()
    await Promise.all(createKeywordPromises);

    res.status(200).json({
      success: true,
      message: "Keywords stored successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Something went wrong",
      errorType: error,
    });
  }
}
