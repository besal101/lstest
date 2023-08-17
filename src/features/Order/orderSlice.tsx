import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface OrderSummaryType {
  coupon: string;
  couponDiscount: number;
  couponId: number;
  subtotal: number;
  totalAmount: number;
}

// Define the initial state using that type
const initialState: OrderSummaryType = {
  coupon: "",
  couponDiscount: 0,
  subtotal: 0,
  totalAmount: 0,
  couponId: 0,
};

export const orderSummarySlice = createSlice({
  name: "orderSummary",
  initialState,
  reducers: {
    setOrderSummary: (state, action: PayloadAction<OrderSummaryType>) => {
      state.coupon = action.payload.coupon;
      state.couponDiscount = action.payload.couponDiscount;
      state.subtotal = action.payload.subtotal;
      state.totalAmount = action.payload.totalAmount;
      state.couponId = action.payload.couponId;
    },
    removeOrderSummary: (state) => {
      state.coupon = "";
      state.couponDiscount = 0;
      state.subtotal = 0;
      state.totalAmount = 0;
      state.couponId = 0;
    },
  },
});

export const { setOrderSummary, removeOrderSummary } =
  orderSummarySlice.actions;
export default orderSummarySlice.reducer;
