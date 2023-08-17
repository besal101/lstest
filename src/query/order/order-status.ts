import { useQuery } from "@tanstack/react-query";
import { SITE_URL } from "@utils/routes";
import axios from "axios";

const fetchOrderStatus = async ({ queryKey }: any) => {
  const [_key, _params] = queryKey;
  const { data } = await axios.get(`${SITE_URL}/order-status.json`);
  return {
    data: data,
  };
};

const useOrderStatusQuery = () => {
  return useQuery(["GETORDERSTATUS"], fetchOrderStatus);
};

export { useOrderStatusQuery };
