import { cartItem } from "@query/types";
import { useMutation } from "@tanstack/react-query";
import { API_URL } from "@utils/routes";
import axios from "axios";

interface AddToCartInput {
  cartItems: cartItem[];
  userId: string;
}

const addToCart = async (data: AddToCartInput) => {
  try {
    const response = await axios.post(`${API_URL}/cart/add-to-cart`, data);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const useAddToCartMutation = () => {
  return useMutation((data: AddToCartInput) => addToCart(data));
};
