import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type OrderDrawerType = {
  open: boolean;
  order: any;
};

// Define a type for the slice state
interface ThemeState {
  openDrawer: boolean;
  orderDrawer: OrderDrawerType;
  defaultLanguage: string;
  displaySearch: boolean;
  displayMobileSearch: boolean;
  displayMobileFilter: boolean;
}

// Define the initial state using that type
const initialState: ThemeState = {
  openDrawer: false,
  orderDrawer: {
    open: false,
    order: null,
  },
  defaultLanguage: "en",
  displaySearch: false,
  displayMobileSearch: false,
  displayMobileFilter: false,
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setOpenDrawer: (state, action: PayloadAction<boolean>) => {
      state.openDrawer = action.payload;
    },
    setOrderDrawer: (state, action: PayloadAction<OrderDrawerType>) => {
      state.orderDrawer.open = action.payload.open;
      state.orderDrawer.order = action.payload.order;
    },
    setDefaultLanguage: (state, action: PayloadAction<string>) => {
      state.defaultLanguage = action.payload;
    },
    setSearch: (state, action: PayloadAction<boolean>) => {
      state.displaySearch = action.payload;
    },
    setMobileSearch: (state, action: PayloadAction<boolean>) => {
      state.displayMobileSearch = action.payload;
    },
    setMobileFilter: (state, action: PayloadAction<boolean>) => {
      state.displayMobileFilter = action.payload;
    },
  },
});

export const {
  setOpenDrawer,
  setOrderDrawer,
  setDefaultLanguage,
  setSearch,
  setMobileSearch,
  setMobileFilter,
} = themeSlice.actions;
export default themeSlice.reducer;
