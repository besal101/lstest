import { NextApiRequest, NextApiResponse } from "next";
import puppeteer from "puppeteer";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const orderId = Number(req.query.orderId);

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(
    `${process.env.NEXTAUTH_URL}/invoice_download?orderid=${orderId}`,
    {
      waitUntil: "networkidle0",
    }
  );
  const pdf = await page.pdf({ format: "A4", printBackground: true });
  await browser.close();

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "attachment; filename=invoice.pdf");
  res.send(pdf);
}
