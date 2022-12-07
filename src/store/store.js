import { configureStore } from "@reduxjs/toolkit";
import cartSliceReducer from "../features/cart-slice"
import productsSlice from "../features/products-slice";
import categorySliceReducer from "../features/category-slice"
import checkoutSliceReducer from "../features/checkout-slice";

export const store = configureStore({
  reducer: {
    cart: cartSliceReducer,
    products: productsSlice,
    categories: categorySliceReducer,
    checkout: checkoutSliceReducer
  },
});


