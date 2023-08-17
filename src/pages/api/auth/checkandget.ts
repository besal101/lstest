// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@libs/prisma";
import bcrypt from "bcrypt";

interface RegisterInputType extends NextApiRequest {
  email?: string;
  password?: string;
  name: string;
  remember?: boolean;
  mobile?: string;
}

interface RegisterResponseType {
  success: boolean;
  message: string;
  id?: string;
  errorType?: string;
}

export default async function handler(
  req: RegisterInputType,
  res: NextApiResponse<RegisterResponseType>
) {
  const { name, email, password, remember, mobile } = req.body;
  try {
    let finduser;
    if (email) {
      finduser = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });
    }
    if (mobile) {
      finduser = await prisma.user.findUnique({
        where: {
          mobile: mobile,
        },
      });
    }

    if (finduser) {
      res.status(200).json({
        success: false,
        message: "User already exists",
        id: finduser.id,
      });
      return;
    }

    let hashedPassword;

    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    if (!password) {
      hashedPassword = await bcrypt.hash("lifesmile", 10);
    }

    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        mobile: mobile,
        emailVerified: new Date(),
        password: hashedPassword,
      },
    });

    res.status(200).json({
      success: true,
      message: "User created successfully",
      id: user.id,
    });
  } catch (error: any) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: "Something went wrong",
      errorType: error,
    });
  }
}
