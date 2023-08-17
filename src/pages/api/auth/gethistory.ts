// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@libs/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
  const { userIP } = req.body;

  if (!userIP) {
    return res.status(400).json({ message: "User IP address is required" });
  }

  try {
    // Fetch the first 3 recently browsed products by the user
    const recentlyBrowsed = await prisma.productVisit.findMany({
      where: {
        userIP: userIP.userIP,
      },
      orderBy: {
        lastVisitedAt: "desc",
      },
      take: 3,
      select: {
        product: true,
      },
    });

    // If the user has not visited any product before, fetch the 9 most visited products
    if (recentlyBrowsed.length === 0) {
      const mostVisitedProducts = await prisma.productVisit.findMany({
        orderBy: {
          visitCount: "desc",
        },
        take: 9,
        select: {
          product: true,
        },
      });

      return res
        .status(200)
        .json({ product: mostVisitedProducts.map((visit) => visit.product) });
    }

    // Calculate how many more products to fetch
    const remainingProducts = 5 - recentlyBrowsed.length;

    // Fetch 5 products with the largest visit count
    const productsWithLargestVisitCount = await prisma.productVisit.findMany({
      where: {
        NOT: {
          product: {
            id: {
              in: recentlyBrowsed.map((visit) => visit.product.id),
            },
          },
        },
      },
      orderBy: {
        visitCount: "desc",
      },
      take: remainingProducts, // Fetch the remaining required products
      select: {
        product: true,
      },
    });

    // Combine recently browsed and products with the largest visit count
    const combinedProducts = [
      ...recentlyBrowsed.map((visit) => visit.product),
      ...productsWithLargestVisitCount.map((visit) => visit.product),
    ];

    return res.status(200).json({ product: combinedProducts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
}
