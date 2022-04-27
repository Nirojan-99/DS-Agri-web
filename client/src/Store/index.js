import { configureStore } from "@reduxjs/toolkit";

import authStore from "./auth";
import themeStore from "./theme";
import orderStore from "./order";

const store = configureStore({
  reducer: {
    loging: authStore.reducer,
    mode: themeStore.reducer,
    order: orderStore.reducer,
  },
});

export default store;
