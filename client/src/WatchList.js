import React from "react";
import { useSelector } from "react-redux";
export default function WatchList() {
  const watchLater = useSelector((state) => state.watchlist.value);
  console.log(watchLater, "watchLater");
  return <div>WatchList</div>;
}
