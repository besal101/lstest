import { QUERYKEYS } from "@query/constants";
import { CategoryFilter, Product, SearchFilter } from "@query/types";
import { useQuery } from "@tanstack/react-query";
import { API_ENDPOINTS } from "@utils/routes";

type ProductResponse = {
  products: Product[];
  success: boolean;
  message: string;
};

const useGetProductFromSearch = (searchFilter: SearchFilter) => {
  const {
    searchQuery,
    subcategory,
    color,
    size,
    minprice,
    maxprice,
    onsale,
    sort,
  } = searchFilter;

  return useQuery<ProductResponse, Error>({
    queryKey: [
      QUERYKEYS.GETSINGLEPRODUCT,
      searchQuery,
      subcategory,
      color,
      size,
      minprice,
      maxprice,
      onsale,
      sort,
    ],
    queryFn: async () => {
      let apiUrl = `${API_ENDPOINTS.SEARCH}?q=${searchQuery}`;

      if ((color as string[]).length > 0) {
        apiUrl += `&color=${encodeURIComponent((color as string[]).join(","))}`;
      }

      if ((subcategory as string[]).length > 0) {
        apiUrl += `&subcategory=${encodeURIComponent(
          (subcategory as string[]).join(",")
        )}`;
      }

      if ((size as string[]).length > 0) {
        apiUrl += `&size=${encodeURIComponent((size as string[]).join(","))}`;
      }

      if (minprice) {
        apiUrl += `&minprice=${encodeURIComponent(minprice as string)}`;
      }

      if (maxprice) {
        apiUrl += `&maxprice=${encodeURIComponent(maxprice as string)}`;
      }

      if (onsale) {
        apiUrl += `&onsale=${encodeURIComponent(onsale as string)}`;
      }

      if (sort) {
        apiUrl += `&sort=${encodeURIComponent(sort as string)}`;
      }

      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch product");
      }
      return response.json();
    },
  });
};

export { useGetProductFromSearch };
