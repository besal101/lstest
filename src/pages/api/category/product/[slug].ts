import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@libs/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const {
      slug,
      subcategory,
      color,
      size,
      minprice,
      maxprice,
      onsale,
      sort,
      page,
    } = req.query;

    // Convert the subcategory string to an array of subcategories
    const subcategoriesArray = subcategory
      ? (subcategory as string).split(",").map((item) => item.trim())
      : undefined;

    // Convert the color string to an array of colors
    const colorsArray = color
      ? (color as string).split(",").map((item) => item.trim())
      : undefined;

    // Convert the size string to an array of sizes
    const sizesArray = size
      ? (size as string).split(",").map((item) => item.trim())
      : undefined;

    const minPrice = minprice ? parseInt(minprice as string) : undefined;

    const maxPrice = maxprice ? parseInt(maxprice as string) : undefined;

    const onSale = onsale === "true" ? "sale" : undefined;

    const categoryWithProducts = await prisma.category.findUnique({
      where: { slug: slug as string },
      include: {
        subcategories: {
          include: {
            products: {
              include: {
                variations: {
                  where: {
                    name: colorsArray ? { in: colorsArray } : undefined,
                    size: sizesArray ? { in: sizesArray } : undefined,
                  },
                },
                reviews: true,
              },
              where: {
                price: {
                  gte: minPrice ? minPrice : undefined,
                  lte: maxPrice ? maxPrice : undefined,
                },
                badge: onSale ? onSale : undefined,
              },
            },
          },
          where: {
            slug: subcategoriesArray ? { in: subcategoriesArray } : undefined,
          },
        },
      },
    });

    if (!categoryWithProducts) {
      return res.status(404).json({ error: "Category not found." });
    }

    // Flatten the array of products
    const allProducts = categoryWithProducts.subcategories.reduce(
      (acc, subcategory) => acc.concat(subcategory.products as any),
      []
    );

    allProducts.sort(
      (a: any, b: any) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      data: allProducts,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Something went wrong",
      errorType: error,
    });
  }
}
