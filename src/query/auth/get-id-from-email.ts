import { useMutation } from "@tanstack/react-query";
import { API_URL } from "@utils/routes";
import axios from "axios";

export interface InputType {
  email?: string;
}

async function signUp(input: InputType) {
  try {
    const response = await axios.post(`${API_URL}/auth/getid`, input);
    return response.data;
  } catch (error: any) {
    throw error.response.data; // Throw the error response data to be handled by React Query
  }
}
export const useGetIDMutataion = () => {
  return useMutation((input: InputType) => signUp(input));
};
