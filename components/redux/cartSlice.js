import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    size: "s",
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload);
      state.quantity += 1* action.payload.quantity;
      state.size = action.payload.size;
      state.price = action.payload.price;
      state.total += action.payload.price * action.payload.quantity;
    },
    resetCart: (state) => {
      state.products = [];
      state.size = "s";
      state.quantity = 0;
      state.total = 0;
    },
  },
});

export const { addProduct, resetCart } = cartSlice.actions;
export default cartSlice.reducer;
