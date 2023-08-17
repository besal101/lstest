import { configureStore, combineReducers } from "@reduxjs/toolkit";
import themeSlice from "@features/theme/themeSlice";
import modalSlice from "@features/modal/modalSlice";
import locationSlice from "@features/address/addressSlice";
import { persistStore, persistReducer } from "redux-persist";
import cartSlice from "@features/cart/cartSlice";
import orderSummarySlice from "@features/Order/orderSlice";
import cartTopbarSlice from "@features/cart/CartTopbar/cartTopbarSlice";
import storage from "./sync_storage";

const persistConfig = {
  key: "lifesmile-frontend",
  storage,
  whitelist: ["location", "cart", "orderSummary"],
};

const rootReducer = combineReducers({
  theme: themeSlice,
  modal: modalSlice,
  location: locationSlice,
  cart: cartSlice,
  orderSummary: orderSummarySlice,
  cartTopbar: cartTopbarSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"], // Ignore the serializability check for the persist/PERSIST action
      },
    }),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
