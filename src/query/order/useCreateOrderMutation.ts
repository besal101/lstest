import { useMutation } from "@tanstack/react-query";
import { API_URL } from "@utils/routes";
import axios from "axios";

interface Order {
  userId: string;
  cartIds: number[];
  totalAmount: number;
  paymentMethod: string;
  couponId?: number;
  addressId: number;
}

const createOrder = async (data: Order) => {
  try {
    const response = await axios.post(`${API_URL}/order/create-order`, data);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const useCreateOrderMutation = () => {
  return useMutation((data: Order) => createOrder(data));
};
