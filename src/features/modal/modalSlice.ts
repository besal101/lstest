import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type MODAL_VIEWS =
  | "SIGN_UP_VIEW"
  | "LOGIN_VIEW"
  | "FORGET_PASSWORD"
  | "DELIVERY_VIEW"
  | "ADD_ADDRESS";

interface ModalState {
  view?: MODAL_VIEWS;
  data?: any;
  isOpen: boolean;
}

type Action =
  | { type: "open"; view?: MODAL_VIEWS; payload?: any }
  | { type: "close" };

// Define the initial state using that type
const initialState: ModalState = {
  view: undefined,
  data: undefined,
  isOpen: false,
};

export const modalSlice = createSlice({
  name: "modal",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    OpenModal: (state, action: PayloadAction<Action>) => {
      if (action.payload.type === "open") {
        state.isOpen = true;
        state.view = action.payload.view;
        state.data = action.payload.payload;
      } else {
        state.isOpen = false;
        state.view = undefined;
        state.data = undefined;
      }
    },
    CloseModal: (state) => {
      state.isOpen = false;
      state.view = undefined;
      state.data = undefined;
    },
  },
});

export const { OpenModal, CloseModal } = modalSlice.actions;
export default modalSlice.reducer;
