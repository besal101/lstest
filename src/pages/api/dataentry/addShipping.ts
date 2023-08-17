import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@libs/prisma";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const ShippingData = await axios.get(
      "http://localhost:3000/api/user/getalladdress"
    );

    // Extracting the relevant data from the API response
    const Shipping = ShippingData.data.message;
    for (const shipingEntry of Shipping) {
      const ifuserExits = await prisma.user.findUnique({
        where: {
          id: shipingEntry.userid,
        },
      });

      if (ifuserExits) {
        const ShippingId = await prisma.address.create({
          data: {
            id: shipingEntry._id,
            userId: shipingEntry.userid,
            apartment: shipingEntry.apartment,
            address: shipingEntry.street,
            city: shipingEntry.city,
            country: shipingEntry.country,
            latitude: shipingEntry.latitude,
            longitude: shipingEntry.longitude,
            phone: shipingEntry.mobile,
            fullname: shipingEntry.fullname,
            type: shipingEntry.type === "primary" ? "Home" : "Work",
            createdAt: shipingEntry.createdAt,
            updatedAt: shipingEntry.updatedAt,
          },
        });
      }
    }
    res.status(200).json({ success: true, message: "successfully addded" });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Something went wrong",
      errorType: error,
    });
  }
}
