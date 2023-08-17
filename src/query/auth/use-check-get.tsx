import { useMutation } from "@tanstack/react-query";
import { API_URL } from "@utils/routes";
import axios from "axios";

export interface CheckAndGetInputType {
  email?: string;
  password?: string;
  name: string;
  remember?: boolean;
  mobile?: string;
}

async function CheckAndGet(input: CheckAndGetInputType) {
  try {
    const response = await axios.post(`${API_URL}/auth/checkandget`, input);
    return response.data;
  } catch (error: any) {
    throw error.response.data; // Throw the error response data to be handled by React Query
  }
}
export const useCheckAndGetMutation = () => {
  return useMutation((input: CheckAndGetInputType) => CheckAndGet(input));
};
