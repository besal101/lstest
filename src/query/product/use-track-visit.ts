import { useMutation } from "@tanstack/react-query";
import { API_ENDPOINTS, API_URL } from "@utils/routes";
import axios from "axios";

interface ProductTrackVisitInput {
  productId: number;
  userIP: string;
}

const trackVisit = async (data: ProductTrackVisitInput) => {
  try {
    const response = await axios.post(
      `${API_ENDPOINTS.PRODUCTS}/trackvisit`,
      data
    );
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const useTrackVisitMutation = () => {
  return useMutation((data: ProductTrackVisitInput) => trackVisit(data));
};
