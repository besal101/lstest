import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@libs/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  try {
    const address = await prisma.address.create({
      data: req.body,
    });
    res.status(200).json({ message: "Address added successfully", address });
  } catch (error) {
    console.error("Error adding cart items:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
