import { createSlice } from "@reduxjs/toolkit";

const initial = {
  count: 0,
};

const cartStore = createSlice({
  name: "cart",
  initialState: initial,
  reducers: {
    dark(state, action) {
      state.mode = "dark";
      localStorage.setItem("mode", "dark");
    },
    light(state) {
      state.mode = "light";
      localStorage.setItem("mode", "light");
    },
  },
});

export default cartStore;

export const { dark, light } = cartStore.actions;
