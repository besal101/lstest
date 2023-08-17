import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { cartItem } from "@utils/types";

interface CartState {
  cartItems: cartItem[];
}

const initialState: CartState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    cartAddItems: (state, action: PayloadAction<cartItem>) => {
      const newItem = action.payload;
      const existItem = state.cartItems.find(
        (item) => item.ItemCode === newItem.ItemCode
      );
      state.cartItems = existItem
        ? state.cartItems.map((item) =>
            item.ItemCode === existItem.ItemCode ? newItem : item
          )
        : [...state.cartItems, newItem];
    },
    cartRemoveItem: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.ItemCode !== action.payload
      );
    },
    cartAddQty: (state, action: PayloadAction<string>) => {
      const item = state.cartItems.find(
        (item) => item.ItemCode === action.payload
      );
      if (item) {
        item.productQuantity += 1;
      }
    },
    cartRemoveQty: (state, action: PayloadAction<string>) => {
      const item = state.cartItems.find(
        (item) => item.ItemCode === action.payload
      );
      if (item) {
        if (item.productQuantity > 1) {
          item.productQuantity -= 1;
        }
      }
    },
    allCartEmpty: (state) => {
      state.cartItems = [];
    },
  },
});

export const {
  cartAddItems,
  cartRemoveItem,
  cartAddQty,
  cartRemoveQty,
  allCartEmpty,
} = cartSlice.actions;

export default cartSlice.reducer;
