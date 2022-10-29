import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import userReducer from "./userSlice";
import filterReducer from"./filterSlice";

export default configureStore({
    reducer: {
      cart: cartReducer,
      user: userReducer,
      filter: filterReducer,
    },
  });
