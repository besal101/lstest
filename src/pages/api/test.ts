import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

let ordersData: any = null; // Variable to store the cached orders data

export default async function recommendations(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (!ordersData) {
      // Load the orders data if it is not already cached
      const { data } = await axios.get("http://localhost:3000/api/order");
      ordersData = data.message;
    }

    // Get the desired product code from the query parameter
    const desiredProductCode = req.query.desiredProductCode as string;

    // Map to store frequently bought together products and their counts
    const frequentlyBoughtTogether = new Map<string, number>();

    // Iterate through orders and their cart items
    for (const order of ordersData) {
      if (order.cartitems && order.cartitems.cartItems) {
        const cartItems = order.cartitems.cartItems;
        const productCodes = cartItems
          .filter((item: any) => item.productCode)
          .map((item: any) => item.productCode[0]);
        if (productCodes.includes(desiredProductCode)) {
          for (const productCode of productCodes) {
            if (productCode !== desiredProductCode) {
              frequentlyBoughtTogether.set(
                productCode,
                (frequentlyBoughtTogether.get(productCode) || 0) + 1
              );
            }
          }
        }
      }
    }

    // Get the top N frequently bought together product codes
    const N = 5; // Adjust the value of N as needed
    const topRecommendations = Array.from(frequentlyBoughtTogether.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, N)
      .map(([productCode]) => productCode);

    res.status(200).json({
      recommendations: topRecommendations,
    });
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching recommendations." });
  }
}
