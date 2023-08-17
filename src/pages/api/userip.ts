import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Get the user's IP address from the request headers
  const userIP =
    req.headers["x-real-ip"] ||
    req.headers["x-forwarded-for"] ||
    req.socket.remoteAddress;

  // Now you can use the userIP to track the product visit or perform other actions

  res.status(200).json({ userIP });
}
