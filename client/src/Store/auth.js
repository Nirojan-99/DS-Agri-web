import { createSlice } from "@reduxjs/toolkit";

const initial = {
  token: localStorage.getItem("token"),
  type: localStorage.getItem("type"),
  userID: localStorage.getItem("userID"),
};

localStorage.removeItem("email");

const authStore = createSlice({
  name: "loging",
  initialState: initial,
  reducers: {
    login(state, action) {
      state.type = action.payload.type;
      state.userID = action.payload.id;
      state.token = action.payload.token;

      localStorage.setItem("token", state.token);
      localStorage.setItem("type", state.type);
      localStorage.setItem("userID", state.userID);

      // setTimeout(() => {
      //   localStorage.removeItem("token");
      //   localStorage.removeItem("type");
      //   localStorage.removeItem("userID");
      // }, 100000 * 60);
    },
    logout(state) {
      localStorage.removeItem("token");
      localStorage.removeItem("type");
      localStorage.removeItem("userID");
    },
  },
});

export default authStore;

export const { login, logout } = authStore.actions;
