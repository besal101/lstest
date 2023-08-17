import { QueryOptionsType, Product } from "@query/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_ENDPOINTS } from "@utils/routes";

export const fetchBestSellingProducts = async ({ queryKey }: any) => {
  const [_key, _params] = queryKey;
  const { data } = await axios.get(API_ENDPOINTS.BEST_SELLER);
  return data as Product[];
};
export const useBestSellingProducts = (options: QueryOptionsType) => {
  return useQuery<Product[], Error>(
    [API_ENDPOINTS.BEST_SELLER, options],
    fetchBestSellingProducts
  );
};
