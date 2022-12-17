import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    id: null,
    username: "Guest",
    fullname: "Guest",
    img: "https://firebasestorage.googleapis.com/v0/b/hfc-resto.appspot.com/o/pizzas%2Fguest-user.jpg?alt=media&token=db829d3e-873c-4f50-b876-179998e49ba5",
    phonenumber: null,
    address: null,
    location: null,
    token: null,
  },
  reducers: {
    addID: (state, action) => {
      state.id=action.payload.id;
      state.address=action.payload.address;
      state.phonenumber = action.payload.phonenumber;
    },
    addToken: (state, action) => {
      state.token=action.payload.token;
    },
    addSocial: (state, action) => {
      state.username=action.payload.username;
      state.fullname=action.payload.fullname;
      state.img=action.payload.img;
    },
    addDetails: (state, action) => {
        state.address=action.payload.address;
        state.phonenumber=action.payload.phonenumber;
        state.location=action.payload.location;
      },
    addPhone:(state, action) => {
      state.phonenumber = action.payload.phonenumber;
    },
    resetUser: (state) => {
      state.id = null;
      state.username = "Guest";
      state.fullname = "Guest";
      state.img = "https://firebasestorage.googleapis.com/v0/b/hfc-resto.appspot.com/o/pizzas%2Fguest-user.jpg?alt=media&token=db829d3e-873c-4f50-b876-179998e49ba5";
      state.phonenumber = null,
      state.address = null;
      state.location = null;
      state.token = null;
    },
  },
});

export const { addSocial, addDetails,addToken,addPhone, addID, resetUser } = userSlice.actions;
export default userSlice.reducer;