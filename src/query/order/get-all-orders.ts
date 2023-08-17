import { useQuery } from "@tanstack/react-query";
import { API_URL, SITE_URL } from "@utils/routes";
import axios from "axios";

const fetchOrders = async ({ queryKey }: any) => {
  const [_key, _params] = queryKey;
  const { data } = await axios.get(`${SITE_URL}/orders.json`);
  return {
    data: data,
  };
};

const useOrdersQuery = () => {
  return useQuery(["GETALLORDERS"], fetchOrders);
};

export { useOrdersQuery };
