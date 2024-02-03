import { createSlice } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";

const initialState = {
  value: JSON.parse(localStorage.getItem("watchlist")) || [],
};

export const WatchlistSlice = createSlice({
  name: "watchlist",
  initialState,
  reducers: {
    setWatchListId: (state, action) => {
      state.value.push(action.payload);
      localStorage.setItem("watchlist", JSON.stringify(state.value));
    },
    removeListId: (state, action) => {
      state.value = state.value.filter((id) => id !== action.payload);
      localStorage.setItem("watchlist", JSON.stringify(state.value));
    },
  },
});

export const { setWatchListId, removeListId } = WatchlistSlice.actions;

export default WatchlistSlice.reducer;

export const store = configureStore({
  reducer: {
    watchlist: WatchlistSlice.reducer,
  },
});
