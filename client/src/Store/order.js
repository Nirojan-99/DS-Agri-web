import { createSlice } from "@reduxjs/toolkit";

const initial = {
  order: localStorage.getItem("order"),
};

const orderStore = createSlice({
  name: "cart",
  initialState: initial,
  reducers: {
    addOrder(state, action) {
      state.order = action.payload.order;
      localStorage.setItem("order", JSON.stringify(state.order));
    },
    removerOrder(state) {
      state.order = {};
      localStorage.removeItem("order");
    },
  },
});

export default orderStore;

export const { addOrder, removerOrder } = orderStore.actions;
