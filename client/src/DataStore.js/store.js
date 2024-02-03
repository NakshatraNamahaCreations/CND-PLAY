import { configureStore } from "@reduxjs/toolkit";
import watchlistReducer from "../DataStore.js/Slice/Watchlist";

export const store = configureStore({
  reducer: {
    watchlist: watchlistReducer,
  },
});
