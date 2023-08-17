import { useMutation, useQuery } from "@tanstack/react-query";
import { API_URL } from "@utils/routes";
import axios from "axios";

interface GETRECENLTYBROWSEDINPUT {
  userIP: string;
  type: string;
}

const fetchLatestProductBrowsed = async (userIP: string, type: string) => {
  try {
    if (type === "recently_browsed") {
      const data: GETRECENLTYBROWSEDINPUT = {
        userIP,
        type,
      };
      const response = await axios.post(`${API_URL}/auth/gethistory`, data);
      return response.data;
    }
    if (type === "get_best_selling_products") {
      const data: GETRECENLTYBROWSEDINPUT = {
        userIP,
        type,
      };
      const response = await axios.post(
        `${API_URL}/product/best-selling`,
        data
      );
      return response.data;
    }
  } catch (error: any) {
    throw error.response.data;
  }
};

export const useGetRecentlyVisited = (userIP: string, type: string) => {
  return useMutation(["latestProductBrowsed", userIP], () =>
    fetchLatestProductBrowsed(userIP, type)
  );
};
