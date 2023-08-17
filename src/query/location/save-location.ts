import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { AddressInput } from "@query/types";
import { API_URL } from "@utils/routes";

const useSaveLocationMutation = () => {
  return useMutation(async (data: AddressInput) => {
    const response = await axios.post(`${API_URL}/address`, data);
    return response.data;
  });
};

export { useSaveLocationMutation };
