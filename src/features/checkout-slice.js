import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  address: {},
  payment: {},
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    updateAddress(state, action) {
      const { payload } = action;
      state.address = { ...state.address, ...payload };
    },
    updatePayment(state, action) {
      const { payload } = action;
      state.payment = { ...state.payment, ...payload };
    },
    clearCheckout(state){
      state.address = {}
      state.payment = {}
    }
  },
});

export const { updateAddress, updatePayment, clearCheckout } = checkoutSlice.actions;

// adddres reducer to store
export default checkoutSlice.reducer;
