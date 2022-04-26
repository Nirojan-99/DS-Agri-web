import { configureStore } from "@reduxjs/toolkit";

import authStore from "./auth";
import themeStore from "./theme";
import cartStore from "./cart";

const store = configureStore({
  reducer: {
    loging: authStore.reducer,
    mode: themeStore.reducer,
    cart: cartStore.reducer,
  },
});

export default store;
