import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    query: "",
  },
  reducers: {
    updateQuery: (state, action) => {
      state.query = action.payload.query;
    },
    resetQuery: (state) => {
      state.query = "";
    },
  },
});

export const { updateQuery, resetQuery } = filterSlice.actions;
export default filterSlice.reducer;
