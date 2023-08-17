import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface CartTopBarState {
  data?: {
    productPrice: string;
    productName: string;
    productImage: string;
  };
  isOpen: boolean;
}

// Define the initial state using that type
const initialState: CartTopBarState = {
  data: {
    productPrice: "",
    productName: "",
    productImage: "",
  },
  isOpen: false,
};

export const cartTopBarSlice = createSlice({
  name: "cartTopBar",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    OpenTopBar: (state, action: PayloadAction<CartTopBarState>) => {
      state.isOpen = true;
      state.data = action.payload.data;
    },
    CloseTopBar: (state) => {
      state.isOpen = false;
      state.data = {
        productPrice: "",
        productName: "",
        productImage: "",
      };
    },
  },
});

export const { OpenTopBar, CloseTopBar } = cartTopBarSlice.actions;
export default cartTopBarSlice.reducer;
