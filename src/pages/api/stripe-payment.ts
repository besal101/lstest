import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2022-11-15", // Use the latest Stripe API version
});

const createPaymentIntent = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
    return;
  }

  try {
    const { amount, currency, metadata } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: parseInt(amount),
      currency,
      metadata,
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export default createPaymentIntent;
