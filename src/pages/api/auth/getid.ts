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
  const { email } = req.body;

  try {
    const currentUser = await prisma.user.findUnique({
      where: {
        email: email as string,
      },
    });
    if (!currentUser) throw new Error("User not found");

    res.status(201).json({ userID: currentUser.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
}
