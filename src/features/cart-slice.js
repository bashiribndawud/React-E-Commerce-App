import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

export const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    addToCart(state, action) {
      const { product, quantity = 1 } = action.payload;
      const existingProduct = state.cartItems?.find(
        ({ product: prod }) => prod.id === product.id
      );
      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        state.cartItems.push(action.payload);
      }
    },
    removeFromCart(state, action) {
      const { product, quantity } = action.payload;
      const index = state.cartItems.findIndex(
        ({ product: prod }) => prod.id === product.id
      );
      if (index > -1) {
        const existingItem = state.cartItems[index];
        if (existingItem.quantity === 1) {
          state.cartItems.splice(index, 1);
        } else {
          existingItem.quantity -= 1
        }
      }
    },
    clearCart(state){
      state.cartItems = []
    }
  },
});
// Action creators are generated for each case reducer function
export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
