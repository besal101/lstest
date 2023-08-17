import { Product } from "@query/types";
import { useQuery } from "@tanstack/react-query";
import { QUERYKEYS } from "@query/constants";

type ProductResponse = {
  data: Product;
  success: boolean;
  message: string;
};

const useGetSingleProduct = (slug: string, color?: string, size?: number) => {
  return useQuery<ProductResponse, Error>({
    queryKey: [
      QUERYKEYS.GETSINGLEPRODUCT,
      slug,
      color !== undefined ? color : null,
      size !== undefined ? size : null,
    ],
    queryFn: async () => {
      let apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/product/${slug}`;
      if (color !== undefined && size !== undefined) {
        apiUrl += `?color=${encodeURIComponent(color)}&size=${size}`;
      } else if (color !== undefined) {
        apiUrl += `?color=${encodeURIComponent(color)}`;
      } else if (size !== undefined) {
        apiUrl += `?size=${size}`;
      }

      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch product");
      }
      return response.json();
    },
  });
};

export { useGetSingleProduct };
